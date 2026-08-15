import React from 'react'
import FeaturesPage from '../components/FeaturesPage'
import Footer from '../components/Footer'

export default function Features() {
  return (
    <div className="w-full min-h-screen bg-[#EDF5FC] text-slate-900 flex flex-col justify-between">
      {/* Module 4: Features Screen */}
      <main className="w-full flex-grow flex items-center">
        <FeaturesPage />
      </main>
      <Footer />
    </div>
  )
}

