import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/navigation';

export default async function AboutPage() {
  const t = await getTranslations('about');
  const tNav = await getTranslations('navigation');

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
        &larr; {tNav('home')}
      </Link>
    </main>
  );
}