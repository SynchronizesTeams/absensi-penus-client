import { openDB } from 'idb';

const DB_NAME = 'absenOfflineDB';
const STORE_NAME = 'absenRecords';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    },
  });
};

export const saveOfflineAbsen = async (data: any) => {
  const db = await initDB();
  return db.add(STORE_NAME, data);
};

export const getAllOfflineAbsen = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const clearOfflineAbsen = async () => {
  const db = await initDB();
  return db.clear(STORE_NAME);
};

export const removeOfflineAbsen = async (id: number) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
