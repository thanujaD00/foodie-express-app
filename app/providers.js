// app/providers.js
'use client'; // This directive marks the component as a Client Component

import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Adjust path based on your structure

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}