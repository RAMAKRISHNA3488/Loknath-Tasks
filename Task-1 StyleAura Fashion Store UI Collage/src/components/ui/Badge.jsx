import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-bold tracking-wide rounded-full uppercase';

  const variants = {
    primary: 'bg-primary text-white shadow-sm shadow-primary/20',
    secondary: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
    soft: 'bg-primary/10 text-primary border border-primary/20',
    dark: 'bg-neutral-900 text-white',
    outline: 'border border-primary text-primary bg-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-xs',
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.md;

  return (
    <span className={`${baseStyles} ${selectedVariant} ${selectedSize} ${className}`} {...props}>
      {children}
    </span>
  );
};
