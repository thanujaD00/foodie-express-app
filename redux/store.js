// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const serializedCart = localStorage.getItem('cart');
      if (serializedCart === null) {
        return { items: [], totalQuantity: 0, totalAmount: 0 };
      }
      return JSON.parse(serializedCart);
    }
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
  }
  return { items: [], totalQuantity: 0, totalAmount: 0 };
};

// Save cart to localStorage
const saveCartToLocalStorage = (cartState) => {
  try {
    if (typeof window !== 'undefined') {
      const serializedCart = JSON.stringify(cartState);
      localStorage.setItem('cart', serializedCart);
    }
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

// Get initial state with localStorage data
const preloadedState = {
  cart: loadCartFromLocalStorage()
};

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Our cart slice reducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat((store) => (next) => (action) => {
      const result = next(action);

      // Save cart to localStorage after any cart action
      if (action.type.startsWith('cart/')) {
        const state = store.getState();
        saveCartToLocalStorage(state.cart);
      }

      return result;
    }),
});
