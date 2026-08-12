import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
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
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setWishlisted(isWishlisted);
  }, [isWishlisted]);

  const handleCardClick = () => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !wishlisted;
    setWishlisted(nextState);
    if (onToggleWishlist) {
      onToggleWishlist({ id, title, price, image });
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    if (onAddToCart) {
      onAddToCart({ id, title, price, image });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-white rounded-3xl p-3 sm:p-4 border border-neutral-200/80 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between cursor-pointer ${className}`}
    >
      
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
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            wishlisted
              ? 'bg-red-50 border border-red-200 text-primary scale-105'
              : 'bg-white/80 backdrop-blur-md text-neutral-600 hover:text-primary hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 transition-all duration-300 ${wishlisted ? 'fill-primary text-primary scale-110' : ''}`} />
        </button>

        {/* Quick Add Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant={added ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleAddToCartClick}
            className={`w-full shadow-lg py-2 text-xs transition-all ${added ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600' : 'shadow-primary/30'}`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1" /> Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Add to Bag
              </>
            )}
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
