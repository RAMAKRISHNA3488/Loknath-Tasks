import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../data/cartContext'
import { CheckCircle2, ArrowLeft, Smartphone, ShieldCheck } from 'lucide-react'

export default function ApplePayCheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, total, subtotal, discountAmount, completeOrder, user, shippingAddress } = useCart()

  const [isProcessing, setIsProcessing] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)

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
    : 'Apple Pay Verified Wallet Address'

  const handleApplePayAuthorize = () => {
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setIsAuthorized(true)

      setTimeout(() => {
        const orderData = {
          orderId: 'SP-AP-' + Math.floor(100000 + Math.random() * 900000),
          orderDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          items: items,
          subtotal: displaySubtotal,
          discountAmount: discountAmount,
          total: displayTotal,
          customerName: shippingAddress?.fullName || user?.name || 'Apple Pay Customer',
          email: user?.email || 'applepay.user@apple.com',
          address: formattedAddress,
          paymentMethod: 'Apple Pay',
          paymentStatus: 'Paid via Apple Pay',
          shippingStatus: 'Processing',
          estimatedDelivery: 'Arriving in 3–5 business days'
        }

        completeOrder(orderData)
        navigate('/order-confirmation')
      }, 1000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between font-sans">
      
      {/* Top Header */}
      <header className="border-b border-slate-800 py-4 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white font-sans">
             Pay
          </span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest">
            Express Sheet
          </span>
        </div>

        <Link
          to="/checkout"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel & Return</span>
        </Link>
      </header>

      {/* Center Apple Pay Card Container */}
      <div className="flex-1 max-w-md mx-auto w-full px-4 py-12 flex flex-col justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Header Icon */}
          <div className="text-center space-y-2 pb-2 border-b border-slate-800">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto shadow-inner text-white">
              <span className="text-3xl font-bold"></span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Apple Pay</h2>
            <p className="text-xs text-slate-400">SoundPure Audio Express Authorization</p>
          </div>

          {/* Items Summary */}
          <div className="space-y-3 text-xs bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between font-medium text-slate-300">
              <span>SoundPure Wireless Earbuds</span>
              <span className="font-bold text-white">${displaySubtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-sky-400 font-medium">
                <span>Promo Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Shipping</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
              <span>Total Payment</span>
              <span className="text-sky-400">${displayTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Wallet Card Choice */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Payment Card</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500 rounded-sm shadow-xs" />
                <span className="font-bold text-white text-sm">Apple Card (•••• 8821)</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                Default
              </span>
            </div>
          </div>

          {/* Biometric Trigger Button */}
          {!isAuthorized ? (
            <button
              type="button"
              onClick={handleApplePayAuthorize}
              disabled={isProcessing}
              className="w-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold py-4 rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3 group active:scale-[0.98]"
            >
              {isProcessing ? (
                <span>Scanning Face ID / Touch ID...</span>
              ) : (
                <>
                  <Smartphone className="w-5 h-5 text-slate-900 group-hover:scale-110 transition-transform" />
                  <span className="text-base">Double Click / Touch ID to Pay</span>
                </>
              )}
            </button>
          ) : (
            <div className="p-4 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold rounded-2xl text-center flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Apple Pay Payment Done! Redirecting...</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Secure Biometric Token Encryption</span>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-600">
        <p>Apple Pay is a registered trademark of Apple Inc.</p>
      </footer>
    </div>
  )
}
