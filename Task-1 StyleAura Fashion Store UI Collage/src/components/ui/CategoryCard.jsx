import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryCard = ({
  title,
  subtitle,
  icon: Icon = Sparkles,
  image,
  bgColor = 'bg-[#FFF0F5]',
  iconBg = 'bg-primary',
  textColor = 'text-primary',
  linkText = 'Explore More',
  itemCount,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[28px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between border border-neutral-100/80 shadow-sm ${className}`}
    >
      {image ? (
        <div className="w-full aspect-[4/5] overflow-hidden rounded-[28px] bg-neutral-50 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center rounded-[28px] group-hover:scale-[1.03] transition-transform duration-300"
          />
        </div>
      ) : (
        <div className={`p-6 sm:p-7 flex flex-col justify-between aspect-[4/5] ${bgColor}`}>
          {/* Top Header Icon */}
          <div className="relative z-10 mb-4 flex items-center justify-between">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm ${iconBg}`}>
              {typeof Icon === 'string' ? (
                <img src={Icon} alt={title} className="w-6 h-6 object-contain" />
              ) : (
                <Icon className="w-6 h-6 text-white" />
              )}
            </div>
            {itemCount !== undefined && (
              <span className="text-xs font-bold text-neutral-500 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200/60">
                {itemCount} Items
              </span>
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-1.5 pb-1">
            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-neutral-500 line-clamp-1 leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className={`pt-2 flex items-center gap-1.5 text-xs sm:text-sm font-extrabold ${textColor} group-hover:translate-x-1 transition-transform`}>
              <span>{linkText}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
