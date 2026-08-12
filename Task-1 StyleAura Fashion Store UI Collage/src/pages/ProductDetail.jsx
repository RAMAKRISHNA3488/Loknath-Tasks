import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, Minus, Plus, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/productsData';

import pinkShirtImg from '../assets/product-pink-shirt.png';
import modelDetailImg from '../assets/model-detail.png';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useApp();

  const product = products.find((p) => p.id === Number(id)) || products[0];

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Pink');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState('');

  const galleryImages = [
    product.image || pinkShirtImg,
    modelDetailImg,
    product.image || pinkShirtImg,
    modelDetailImg,
    product.image || pinkShirtImg,
  ];

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="w-full max-w-[1520px] mx-auto py-2 space-y-8">
      
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-neutral-500 flex items-center gap-2 font-medium">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold truncate">{product.title}</span>
      </nav>

      {/* 2. Main Widescreen Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
        
        {/* LEFT COLUMN: Gallery & Main Product Image (Expanded ~580-640px) */}
        <div className="lg:col-span-7 flex flex-row gap-4 w-full items-start justify-center lg:justify-start">
          
          {/* Vertical 5 Thumbnail Stack */}
          <div className="flex flex-col gap-3 shrink-0">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-neutral-50 border-2 overflow-hidden flex items-center justify-center transition-all ${
                  activeImageIndex === idx
                    ? 'border-primary ring-2 ring-primary/20 scale-105 shadow-sm'
                    : 'border-neutral-200/80 hover:border-neutral-400 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Product Image Container (Expanded Widescreen Image max-w-[620px]) */}
          <div className="flex-1 aspect-[4/5] max-w-[620px] min-w-0 bg-red-50/40 rounded-3xl border border-neutral-200/80 relative overflow-hidden flex items-center justify-center shadow-sm">
            <img
              src={galleryImages[activeImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />

            {/* Wishlist Heart Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-primary shadow-md transition-all hover:scale-105"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Product Specifications & Control Handlers */}
        <div className="lg:col-span-5 w-full space-y-6">
          
          {/* Title & Ratings */}
          <div className="space-y-2 border-b border-neutral-100 pb-5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
              {product.title}
            </h1>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-2 pt-0.5">
              <div className="flex items-center text-amber-400">
                {[...Array(product.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-800">5.0</span>
              <span className="text-xs text-neutral-400 font-medium">({product.reviewsCount || 290} reviews)</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-neutral-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg font-bold text-neutral-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="bg-primary text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-sm">
                {product.discount}
              </span>
            )}
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed font-medium max-w-xl">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              COLOR: <span className="text-primary font-black">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => {
                const isSelected = selectedColor === c;
                const bgHex = (c.toLowerCase() === 'pink' || c.toLowerCase() === 'red') ? '#E5094C' : c.toLowerCase() === 'white' ? '#FFFFFF' : '#121214';
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    aria-label={c}
                    style={{ backgroundColor: bgHex }}
                    className={`w-8 h-8 rounded-full border border-neutral-300 transition-all ${
                      isSelected ? 'ring-2 ring-primary ring-offset-2 scale-110 shadow-sm' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
              SIZE: <span className="text-primary font-black">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-11 h-11 rounded-xl font-bold text-xs border transition-all ${
                    selectedSize === s
                      ? 'border-2 border-primary text-primary font-black bg-white shadow-sm'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">QUANTITY</label>
            <div className="inline-flex items-center bg-neutral-50 rounded-2xl border border-neutral-200 p-1 w-36 justify-between">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-neutral-700 hover:text-primary shadow-sm font-bold"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-black text-neutral-900 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-neutral-700 hover:text-primary shadow-sm font-bold"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
            <button
              onClick={handleAddToCart}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full font-extrabold text-xs uppercase border-2 border-primary text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-primary" /> Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-full font-extrabold text-xs uppercase bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >
              Buy Now
            </button>
          </div>

          {/* Shipping & Returns Compact Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-3 text-xs text-neutral-700 font-medium">
              <Truck className="w-5 h-5 text-neutral-800 shrink-0" />
              <div>
                <p className="font-extrabold text-neutral-900">Free Shipping</p>
                <p className="text-[11px] text-neutral-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-700 font-medium">
              <RotateCcw className="w-5 h-5 text-neutral-800 shrink-0" />
              <div>
                <p className="font-extrabold text-neutral-900">Easy Returns</p>
                <p className="text-[11px] text-neutral-500">30 days return policy</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Collapsible Accordions Section Below Main Product Area */}
      <div className="space-y-3 pt-8 border-t border-neutral-100 w-full">
        {[
          {
            id: 'details',
            title: 'Product Details',
            content: product.description || 'Trendy oversized shirt perfect for casual outings. Comfortable breathable cotton fabric with a stylish relaxed look.',
          },
          {
            id: 'size-guide',
            title: 'Size Guide',
            content: 'Fits true to size. Designed with a relaxed tailored silhouette. See full size guide table for bust, waist, and hip measurements.',
          },
          {
            id: 'shipping',
            title: 'Shipping & Returns',
            content: 'Free standard delivery on orders over $50. Hassle-free 30-day returns and free size exchanges.',
          },
        ].map((acc) => (
          <div key={acc.id} className="border border-neutral-200/90 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setOpenAccordion(openAccordion === acc.id ? '' : acc.id)}
              className="w-full px-6 py-4 flex items-center justify-between font-extrabold text-sm text-neutral-900 hover:text-primary transition-colors"
            >
              <span>{acc.title}</span>
              <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${openAccordion === acc.id ? 'rotate-180 text-primary' : ''}`} />
            </button>
            {openAccordion === acc.id && (
              <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                {acc.content}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
