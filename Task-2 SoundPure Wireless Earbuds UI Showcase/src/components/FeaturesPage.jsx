import React, { useState } from 'react'
import { 
  Volume2, 
  Hand, 
  Clock, 
  Mic, 
  Zap,
  Radio,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Sliders
} from 'lucide-react'
import product4Img from '../Public/Images/product5.png'

import { useCart } from '../data/cartContext'

const featureItems = [
  {
    id: 'anc',
    icon: Radio,
    title: 'Active Noise Cancellation',
    description: 'Block out distractions and immerse in your music.',
    metric: '-35dB Hybrid ANC',
    subtitle: 'Dual-feed forward & feedback microphones filter out external environmental noise in real-time.',
    highlights: [
      'Up to 35dB active noise attenuation',
      'Adaptive Ambient Sound pass-through mode',
      'Wind noise reduction algorithm'
    ]
  },
  {
    id: 'calls',
    icon: Volume2,
    title: 'Crystal Clear Calls',
    description: 'Dual mic technology for flawless conversations.',
    metric: 'Dual Beamforming Mics',
    subtitle: 'AI-powered ENC environmental noise cancellation keeps your voice crystal clear in noisy surroundings.',
    highlights: [
      'Dual MEMS digital microphones',
      'AI voice extraction technology',
      'HD voice call clarity certified'
    ]
  },
  {
    id: 'touch',
    icon: Hand,
    title: 'Touch Controls',
    description: 'Easy control with a simple touch.',
    metric: 'Smart Capacitive Sensor',
    subtitle: 'Intuitive tap gestures on each earbud stem let you control music playback, volume, and calls.',
    highlights: [
      'Single tap: Play / Pause / Answer Call',
      'Double tap: Next Track / End Call',
      'Press & Hold: Toggle ANC / Pass-through'
    ]
  },
  {
    id: 'latency',
    icon: Clock,
    title: 'Low Latency Mode',
    description: 'Perfect for gaming and video streaming.',
    metric: '45ms Ultra-Low Latency',
    subtitle: 'Synchronized audio-to-video delivery designed for competitive gaming and lag-free movie streaming.',
    highlights: [
      '45ms ultra-low latency gaming mode',
      'Zero audio lag during video playback',
      'Bluetooth 5.3 dual-channel transmission'
    ]
  },
  {
    id: 'assistant',
    icon: Mic,
    title: 'Voice Assistant',
    description: 'Access Siri or Google Assistant instantly.',
    metric: 'Instant Voice Wake-Up',
    subtitle: 'Hands-free voice access to Siri, Google Assistant, or Alexa with a simple press or voice prompt.',
    highlights: [
      'Supports Siri & Google Assistant',
      'Hands-free voice commands',
      'Instant weather, navigation & playback control'
    ]
  },
  {
    id: 'pairing',
    icon: Zap,
    title: 'Instant Pairing',
    description: 'Open the case and you\'re connected.',
    metric: '< 0.5s Fast Connect',
    subtitle: 'Open the charging case lid and your earbuds automatically pair with your phone or laptop in under a second.',
    highlights: [
      'Auto-connect on lid open',
      'Seamless multi-device switching',
      'Stable 15-meter wireless range'
    ]
  }
]

export default function FeaturesPage() {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null)
  const { logSessionActivity } = useCart()
  const [demoNotice, setDemoNotice] = useState('')

  const handleOpenFeature = (index) => {
    setSelectedFeatureIndex(index)
    if (logSessionActivity) {
      logSessionActivity('Feature Inspected', `Viewed detail window for: ${featureItems[index].title}`)
    }
  }

  const handlePrevFeature = () => {
    setSelectedFeatureIndex((prev) => (prev > 0 ? prev - 1 : featureItems.length - 1))
  }

  const handleNextFeature = () => {
    setSelectedFeatureIndex((prev) => (prev < featureItems.length - 1 ? prev + 1 : 0))
  }

  const handleTestFeature = (title) => {
    setDemoNotice(`Simulating live hardware test for ${title}... Active!`)
    setTimeout(() => setDemoNotice(''), 2500)
  }

  const activeFeature = selectedFeatureIndex !== null ? featureItems[selectedFeatureIndex] : null

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900 pt-2 pb-12 lg:pt-4 lg:pb-20 min-h-[85vh] flex items-center border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full">
        
        {/* Main Features Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Subtitle & product4.png Feature Card */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Header Content */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
                FEATURES
              </span>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1527] tracking-tight leading-[1.12]">
                Powerful Features.<br />
                Pure Experience.
              </h1>

              <p className="text-slate-500 text-base sm:text-lg font-normal leading-relaxed max-w-md pt-1">
                Advanced technology meets everyday convenience.
              </p>
            </div>

            {/* Product4 Image Showcase Card */}
            <div className="relative rounded-[28px] overflow-hidden shadow-sm border border-white/60 bg-white/50 w-full">
              <img
                src={product4Img}
                alt="SoundPure Wireless Earbuds Feature Product 4 Showcase"
                className="w-full h-auto object-cover rounded-[28px] select-none block"
                loading="eager"
              />
            </div>

          </div>


          {/* Right Column: 6 White Feature Cards Grid (2 cols x 3 rows) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-2 lg:pt-8">
            {featureItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenFeature(index)}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-7 shadow-sm border border-white/80 space-y-3 hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:scale-[1.01] active:scale-[0.99]"
                >
                  <div className="space-y-4">
                    {/* Icon Badge Container */}
                    <div className="inline-flex items-center justify-between w-full">
                      <div className="inline-flex p-3.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 shadow-sm group-hover:bg-sky-500 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-sky-500 group-hover:underline">
                        Explore Info &rarr;
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>

      {/* FEATURE DETAIL POPUP WINDOW MODAL */}
      {activeFeature && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header & Close Button */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Feature Specifications & Details
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Technical Specifications & Real-Time Performance
                </p>
              </div>


              <button
                type="button"
                onClick={() => setSelectedFeatureIndex(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Close detail window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>



            {/* ACTIVE FEATURE DETAIL CONTENT */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                    {React.createElement(activeFeature.icon, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {activeFeature.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium pt-0.5">
                      {activeFeature.description}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-bold text-xs">
                  {activeFeature.metric}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {activeFeature.subtitle}
                </p>
              </div>

              {/* Highlights Bullet List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                  Technical Specifications & Capabilities
                </h4>
                <div className="space-y-2">
                  {activeFeature.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-slate-400 font-medium">
                    Feature <strong>{selectedFeatureIndex + 1}</strong> of <strong>{featureItems.length}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedFeatureIndex(null)}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all"
                  >
                    Close Window
                  </button>
                </div>


            </div>

          </div>
        </div>
      )}

    </div>
  )
}


