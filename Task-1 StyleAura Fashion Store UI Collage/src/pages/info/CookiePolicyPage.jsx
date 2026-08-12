import React from 'react';
import { Link } from 'react-router-dom';

export const CookiePolicyPage = () => {
  const sections = [
    { title: '1. What Are Cookies?', text: 'Cookies are small text files stored on your computer or mobile device when you visit a website. They help websites remember your preferences, login session, and shopping cart items.' },
    { title: '2. Why We Use Cookies', text: 'StyleAura uses cookies to ensure our shopping cart functions smoothly, remember your user session, and deliver a personalized browsing experience.' },
    { title: '3. Essential Cookies', text: 'These cookies are strictly necessary for the website to function properly. They enable core features such as shopping cart storage, secure checkout, and authentication.' },
    { title: '4. Preference Cookies', text: 'Preference cookies allow StyleAura to remember your settings (such as size units in inches or cm, currency preferences, and theme selection).' },
    { title: '5. Analytics Cookies', text: 'Analytics cookies gather anonymous information regarding site traffic and page visits, helping us optimize website performance and user experience.' },
    { title: '6. Marketing Cookies', text: 'Marketing cookies track browsing habits across websites to deliver relevant fashion advertisements and promotional drops.' },
    { title: '7. Third-Party Cookies', text: 'Certain third-party service providers (such as payment processing gateways) may set cookies on our site to securely handle payments.' },
    { title: '8. Managing Cookies', text: 'You can control or disable cookies at any time through your web browser settings. Note that disabling essential cookies may impact shopping cart functionality.' },
    { title: '9. Changes to This Cookie Policy', text: 'We may update our Cookie Policy periodically. Revisions will be posted on this page with an updated effective date.' },
    { title: '10. Contact Information', text: 'If you have questions about how StyleAura uses cookies, please contact privacy@styleaura.com.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/legal" className="hover:text-primary transition-colors">Legal</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Cookie Policy</span>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-neutral-200 pb-8">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Privacy & Cookies
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs text-neutral-500 font-medium">Last revised: February 2025</p>
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
