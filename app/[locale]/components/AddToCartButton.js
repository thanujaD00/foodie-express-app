// app/components/AddToCartButton.js
'use client';

import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/redux/features/cart/cartSlice'; // Adjust path
import {useTranslations} from 'next-intl';

export default function AddToCartButton({ dish, restaurantName }) {
  const dispatch = useDispatch();
  const t = useTranslations('common');

  const handleAddToCart = () => {
    dispatch(addItemToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      restaurantName: restaurantName, // Associate dish with its restaurant
    }));
    alert(`${dish.name} added to cart!`); // Simple feedback
  };

  return (
    <button
      onClick={handleAddToCart}
      style={{
        background: '#0070f3',
        color: 'white',
        padding: '8px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '10px',
        fontSize: '0.9em',
      }}
      disabled={dish.stock === 'Out of Stock'} // Disable if out of stock
    >
      {dish.stock === 'Out of Stock' ? 'Out of Stock' : t('addToCart')}
    </button>
  );
}