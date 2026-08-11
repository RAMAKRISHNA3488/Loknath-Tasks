import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { GenericPage } from './pages/GenericPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="new-in" element={<GenericPage title="New Arrivals" subtitle="Discover the newest clothing trends, modern drops, and seasonal arrivals." />} />
            <Route path="collections" element={<GenericPage title="Featured Collections" subtitle="Explore curated capsule wardrobes and exclusive StyleAura lookbooks." />} />
            <Route path="about" element={<GenericPage title="About StyleAura" subtitle="Empowering fashion lovers with modern aesthetic apparel and ethical craftsmanship." />} />
            <Route path="contact" element={<GenericPage title="Contact Us" subtitle="Have questions or feedback? We'd love to hear from you." />} />
            <Route path="cart" element={<GenericPage title="Shopping Cart" subtitle="Your cart items will appear here." />} />
            <Route path="wishlist" element={<GenericPage title="Your Wishlist" subtitle="Saved items and favorite fashion pieces." />} />
            <Route path="account" element={<GenericPage title="Customer Portal" subtitle="Sign in to manage orders, addresses, and wishlist." />} />
            <Route path="*" element={<GenericPage title="Page Not Found" subtitle="The requested route does not exist." />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
