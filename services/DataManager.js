import Item from "../model/Item";
import List from "../model/List";
import Shop from "../model/Shop";
import Notification from "../model/Notification";
import { useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firestore";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  writeBatch,
  arrayUnion,
} from "firebase/firestore";
import LocalDB from "./LocalDB";
import { he } from "react-native-paper-dates";
import useUtils from "../utils/Utils";
import firebase from "firebase/compat";

class DataManager {
  static instance;

  static getInstance() {
    if (this.instance == null) {
      this.instance = new DataManager();
    }
    return this.instance;
  }

  formatDate(date) {
    // Get month, day, and year
    var month = date.getMonth() + 1; // Months are zero based
    var day = date.getDate();
    var year = date.getFullYear();

    // Add leading zeros if necessary
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Return formatted date
    return month + "-" + day + "-" + year;
  }

  constructor() {
    console.log(
      "CALLLED DM CONSTRUCTOR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    );
    this.localdb = new LocalDB();
    this.shop_wait = false;
    this.list_wait = false;
    this.utils = useUtils();
  }

  register(user) {
    return createUserWithEmailAndPassword(auth, user.email, user.password);
  }

  updateProfile(user, params) {
    return updateProfile(user, params);
  }

  login(user) {
    return signInWithEmailAndPassword(auth, user.email, user.password);
  }

  logout(navigation) {
    signOut(auth)
      .then(() => {
        navigation.pop();
        navigation.navigate("Login");
      })
      .catch((error) => {
        // ignored
      });
  }

  getCurrentUser() {
    const auth = getAuth();
    return auth.currentUser;
  }

  async getShopItems(shopDocSnap) {
    try {
      const shopData = shopDocSnap.data();
      if (shopData && shopData.items) {
        const itemsData = [];
        const promises = shopData.items.map((itemRef) => {
          return getDoc(itemRef).then((res) => {
            return { id: res.id, ...res.data() };
          });
        });
        return await Promise.all(promises);
      } else {
        console.log("No items found in the shop.");
        return [];
      }
    } catch (error) {
      console.error("Error getting items from shop:", error);
      return [];
    }
  }

  async getListShopsByListId(listId) {
    const listRef = doc(db, "lists", listId);
    const listDocSnap = await getDoc(listRef);
    if (!listDocSnap.exists()) {
      console.log("List document does not exist.");
      return [];
    }
    return this.getListShops(listDocSnap);
  }

  async getListShops(listDocSnap) {
    try {
      const listData = listDocSnap.data();
      if (listData && listData.shops) {
        const promises = listData.shops.map((shopRef) => {
          return getDoc(shopRef).then(async (res) => {
            const items = await this.getShopItems(res);
            return { id: res.id, ...res.data(), items };
          });
        });
        return Promise.all(promises);
      } else {
        console.log("No shops found in the list.");
        return [];
      }
    } catch (error) {
      console.error("Error getting shops from list:", error);
      return [];
    }
  }
  async getAllLists() {
    const lists = [];
    const q = query(
      collection(db, "lists"),
      where("uid", "==", this.getCurrentUser().uid),
    );
    const listDocRef = await getDocs(q);
    const shopsPromises = [];
    listDocRef.forEach((doc) => {
      const promise = this.getListShops(doc).then((shopsData) => {
        return { id: doc.id, ...doc.data(), shops: shopsData };
      });
      shopsPromises.push(promise);
    });

    return await Promise.all(shopsPromises);
  }

  convertToLists = async (res) => {
    let arr = [];
    for (let i = 0; i < res.rows._array.length; ++i) {
      const listsql = res.rows._array[i];
      let l = new List(listsql.name, listsql.id);
      let shops = await this.getShopsLocal(l.id);
      l.shops = shops;
      arr.push(l);
    }
    return arr;
  };

  async convertToShops(shop) {
    let shops = [];

    for (let i = 0; i < shop.rows.length; ++i) {
      let s = shop.rows._array[i];
      let lists = await this.getShopItemsLocal(s.id);
      let shop_obj = new Shop(s.name, lists);
      shop_obj.id = s.id;
      shops.push(shop_obj);
    }
    this.shop_wait = false;
    return shops;
  }

  convertToShopsSync(shop) {
    this.shop_wait = true;
    let shops = this.convertToShops(shop);
    return shops;
  }

  convertToItem(itemSQL) {
    return itemSQL.rows._array.map((item) => {
      let i = new Item(
        item.quantity,
        item.checked == "true",
        item.measure,
        item.name,
        item.photo,
        item.price,
        item.id,
      );
      return i;
    });
  }

  convertToNotification(notificationSQL) {
    return notificationSQL.rows._array.map((n) => {
      let notification = new Notification(n.id, n.text, n.header, n.date);
      return notification;
    });
  }

  convertToGroupedByShop(group) {
    console.log(group.rows._array);
    return group.rows._array.map((item) => {
      const d = {
        value: item.total_price,
        label: item.shop,
      };
      return d;
    });
  }

  async getListsLocal() {
    return this.localdb.getListItems().then((res) => this.convertToLists(res));
  }

  async getShopItemsLocal(shopId) {
    return this.localdb
      .getShopItems(shopId)
      .then((res) => this.convertToItem(res));
  }

  async getShopsLocal(id) {
    return this.localdb
      .getShops(id)
      .then((res) => this.convertToShopsSync(res));
  }

  async saveList(list) {
    try {
      const listRef = await addDoc(collection(db, "lists"), list);
      return listRef.id;
    } catch (error) {
      throw error;
    }
  }

  async updateItem(item) {
    const itemRef = doc(db, "items", `${item.id}`);
    const batch = writeBatch(db);

    batch.set(
      itemRef,
      {
        name: item.name,
        measure: item.measure,
        price: item.price,
        checked: item.checked,
        quantity: item.quantity,
      },
      { merge: true },
    );

    try {
      await batch.commit();
      console.log("Item was updated successfully");
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  }

  async incrementPurchasePrice(shop, price) {
    const date = this.formatDate(new Date());
    this.localdb
      .incrementPurchasePrice(shop, date, price)
      .then(() => console.log("Incremented "));
  }

  async saveItemLocal(name, price, quantity, checked, measure, shopId, photo) {
    return this.localdb.saveItem(
      name,
      price,
      quantity,
      checked,
      measure,
      shopId,
      photo,
    );
  }

  async saveListLocal(name) {
    return this.localdb.createList(name);
  }

  async changeItemCheckedLocal(itemId, checked) {
    return this.localdb.changeItemChecked(itemId, checked);
  }

  async saveShopLocal(name, listId) {
    return this.localdb.createShop(listId, name);
  }

  async uncheckAllItemsLocal(listId) {
    return this.localdb.uncheckAllItems(listId);
  }

  async getNotificaitonsLocal() {
    return this.localdb
      .getNotifications()
      .then((notification) => this.convertToNotification(notification));
  }

  async getPurchasesGroupedByShopLocal(dateFrom, dateTo) {
    return this.localdb
      .getPurchasesGroupedByShop(dateFrom, dateTo)
      .then((res) => this.convertToGroupedByShop(res));
  }

  async deleteShopLocal(shopId) {
    return this.localdb.deleteShop(shopId);
  }

  async deleteItemLocal(itemId) {
    return this.localdb.deleteItem(itemId);
  }

  async deleteListLocal(listId) {
    return this.localdb.deleteList(listId);
  }
  async saveNotificationLocal(head, text) {
    const date = new Date();
    const d = this.formatDate(date);
    return this.localdb.saveNotification(date, head, text);
  }

  async deleteNotificationLocal(id) {
    return this.localdb.deleteNotification(id);
  }

  deleteList(list) {
    return this.utils.checkAuth().then((user) => {
      if (user) {
        return this.deleteDocumentWithSubcollections("lists", list.id, [
          "shops",
          "items",
        ]);
      } else {
        return this.deleteListLocal(list.id);
      }
    });
  }

  deleteShop(shopId, listId) {
    return this.utils.checkAuth().then((user) => {
      if (user) {
        return this.deleteDocumentWithSubcollections(
          "shops",
          shopId,
          ["items"],
          listId,
          "lists",
        );
      } else {
        return this.deleteShopLocal(shopId);
      }
    });
  }

  deleteItem(itemId, shopId) {
    return this.utils.checkAuth().then((user) => {
      if (user) {
        return this.deleteDocumentWithSubcollections(
          "items",
          itemId,
          [],
          shopId,
          "shops",
        );
      } else {
        return this.deleteItemLocal(itemId);
      }
    });
  }

  /***
   Note that subcollectionsToDelete is array of "tree" representation of subcollections of entity.
   This array [one, two] means, that entity has this structure of subcollections REFERENCES:
     main entity{
     ones: [one references],
     }
     one {
     twos: [two references]
     }
   ***/
  async deleteDocumentWithSubcollections(
    dbName,
    id,
    subcollectionsToDelete,
    parentId = null,
    parentDbName = null,
  ) {
    const docRef = doc(db, dbName, `${id}`);
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log("Document does not exist!");
        return;
      }

      if (subcollectionsToDelete.length > 0) {
        const subcollectionName = subcollectionsToDelete[0];
        const subCollectionRefs = docSnap.data()[subcollectionName];

        console.log(
          `Processing ${subCollectionRefs.length} documents in ${subcollectionName}...`,
        );

        const deletePromises = subCollectionRefs.map((subDoc) =>
          this.deleteDocumentWithSubcollections(
            subcollectionName,
            subDoc.id,
            subcollectionsToDelete.slice(1),
          ),
        );

        await Promise.all(deletePromises);
      }

      // update parent references
      if (parentId && parentDbName) {
        const parentDocRef = doc(db, parentDbName, `${parentId}`);
        await updateDoc(parentDocRef, {
          [dbName]: firebase.firestore.FieldValue.arrayRemove(docRef),
        });
        console.log(`Reference to ${dbName} removed from ${parentDocRef.path}`);
      }

      console.log(`Deleting main document: ${docRef.path}`);
      await deleteDoc(docRef);
      console.log(
        `Document with path ${docRef.path} and all its subcollections have been deleted.`,
      );
    } catch (error) {
      console.error("Error removing document: ", error);
      throw new Error(
        `Failed to delete document with path ${docRef.path}: ${error}`,
      );
    }
  }

