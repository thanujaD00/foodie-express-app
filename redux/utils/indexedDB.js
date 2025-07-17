// redux/utils/indexedDB.js
const DB_NAME = 'FoodieExpressDB';
const DB_VERSION = 1;
const CART_STORE_NAME = 'cart';

// Initialize IndexedDB
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Return a mock for SSR
      resolve(null);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('Error opening IndexedDB:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create cart object store if it doesn't exist
      if (!db.objectStoreNames.contains(CART_STORE_NAME)) {
        const cartStore = db.createObjectStore(CART_STORE_NAME, { keyPath: 'id' });
        // Add initial cart data
        cartStore.add({
          id: 'cartData',
          items: [],
          totalQuantity: 0,
          totalAmount: 0
        });
      }
    };
  });
};

// Load cart from IndexedDB
export const loadCartFromIndexedDB = async () => {
  try {
    if (typeof window === 'undefined') {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }

    const db = await initDB();
    if (!db) {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CART_STORE_NAME], 'readonly');
      const store = transaction.objectStore(CART_STORE_NAME);
      const request = store.get('cartData');

      request.onerror = () => {
        console.error('Error loading cart from IndexedDB:', request.error);
        resolve({ items: [], totalQuantity: 0, totalAmount: 0 });
      };

      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          const { id, ...cartData } = result;
          resolve(cartData);
        } else {
          resolve({ items: [], totalQuantity: 0, totalAmount: 0 });
        }
      };
    });
  } catch (err) {
    console.error('Error loading cart from IndexedDB:', err);
    return { items: [], totalQuantity: 0, totalAmount: 0 };
  }
};

// Save cart to IndexedDB
export const saveCartToIndexedDB = async (cartState) => {
  try {
    if (typeof window === 'undefined') {
      return;
    }

    const db = await initDB();
    if (!db) {
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CART_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(CART_STORE_NAME);
      const cartData = {
        id: 'cartData',
        ...cartState
      };
      const request = store.put(cartData);

      request.onerror = () => {
        console.error('Error saving cart to IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  } catch (err) {
    console.error('Error saving cart to IndexedDB:', err);
  }
};

// Clear cart from IndexedDB
export const clearCartFromIndexedDB = async () => {
  try {
    if (typeof window === 'undefined') {
      return;
    }

    const db = await initDB();
    if (!db) {
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([CART_STORE_NAME], 'readwrite');
      const store = transaction.objectStore(CART_STORE_NAME);
      const request = store.delete('cartData');

      request.onerror = () => {
        console.error('Error clearing cart from IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  } catch (err) {
    console.error('Error clearing cart from IndexedDB:', err);
  }
};
