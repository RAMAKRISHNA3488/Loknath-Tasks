import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'

export default function ReviewsPreview() {
  const [activePage, setActivePage] = useState(0)

  const reviewSets = [
    [
      {
        id: 1,
        name: 'Alex Turner',
        role: 'Verified Buyer',
        avatarBg: 'bg-sky-500',
        initials: 'AT',
        rating: 5,
        title: 'Best earbuds I\'ve ever used.',
        comment: 'Active noise cancellation is incredible! Sound clarity and bass depth rival over-ear studio headphones.'
      },
      {
        id: 2,
        name: 'Maya Chen',
        role: 'Verified Buyer',
        avatarBg: 'bg-indigo-500',
        initials: 'MC',
        rating: 5,
        title: 'Perfect sound, all day comfort.',
        comment: 'Lightweight ergonomic fit that never causes ear fatigue. Battery easily lasts through my full workday.'
      },
      {
        id: 3,
        name: 'David Rodriguez',
        role: 'Verified Buyer',
        avatarBg: 'bg-[#0F172A]',
        initials: 'DR',
        rating: 5,
        title: 'Absolutely worth it!',
        comment: 'Studio-grade audio clarity and instant pairing. The charging case feels ultra-premium in the hand.'
      }
    ],
    [
      {
        id: 4,
        name: 'Sarah Jenkins',
        role: 'Verified Buyer',
        avatarBg: 'bg-blue-600',
        initials: 'SJ',
        rating: 5,
        title: 'Crystal clear call quality.',
        comment: 'Beamforming microphones filter out wind and background noise completely. Outstanding mic clarity!'
      },
      {
        id: 5,
        name: 'James Wilson',
        role: 'Verified Buyer',
        avatarBg: 'bg-teal-600',
        initials: 'JW',
        rating: 5,
        title: 'Battery life is unbelievable.',
        comment: 'Got over 30 hours with the case before needing a recharge. USB-C fast charging is super convenient.'
      },
      {
        id: 6,
        name: 'Elena Rostova',
        role: 'Verified Buyer',
        avatarBg: 'bg-purple-600',
        initials: 'ER',
        rating: 5,
        title: 'Sleek luxury design.',
        comment: 'Minimalist white finish looks high-end and elegant. Extremely comfortable for gym workouts and travel.'
      }
    ]
  ]

  const ratingBars = [
    { stars: 5, percentage: 92 },
    { stars: 4, percentage: 6 },
    { stars: 3, percentage: 1 },
    { stars: 2, percentage: 0.5 },
    { stars: 1, percentage: 0.5 },
  ]

  const handlePrev = () => {
    setActivePage((prev) => (prev === 0 ? reviewSets.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActivePage((prev) => (prev === reviewSets.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 lg:py-24 bg-[#F0F5FA] text-slate-900 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Header & Rating Summary Grid */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Header Info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest text-sky-700 uppercase bg-sky-50 px-3.5 py-1 rounded-full border border-sky-100">
                CUSTOMER TESTIMONIALS
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Loved by <br />
                Thousands
              </h2>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800">
                  4.9/5 <span className="font-normal text-slate-500">from 2,500+ reviews</span>
                </span>
              </div>
            </div>

            {/* Right Rating Breakdown Progress Bars */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Rating Breakdown
                </span>
                <span className="text-xs font-semibold text-sky-600">
                  98% Recommended
                </span>
              </div>

              {ratingBars.map((bar) => (
                <div key={bar.stars} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-600">
                  <div className="flex items-center gap-1 w-10 text-slate-700 font-semibold">
                    <span>{bar.stars}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  </div>
                  
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full" 
                      style={{ width: `${bar.percentage}%` }}
                    />
                  </div>

                  <span className="w-10 text-right font-mono text-slate-500 text-xs">
                    {bar.percentage}%
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Reviews Cards Section with Carousel Arrow Controls */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Featured Reviews
            </h3>

            {/* Left / Right Carousel Arrow Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none active:scale-95"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none active:scale-95"
                aria-label="Next reviews"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 3 Review Cards (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewSets[activePage].map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Review Title & Comment */}
                  <h4 className="text-base font-bold text-slate-900 tracking-tight">
                    "{review.title}"
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {review.comment}
                  </p>
                </div>

                {/* Author Info & Avatar */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${review.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-sm`}>
                    {review.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900">{review.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-sky-500" />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
