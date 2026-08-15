import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, ArrowRight, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react'
import productImg from '../assets/product_intro_case.png'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-[#F0F5FA] text-slate-900 py-12 lg:py-20 border-b border-slate-200/60 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Explanation, & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-sm">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>Oops!</span>
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Page Not Found
              </h1>

              <p className="text-slate-500 text-base sm:text-lg font-normal max-w-lg mx-auto lg:mx-0 leading-relaxed">
                The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              >
                <Home className="w-5 h-5 text-sky-400" />
                <span>Go Home</span>
              </button>

              <Link
                to="/product"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-base font-semibold px-6 py-3.5 rounded-full border border-slate-300 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4 text-slate-600" />
                <span>Explore Products</span>
              </Link>
            </div>

          </div>

          {/* Right Column: 404 Typography & Integrated SoundPure Earbuds Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Background 404 Giant Watermark */}
            <span className="absolute -top-10 sm:-top-16 text-[140px] sm:text-[200px] lg:text-[240px] font-black text-sky-600/15 tracking-tighter select-none font-mono pointer-events-none">
              404
            </span>

            {/* Foreground Product Card */}
            <div className="relative z-10 rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-8 sm:p-12 max-w-md w-full overflow-hidden group">
              <div className="absolute w-[80%] h-[80%] bg-sky-100/70 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6 text-center">
                <img
                  src={productImg}
                  alt="SoundPure Earbuds 404 Visual"
                  className="w-full h-auto max-h-[260px] sm:max-h-[300px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]"
                />

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    LOST IN SOUND?
                  </span>
                  <span className="text-sm font-semibold text-slate-700 block pt-0.5">
                    Return to the main SoundPure experience.
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