  updateEntitySpecificField(dbName, id, field, newValue) {
    const docRef = doc(db, dbName, `${id}`);
    return updateDoc(docRef, {
      [field]: newValue,
    });
  }

  updateListName(list, newName) {
    return this.updateEntitySpecificField("lists", list.id, "name", newName);
  }

  async updateList(list) {
    const listRef = doc(db, "lists", `${list.id}`);
    const batch = writeBatch(db);

    batch.set(
      listRef,
      {
        name: list.name,
        isTemplate: list.isTemplate,
        progress: list.progress,
        uid: list.uid,
      },
      { merge: true },
    );

    for (const shop of list.shops) {
      if (!shop.id) {
        const newShopRef = await addDoc(collection(db, "shops"), {
          name: shop.name,
          items: [],
        });
        shop.id = newShopRef.id;
      }
      const shopRef = doc(db, "shops", `${shop.id}`);

      for (const item of shop.items) {
        if (!item.id) {
          const newItemRef = await addDoc(collection(db, "items"), {
            name: item.name,
            measure: item.measure,
            price: item.price,
            checked: item.checked,
            quantity: item.quantity,
          });
          item.id = newItemRef.id;
        }

        const itemRef = doc(db, "items", `${item.id}`);
        batch.update(shopRef, { items: arrayUnion(itemRef) });
      }

      batch.update(listRef, { shops: arrayUnion(shopRef) });
    }

    try {
      await batch.commit();
      console.log("List and all associated shops were updated successfully");
    } catch (error) {
      console.error("Failed to update list and its relations:", error);
    }
  }

  async getListOverallItemsLocal(listId) {
    return this.localdb.getListOverallItems(listId);
  }

  async getListCheckedItemsLocal(listId) {
    return this.localdb.getListCheckedItems(listId);
  }
}

const useDataManager = () => {
  return DataManager.getInstance();
};

export default useDataManager;
