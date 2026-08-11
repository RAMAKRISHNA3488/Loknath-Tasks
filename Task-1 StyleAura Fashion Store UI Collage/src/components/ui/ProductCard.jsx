import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

export const ProductCard = ({
  id,
  image,
  title,
  price,
  originalPrice,
  discount,
  category = 'Fashion',
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  className = '',
}) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setWishlisted(!wishlisted);
    if (onToggleWishlist) {
      onToggleWishlist({ id, title, price, image });
    }
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ id, title, price, image });
    }
  };

  return (
    <div className={`group bg-white rounded-3xl p-3 sm:p-4 border border-neutral-200/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between ${className}`}>
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full bg-neutral-100 rounded-2xl overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-400 font-medium text-sm">
            StyleAura Apparel
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {discount && (
            <Badge variant="primary" size="sm">
              {discount}
            </Badge>
          )}
        </div>

        {/* Floating Heart Icon Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Add to Wishlist"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-primary hover:bg-white shadow-sm transition-all"
        >
          <Heart className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-primary text-primary' : ''}`} />
        </button>

        {/* Quick Add Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCartClick}
            className="w-full shadow-lg shadow-primary/30 py-2 text-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Add to Bag
          </Button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="pt-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            {category}
          </span>
          <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        {/* Price Layout */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-black text-neutral-900">
            ${typeof price === 'number' ? price.toFixed(2) : price}
          </span>
          {originalPrice && (
            <span className="text-xs font-semibold text-neutral-400 line-through">
              ${typeof originalPrice === 'number' ? originalPrice.toFixed(2) : originalPrice}
            </span>
          )}
          {discount && !originalPrice && (
            <Badge variant="soft" size="sm">
              {discount}
            </Badge>
          )}
        </div>
      </div>

    </div>
  );
};
