import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Package, 
  MapPin, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogIn, 
  UserPlus,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/productsData';

export const Navbar = ({ transparent = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const { cart, wishlist, user, logoutUser, searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New In', path: '/category/new-arrivals' },
    { name: 'Collections', path: '/lookbook' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Search Results filtering
  const matchingProducts = searchQuery.trim()
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
        );
      }).slice(0, 5)
    : [];

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Keep search open if there is search query text, else close
        if (!searchQuery) {
          setSearchOpen(false);
        }
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setAccountMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop');
      setSearchOpen(false);
    }
  };

  const handleSelectProduct = (prodId) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${prodId}`);
  };

  const handleLogout = () => {
    setAccountMenuOpen(false);
    logoutUser();
  };

  const userInitial = (user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase();

  return (
    <header className={`z-50 transition-all ${transparent ? 'bg-transparent border-none shadow-none' : 'sticky top-0 bg-white/95 backdrop-blur-md border-b border-neutral-200/60'}`}>
      <div className="w-[94vw] max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1.5 text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 group">
          <span>
            Style<span className="text-primary font-black">Aura</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 sm:gap-7 xl:gap-8 font-bold text-sm sm:text-base text-neutral-800">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1.5 transition-colors hover:text-primary ${
                  isActive
                    ? 'text-neutral-900 font-extrabold after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 text-neutral-700">
          
          {/* Search Input & Live Results Overlay */}
          <div className="relative" ref={searchRef}>
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-neutral-100 rounded-full px-3.5 py-1.5 border border-neutral-300 relative shadow-inner">
                <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm focus:outline-none w-36 sm:w-56 text-neutral-800 font-medium"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-neutral-400 hover:text-neutral-700 ml-1.5 p-0.5 rounded-full hover:bg-neutral-200/50 transition-colors"
                  title="Close Search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all"
              >
                <Search className="w-5 h-5 stroke-[2.2]" />
              </button>
            )}

            {/* Live Search Autocomplete Dropdown */}
            {searchOpen && searchQuery.trim() && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <span>Relevant Products</span>
                  <span>{matchingProducts.length} matches</span>
                </div>

                {matchingProducts.length > 0 ? (
                  <div className="divide-y divide-neutral-100 py-1 max-h-64 overflow-y-auto">
                    {matchingProducts.map((prod) => (
                      <button
                        key={prod.id}
                        onClick={() => handleSelectProduct(prod.id)}
                        className="w-full py-2 px-2 flex items-center gap-3 hover:bg-neutral-50 rounded-xl transition-colors text-left"
                      >
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shrink-0 bg-neutral-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-neutral-900 truncate">{prod.title}</h4>
                          <span className="text-[10px] text-neutral-400 block uppercase">{prod.category}</span>
                        </div>
                        <span className="text-xs font-black text-primary">${prod.price.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-neutral-500 font-medium">
                    No matching products found for "{searchQuery}".
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-100">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
                  >
                    View All Search Results <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Wishlist Icon with Fixed Real Count Badge */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative"
          >
            <Heart className="w-5 h-5 stroke-[2.2]" />
            {wishlist && wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-in zoom-in duration-200">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            aria-label="Shopping Bag"
            className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all relative"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            {totalCartItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-in zoom-in duration-200">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Account Profile Icon / Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              aria-label="Account Profile"
              className="p-2 hover:text-primary hover:bg-primary/5 rounded-full transition-all flex items-center justify-center relative focus:outline-none"
            >
              {user?.isAuthenticated ? (
                user.avatar || user.photoURL ? (
                  <img
                    src={user.avatar || user.photoURL}
                    alt={user.name || 'User Profile'}
                    className="w-6 h-6 rounded-full object-cover border border-neutral-300 shadow-sm"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-[12px] flex items-center justify-center shadow-md ring-2 ring-neutral-900/20">
                    {userInitial}
                  </div>
                )
              ) : (
                <User className="w-5 h-5 stroke-[2.2]" />
              )}
            </button>

            {/* Account Dropdown Card */}
            {accountMenuOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-neutral-800">
                {user?.isAuthenticated ? (
                  <>
                    {/* User Profile Header */}
                    <div className="px-3.5 py-3 border-b border-neutral-100 flex items-center gap-3 bg-neutral-50/70 rounded-xl mb-1">
                      {user.avatar || user.photoURL ? (
                        <img
                          src={user.avatar || user.photoURL}
                          alt={user.name || 'User'}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-neutral-900 text-white font-bold text-base flex items-center justify-center shadow-lg ring-2 ring-neutral-900/10">
                          {userInitial}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-neutral-900 truncate">
                          {user.name || 'Raga Loknath'}
                        </p>
                        <p className="text-xs text-neutral-500 truncate">
                          {user.email || 'ragaloknath@gmail.com'}
                        </p>
                      </div>
                    </div>

                    {/* Authenticated Account Links */}
                    <div className="space-y-0.5 pt-1 text-sm font-medium">
                      <Link
                        to="/profile"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-neutral-500" />
                          <span>My Profile</span>
                        </div>
                        <span className="text-neutral-300 text-xs font-mono">›</span>
                      </Link>
                      <Link
                        to="/account/orders"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-neutral-500" />
                          <span>My Orders</span>
                        </div>
                        <span className="text-neutral-300 text-xs font-mono">›</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="w-4 h-4 text-neutral-500" />
                          <span>Wishlist</span>
                        </div>
                        <span className="text-neutral-300 text-xs font-mono">›</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingBag className="w-4 h-4 text-neutral-500" />
                          <span>Shopping Cart</span>
                        </div>
                        <span className="text-neutral-300 text-xs font-mono">›</span>
                      </Link>
                      <Link
                        to="/account/addresses"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-neutral-500" />
                          <span>Saved Addresses</span>
                        </div>
                        <span className="text-neutral-300 text-xs font-mono">›</span>
                      </Link>
                      <Link
                        to="/account/payment-methods"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-4 h-4 text-neutral-500" />
                          <span>Payment Methods</span>
                        </div>
                        <span className="text-neutral-300 text-xs font-mono">›</span>
                      </Link>
                      <Link
                        to="/account/settings"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Settings className="w-4 h-4 text-neutral-500" />
                          <span>Account Settings</span>
                        </div>
                        <span className="text-neutral-300 text-xs font-mono">›</span>
                      </Link>
                      <Link
                        to="/support"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-4 h-4 text-neutral-500" />
                          <span>Help & Support</span>
                        </div>
                        <span className="text-neutral-300 text-xs font-mono">›</span>
                      </Link>
                    </div>

                    {/* Divider & Logout */}
                    <div className="border-t border-neutral-100 pt-1.5 mt-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 font-bold transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </div>
                        <span className="text-red-300 text-xs font-mono">›</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-2 space-y-2">
                    <div className="text-center py-2 border-b border-neutral-100">
                      <p className="text-xs font-bold text-neutral-900">Welcome to StyleAura</p>
                      <p className="text-[11px] text-neutral-500">Log in to manage orders & wishlist</p>
                    </div>
                    <Link
                      to="/login"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs shadow-md shadow-primary/25 transition-all"
                    >
                      <LogIn className="w-4 h-4" /> Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-bold text-xs transition-all"
                    >
                      <UserPlus className="w-4 h-4" /> Create Account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bg-white border-b border-neutral-200 shadow-2xl p-6 z-40 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3 font-bold text-base text-neutral-800">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2 px-4 rounded-xl transition-colors ${
                    isActive ? 'bg-primary/10 text-primary font-black' : 'hover:bg-neutral-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
