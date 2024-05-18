import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

class LocalDB {
  constructor() {
    //FileSystem.deleteAsync(`${FileSystem.documentDirectory}/SQLite/pda-green-monkey.db`).then( () =>
    this.localdatabase = SQLite.openDatabase("pdagreenmonkey.db");

    this.createTables().then(() => console.log("Created tables"));
    //this.localdatabase = SQLite.openDatabase("pda-green-monkey.db");

    //setDbStorage(this.localdatabase)
  }

  async createTables() {
    const itemsQuery = `
      CREATE TABLE IF NOT EXISTS Items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          price REAL,
          quantity REAL,
          checked INTEGER,
          measure TEXT,
          name TEXT,
          photo TEXT,
          shopId INTEGER,
          FOREIGN KEY (shopId) REFERENCES lists(id)
      )
    `;
    const shopsQuery = `
     CREATE TABLE IF NOT EXISTS Shops (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        listId INTEGER,
        FOREIGN KEY (listId) REFERENCES lists(id)

     )
    `;

    const listQuery = `
     CREATE TABLE IF NOT EXISTS Lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        progress INT default 0,
        total INT default 0
     )
    `;

    const notificationsQuery = `
     CREATE TABLE IF NOT EXISTS Notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        header TEXT,
        text TEXT,
        date DATE
     )
    `;

    const purchaseQuery = `
    CREATE TABLE IF NOT EXISTS Purchase (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       shop TEXT,
       price INT default 0,
       date DATE
    )
   `;

    const insertNotification = `
    INSERT INTO Notifications (header, text, date) VALUES (?, ?, ?) 
    `;

    return new Promise(() =>
      this.localdatabase.transaction((tx) => {
        console.log("Initiating tables...");

        tx.executeSql(
          listQuery,
          null,
          (tx, r) => {
            console.log("Created list table");
          },
          console.error,
        );
        tx.executeSql(
          itemsQuery,
          null,
          (tx, r) => {
            console.log("Created items table");
          },
          console.error,
        );
        tx.executeSql(
          shopsQuery,
          null,
          (tx, r) => {
            console.log("Created shops table");
          },
          console.error,
        );
        tx.executeSql(
          purchaseQuery,
          null,
          (tx, r) => {
            console.log("Created purchase table");
          },
          console.error,
        );
        tx.executeSql(notificationsQuery, null, (tx, r) => {
          console.log("Created notifications table");
        });
      }),
    );
  }

