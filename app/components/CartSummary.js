// app/components/CartSummary.js
'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function CartSummary() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Link href="/cart" style={{ textDecoration: 'none', color: '#333', fontSize: '1.1em', fontWeight: 'bold' }}>
      🛒 Cart ({totalQuantity})
    </Link>
  );
}