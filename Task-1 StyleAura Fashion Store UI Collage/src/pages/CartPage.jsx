import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '../components/ui';
import { useApp } from '../context/AppContext';

export const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0.0 : 15.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-8 py-2 max-w-7xl mx-auto">
      
      <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
        Shopping Cart
      </h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Cart Table (8 Columns) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-neutral-200/80 p-4 sm:p-6 shadow-sm space-y-4">
            <div className="max-h-[480px] overflow-y-auto overflow-x-auto pr-2">
              <table className="w-full text-left border-collapse relative">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-neutral-200 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    <th className="pb-4 pt-1 font-bold bg-white">Product</th>
                    <th className="pb-4 pt-1 font-bold bg-white">Price</th>
                    <th className="pb-4 pt-1 font-bold text-center bg-white">Quantity</th>
                    <th className="pb-4 pt-1 font-bold text-right bg-white">Total</th>
                    <th className="pb-4 pt-1 font-bold text-center bg-white">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm">
                  {cart.map((item, idx) => (
                    <tr key={`${item.id}-${item.size}-${item.color}-${idx}`} className="group hover:bg-neutral-50/50">
                      
                      {/* Product Thumbnail & Details */}
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-20 rounded-2xl bg-neutral-100 border border-neutral-200 shrink-0 overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <Link to={`/product/${item.id}`} className="font-bold text-neutral-900 hover:text-primary transition-colors block">
                              {item.title}
                            </Link>
                            <div className="text-xs text-neutral-400 mt-1 flex gap-3">
                              <span>Size: <strong className="text-neutral-700">{item.size || 'M'}</strong></span>
                              <span>Color: <strong className="text-neutral-700">{item.color || 'Pink'}</strong></span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 font-bold text-neutral-900 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>

                      {/* Quantity Selector */}
                      <td className="py-4 text-center">
                        <div className="inline-flex items-center bg-neutral-100 rounded-full border border-neutral-200 p-1">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.size, item.color, -1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-primary shadow-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-extrabold text-neutral-900 text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.size, item.color, 1)}
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-primary shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                      {/* Item Total */}
                      <td className="py-4 font-black text-neutral-900 text-right whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>

                      {/* Delete Icon */}
                      <td className="py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
              <Link to="/shop" className="text-xs font-bold text-neutral-600 hover:text-primary">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Box (4 Columns) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-black text-neutral-900 border-b border-neutral-100 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="font-bold text-neutral-900">
                  {shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}
                </span>
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

            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/checkout')}
              className="w-full shadow-xl shadow-primary/30 py-3.5"
            >
              Proceed to Checkout <ArrowRight className="w-5 h-5 ml-1" />
            </Button>

            <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" /> Free shipping on orders over $50
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> 100% Secure SSL Checkout
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-red-100 text-primary flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900">Your cart is empty</h2>
          <p className="text-neutral-500 text-sm">Looks like you haven't added any fashion items yet.</p>
          <div className="pt-2">
            <Link to="/shop">
              <Button variant="primary" size="md">
                Explore Shop Now
              </Button>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
