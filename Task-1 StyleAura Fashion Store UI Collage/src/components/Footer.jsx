import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      
      {/* 1. Newsletter Section (Top) */}
      <div className="border-b border-neutral-800 bg-neutral-950/50 py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Stay Updated with StyleAura
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-800 text-white placeholder-neutral-500 text-sm px-4 py-3 rounded-full border border-neutral-700 focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-primary/25 whitespace-nowrap flex items-center justify-center gap-2"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" /> Subscribed!
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Footer Grid (4 Columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info & Social Icons */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black text-white">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span>Style<span className="text-primary font-black">Aura</span></span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Curated modern fashion for trendsetters. Express your aura with high-end style, premium materials, and timeless design.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary hover:text-white flex items-center justify-center text-neutral-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#twitter" aria-label="Twitter" className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary hover:text-white flex items-center justify-center text-neutral-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary hover:text-white flex items-center justify-center text-neutral-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#youtube" aria-label="YouTube" className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-primary hover:text-white flex items-center justify-center text-neutral-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>


          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-neutral-400">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/new-in" className="hover:text-primary transition-colors">New In</Link></li>
              <li><Link to="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-neutral-400">Customer Service</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-neutral-400">Legal</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link to="/licenses" className="hover:text-primary transition-colors">Licenses & Attributions</Link></li>
            </ul>
          </div>

        </div>

        {/* 3. Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2025 StyleAura. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-neutral-800 rounded font-semibold text-neutral-300">VISA</span>
            <span className="px-2.5 py-1 bg-neutral-800 rounded font-semibold text-neutral-300">Mastercard</span>
            <span className="px-2.5 py-1 bg-neutral-800 rounded font-semibold text-neutral-300">PayPal</span>
            <span className="px-2.5 py-1 bg-neutral-800 rounded font-semibold text-neutral-300">Apple Pay</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
