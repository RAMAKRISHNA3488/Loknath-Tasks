import React from 'react'
import CheckoutPage from '../components/CheckoutPage'
import Footer from '../components/Footer'

export default function Checkout() {
  return (
    <div className="w-full min-h-screen bg-[#F0F5FA] text-slate-900 flex flex-col justify-between">
      {/* Module 8: Secure Checkout Screen */}
      <main>
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  )
}
