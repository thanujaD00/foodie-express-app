// redux/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearCartFromIndexedDB } from '../../utils/indexedDB';

// Async thunk to clear cart and IndexedDB
export const clearCartAndStorage = createAsyncThunk(
  'cart/clearCartAndStorage',
  async () => {
    await clearCartFromIndexedDB();
    return;
  }
);

const initialState = {
  items: [], // Array of { id, name, price, quantity, restaurantName }
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload; // Payload expects { id, name, price, restaurantName }
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.restaurantName === newItem.restaurantName
      );

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          restaurantName: newItem.restaurantName,
        });
      } else {
        existingItem.quantity++;
      }
      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
    removeItemFromCart: (state, action) => {
      const { id, restaurantName } = action.payload; // Payload expects { id, restaurantName }
      const existingItem = state.items.find(
        (item) => item.id === id && item.restaurantName === restaurantName
      );

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => !(item.id === id && item.restaurantName === restaurantName)
          );
        } else {
          existingItem.quantity--;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    restoreCart: (state, action) => {
      const { items, totalQuantity, totalAmount } = action.payload;
      state.items = items || [];
      state.totalQuantity = totalQuantity || 0;
      state.totalAmount = totalAmount || 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearCartAndStorage.fulfilled, (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
      });
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, restoreCart } = cartSlice.actions;

export default cartSlice.reducer;