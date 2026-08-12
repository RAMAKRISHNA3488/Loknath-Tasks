import React from 'react';
import { Link } from 'react-router-dom';

export const TermsPage = () => {
  const sections = [
    { title: '1. Acceptance of Terms', text: 'By accessing or using the StyleAura website, you agree to be bound by these Terms & Conditions. If you do not agree to all terms, you may not use our website or services.' },
    { title: '2. Website Usage', text: 'StyleAura grants you a limited, non-exclusive, non-transferable license to access and make personal use of this website. Commercial reproduction or exploitation without written consent is strictly prohibited.' },
    { title: '3. User Accounts', text: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account.' },
    { title: '4. Product Information', text: 'We make every effort to display product colors, fabrics, and descriptions as accurately as possible. However, slight variations in screen resolution may affect exact color perception.' },
    { title: '5. Pricing', text: 'All prices are displayed in USD unless otherwise indicated. We reserve the right to modify prices or correct typographical pricing errors without prior notice.' },
    { title: '6. Orders', text: 'Order submission constitutes an offer to purchase. StyleAura reserves the right to accept, limit, or decline any order for any reason prior to dispatch.' },
    { title: '7. Payments', text: 'Payment must be completed in full before order dispatch. Valid payment methods include major credit/debit cards, PayPal, and Apple Pay.' },
    { title: '8. Shipping', text: 'Delivery times are estimates and not guaranteed. StyleAura is not liable for carrier delays caused by weather, customs clearance, or force majeure events.' },
    { title: '9. Returns and Exchanges', text: 'Returns and size exchanges are governed by our official Returns & Exchange Policy. Eligible items must be requested within 30 days of delivery.' },
    { title: '10. Intellectual Property', text: 'All logos, graphics, brand marks, and product photographs on StyleAura are the exclusive property of StyleAura and protected under copyright laws.' },
    { title: '11. Prohibited Activities', text: 'Users are prohibited from uploading malicious code, conducting unauthorized data scraping, attempting system breaches, or impersonating other individuals.' },
    { title: '12. Limitation of Liability', text: 'StyleAura shall not be liable for indirect, incidental, or consequential damages arising out of your use or inability to use this website.' },
    { title: '13. Changes to Terms', text: 'We reserve the right to revise these Terms & Conditions at any time. Continued usage of the website following changes constitutes acceptance.' },
    { title: '14. Contact Information', text: 'For questions regarding these Terms & Conditions, please contact legal@styleaura.com.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/legal" className="hover:text-primary transition-colors">Legal</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Terms & Conditions</span>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-neutral-200 pb-8">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-neutral-500 font-medium">Effective date: February 2025</p>
      </div>

      {/* Sections List */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-xl space-y-8">
        {sections.map((sec) => (
          <div key={sec.title} className="space-y-2 border-b border-neutral-100 last:border-0 pb-6 last:pb-0">
            <h2 className="text-lg font-black text-neutral-900">{sec.title}</h2>
            <p className="text-sm text-neutral-600 font-medium leading-relaxed">{sec.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
};
