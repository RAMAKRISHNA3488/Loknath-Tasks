import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryCard = ({
  title,
  subtitle,
  icon: Icon = Sparkles,
  image,
  bgColor = 'bg-primary/5',
  linkText = 'Explore Now',
  itemCount,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between border border-neutral-200/60 ${bgColor} ${className}`}
    >
      {/* Background Graphic Accent if Image is passed */}
      {image && (
        <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity">
          <img src={image} alt={title} className="w-full h-full object-cover object-center" />
        </div>
      )}

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          {typeof Icon === 'string' ? (
            <img src={Icon} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        {itemCount !== undefined && (
          <span className="text-xs font-bold text-neutral-500 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200/60">
            {itemCount} Items
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-2">
        <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="pt-3 flex items-center gap-2 text-xs sm:text-sm font-extrabold text-primary group-hover:translate-x-1 transition-transform">
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
