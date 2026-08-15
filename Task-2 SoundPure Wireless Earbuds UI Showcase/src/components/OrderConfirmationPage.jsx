import React, { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { 
  CheckCircle2, 
  Package, 
  ShoppingBag, 
  Truck, 
  MapPin, 
  CreditCard, 
  ArrowRight,
  Calendar,
  Clock,
  Copy,
  X,
  ShieldCheck,
  Navigation
} from 'lucide-react'
import { useCart } from '../data/cartContext'
import productImg from '../assets/product_intro_case.png'

export default function OrderConfirmationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { lastOrder } = useCart()

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false)
  const [copyToast, setCopyToast] = useState(false)

  // Use location state if available, or fall back to lastOrder from context
  const order = location.state?.orderData || lastOrder

  const handleCopyTracking = () => {
    navigator.clipboard.writeText('FX-9842-1082-US')
    setCopyToast(true)
    setTimeout(() => setCopyToast(false), 2500)
  }

  if (!order) {
    return (
      <div className="w-full bg-[#F0F5FA] text-slate-900 py-16 sm:py-24">
        <div className="max-w-md mx-auto px-4 text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center mx-auto shadow-sm">
            <Package className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              No Recent Order Found
            </h2>
            <p className="text-slate-500 text-sm">
              You haven't placed an order recently or your session has expired.
            </p>
          </div>

          <Link
            to="/product"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 text-sky-400" />
          </Link>
        </div>
      </div>
    )
  }

  const items = order.items && order.items.length > 0 ? order.items : [
    {
      id: 'soundpure-earbuds-white',
      name: 'SoundPure Wireless Earbuds',
      color: 'Arctic White',
      price: 199.00,
      quantity: 1,
      image: productImg
    }
  ]

  return (
    <div className="w-full bg-[#F0F5FA] text-slate-900 py-10 lg:py-16 border-b border-slate-200/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Header & Success Badge */}
        <div className="text-center space-y-4">
          
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl mx-auto animate-in zoom-in duration-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-sm">
            <span>ORDER CONFIRMED</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Thank You for Your Order!
          </h1>

          <p className="text-slate-500 text-base sm:text-lg font-normal max-w-lg mx-auto">
            Your order has been successfully placed. We've sent a detailed receipt to <span className="font-semibold text-slate-800">{order.email}</span>.
          </p>

        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-8">
          
          {/* Header Specs Bar (Order #, Date, Statuses) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm">
            <div>
              <span className="block text-slate-400 font-semibold uppercase text-[11px] tracking-wider mb-1">
                Order Number
              </span>
              <span className="font-extrabold text-slate-900 font-mono text-sm sm:text-base">
                #{order.orderId}
              </span>
            </div>

            <div>
              <span className="block text-slate-400 font-semibold uppercase text-[11px] tracking-wider mb-1">
                Order Date
              </span>
              <span className="font-bold text-slate-800">
                {order.orderDate}
              </span>
            </div>

            <div>
              <span className="block text-slate-400 font-semibold uppercase text-[11px] tracking-wider mb-1">
                Payment Status
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-xs">
                {order.paymentStatus || 'Paid'}
              </span>
            </div>

            <div>
              <span className="block text-slate-400 font-semibold uppercase text-[11px] tracking-wider mb-1">
                Shipping Status
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 text-xs">
                {order.shippingStatus || 'Processing'}
              </span>
            </div>
          </div>

          {/* Delivery Information Compact Area */}
          <div className="bg-sky-50/80 border border-sky-100 rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm text-sky-900 font-medium">
            <div className="p-2 rounded-xl bg-white text-sky-600 shadow-sm flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold block text-slate-900">Estimated Delivery</span>
              <span className="text-slate-600">{order.estimatedDelivery || 'Arriving in 3–5 business days'} via Standard Express</span>
            </div>
          </div>

          {/* Product Items Summary List */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
              Ordered Items
            </h3>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-md" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500">
                        Color: <span className="font-semibold text-slate-800">{item.color}</span> • Qty: <span className="font-bold text-slate-900">{item.quantity}</span>
                      </p>
                      <p className="text-xs text-slate-400 font-mono pt-0.5">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>

                  <span className="text-base font-extrabold text-slate-900 font-mono">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Shipping Destination</span>
              </span>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium space-y-0.5">
                <p className="font-bold text-slate-900 text-base">{order.customerName}</p>
                <p>{order.address}</p>
                <p className="text-slate-500 pt-1">{order.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span>Payment Summary</span>
              </span>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium space-y-1">
                <p className="font-bold text-slate-900">{order.paymentMethod || 'Visa ending in ****4242'}</p>
                <div className="pt-2 border-t border-slate-200/60 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-900">${(order.subtotal || 199).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-sky-700">
                      <span>Discount:</span>
                      <span className="font-semibold">-${order.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-extrabold text-slate-900 pt-1 border-t border-slate-200 text-sm">
                    <span>Total Paid:</span>
                    <span className="font-mono text-base">${(order.total || 199).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs: Track Order & Continue Shopping */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsTrackModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Package className="w-5 h-5 text-sky-400" />
              <span>Track Your Order</span>
            </button>

            <Link
              to="/product"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-base font-semibold px-8 py-3.5 rounded-full border border-slate-300 shadow-sm transition-all"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </Link>
          </div>

        </div>

      </div>

      {/* LIVE PACKAGE TRACKING MODAL WINDOW */}
      {isTrackModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Live Package Tracking</h3>
                  <p className="text-xs text-slate-500 font-medium">Order #{order.orderId}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTrackModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Courier Tracking Ref Info */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Carrier & Tracking ID</span>
                <span className="font-mono font-extrabold text-slate-900 text-sm">FedEx Express • FX-9842-1082-US</span>
              </div>
              <button
                type="button"
                onClick={handleCopyTracking}
                className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-300 shadow-xs transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copyToast ? 'Copied ✓' : 'Copy'}</span>
              </button>
            </div>

            {/* Live Progress Stepper Timeline */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block">Shipping Progress</span>
              
              <div className="space-y-4 relative pl-6 border-l-2 border-slate-200">
                
                {/* Step 1: Order Confirmed */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Order Placed & Confirmed</p>
                    <p className="text-[11px] text-slate-500">August 15, 04:30 PM • SoundPure Facility</p>
                  </div>
                </div>

                {/* Step 2: Processing & Quality Check */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Packed & Quality Verified</p>
                    <p className="text-[11px] text-slate-500">August 15, 05:15 PM • Warehouse San Francisco, CA</p>
                  </div>
                </div>

                {/* Step 3: Dispatched & In Transit */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md animate-pulse">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-sky-700">In Transit with FedEx Air</p>
                    <p className="text-[11px] text-sky-600 font-medium">En Route to Regional Distribution Hub</p>
                  </div>
                </div>

                {/* Step 4: Out for Delivery */}
                <div className="relative opacity-50">
                  <div className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Out for Delivery</p>
                    <p className="text-[11px] text-slate-400">Estimated August 18, 09:00 AM</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Estimated Delivery Banner */}
            <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl flex items-center gap-3">
              <Navigation className="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-sky-900">Estimated Arrival Date</p>
                <p className="text-sm font-extrabold text-sky-700">Tuesday, August 18, 2026 (Before 08:00 PM)</p>
              </div>
            </div>

            {/* Modal Footer Close */}
            <button
              type="button"
              onClick={() => setIsTrackModalOpen(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3.5 rounded-full shadow-md transition-all cursor-pointer"
            >
              Close Live Tracking Window
            </button>

          </div>
        </div>
      )}

    </div>
  )
}
