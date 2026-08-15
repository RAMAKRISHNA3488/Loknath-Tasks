import React from 'react'
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react'
import Footer from '../components/Footer'

export default function Privacy() {
  const sections = [
    {
      icon: Eye,
      title: '1. Information We Collect',
      content: 'We collect personal information that you voluntarily provide to us when purchasing SoundPure products, creating an account, subscribing to our newsletter, or contacting technical support. This includes your name, email address, shipping address, payment credentials, and support inquiry logs.'
    },
    {
      icon: Lock,
      title: '2. How We Use & Protect Your Data',
      content: 'Your information is strictly utilized to process your order fulfillments, manage warranty protection claims, deliver firmware updates, and improve your user experience. We use industry-standard 256-bit SSL encryption to safeguard all transactions. We NEVER sell or rent your personal information to third-party advertisers.'
    },
    {
      icon: FileText,
      title: '3. Cookies & Tracking Technologies',
      content: 'SoundPure uses essential cookies and performance analytics to optimize checkout speeds, remember shopping cart items, and understand website navigation metrics. You can manage cookie preferences directly within your browser settings at any time.'
    },
    {
      icon: ShieldCheck,
      title: '4. Your Data Rights & Contact Information',
      content: 'You reserve full rights to request access, correction, export, or complete deletion of your personal data. For privacy inquiries or data removal requests, contact our Data Privacy Team at privacy@soundpureaudio.com.'
    }
  ]

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900 min-h-screen flex flex-col justify-between">
      <div>
        
        {/* HERO HEADER */}
        <section className="pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-200/60">
          <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
              LEGAL & PRIVACY
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1527] tracking-tight">
              SoundPure Privacy Policy
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Last updated: January 15, 2026. Your privacy and data security are our highest priorities.
            </p>
          </div>
        </section>

        {/* POLICY CONTENT */}
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
