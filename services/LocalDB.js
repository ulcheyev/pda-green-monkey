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
        name TEXT
     )
    `;

    return new Promise(() =>
      this.localdatabase.transaction((tx) => {
        console.log("Initiating tables...");
        // tx.executeSql('DROP TABLE IF EXISTS Items', null, console.log, console.error)
        // tx.executeSql('DROP TABLE IF EXISTS Lists', null, console.log, console.error)
        // tx.executeSql('DROP TABLE IF EXISTS Shops', null, console.log, console.error)

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
        //console.log(FileSystem.documentDirectory);
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
            console.log("Got items");
            console.log(result);
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
            console.log("Got shops localDB");
            console.log(result);
            resolve(result);
          },
          console.error,
        );
      }),
    );
  };

  createShop = async (id, name) => {
    console.log("db is creating");
    console.log(`id is ${id} ${name}`);
    return new Promise((resolve, reject) => {
      this.localdatabase.transaction((tx) => {
        console.log("entered transaction");
        tx.executeSql(
          "INSERT INTO Shops (name, listId) VALUES (?, ?)",
          [name, id],
          (txObj, result) => {
            console.log("OK");
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
        console.log("Created list!!!");
        tx.executeSql(
          "INSERT INTO Lists (name) VALUES (?)",
          [name],
          (txObt, result) => {
            resolve(result);
          },
          console.error,
        );
        console.log(tx);
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
            console.log(`CHanged ${itemId} to ${checked}`);
            resolve(result);
          },
          console.error,
        );
        console.log(tx);
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
    console.log("saving item");
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
        console.log(tx);
      }),
    );
  };
}

export default LocalDB;
