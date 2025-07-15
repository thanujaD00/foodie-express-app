// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Our cart slice reducer
  },
  // You can add middleware, devtools config here if needed
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

// Optional: Type definitions for improved TypeScript experience (if you decide to use TS later)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;