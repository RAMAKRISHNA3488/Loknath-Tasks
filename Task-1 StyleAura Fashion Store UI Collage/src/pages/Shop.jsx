import React from 'react';
import { Filter, Grid, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const Shop = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-primary text-xs font-bold uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Catalog & Collections
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Explore All <span className="text-primary">Styles</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base">
            Browse our latest arrivals, classic fashion pieces, and seasonal trends curated just for you.
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-2 text-neutral-700 text-sm font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span>Filters & Categories</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-xl transition-colors">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort By: Featured
          </button>
          <button className="p-2 text-neutral-600 hover:text-primary bg-neutral-100 rounded-xl">
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Preview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-4 hover:shadow-lg transition-all group">
            <div className="aspect-[4/5] bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400 font-semibold group-hover:scale-[1.02] transition-transform">
              Fashion Item #{item}
            </div>
            <div>
              <span className="text-xs font-bold text-primary uppercase">New Arrival</span>
              <h3 className="font-bold text-neutral-900 mt-0.5">StyleAura Signature Wear #{item}</h3>
              <p className="text-sm text-neutral-500 font-medium mt-1">$89.00</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
