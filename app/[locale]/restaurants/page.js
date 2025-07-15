import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/navigation';

// Simulate fetching restaurant data at build time (SSG)
async function getRestaurants() {
  // In a real app, this would be a fetch call to your API
  const restaurants = [
    { id: 'pizza-palace', name: 'Pizza Palace', cuisine: 'Italian', slug: 'pizza-palace' },
    { id: 'sushi-heaven', name: 'Sushi Heaven', cuisine: 'Japanese', slug: 'sushi-heaven' },
    { id: 'burger-barn', name: 'Burger Barn', cuisine: 'American', slug: 'burger-barn' },
  ];
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return restaurants;
}

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants(); // Data fetching occurs on the server
  const t = await getTranslations('restaurants');
  const tNav = await getTranslations('navigation');

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{t('title')}</h1>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>
        &larr; {tNav('home')}
      </Link>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
            <Link href={`/restaurants/${restaurant.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>{restaurant.name}</h2>
              <p>Cuisine: {restaurant.cuisine}</p>
              <p style={{ color: 'blue' }}>{t('viewMenu')} &rarr;</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}