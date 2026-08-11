import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Truck } from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-brand-gray text-white px-6 sm:px-12 py-20 my-6 shadow-2xl">
        <div className="max-w-2xl space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 bg-primary/20 text-primary-light border border-primary/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Summer Collection 2026
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Redefine Your <span className="text-primary">Style Aura</span>
          </h1>
          <p className="text-neutral-300 text-lg sm:text-xl font-normal leading-relaxed">
            Discover modern apparel, premium fashion aesthetics, and tailored looks designed to express your individuality.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all flex items-center gap-2">
              Explore Collection <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-3.5 rounded-xl font-semibold transition-all border border-white/15">
              View Lookbook
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Express Delivery</h3>
            <p className="text-xs text-neutral-500 mt-1">Fast & reliable shipping on all orders nationwide.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Premium Quality</h3>
            <p className="text-xs text-neutral-500 mt-1">Curated fabrics & sustainable production standards.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Trending Styles</h3>
            <p className="text-xs text-neutral-500 mt-1">Fresh designs updated weekly by top creators.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
