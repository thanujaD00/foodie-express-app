// app/restaurants/[slug]/page.js
import Link from 'next/link';
import AddToCartButton from '@/app/components/AddToCartButton'; // Import AddToCartButton

// Simulate fetching menu data for a specific restaurant (SSR)
async function getRestaurantMenu(slug) {
  const menus = {
    'pizza-palace': {
      name: 'Pizza Palace',
      description: 'Delicious pizzas for every craving.',
      dishes: [
        { id: 'pp-margherita', name: 'Margherita Pizza', price: 12.99, stock: 'In Stock' },
        { id: 'pp-pepperoni', name: 'Pepperoni Pizza', price: 14.50, stock: 'In Stock' },
        { id: 'pp-veggie', name: 'Veggie Supreme', price: 13.75, stock: 'Low Stock' },
        { id: 'pp-garlic-knots', name: 'Garlic Knots', price: 4.99, stock: 'Out of Stock' },
      ],
    },
    'sushi-heaven': {
      name: 'Sushi Heaven',
      description: 'Authentic Japanese sushi and rolls.',
      dishes: [
        { id: 'sh-california', name: 'California Roll', price: 9.99, stock: 'In Stock' },
        { id: 'sh-spicy-tuna', name: 'Spicy Tuna Roll', price: 11.50, stock: 'In Stock' },
        { id: 'sh-sashimi', name: 'Sashimi Platter', price: 22.00, stock: 'In Stock' },
      ],
    },
    'burger-barn': {
        name: 'Burger Barn',
        description: 'Juicy burgers and crispy fries.',
        dishes: [
          { id: 'bb-cheeseburger', name: 'Classic Cheeseburger', price: 9.00, stock: 'In Stock' },
          { id: 'bb-baconator', name: 'Baconator Burger', price: 11.00, stock: 'In Stock' },
          { id: 'bb-fries', name: 'Sweet Potato Fries', price: 5.50, stock: 'In Stock' },
        ],
      },
  };

  // Simulate a random stock change for demonstration (real-time data)
  if (slug === 'pizza-palace') {
    const garlicKnots = menus['pizza-palace'].dishes.find(d => d.id === 'pp-garlic-knots');
    if (Math.random() < 0.5) {
        garlicKnots.stock = 'In Stock';
    } else {
        garlicKnots.stock = 'Out of Stock';
    }
  }

  await new Promise(resolve => setTimeout(resolve, 800));
  return menus[slug] || null;
}

export default async function RestaurantMenuPage({ params }) {
  const restaurant = await getRestaurantMenu(params.slug);

  if (!restaurant) {
    return (
      <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Restaurant Not Found</h1>
        <p>The restaurant you are looking for does not exist.</p>
        <Link href="/restaurants" style={{ color: 'blue', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
          &larr; Back to Restaurants
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{restaurant.name} Menu</h1>
      <p>{restaurant.description}</p>
      <Link href="/restaurants" style={{ color: 'blue', textDecoration: 'underline', marginBottom: '20px', display: 'inline-block' }}>
        &larr; Back to Restaurants
      </Link>

      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Dishes</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {restaurant.dishes.map((dish) => (
          <li key={dish.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #f0f0f0', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>{dish.name}</strong> - ${dish.price.toFixed(2)}
              {' '}
              <span style={{ color: dish.stock === 'In Stock' ? 'green' : (dish.stock === 'Low Stock' ? 'orange' : 'red'), fontWeight: 'bold' }}>
                ({dish.stock})
              </span>
            </div>
            <AddToCartButton dish={dish} restaurantName={restaurant.name} /> {/* Pass dish and restaurant name */}
          </li>
        ))}
      </ul>
    </main>
  );
}