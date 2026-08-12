import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Tag } from 'lucide-react';
import { CategoryCard } from '../components/ui';
import { Navbar } from '../components/Navbar';

import heroBgImg from '../assets/hero-bg.png';
import heroPinkModel from '../assets/hero-pink-model.png';
import womensWearCatImg from '../assets/category-womens-wear.png';
import footwearCatImg from '../assets/category-footwear.png';
import accessoriesCatImg from '../assets/category-accessories.png';
import newArrivalsCatImg from '../assets/category-new-arrivals.png';
import saleBannerPromoImg from '../assets/sale-banner-promo.png';

export const Home = () => {

  const categories = [
    {
      title: "Woman's Wear",
      image: womensWearCatImg,
      slug: 'womens-wear',
    },
    {
      title: 'Footwear',
      image: footwearCatImg,
      slug: 'footwear',
    },
    {
      title: 'Accessories',
      image: accessoriesCatImg,
      slug: 'accessories',
    },
    {
      title: 'New Arrivals',
      image: newArrivalsCatImg,
      slug: 'new-arrivals',
    },
  ];

  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION */}
      <section className="w-full relative overflow-hidden bg-white min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] flex flex-col justify-between pb-12 sm:pb-16">
        
        {/* Background Image (Left Half Architecture) */}
        <div 
          className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-cover bg-no-repeat bg-center transition-all duration-300 pointer-events-none"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        />

        {/* Right Half Pink Model Background Container */}
        <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/2 bg-[#F6A5BC] z-0 pointer-events-none overflow-hidden items-center justify-center">
          <img 
            src={heroPinkModel} 
            alt="StyleAura Model" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Soft Left Contrast Overlay */}
        <div 
          className="absolute inset-y-0 left-0 w-full lg:w-1/2 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)'
          }}
        />

        {/* Top Navbar Area */}
        <div className="relative z-30 w-full pt-2">
          <Navbar transparent={true} />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 max-w-xl">
            <span className="text-primary font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase block">
              EXPRESS YOURSELF
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black text-neutral-900 tracking-tight leading-[1.08]">
              Elevate Your <br className="hidden sm:inline" />
              <span className="text-primary">Everyday Style</span>
            </h1>

            <p className="text-neutral-600 text-base sm:text-lg max-w-md font-medium leading-relaxed">
              Discover the latest fashion that&apos;s trending this season.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/shop">
                <button className="bg-primary hover:bg-primary/95 text-white font-bold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-lg shadow-primary/35 hover:shadow-xl hover:shadow-primary/45 transition-all flex items-center gap-3 active:scale-95 cursor-pointer">
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
                </button>
              </Link>
              <Link to="/lookbook">
                <button className="bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200/90 font-bold text-base sm:text-lg px-7 py-3.5 rounded-full shadow-md shadow-neutral-200/50 hover:shadow-lg transition-all flex items-center gap-3.5 active:scale-95 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-red-100/80 flex items-center justify-center text-primary shrink-0">
                    <Play className="w-4 h-4 fill-primary text-primary ml-0.5" />
                  </div>
                  <span>Watch Lookbook</span>
                </button>
              </Link>
            </div>

            {/* Customer Trust Bar */}
            <div className="pt-3 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Customer Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Customer Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80"
                  alt="Customer Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-extrabold text-neutral-900">
                  Loved by 25K+ Customers
                </p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-neutral-800">4.9</span>
                  <span>(290 Reviews)</span>
                </div>
              </div>
            </div>

          </div>


        </div>

      </section>

      {/* OVERLAPPING TRUSTED BY TOP BRANDS BAR */}
      <div className="relative z-20 w-full max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 -mt-12 sm:-mt-14 mb-6 sm:mb-10">
        <div className="bg-white rounded-3xl sm:rounded-[36px] px-6 sm:px-10 py-5 sm:py-6 shadow-xl border border-neutral-100/90 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
          
          <span className="text-sm sm:text-base font-extrabold text-neutral-900 tracking-tight whitespace-nowrap shrink-0">
            Trusted By Top Brands
          </span>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 lg:gap-12 w-full md:w-auto">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-widest text-neutral-900 shrink-0">ZARA</span>
            <span className="font-extrabold text-base sm:text-xl tracking-[0.2em] text-neutral-900 shrink-0">MANGO</span>
            <span className="font-black text-xl sm:text-2xl tracking-tighter text-[#E60023] italic font-serif shrink-0">H&M</span>
            <span className="font-black text-base sm:text-xl tracking-wider text-neutral-900 shrink-0">BERSHKA</span>
            <span className="font-serif italic text-sm sm:text-lg tracking-wide text-neutral-900 shrink-0">stradivarius</span>
            <span className="font-black text-base sm:text-xl tracking-wider text-neutral-900 shrink-0">asos</span>
          </div>

        </div>
      </div>

      {/* LOWER HOMEPAGE CONTENT */}
      <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-14 lg:space-y-16 pb-12 sm:pb-16">
        
        {/* 2. CATEGORY GRID */}
        <section className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {categories.map((cat, idx) => (
              <Link key={idx} to={`/category/${cat.slug}`} className="block h-full group">
                <CategoryCard {...cat} className="h-full" />
              </Link>
            ))}
          </div>
        </section>

        {/* 3. PROMOTIONAL SALE BANNER */}
        <section className="w-full relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-[#FFF0F3] border border-red-100/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left Text & Interactive Content */}
            <div className="lg:col-span-5 space-y-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md shadow-primary/30 shrink-0">
                  <Tag className="w-5 h-5 fill-white text-white" />
                </div>
                <span className="text-primary font-bold text-sm sm:text-base tracking-wide">
                  Summer Sale is Live!
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.1]">
                Up to <span className="text-primary font-black">50% Off</span>
              </h2>

              <p className="text-neutral-600 text-sm sm:text-base max-w-md font-medium leading-relaxed">
                Shop your favorite styles at unbeatable prices.
              </p>

              <div className="pt-2">
                <Link to="/shop" className="inline-block">
                  <button className="bg-primary hover:bg-primary/95 text-white font-bold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-lg shadow-primary/35 hover:shadow-xl hover:shadow-primary/45 transition-all flex items-center gap-3 active:scale-95 cursor-pointer">
                    <span>Shop Now</span>
                    <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right High-Resolution Banner Image */}
            <div className="lg:col-span-7 flex items-center justify-end">
              <Link to="/shop" className="block w-full group cursor-pointer">
                <img
                  src={saleBannerPromoImg}
                  alt="Summer Sale Promo - Woman, Sneaker, Handbag"
                  className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl shadow-sm transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </Link>
            </div>

          </div>
        </section>

      </div>

    </div>
  );
};
