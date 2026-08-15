import React from 'react'
import ProductOverviewHero from '../components/ProductOverviewHero'
import Footer from '../components/Footer'

export default function ProductOverview() {
  return (
    <div className="w-full min-h-screen bg-[#F0F5FA] text-slate-900 flex flex-col justify-between">
      {/* Module 2: Product Overview Screen */}
      <main>
        <ProductOverviewHero />
      </main>
      <Footer />
    </div>
  )
}
