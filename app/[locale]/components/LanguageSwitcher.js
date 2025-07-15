'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname} from '../../../lib/navigation';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale) => {
    router.push(pathname, {locale: newLocale});
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <span style={{ fontSize: '14px', color: '#666' }}>{t('switchTo')}:</span>
      <select 
        value={locale} 
        onChange={(e) => switchLocale(e.target.value)}
        style={{
          padding: '5px 8px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          background: '#fff',
          cursor: 'pointer'
        }}
      >
        <option value="en">{t('english')}</option>
        <option value="si">{t('sinhala')}</option>
      </select>
    </div>
  );
}
