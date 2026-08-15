import React from 'react'
import AccountDashboardPage from '../components/AccountDashboardPage'
import Footer from '../components/Footer'

export default function Account() {
  return (
    <div className="w-full min-h-screen bg-[#F0F5FA] text-slate-900 flex flex-col justify-between">
      {/* Module 10: Account Dashboard Screen */}
      <main>
        <AccountDashboardPage />
      </main>
      <Footer />
    </div>
  )
}
