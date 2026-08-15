import React from 'react'
import { Link } from 'react-router-dom'
import { Headphones, Award, ShieldCheck, HeartHandshake, Users, ArrowRight, Sparkles } from 'lucide-react'
import Footer from '../components/Footer'

export default function About() {
  const stats = [
    { label: 'Happy Audiophiles', value: '50,000+' },
    { label: 'Verified Reviews', value: '4.9 / 5.0' },
    { label: 'Acoustic Patents', value: '14 Patents' },
    { label: 'Global Retail Outlets', value: '35+ Countries' }
  ]

  const pillars = [
    {
      icon: Headphones,
      title: 'Studio-Grade Acoustics',
      description: 'Custom-engineered 10mm dynamic drivers tuned for warm bass, pristine mids, and crystal-clear high frequencies.'
    },
    {
      icon: ShieldCheck,
      title: '45dB Hybrid ANC',
      description: 'Advanced dual-microphone active noise cancellation engineered to isolate background ambient noise seamlessly.'
    },
    {
      icon: HeartHandshake,
      title: 'Uncompromising Quality',
      description: 'Rigorously drop-tested, IPX5 water-resistant, and built with premium lightweight ergonomic materials.'
    },
    {
      icon: Users,
      title: 'Customer-First Support',
      description: 'Backing every earbud with a 30-Day Risk-Free trial, 1-Year Limited Warranty, and 24/7 dedicated support.'
    }
  ]

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900 min-h-screen flex flex-col justify-between">
      <div>
        
        {/* HERO HEADER */}
        <section className="pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/60">
          <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
                ABOUT SOUNDPURE
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1527] tracking-tight leading-[1.1]">
                Redefining Wireless Audio for Everyday Audiophiles
              </h1>
              <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
                Founded by passionate acoustic engineers, SoundPure was born from a singular vision: to deliver studio-quality wireless sound without compromise.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/80 shadow-xs space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 tracking-tight">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR STORY SECTION */}
        <section className="py-16 bg-white/60 border-b border-slate-200/60">
          <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-wider">
                <span>OUR PHILOSOPHY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1527] tracking-tight">
                Designed with Precision. Built for Freedom.
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  At SoundPure, we believe music should be experienced exactly as the artist intended. Traditional earbuds often compromise on bass depth or acoustic clarity. We set out to change that by combining custom 10mm graphene dynamic drivers with cutting-edge active noise cancellation algorithms.
                </p>
                <p>
                  Every curve of our charging case and earbud stem is crafted for ergonomic, pressure-free comfort, providing all-day playback whether you are commuting, working out, or relaxing at home.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <span>Explore Product Features</span>
                  <ArrowRight className="w-4 h-4 text-sky-400" />
                </Link>
              </div>
            </div>

            {/* Pillars Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-2">
                    <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 w-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
