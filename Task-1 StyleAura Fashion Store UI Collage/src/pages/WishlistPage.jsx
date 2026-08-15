import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { products } from '../data/productsData';

export const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  return (
    <div className="w-full max-w-[1520px] mx-auto py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
            Saved Styles
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            My Wishlist ({wishlist.length})
          </h1>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
        >
          Explore All Styles <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Wishlist Grid or Empty State */}
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
          {wishlist.map((item) => {
            // Match with complete product details from catalog data if needed
            const fullProduct = products.find((p) => p.id === item.id) || item;
            return (
              <ProductCard
                key={item.id}
                {...fullProduct}
                isWishlisted={true}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center space-y-5 bg-white rounded-3xl border border-neutral-100 shadow-xl max-w-lg mx-auto p-8">
          <div className="w-16 h-16 rounded-full bg-red-100 text-primary flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-neutral-900">Your Wishlist is Empty</h3>
            <p className="text-sm text-neutral-500 font-medium">Save items you love by clicking the heart icon on any product.</p>
          </div>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/30 cursor-pointer"
            >
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
