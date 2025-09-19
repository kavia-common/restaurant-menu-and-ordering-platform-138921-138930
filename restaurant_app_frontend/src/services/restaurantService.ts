import { MenuItem } from '../components/MenuItemCard';

export type RestaurantInfo = {
  name: string;
  address: string;
  phone: string;
  description: string;
  bannerImage?: string;
  hours?: Record<string, string>;
};

// PUBLIC_INTERFACE
export async function fetchMenu(): Promise<MenuItem[]> {
  /** Fetch the restaurant menu list. Placeholder endpoint for now. */
  // return apiGet<MenuItem[]>('/menu');
  // Mocked fallback while backend integrates:
  return Promise.resolve([
    { id: '1', name: 'Grilled Salmon', description: 'Fresh Atlantic salmon with lemon butter.', price: 18.5, spicy: false },
    { id: '2', name: 'Spicy Tuna Roll', description: 'Classic roll with a kick.', price: 12.0, spicy: true },
    { id: '3', name: 'Garden Salad', description: 'Crisp greens, cherry tomatoes, vinaigrette.', price: 9.0, vegetarian: true },
    { id: '4', name: 'Chicken Teriyaki', description: 'Served with jasmine rice and veggies.', price: 15.25 },
  ]);
}

// PUBLIC_INTERFACE
export async function submitOrder(items: { id: string; quantity: number }[]): Promise<{ orderId: string; status: 'confirmed' }> {
  /** Submit an order with selected items. Placeholder endpoint for now. */
  // return apiPost<{ orderId: string; status: 'confirmed' }>('/orders', { items });
  // Mocked response using items to avoid unused param warnings
  void items;
  return Promise.resolve({ orderId: String(Date.now()), status: 'confirmed' });
}

// PUBLIC_INTERFACE
export async function fetchRestaurantInfo(): Promise<RestaurantInfo> {
  /** Fetch restaurant details. Placeholder endpoint for now. */
  // return apiGet<RestaurantInfo>('/restaurant');
  return Promise.resolve({
    name: 'Ocean Bistro',
    address: '123 Harbor Way, Seaside',
    phone: '(555) 123-4567',
    description: 'Modern coastal cuisine with a focus on fresh, sustainable seafood.',
    bannerImage: 'https://picsum.photos/seed/restaurant/900/300',
    hours: {
      Monday: '11:00 AM - 9:00 PM',
      Tuesday: '11:00 AM - 9:00 PM',
      Wednesday: '11:00 AM - 9:00 PM',
      Thursday: '11:00 AM - 9:00 PM',
      Friday: '11:00 AM - 10:00 PM',
      Saturday: '10:00 AM - 10:00 PM',
      Sunday: '10:00 AM - 8:00 PM',
    }
  });
}
