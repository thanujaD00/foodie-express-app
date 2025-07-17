// app/cart/page.js
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, clearCartAndStorage, addItemToCart } from '@/redux/features/cart/cartSlice'; // Adjust path
import {useTranslations} from 'next-intl';
import {Link} from '../../../lib/navigation';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const t = useTranslations('cart');
  const tNav = useTranslations('navigation');
  const tCommon = useTranslations('common');

  if (cartItems.length === 0) {
    return (
      <main style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1>{t('empty')}</h1>
        <p>Start by exploring our delicious restaurants!</p>
        <Link href="/restaurants" style={{ color: 'blue', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
          {tNav('restaurants')}
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{t('title')}</h1>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>
        &larr; {tNav('home')}
      </Link>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map((item) => (
          <li key={`${item.id}-${item.restaurantName}`} style={{ border: '1px solid #f0f0f0', padding: '15px', marginBottom: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>{item.name}</strong> ({item.restaurantName}) - ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div>
              <button
                onClick={() => dispatch(addItemToCart({ id: item.id, name: item.name, price: item.price, restaurantName: item.restaurantName }))}
                style={{ background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeItemFromCart({ id: item.id, restaurantName: item.restaurantName }))}
                style={{ background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '20px', textAlign: 'right' }}>
        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Total Items: {totalQuantity}</p>
        <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{t('total')}: ${totalAmount.toFixed(2)}</p>
        <button
          onClick={() => dispatch(clearCartAndStorage())}
          style={{ background: '#607D8B', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
        >
          Clear Cart
        </button>
        <button
          style={{ background: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {t('checkout')}
        </button>
      </div>
    </main>
  );
}