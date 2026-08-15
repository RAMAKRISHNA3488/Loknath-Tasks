import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  CreditCard, 
  Heart, 
  LogOut, 
  Sparkles, 
  ArrowRight, 
  User, 
  Mail, 
  Calendar, 
  Edit3, 
  CheckCircle2, 
  ChevronRight,
  ShoppingBag,
  Plus,
  Trash2,
  Check,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Database,
  Activity,
  RefreshCw
} from 'lucide-react'
import { useCart } from '../data/cartContext'

export default function AccountDashboardPage() {
  const navigate = useNavigate()
  const { 
    user, 
    registerUser, 
    signInUser, 
    logoutUser, 
    updateUserProfile, 
    orderHistory, 
    lastOrder,
    wishlistItems,
    removeFromWishlist,
    addToCart
  } = useCart()
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'orders' | 'addresses' | 'payment' | 'wishlist' | 'tempdb'
  const [authMode, setAuthMode] = useState('signin')

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editName, setEditName] = useState(user?.name || '')
  const [editEmail, setEditEmail] = useState(user?.email || '')
  
  // Auth Form State
  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  // Notifications State
  const [saveSuccess, setSaveSuccess] = useState('')
  const [logoutNotice, setLogoutNotice] = useState(false)

  // Addresses State (Empty initially until user adds an address)
  const [addresses, setAddresses] = useState([])
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false)
  const [newStreet, setNewStreet] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newState, setNewState] = useState('')
  const [newZip, setNewZip] = useState('')
  const [newPhone, setNewPhone] = useState('')

  // Payment Methods State (Empty initially until user adds a card)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false)
  const [newCardName, setNewCardName] = useState('')
  const [newCardNumber, setNewCardNumber] = useState('')
  const [newCardExpiry, setNewCardExpiry] = useState('')

  // Combined Order History
  const orders = orderHistory.length > 0 ? orderHistory : (lastOrder ? [lastOrder] : [])

  const sidebarNavItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'payment', name: 'Payment Methods', icon: CreditCard },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
  ]


  const handleLogout = () => {
    logoutUser()
    setLogoutNotice(true)
    setTimeout(() => setLogoutNotice(false), 3000)
  }

  const handleProfileSave = (e) => {
    e.preventDefault()
    updateUserProfile({ name: editName, email: editEmail })
    setIsEditingProfile(false)
    setSaveSuccess('Profile details saved successfully!')
    setTimeout(() => setSaveSuccess(''), 2500)
  }

  const handleInlineSignIn = (e) => {
    e.preventDefault()
    if (!inputEmail.trim()) return
    signInUser({ email: inputEmail, password: inputPassword })
  }

  const handleInlineRegister = (e) => {
    e.preventDefault()
    if (!inputName.trim() || !inputEmail.trim()) return
    registerUser({ name: inputName, email: inputEmail, password: inputPassword })
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    if (!newStreet.trim() || !newCity.trim() || !newZip.trim()) return
    const newAddr = {
      id: `addr-${Date.now()}`,
      title: 'Saved Address',
      name: user?.name || 'User',
      street: newStreet.trim(),
      city: newCity.trim(),
      state: newState.trim() || 'CA',
      zip: newZip.trim(),
      country: 'United States',
      phone: newPhone.trim() || '+1 (555) 000-0000',
      isDefault: addresses.length === 0
    }
    setAddresses((prev) => [...prev, newAddr])
    setNewStreet('')
    setNewCity('')
    setNewState('')
    setNewZip('')
    setNewPhone('')
    setIsAddAddressOpen(false)
    setSaveSuccess('Address added successfully!')
    setTimeout(() => setSaveSuccess(''), 2500)
  }

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
    setSaveSuccess('Address removed.')
    setTimeout(() => setSaveSuccess(''), 2000)
  }

  const handleAddPayment = (e) => {
    e.preventDefault()
    if (!newCardNumber.trim() || !newCardName.trim()) return
    const rawNumber = newCardNumber.replace(/\s+/g, '')
    const newPay = {
      id: `pay-${Date.now()}`,
      brand: rawNumber.startsWith('4') ? 'Visa' : (rawNumber.startsWith('5') ? 'Mastercard' : 'Credit Card'),
      last4: rawNumber.slice(-4) || '0000',
      expiry: newCardExpiry.trim() || '12/28',
      cardholder: newCardName.trim(),
      isDefault: paymentMethods.length === 0
    }
    setPaymentMethods((prev) => [...prev, newPay])
    setNewCardName('')
    setNewCardNumber('')
    setNewCardExpiry('')
    setIsAddPaymentOpen(false)
    setSaveSuccess('Payment method added!')
    setTimeout(() => setSaveSuccess(''), 2500)
  }

  const handleDeletePayment = (id) => {
    setPaymentMethods((prev) => prev.filter((p) => p.id !== id))
    setSaveSuccess('Payment method removed.')
    setTimeout(() => setSaveSuccess(''), 2000)
  }

  const handleRemoveWishlist = (id) => {
    removeFromWishlist(id)
    setSaveSuccess('Item removed from Wishlist.')
    setTimeout(() => setSaveSuccess(''), 2000)
  }

  const handleAddToCartWishlist = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      color: item.color || 'Arctic White',
      price: item.price || 199.00,
      quantity: 1,
      image: item.image
    })
    setSaveSuccess(`Added ${item.name} to Cart!`)
    setTimeout(() => setSaveSuccess(''), 2500)
  }

  if (!user) {
    return (
      <div className="w-full bg-[#F0F5FA] text-slate-900 py-12 sm:py-20 border-b border-slate-200/60 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-6 text-slate-900">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto font-bold mb-3">
                <User className="w-7 h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Account Access</h2>
              <p className="text-xs sm:text-sm text-slate-500">Sign in to an existing account or register a new user.</p>
            </div>

            {/* 2-Option Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`py-2.5 rounded-xl transition-all ${
                  authMode === 'signin'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`py-2.5 rounded-xl transition-all ${
                  authMode === 'register'
                    ? 'bg-white text-sky-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Register (New User)
              </button>
            </div>

            {authMode === 'signin' ? (
              <form onSubmit={handleInlineSignIn} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all active:scale-[0.98] mt-2"
                >
                  Sign In to Dashboard
                </button>
              </form>
            ) : (
              <form onSubmit={handleInlineRegister} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Create Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-md transition-all active:scale-[0.98] mt-2"
                >
                  Create & Register Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900 py-10 lg:py-16 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Global Toast Alert if present */}
        {saveSuccess && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700/80 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{saveSuccess}</span>
          </div>
        )}

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDEBAR COLUMN — TITLE & FLOATING NAV */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Header Titles */}
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider text-sky-600 uppercase">
                MY ACCOUNT
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Welcome Back,<br />
                <span>{user.name}</span>
              </h1>

              <p className="text-slate-500 text-sm font-normal">
                Manage your orders and profile.
              </p>
            </div>

            {/* Navigation List (Floating Menu Items matching Img 2 & Img 3) */}
            <nav className="space-y-2 max-w-xs" aria-label="Account Navigation">
              {sidebarNavItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 text-left ${
                      isActive
                        ? 'bg-white text-sky-600 font-bold shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </button>
                )
              })}

              {/* Log Out Option */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-semibold text-slate-600 hover:text-rose-600 hover:bg-white/50 transition-all duration-200 text-left"
              >
                <LogOut className="w-4 h-4 text-slate-500" />
                <span>Log Out</span>
              </button>
            </nav>

            {logoutNotice && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-semibold animate-in fade-in duration-200 max-w-xs">
                Logged out successfully. You can sign in anytime.
              </div>
            )}
          </div>

          {/* RIGHT CONTENT COLUMN — DYNAMIC TAB CARDS */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <>
                {/* CARD 1 — RECENT ORDERS */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border border-white/60">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    Recent Orders
                  </h2>

                  {orders.length === 0 ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-slate-500">No recent orders found.</p>
                      <Link
                        to="/product"
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all"
                      >
                        <span>Start Shopping</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord, idx) => (
                        <div 
                          key={ord.orderId || idx}
                          className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm pt-2 border-b border-slate-100 last:border-0 pb-3"
                        >
                          <span className="font-mono font-bold text-slate-900 min-w-[120px]">
                            {ord.orderId}
                          </span>

                          <span className="text-slate-500 font-medium min-w-[100px]">
                            {ord.orderDate}
                          </span>

                          <span className="font-semibold text-slate-900 min-w-[80px]">
                            ${ord.total ? Number(ord.total).toFixed(2) : '0.00'}
                          </span>

                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-700">
                            {ord.status || ord.shippingStatus || 'Processing'}
                          </span>

                          <button
                            type="button"
                            onClick={() => setActiveTab('orders')}
                            className="inline-flex items-center gap-1 bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-bold px-4 py-1.5 rounded-full transition-all cursor-pointer"
                          >
                            <span>View</span>
                            <span>→</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CARD 2 — ACCOUNT DETAILS */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border border-white/60">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      Account Details
                    </h2>

                    {!isEditingProfile && (
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 bg-sky-100/70 hover:bg-sky-100 px-4 py-1.5 rounded-full transition-all"
                      >
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  {isEditingProfile ? (
                    <form onSubmit={handleProfileSave} className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4 pt-1 max-w-lg">
                      <div className="grid grid-cols-12 text-sm">
                        <span className="col-span-4 text-slate-500 font-medium">Name</span>
                        <span className="col-span-8 text-slate-900 font-medium">{user.name}</span>
                      </div>

                      <div className="grid grid-cols-12 text-sm">
                        <span className="col-span-4 text-slate-500 font-medium">Email</span>
                        <span className="col-span-8 text-slate-900 font-medium">{user.email}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* TAB 2: ORDERS */}
            {activeTab === 'orders' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border border-white/60">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <Package className="w-5 h-5 text-sky-600" />
                    <span>My Order History</span>
                  </h2>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {orders.length} Total Orders
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="py-12 text-center space-y-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 p-6">
                    <Package className="w-10 h-10 text-slate-300 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">No Orders Placed Yet</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                        Your order history is empty. Once you place an order, your purchase details and tracking will appear here.
                      </p>
                    </div>
                    <Link
                      to="/product"
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all"
                    >
                      <ShoppingBag className="w-4 h-4 text-sky-400" />
                      <span>Start Shopping</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord, idx) => (
                      <div 
                        key={ord.orderId || idx}
                        className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4 hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm border-b border-slate-200/60 pb-3">
                          <div>
                            <span className="text-slate-400 font-bold uppercase block text-[10px]">Order Reference</span>
                            <span className="font-mono font-bold text-slate-900">{ord.orderId}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase block text-[10px]">Placed On</span>
                            <span className="font-medium text-slate-700">{ord.orderDate}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-bold uppercase block text-[10px]">Total Amount</span>
                            <span className="font-extrabold text-slate-900">${ord.total ? Number(ord.total).toFixed(2) : '0.00'}</span>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                              {ord.status || ord.shippingStatus || 'Processing'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <p className="text-xs text-slate-600 font-medium">
                            Includes: SoundPure Wireless Earbuds & Express Delivery
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              const reorderItem = ord.items && ord.items.length > 0 ? ord.items[0] : {
                                id: 'soundpure-earbuds-white',
                                name: 'SoundPure Wireless Earbuds',
                                color: 'Arctic White',
                                price: 199.00
                              }
                              addToCart({
                                id: reorderItem.id || 'soundpure-earbuds-white',
                                name: reorderItem.name || 'SoundPure Wireless Earbuds',
                                color: reorderItem.color || 'Arctic White',
                                price: reorderItem.price || 199.00,
                                quantity: 1,
                                image: reorderItem.image
                              })
                              setSaveSuccess(`Re-ordered! Added ${reorderItem.name} to cart.`)
                              setTimeout(() => {
                                setSaveSuccess('')
                                navigate('/cart')
                              }, 1200)
                            }}
                            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Buy Again</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border border-white/60">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sky-600" />
                    <span>My Saved Addresses</span>
                  </h2>

                  <button
                    type="button"
                    onClick={() => setIsAddAddressOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {/* Add Address Form Accordion */}
                {isAddAddressOpen && (
                  <form onSubmit={handleAddAddress} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-xs font-extrabold uppercase text-sky-600 tracking-wider">New Shipping Address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Street Address *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 789 Market Street"
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. San Francisco"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">State / Province</label>
                        <input
                          type="text"
                          placeholder="CA"
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Zip / Postal Code</label>
                        <input
                          type="text"
                          placeholder="94107"
                          value={newZip}
                          onChange={(e) => setNewZip(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddAddressOpen(false)}
                        className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid or Empty State */}
                {addresses.length === 0 ? (
                  <div className="py-12 text-center space-y-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 p-6">
                    <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">No Saved Addresses</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                        You haven't saved any delivery addresses yet. Click below to add an address when required.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddAddressOpen(true)}
                      className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div 
                        key={addr.id}
                        className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 relative flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">{addr.title}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-900">{addr.name}</p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {addr.street}<br />
                            {addr.city}, {addr.state} {addr.zip}<br />
                            {addr.country}
                          </p>
                          <p className="text-xs text-slate-500 font-mono flex items-center gap-1.5 pt-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{addr.phone}</span>
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/60 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            aria-label="Delete Address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: PAYMENT METHODS */}
            {activeTab === 'payment' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border border-white/60">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sky-600" />
                    <span>Saved Payment Methods</span>
                  </h2>

                  <button
                    type="button"
                    onClick={() => setIsAddPaymentOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Payment Method</span>
                  </button>
                </div>

                {/* Add Payment Form Accordion */}
                {isAddPaymentOpen && (
                  <form onSubmit={handleAddPayment} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-xs font-extrabold uppercase text-sky-600 tracking-wider">New Credit Card Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Name on card"
                          value={newCardName}
                          onChange={(e) => setNewCardName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          placeholder="•••• •••• •••• 4242"
                          value={newCardNumber}
                          onChange={(e) => setNewCardNumber(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={newCardExpiry}
                          onChange={(e) => setNewCardExpiry(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddPaymentOpen(false)}
                        className="px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md"
                      >
                        Save Payment Method
                      </button>
                    </div>
                  </form>
                )}

                {/* Cards Grid or Empty State */}
                {paymentMethods.length === 0 ? (
                  <div className="py-12 text-center space-y-3 bg-slate-50/80 rounded-2xl border border-slate-200/80 p-6">
                    <CreditCard className="w-10 h-10 text-slate-300 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">No Saved Payment Methods</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                        You haven't saved any payment cards yet. Click below to add a card when required.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddPaymentOpen(true)}
                      className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Payment Method</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentMethods.map((pay) => (
                      <div 
                        key={pay.id}
                        className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4 relative flex flex-col justify-between shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-extrabold tracking-wider">{pay.brand}</span>
                          {pay.isDefault && (
                            <span className="text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                              Primary
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 py-2">
                          <p className="font-mono text-base tracking-widest text-slate-200">•••• •••• •••• {pay.last4}</p>
                          <div className="flex justify-between items-end text-xs text-slate-400">
                            <span>Cardholder: <strong className="text-white block font-medium">{pay.cardholder}</strong></span>
                            <span>Expires: <strong className="text-white font-mono block">{pay.expiry}</strong></span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-700 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeletePayment(pay.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-white/10 rounded-xl transition-colors text-xs flex items-center gap-1 font-semibold cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 border border-white/60">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <span>My Saved Wishlist</span>
                  </h2>

                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {wishlistItems.length} Items
                  </span>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <Heart className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500 font-medium">Your wishlist is currently empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div 
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-contain bg-white rounded-xl p-2 border border-slate-100 shadow-sm shrink-0" 
                          />
                          <div className="space-y-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{item.name}</h4>
                            <p className="text-sm font-extrabold text-slate-900">${item.price.toFixed(2)}</p>
                            <span className="inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">In Stock</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                          <button
                            type="button"
                            onClick={() => handleRemoveWishlist(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-xl transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAddToCartWishlist(item)}
                            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm transition-all"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    ))}

                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}



