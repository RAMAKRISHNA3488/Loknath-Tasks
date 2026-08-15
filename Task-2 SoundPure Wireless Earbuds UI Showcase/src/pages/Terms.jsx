import React from 'react'
import { FileCheck, ShieldAlert, RefreshCw, Scale } from 'lucide-react'
import Footer from '../components/Footer'

export default function Terms() {
  const sections = [
    {
      icon: FileCheck,
      title: '1. Agreement to Terms',
      content: 'By accessing or purchasing from SoundPure Audio Inc., you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not purchase or use our products or services.'
    },
    {
      icon: RefreshCw,
      title: '2. 30-Day Risk-Free Return Policy',
      content: 'All purchases made directly through SoundPure include a 30-Day Risk-Free Trial. If you are unsatisfied with your earbuds for any reason, you may initiate a return within 30 days of delivery for a full refund. Returned items must include all original accessories and packaging.'
    },
    {
      icon: ShieldAlert,
      title: '3. 1-Year Limited Hardware Warranty',
      content: 'SoundPure provides a 1-Year Limited Hardware Warranty against manufacturing defects, driver failures, and electronic charging port issues. The warranty does not cover accidental submersion in water, unauthorized disassembly, or severe physical damage.'
    },
    {
      icon: Scale,
      title: '4. Limitation of Liability',
      content: 'SoundPure Audio Inc. shall not be liable for any indirect, incidental, or consequential damages arising out of product usage beyond the purchase value of the product.'
    }
  ]

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900 min-h-screen flex flex-col justify-between">
      <div>
        
        {/* HERO HEADER */}
        <section className="pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-200/60">
          <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
              TERMS & CONDITIONS
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1527] tracking-tight">
              SoundPure Terms of Service
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Effective date: January 15, 2026. Please read these terms carefully before placing an order.
            </p>
          </div>
        </section>

        {/* TERMS CONTENT */}
        <section className="py-12 bg-white/60 border-b border-slate-200/60">
          <div className="max-w-4xl mx-auto px-6 sm:px-10 space-y-8">
            {sections.map((sec, idx) => {
              const Icon = sec.icon
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{sec.title}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">{sec.content}</p>
                </div>
              )
            })}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
