import type { GlossaryItem } from '../types/glossary.types';

const DB_NAME = 'GlossaryDB';
const DB_VERSION = 1;
const STORE_NAME = 'glossary';

class IndexedDBManager {
  private db: IDBDatabase | null = null;

  private async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          ['originalText', 'sourceLanguage', 'targetLanguage', 'dateAdded'].forEach(index =>
            store.createIndex(index, index, { unique: false })
          );
        }
      };
    });
  }

  private async withTransaction<T>(
    mode: IDBTransactionMode,
    action: (store: IDBObjectStore) => IDBRequest<T>
  ): Promise<T> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], mode);
      const store = transaction.objectStore(STORE_NAME);
      const request = action(store);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async addItem(item: GlossaryItem): Promise<void> {
    await this.withTransaction('readwrite', store => store.add(item));
  }

  async deleteItem(id: string): Promise<void> {
    await this.withTransaction('readwrite', store => store.delete(id));
  }

  async getAllItems(): Promise<GlossaryItem[]> {
    return this.withTransaction('readonly', store => store.getAll());
  }

  async getItem(id: string): Promise<GlossaryItem | undefined> {
    return this.withTransaction('readonly', store => store.get(id));
  }

  async checkIfExists(
    originalText: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<boolean> {
    const items = await this.getAllItems();
    return items.some(
      item =>
        item.originalText.toLowerCase() === originalText.toLowerCase() &&
        item.sourceLanguage === sourceLanguage &&
        item.targetLanguage === targetLanguage
    );
  }
}

export const indexedDBManager = new IndexedDBManager();
