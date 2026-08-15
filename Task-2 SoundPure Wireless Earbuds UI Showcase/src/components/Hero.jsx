import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Sliders, Battery, Smartphone, Feather, Wifi, BatteryCharging } from 'lucide-react'
import { useCart } from '../data/cartContext'
import heroBgImg from '../Public/Images/hero-bg1.png'


export default function Hero() {
  const navigate = useNavigate()
  const { itemCount, cartItems, resetCart } = useCart()

  const handleBuyNow = (e) => {
    e.preventDefault()
    navigate('/product')
  }


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Details', path: '/product/details' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Support', path: '/support' },
  ]

  const features = [
    {
      id: 'sound',
      icon: Sliders,
      title: 'Immersive Sound',
      description: 'Rich, balanced, and everywhere you go'
    },
    {
      id: 'power',
      icon: Battery,
      title: 'All-Day Power',
      description: 'Up to 30 hours of battery life'
    },
    {
      id: 'comfort',
      icon: Feather,
      title: 'Comfort Fit',
      description: 'Lightweight design for all-day wear'
    },
    {
      id: 'connection',
      icon: Wifi,
      title: 'Seamless Connection',
      description: 'Instant pairing and stable performance'
    }
  ]

  return (
    <div className="w-full p-0 flex justify-center bg-[#94C2ED]">
      {/* Full-Bleed Edge-to-Edge Hero Container */}
      <div className="relative w-full overflow-hidden text-white min-h-[660px] sm:min-h-[720px] lg:min-h-[780px] xl:min-h-[840px] flex flex-col justify-between pt-4 sm:pt-6 pb-4 sm:pb-6 px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* 1. Background Image from src/Public/Images/hero-bg1.png (Full Bleed Edge-to-Edge) */}
        <img
          src={heroBgImg}
          alt="SoundPure Hero Background Photography"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[68%_center] select-none"
          loading="eager"
        />

        {/* 2. Hero Left Text Content */}
        <div className="relative max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full z-10 my-auto pt-24 sm:pt-28 pb-8 sm:pb-12">


          <div className="max-w-xl text-left space-y-6 sm:space-y-8">

            
            {/* Eyebrow Badge */}
            <div className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white/90 uppercase drop-shadow-sm">
              PURE SOUND. PERFECT YOU.
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.06] drop-shadow-sm">
              Hear More. <br />
              Do More.
            </h1>

            {/* Supporting Description */}
            <p className="text-white/90 text-base sm:text-lg max-w-md leading-relaxed font-normal drop-shadow-sm">
              Experience premium wireless audio with advanced noise cancellation and all-day comfort.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-900 font-bold text-base px-8 py-3.5 rounded-full shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Buy Now
              </button>


              <Link
                to="/product/details"
                className="inline-flex items-center justify-center gap-2 text-white hover:text-white/80 font-semibold text-base px-4 py-3.5 transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>

            {/* 3 Key Specs Icons (Stacked Vertically Above Text) */}
            <div className="pt-8 sm:pt-10 flex items-center gap-8 sm:gap-12">
              {/* Spec 1 */}
              <div className="flex flex-col items-center text-center gap-2">
                <Sliders className="w-6 h-6 text-white/90 shrink-0 stroke-[1.75]" />
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-white/90 uppercase leading-tight">
                  ACTIVE NOISE<br />CANCELLATION
                </span>
              </div>

              {/* Spec 2 */}
              <div className="flex flex-col items-center text-center gap-2">
                <BatteryCharging className="w-6 h-6 text-white/90 shrink-0 stroke-[1.75]" />
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-white/90 uppercase leading-tight">
                  32H BATTERY<br />LIFE
                </span>
              </div>

              {/* Spec 3 */}
              <div className="flex flex-col items-center text-center gap-2">
                <Smartphone className="w-6 h-6 text-white/90 shrink-0 stroke-[1.75]" />
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-white/90 uppercase leading-tight">
                  CRYSTAL CLEAR<br />CALLS
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}




