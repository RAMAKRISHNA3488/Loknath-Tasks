import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Package, Image as ImageIcon, Type, Award } from 'lucide-react';

export const LicensesPage = () => {
  const libraries = [
    { name: 'React', version: '^19.2.8', purpose: 'Core component UI library for building interactive views.', license: 'MIT License' },
    { name: 'React DOM', version: '^19.2.8', purpose: 'DOM rendering engine for web browsers.', license: 'MIT License' },
    { name: 'React Router DOM', version: '^7.18.2', purpose: 'Declarative client-side routing and navigation.', license: 'MIT License' },
    { name: 'Lucide React', version: '^1.31.0', purpose: 'Beautiful, consistent open-source iconography.', license: 'ISC / MIT License' },
    { name: 'Vite', version: '^8.2.0', purpose: 'Next-generation frontend development & production bundler.', license: 'MIT License' },
    { name: 'Tailwind CSS', version: '^3.4.19', purpose: 'Utility-first CSS framework for responsive design.', license: 'MIT License' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link to="/legal" className="hover:text-primary transition-colors">Legal</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Licenses & Attributions</span>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-neutral-200 pb-8">
        <span className="text-primary font-bold text-xs uppercase tracking-widest block">
          Open Source Credits
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
          Licenses & Attributions
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base max-w-2xl leading-relaxed">
          StyleAura is built with modern open-source software, high-resolution photography, and Google web fonts.
        </p>
      </div>

      {/* Open Source Libraries Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" /> Third-Party Open Source Libraries
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {libraries.map((lib) => (
            <div key={lib.name} className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-neutral-900">{lib.name}</h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full border border-neutral-200">
                  {lib.license}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono">Version: {lib.version}</p>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed">{lib.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Media & Design Attributions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-primary flex items-center justify-center font-bold">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-neutral-900">Photography</h3>
          <p className="text-xs text-neutral-600 font-medium leading-relaxed">
            High-definition fashion lookbook photographs courtesy of <strong>Unsplash</strong> under the Unsplash License.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-primary flex items-center justify-center font-bold">
            <Type className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-neutral-900">Typography</h3>
          <p className="text-xs text-neutral-600 font-medium leading-relaxed">
            Modern typography rendered using Google Web Fonts (Inter & Outfit) under the <strong>SIL Open Font License</strong>.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-primary flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-neutral-900">Icons</h3>
          <p className="text-xs text-neutral-600 font-medium leading-relaxed">
            Vector stroke iconography powered by <strong>Lucide Icons</strong> open-source library.
          </p>
        </div>
      </div>

    </div>
  );
};
