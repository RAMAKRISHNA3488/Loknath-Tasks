import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Info, ArrowRight } from 'lucide-react';

export const SizeGuidePage = () => {
  const [unit, setUnit] = useState('inches');

  const topsData = [
    { size: 'XS', bust: unit === 'inches' ? '31 - 32"' : '78.5 - 81 cm', waist: unit === 'inches' ? '24 - 25"' : '61 - 63.5 cm', hip: unit === 'inches' ? '34 - 35"' : '86.5 - 89 cm' },
    { size: 'S', bust: unit === 'inches' ? '33 - 34"' : '84 - 86.5 cm', waist: unit === 'inches' ? '26 - 27"' : '66 - 68.5 cm', hip: unit === 'inches' ? '36 - 37"' : '91.5 - 94 cm' },
    { size: 'M', bust: unit === 'inches' ? '35 - 36"' : '89 - 91.5 cm', waist: unit === 'inches' ? '28 - 29"' : '71 - 73.5 cm', hip: unit === 'inches' ? '38 - 39"' : '96.5 - 99 cm' },
    { size: 'L', bust: unit === 'inches' ? '37 - 39"' : '94 - 99 cm', waist: unit === 'inches' ? '30 - 32"' : '76 - 81 cm', hip: unit === 'inches' ? '40 - 42"' : '101.5 - 106.5 cm' },
    { size: 'XL', bust: unit === 'inches' ? '40 - 42"' : '101.5 - 106.5 cm', waist: unit === 'inches' ? '33 - 35"' : '84 - 89 cm', hip: unit === 'inches' ? '43 - 45"' : '109 - 114 cm' },
  ];

  const dressesData = [
    { size: 'XS', bust: unit === 'inches' ? '31.5"' : '80 cm', waist: unit === 'inches' ? '24.5"' : '62 cm', hip: unit === 'inches' ? '34.5"' : '87.5 cm' },
    { size: 'S', bust: unit === 'inches' ? '33.5"' : '85 cm', waist: unit === 'inches' ? '26.5"' : '67 cm', hip: unit === 'inches' ? '36.5"' : '92.5 cm' },
    { size: 'M', bust: unit === 'inches' ? '35.5"' : '90 cm', waist: unit === 'inches' ? '28.5"' : '72 cm', hip: unit === 'inches' ? '38.5"' : '97.5 cm' },
    { size: 'L', bust: unit === 'inches' ? '38.5"' : '98 cm', waist: unit === 'inches' ? '31.5"' : '80 cm', hip: unit === 'inches' ? '41.5"' : '105.5 cm' },
    { size: 'XL', bust: unit === 'inches' ? '41.5"' : '105.5 cm', waist: unit === 'inches' ? '34.5"' : '87.5 cm', hip: unit === 'inches' ? '44.5"' : '113 cm' },
  ];

  const bottomsData = [
    { size: 'XS (24-25)', waist: unit === 'inches' ? '24 - 25"' : '61 - 63.5 cm', hip: unit === 'inches' ? '34 - 35"' : '86.5 - 89 cm' },
    { size: 'S (26-27)', waist: unit === 'inches' ? '26 - 27"' : '66 - 68.5 cm', hip: unit === 'inches' ? '36 - 37"' : '91.5 - 94 cm' },
    { size: 'M (28-29)', waist: unit === 'inches' ? '28 - 29"' : '71 - 73.5 cm', hip: unit === 'inches' ? '38 - 39"' : '96.5 - 99 cm' },
    { size: 'L (30-31)', waist: unit === 'inches' ? '30 - 31"' : '76 - 78.5 cm', hip: unit === 'inches' ? '40 - 41"' : '101.5 - 104 cm' },
    { size: 'XL (32-33)', waist: unit === 'inches' ? '32 - 33"' : '81 - 84 cm', hip: unit === 'inches' ? '42 - 43"' : '106.5 - 109 cm' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold">Size Guide</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-8">
        <div className="space-y-3">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block">
            Fit Guidance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
            Size Guide
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl">
            Find your perfect fit with our comprehensive women's measurement guidelines.
          </p>
        </div>

        {/* Inches / CM Toggle */}
        <div className="bg-neutral-100 p-1 rounded-full flex items-center border border-neutral-200 shrink-0">
          <button
            onClick={() => setUnit('inches')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              unit === 'inches' ? 'bg-primary text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Inches (in)
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              unit === 'cm' ? 'bg-primary text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Centimeters (cm)
          </button>
        </div>
      </div>

      {/* Note */}
      <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-neutral-700 font-medium">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <span>Measurements may vary slightly depending on product design and fit. If you are between sizes, we recommend sizing up.</span>
      </div>

      {/* Women's Tops Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xl space-y-4">
        <h2 className="text-xl font-extrabold text-neutral-900">Women's Tops & Outerwear</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-xs font-extrabold text-neutral-700 uppercase tracking-wider">
                <th className="py-3.5 px-4 rounded-l-xl">Size</th>
                <th className="py-3.5 px-4">Bust</th>
                <th className="py-3.5 px-4">Waist</th>
                <th className="py-3.5 px-4 rounded-r-xl">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-800">
              {topsData.map((r) => (
                <tr key={r.size} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-black text-primary">{r.size}</td>
                  <td className="py-3.5 px-4">{r.bust}</td>
                  <td className="py-3.5 px-4">{r.waist}</td>
                  <td className="py-3.5 px-4">{r.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Women's Dresses Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xl space-y-4">
        <h2 className="text-xl font-extrabold text-neutral-900">Women's Dresses</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-xs font-extrabold text-neutral-700 uppercase tracking-wider">
                <th className="py-3.5 px-4 rounded-l-xl">Size</th>
                <th className="py-3.5 px-4">Bust</th>
                <th className="py-3.5 px-4">Waist</th>
                <th className="py-3.5 px-4 rounded-r-xl">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-800">
              {dressesData.map((r) => (
                <tr key={r.size} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-black text-primary">{r.size}</td>
                  <td className="py-3.5 px-4">{r.bust}</td>
                  <td className="py-3.5 px-4">{r.waist}</td>
                  <td className="py-3.5 px-4">{r.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Women's Bottoms Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xl space-y-4">
        <h2 className="text-xl font-extrabold text-neutral-900">Women's Bottoms & Skirts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-xs font-extrabold text-neutral-700 uppercase tracking-wider">
                <th className="py-3.5 px-4 rounded-l-xl">Size</th>
                <th className="py-3.5 px-4">Waist</th>
                <th className="py-3.5 px-4 rounded-r-xl">Hip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-800">
              {bottomsData.map((r) => (
                <tr key={r.size} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-black text-primary">{r.size}</td>
                  <td className="py-3.5 px-4">{r.waist}</td>
                  <td className="py-3.5 px-4">{r.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to Measure Section */}
      <div className="bg-neutral-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Ruler className="w-6 h-6 text-primary" /> How to Measure Yourself
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-300">
          <div className="p-4 bg-neutral-800/70 rounded-2xl space-y-2 border border-neutral-700">
            <h3 className="font-extrabold text-white text-base">1. Bust</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              Measure around the fullest part of your bust, keeping the measuring tape horizontal and relaxed.
            </p>
          </div>

          <div className="p-4 bg-neutral-800/70 rounded-2xl space-y-2 border border-neutral-700">
            <h3 className="font-extrabold text-white text-base">2. Waist</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              Measure around your natural waistline (the narrowest part of your torso), keeping the tape comfortably loose.
            </p>
          </div>

          <div className="p-4 bg-neutral-800/70 rounded-2xl space-y-2 border border-neutral-700">
            <h3 className="font-extrabold text-white text-base">3. Hip</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              Stand with your feet together and measure around the fullest part of your hips and rear.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
