import React from 'react';
import { ArrowRight, Play, Star, Sparkles, Footprints, ShoppingBag, Zap, Heart } from 'lucide-react';
import { Button, CategoryCard, ProductCard, Badge } from '../components/ui';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { addToCart, toggleWishlist } = useCart();

  const categories = [
    {
      title: "Women's Wear",
      subtitle: "Elegance redefined with modern dresses, tops & denim.",
      icon: Sparkles,
      bgColor: 'bg-pink-50/80 hover:bg-pink-100/80 border-pink-200/60',
      linkText: 'Explore Now',
      itemCount: 184,
    },
    {
      title: 'Footwear',
      subtitle: 'Sneakers, luxury heels & everyday comfortable boots.',
      icon: Footprints,
      bgColor: 'bg-blue-50/80 hover:bg-blue-100/80 border-blue-200/60',
      linkText: 'Explore Now',
      itemCount: 92,
    },
    {
      title: 'Accessories',
      subtitle: 'Statement bags, handcrafted jewelry & sunglasses.',
      icon: ShoppingBag,
      bgColor: 'bg-pink-50/80 hover:bg-pink-100/80 border-pink-200/60',
      linkText: 'Explore Now',
      itemCount: 128,
    },
    {
      title: 'New Arrivals',
      subtitle: 'Fresh drops & trending capsule wardrobes updated weekly.',
      icon: Zap,
      bgColor: 'bg-blue-50/80 hover:bg-blue-100/80 border-blue-200/60',
      linkText: 'Explore Now',
      itemCount: 65,
    },
  ];

  const featuredProducts = [
    {
      id: 101,
      title: 'StyleAura Couture Oversized Blazer',
      price: 129.99,
      originalPrice: 169.99,
      discount: '-23%',
      category: 'Outerwear',
    },
    {
      id: 102,
      title: 'Minimalist Satin Midi Slip Dress',
      price: 89.50,
      originalPrice: 110.00,
      discount: '-18%',
      category: "Women's Fashion",
    },
    {
      id: 103,
      title: 'Chic Chunky Leather Platform Sneakers',
      price: 145.00,
      category: 'Footwear',
    },
    {
      id: 104,
      title: 'Handcrafted Quilted Crossbody Bag',
      price: 95.00,
      originalPrice: 125.00,
      discount: '-24%',
      category: 'Accessories',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-4">
      
      {/* 1. HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> EXPRESS YOURSELF
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 tracking-tight leading-[1.1]">
            Elevate Your <br className="hidden sm:inline" />
            <span className="text-primary">Everyday Style</span>
          </h1>

          <p className="text-neutral-600 text-base sm:text-xl max-w-xl font-normal leading-relaxed">
            Discover the latest fashion that's trending this season. Express your inner aura with curated, high-end apparel tailored for modern trendsetters.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/shop">
              <Button variant="primary" size="lg" className="shadow-xl shadow-primary/25">
                Shop Now <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="gap-2">
              <Play className="w-4 h-4 fill-neutral-800" /> Watch Lookbook
            </Button>
          </div>

          {/* Trust Widget */}
          <div className="pt-6 border-t border-neutral-200/80 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2.5">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-300 font-bold text-xs flex items-center justify-center text-neutral-700">SA</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white font-bold text-xs flex items-center justify-center">99+</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-800 text-white font-bold text-xs flex items-center justify-center">✨</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-neutral-700 mt-0.5">
                Loved by <span className="font-extrabold text-neutral-900">25K+ Customers</span>
              </p>
            </div>
          </div>

        </div>

        {/* Right Column Model Image & Badge Collage */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            
            {/* Background Pastel Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-pink-200/30 to-purple-200/30 rounded-3xl blur-2xl -z-10" />

            {/* Model Card Wrapper */}
            <div className="relative aspect-[4/5] w-full rounded-3xl bg-neutral-100 border border-neutral-200/80 overflow-hidden shadow-2xl flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-b from-neutral-200 to-neutral-300 flex flex-col items-center justify-center text-neutral-400 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center text-primary mb-3 shadow-inner">
                  <Sparkles className="w-10 h-10" />
                </div>
                <span className="font-extrabold text-neutral-700 text-lg">StyleAura Model Look 2025</span>
                <span className="text-xs text-neutral-500 mt-1">High-Fashion Aesthetic Lookbook</span>
              </div>

              {/* Floating Star Badge */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-neutral-100 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-md shadow-primary/30">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest block">Season Release</span>
                  <span className="text-sm font-extrabold text-neutral-900">NEW Collection 2025</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. BRAND TRUST BAR */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/70">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <span className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest whitespace-nowrap">
            Trusted By Top Brands
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 sm:gap-12 opacity-85">
            <span className="text-lg sm:text-xl font-black tracking-widest text-neutral-800">ZARA</span>
            <span className="text-lg sm:text-xl font-black tracking-widest text-neutral-800">MANGO</span>
            <span className="text-xl sm:text-2xl font-black tracking-widest text-primary">H&M</span>
            <span className="text-lg sm:text-xl font-black tracking-wider text-neutral-800">BERSHKA</span>
            <span className="text-base sm:text-lg italic font-bold tracking-wider text-neutral-800">stradivarius</span>
            <span className="text-lg sm:text-xl font-black tracking-tighter text-neutral-800">asos</span>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY GRID (4 COLUMNS) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge variant="soft" className="mb-2">Shop by Category</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Curated <span className="text-primary">Collections</span>
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="outline" size="sm">
              Explore All Categories <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} {...cat} />
          ))}
        </div>
      </section>

      {/* 4. PROMOTIONAL SALE BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-100/70 border border-pink-200/70 p-8 sm:p-14 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Banner Left Content */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Summer Sale is Live!
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-neutral-900 tracking-tight leading-none">
              Up to <span className="text-primary">50% Off</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-md">
              Upgrade your wardrobe with exclusive seasonal discounts on top designer dresses, accessories, and luxury streetwear.
            </p>
            <div className="pt-2">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="shadow-lg shadow-primary/30">
                  Shop Sale Now <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Banner Right Image Placeholders with Circular Discount Badges */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3 relative">
            
            {/* Image Placeholder 1 - Model */}
            <div className="relative aspect-[3/4] bg-white/80 rounded-2xl shadow-md border border-white flex flex-col items-center justify-center p-2 text-center">
              <div className="w-8 h-8 rounded-full bg-pink-100 text-primary flex items-center justify-center mb-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-neutral-700">Model Apparel</span>
              <div className="absolute -top-2 -right-2 z-10">
                <Badge variant="primary" size="sm" className="rounded-full shadow-md">
                  -30%
                </Badge>
              </div>
            </div>

            {/* Image Placeholder 2 - Footwear */}
            <div className="relative aspect-[3/4] bg-white/80 rounded-2xl shadow-md border border-white flex flex-col items-center justify-center p-2 text-center mt-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
                <Footprints className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-neutral-700">Luxury Shoes</span>
              <div className="absolute -top-2 -right-2 z-10">
                <Badge variant="primary" size="sm" className="rounded-full shadow-md">
                  -40%
                </Badge>
              </div>
            </div>

            {/* Image Placeholder 3 - Handbag */}
            <div className="relative aspect-[3/4] bg-white/80 rounded-2xl shadow-md border border-white flex flex-col items-center justify-center p-2 text-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-1">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-neutral-700">Handbags</span>
              <div className="absolute -top-2 -right-2 z-10">
                <Badge variant="primary" size="sm" className="rounded-full shadow-md">
                  -25%
                </Badge>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FEATURED DROPS */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge variant="primary" className="mb-2">Trending Now</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Featured <span className="text-primary">Arrivals</span>
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="outline" size="sm">
              View Catalog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
