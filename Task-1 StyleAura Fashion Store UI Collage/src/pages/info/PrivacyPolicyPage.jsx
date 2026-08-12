import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const sections = [
    { title: '1. Information We Collect', text: 'We collect personal information that you provide directly to us when creating an account, placing an order, subscribing to our newsletter, or contacting customer support. This includes your name, email address, phone number, shipping address, and billing information.' },
    { title: '2. How We Use Your Information', text: 'Your information is used to process orders, fulfill delivery shipments, send order status updates, personalize your shopping experience, and improve our website features.' },
    { title: '3. Account Information', text: 'Account information such as profile names, addresses, and wishlist preferences are stored securely in your client-side profile session. You may update or delete this information at any time via your account settings.' },
    { title: '4. Order and Payment Information', text: 'Payment details are processed securely using industry-standard encrypted gateways. StyleAura does not store full credit card numbers or sensitive CVV authentication codes.' },
    { title: '5. Cookies and Tracking', text: 'We use essential session cookies to keep track of your shopping cart, user authentication, and preferences. You can manage or disable non-essential cookies via your browser settings.' },
    { title: '6. Third-Party Services', text: 'We may share necessary fulfillment data with trusted shipping carriers and payment processors solely to complete your transactions. We never sell or rent your personal data to third parties.' },
    { title: '7. Data Security', text: 'We implement strong administrative and technical safeguards to protect your personal data against unauthorized access, loss, or misuse.' },
    { title: '8. Data Retention', text: 'We retain your personal data only for as long as necessary to provide services and comply with legal or accounting obligations.' },
    { title: '9. Your Privacy Rights', text: 'Depending on your location, you have the right to access, correct, export, or request deletion of your personal information stored with StyleAura.' },
    { title: '10. Children\'s Privacy', text: 'StyleAura services are intended for users aged 18 and older. We do not knowingly collect personal information from children under 13.' },
    { title: '11. Policy Updates', text: 'We may update this Privacy Policy periodically to reflect changes in legal or operational practices. Revised dates will be displayed at the top of this policy.' },
    { title: '12. Contact Information', text: 'If you have questions or concerns regarding this Privacy Policy, please contact our Data Protection team at privacy@styleaura.com or via our Contact Us page.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/legal" className="hover:text-primary transition-colors">Legal</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Privacy Policy</span>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-neutral-200 pb-8">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 font-medium">Last updated: February 2025</p>
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
