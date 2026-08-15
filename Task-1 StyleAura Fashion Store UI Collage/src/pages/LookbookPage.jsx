import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import heroModelImg from '../assets/about-hero-model.png';
import detailModelImg from '../assets/model-detail.png';
import loginModelImg from '../assets/model-login.png';
import sneakersImg from '../assets/product-white-sneakers.png';
import handbagImg from '../assets/product-green-handbag.png';

export const LookbookPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Women', 'Footwear', 'Accessories'];

  const lookbookItems = [
    {
      id: 1,
      title: 'Summer Editorial 2025',
      category: 'Women',
      image: heroModelImg,
      badge: 'Editorial Drop',
    },
    {
      id: 2,
      title: 'Luxury Gold Watch & Accents',
      category: 'Accessories',
      image: handbagImg,
      badge: 'Statement',
    },
    {
      id: 3,
      title: 'Chic Tailored Pink Fit',
      category: 'Women',
      image: detailModelImg,
      badge: 'New Look',
    },
    {
      id: 4,
      title: 'Urban Streetwear Kicks',
      category: 'Footwear',
      image: sneakersImg,
      badge: 'Footwear Drop',
    },
    {
      id: 5,
      title: 'Vibrant Turquoise Aura',
      category: 'Women',
      image: loginModelImg,
      badge: 'Featured',
    },
  ];

  const filteredItems = activeTab === 'All'
    ? lookbookItems
    : lookbookItems.filter((i) => i.category === activeTab);

  return (
    <div className="space-y-8 py-2 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-primary uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-200">
          Editorial Gallery
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Lookbook
        </h1>
        <p className="text-neutral-500 text-sm">
          Explore Our Latest Styles, aesthetic color stories & capsule outfits.
        </p>
      </div>

      {/* Tab Filters */}
      <div className="flex justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === t
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl border border-neutral-200/80 p-4 shadow-sm hover:shadow-xl transition-all space-y-3"
          >
            <div className="aspect-[4/5] rounded-2xl bg-neutral-100 overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-primary shadow-sm">
                {item.badge}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">{item.category}</span>
                <h3 className="font-bold text-neutral-900 text-sm">{item.title}</h3>
              </div>
              <Link
                to="/shop"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-primary hover:text-white flex items-center justify-center text-neutral-700 transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
