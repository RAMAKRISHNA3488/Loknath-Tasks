import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sparkles, ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist } = useCart() || { cart: [], wishlist: [] };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New In', path: '/new-in' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-neutral-900 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span>
            Style<span className="text-primary font-black">Aura</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-neutral-600">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative py-2 transition-colors hover:text-primary ${
                  isActive
                    ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-neutral-700'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-4 text-neutral-700">
          
          {/* Search Trigger / Input */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-neutral-100 rounded-full px-3 py-1.5 border border-neutral-300">
                <Search className="w-4 h-4 text-neutral-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm focus:outline-none w-32 sm:w-44 text-neutral-800"
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-neutral-400 hover:text-neutral-700 ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative"
          >
            <Heart className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {wishlist.length}
            </span>
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            aria-label="Shopping Bag"
            className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {cart.length}
            </span>
          </Link>

          {/* Account Icon */}
          <Link
            to="/account"
            aria-label="Account"
            className="hidden sm:flex p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-neutral-700 hover:text-primary rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-600 px-3">
            <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-primary">
              <User className="w-4 h-4" /> Account Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
