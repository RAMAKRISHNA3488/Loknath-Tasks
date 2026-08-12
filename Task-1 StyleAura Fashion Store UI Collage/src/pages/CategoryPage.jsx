import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard, Button } from '../components/ui';
import { useApp } from '../context/AppContext';
import { products } from '../data/productsData';

import heroModelImg from '../assets/about-hero-model.png';

export const CategoryPage = () => {
  const { slug } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [activeSubcategory, setActiveSubcategory] = useState('All');

  const formattedCategoryName = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : "Women's Wear";

  const subcategories = ['All', 'Tops', 'Dresses', 'T-Shirts', 'Jeans', 'Jackets', 'Sweaters', 'Skirts'];

  const categoryProducts = useMemo(() => {
    return products.filter((prod) => {
      const slugClean = (slug || '').toLowerCase().trim();
      
      // Category match
      const matchCat =
        slugClean === 'womens-wear' || slugClean === 'all' || slugClean === 'new-in' || slugClean === 'new-arrivals'
          ? true
          : prod.category.toLowerCase().includes(slugClean) ||
            slugClean.includes(prod.category.toLowerCase()) ||
            (prod.subcategory && prod.subcategory.toLowerCase().includes(slugClean));

      if (!matchCat) return false;

      // Subcategory filter match
      if (activeSubcategory !== 'All') {
        const subClean = activeSubcategory.toLowerCase();
        const prodSub = (prod.subcategory || '').toLowerCase();
        const prodTitle = (prod.title || '').toLowerCase();
        
        if (subClean === 't-shirts') {
          return prodSub.includes('t-shirt') || prodSub.includes('tee') || prodTitle.includes('tee') || prodTitle.includes('t-shirt');
        }
        if (subClean === 'jeans') {
          return prodSub.includes('jeans') || prodSub.includes('denim') || prodTitle.includes('jeans') || prodTitle.includes('denim');
        }
        return prodSub === subClean || prodTitle.includes(subClean);
      }

      return true;
    });
  }, [slug, activeSubcategory]);

  return (
    <div className="space-y-8 py-2 w-full">
      
      {/* Category Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-red-100/90 border border-red-200/60 p-8 sm:p-12 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <span className="text-xs font-extrabold text-primary uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-red-200 inline-block">
            Category Collection
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
            {formattedCategoryName}
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base font-medium">
            Discover our latest collection of modern {formattedCategoryName.toLowerCase()} fashion pieces.
          </p>
        </div>
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0">
          <img src={heroModelImg} alt="Category Banner" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Dedicated Subcategory Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-sm w-full">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-neutral-400 uppercase mr-2">CATEGORIES:</span>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubcategory(sub)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeSubcategory === sub
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <span className="text-xs text-neutral-500 font-semibold whitespace-nowrap">
          Showing {categoryProducts.length > 0 ? `1-${categoryProducts.length}` : '0'} of {products.length} results
        </span>
      </div>

      {/* Product Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {categoryProducts.map((prod) => (
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
          <p className="text-neutral-500 font-semibold">No products found for subcategory "{activeSubcategory}".</p>
          <Button variant="primary" size="sm" onClick={() => setActiveSubcategory('All')}>
            Show All Products
          </Button>
        </div>
      )}

    </div>
  );
};
