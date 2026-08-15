import React, { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Cpu,
  Wifi,
  BatteryCharging,
  Droplets,
  Zap,
  Feather,
  Sparkles,
} from 'lucide-react'

import p1Img from '../Public/Images/p1.png'
import p2Img from '../Public/Images/p2.png'
import p3Img from '../Public/Images/p3.png'
import p4Img from '../Public/Images/p4.png'
import p5Img from '../Public/Images/p5.png'

const specifications = [
  { label: 'Driver Size', value: '10mm Dynamic Driver', icon: Cpu },
  { label: 'Bluetooth Version', value: '5.3', icon: Wifi },
  { label: 'Battery Life', value: 'Up to 30 Hours', icon: BatteryCharging },
  { label: 'Water Resistance', value: 'IPX5', icon: Droplets },
  { label: 'Charging Port', value: 'USB Type-C', icon: Zap },
  { label: 'Weight', value: '4.2g (Each Earbud)', icon: Feather },
]

const galleryImages = [
  { id: 'p1', src: p1Img, title: 'Exploded Driver Architecture', alt: 'SoundPure Exploded Driver Architecture Detail' },
  { id: 'p2', src: p2Img, title: 'Dual Wireless Earbuds', alt: 'SoundPure Dual Wireless Earbuds Photography' },
  { id: 'p3', src: p3Img, title: 'Charging Case Showcase', alt: 'SoundPure Wireless Earbuds Charging Case' },
  { id: 'p4', src: p4Img, title: 'Acoustic Mesh & Earbud Stem', alt: 'SoundPure Acoustic Mesh & Earbud Detail' },
  { id: 'p5', src: p5Img, title: 'Package & Accessories', alt: 'SoundPure Full Product Packaging & Accessories' },
]

export default function DetailsSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false)

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const activeImage = galleryImages[activeImageIndex]

  return (
    <div className="w-full bg-gradient-to-b from-[#F4F8FC] via-[#EDF5FC] to-[#E5F0FA] text-slate-900 py-12 sm:py-16 lg:py-20 min-h-[85vh] flex items-center border-b border-slate-200/60 overflow-hidden relative">
      {/* Background Ambient Glow Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-200/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full relative z-10">
        
        {/* Main 2-Column Grid with tight balanced spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: TITLE & SPECS CARD */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Header Titles */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
                PRODUCT DETAILS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1527] tracking-tight leading-[1.1]">
                Engineered<br />
                for Excellence
              </h1>

              <p className="text-slate-500 text-base sm:text-lg font-normal leading-relaxed max-w-lg">
                Every detail crafted to deliver an unmatched audio experience.
              </p>
            </div>

            {/* Product Specifications Glass Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/60 border border-white/80 space-y-3.5 w-full">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 pb-1 border-b border-slate-100">
                Technical Specifications
              </h2>

              <div className="space-y-2">
                {specifications.map((spec) => {
                  const IconComp = spec.icon
                  return (
                    <div 
                      key={spec.label} 
                      className="flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-slate-50/80 transition-all duration-200 group/row"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-sky-50 text-sky-600 group-hover/row:bg-sky-500 group-hover/row:text-white transition-colors duration-200 shadow-xs">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-500">{spec.label}</span>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-[#0B1527] text-right">
                        {spec.value}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: E-COMMERCE INTERACTIVE PRODUCT IMAGE GALLERY */}
          <div className="lg:col-span-6 space-y-5 flex flex-col items-center">
            
            {/* Main Stage Image Display Container */}
            <div className="relative w-full max-w-[540px] aspect-[4/3] flex items-center justify-center group select-none">
              
              {/* Left Floating Chevron Arrow */}
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 shadow-md hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                aria-label="Previous product image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Main Product Image Preview */}
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                onClick={() => setIsZoomModalOpen(true)}
                className="w-full h-full object-contain select-none cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
                loading="eager"
              />

              {/* Right Floating Chevron Arrow */}
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 shadow-md hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                aria-label="Next product image"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Top Right Zoom Lightbox Icon */}
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(true)}
                className="absolute top-2 right-2 z-20 p-1.5 rounded-xl bg-white/80 backdrop-blur-sm text-slate-600 hover:text-slate-900 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                aria-label="Zoom image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Image Caption & Counter Badge */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[11px] font-bold text-slate-700 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm">
                  {activeImage.title}
                </span>
                <span className="text-[11px] font-extrabold text-slate-600 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                  {activeImageIndex + 1} / {galleryImages.length}
                </span>
              </div>

            </div>

            {/* 5-Thumbnail Interactive Navigation Strip */}
            <div className="w-full max-w-[540px] flex items-center justify-center gap-2.5 sm:gap-4 overflow-x-auto pb-1 pt-1 scrollbar-none">
              {galleryImages.map((img, idx) => {
                const isActive = idx === activeImageIndex
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl p-1 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden ${
                      isActive
                        ? 'ring-2 ring-sky-500 opacity-100 scale-105 shadow-sm'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain select-none"
                    />
                  </button>
                )
              })}
            </div>

          </div>

        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX ZOOM MODAL */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center">
            
            <button
              type="button"
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-0 right-0 z-50 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all"
              aria-label="Close zoom modal"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-full max-h-[80vh] object-contain select-none drop-shadow-2xl"
            />

            <div className="pt-4 text-center text-white space-y-1">
              <h3 className="text-base font-bold">{activeImage.title}</h3>
              <p className="text-xs text-white/70">Image {activeImageIndex + 1} of {galleryImages.length}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
