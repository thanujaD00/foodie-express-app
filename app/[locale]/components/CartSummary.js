// app/components/CartSummary.js
'use client';

import { useSelector } from 'react-redux';
import {useTranslations} from 'next-intl';
import {Link} from '../../../lib/navigation';

export default function CartSummary() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const t = useTranslations('navigation');

  return (
    <Link href="/cart" style={{ textDecoration: 'none', color: '#333', fontSize: '1.1em', fontWeight: 'bold' }}>
      🛒 {t('cart')} ({totalQuantity})
    </Link>
  );
}