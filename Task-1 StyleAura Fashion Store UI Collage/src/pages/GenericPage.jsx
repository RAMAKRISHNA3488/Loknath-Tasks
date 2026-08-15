import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GenericPage = ({ title = 'StyleAura Collection', subtitle = 'Page coming soon' }) => {
  return (
    <div className="py-16 text-center space-y-6 max-w-2xl mx-auto">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary mb-2 shadow-sm">
        <Sparkles className="w-8 h-8" />
      </div>
      <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
        {title}
      </h1>
      <p className="text-neutral-500 text-base sm:text-lg">
        {subtitle}
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-semibold text-sm transition-all shadow-md shadow-primary/30"
        >
          Return to Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
