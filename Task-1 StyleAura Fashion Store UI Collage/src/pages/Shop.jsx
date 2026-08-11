import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, Filter, X, Check } from 'lucide-react';
import { ProductCard, Button, Badge } from '../components/ui';
import { useCart } from '../context/CartContext';

export const Shop = () => {
  const { addToCart, toggleWishlist } = useCart();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceSlider, setPriceSlider] = useState(200);
  const [sortBy, setSortBy] = useState('newest');

  const categories = ["All", "Women's Wear", "Footwear", "Accessories", "Bags", "Jackets"];
  
  const colors = [
    { name: 'Pink', hex: '#FF2B70' },
    { name: 'Black', hex: '#121214' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Beige', hex: '#E5D3B3' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Green', hex: '#10B981' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const productsData = [
    {
      id: 1,
      title: 'Pink Oversized Cotton Casual Shirt',
      price: 49.99,
      originalPrice: 69.99,
      discount: '-29%',
      category: "Women's Wear",
    },
    {
      id: 2,
      title: 'StyleAura Signature Denim Jacket',
      price: 110.00,
      originalPrice: 135.00,
      discount: '-18%',
      category: 'Jackets',
    },
    {
      id: 3,
      title: 'Chic Chunky Leather Platform Sneakers',
      price: 145.00,
      category: 'Footwear',
    },
    {
      id: 4,
      title: 'Handcrafted Quilted Chain Shoulder Bag',
      price: 95.00,
      originalPrice: 125.00,
      discount: '-24%',
      category: 'Bags',
    },
    {
      id: 5,
      title: 'Aesthetic Linen Button-Down Shirt',
      price: 64.99,
      category: "Women's Wear",
    },
    {
      id: 6,
      title: 'Urban Streetwear Hooded Sweatshirt',
      price: 79.99,
      originalPrice: 99.99,
      discount: '-20%',
      category: 'Jackets',
    },
    {
      id: 7,
      title: 'Statement Gold Hoop Earrings Set',
      price: 35.00,
      category: 'Accessories',
    },
    {
      id: 8,
      title: 'Vintage High-Waisted Wide Leg Jeans',
      price: 88.00,
      originalPrice: 105.00,
      discount: '-16%',
      category: "Women's Wear",
    },
    {
      id: 9,
      title: 'Minimalist Leather Ankle Boots',
      price: 159.00,
      category: 'Footwear',
    },
  ];

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPrice('all');
    setSelectedColor('');
    setSelectedSize('');
    setPriceSlider(200);
  };

  return (
    <div className="space-y-8 py-2">
      
      {/* Shop Header Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-brand-gray text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="text-primary text-xs font-extrabold uppercase tracking-wider bg-primary/20 px-3.5 py-1.5 rounded-full border border-primary/30 inline-block">
            Curated Fashion Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            StyleAura <span className="text-primary">Shop</span>
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Discover tailored looks, trending streetwear, and timeless luxury wardrobe essentials.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT SIDEBAR FILTERS (approx 25% width) */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm space-y-8 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h2 className="font-extrabold text-neutral-900 text-base flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" /> Filters
            </h2>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-neutral-400 hover:text-primary transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* 1. Categories List with Radio Buttons */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 text-sm text-neutral-700 hover:text-primary cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className={selectedCategory === cat ? 'font-bold text-neutral-900' : 'font-medium'}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Price Range Slider & Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Price Range</h3>
              <span className="text-xs font-bold text-primary">${priceSlider}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={priceSlider}
              onChange={(e) => setPriceSlider(Number(e.target.value))}
              className="w-full accent-primary bg-neutral-200 rounded-lg h-1.5 cursor-pointer"
            />
            <div className="space-y-2 pt-1 text-sm text-neutral-700">
              {[
                { label: 'All Prices', val: 'all' },
                { label: '$0 - $50', val: '0-50' },
                { label: '$50 - $100', val: '50-100' },
                { label: '$100 - $200', val: '100-200' },
              ].map((opt) => (
                <label key={opt.val} className="flex items-center gap-3 cursor-pointer hover:text-primary">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPrice === opt.val}
                    onChange={() => setSelectedPrice(opt.val)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Color Swatches */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Color</h3>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(selectedColor === c.name ? '' : c.name)}
                  aria-label={c.name}
                  style={{ backgroundColor: c.hex }}
                  className={`w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
                    selectedColor === c.name ? 'ring-2 ring-primary ring-offset-2 scale-110' : ''
                  }`}
                >
                  {selectedColor === c.name && (
                    <Check className={`w-3.5 h-3.5 ${c.name === 'White' ? 'text-neutral-900' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Size Square Buttons */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(selectedSize === s ? '' : s)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs border transition-all ${
                    selectedSize === s
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN PRODUCT AREA (75% width) */}
        <main className="flex-1 w-full space-y-6">
          
          {/* Top Bar Controls */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-xl"
              >
                <Filter className="w-4 h-4 text-primary" /> Filters
              </button>
              <span className="text-xs sm:text-sm font-semibold text-neutral-500">
                Showing <strong className="text-neutral-900">1-9</strong> of <strong className="text-neutral-900">90</strong> results
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-700 w-full sm:w-auto justify-end">
              <ArrowUpDown className="w-4 h-4 text-primary" />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

          </div>

          {/* 3-Column Responsive Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((prod) => (
              <Link key={prod.id} to={`/product/${prod.id}`} className="block group">
                <ProductCard
                  {...prod}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                />
              </Link>
            ))}
          </div>

        </main>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h2 className="font-extrabold text-neutral-900 text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" /> Filter Products
              </h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-neutral-400 uppercase">Categories</h3>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 text-sm text-neutral-700 cursor-pointer">
                  <input
                    type="radio"
                    name="mobile-category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-primary"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <Button variant="primary" size="md" className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
