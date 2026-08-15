import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Star, CheckCircle2 } from 'lucide-react'
import { useCart } from '../data/cartContext'
import product1Img from '../Public/Images/Product1.png'

export default function ProductIntro() {
  const navigate = useNavigate()
  const { itemCount } = useCart()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Details', path: '/product/details' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Support', path: '/support' },
  ]

  const specs = [
    { id: 'battery', value: '30H', label: 'TOTAL BATTERY' },
    { id: 'charge', value: '6H', label: 'SINGLE CHARGE' },
    { id: 'water', value: 'IPX5', label: 'WATER RESISTANT' },
    { id: 'driver', value: '10mm', label: 'DYNAMIC DRIVER' },
  ]

  const reviews = [
    {
      id: 1,
      quote: '"Best earbuds I\'ve ever used."',
      author: 'Ron K.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 2,
      quote: '"Perfect sound, all day comfort."',
      author: 'Jane T.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 3,
      quote: '"Absolutely worth it!"',
      author: 'Priya M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    },
  ]

  return (
    <section className="w-full bg-[#EBF3FC] text-slate-900 py-12 px-4 sm:px-8 lg:px-12 flex flex-col items-center border-t border-slate-200/60">
      <div className="max-w-[1360px] w-full space-y-12">
        
        {/* Main Product Feature Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          
          {/* Left Column: Product1.png Showcase Card (Slightly Decreased Size) */}
          <div className="lg:col-span-5 max-w-[500px] w-full mx-auto lg:mx-0">
            <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl bg-[#94C2ED] border border-white/20">
              <img
                src={product1Img}
                alt="SoundPure Earbuds Product 1 Showcase"
                className="w-full h-auto object-cover select-none block"
                loading="eager"
              />
            </div>
          </div>

          {/* Right Column: Content & Specs */}
          <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6">

            
            {/* Header Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.2em] text-sky-600 uppercase">
                  DESIGNED FOR LIFE
                </span>
                <span className="w-8 h-[2px] bg-sky-500/80 rounded-full" />
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                Sound That Moves <br />
                With You
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-lg pt-1">
                Whether you're working, traveling, or relaxing—SoundPure delivers the perfect soundtrack.
              </p>
            </div>

            {/* 2x2 Specs Grid */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              {specs.map((spec) => (
                <div key={spec.id} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-sky-600 tracking-tight">
                    {spec.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Reviews Section */}
        <div className="pt-8 space-y-6">
          {/* Header Link */}
          <Link to="/reviews" className="inline-block space-y-2 group focus:outline-none">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors tracking-tight">
              Loved by Thousands →
            </h3>

            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                4.8/5 from 2,500+ reviews
              </span>
            </div>
          </Link>

          {/* 3 Clickable Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <Link
                key={review.id}
                to="/reviews"
                className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:scale-[1.01] transition-all group focus:outline-none"
              >
                <div className="relative shrink-0">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white">
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  </span>
                </div>

                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                    {review.quote}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    — {review.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}

