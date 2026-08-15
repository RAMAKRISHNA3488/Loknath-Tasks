import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, CheckCircle2, ShieldAlert, ArrowRight, DollarSign } from 'lucide-react';

export const ReturnsPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Returns & Exchange</span>
      </div>

      {/* Page Header */}
      <div className="space-y-3 border-b border-neutral-200 pb-8">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Hassle-Free Policy
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Returns & Exchange
        </h1>
        <p className="text-neutral-600 text-base max-w-3xl leading-relaxed">
          We want you to love your StyleAura purchase. If you're not completely satisfied, we offer 30-day returns and seamless size exchanges.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-md space-y-2">
          <span className="text-primary font-black text-2xl">30 Days</span>
          <h3 className="font-extrabold text-neutral-900 text-base">Return Window</h3>
          <p className="text-xs text-neutral-500 font-medium">Request a return or size exchange within 30 days of package delivery.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-md space-y-2">
          <span className="text-primary font-black text-2xl">100% Free</span>
          <h3 className="font-extrabold text-neutral-900 text-base">Size Exchanges</h3>
          <p className="text-xs text-neutral-500 font-medium">Free return shipping on your first size exchange per order.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-md space-y-2">
          <span className="text-primary font-black text-2xl">Fast Refund</span>
          <h3 className="font-extrabold text-neutral-900 text-base">Original Method</h3>
          <p className="text-xs text-neutral-500 font-medium">Refunds are issued directly back to your original payment method.</p>
        </div>
      </div>

      {/* 5 Step Return Process */}
      <div className="bg-white p-8 rounded-3xl border border-neutral-200/80 shadow-xl space-y-6">
        <h2 className="text-2xl font-black text-neutral-900">5-Step Easy Return Process</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Contact Support', desc: 'Submit a return request online or email support@styleaura.com.' },
            { step: '02', title: 'Provide Details', desc: 'Share your Order ID and reason for return or size exchange.' },
            { step: '03', title: 'Get Instructions', desc: 'Receive your prepaid return shipping label via email.' },
            { step: '04', title: 'Ship Item Back', desc: 'Drop off the securely packaged item at your nearest carrier.' },
            { step: '05', title: 'Receive Refund', desc: 'Refund processed within 3-5 days after inspection.' },
          ].map((s) => (
            <div key={s.step} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
              <span className="text-primary font-black text-sm">{s.step}</span>
              <h4 className="text-sm font-extrabold text-neutral-900">{s.title}</h4>
              <p className="text-xs text-neutral-500 font-medium leading-normal">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility & Non-returnable */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-md space-y-4">
          <h3 className="text-lg font-extrabold text-neutral-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Return Eligibility
          </h3>
          <ul className="space-y-2 text-sm text-neutral-600 font-medium list-disc list-inside">
            <li>Unused, unworn, and unwashed products</li>
            <li>Original condition with all tags attached</li>
            <li>Original footwear box undamaged</li>
            <li>Returned within the 30-day window</li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-md space-y-4">
          <h3 className="text-lg font-extrabold text-neutral-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" /> Non-Returnable Items
          </h3>
          <ul className="space-y-2 text-sm text-neutral-600 font-medium list-disc list-inside">
            <li>Items marked as Final Sale</li>
            <li>Products worn, washed, or altered</li>
            <li>Personalized or custom items</li>
            <li>Items missing original tags or packaging</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/30"
        >
          Start a Return Request <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
