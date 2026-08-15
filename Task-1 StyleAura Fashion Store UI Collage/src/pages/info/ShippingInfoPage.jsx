import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, ShieldCheck, Globe, PackageCheck, AlertCircle, ArrowRight } from 'lucide-react';

export const ShippingInfoPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Shipping Information</span>
      </div>

      {/* Page Header */}
      <div className="space-y-3 border-b border-neutral-200 pb-8">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Delivery & Logistics
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Shipping Information
        </h1>
        <p className="text-neutral-600 text-base max-w-3xl leading-relaxed">
          Learn about our fast, reliable worldwide delivery options, estimated processing times, and order tracking policies.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Order Processing */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-primary flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900">Order Processing</h2>
          <p className="text-sm text-neutral-600 leading-relaxed font-medium">
            All orders are generally processed and packaged within <strong>1–2 business days</strong> (excluding weekends and major holidays). You will receive an automated email confirmation with tracking info once your order ships.
          </p>
        </div>

        {/* Standard Shipping */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-primary flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900">Standard Shipping</h2>
          <p className="text-sm text-neutral-600 leading-relaxed font-medium">
            Estimated delivery: <strong>3–7 business days</strong>. Free standard shipping is automatically applied to all orders over $75.
          </p>
        </div>

        {/* Express Shipping */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-primary flex items-center justify-center">
            <PackageCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900">Express Shipping</h2>
          <p className="text-sm text-neutral-600 leading-relaxed font-medium">
            Estimated delivery: <strong>1–3 business days</strong>. Express orders placed before 12:00 PM EST ship the same day for priority arrival.
          </p>
        </div>

        {/* International Shipping */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-primary flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900">International Shipping</h2>
          <p className="text-sm text-neutral-600 leading-relaxed font-medium">
            We deliver to over 100 countries worldwide. International shipping delivery times range between <strong>7–14 business days</strong> depending on destination customs clearance.
          </p>
        </div>

      </div>

      {/* Additional Details */}
      <div className="bg-neutral-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-black">Shipping Charges & Order Tracking</h3>
          <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
            Exact shipping fees are calculated transparently during checkout based on your shipping address and chosen speed. Every order includes end-to-end tracking code updates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/30"
          >
            Track Your Order <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Delayed Package Assistance
          </Link>
        </div>
      </div>

    </div>
  );
};
