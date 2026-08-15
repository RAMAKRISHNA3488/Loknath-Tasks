import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ReviewsPage() {
  const [activePageIndex, setActivePageIndex] = useState(0)

  const reviewSets = [
    [
      {
        id: 1,
        name: 'Amit Verma',
        timeAgo: '2 days ago',
        avatarBg: 'bg-amber-500',
        initials: 'AV',
        rating: 5,
        comment: 'The sound quality is amazing! The bass is deep and the noise cancellation works like a charm.'
      },
      {
        id: 2,
        name: 'Sneha Kapoor',
        timeAgo: '1 week ago',
        avatarBg: 'bg-indigo-500',
        initials: 'SK',
        rating: 5,
        comment: 'Super comfortable and battery lasts forever. Perfect for my workouts and calls.'
      },
      {
        id: 3,
        name: 'Vikram Mehta',
        timeAgo: '2 weeks ago',
        avatarBg: 'bg-slate-900',
        initials: 'VM',
        rating: 5,
        comment: 'Best earbuds in this range. Stylish, reliable and worth every penny!'
      }
    ],
    [
      {
        id: 4,
        name: 'Alex Turner',
        timeAgo: '3 weeks ago',
        avatarBg: 'bg-sky-500',
        initials: 'AT',
        rating: 5,
        comment: 'Active noise cancellation is incredible! Sound clarity and bass depth rival over-ear studio headphones.'
      },
      {
        id: 5,
        name: 'Maya Chen',
        timeAgo: '1 month ago',
        avatarBg: 'bg-rose-500',
        initials: 'MC',
        rating: 5,
        comment: 'Lightweight ergonomic fit that never causes ear fatigue. Battery easily lasts through my full workday.'
      },
      {
        id: 6,
        name: 'David Rodriguez',
        timeAgo: '1 month ago',
        avatarBg: 'bg-emerald-600',
        initials: 'DR',
        rating: 5,
        comment: 'Studio-grade audio clarity and instant pairing. The charging case feels ultra-premium in the hand.'
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
    setActivePageIndex((prev) => (prev === 0 ? reviewSets.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActivePageIndex((prev) => (prev === reviewSets.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900 pt-2 pb-12 lg:pt-4 lg:pb-20 min-h-[85vh] flex items-center border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full space-y-10 lg:space-y-14">

        
        {/* SECTION 1 — TOP SPLIT HEADER & RATING BREAKDOWN CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Header Titles */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
              WHAT OUR CUSTOMERS SAY
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1527] tracking-tight leading-[1.12]">
              Real People.<br />
              Real Experiences.
            </h1>

            <p className="text-slate-500 text-base sm:text-lg font-normal leading-relaxed max-w-md pt-1">
              Trusted by thousands of happy listeners.
            </p>
          </div>

          {/* Right Rating Score & Breakdown White Card */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm border border-white/80">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Score Left Column */}
              <div className="sm:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-1.5 border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 sm:pr-6">
                <span className="text-5xl sm:text-6xl font-black text-[#0B1527] tracking-tight leading-none">
                  4.9
                </span>
                <div className="flex text-amber-400 gap-1 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400 pt-1">
                  2,500+ Reviews
                </span>
              </div>

              {/* Progress Bars Right Column */}
              <div className="sm:col-span-8 space-y-2.5">
                {ratingBars.map((bar) => (
                  <div key={bar.stars} className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-1 w-7 shrink-0">
                      <span>{bar.stars}</span>
                      <Star className="w-3 h-3 text-slate-400 fill-current" />
                    </div>

                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-sky-600 rounded-full transition-all duration-500" 
                        style={{ width: `${bar.percentage}%` }}
                      />
                    </div>

                    <span className="w-10 text-right font-mono text-slate-400 text-[11px]">
                      {bar.percentage}%
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* SECTION 2 — 3 CAROUSEL REVIEW CARDS WITH FLOATING SIDE ARROWS */}
        <div className="relative pt-2">
          
          {/* Side Floating Carousel Arrow - Left */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-700 shadow-lg border border-slate-200/80 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 transition-all focus:outline-none active:scale-95"
            aria-label="Previous reviews page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 3 Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-2">
            {reviewSets[activePageIndex].map((review) => (
              <div
                key={review.id}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 shadow-sm border border-white/80 space-y-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* User Profile Header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full ${review.avatarBg} text-white font-extrabold text-sm flex items-center justify-center shadow-sm shrink-0`}>
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        {review.name}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium">
                        {review.timeAgo}
                      </span>
                    </div>
                  </div>

                  {/* 5-Star Rating Row */}
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Side Floating Carousel Arrow - Right */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-700 shadow-lg border border-slate-200/80 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 transition-all focus:outline-none active:scale-95"
            aria-label="Next reviews page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

      </div>
    </div>
  )
}

