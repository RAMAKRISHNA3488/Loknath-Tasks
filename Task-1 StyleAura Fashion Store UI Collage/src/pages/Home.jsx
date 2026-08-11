import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Truck, Shirt, ShoppingBag, Layers } from 'lucide-react';
import { Button, ProductCard, CategoryCard, Badge } from '../components/ui';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const { addToCart, toggleWishlist } = useCart();

  const featuredProducts = [
    {
      id: 1,
      title: 'StyleAura Signature Oversized Hoodie',
      price: 89.00,
      originalPrice: 120.00,
      discount: '-25%',
      category: 'Streetwear',
    },
    {
      id: 2,
      title: 'Minimalist Aesthetic Linen Blazer',
      price: 149.00,
      category: 'Tailored',
    },
    {
      id: 3,
      title: 'Urban Chic Crop Denim Jacket',
      price: 110.00,
      originalPrice: 135.00,
      discount: '-18%',
      category: 'Outerwear',
    },
  ];

  const categories = [
    {
      title: 'Women\'s Apparel',
      subtitle: 'Elegance redefined with modern cuts and vibrant colors.',
      icon: Sparkles,
      bgColor: 'bg-pink-50/80 hover:bg-pink-100/80',
      itemCount: 142,
    },
    {
      title: 'Men\'s Streetwear',
      subtitle: 'Bold silhouettes, luxury loungewear, and urban fits.',
      icon: Shirt,
      bgColor: 'bg-blue-50/80 hover:bg-blue-100/80',
      itemCount: 98,
    },
    {
      title: 'Capsule Accessories',
      subtitle: 'Handcrafted bags, minimalist jewelry, and statement pieces.',
      icon: Layers,
      bgColor: 'bg-purple-50/80 hover:bg-purple-100/80',
      itemCount: 64,
    },
  ];

  return (
    <div className="space-y-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-brand-gray text-white px-6 sm:px-14 py-20 shadow-2xl">
        <div className="max-w-2xl space-y-6 relative z-10">
          <Badge variant="soft" className="px-4 py-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> Summer Collection 2026
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Redefine Your <span className="text-primary">Style Aura</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-xl font-normal leading-relaxed">
            Discover modern apparel, premium fashion aesthetics, and tailored looks designed to express your aura.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="primary" size="lg">
              Explore Collection <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="secondary" size="lg">
              Watch Lookbook
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900">Express Delivery</h3>
            <p className="text-xs text-neutral-500 mt-1">Fast & reliable shipping on all nationwide orders.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900">Premium Quality</h3>
            <p className="text-xs text-neutral-500 mt-1">Ethically crafted using eco-friendly luxury materials.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900">Trending Weekly</h3>
            <p className="text-xs text-neutral-500 mt-1">Fresh drops curated by top fashion designers.</p>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <Badge variant="soft" className="mb-2">Curated Categories</Badge>
            <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              Shop by <span className="text-primary">Aura</span>
            </h2>
          </div>
          <Button variant="outline" size="sm">
            View All Categories
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <Badge variant="primary" className="mb-2">New Arrivals</Badge>
            <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              Featured <span className="text-primary">Drops</span>
            </h2>
          </div>
          <Button variant="outline" size="sm">
            Shop Catalog
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              {...prod}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
