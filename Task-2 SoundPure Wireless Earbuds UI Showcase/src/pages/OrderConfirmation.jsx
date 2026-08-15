import React from 'react'
import OrderConfirmationPage from '../components/OrderConfirmationPage'
import Footer from '../components/Footer'

export default function OrderConfirmation() {
  return (
    <div className="w-full min-h-screen bg-[#F0F5FA] text-slate-900 flex flex-col justify-between">
      {/* Module 9: Order Confirmation Screen */}
      <main>
        <OrderConfirmationPage />
      </main>
      <Footer />
    </div>
  )
}
