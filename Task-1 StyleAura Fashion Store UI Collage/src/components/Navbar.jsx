import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { cart, wishlist } = useCart() || { cart: [], wishlist: [] };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-900">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span>Style<span className="text-primary">Aura</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-neutral-600">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <Link to="/collections" className="hover:text-primary transition-colors">Collections</Link>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4 text-neutral-700">
          <button aria-label="Search" className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/wishlist" aria-label="Wishlist" className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" aria-label="Shopping Cart" className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative">
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/auth" aria-label="User Account" className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
            <User className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </header>
  );
};
