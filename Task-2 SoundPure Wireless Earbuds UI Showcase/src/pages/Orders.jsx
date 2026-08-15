import React from 'react'
import OrdersPage from '../components/OrdersPage'
import Footer from '../components/Footer'

export default function Orders() {
  return (
    <div className="w-full min-h-screen bg-[#F0F5FA] text-slate-900 flex flex-col justify-between">
      {/* Module 11: Orders Screen */}
      <main>
        <OrdersPage />
      </main>
      <Footer />
    </div>
  )
}
