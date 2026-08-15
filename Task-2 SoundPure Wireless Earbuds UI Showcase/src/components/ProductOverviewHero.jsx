import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../data/cartContext'
import { 
  Star, 
  ShoppingBag, 
  ShoppingCart,
  ArrowRight, 
  ShieldCheck, 
  BatteryCharging, 
  Volume2, 
  Feather, 
  Check, 
  Sparkles,
  Wifi,
  Heart
} from 'lucide-react'
import productImg from '../assets/product_intro_case.png'
import blackImg from '../Public/Images/Black.png'
import blueImg from '../Public/Images/Blue.png'

export default function ProductOverviewHero() {
  const [selectedColor, setSelectedColor] = useState('Arctic White')
  const [addedToast, setAddedToast] = useState(false)
  const [wishlistToast, setWishlistToast] = useState('')
  const navigate = useNavigate()
  const { addToCart, toggleWishlist: toggleWishlistContext, isInWishlist: isInWishlistContext } = useCart()

  const colors = [
    { name: 'Arctic White', bgClass: 'bg-white border-slate-300', image: productImg },
    { name: 'Matte Black', bgClass: 'bg-slate-900 border-slate-800', image: blackImg },
    { name: 'Midnight Blue', bgClass: 'bg-slate-800 border-sky-900', image: blueImg }
  ]

  const activeColorObj = colors.find((c) => c.name === selectedColor) || colors[0]
  const currentProductId = `soundpure-earbuds-${selectedColor.toLowerCase().replace(/\s+/g, '-')}`
  const isWishlisted = isInWishlistContext(currentProductId)

  const handleToggleWishlist = () => {
    const isAdded = toggleWishlistContext({
      id: currentProductId,
      name: 'SoundPure Wireless Earbuds',
      color: selectedColor,
      price: 199.00,
      image: activeColorObj.image
    })
    setWishlistToast(isAdded ? 'Saved to Wishlist ♥' : 'Removed from Wishlist')
    setTimeout(() => setWishlistToast(''), 2500)
  }

  const handleAddToCart = () => {
    addToCart({
      id: 'soundpure-earbuds-' + selectedColor.toLowerCase().replace(/\s+/g, '-'),
      name: 'SoundPure Wireless Earbuds',
      color: selectedColor,
      price: 199.00,
      quantity: 1,
      image: activeColorObj.image
    })
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 3000)
  }

  const handleBuyNow = () => {
    addToCart({
      id: 'soundpure-earbuds-' + selectedColor.toLowerCase().replace(/\s+/g, '-'),
      name: 'SoundPure Wireless Earbuds',
      color: selectedColor,
      price: 199.00,
      quantity: 1,
      image: activeColorObj.image
    })
    navigate('/checkout')
  }

  const highlights = [
    {
      id: 'anc',
      icon: ShieldCheck,
      title: '45dB Hybrid ANC',
      description: 'Advanced dual-microphone active noise cancellation blocks environmental noise seamlessly.'
    },
    {
      id: 'audio',
      icon: Volume2,
      title: 'Studio Acoustic Driver',
      description: 'Custom 10mm graphene drivers tuned for deep bass, rich mids, and ultra-clear highs.'
    },
    {
      id: 'battery',
      icon: BatteryCharging,
      title: '32 Hours Total Playback',
      description: '6 hours of uninterrupted listening per charge plus 26 extra hours in the charging case.'
    },
    {
      id: 'comfort',
      icon: Feather,
      title: 'Ergonomic All-Day Fit',
      description: 'Featherweight design with 3 pairs of soft silicone ear tips for pressure-free seal.'
    }
  ]

  return (
    <div className="w-full bg-[#F0F5FA] text-slate-900">
      
      {/* 1. Primary Product Overview Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Side: Product Presentation Visual & Color Switcher */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative flex items-center justify-center overflow-hidden rounded-3xl group">
                
                {/* Love Symbol / Wishlist Button on Top Left */}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  className="absolute top-4 left-4 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group/btn"
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isWishlisted
                        ? 'fill-rose-500 text-rose-500 scale-110'
                        : 'text-slate-600 group-hover/btn:text-rose-500'
                    }`}
                  />
                </button>
                
                <img
                  key={selectedColor}
                  src={activeColorObj.image}
                  alt={`SoundPure Wireless Earbuds - ${selectedColor}`}
                  className="relative z-10 w-full h-auto max-h-[420px] sm:max-h-[460px] object-contain rounded-3xl drop-shadow-xl transition-all duration-300 group-hover:scale-[1.03]"
                  loading="eager"
                />

                <span className="absolute top-4 right-4 z-20 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  In Stock
                </span>
              </div>


              {/* Color Selection Bar */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Color Variant: <span className="text-sky-600 font-extrabold">{selectedColor}</span>
                </span>

                <div className="flex items-center space-x-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full ${c.bgClass} border-2 flex items-center justify-center shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none cursor-pointer ${
                        selectedColor === c.name ? 'ring-2 ring-sky-500 scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      aria-label={`Select ${c.name}`}
                    >
                      {selectedColor === c.name && (
                        <Check className={`w-3.5 h-3.5 ${c.name === 'Arctic White' ? 'text-slate-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Product Details, Pricing, & Action CTAs */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold tracking-wider uppercase">
                  <span>FLAGSHIP COLLECTION • 2026 EDITION</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  SoundPure Wireless Earbuds
                </h1>

                {/* Rating Link */}
                <Link 
                  to="/reviews" 
                  className="inline-flex items-center gap-2 group text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors"
                >
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span>4.9 / 5.0</span>
                  <span className="text-slate-400 font-normal">(2,500+ Verified Reviews)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm w-fit">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">$199.00</span>
                <span className="text-lg text-slate-400 line-through font-normal">$249.00</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Save $50
                </span>
              </div>

              {/* Summary Description */}
              <p className="text-slate-600 text-base leading-relaxed font-normal">
                Engineered for audiophiles and daily commuters alike. SoundPure combines 45dB hybrid active noise cancellation, studio-tuned 10mm dynamic drivers, and 32 hours of battery power in a sleek, ultra-comfortable ergonomic form factor.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto h-12 flex-1 inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm sm:text-base font-semibold px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                  <span>{addedToast ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto h-12 flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm sm:text-base font-semibold px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 text-sky-400" />
                  <span>Buy Now • $199</span>
                </button>

                <Link
                  to="/product/details"
                  className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-sm sm:text-base font-semibold px-5 rounded-full border border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
                >
                  <span>In-Depth Specs</span>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Features & Specs Grid Section */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-widest text-sky-700 uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              ENGINEERED FOR EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why SoundPure Leads the Industry
            </h2>
            <p className="text-slate-600 text-base">
              Every detail is crafted for studio-grade acoustic performance and effortless daily durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="bg-slate-50 hover:bg-slate-100/90 rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
                >
                  <div className="inline-flex p-3 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="pt-6 text-center flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-600">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 hover:underline">
              <span>Explore All Audio Features</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span>•</span>
            <Link to="/support?tab=warranty" className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 hover:underline">
              <span>Warranty & 30-Day Guarantee</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Right Professional Popup Messages */}
      {wishlistToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{wishlistToast}</span>
        </div>
      )}

      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <ShoppingCart className="w-5 h-5 text-sky-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">SoundPure Earbuds added to cart!</span>
        </div>
      )}

    </div>
  )
}
