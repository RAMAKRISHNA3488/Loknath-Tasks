import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  ShoppingBag, 
  AlertCircle, 
  CheckCircle2, 
  LogIn, 
  UserPlus,
  MapPin,
  Edit2
} from 'lucide-react'
import { useCart } from '../data/cartContext'
import productImg from '../assets/product_intro_case.png'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { 
    cartItems, 
    subtotal, 
    discountAmount, 
    total, 
    completeOrder, 
    resetCart, 
    user, 
    signInUser, 
    registerUser,
    shippingAddress,
    updateShippingAddress
  } = useCart()

  useEffect(() => {
    if (cartItems.length === 0) {
      resetCart()
    }
  }, [cartItems])

  // Stepped Checkout: 1 = Shipping Information, 2 = Payment Method
  const [checkoutStep, setCheckoutStep] = useState(1)

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: shippingAddress?.fullName || user?.name || '',
    email: shippingAddress?.email || user?.email || '',
    address: shippingAddress?.street || shippingAddress?.address || '',
    city: shippingAddress?.city || '',
    state: shippingAddress?.state || '',
    zip: shippingAddress?.zip || '',
    cardName: shippingAddress?.fullName || user?.name || '',
    cardNumber: '',
    expDate: '',
    cvc: ''
  })

  // Pre-fill user data when logged in or when shippingAddress is updated
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullName: prev.fullName || shippingAddress?.fullName || user?.name || '',
      email: prev.email || shippingAddress?.email || user?.email || '',
      address: prev.address || shippingAddress?.street || shippingAddress?.address || '',
      city: prev.city || shippingAddress?.city || '',
      state: prev.state || shippingAddress?.state || '',
      zip: prev.zip || shippingAddress?.zip || '',
      cardName: prev.cardName || shippingAddress?.fullName || user?.name || ''
    }))
  }, [user, shippingAddress])

  // Auth Gate State (when not logged in)
  const [authTab, setAuthTab] = useState('signin') // 'signin' | 'register'
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authName, setAuthName] = useState('')
  const [authError, setAuthError] = useState('')

  // Selected Payment Method: 'card' | 'paypal' | 'apple'
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    setAuthError('')

    if (authTab === 'signin') {
      if (!authEmail.trim() || !authPassword.trim()) {
        setAuthError('Please enter your email and password.')
        return
      }
      const res = signInUser({ email: authEmail, password: authPassword })
      if (!res.success) {
        setAuthError('Failed to sign in. Please check your credentials.')
      }
    } else {
      if (!authName.trim() || !authEmail.trim() || !authPassword.trim()) {
        setAuthError('Please fill out all required fields.')
        return
      }
      const res = registerUser({ name: authName, email: authEmail, password: authPassword })
      if (!res.success) {
        setAuthError('Failed to register. Please try again.')
      }
    }
  }

  // Step 1 Shipping Validation
  const validateShipping = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (!formData.address.trim()) newErrors.address = 'Street address is required.'
    if (!formData.city.trim()) newErrors.city = 'City is required.'
    if (!formData.state.trim()) newErrors.state = 'State is required.'
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Step 2 Payment Validation
  const validatePayment = () => {
    const newErrors = {}

    if (paymentMethod === 'card') {
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required.'
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required.'
      } else if (formData.cardNumber.replace(/\s/g, '').length < 12) {
        newErrors.cardNumber = 'Enter a valid card number.'
      }
      if (!formData.expDate.trim()) newErrors.expDate = 'Expiration date is required.'
      if (!formData.cvc.trim()) newErrors.cvc = 'CVC security code is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Continue from Step 1 to Step 2 (Selecting Payment Methods)
  const handleContinueToPayment = (e) => {
    if (e) e.preventDefault()
    if (!validateShipping()) return

    updateShippingAddress({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      street: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      zip: formData.zip.trim()
    })

    setCheckoutStep(2)

    setTimeout(() => {
      const paymentEl = document.getElementById('payment-step-container')
      if (paymentEl) {
        paymentEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 150)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (checkoutStep === 1) {
      handleContinueToPayment(e)
      return
    }

    if (!validateShipping() || !validatePayment()) {
      return
    }

    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      const orderData = {
        orderId: 'SP-2026-' + Math.floor(100000 + Math.random() * 900000),
        orderDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: cartItems.length > 0 ? cartItems : [
          {
            id: 'soundpure-earbuds-white',
            name: 'SoundPure Wireless Earbuds',
            color: 'Arctic White',
            price: 199.00,
            quantity: 1,
            image: productImg
          }
        ],
        subtotal: subtotal,
        discountAmount: discountAmount,
        total: total,
        customerName: formData.fullName || user?.name || '',
        email: formData.email || user?.email || '',
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        paymentMethod: paymentMethod === 'card' ? 'Visa ending in ****4242' : paymentMethod === 'paypal' ? 'PayPal Express' : 'Apple Pay',
        paymentStatus: 'Paid',
        shippingStatus: 'Processing',
        estimatedDelivery: 'Arriving in 3–5 business days'
      }

      completeOrder(orderData)
      navigate('/order-confirmation', { state: { orderData } })
    }, 1200)
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
              Your Cart is Empty
            </h2>
            <p className="text-slate-500 text-sm">
              Please add SoundPure earbuds to your cart before proceeding to checkout.
            </p>
          </div>

          <Link
            to="/product"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4 text-sky-400" />
          </Link>
        </div>
      </div>
    )
  }

  // IF USER IS NOT LOGGED IN -> REQUIRE LOGIN OR REGISTRATION BEFORE BUYING
  if (!user || !user.isLoggedIn) {
    return (
      <div className="w-full bg-[#F0F5FA] text-slate-900 py-12 sm:py-20 border-b border-slate-200/60">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xl space-y-6">
            
            {/* Header Badge & Title */}
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-7 h-7" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Account Required</span>
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Please Sign In or Register
              </h2>

              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                You must be logged in to your SoundPure account to purchase items and complete checkout.
              </p>
            </div>

            {/* Auth Mode Toggle Tabs (Sign In / Register) */}
            <div className="flex bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => { setAuthTab('signin'); setAuthError('') }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  authTab === 'signin'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('register'); setAuthError('') }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  authTab === 'register'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </button>
            </div>

            {/* Error Notice */}
            {authError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authTab === 'register' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{authTab === 'signin' ? 'Sign In & Continue to Checkout' : 'Register & Continue to Checkout'}</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </form>

            {/* Quick Demo Account Option */}
            <div className="pt-2 border-t border-slate-100 text-center space-y-3">
              <p className="text-xs text-slate-400 font-medium">Or test instantly with 1-click Demo Account:</p>
              <button
                type="button"
                onClick={() => signInUser({ email: 'customer@soundpure.com', password: 'demo' })}
                className="w-full py-2.5 px-4 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Instant Demo Login (Customer)</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#F0F5FA] text-slate-900 py-10 lg:py-16 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title Area with Logged-In User Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-sm">
              <span>SECURE CHECKOUT</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Complete Your Purchase
            </h1>

            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Review your information and securely complete your order.
            </p>
          </div>

          {/* Logged in badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Logged in as {user.name} ({user.email})</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT SECTION: Stepped Checkout (1. Shipping Info -> 2. Payment Method) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* CARD 1: Shipping Information */}
              <div className={`bg-white rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 transition-all duration-300 ${
                checkoutStep === 1 ? 'border-sky-300 ring-2 ring-sky-500/20' : 'border-slate-200/90'
              }`}>
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                      checkoutStep > 1 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-900 text-white'
                    }`}>
                      {checkoutStep > 1 ? '✓' : '1'}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      Shipping Information
                    </h2>
                  </div>

                  {checkoutStep === 2 && (
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Address</span>
                    </button>
                  )}
                </div>

                {/* Confirmed Summary View when in Step 2 */}
                {checkoutStep === 2 ? (
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <p className="font-bold text-slate-900">{formData.fullName} • <span className="text-slate-600 font-medium">{formData.email}</span></p>
                      <p className="text-slate-700">{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
                      <p className="text-[11px] font-bold text-emerald-600 pt-0.5">Standard Express Delivery • Free Shipping</p>
                    </div>
                  </div>
                ) : (
                  /* Step 1 Editable Input Fields */
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                          errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                          errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Street Address */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                          errors.address ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                        }`}
                      />
                      {errors.address && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.address}</span>
                        </p>
                      )}
                    </div>

                    {/* City, State, ZIP */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                            errors.city ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                          }`}
                        />
                        {errors.city && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Select state"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                            errors.state ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                          }`}
                        />
                        {errors.state && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.state}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="Enter ZIP code"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                            errors.zip ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                          }`}
                        />
                        {errors.zip && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.zip}</p>}
                      </div>
                    </div>

                    {/* Step 1 Submit Button to Proceed to Payment Methods */}
                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handleContinueToPayment}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Proceed to Payment Methods</span>
                        <ArrowRight className="w-4 h-4 text-sky-400" />
                      </button>
                    </div>

                  </div>
                )}
              </div>

              {/* CARD 2: Payment Method */}
              <div 
                id="payment-step-container"
                className={`bg-white rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6 transition-all duration-300 ${
                  checkoutStep === 2 ? 'border-sky-300 ring-2 ring-sky-500/20' : 'border-slate-200/90 opacity-90'
                }`}
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                    checkoutStep === 2 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    2
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Select Payment Method
                  </h2>
                </div>

                {/* If still in Step 1, show locked prompt */}
                {checkoutStep === 1 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 text-center space-y-3">
                    <CreditCard className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-medium text-slate-500 max-w-sm mx-auto">
                      Fill out your Shipping Information in Step 1 above, then click <strong>"Proceed to Payment Methods"</strong> to select your payment option.
                    </p>
                    <button
                      type="button"
                      onClick={handleContinueToPayment}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline cursor-pointer"
                    >
                      <span>Continue with Shipping Info</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  /* Step 2 Payment Selection & Input Fields */
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Payment Selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-sky-600 bg-sky-50/60 ring-1 ring-sky-500 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                        }`}
                      >
                        <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-sky-600' : 'text-slate-500'}`} />
                        <span className="text-sm font-bold text-slate-900">Credit / Debit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate('/checkout/paypal')}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left flex flex-col justify-between space-y-2 transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none cursor-pointer group"
                      >
                        <span className="text-sm font-extrabold italic text-blue-700 group-hover:scale-105 transition-transform">PayPal</span>
                        <span className="text-sm font-bold text-slate-900">PayPal Express</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate('/checkout/apple-pay')}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-slate-800 hover:bg-slate-100 text-left flex flex-col justify-between space-y-2 transition-all focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:outline-none cursor-pointer group"
                      >
                        <span className="text-sm font-extrabold text-slate-900 group-hover:scale-105 transition-transform"> Pay</span>
                        <span className="text-sm font-bold text-slate-900">Apple Pay</span>
                      </button>
                    </div>

                    {/* Credit / Debit Card Inputs */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4 pt-2 border-t border-slate-100">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            placeholder="Name on card"
                            className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                              errors.cardName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                            }`}
                          />
                          {errors.cardName && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.cardName}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                              errors.cardNumber ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                            }`}
                          />
                          {errors.cardNumber && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                              Expiration Date *
                            </label>
                            <input
                              type="text"
                              name="expDate"
                              value={formData.expDate}
                              onChange={handleInputChange}
                              placeholder="MM / YY"
                              maxLength={5}
                              className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                                errors.expDate ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                              }`}
                            />
                            {errors.expDate && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.expDate}</p>}
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                              CVC / CVV *
                            </label>
                            <input
                              type="password"
                              name="cvc"
                              value={formData.cvc}
                              onChange={handleInputChange}
                              placeholder="CVC"
                              maxLength={4}
                              className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm font-medium text-slate-900 transition-all focus:outline-none ${
                                errors.cvc ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-200 focus:ring-2 focus:ring-sky-500'
                              }`}
                            />
                            {errors.cvc && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.cvc}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-800 leading-relaxed font-medium">
                        You will be securely redirected to PayPal to complete your payment authorization.
                      </div>
                    )}

                    {paymentMethod === 'apple' && (
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
                        You will be prompted to authenticate with Apple Pay Touch ID / Face ID.
                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>

            {/* RIGHT SECTION: Sticky Order Summary Card & Action CTA */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-6">
                
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                  Order Summary
                </h2>

                {/* Items List */}
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 p-1 flex-shrink-0 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                        <p className="text-xs text-slate-500">
                          Qty: <span className="font-semibold text-slate-800">{item.quantity}</span> • {item.color}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-sm text-slate-600 pt-3 border-t border-slate-100">
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
                      <span>Discount</span>
                      <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Estimated Tax</span>
                    <span className="font-medium text-slate-800">$0.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-slate-200/80 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-slate-900">Total</span>
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Dynamic Submit / Continue Button */}
                {checkoutStep === 1 ? (
                  <button
                    type="button"
                    onClick={handleContinueToPayment}
                    className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none cursor-pointer"
                  >
                    <span>Proceed to Payment Methods</span>
                    <ArrowRight className="w-5 h-5 text-sky-400" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-base font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none cursor-pointer"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Order...</span>
                      </div>
                    ) : (
                      <>
                        <span>Pay Now (${total.toFixed(2)})</span>
                        <ArrowRight className="w-5 h-5 text-sky-400" />
                      </>
                    )}
                  </button>
                )}

                {/* Security Indicator */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                  <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Secure & Encrypted Checkout</span>
                    <span>Your payment information is protected with 256-bit SSL encryption.</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  )
}
