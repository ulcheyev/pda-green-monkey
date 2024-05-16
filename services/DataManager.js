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
  }

  getTestData = () => {
    let dataList = testData.map((dataItem) => {
      const l = new List(dataItem.name, dataItem.id);
      l.shops = dataItem.shops.map((shopItem) => {
        var s = new Shop(shopItem.name);
        s.items = shopItem.items.map((itemItem) => {
          var item = new Item(
            itemItem.quantity,
            itemItem.checked,
            itemItem.measure,
            itemItem.name,
            itemItem.photo,
          );
          return item;
        });
        return s;
      });
      l.updateProgress();
      return l;
    });

    return dataList;
  };

  getTestNotifications = () => {
    return testNotifications.map(
      (notificationItem) =>
        new Notification(notificationItem.detailedText, notificationItem.name),
    );
  };
  // changeTestNotificationCheckedById = (id) => {
  //   testNotifications = testNotifications.map((item) => {
  //     if (item.id == id) {
  //       item.checked = !item.checked;
  //     }
  //     return item;
  //   });
  // };
  addItemToShopInListId = (shop, listId, item) => {
    testData = testData.map((list) => {
      if (list.id == listId) {
        list.shop = list.shops.map((shop) => {
          if (shop.name == shop) {
            shop.items.push(item);
          }
        });
      }
      return list;
    });
  };

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

  convertToLists = (res) => {
    return res.rows._array.map((item) => new List(item.name, item.id));
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
    console.log("Converting to items");
    return notificationSQL.rows._array.map((n) => {
      let notification = new Notification(n.text, n.header, n.date);
      return notification;
    });
  }

  convertToGroupedByShop(group) {
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
    //console.log(`Getting items for shop ${shopId}`);
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

  async updateItem(item) {
    console.log(item);

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

  async updateListName(list, newName) {
    const q = query(
      collection(db, "lists"),
      where("uid", "==", this.getCurrentUser().uid),
      where("id", "==", list.id),
    );
    // update name
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          const docRef = document.ref;
          await updateDoc(docRef, {
            name: newName,
          });
        });
        console.log("List name updated successfully");
      } else {
        console.log("No document found with the given ID and user ID.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  async deleteList(list) {
    const listRef = doc(db, "lists", `${list.id}`);

    try {
      const listDoc = await getDoc(listRef);
      if (
        listDoc.exists() &&
        listDoc.data().uid === this.getCurrentUser().uid
      ) {
        await deleteDoc(listRef);
        console.log("Document successfully deleted.");
      } else {
        console.log("No document found or user mismatch.");
      }
    } catch (error) {
      console.error("Error removing document: ", error);
    }
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
    //console.log(this.localdb)
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

  async incrementPurchasePrice(shop, price) {
    const date = this.formatDate(new Date());
    this.localdb
      .incrementPurchasePrice(shop, date, price)
      .then(() => console.log("Incremented "));
  }

  async deleteShopLocal(shopId) {
    return this.localdb.deleteShop(shopId);
  }

  async deleteItemLocal(itemId) {
    return this.localdb.deleteItem(itemId);
  }

  async incrementListProgressLocal(shopId) {
    return this.localdb.incrementProgress(shopId);
  }

  async decrementListProgressLocal(shopId) {
    return this.localdb.decrementProgress(shopId);
  }

  async deleteListLocal(listId) {
    return this.localdb.deleteList(listId);
  }
  async saveNotificationLocal(head, text) {
    const date = new Date();
    const d = this.formatDate(date);
    return this.localdb.saveNotification(date, head, text);
  }

  async deleteNotification(id) {
    return this.localdb.deleteNotification(id);
  }
}

const useDataManager = () => {
  return DataManager.getInstance();
};

export default useDataManager;
