import React from 'react'
import Hero from '../components/Hero'
import FeatureStrip from '../components/FeatureStrip'
import ProductIntro from '../components/ProductIntro'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#EBF3FC] text-slate-900 flex flex-col justify-between">
      {/* Module 1: SoundPure Home UI Complete */}
      <main>
        <Hero />
        <FeatureStrip />
        <ProductIntro />
      </main>
      <Footer />
    </div>
  )
}



