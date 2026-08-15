import React from 'react'
import { Link } from 'react-router-dom'
import { Sliders, Battery, Feather, Wifi } from 'lucide-react'

export default function FeatureStrip() {
  const features = [
    {
      id: 'sound',
      icon: Sliders,
      title: 'Immersive Sound',
      description: 'Rich, balanced, and everywhere you go',
      path: '/features'
    },
    {
      id: 'power',
      icon: Battery,
      title: 'All-Day Power',
      description: 'Up to 30 hours of battery life',
      path: '/features'
    },
    {
      id: 'comfort',
      icon: Feather,
      title: 'Comfort Fit',
      description: 'Lightweight design for all-day wear',
      path: '/features'
    },
    {
      id: 'connection',
      icon: Wifi,
      title: 'Seamless Connection',
      description: 'Instant pairing and stable performance',
      path: '/features'
    }
  ]


  return (
    <div className="relative z-30 -mt-10 sm:-mt-12 lg:-mt-14 px-6 sm:px-10 lg:px-14 xl:px-16 flex justify-center w-full max-w-[1536px] mx-auto">
      <div className="w-full bg-white/95 backdrop-blur-xl rounded-[24px] sm:rounded-[32px] py-3.5 px-4 sm:py-4 sm:px-6 lg:py-4.5 lg:px-8 shadow-xl border border-slate-100/90">

        
        {/* 4 Clickable Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link
                key={feature.id}
                to={feature.path}
                className="bg-slate-50/70 hover:bg-slate-100/90 rounded-xl sm:rounded-2xl py-2.5 px-3 sm:py-3 sm:px-4 transition-all duration-200 flex items-center gap-3 group hover:scale-[1.02] hover:shadow-md cursor-pointer focus:outline-none"
              >
                {/* Icon Badge */}
                <div className="inline-flex p-2.5 rounded-xl bg-sky-100/80 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-4.5 h-4.5" />
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-0.5 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600 tracking-tight truncate transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-tight font-normal line-clamp-1">
                    {feature.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}




