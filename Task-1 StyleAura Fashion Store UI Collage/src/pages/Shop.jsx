import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Filter, X, Check, Search } from 'lucide-react';
import { ProductCard, Button } from '../components/ui';
import { useApp } from '../context/AppContext';
import { products } from '../data/productsData';

export const Shop = () => {
  const { addToCart, toggleWishlist, wishlist, searchQuery, setSearchQuery } = useApp();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceSlider, setPriceSlider] = useState(1000);
  const [sortBy, setSortBy] = useState('newest');

  const categories = ["All", "Women's Wear", "Footwear", "Accessories", "Bags", "Jackets"];

  const colors = [
    { name: 'Red', hex: '#E5094C' },
    { name: 'Black', hex: '#121214' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Beige', hex: '#E5D3B3' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Green', hex: '#10B981' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Dynamic Filtering Logic with Search Query matching
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search Query Filter
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesCategory = prod.category.toLowerCase().includes(q);
        const matchesSub = prod.subcategory && prod.subcategory.toLowerCase().includes(q);
        const matchesDesc = prod.description && prod.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesSub && !matchesDesc) {
          return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'All' && prod.category !== selectedCategory && prod.subcategory !== selectedCategory) {
        return false;
      }
      // Price Slider
      if (prod.price > priceSlider) return false;
      // Price Radio Filter
      if (selectedPrice === '0-50' && (prod.price < 0 || prod.price > 50)) return false;
      if (selectedPrice === '50-100' && (prod.price < 50 || prod.price > 100)) return false;
      if (selectedPrice === '100-200' && (prod.price < 100 || prod.price > 200)) return false;
      if (selectedPrice === '200+' && prod.price < 200) return false;
      // Color Filter
      if (selectedColor && !prod.colors.includes(selectedColor)) return false;
      // Size Filter
      if (selectedSize && !prod.sizes.includes(selectedSize)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.id - b.id;
    });
  }, [searchQuery, selectedCategory, priceSlider, selectedPrice, selectedColor, selectedSize, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedPrice('all');
    setSelectedColor('');
    setSelectedSize('');
    setPriceSlider(1000);
    setSearchQuery('');
  };

  return (
    <div className="w-full py-2 space-y-6">
      
      {/* Active Search Query Banner */}
      {searchQuery && searchQuery.trim() && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800">
            <Search className="w-4 h-4 text-primary" />
            <span>Search results for: <strong className="text-primary font-black">"{searchQuery}"</strong></span>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-neutral-500 hover:text-primary flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-sm"
          >
            Clear Search <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Two-Column Layout: Fixed 270px Sidebar + All Remaining Width for Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)] gap-8 items-start w-full">
        
        {/* LEFT SIDEBAR FILTERS (Fixed 270px width) */}
        <aside className="hidden lg:block w-[270px] shrink-0 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-sm space-y-8 sticky top-24">
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

          {/* Categories Radio List */}
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

          {/* Price Range Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Price Range</h3>
              <span className="text-xs font-bold text-primary">${priceSlider}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceSlider}
              onChange={(e) => setPriceSlider(Number(e.target.value))}
              className="w-full accent-primary bg-neutral-200 rounded-lg h-1.5 cursor-pointer"
            />
            <div className="space-y-2 pt-1 text-sm text-neutral-700">
              {[
                { label: '$0 - $50', val: '0-50' },
                { label: '$50 - $100', val: '50-100' },
                { label: '$100 - $200', val: '100-200' },
                { label: '$200+', val: '200+' },
              ].map((opt) => (
                <label key={opt.val} className="flex items-center gap-3 cursor-pointer hover:text-primary">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPrice === opt.val}
                    onChange={() => setSelectedPrice(selectedPrice === opt.val ? 'all' : opt.val)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color Swatches */}
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

          {/* Size Buttons */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(selectedSize === s ? '' : s)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs border transition-all ${
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

        {/* MAIN PRODUCT AREA (Consumes ALL remaining width) */}
        <main className="w-full min-w-0 space-y-6">
          
          {/* Top Bar Controls (100% width of product area) */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center justify-between gap-4 w-full">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-4 py-2 rounded-xl"
            >
              <Filter className="w-4 h-4 text-primary" /> Filters
            </button>

            <span className="hidden sm:inline text-xs text-neutral-500 font-semibold">
              Showing {filteredProducts.length} items
            </span>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-700 ml-auto">
              <ArrowUpDown className="w-4 h-4 text-primary" />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* 3-Column Responsive Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 w-full">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  {...prod}
                  isWishlisted={wishlist.some((item) => item.id === prod.id)}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 space-y-4 w-full">
              <p className="text-neutral-500 font-semibold">No products match your selected search or filters.</p>
              <Button variant="primary" size="sm" onClick={resetFilters}>
                Reset Filters & Search
              </Button>
            </div>
          )}

        </main>

      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h2 className="font-extrabold text-neutral-900 text-base">Filter Products</h2>
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
