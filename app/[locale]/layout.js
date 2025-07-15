import { Inter } from 'next/font/google';
import '../globals.css';
import Image from 'next/image';
import { Providers } from '../providers';
import CartSummary from './components/CartSummary';
import { Link } from '../../lib/navigation';
import LanguageSwitcher from './components/LanguageSwitcher';
import {useTranslations} from 'next-intl';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '../../next-intl.config';
import {notFound} from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FoodieExpress - Order Food Online',
  description: 'Your favorite food, delivered fast!',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({ children, params }) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <LocaleContent>{children}</LocaleContent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function LocaleContent({ children }) {
  const t = useTranslations('navigation');

  return (
    <Providers>
      <header style={{ 
        background: '#f8f8f8', 
        padding: '15px 20px', 
        borderBottom: '1px solid #eee', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Image
            src="/foodie-logo.png"
            alt="FoodieExpress Logo"
            width={40}
            height={40}
            priority
            style={{ marginRight: '10px' }}
          />
          <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>FoodieExpress</h1>
        </Link>
        
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#333' }}>
            {t('home')}
          </Link>
          <Link href="/about" style={{ textDecoration: 'none', color: '#333' }}>
            {t('about')}
          </Link>
          <Link href="/restaurants" style={{ textDecoration: 'none', color: '#333' }}>
            {t('restaurants')}
          </Link>
          <LanguageSwitcher />
          <CartSummary />
        </nav>
      </header>
      {children}
    </Providers>
  );
}
