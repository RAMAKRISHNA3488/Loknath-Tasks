import React from 'react'
import SupportPage from '../components/SupportPage'
import Footer from '../components/Footer'

export default function Support() {
  return (
    <div className="w-full min-h-screen bg-[#EDF5FC] text-slate-900 flex flex-col justify-between">
      {/* Module 6: Support Screen */}
      <main className="w-full flex-grow">
        <SupportPage />
      </main>
      <Footer />
    </div>
  )
}

