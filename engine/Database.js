const DB_NAME = "kbai";
const DB_VERSION = 1;
let DB;
const DB_TABLE = "dataset";
export default {
  async deleteDb(name) {
    return new Promise((resolve, reject) => {
      //found db
      console.log("found old database ... let remove");
      var DBDeleteRequest = window.indexedDB.deleteDatabase(name);
      DBDeleteRequest.onerror = function (event) {
        console.log("Error deleting database.");
        return reject(event);
      };
      DBDeleteRequest.onsuccess = function (event) {
        console.log("Database deleted successfully");
        console.log(event.result); // should be undefined
        resolve();
      };
    });
  },
  async newDb() {
    return new Promise(async (resolve, reject) => {
      let dbNames = (await window.indexedDB.databases()).find(
        (el) => el.name == DB_NAME
      );
      if (dbNames) {
        // exist db
        await this.deleteDb(DB_NAME);
      }
      // create new db
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = (e) => {
        console.log("Error opening db", e);
        reject("Error");
      };
      request.onsuccess = (e) => {
        DB = e.target.result;
        resolve(DB);
      };
      request.onupgradeneeded = (e) => {
        console.log("onupgradeneeded");
        let db = e.target.result;
        db.createObjectStore(DB_TABLE, { autoIncrement: true, keyPath: "id" });
      };
    });
  },
  async getDb() {
    return new Promise(async (resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      console.log("OPENING DB ", DB_NAME);
    });
  },
  async deleteData(data) {
    let db = await this.getDb("dataset");
    return new Promise((resolve) => {
      let trans = db.transaction([DB_TABLE], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };
      let store = trans.objectStore(DB_TABLE);
      store.delete(data.id);
    });
  },

  async getData() {
    let db = await this.getDb(DB_TABLE);
    return new Promise((resolve) => {
      let trans = db.transaction([DB_TABLE], "readonly");
      let data = [];
      trans.oncomplete = () => {
        resolve(data);
      };
      let store = trans.objectStore(DB_TABLE);
      store.openCursor().onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },
  async getDataById(id) {
    let db = await this.getDb(DB_TABLE);
    return new Promise((resolve) => {
      let trans = db.transaction([DB_TABLE], "readonly");
      let data = null;
      trans.oncomplete = () => {
        resolve(data);
      };
      let store = trans.objectStore(DB_TABLE);
      store.get(id).onsuccess = (e) => {
        let res = e.target.result;
        console.log("got data");
        console.log(res);
      };
    });
  },
  async addData(data) {
    console.log("add datato table", DB_TABLE);
    let db = await this.getDb(DB_TABLE);
    return new Promise((resolve) => {
      let trans = db.transaction([DB_TABLE], "readwrite");
      let res = null;
      trans.oncomplete = (e) => {
        if (res.error) {
          reject(error);
        }
        resolve(res.result);
      };
      let store = trans.objectStore(DB_TABLE);
      res = store.put(data);
    });
  },
};
