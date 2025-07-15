import Link from 'next/link';

export default function AboutPage() {
  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>About FoodieExpress</h1>
      <p>We deliver happiness, one meal at a time!</p>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
        &larr; Back to Home
      </Link>
    </main>
  );
}