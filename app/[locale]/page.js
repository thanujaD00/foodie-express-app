import {getTranslations} from 'next-intl/server';
import {Link} from '../../lib/navigation';

export default async function HomePage() {
  const t = await getTranslations('home');
  const tNav = await getTranslations('navigation');

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>
            <Link href="/restaurants" style={{ color: 'blue', textDecoration: 'underline' }}>
              {tNav('restaurants')}
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link href="/about" style={{ color: 'blue', textDecoration: 'underline' }}>
              {tNav('about')}
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}