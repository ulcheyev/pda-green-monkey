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
  constructor() {
    this.localdb = new LocalDB();
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

  convertToShops(shop) {
    let shops = [];
    console.log(shop);

    for (let i = 0; i < shop.rows._array.length; ++i) {
      let s = shop.rows._array[i];
      let lists = [];
      //let lists = await this.getShopItemsLocal(s.id).then(item => this.convertToItem(item));
      let shop_obj = new Shop(s.name, lists);
      shops.push(shop_obj);
      console.log("mmmm", s);
    }

    return shops;
  }

  async convertToItem(itemSQL) {
    return itemSQL.rows._array.map((item) => {
      return new Item(item.amount, item, checked, item.name, item.photo);
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
    return this.localdb.getShops(id).then((res) => this.convertToShops(res));
  }

  async saveList(list) {
    try {
      const listRef = await addDoc(collection(db, "lists"), list);
      return listRef.id;
    } catch (error) {
      throw error;
    }
  }

  async saveListLocal(name) {
    return this.localdb.createList(name);
  }

  async saveShopLocal(name, listId) {
    return this.localdb.createShop(listId, name);
  }
}

const useDataManager = () => {
  return useMemo(() => new DataManager(), []);
};

export default useDataManager;

var testData = [
  {
    id: 1,
    name: "List 1",
    isTemplate: false,
    progress: 5,
    shops: [
      {
        name: "Albert",
        items: [
          { id: 1, name: "Item 1", measure: "kg", checked: true, quantity: 2 },
          { id: 2, name: "Item 2", measure: "pcs", checked: true, quantity: 1 },
          {
            id: 3,
            name: "Item 3",
            measure: "ml",
            checked: true,
            quantity: 3,
            photo:
              "https://i5.walmartimages.com/seo/Fresh-Banana-Fruit-Each_5939a6fa-a0d6-431c-88c6-b4f21608e4be.f7cd0cc487761d74c69b7731493c1581.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
          },
        ],
      },
      {
        name: "Kaufland",
        items: [
          { id: 4, name: "Item 4", measure: "g", checked: false, quantity: 1 },
          { id: 5, name: "Item 5", measure: "pcs", checked: true, quantity: 2 },
          { id: 6, name: "Item 6", measure: "ml", checked: false, quantity: 4 },
        ],
      },
      {
        name: "Lidl",
        items: [
          { id: 7, name: "Item 7", measure: "kg", checked: false, quantity: 3 },
          { id: 8, name: "Item 8", measure: "pcs", checked: true, quantity: 3 },
          { id: 9, name: "Item 9", measure: "ml", checked: false, quantity: 2 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "List 2",
    isTemplate: true,
    progress: 4,
    shops: [
      {
        name: "Tesco",
        items: [
          {
            id: 10,
            name: "Item 10",
            measure: "kg",
            checked: false,
            quantity: 1,
          },
          {
            id: 11,
            name: "Item 11",
            measure: "pcs",
            checked: true,
            quantity: 2,
          },
          {
            id: 12,
            name: "Item 12",
            measure: "ml",
            checked: false,
            quantity: 1,
          },
        ],
      },
      {
        name: "Sainsbury's",
        items: [
          {
            id: 13,
            name: "Item 13",
            measure: "kg",
            checked: true,
            quantity: 4,
          },
          {
            id: 14,
            name: "Item 14",
            measure: "pcs",
            checked: false,
            quantity: 1,
          },
          {
            id: 15,
            name: "Item 15",
            measure: "ml",
            checked: true,
            quantity: 3,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "List 3",
    isTemplate: false,
    progress: 5,
    shops: [
      {
        name: "Lidl",
        items: [
          {
            id: 13,
            name: "Item 13",
            measure: "kg",
            checked: true,
            quantity: 3,
          },
          {
            id: 14,
            name: "Item 14",
            measure: "pcs",
            checked: false,
            quantity: 2,
          },
          {
            id: 15,
            name: "Item 15",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Aldi",
        items: [
          {
            id: 16,
            name: "Item 16",
            measure: "kg",
            checked: false,
            quantity: 2,
          },
          {
            id: 17,
            name: "Item 17",
            measure: "pcs",
            checked: true,
            quantity: 3,
          },
          {
            id: 18,
            name: "Item 18",
            measure: "ml",
            checked: false,
            quantity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "List 4",
    isTemplate: false,
    progress: 6,
    shops: [
      {
        name: "Walmart",
        items: [
          {
            id: 19,
            name: "Item 19",
            measure: "kg",
            checked: true,
            quantity: 2,
          },
          {
            id: 20,
            name: "Item 20",
            measure: "pcs",
            checked: false,
            quantity: 3,
          },
          {
            id: 21,
            name: "Item 21",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Target",
        items: [
          {
            id: 22,
            name: "Item 22",
            measure: "kg",
            checked: false,
            quantity: 1,
          },
          {
            id: 23,
            name: "Item 23",
            measure: "pcs",
            checked: true,
            quantity: 2,
          },
          {
            id: 24,
            name: "Item 24",
            measure: "ml",
            checked: false,
            quantity: 3,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "List 5",
    isTemplate: false,
    progress: 1,
    shops: [
      {
        name: "Whole Foods",
        items: [
          {
            id: 25,
            name: "Item 25",
            measure: "kg",
            checked: true,
            quantity: 3,
          },
          {
            id: 26,
            name: "Item 26",
            measure: "pcs",
            checked: false,
            quantity: 2,
          },
          {
            id: 27,
            name: "Item 27",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Trader Joe's",
        items: [
          {
            id: 28,
            name: "Item 28",
            measure: "kg",
            checked: false,
            quantity: 2,
          },
          {
            id: 29,
            name: "Item 29",
            measure: "pcs",
            checked: true,
            quantity: 3,
          },
          {
            id: 30,
            name: "Item 30",
            measure: "ml",
            checked: false,
            quantity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "List 6",
    isTemplate: false,
    progress: 2,
    shops: [
      {
        name: "Costco",
        items: [
          {
            id: 31,
            name: "Item 31",
            measure: "kg",
            checked: true,
            quantity: 2,
          },
          {
            id: 32,
            name: "Item 32",
            measure: "pcs",
            checked: false,
            quantity: 3,
          },
          {
            id: 33,
            name: "Item 33",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Sam's Club",
        items: [
          {
            id: 34,
            name: "Item 34",
            measure: "kg",
            checked: false,
            quantity: 1,
          },
          {
            id: 35,
            name: "Item 35",
            measure: "pcs",
            checked: true,
            quantity: 2,
          },
          {
            id: 36,
            name: "Item 36",
            measure: "ml",
            checked: false,
            quantity: 3,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "List 7",
    isTemplate: false,
    progress: 3,
    shops: [
      {
        name: "Home Depot",
        items: [
          {
            id: 37,
            name: "Item 37",
            measure: "kg",
            checked: true,
            quantity: 3,
          },
          {
            id: 38,
            name: "Item 38",
            measure: "pcs",
            checked: false,
            quantity: 2,
          },
          {
            id: 39,
            name: "Item 39",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Lowe's",
        items: [
          {
            id: 40,
            name: "Item 40",
            measure: "kg",
            checked: false,
            quantity: 2,
          },
          {
            id: 41,
            name: "Item 41",
            measure: "pcs",
            checked: true,
            quantity: 3,
          },
          {
            id: 42,
            name: "Item 42",
            measure: "ml",
            checked: false,
            quantity: 2,
          },
        ],
      },
      {
        name: "Home Depot2",
        items: [
          {
            id: 37,
            name: "Item 37",
            measure: "kg",
            checked: true,
            quantity: 3,
          },
          {
            id: 38,
            name: "Item 38",
            measure: "pcs",
            checked: false,
            quantity: 2,
          },
          {
            id: 39,
            name: "Item 39",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
    ],
  },
];
var testNotifications = [
  {
    id: 1,
    name: "Oh no app crashed",
    isNew: false,
    detailedText:
      "Donec mattis convallis leo in hendrerit. Aenean posuere suscipit luctus. Praesent lacus tortor, tincidunt in mauris at, tempor consequat nunc. Quisque vehicula enim sem. Pellentesque blandit felis vel quam dignissim euismod quis vel orci. Cras sodales eros id enim venenatis, sit amet imperdiet lorem rutrum. Donec iaculis odio sit amet enim posuere ornare.",
  },
  {
    id: 2,
    name: "Lorem 2",
    isNew: true,
    detailedText:
      "Nulla nec tempor sem, ac suscipit quam. Fusce odio nunc, hendrerit quis orci quis, sollicitudin gravida mauris. Donec vehicula tincidunt nulla, sit amet lacinia eros. ",
  },
];
