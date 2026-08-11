import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  // Base classes for pill shape, transition, and focus state
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styling
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 active:scale-[0.98]',
    secondary: 'bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 shadow-sm hover:shadow-md active:scale-[0.98]',
    outline: 'bg-transparent text-neutral-800 border-2 border-neutral-300 hover:border-primary hover:text-primary active:scale-[0.98]',
  };

  // Size styling
  const sizes = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5',
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedVariant} ${selectedSize} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
