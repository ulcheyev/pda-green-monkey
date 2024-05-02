import * as SQLite from "expo-sqlite";

class LocalDB {
  constructor() {
    this.localdatabase = SQLite.openDatabase("pda-green-monkey.db");
    this.createTables().then(() => console.log("Created tables"));
    //setDbStorage(this.localdatabase)
  }

  async createTables() {
    const itemsQuery = `
      CREATE TABLE IF NOT EXISTS Items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
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
     )
    `;

    return new Promise(() =>
      this.localdatabase.transaction((tx) => {
        console.log("Initiating tables...");
        tx.executeSql(listQuery, null, (tx, r) => {
          console.log("Created list table");
        });
        tx.executeSql(itemsQuery, null, (tx, r) => {
          console.log("Created items table");
        });
        tx.executeSql(shopsQuery, null, (tx, r) => {
          console.log("Created shops table");
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

  getShops = async (listId) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Lists WHERE listId = ?",
          [listId],
          (txObt, result) => {
            resolve(result);
          },
        );
      }),
    );
  };

  createShop = async (id, name) => {
    return new Promise((resolve, reject) =>
      this.localdatabase.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Shops (name, listId) VALUES (?, ?)",
          [name, id],
          (txObt, result) => {
            resolve(result);
          },
        );
      }),
    );
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
        );
      }),
    );
  };
}

export default LocalDB;
