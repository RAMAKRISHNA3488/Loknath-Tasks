import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Cookie, Award, ArrowRight } from 'lucide-react';

export const LegalPage = () => {
  const legalSections = [
    {
      title: 'Privacy Policy',
      path: '/privacy',
      description: 'Learn how StyleAura collects, uses, and protects your personal data and privacy rights.',
      icon: ShieldCheck,
    },
    {
      title: 'Terms & Conditions',
      path: '/terms',
      description: 'Review the legal rules, user agreements, and store terms governing website usage.',
      icon: FileText,
    },
    {
      title: 'Cookie Policy',
      path: '/cookies',
      description: 'Information regarding how we use essential, preference, and analytics cookies.',
      icon: Cookie,
    },
    {
      title: 'Licenses & Attributions',
      path: '/licenses',
      description: 'Open-source software licenses, icon credits, and media asset attributions.',
      icon: Award,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Legal</span>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-neutral-200 pb-8">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Legal & Compliance Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Legal Center
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base max-w-2xl leading-relaxed">
          Access our comprehensive legal documentation, privacy policies, terms of service, cookie disclosures, and open-source attributions.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {legalSections.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              to={item.path}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-md hover:shadow-xl hover:border-primary/40 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold text-neutral-900 group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-extrabold text-primary group-hover:translate-x-1 transition-transform gap-1">
                View Documentation <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};
