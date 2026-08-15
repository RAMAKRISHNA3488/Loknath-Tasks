import React from 'react'
import CartPage from '../components/CartPage'
import Footer from '../components/Footer'

export default function Cart() {
  return (
    <div className="w-full min-h-screen bg-[#F0F5FA] text-slate-900 flex flex-col justify-between">
      {/* Module 7: Shopping Cart Screen */}
      <main>
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
