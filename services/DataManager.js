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
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import LocalDB from "./LocalDB";

class DataManager {
  static instance;

  static getInstance() {
    if (this.instance == null) {
      this.instance = new DataManager();
    }
    return this.instance;
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
  changeTestNotificationCheckedById = (id) => {
    testNotifications = testNotifications.map((item) => {
      if (item.id == id) {
        item.checked = !item.checked;
      }
      return item;
    });
  };
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
          return getDoc(itemRef).then((res) => res.data());
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
            return { ...res.data(), items };
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
        return { ...doc.data(), shops: shopsData };
      });
      shopsPromises.push(promise);
    });

    return await Promise.all(shopsPromises);
  }

  convertToLists = (res) => {
    console.log(res.rows._array);
    return res.rows._array.map((item) => new List(item.name, item.id));
  };

  async convertToShops(shop) {
    let shops = [];

    console.log("Started converting");
    for (let i = 0; i < shop.rows.length; ++i) {
      let s = shop.rows._array[i];
      let lists = await this.getShopItemsLocal(s.id);
      console.log("Got lists");
      let shop_obj = new Shop(s.name, lists);
      shop_obj.id = s.id;
      console.log("Shop is");
      console.log(shop_obj);
      shops.push(shop_obj);
      console.log(s);
    }
    this.shop_wait = false;
    return shops;
  }

  convertToShopsSync(shop) {
    console.log("COnverting to shops loc");
    this.shop_wait = true;
    let shops = this.convertToShops(shop);
    return shops;
  }

  convertToItem(itemSQL) {
    console.log("Converting to items");
    return itemSQL.rows._array.map((item) => {
      console.log(item);
      console.log("Item is");
      let i = new Item(
        item.quantity,
        item.checked == "true",
        item.measure,
        item.name,
        item.photo,
      );
      console.log(i);
      return i;
    });
  }

  async getListsLocal() {
    return this.localdb.getListItems().then((res) => this.convertToLists(res));
  }

  async getShopItemsLocal(shopId) {
    console.log(`Getting items for shop ${shopId}`);
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

  async saveItemLocal(name, price, quantity, checked, measure, shopId, photo) {
    console.log("DM works");
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
    console.log("Creating sshop local");
    //console.log(this.localdb)
    return this.localdb.createShop(listId, name);
  }
}

const useDataManager = () => {
  return DataManager.getInstance();
};

export default useDataManager;
