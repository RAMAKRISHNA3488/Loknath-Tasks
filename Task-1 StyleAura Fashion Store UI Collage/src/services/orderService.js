// Reusable Client-Side Order Service for StyleAura

const ORDERS_STORAGE_KEY = 'styleaura_orders';

export const orderService = {
  getAllOrders() {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse orders from localStorage', e);
      return [];
    }
  },

  getOrdersByUserId(userId) {
    if (!userId) return [];
    const all = this.getAllOrders();
    const target = String(userId).toLowerCase();
    return all.filter(
      (order) => order.userId && String(order.userId).toLowerCase() === target
    );
  },

  getOrderById(orderId) {
    if (!orderId) return null;
    const all = this.getAllOrders();
    return all.find((order) => order.id === orderId) || null;
  },

  createOrder(orderData) {
    const all = this.getAllOrders();
    
    // Generate unique order ID if missing
    const year = new Date().getFullYear();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderId = orderData.id || `ORD-${year}-${randomCode}`;

    const newOrder = {
      id: orderId,
      userId: orderData.userId || 'usr_guest',
      orderDate: orderData.orderDate || new Date().toISOString(),
      status: orderData.status || 'Processing',
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      shipping: orderData.shipping || 0,
      tax: orderData.tax || 0,
      total: orderData.total || 0,
      shippingAddress: orderData.shippingAddress || {},
      paymentMethod: orderData.paymentMethod || 'Credit Card',
    };

    // Prepend newest order first
    const updated = [newOrder, ...all];
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }
    return newOrder;
  },

  updateOrderStatus(orderId, status) {
    const all = this.getAllOrders();
    const updated = all.map((o) => (o.id === orderId ? { ...o, status } : o));
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update order status', e);
    }
    return updated;
  },
};
