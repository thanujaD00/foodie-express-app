// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { Providers } from './providers'; // Path adjusted back
import CartSummary from './components/CartSummary'; // Path adjusted back

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FoodieExpress - Order Food Online',
  description: 'Your favorite food, delivered fast!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> {/* Set default language back to 'en' */}
      <body className={inter.className}>
        <Providers>
          <header style={{ background: '#f8f8f8', padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}> {/* Link back to root */}
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
            {/* Remove LocaleSwitcher here */}
            <CartSummary />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}