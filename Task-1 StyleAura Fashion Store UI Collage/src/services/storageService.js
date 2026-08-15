// Temporary Client-Side Storage Service Layer for StyleAura

const USER_DATA_KEY_PREFIX = 'styleaura_user_data_';

const getDefaultUserData = (user) => ({
  id: user?.id || 'usr_101',
  name: user?.name || 'Raga Loknath',
  email: user?.email || 'ragaloknath@gmail.com',
  phone: user?.phone || '+1 (555) 234-5678',
  avatar: user?.avatar || user?.photoURL || '',
  addresses: [
    {
      id: 'addr_1',
      name: user?.name || 'Raga Loknath',
      phone: user?.phone || '+1 (555) 234-5678',
      addressLine1: '123 Fashion Blvd, Suite 400',
      addressLine2: 'Apt 2B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: true,
    },
  ],
  orders: [
    {
      id: 'ORD-2025-9842',
      date: '2025-02-10',
      total: 249.99,
      status: 'Delivered',
      items: [
        { id: '1', title: 'White Oversized Blazer', price: 149.99, quantity: 1, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80' },
        { id: '2', title: 'Designer Denim Jacket', price: 99.99, quantity: 1, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80' },
      ],
    },
  ],
  paymentMethods: [
    {
      id: 'pay_1',
      type: 'Visa',
      cardNumber: '•••• •••• •••• 4242',
      cardHolder: user?.name || 'Raga Loknath',
      expiry: '12/28',
      isDefault: true,
    },
  ],
  settings: {
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
  },
});

export const storageService = {
  getUserData(user) {
    if (!user?.email && !user?.name) {
      return getDefaultUserData(user);
    }
    const key = USER_DATA_KEY_PREFIX + (user.email || user.name || 'default');
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load user data from localStorage', e);
    }
    const initial = getDefaultUserData(user);
    this.saveUserData(user, initial);
    return initial;
  },

  saveUserData(user, data) {
    const key = USER_DATA_KEY_PREFIX + (user?.email || user?.name || 'default');
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save user data to localStorage', e);
    }
  },
};
