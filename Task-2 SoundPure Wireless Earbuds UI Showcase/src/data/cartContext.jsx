import React, { createContext, useContext, useState, useEffect } from 'react'
import productImg from '../assets/product_intro_case.png'
import { 
  initTemporaryDb, 
  getSessionId, 
  logSessionActivity, 
  getSessionLogs, 
  saveActiveUser, 
  getActiveUser, 
  saveRegisteredUsers, 
  getRegisteredUsers, 
  saveCartData, 
  getCartData, 
  saveOrdersData, 
  getOrdersData, 
  getDbSummary, 
  clearTemporaryDb 
} from './temporaryDatabase'

const CartContext = createContext()

const initialCartItem = {
  id: 'soundpure-earbuds-white',
  name: 'SoundPure Wireless Earbuds',
  color: 'Arctic White',
  price: 199.00,
  quantity: 1,
  image: productImg
}

export function CartProvider({ children }) {
  // Initialize temporary database on application mount
  useEffect(() => {
    initTemporaryDb()
  }, [])

  const [cartItems, setCartItems] = useState(() => {
    const { cartItems: savedCart } = getCartData()
    if (!savedCart || !Array.isArray(savedCart)) return []
    return savedCart.filter(item => item.addedByUser === true)
  })

  const [user, setUser] = useState(() => getActiveUser())

  const [registeredUsers, setRegisteredUsers] = useState(() => getRegisteredUsers())

  const [lastOrder, setLastOrder] = useState(() => {
    const orders = getOrdersData()
    return orders.length > 0 ? orders[0] : null
  })

  const [orderHistory, setOrderHistory] = useState(() => getOrdersData())

  const [promoCode, setPromoCode] = useState(() => {
    const { promoInfo } = getCartData()
    return promoInfo?.promoCode || ''
  })

  const [discountPercent, setDiscountPercent] = useState(() => {
    const { promoInfo } = getCartData()
    return promoInfo?.discountPercent || 0
  })

  const [promoError, setPromoError] = useState('')
  const [promoSuccess, setPromoSuccess] = useState('')
  const [sessionLogs, setSessionLogs] = useState(() => getSessionLogs())

  // Sync states to temporary DB
  useEffect(() => {
    saveCartData(cartItems, { promoCode, discountPercent })
  }, [cartItems, promoCode, discountPercent])

  useEffect(() => {
    saveRegisteredUsers(registeredUsers)
  }, [registeredUsers])

  useEffect(() => {
    saveActiveUser(user)
  }, [user])

  useEffect(() => {
    saveOrdersData(orderHistory)
  }, [orderHistory])

  // Helper to refresh activity logs
  const refreshLogs = () => {
    setSessionLogs(getSessionLogs())
  }

  // Add Item to Cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.color === product.color)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (product.quantity || 1)
        }
        return updated
      }
      return [...prev, {
        id: product.id || 'soundpure-earbuds',
        name: product.name || 'SoundPure Wireless Earbuds',
        color: product.color || 'Arctic White',
        price: product.price || 199.00,
        quantity: product.quantity || 1,
        image: product.image || productImg,
        addedByUser: true
      }]
    })
    logSessionActivity('Added to Cart', `Added ${product.name} (${product.color || 'Arctic White'}) to cart`)
    refreshLogs()
  }

  // Register a new user
  const registerUser = ({ name, email, password }) => {
    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name.trim()
    const parts = cleanName.split(' ')
    const avatarInitials = parts.length > 1 
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase()
    
    const newUser = {
      isLoggedIn: true,
      name: cleanName,
      email: cleanEmail,
      password: password || '',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      avatarInitials
    }

    setRegisteredUsers((prev) => [...prev.filter(u => u.email !== cleanEmail), newUser])
    setUser(newUser)
    logSessionActivity('Account Registered', `Created profile for ${cleanName} (${cleanEmail})`)
    refreshLogs()
    return { success: true, user: newUser }
  }

  // Sign in existing user
  const signInUser = ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase()
    const found = registeredUsers.find(u => u.email === cleanEmail)
    
    if (found) {
      const activeUser = { ...found, isLoggedIn: true }
      setUser(activeUser)
      logSessionActivity('User Signed In', `Signed in as ${activeUser.name}`)
      refreshLogs()
      return { success: true, user: activeUser }
    } else {
      const nameFromEmail = cleanEmail.split('@')[0]
      const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      return registerUser({ name: formattedName, email: cleanEmail, password })
    }
  }

  const loginUser = ({ name, email }) => {
    return registerUser({ name, email })
  }

  const logoutUser = () => {
    if (user) {
      logSessionActivity('User Logged Out', `User ${user.name} logged out.`)
    }
    setUser(null)
    refreshLogs()
  }

  const updateUserProfile = (newDetails) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...newDetails }
      if (newDetails.name) {
        const parts = newDetails.name.trim().split(' ')
        updated.avatarInitials = parts.length > 1 
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : parts[0].slice(0, 2).toUpperCase()
      }
      logSessionActivity('Profile Updated', `Updated details for ${updated.name}`)
      return updated
    })
    refreshLogs()
  }

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return { ...item, quantity: newQty > 0 ? newQty : 1 }
        }
        return item
      })
    )
    logSessionActivity('Cart Quantity Modified', `Adjusted item quantity`)
    refreshLogs()
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    logSessionActivity('Cart Item Removed', `Removed item ${id}`)
    refreshLogs()
  }

  const applyPromo = (code) => {
    const rawCode = (code || '').trim()
    setPromoError('')
    setPromoSuccess('')

    if (!rawCode) {
      setPromoError('Please enter a valid promo code.')
      return
    }

    // Check if input contains lowercase letters
    if (/[a-z]/.test(rawCode)) {
      setPromoError('Promo codes must be entered in ALL CAPITAL LETTERS (e.g. SOUNDPURE20).')
      return
    }

    const cleanCode = rawCode.toUpperCase()

    if (cleanCode === 'SOUNDPURE20' || cleanCode === 'SOUNDPURE' || cleanCode === 'PROMO20') {
      setDiscountPercent(20)
      setPromoCode(cleanCode)
      setPromoSuccess('20% Discount applied successfully!')
      logSessionActivity('Promo Applied', `Applied 20% discount code: ${cleanCode}`)
    } else if (cleanCode === 'FREE') {
      setDiscountPercent(15)
      setPromoCode(cleanCode)
      setPromoSuccess('15% Special Discount applied!')
      logSessionActivity('Promo Applied', `Applied 15% discount code: ${cleanCode}`)
    } else {
      setPromoError('Invalid promo code. Enter code in CAPITAL LETTERS (e.g. SOUNDPURE20).')
    }
    refreshLogs()
  }

  const completeOrder = (orderData) => {
    setLastOrder(orderData)
    setOrderHistory((prev) => [orderData, ...prev])
    setCartItems([])
    setPromoCode('')
    setDiscountPercent(0)
    setPromoError('')
    setPromoSuccess('')
    logSessionActivity('Order Completed', `Placed order reference: ${orderData.orderId || 'SP-ORDER'}`)
    refreshLogs()
  }

  const updateOrderStatus = (orderId, newStatus, reasonNotes = '') => {
    setOrderHistory((prev) =>
      prev.map((ord) => {
        if (ord.orderId === orderId) {
          return {
            ...ord,
            shippingStatus: newStatus,
            cancelReason: newStatus.toLowerCase().includes('cancel') ? reasonNotes : ord.cancelReason,
            returnReason: newStatus.toLowerCase().includes('return') || newStatus.toLowerCase().includes('replace') ? reasonNotes : ord.returnReason
          }
        }
        return ord
      })
    )
    setLastOrder((prev) => {
      if (prev && prev.orderId === orderId) {
        return {
          ...prev,
          shippingStatus: newStatus,
          cancelReason: newStatus.toLowerCase().includes('cancel') ? reasonNotes : prev.cancelReason,
          returnReason: newStatus.toLowerCase().includes('return') || newStatus.toLowerCase().includes('replace') ? reasonNotes : prev.returnReason
        }
      }
      return prev
    })
    logSessionActivity('Order Status Updated', `Updated order #${orderId} status to ${newStatus}`)
    refreshLogs()
  }

  const resetCart = () => {
    setCartItems([])
    setPromoCode('')
    setDiscountPercent(0)
    setPromoError('')
    setPromoSuccess('')
    logSessionActivity('Cart Reset', 'Cleared cart items.')
    refreshLogs()
  }

  const resetTemporaryDatabase = () => {
    clearTemporaryDb()
    setCartItems([])
    setUser(null)
    setRegisteredUsers([])
    setLastOrder(null)
    setOrderHistory([])
    setPromoCode('')
    setDiscountPercent(0)
    setSessionLogs(getSessionLogs())
    logSessionActivity('Temporary Database Cleared', 'Reset all temporary session records.')
  }

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = sessionStorage.getItem('soundpure_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem('soundpure_wishlist', JSON.stringify(wishlistItems))
    } catch (e) {}
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev
      return [...prev, {
        id: product.id || 'soundpure-earbuds-white',
        name: product.name || 'SoundPure Wireless Earbuds',
        color: product.color || 'Arctic White',
        price: product.price || 199.00,
        inStock: true,
        image: product.image || productImg
      }]
    })
    logSessionActivity('Added to Wishlist', `Saved ${product.name} (${product.color || 'Arctic White'}) to wishlist`)
    refreshLogs()
  }

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
    logSessionActivity('Removed from Wishlist', `Removed item ${id} from wishlist`)
    refreshLogs()
  }

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id)
  }

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      return false
    } else {
      addToWishlist(product)
      return true
    }
  }

  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const saved = sessionStorage.getItem('soundpure_temp_shipping_address')
      return saved ? JSON.parse(saved) : {
        fullName: '',
        email: '',
        phone: '',
        street: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States'
      }
    } catch (e) {
      return {
        fullName: '',
        email: '',
        phone: '',
        street: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States'
      }
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem('soundpure_temp_shipping_address', JSON.stringify(shippingAddress))
    } catch (e) {}
  }, [shippingAddress])

  const updateShippingAddress = (newAddr) => {
    setShippingAddress((prev) => ({ ...prev, ...newAddr }))
    logSessionActivity('Shipping Address Updated', `Address: ${newAddr.street || ''}, ${newAddr.city || ''}`)
    refreshLogs()
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * discountPercent) / 100
  const total = Math.max(0, subtotal - discountAmount)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        applyPromo,
        promoCode,
        discountPercent,
        promoError,
        promoSuccess,
        subtotal,
        discountAmount,
        total,
        itemCount,
        resetCart,
        user,
        registerUser,
        signInUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        lastOrder,
        orderHistory,
        completeOrder,
        updateOrderStatus,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        shippingAddress,
        updateShippingAddress,
        sessionId: getSessionId(),
        sessionLogs,
        dbStats: getDbSummary(),
        resetTemporaryDatabase,
        logSessionActivity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    return {
      cartItems: [],
      addToCart: () => {},
      updateQuantity: () => {},
      removeItem: () => {},
      applyPromo: () => {},
      promoCode: '',
      discountPercent: 0,
      promoError: '',
      promoSuccess: '',
      subtotal: 0,
      discountAmount: 0,
      total: 0,
      itemCount: 0,
      resetCart: () => {},
      user: null,
      registerUser: () => {},
      signInUser: () => {},
      loginUser: () => {},
      logoutUser: () => {},
      updateUserProfile: () => {},
      lastOrder: null,
      orderHistory: [],
      completeOrder: () => {},
      updateOrderStatus: () => {},
      wishlistItems: [],
      addToWishlist: () => {},
      removeFromWishlist: () => {},
      isInWishlist: () => false,
      toggleWishlist: () => false,
      shippingAddress: {
        fullName: '',
        email: '',
        phone: '',
        street: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States'
      },
      updateShippingAddress: () => {},
      sessionId: 'SESS-TEMP',
      sessionLogs: [],
      dbStats: {},
      resetTemporaryDatabase: () => {},
      logSessionActivity: () => {}
    }
  }
  return context
}



