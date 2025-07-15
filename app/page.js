// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Welcome to FoodieExpress!</h1>
      <p>Your one-stop shop for delicious food delivery.</p>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>
            <Link href="/restaurants" style={{ color: 'blue', textDecoration: 'underline' }}>
              Explore Restaurants
            </Link>
          </li>
          <li style={{ margin: '10px 0' }}>
            <Link href="/about" style={{ color: 'blue', textDecoration: 'underline' }}>
              About Us
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}