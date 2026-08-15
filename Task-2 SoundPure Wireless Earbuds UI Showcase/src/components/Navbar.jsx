import React, { useState } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Headphones, 
  Menu, 
  X, 
  ShoppingBag, 
  ShoppingCart,
  User, 
  LayoutDashboard, 
  Package, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  CheckCircle2,
  LogIn,
  AlertCircle
} from 'lucide-react'
import { useCart } from '../data/cartContext'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState('signin') // 'signin' or 'register'
  const [toastMessage, setToastMessage] = useState('')

  const [inputName, setInputName] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const { itemCount, user, registerUser, signInUser, logoutUser, cartItems, resetCart } = useCart()
  const isHomePage = location.pathname === '/'

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 3500)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Details', path: '/product/details' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Support', path: '/support' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
    setIsAccountMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsAccountMenuOpen(false)
  }

  const handleBuyNow = () => {
    closeMobileMenu()
    navigate('/product')
  }

  const handleSignInSubmit = (e) => {
    e.preventDefault()
    if (!inputEmail.trim()) return

    const res = signInUser({ email: inputEmail, password: inputPassword })
    setIsSignInModalOpen(false)
    setIsAccountMenuOpen(false)
    setInputPassword('')
    showToast(`Authentication Successful: Welcome back, ${res.user.name}.`)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!inputName.trim() || !inputEmail.trim()) return

    const res = registerUser({ name: inputName, email: inputEmail, password: inputPassword })
    setIsSignInModalOpen(false)
    setIsAccountMenuOpen(false)
    setInputName('')
    setInputPassword('')
    showToast(`Registration Complete: Welcome to SoundPure, ${res.user.name}!`)
  }

  const handleLogoutClick = () => {
    logoutUser()
    setIsAccountMenuOpen(false)
    showToast('Signed Out: Your session has ended safely.')
  }

  const handleProtectedNavigation = (path, name) => {
    setIsAccountMenuOpen(false)
    closeMobileMenu()
    if (!user) {
      showToast(`Authentication Required: Please Sign In or Register to access your ${name}.`)
      setIsSignInModalOpen(true)
    } else {
      navigate(path)
    }
  }



  return (
    <>
      {/* Toast Notification Banner Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700/80 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button 
            type="button" 
            onClick={() => setToastMessage('')}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sign In & Register Modal Popup */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6 text-slate-900">
            {/* Header & Close */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">User Authentication</h3>
                  <p className="text-xs text-slate-500 font-normal">Sign in or create a new user account</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSignInModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2-Option Tabs: Sign In / Register */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthTab('signin')}
                className={`py-2.5 rounded-xl transition-all ${
                  authTab === 'signin'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('register')}
                className={`py-2.5 rounded-xl transition-all ${
                  authTab === 'register'
                    ? 'bg-white text-sky-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Register (New User)
              </button>
            </div>

            {/* TAB 1: SIGN IN */}
            {authTab === 'signin' ? (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john.doe@example.com"
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
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all active:scale-[0.98] mt-2"
                >
                  Sign In to Account
                </button>
              </form>
            ) : (
              /* TAB 2: REGISTER NEW USER */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
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
                  className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all active:scale-[0.98] mt-2"
                >
                  Create & Register Account
                </button>
              </form>
            )}
          </div>
        </div>
      )}


      <header 
        className={
          isHomePage 
            ? "absolute top-0 left-0 right-0 z-50 w-full bg-transparent text-white pointer-events-auto transition-all duration-300"
            : (location.pathname === '/product/details' || location.pathname === '/features' || location.pathname === '/reviews' || location.pathname === '/support')
            ? "sticky top-0 z-50 w-full bg-[#EDF5FC] text-slate-900 transition-all duration-300"


            : "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300"
        }
      >

        <nav 
          className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 h-20 flex items-center justify-between"
          aria-label="SoundPure Navigation Menu"
        >



          {/* Brand Logo */}
          <Link 
            to="/" 
            onClick={closeMobileMenu}
            className="flex items-center gap-2 group focus:outline-none"
          >
            {isHomePage ? (
              <span className="text-2xl font-extrabold tracking-tight text-white">
                SoundPure
              </span>
            ) : (
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Sound<span className="text-sky-600">Pure</span>
              </span>
            )}

          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={true}
                className={({ isActive }) =>
                  isHomePage
                    ? `px-3 py-1.5 text-sm font-medium transition-all rounded-full ${
                        isActive
                          ? 'text-white font-bold bg-white/20 shadow-sm'
                          : 'text-white/90 hover:text-white'
                      }`
                    : `px-1 py-1 text-sm font-medium transition-all relative ${
                        isActive
                          ? 'text-slate-900 font-semibold border-b-2 border-sky-500'
                          : 'text-slate-600 hover:text-slate-900'
                      }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons (Buy Now, Cart & Account) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button 
              type="button"
              onClick={handleBuyNow}
              className={
                isHomePage
                  ? "inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                  : "inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              }
            >
              <span>Buy Now</span>
            </button>

            {/* Shopping Cart Icon Button */}
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className={
                isHomePage
                  ? "relative p-2.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
                  : "relative p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center focus:outline-none cursor-pointer"
              }
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Account Icon & Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                className={
                  isHomePage
                    ? "p-2.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 focus:outline-none"
                    : "p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 focus:outline-none"
                }
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>


                {/* Account Dropdown Menu */}
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 z-50 text-slate-900 animate-in fade-in duration-200">
                    {/* User Info Header */}
                    <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                      {user ? (
                        <>
                          <p className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-0.5">Signed In As</p>
                          <p className="text-sm font-extrabold text-slate-900 truncate">{user.name}</p>
                          <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">Guest User</p>
                          <p className="text-sm font-extrabold text-slate-900">Not Signed In</p>
                          <button
                            type="button"
                            onClick={() => {
                              setIsAccountMenuOpen(false)
                              setIsSignInModalOpen(true)
                            }}
                            className="mt-2 w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold py-2 rounded-xl transition-all"
                          >
                            <LogIn className="w-3.5 h-3.5" />
                            <span>Sign In / Register</span>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Account Links */}
                    <div className="space-y-0.5 py-1">
                      <button
                        type="button"
                        onClick={() => handleProtectedNavigation('/account', 'Account Dashboard')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors text-left"
                      >
                        <LayoutDashboard className="w-4 h-4 text-sky-600" />
                        <span>Account Dashboard</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleProtectedNavigation('/orders', 'Orders')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors text-left"
                      >
                        <Package className="w-4 h-4 text-sky-600" />
                        <span>My Orders</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleProtectedNavigation('/cart', 'Shopping Cart')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors text-left"
                      >
                        <ShoppingBag className="w-4 h-4 text-sky-600" />
                        <span>View Cart ({itemCount})</span>
                      </button>


                      <Link
                        to="/support"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 text-sky-600" />
                        <span>Help & Support</span>
                      </Link>
                    </div>

                    {/* Footer Sign Out */}
                    {user && (
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          type="button"
                          onClick={handleLogoutClick}
                          className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
          </div>




          {/* Mobile Actions: Cart, User & Hamburger Toggle */}
          <div className="flex lg:hidden items-center space-x-1 sm:space-x-2">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className={isHomePage ? "relative p-2.5 rounded-xl text-white cursor-pointer" : "relative p-2.5 rounded-xl text-slate-700 cursor-pointer"}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-sky-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (!user) {
                  setIsSignInModalOpen(true)
                } else {
                  navigate('/account')
                }
              }}
              className={isHomePage ? "p-2.5 rounded-xl text-white" : "p-2.5 rounded-xl text-slate-700"}
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={toggleMobileMenu}

              className={isHomePage ? "p-2.5 rounded-xl text-white" : "p-2.5 rounded-xl text-slate-700"}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Dropdown Menu */}
        {isMobileMenuOpen && (
          <div 
            className={
              isHomePage
                ? "lg:hidden bg-slate-900/95 backdrop-blur-xl text-white px-4 pt-3 pb-6 space-y-3 shadow-2xl border-b border-white/10"
                : "lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl"
            }
            role="region"
            aria-label="Mobile Navigation Menu"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={true}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isHomePage
                      ? `px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                          isActive ? 'bg-white/20 text-white font-bold' : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`
                      : `px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                          isActive ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`
                  }
                >
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleProtectedNavigation('/account', 'Account Dashboard')}
                className={
                  isHomePage
                    ? "w-full flex items-center justify-center gap-2 bg-white/15 text-white text-base font-semibold py-2.5 rounded-xl border border-white/20 transition-all"
                    : "w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-900 text-base font-semibold py-2.5 rounded-xl border border-slate-200 transition-all"
                }
              >
                <User className="w-4 h-4" />
                <span>{user ? `Account (${user.name})` : 'Sign In / Account'}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className={
                  isHomePage
                    ? "w-full flex items-center justify-center gap-2 bg-white text-slate-900 text-base font-semibold py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
                    : "w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-base font-semibold py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
                }
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}



