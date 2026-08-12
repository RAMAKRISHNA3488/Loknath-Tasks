import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, CreditCard, Wallet, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui';
import { useApp } from '../context/AppContext';

export const CheckoutPage = () => {
  const { cart, placeOrder, user } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Raga Loknath',
    email: user?.email || 'ragaloknath@gmail.com',
    phone: '+1 (555) 234-5678',
    address: '123 Fashion Blvd, Suite 400',
    city: 'New York',
    zipCode: '10001',
    paymentMethod: 'card',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0.0 : 15.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (isSubmitting || cart.length === 0) return;
    
    setIsSubmitting(true);

    const newOrder = placeOrder({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      country: 'United States',
      paymentMethod: formData.paymentMethod === 'card' ? 'Credit Card' : formData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery',
    });

    if (newOrder) {
      setCreatedOrder(newOrder);
    }
    setIsSubmitting(false);
  };

  if (!cart || cart.length === 0) {
    if (!createdOrder) {
      return (
        <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-100 text-primary flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900">Your Cart is Empty</h1>
            <p className="text-sm text-neutral-500 font-medium">Add items to your cart before proceeding to checkout.</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-primary/30"
          >
            Explore Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="space-y-8 py-4 max-w-7xl mx-auto px-4 sm:px-6">
      
      <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Billing & Payment Form (7 Columns) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-8">
          
          {/* Billing Details */}
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Shipping & Billing Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">Full Name</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">Address</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">City</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">ZIP Code</label>
                <input
                  type="text"
                  required
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Enter ZIP code"
                  className="w-full bg-neutral-50 text-neutral-900 text-sm px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary font-medium"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Payment Method
            </h2>

            <div className="space-y-3 text-sm">
              {[
                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                { id: 'paypal', label: 'PayPal Express', icon: Wallet },
                { id: 'cod', label: 'Cash on Delivery', icon: Truck },
              ].map((pm) => {
                const IconComponent = pm.icon;
                return (
                  <label
                    key={pm.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === pm.id
                        ? 'border-primary bg-primary/5 text-neutral-900 font-bold'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === pm.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: pm.id })}
                        className="accent-primary w-4 h-4"
                      />
                      <IconComponent className="w-5 h-5 text-primary" />
                      <span>{pm.label}</span>
                    </div>
                    <span className="text-xs font-bold text-neutral-400">Secure</span>
                  </label>
                );
              })}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="w-full py-4 text-base shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Processing Order...' : `Place Order ($${total.toFixed(2)})`}
          </Button>
        </form>

        {/* Order Summary Box (5 Columns) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-neutral-900 border-b border-neutral-100 pb-4">
            Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h2>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm border-b border-neutral-100 pb-3">
                <img src={item.image} alt={item.title || item.name} className="w-12 h-14 rounded-xl object-cover bg-neutral-100 shrink-0 border border-neutral-200" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-neutral-900 truncate">{item.title || item.name}</h4>
                  <p className="text-xs text-neutral-400">Qty: {item.quantity} | Size: {item.size || 'M'}</p>
                </div>
                <span className="font-bold text-neutral-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 text-sm pt-2">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span className="font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span className="font-bold text-neutral-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Tax (8%)</span>
              <span className="font-bold text-neutral-900">${tax.toFixed(2)}</span>
            </div>
            <div className="pt-3 border-t border-neutral-100 flex justify-between text-base font-black text-neutral-900">
              <span>Total</span>
              <span className="text-primary text-xl">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Order Success Modal */}
      {createdOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-5 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-neutral-900">Order Confirmed!</h2>
              <p className="text-neutral-600 text-sm">
                Thank you for shopping with StyleAura. Your order reference <strong className="text-primary font-black">#{createdOrder.id}</strong> has been saved.
              </p>
            </div>
            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/account/orders')}
                className="w-full shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                View My Orders <ArrowRight className="w-4 h-4" />
              </Button>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="w-full py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 uppercase tracking-wider"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
