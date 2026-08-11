import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Minus, Plus, ChevronDown, Sparkles } from 'lucide-react';
import { Button, Badge } from '../components/ui';
import { useCart } from '../context/CartContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist } = useCart();

  const [selectedColor, setSelectedColor] = useState('Pink');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('details');

  const product = {
    id: id || 1,
    title: 'Pink Oversized Cotton Casual Shirt',
    price: 49.99,
    originalPrice: 69.99,
    discount: '-29%',
    rating: 5,
    reviewsCount: 128,
    category: "Women's Wear",
    sku: 'SA-2025-W01',
    description: 'Designed for effortless elegance and modern aesthetic comfort. Made from 100% breathable organic cotton with loose relaxed tailoring, dropped shoulders, and buttoned cuffs.',
    colors: [
      { name: 'Pink', hex: '#FF2B70' },
      { name: 'Black', hex: '#121214' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Beige', hex: '#E5D3B3' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    thumbnails: ['Look 1', 'Look 2', 'Look 3', 'Look 4'],
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (addToCart) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          color: selectedColor,
          size: selectedSize,
        });
      }
    }
  };

  return (
    <div className="space-y-10 py-4 max-w-7xl mx-auto">
      
      {/* 1. Breadcrumb Navigation */}
      <nav className="text-xs sm:text-sm text-neutral-500 flex items-center gap-2 font-medium">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold truncate">{product.title}</span>
      </nav>

      {/* 2. Main Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* LEFT COLUMN: Image Gallery Stack & Main Preview */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Vertical 4 Thumbnail Stack */}
          <div className="flex sm:flex-col gap-3 justify-center sm:justify-start">
            {product.thumbnails.map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setActiveThumb(idx)}
                className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-neutral-100 border-2 overflow-hidden flex items-center justify-center text-xs font-bold transition-all ${
                  activeThumb === idx
                    ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-md'
                    : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="text-neutral-500 text-center">
                  <Sparkles className="w-4 h-4 mx-auto mb-1 text-primary" />
                  {thumb}
                </div>
              </button>
            ))}
          </div>

          {/* Main Product Image Container */}
          <div className="flex-1 aspect-[4/5] bg-neutral-100 rounded-3xl border border-neutral-200/80 relative overflow-hidden flex items-center justify-center shadow-lg group">
            <div className="w-full h-full bg-gradient-to-br from-neutral-100 via-pink-50/30 to-neutral-200 flex flex-col items-center justify-center p-8 text-center text-neutral-400 font-extrabold text-lg">
              <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center text-primary mb-3 shadow-md">
                <Sparkles className="w-10 h-10" />
              </div>
              <span className="text-neutral-700 font-black">{product.title}</span>
              <span className="text-xs text-neutral-500 font-normal mt-1">Image Preview View #{activeThumb + 1}</span>
            </div>

            {/* Top Floating Discount Badge & Wishlist Button */}
            <div className="absolute top-4 left-4">
              <Badge variant="primary" size="md" className="shadow-md">
                {product.discount} OFF
              </Badge>
            </div>

            <button
              onClick={() => {
                setWishlisted(!wishlisted);
                if (toggleWishlist) toggleWishlist(product);
              }}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-primary shadow-md transition-all"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-primary text-primary' : ''}`} />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Product Info & Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & Rating */}
          <div className="space-y-2 border-b border-neutral-200/80 pb-5">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
            <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-snug">
              {product.title}
            </h1>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center text-amber-400">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-700">5.0</span>
              <span className="text-xs text-neutral-400 font-medium">({product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-neutral-900">${product.price.toFixed(2)}</span>
            <span className="text-lg font-bold text-neutral-400 line-through">${product.originalPrice.toFixed(2)}</span>
            <Badge variant="soft" size="md">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </Badge>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Color Selector Swatches */}
          <div className="space-y-2.5 pt-2">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              Color: <span className="text-primary font-black">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
                    selectedColor === c.name ? 'ring-2 ring-primary ring-offset-2 scale-110' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size Selector Square Buttons */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Select Size: <span className="text-primary font-black">{selectedSize}</span>
              </label>
              <button className="text-xs font-semibold text-primary underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-xl font-bold text-sm border transition-all ${
                    selectedSize === s
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/25 scale-105'
                      : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Counter */}
          <div className="space-y-2.5 pt-2">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">Quantity</label>
            <div className="inline-flex items-center bg-neutral-100 rounded-full border border-neutral-200 p-1">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-primary shadow-sm"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-12 text-center font-extrabold text-neutral-900 text-sm">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:text-primary shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleAddToCart}
              className="w-full text-primary border-primary hover:bg-primary hover:text-white"
            >
              <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
            </Button>

            <Button variant="primary" size="lg" className="w-full shadow-xl shadow-primary/30">
              Buy Now
            </Button>
          </div>

          {/* Features Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 text-center text-xs font-semibold text-neutral-700">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-5 h-5 text-primary" />
              <span>Easy 30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Secure Checkout</span>
            </div>
          </div>

          {/* Collapsible Accordion Section */}
          <div className="border-t border-neutral-200/80 pt-4 space-y-3">
            {[
              {
                id: 'details',
                title: 'Product Details & Fabric',
                content: 'Made with 100% premium combed cotton. Features dropped shoulder seam, regular shirt collar, chest pocket, and curved hemline. Machine wash cold with like colors.'
              },
              {
                id: 'size-guide',
                title: 'Size Guide & Fit',
                content: 'Model is 5\'9" (175 cm) wearing Size M. Fits true to size with an oversized silhouette. If you prefer a regular fit, consider sizing down.'
              },
              {
                id: 'shipping',
                title: 'Shipping & Returns Policy',
                content: 'Standard delivery in 3-5 business days. Express shipping available. Enjoy hassle-free returns within 30 days of receipt.'
              },
            ].map((acc) => (
              <div key={acc.id} className="border border-neutral-200/80 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? '' : acc.id)}
                  className="w-full px-5 py-3.5 flex items-center justify-between font-bold text-sm text-neutral-900 bg-white hover:bg-neutral-50"
                >
                  <span>{acc.title}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openAccordion === acc.id ? 'rotate-180 text-primary' : ''}`} />
                </button>
                {openAccordion === acc.id && (
                  <div className="px-5 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed bg-white border-t border-neutral-100">
                    {acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
