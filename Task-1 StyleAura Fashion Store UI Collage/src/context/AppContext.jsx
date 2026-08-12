import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { orderService } from '../services/orderService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Hydrate initial state from sessionStorage / localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = sessionStorage.getItem('styleaura_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = sessionStorage.getItem('styleaura_wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem('styleaura_user');
      return savedUser ? JSON.parse(savedUser) : { isAuthenticated: true, name: 'Raga Loknath', email: 'ragaloknath@gmail.com', id: 'usr_101' };
    } catch {
      return { isAuthenticated: true, name: 'Raga Loknath', email: 'ragaloknath@gmail.com', id: 'usr_101' };
    }
  });

  // User Profile data store
  const [userData, setUserData] = useState(() => storageService.getUserData(user));

  // User Orders State (retrieved per user from orderService)
  const currentUserId = user?.id || user?.email || user?.name || 'usr_guest';
  const [orders, setOrders] = useState(() => orderService.getOrdersByUserId(currentUserId));

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state to storage
  useEffect(() => {
    try {
      sessionStorage.setItem('styleaura_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Session storage error:', err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      sessionStorage.setItem('styleaura_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error('Session storage error:', err);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      sessionStorage.setItem('styleaura_user', JSON.stringify(user));
      const loadedData = storageService.getUserData(user);
      setUserData(loadedData);
      
      // Update orders for current user ID
      const uid = user?.id || user?.email || user?.name || 'usr_guest';
      const userOrders = orderService.getOrdersByUserId(uid);
      setOrders(userOrders);
    } catch (err) {
      console.error('Session storage error:', err);
    }
  }, [user]);

  const updateAndSaveUserData = (updater) => {
    setUserData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      storageService.saveUserData(user, next);
      return next;
    });
  };

  // Helper Toast notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart actions
  const addToCart = (product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === product.size && item.color === product.color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += product.quantity || 1;
        return updated;
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    triggerToast(`Added "${product.title || product.name}" to cart!`);
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.color === color)));
    triggerToast('Item removed from cart');
  };

  const updateCartQuantity = (id, size, color, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size && item.color === color) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('styleaura_cart');
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        triggerToast('Removed from Wishlist');
        return prev.filter((p) => p.id !== product.id);
      }
      triggerToast('Saved to Wishlist');
      return [...prev, product];
    });
  };

  // Auth actions
  const loginUser = (userDataInput) => {
    const uid = userDataInput.id || userDataInput.email || userDataInput.name || 'usr_101';
    const updated = { isAuthenticated: true, id: uid, ...userDataInput };
    setUser(updated);
    triggerToast(`Welcome back, ${userDataInput.name || 'Trendsetter'}!`);
  };

  const logoutUser = () => {
    setUser({ isAuthenticated: false, name: '', email: '', id: '' });
    sessionStorage.removeItem('styleaura_user');
    setOrders([]);
    triggerToast('Logged out successfully');
  };

  // Order Placement Action
  const placeOrder = (checkoutDetails) => {
    if (!cart || cart.length === 0) {
      triggerToast('Your cart is empty!');
      return null;
    }

    const uid = user?.id || user?.email || user?.name || 'usr_guest';
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 50 || subtotal === 0 ? 0.0 : 15.0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const orderPayload = {
      userId: uid,
      orderDate: new Date().toISOString(),
      status: 'Processing',
      items: cart.map((item) => ({
        productId: item.id,
        title: item.title || item.name,
        name: item.title || item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size || 'M',
        color: item.color || 'Standard',
      })),
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress: checkoutDetails.shippingAddress || {
        fullName: checkoutDetails.fullName,
        email: checkoutDetails.email,
        phone: checkoutDetails.phone,
        address: checkoutDetails.address,
        city: checkoutDetails.city,
        zipCode: checkoutDetails.zipCode,
        country: checkoutDetails.country || 'United States',
      },
      paymentMethod: checkoutDetails.paymentMethod || 'Credit Card',
    };

    const createdOrder = orderService.createOrder(orderPayload);
    
    // Update local reactive state
    const userOrders = orderService.getOrdersByUserId(uid);
    setOrders(userOrders);

    // Update profile data orders list
    updateAndSaveUserData((prev) => ({
      ...prev,
      orders: [createdOrder, ...(prev.orders || [])],
    }));

    // Clear cart after successful placement
    clearCart();
    triggerToast(`Order #${createdOrder.id} placed successfully!`);
    return createdOrder;
  };

  // "Buy Again" Action
  const buyAgain = (order) => {
    if (!order || !order.items || order.items.length === 0) return;
    
    order.items.forEach((item) => {
      addToCart({
        id: item.productId || item.id,
        title: item.title || item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity || 1,
        size: item.size || 'M',
        color: item.color || 'Standard',
      });
    });

    triggerToast(`Added items from Order #${order.id} to cart!`);
  };

  // Order Cancellation Action
  const cancelOrder = (orderId) => {
    orderService.updateOrderStatus(orderId, 'Cancelled');
    const uid = user?.id || user?.email || user?.name || 'usr_guest';
    const updatedOrders = orderService.getOrdersByUserId(uid);
    setOrders(updatedOrders);

    updateAndSaveUserData((prev) => ({
      ...prev,
      orders: (prev.orders || []).map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' } : o)),
    }));

    triggerToast(`Order #${orderId} has been cancelled.`);
  };

  // Profile Management Actions
  const updateUserProfile = (newInfo) => {
    setUser((prev) => ({
      ...prev,
      name: newInfo.name !== undefined ? newInfo.name : prev.name,
      email: newInfo.email !== undefined ? newInfo.email : prev.email,
      avatar: newInfo.avatar !== undefined ? newInfo.avatar : prev.avatar,
    }));
    updateAndSaveUserData((prev) => ({
      ...prev,
      ...newInfo,
    }));
    triggerToast('Profile updated successfully!');
  };

  // Addresses CRUD
  const addAddress = (newAddr) => {
    updateAndSaveUserData((prev) => {
      const isDefault = newAddr.isDefault || prev.addresses.length === 0;
      let updatedList = [...prev.addresses];
      if (isDefault) {
        updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
      }
      const created = {
        id: 'addr_' + Date.now(),
        ...newAddr,
        isDefault,
      };
      return {
        ...prev,
        addresses: [created, ...updatedList],
      };
    });
    triggerToast('New address saved!');
  };

  const updateAddress = (id, updatedFields) => {
    updateAndSaveUserData((prev) => {
      let updatedList = prev.addresses.map((a) => {
        if (a.id === id) {
          return { ...a, ...updatedFields };
        }
        if (updatedFields.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
      return { ...prev, addresses: updatedList };
    });
    triggerToast('Address updated!');
  };

  const deleteAddress = (id) => {
    updateAndSaveUserData((prev) => {
      const filtered = prev.addresses.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return { ...prev, addresses: filtered };
    });
    triggerToast('Address removed');
  };

  const setDefaultAddress = (id) => {
    updateAndSaveUserData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
    }));
    triggerToast('Default address updated');
  };

  // Payment Methods CRUD
  const addPaymentMethod = (newPayment) => {
    updateAndSaveUserData((prev) => {
      const isDefault = newPayment.isDefault || prev.paymentMethods.length === 0;
      let updatedList = [...prev.paymentMethods];
      if (isDefault) {
        updatedList = updatedList.map((p) => ({ ...p, isDefault: false }));
      }
      const created = {
        id: 'pay_' + Date.now(),
        ...newPayment,
        isDefault,
      };
      return { ...prev, paymentMethods: [created, ...updatedList] };
    });
    triggerToast('Payment method added!');
  };

  const deletePaymentMethod = (id) => {
    updateAndSaveUserData((prev) => {
      const filtered = prev.paymentMethods.filter((p) => p.id !== id);
      if (filtered.length > 0 && !filtered.some((p) => p.isDefault)) {
        filtered[0].isDefault = true;
      }
      return { ...prev, paymentMethods: filtered };
    });
    triggerToast('Payment method removed');
  };

  const setDefaultPaymentMethod = (id) => {
    updateAndSaveUserData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((p) => ({ ...p, isDefault: p.id === id })),
    }));
    triggerToast('Default payment method updated');
  };

  // Settings
  const updateUserSettings = (newSettings) => {
    updateAndSaveUserData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
    triggerToast('Account settings saved');
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        user,
        userData,
        orders,
        categoryFilter,
        searchQuery,
        toastMessage,
        setCategoryFilter,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        loginUser,
        logoutUser,
        placeOrder,
        buyAgain,
        cancelOrder,
        updateUserProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addPaymentMethod,
        deletePaymentMethod,
        setDefaultPaymentMethod,
        updateUserSettings,
        triggerToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-neutral-700 font-semibold text-sm flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    return {
      cart: [],
      wishlist: [],
      user: { isAuthenticated: false, name: '', email: '', id: '' },
      userData: { addresses: [], orders: [], paymentMethods: [], settings: {} },
      orders: [],
      categoryFilter: 'All',
      searchQuery: '',
      toastMessage: null,
      setCategoryFilter: () => {},
      setSearchQuery: () => {},
      addToCart: () => {},
      removeFromCart: () => {},
      updateCartQuantity: () => {},
      clearCart: () => {},
      toggleWishlist: () => {},
      loginUser: () => {},
      logoutUser: () => {},
      placeOrder: () => null,
      buyAgain: () => {},
      cancelOrder: () => {},
      updateUserProfile: () => {},
      addAddress: () => {},
      updateAddress: () => {},
      deleteAddress: () => {},
      setDefaultAddress: () => {},
      addPaymentMethod: () => {},
      deletePaymentMethod: () => {},
      setDefaultPaymentMethod: () => {},
      updateUserSettings: () => {},
      triggerToast: () => {},
    };
  }
  return context;
};
