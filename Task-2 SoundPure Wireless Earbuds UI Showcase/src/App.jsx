import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './data/cartContext'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'


import Home from './pages/Home'
import ProductOverview from './pages/ProductOverview'
import ProductDetails from './pages/ProductDetails'
import Features from './pages/Features'
import Reviews from './pages/Reviews'
import Support from './pages/Support'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import PayPalCheckout from './pages/PayPalCheckout'
import ApplePayCheckout from './pages/ApplePayCheckout'
import OrderConfirmation from './pages/OrderConfirmation'
import Account from './pages/Account'
import Orders from './pages/Orders'
import About from './pages/About'
import Careers from './pages/Careers'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Blog from './pages/Blog'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#F0F5FA] text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white flex flex-col">

          {/* Global SoundPure Navbar shared across all routes */}
          <Navbar />
          
          {/* Router View Container */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<ProductOverview />} />
              <Route path="/product/overview" element={<ProductOverview />} />
              <Route path="/product/details" element={<ProductDetails />} />
              <Route path="/features" element={<Features />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/support" element={<Support />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/paypal" element={<PayPalCheckout />} />
              <Route path="/checkout/apple-pay" element={<ApplePayCheckout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/account" element={<Account />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>


  )
}
