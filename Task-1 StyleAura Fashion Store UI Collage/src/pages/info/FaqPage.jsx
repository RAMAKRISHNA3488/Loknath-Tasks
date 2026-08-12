import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, Search, ArrowRight } from 'lucide-react';

export const FaqPage = () => {
  const [openId, setOpenId] = useState('orders-1');
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      category: 'ORDERS',
      items: [
        { id: 'orders-1', question: 'How can I place an order?', answer: 'Browse our collection, select your size and color, and click "Add to Cart". When you are ready, proceed to checkout and follow the quick payment instructions.' },
        { id: 'orders-2', question: 'Can I modify my order after placing it?', answer: 'We process orders quickly! You can modify or update shipping addresses within 1 hour of placing the order by contacting our support team.' },
        { id: 'orders-3', question: 'How can I cancel my order?', answer: 'Orders can be canceled before they ship from our warehouse. Visit My Orders in your account dropdown or email support@styleaura.com immediately.' },
        { id: 'orders-4', question: 'How can I track my order?', answer: 'Once your package ships, we send an email with tracking details. You can also view real-time tracking in your Account > My Orders page.' },
      ],
    },
    {
      category: 'PAYMENTS',
      items: [
        { id: 'pay-1', question: 'What payment methods do you accept?', answer: 'We accept major credit/debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and StyleAura store credit.' },
        { id: 'pay-2', question: 'Is my payment information secure?', answer: 'Yes! All transactions are encrypted via 256-bit SSL encryption. We never store full card numbers or sensitive CVV codes.' },
        { id: 'pay-3', question: 'What happens if my payment fails?', answer: 'If your payment is declined, please double-check your card details, billing zip code, or try another payment method.' },
      ],
    },
    {
      category: 'SHIPPING',
      items: [
        { id: 'ship-1', question: 'How long does shipping take?', answer: 'Standard shipping takes 3–7 business days. Express shipping takes 1–3 business days.' },
        { id: 'ship-2', question: 'Do you offer express shipping?', answer: 'Yes! Priority Express Shipping is available at checkout for urgent deliveries.' },
        { id: 'ship-3', question: 'Do you ship internationally?', answer: 'We ship to over 100 countries worldwide! International shipping takes 7–14 business days.' },
      ],
    },
    {
      category: 'RETURNS',
      items: [
        { id: 'ret-1', question: 'What is your return policy?', answer: 'We offer hassle-free returns within 30 days of delivery for unworn, unused items with original tags attached.' },
        { id: 'ret-2', question: 'How do I request a return?', answer: 'Contact support@styleaura.com with your Order ID to receive a prepaid return label and return instructions.' },
        { id: 'ret-3', question: 'How long does a refund take?', answer: 'Refunds are processed within 3–5 business days after inspecting your return at our warehouse.' },
        { id: 'ret-4', question: 'Can I exchange an item?', answer: 'Yes! Size and color exchanges are 100% free on your first exchange per order.' },
      ],
    },
    {
      category: 'ACCOUNT',
      items: [
        { id: 'acc-1', question: 'Do I need an account to place an order?', answer: 'You can check out as a guest, but creating an account lets you track orders, save addresses, and earn rewards.' },
        { id: 'acc-2', question: 'How can I change my account information?', answer: 'Log in and click your circular profile avatar in the navbar, then navigate to My Profile or Account Settings.' },
        { id: 'acc-3', question: 'I forgot my password. What should I do?', answer: 'Click "Forgot Password" on the Login page to receive a password reset link in your email.' },
      ],
    },
    {
      category: 'PRODUCTS',
      items: [
        { id: 'prod-1', question: 'How do I choose the correct size?', answer: 'Check our detailed Size Guide for exact measurements of tops, dresses, and bottoms.' },
        { id: 'prod-2', question: 'Are product images accurate?', answer: 'Yes! All photos are shot in high-definition studios to match real fabrics and colors accurately.' },
        { id: 'prod-3', question: 'How can I know if a product is available?', answer: 'In-stock sizes and colors are updated in real-time on product pages.' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Frequently Asked Questions</span>
      </div>

      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Help Center
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base">
          Find quick answers to common questions about orders, payments, shipping, sizing, and returns.
        </p>
      </div>

      {/* Accordion Categories */}
      <div className="space-y-8">
        {faqData.map((cat) => (
          <div key={cat.category} className="space-y-3">
            <h2 className="text-xs font-black text-primary uppercase tracking-widest bg-red-50 inline-block px-3 py-1 rounded-full border border-red-100">
              {cat.category}
            </h2>

            <div className="space-y-3">
              {cat.items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 hover:text-primary transition-colors text-sm sm:text-base focus:outline-none"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed border-t border-neutral-100 pt-3 bg-neutral-50/50">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions CTA */}
      <div className="bg-neutral-900 text-white p-8 rounded-3xl text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-black">Still Have Questions?</h3>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          Our friendly customer support team is available Monday through Friday to assist you.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/30"
          >
            Contact Customer Support <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};
