import React from 'react'
import DetailsSection from '../components/DetailsSection'
import Footer from '../components/Footer'

export default function ProductDetails() {
  return (
    <div className="w-full min-h-screen bg-[#EDF5FC] text-slate-900 flex flex-col justify-between">
      {/* Module 3: Product Details Screen */}
      <main className="w-full flex-grow flex items-center">
        <DetailsSection />
      </main>
      <Footer />
    </div>
  )
}


