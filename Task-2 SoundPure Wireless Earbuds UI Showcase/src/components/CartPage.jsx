import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Tag,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  MapPin,
  X,
  Phone,
  Home
} from 'lucide-react'
import { useCart } from '../data/cartContext'

export default function CartPage() {
  const navigate = useNavigate()
  const [inputCode, setInputCode] = useState('')
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const {
    cartItems,
    updateQuantity,
    removeItem,
    applyPromo,
    promoCode,
    discountAmount,
    promoError,
    promoSuccess,
    subtotal,
    total,
    resetCart,
    user,
    shippingAddress,
    updateShippingAddress
  } = useCart()

  const [addrForm, setAddrForm] = useState({
    fullName: shippingAddress?.fullName || user?.name || '',
    phone: shippingAddress?.phone || '',
    street: shippingAddress?.street || '',
    apartment: shippingAddress?.apartment || '',
    city: shippingAddress?.city || '',
    state: shippingAddress?.state || '',
    zip: shippingAddress?.zip || ''
  })
  const [addrErrors, setAddrErrors] = useState({})

  useEffect(() => {
    if (user && user.name && !addrForm.fullName) {
      setAddrForm((prev) => ({ ...prev, fullName: user.name }))
    }
  }, [user])

  const handleApplyPromo = (e) => {
    e.preventDefault()
    applyPromo(inputCode)
  }

  const handleProceedToCheckout = () => {
    setIsAddressModalOpen(true)
  }

  const handleAddrChange = (e) => {
    const { name, value } = e.target
    setAddrForm((prev) => ({ ...prev, [name]: value }))
    if (addrErrors[name]) {
      setAddrErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!addrForm.fullName.trim()) newErrors.fullName = 'Full name is required.'
    if (!addrForm.phone.trim()) newErrors.phone = 'Phone number is required.'
    if (!addrForm.street.trim()) newErrors.street = 'Street address is required.'
    if (!addrForm.city.trim()) newErrors.city = 'City is required.'
    if (!addrForm.state.trim()) newErrors.state = 'State is required.'
    if (!addrForm.zip.trim()) newErrors.zip = 'ZIP code is required.'

    if (Object.keys(newErrors).length > 0) {
      setAddrErrors(newErrors)
      return
    }

    updateShippingAddress({
      fullName: addrForm.fullName.trim(),
      phone: addrForm.phone.trim(),
      street: addrForm.street.trim(),
      apartment: addrForm.apartment.trim(),
      city: addrForm.city.trim(),
      state: addrForm.state.trim(),
      zip: addrForm.zip.trim(),
      email: user?.email || shippingAddress?.email || ''
    })

    setIsAddressModalOpen(false)
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#F0F5FA] text-slate-900 py-16 sm:py-24">
        <div className="max-w-md mx-auto px-4 text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Your Cart is Currently Empty
            </h2>
            <p className="text-slate-500 text-sm">
              Explore our flagship SoundPure wireless earbuds and add them to your cart.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/product"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </Link>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#F0F5FA] text-slate-900 py-10 lg:py-16 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT SECTION: Cart Items & Promo Code Input */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section Eyebrow & Title */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-sm">
                <span>YOUR CART</span>
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Review Your Order
              </h1>

              <p className="text-slate-500 text-sm sm:text-base font-normal">
                Almost there! Complete your purchase.
              </p>
            </div>

            {/* Cart Product Cards List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-5"
                >
                  {/* Thumbnail & Product Details */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Color: <span className="text-slate-800 font-semibold">{item.color}</span>
                      </p>
                      <div className="text-base sm:text-lg font-extrabold text-slate-900 pt-0.5">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls & Delete Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    
                    {/* Plus / Minus Quantity Selector */}
                    <div className="flex items-center bg-slate-100 rounded-full border border-slate-200 p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-white text-slate-700 hover:text-slate-900 shadow-sm flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-10 text-center text-sm font-bold text-slate-900">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-white text-slate-700 hover:text-slate-900 shadow-sm flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete Item Trash Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-2.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
                      aria-label="Remove item from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Section */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-3">
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-sky-600" />
                <span>Have a promo code?</span>
              </label>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. SOUNDPURE20)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold uppercase tracking-wider font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-sm transition-all"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{promoSuccess}</span>
                </div>
              )}

              {promoError && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 pt-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{promoError}</span>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SECTION: Order Summary Card & Checkout Action */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-6">
              
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              {/* Price Breakdown Rows */}
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sky-700 font-medium">
                    <span>Promo Discount ({promoCode})</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Tax</span>
                  <span className="font-medium text-slate-800">$0.00</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-200/80 pt-4 flex justify-between items-baseline">
                <span className="text-base font-extrabold text-slate-900">Total</span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Primary Action CTA Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5 text-sky-400" />
              </button>

              {/* Security Indicator */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Secure Checkout • 256-Bit SSL Encrypted</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* DELIVERY & SHIPPING ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Delivery Address</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Where Should We Deliver?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Please enter your shipping address to proceed with your order.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Address Form */}
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={addrForm.fullName}
                  onChange={handleAddrChange}
                  placeholder="e.g. Alex Johnson"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                    addrErrors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                  }`}
                />
                {addrErrors.fullName && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{addrErrors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={addrForm.phone}
                  onChange={handleAddrChange}
                  placeholder="e.g. +1 (555) 234-5678"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                    addrErrors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                  }`}
                />
                {addrErrors.phone && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{addrErrors.phone}</span>
                  </p>
                )}
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1 flex items-center gap-1">
                  <Home className="w-3 h-3 text-slate-400" />
                  <span>Street Address *</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={addrForm.street}
                  onChange={handleAddrChange}
                  placeholder="e.g. 742 Evergreen Terrace"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                    addrErrors.street ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                  }`}
                />
                {addrErrors.street && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{addrErrors.street}</span>
                  </p>
                )}
              </div>

              {/* Apartment / Suite (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Apartment, Suite, Unit <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={addrForm.apartment}
                  onChange={handleAddrChange}
                  placeholder="e.g. Apt 4B"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={addrForm.city}
                    onChange={handleAddrChange}
                    placeholder="City"
                    className={`w-full px-3 py-2 rounded-xl bg-slate-50 border text-xs font-medium text-slate-900 transition-all focus:outline-none ${
                      addrErrors.city ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                    }`}
                  />
                  {addrErrors.city && <p className="text-[10px] text-rose-600 mt-0.5 font-semibold">{addrErrors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={addrForm.state}
                    onChange={handleAddrChange}
                    placeholder="State"
                    className={`w-full px-3 py-2 rounded-xl bg-slate-50 border text-xs font-medium text-slate-900 transition-all focus:outline-none ${
                      addrErrors.state ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                    }`}
                  />
                  {addrErrors.state && <p className="text-[10px] text-rose-600 mt-0.5 font-semibold">{addrErrors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">ZIP *</label>
                  <input
                    type="text"
                    name="zip"
                    value={addrForm.zip}
                    onChange={handleAddrChange}
                    placeholder="ZIP Code"
                    className={`w-full px-3 py-2 rounded-xl bg-slate-50 border text-xs font-medium text-slate-900 transition-all focus:outline-none ${
                      addrErrors.zip ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                    }`}
                  />
                  {addrErrors.zip && <p className="text-[10px] text-rose-600 mt-0.5 font-semibold">{addrErrors.zip}</p>}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Address & Proceed</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}
