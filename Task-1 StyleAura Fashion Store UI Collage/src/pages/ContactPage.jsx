import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const ContactPage = () => {
  const { triggerToast } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    triggerToast('Thank you! Your message has been received.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Contact Us</span>
      </div>

      {/* Hero Title */}
      <div className="space-y-2 max-w-3xl">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Customer Service & Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Get In Touch
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed pt-1">
          We're here to help with orders, products, shipping, returns, and anything else you need.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Info Panel (Left 5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xl space-y-6">
          <h2 className="text-xl font-extrabold text-neutral-900 border-b border-neutral-100 pb-4">
            Contact Information
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-primary/10 text-primary rounded-2xl shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider">Email Support</h4>
                <p className="text-neutral-700 font-semibold pt-0.5">support@styleaura.com</p>
                <p className="text-xs text-neutral-400">Response time: within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-primary/10 text-primary rounded-2xl shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider">Customer Support Phone</h4>
                <p className="text-neutral-700 font-semibold pt-0.5">+1 234 567 890</p>
                <p className="text-xs text-neutral-400">Toll-free assistance</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-primary/10 text-primary rounded-2xl shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider">Business Hours</h4>
                <p className="text-neutral-700 font-semibold pt-0.5">Monday - Friday</p>
                <p className="text-xs text-neutral-500 font-medium">9:00 AM - 6:00 PM EST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-primary/10 text-primary rounded-2xl shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider">Headquarters</h4>
                <p className="text-neutral-700 font-semibold pt-0.5">123 Fashion Blvd, Suite 400</p>
                <p className="text-xs text-neutral-500 font-medium">New York, NY 10001, USA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Right 7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xl space-y-6">
          
          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-emerald-900 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black">Message Sent Successfully!</h3>
              <p className="text-sm font-medium text-emerald-800 max-w-md mx-auto">
                Thank you! Your message has been received. Our support team will get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 inline-flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full uppercase tracking-wider transition-colors shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-extrabold text-neutral-900 border-b border-neutral-100 pb-4">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1">
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Order Inquiry / Sizing Question"
                  className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe how we can help you..."
                  className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
