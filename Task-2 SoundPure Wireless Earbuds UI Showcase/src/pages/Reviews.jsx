import React from 'react'
import ReviewsPage from '../components/ReviewsPage'
import Footer from '../components/Footer'

export default function Reviews() {
  return (
    <div className="w-full min-h-screen bg-[#EDF5FC] text-slate-900 flex flex-col justify-between">
      {/* Module 5: Customer Reviews Screen */}
      <main className="w-full flex-grow flex items-center">
        <ReviewsPage />
      </main>
      <Footer />
    </div>
  )
}

