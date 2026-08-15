import React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Badge } from '../components/ui';

import heroModelImg from '../assets/about-hero-model.png';

export const AboutPage = () => {
  const stats = [
    { label: 'Happy Customers', value: '25K+' },
    { label: 'Brands', value: '500+' },
    { label: 'Products', value: '10K+' },
    { label: 'Satisfaction', value: '99%' },
  ];

  const features = [
    'High Quality Products & Eco-Friendly Fabrics',
    'Latest Fashion Trends Updated Weekly',
    'Fast & Reliable Worldwide Shipping',
    'Hassle-Free 30-Day Easy Returns',
  ];

  return (
    <div className="space-y-16 py-4 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-7 space-y-5">
          <Badge variant="soft">About StyleAura</Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            Your Destination for <span className="text-primary">Trendy Fashion</span>
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            At StyleAura, we believe fashion is more than just clothing—it's a way to express your inner aura. We bring you the latest trends, high-quality products, and exceptional shopping experience.
          </p>

          <div className="space-y-3 pt-2">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm font-bold text-neutral-800">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/3] rounded-3xl bg-neutral-100 border border-neutral-200/80 overflow-hidden shadow-xl">
            <img src={heroModelImg} alt="About StyleAura" className="w-full h-full object-cover object-top" />
          </div>
        </div>

      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-sm text-center">
        {stats.map((st, i) => (
          <div key={i} className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-primary block">{st.value}</span>
            <span className="text-xs sm:text-sm font-extrabold text-neutral-600 uppercase tracking-wider">{st.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};
