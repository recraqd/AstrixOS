// Storage Service - Handles localStorage and IndexedDB
export default class StorageService {
  static async init() {
    this.db = null;
    try {
      this.initIndexedDB();
    } catch (e) {
      console.warn('IndexedDB not available, using localStorage');
    }
  }

  static initIndexedDB() {
    const request = indexedDB.open('AstrixOS', 1);
    
    request.onerror = () => {
      console.error('IndexedDB failed to open');
    };
    
    request.onsuccess = (e) => {
      this.db = e.target.result;
    };
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };
  }

  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage quota exceeded:', e);
    }
  }

  static getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
