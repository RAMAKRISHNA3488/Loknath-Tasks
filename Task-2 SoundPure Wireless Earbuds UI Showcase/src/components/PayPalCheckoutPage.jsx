import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../data/cartContext'
import { ShieldCheck, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function PayPalCheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, total, subtotal, discountAmount, completeOrder, user, shippingAddress } = useCart()

  const [paypalEmail, setPaypalEmail] = useState(user?.email || '')
  const [paypalPassword, setPaypalPassword] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const displayTotal = total > 0 ? total : 199.00
  const displaySubtotal = subtotal > 0 ? subtotal : 199.00
  const items = cartItems.length > 0 ? cartItems : [
    {
      id: 'soundpure-earbuds-white',
      name: 'SoundPure Wireless Earbuds',
      color: 'Arctic White',
      price: 199.00,
      quantity: 1
    }
  ]

  const formattedAddress = shippingAddress?.street
    ? `${shippingAddress.street}${shippingAddress.apartment ? ', ' + shippingAddress.apartment : ''}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`
    : 'Verified PayPal Express Shipping Address'

  const handleLogin = (e) => {
    e.preventDefault()
    if (!paypalEmail.trim()) {
      setErrorMsg('Please enter your PayPal email.')
      return
    }
    setErrorMsg('')
    setIsLoggedIn(true)
  }

  const handlePayNow = () => {
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      const orderData = {
        orderId: 'SP-PP-' + Math.floor(100000 + Math.random() * 900000),
        orderDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: items,
        subtotal: displaySubtotal,
        discountAmount: discountAmount,
        total: displayTotal,
        customerName: shippingAddress?.fullName || user?.name || paypalEmail.split('@')[0] || 'PayPal Customer',
        email: paypalEmail || user?.email || 'customer@paypal.com',
        address: formattedAddress,
        paymentMethod: 'PayPal Express',
        paymentStatus: 'Paid via PayPal',
        shippingStatus: 'Processing',
        estimatedDelivery: 'Arriving in 3–5 business days'
      }

      completeOrder(orderData)
      navigate('/order-confirmation')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-900 flex flex-col justify-between font-sans">
      
      {/* Top PayPal Express Brand Header */}
      <header className="bg-[#003087] text-white py-4 px-6 sm:px-12 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold italic tracking-tight font-serif text-white">
            Pay<span className="text-[#0079C1]">Pal</span>
          </span>
          <span className="text-xs bg-[#0079C1] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Express Checkout
          </span>
        </div>

        <Link
          to="/checkout"
          className="text-xs text-blue-100 hover:text-white flex items-center gap-1 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & Return to SoundPure</span>
        </Link>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Order Summary */}
          <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Merchant</span>
              <h2 className="text-lg font-bold text-slate-900">SoundPure Audio Inc.</h2>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Order Items</span>
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm py-1 border-b border-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity} • Color: {item.color}</p>
                  </div>
                  <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="pt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${displaySubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-blue-600 font-semibold">
                    <span>Discount Applied</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#003087]">${displayTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>PayPal Buyer Protection covers your purchase up to full amount.</span>
            </div>
          </div>

          {/* Right Column: PayPal Login / Authorize Form */}
          <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-md space-y-6">
            {!isLoggedIn ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="text-center space-y-1 pb-2">
                  <span className="text-3xl font-extrabold italic text-[#003087]">
                    Pay<span className="text-[#0079C1]">Pal</span>
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 pt-2">Pay with PayPal</h3>
                  <p className="text-xs text-slate-500">Enter your PayPal account details to authorize payment.</p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email or Mobile Number</label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="paypal.user@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#0079C1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">PayPal Password</label>
                    <input
                      type="password"
                      value={paypalPassword}
                      onChange={(e) => setPaypalPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-[#0079C1] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0079C1] hover:bg-[#00457C] text-white font-bold py-3.5 rounded-full shadow-md transition-all cursor-pointer text-sm"
                >
                  Log In to PayPal Account
                </button>

                <div className="text-center text-xs text-slate-400">
                  <span>Protected by 256-bit SSL encryption</span>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">PayPal Account Authenticated</p>
                    <p className="text-xs text-emerald-700 font-medium">{paypalEmail}</p>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Payment Funding Source:</span>
                    <span className="font-bold text-slate-900">PayPal Balance / Linked Bank</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Address:</span>
                    <span className="font-bold text-slate-900">Verified PayPal Primary Address</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="w-full bg-[#0079C1] hover:bg-[#00457C] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer text-base flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Authorizing PayPal Payment...</span>
                  ) : (
                    <span>Agree & Complete Payment (${displayTotal.toFixed(2)})</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-700 font-semibold"
                >
                  Switch PayPal Account
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-400 space-y-1">
        <div className="flex justify-center items-center gap-4 text-slate-500 font-medium">
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <span>•</span>
          <Link to="/terms" className="hover:underline">Legal</Link>
          <span>•</span>
          <Link to="/support" className="hover:underline">Help</Link>
        </div>
        <p>© 1999–2026 PayPal Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}
