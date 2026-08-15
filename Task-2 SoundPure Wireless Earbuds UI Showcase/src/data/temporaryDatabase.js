/**
 * SoundPure Temporary Database Engine
 * Manages temporary storage of user data, sessions, cart, orders, addresses, payments, and audit logs.
 */

const STORAGE_KEYS = {
  SESSION_ID: 'soundpure_temp_session_id',
  ACTIVE_USER: 'soundpure_temp_active_user',
  REGISTERED_USERS: 'soundpure_temp_registered_users',
  CART: 'soundpure_temp_cart',
  PROMO: 'soundpure_temp_promo',
  ORDERS: 'soundpure_temp_orders',
  ADDRESSES: 'soundpure_temp_addresses',
  PAYMENTS: 'soundpure_temp_payments',
  WISHLIST: 'soundpure_temp_wishlist',
  LOGS: 'soundpure_temp_activity_logs'
}

// Generate or retrieve unique temporary session ID
export function getSessionId() {
  let sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID)
  if (!sessionId) {
    sessionId = `SESS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId)
  }
  return sessionId
}

// Initialize DB schema on website entry
export function initTemporaryDb() {
  getSessionId()
  if (!sessionStorage.getItem(STORAGE_KEYS.LOGS)) {
    logSessionActivity('Website Session Started', 'Initialized clean temporary session database.')
  }
}

// Session Activity Logging System
export function logSessionActivity(action, details = '') {
  try {
    const rawLogs = sessionStorage.getItem(STORAGE_KEYS.LOGS)
    const logs = rawLogs ? JSON.parse(rawLogs) : []
    const newLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action,
      details
    }
    const updatedLogs = [newLog, ...logs].slice(0, 50) // keep last 50 events
    sessionStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updatedLogs))
  } catch (err) {
    console.error('Error logging activity to temporary DB:', err)
  }
}

export function getSessionLogs() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.LOGS)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    return []
  }
}

// User Persistence Helpers
export function saveActiveUser(user) {
  if (user) {
    sessionStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(user))
    logSessionActivity('User Session Updated', `Active user: ${user.name} (${user.email})`)
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ACTIVE_USER)
    logSessionActivity('User Logged Out', 'Cleared active user session.')
  }
}

export function getActiveUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.ACTIVE_USER)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    return null
  }
}

export function saveRegisteredUsers(users) {
  sessionStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users))
}

export function getRegisteredUsers() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.REGISTERED_USERS)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    return []
  }
}

// Cart Persistence Helpers
export function saveCartData(cartItems, promoInfo = { promoCode: '', discountPercent: 0 }) {
  sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems))
  sessionStorage.setItem(STORAGE_KEYS.PROMO, JSON.stringify(promoInfo))
}

export function getCartData() {
  try {
    const rawCart = sessionStorage.getItem(STORAGE_KEYS.CART)
    const rawPromo = sessionStorage.getItem(STORAGE_KEYS.PROMO)
    return {
      cartItems: rawCart ? JSON.parse(rawCart) : null,
      promoInfo: rawPromo ? JSON.parse(rawPromo) : { promoCode: '', discountPercent: 0 }
    }
  } catch (err) {
    return { cartItems: null, promoInfo: { promoCode: '', discountPercent: 0 } }
  }
}

// Orders Persistence Helpers
export function saveOrdersData(orders) {
  sessionStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders))
}

export function getOrdersData() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.ORDERS)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    return []
  }
}

// Addresses Persistence Helpers
export function saveAddressesData(addresses) {
  sessionStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(addresses))
}

export function getAddressesData() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.ADDRESSES)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    return null
  }
}

// Payment Methods Persistence Helpers
export function savePaymentsData(payments) {
  sessionStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments))
}

export function getPaymentsData() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.PAYMENTS)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    return null
  }
}

// Wishlist Persistence Helpers
export function saveWishlistData(items) {
  sessionStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items))
}

export function getWishlistData() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.WISHLIST)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    return null
  }
}

// DB Summary & Stats
export function getDbSummary() {
  return {
    sessionId: getSessionId(),
    activeUser: getActiveUser(),
    registeredUsersCount: getRegisteredUsers().length,
    ordersCount: getOrdersData().length,
    logsCount: getSessionLogs().length,
    storageType: 'SessionStorage Temporary DB'
  }
}

// Clear Temporary DB
export function clearTemporaryDb() {
  sessionStorage.clear()
  initTemporaryDb()
}