  getListItems = async () => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql("SELECT * FROM Lists", null, (txObt, result) => {
          resolve(result);
        });
      }),
    );
  };

  getShopItems = async (shopId) => {
    return new Promise((resolve, reject) => {
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Items WHERE shopId = ?",
          [shopId],
          (txObj, result) => {
            resolve(result);
          },
          console.error,
        );
      });
    });
  };

  getShops = async (listId) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Shops WHERE listId = ?",
          [listId],
          (txObt, result) => {
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  createShop = async (id, name) => {
    return new Promise((resolve, reject) => {
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Shops (name, listId) VALUES (?, ?)",
          [name, id],
          (txObj, result) => {
            console.log("Created shop :)");
            resolve(result);
          },
          (txObj, error) => {
            console.error("Error", error);
            reject(error);
          },
        );
      });
    });
  };

  createList = async (name) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Lists (name) VALUES (?)",
          [name],
          (txObt, result) => {
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  changeItemChecked = async (itemId, checked) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "UPDATE Items SET checked = ? WHERE id = ?",
          [checked, itemId],
          (txObt, result) => {
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  incrementPurchasePrice = async (shop, date, price) => {
    const selectQuery = "SELECT * FROM Purchase WHERE date = ? and shop = ?";
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        console.log("Incrementio price");
        tx.executeSql(
          selectQuery,
          [date, shop],
          (txObt, result) => {
            if (result.rows._array.length > 0) {
              this.updatePrice(shop, date, price);
            } else {
              this.insertPrice(shop, date, price);
            }
            resolve();
          },
          console.error,
        );
      }),
    );
  };

  insertPrice = async (shop, date, price) => {
    const insertQuery =
      "INSERT INTO Purchase (shop, date, price) VALUES (?, ?, ?)";
    this.localdatabase.transaction((tx) => {
      tx.executeSql(
        insertQuery,
        [shop, date, price],
        (r) => console.log("inserted"),
        console.error,
      );
    });
  };

  updatePrice = async (shop, date, price) => {
    const updateQuery =
      "UPDATE Purchase SET price = (price + ?) WHERE date = ? AND shop = ?";
    this.localdatabase.transaction((tx) => {
      tx.executeSql(
        updateQuery,
        [price, date, shop],
        (tx, r) => {
          console.log(date);
          console.log(shop);
          console.log(price);
          console.log("updatedd");
        },
        console.error,
      );
    });
  };

  deleteShop = async (shopId) => {
    this.localdatabase.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Items WHERE shopId = ?",
        [shopId],
        (txObt, result) => {},
        console.error,
      );
    });
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Shops WHERE id = ?",
          [shopId],
          (txObt, result) => {
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  deleteList = async (listId) => {
    this.localdatabase.transaction((tx) => {
      tx.executeSql(
        "SELECT id FROM Shops WHERE listId = ?",
        [listId],
        (txObt, result) => {
          result.rows._array.map((id) => this.deleteShop(id));
        },
        console.error,
      );
    });
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Lists WHERE id = ?",
          [listId],
          (txObt, result) => {
            console.log("Deleted list :)");
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  deleteItem = async (itemId) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Items WHERE id = ?;",
          [itemId],
          (txObt, result) => {
            console.log("Deleted item :)");
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  saveItem = async (
    name,
    price,
    quantity,
    checked,
    measure,
    shopId,
    photo = "",
  ) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Items (name, price, quantity, checked, measure, shopId, photo) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, price, quantity, checked, measure, shopId, photo],
          (txObt, result) => {
            console.log("Added item :)");
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  uncheckAllItems = async (listId) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "UPDATE Items SET checked = ? WHERE shopId in ( SELECT id FROM Shops WHERE listID = ? ); ",
          [false, listId],
          (txObt, result) => {
            console.log("Unchecked all items");
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  getNotifications = async () => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql("SELECT * FROM Notifications", null, (txObt, result) => {
          resolve(result);
        });
      }),
    );
  };

  saveNotification = async (date, name, text) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Notifications (header, text, date) VALUES (?, ?, ?)",
          [name, text, date],
          (txObt, result) => {
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  deleteNotification = async (id) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Notifications WHERE id = ?",
          [id],
          (txObt, result) => {
            console.log("Deleted notif");
            resolve(result);
          },
        );
      }),
    );
  };

  getPurchasesGroupedByShop = async (dateFrom, dateTo) => {
    const sqlQuery =
      "SELECT shop, SUM(price) AS total_price FROM Purchase WHERE date BETWEEN ? AND ? GROUP BY shop;";

    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          sqlQuery,
          [dateFrom, dateTo],
          (txObt, result) => {
            console.log(dateFrom);
            console.log(dateTo);
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  getListOverallItems = async (listId) => {
    const sqlQuery =
      "SELECT COUNT(*) AS count FROM Shops AS s JOIN Items AS i ON s.listId = i.listId WHERE s.listId = ?;";
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          sqlQuery,
          [listId],
          (txObt, result) => {
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  getListCheckedItems = async (listId) => {
    const sqlQuery =
      "SELECT COUNT(*) AS count FROM Shops AS s JOIN Items AS i ON s.listId = i.listId WHERE s.listId = ? AND i.checked = ?;";
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          sqlQuery,
          [listId, true],
          (txObt, result) => {
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };
}

export default LocalDB;
