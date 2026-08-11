import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-20 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>Style<span className="text-primary">Aura</span></span>
            </div>
            <p className="text-sm text-neutral-400">
              Elevate your personal style with modern, curated fashion collections.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#shop" className="hover:text-primary transition-colors">Shop All</a></li>
              <li><a href="#new" className="hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#featured" className="hover:text-primary transition-colors">Featured Brands</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#help" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#shipping" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-neutral-400 mb-3">Subscribe to get special offers & updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-neutral-800 text-white text-sm px-3 py-2 rounded-lg border border-neutral-700 focus:outline-none focus:border-primary w-full"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} StyleAura Fashion Store. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> for modern fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
};
