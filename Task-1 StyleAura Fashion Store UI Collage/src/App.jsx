import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/MainLayout';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LookbookPage } from './pages/LookbookPage';
import { GenericPage } from './pages/GenericPage';
import { WishlistPage } from './pages/WishlistPage';

// Account Management Pages
import { ProfilePage } from './pages/account/ProfilePage';
import { AddressesPage } from './pages/account/AddressesPage';
import { OrdersPage } from './pages/account/OrdersPage';
import { PaymentMethodsPage } from './pages/account/PaymentMethodsPage';
import { SettingsPage } from './pages/account/SettingsPage';

// Info & Legal Pages
import { ShippingInfoPage } from './pages/info/ShippingInfoPage';
import { ReturnsPage } from './pages/info/ReturnsPage';
import { FaqPage } from './pages/info/FaqPage';
import { SizeGuidePage } from './pages/info/SizeGuidePage';
import { PrivacyPolicyPage } from './pages/info/PrivacyPolicyPage';
import { TermsPage } from './pages/info/TermsPage';
import { CookiePolicyPage } from './pages/info/CookiePolicyPage';
import { LicensesPage } from './pages/info/LicensesPage';
import { LegalPage } from './pages/info/LegalPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="lookbook" element={<LookbookPage />} />
            <Route path="collections" element={<LookbookPage />} />
            <Route path="new-in" element={<CategoryPage />} />
            <Route path="wishlist" element={<WishlistPage />} />

            {/* Account Menu Protected Routes */}
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="account/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="account/addresses" element={<ProtectedRoute><AddressesPage /></ProtectedRoute>} />
            <Route path="account/payment-methods" element={<ProtectedRoute><PaymentMethodsPage /></ProtectedRoute>} />
            <Route path="account/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="support" element={<ContactPage />} />

            {/* Dedicated Customer Service & Legal Routes */}
            <Route path="legal" element={<LegalPage />} />
            <Route path="shipping" element={<ShippingInfoPage />} />
            <Route path="returns" element={<ReturnsPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="size-guide" element={<SizeGuidePage />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="cookies" element={<CookiePolicyPage />} />
            <Route path="licenses" element={<LicensesPage />} />

            <Route path="*" element={<GenericPage title="Page Not Found" subtitle="The requested route does not exist." />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
