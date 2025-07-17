// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { restoreCart } from './features/cart/cartSlice';
import { loadCartFromIndexedDB, saveCartToIndexedDB } from './utils/indexedDB';

// Initialize the store with default cart state
const defaultCartState = { items: [], totalQuantity: 0, totalAmount: 0 };

// Create store
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Our cart slice reducer
  },
  preloadedState: {
    cart: defaultCartState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat((store) => (next) => (action) => {
      const result = next(action);

      // Save cart to IndexedDB after any cart action
      if (action.type.startsWith('cart/')) {
        const state = store.getState();
        saveCartToIndexedDB(state.cart).catch(err => {
          console.error('Failed to save cart to IndexedDB:', err);
        });
      }

      return result;
    }),
});

// Load cart from IndexedDB and update store when available
if (typeof window !== 'undefined') {
  loadCartFromIndexedDB().then(cartData => {
    if (cartData && (cartData.items.length > 0 || cartData.totalQuantity > 0)) {
      // Dispatch action to restore cart state
      store.dispatch(restoreCart(cartData));
    }
  }).catch(err => {
    console.error('Failed to load cart from IndexedDB:', err);
  });
}
