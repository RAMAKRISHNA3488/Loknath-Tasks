import React from 'react'
import NotFoundPage from '../components/NotFoundPage'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[#F0F5FA] text-slate-900 flex flex-col justify-between">
      {/* Module 12: 404 Page Not Found Screen */}
      <main className="flex-1 flex items-center">
        <NotFoundPage />
      </main>
      <Footer />
    </div>
  )
}
