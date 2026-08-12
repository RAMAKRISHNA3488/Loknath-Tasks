import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  ArrowRight,
  Clock,
  CheckCircle2,
  ShoppingBag,
  Truck,
  ChevronDown,
  MapPin,
  CreditCard,
  XCircle,
  MapPinOff,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const OrdersPage = () => {
  const { orders, buyAgain, cancelOrder } = useApp();
  const navigate = useNavigate();

  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [cancelConfirmOrder, setCancelConfirmOrder] = useState(null);

  const handleBuyAgain = (order) => {
    buyAgain(order);
    navigate('/cart');
  };

  const handleCancelClick = (order) => {
    setCancelConfirmOrder(order);
  };

  const confirmCancel = () => {
    if (cancelConfirmOrder) {
      cancelOrder(cancelConfirmOrder.id);
      setCancelConfirmOrder(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'shipped':
      case 'in transit':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'cancelled':
        return 'bg-neutral-200 text-neutral-600 border-neutral-300';
      case 'processing':
      default:
        return 'bg-red-100 text-primary border-red-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-100 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
              Order History
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              My Orders
            </h1>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Orders List or Empty State */}
        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const isCancelled = order.status?.toLowerCase() === 'cancelled';
              const isDelivered = order.status?.toLowerCase() === 'delivered';
              const formattedDate = order.orderDate
                ? new Date(order.orderDate).toISOString().split('T')[0]
                : order.date || '2026-08-12';

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-neutral-200/90 shadow-md hover:shadow-lg transition-all overflow-hidden"
                >
                  {/* Order Top Meta Bar */}
                  <div className="bg-neutral-50/90 p-5 sm:px-6 border-b border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-6 text-xs">
                      <div>
                        <span className="text-neutral-400 font-semibold block text-[11px] mb-0.5">Order Placed</span>
                        <span className="text-neutral-900 font-black">{formattedDate}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 font-semibold block text-[11px] mb-0.5">Order ID</span>
                        <span className="text-neutral-900 font-black font-mono">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 font-semibold block text-[11px] mb-0.5">Total Amount</span>
                        <span className="text-primary font-black text-sm">${order.total ? order.total.toFixed(2) : '0.00'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-sm ${getStatusBadge(order.status)}`}>
                        <Truck className="w-3.5 h-3.5" /> {order.status || 'Processing'}
                      </span>
                      <button
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        className="text-neutral-400 hover:text-neutral-700 p-1.5 rounded-lg hover:bg-neutral-200/50 transition-colors"
                        aria-label="Toggle Details"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Product Rows List */}
                  <div className="p-5 sm:p-6 divide-y divide-neutral-100">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title || item.name}
                              className="w-14 h-14 rounded-2xl object-cover border border-neutral-200/80 bg-neutral-50 shadow-sm shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-red-50 text-primary flex items-center justify-center border border-red-100 shrink-0">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                          <div>
                            <h4 className="text-sm font-extrabold text-neutral-900 leading-snug">{item.title || item.name}</h4>
                            <p className="text-xs text-neutral-400 font-medium pt-0.5">
                              Qty: {item.quantity || 1} {item.size && `• Size: ${item.size}`}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-neutral-900">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expanded Details Drawer */}
                  {isExpanded && (
                    <div className="bg-neutral-50/70 p-5 sm:p-6 border-t border-neutral-200/80 space-y-4 text-xs font-medium text-neutral-600 animate-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-1">
                          <span className="font-extrabold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider mb-2">
                            <MapPin className="w-4 h-4 text-primary" /> Shipping Address
                          </span>
                          <p className="font-bold text-neutral-900">{order.shippingAddress?.fullName || 'Customer'}</p>
                          <p>{order.shippingAddress?.address || '123 Fashion Blvd'}</p>
                          <p>{order.shippingAddress?.city || 'New York'}, {order.shippingAddress?.zipCode || '10001'}</p>
                          <p>{order.shippingAddress?.phone || '+1 234 567 890'}</p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-neutral-200 space-y-1">
                          <span className="font-extrabold text-neutral-900 flex items-center gap-1.5 text-xs uppercase tracking-wider mb-2">
                            <CreditCard className="w-4 h-4 text-primary" /> Payment Summary
                          </span>
                          <p><strong className="text-neutral-900">Payment Method:</strong> {order.paymentMethod || 'Credit Card'}</p>
                          <p><strong className="text-neutral-900">Subtotal:</strong> ${order.subtotal ? order.subtotal.toFixed(2) : '0.00'}</p>
                          <p><strong className="text-neutral-900">Shipping:</strong> {order.shipping === 0 ? 'Free' : `$${order.shipping?.toFixed(2)}`}</p>
                          <p><strong className="text-neutral-900">Tax (8%):</strong> ${order.tax ? order.tax.toFixed(2) : '0.00'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom Action Bar */}
                  <div className="px-5 sm:px-6 py-4 bg-neutral-50/40 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-neutral-400 font-semibold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-neutral-400" /> Shipped with StyleAura Express
                    </span>

                    <div className="flex items-center gap-3 ml-auto">
                      {/* Track Order Button */}
                      <button
                        onClick={() => setTrackingOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-extrabold text-xs text-neutral-800 bg-white border border-neutral-300 hover:bg-neutral-100 transition-all shadow-sm"
                      >
                        <Truck className="w-3.5 h-3.5 text-primary" /> Track Order
                      </button>

                      {/* Cancel Order Button */}
                      {!isCancelled && !isDelivered && (
                        <button
                          onClick={() => handleCancelClick(order)}
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full font-bold text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel Order
                        </button>
                      )}

                      {/* Buy Again Button */}
                      <button
                        onClick={() => handleBuyAgain(order)}
                        className="text-primary hover:text-primary-dark font-extrabold flex items-center gap-1 transition-all hover:translate-x-0.5"
                      >
                        Buy Again <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center space-y-5 bg-neutral-50/80 rounded-3xl border border-dashed border-neutral-300 max-w-md mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-red-100 text-primary flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-neutral-900">No orders yet</h3>
              <p className="text-sm text-neutral-500 font-medium">
                Your orders will appear here after you complete a purchase.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary/30"
              >
                Start Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* TRACK ORDER MODAL */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div>
                <span className="text-primary font-bold text-[10px] uppercase tracking-widest block">Live Shipment Tracking</span>
                <h3 className="text-xl font-black text-neutral-900 font-mono">#{trackingOrder.id}</h3>
              </div>
              <button
                onClick={() => setTrackingOrder(null)}
                className="text-neutral-400 hover:text-neutral-700 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {trackingOrder.status?.toLowerCase() === 'cancelled' ? (
              <div className="p-6 bg-neutral-100 rounded-2xl border border-neutral-200 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-neutral-500 mx-auto" />
                <h4 className="text-base font-extrabold text-neutral-900">Order Cancelled</h4>
                <p className="text-xs text-neutral-500 font-medium">
                  This order was cancelled. Live shipment tracking updates are inactive.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Meta details */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs font-semibold flex items-center justify-between">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Carrier</span>
                    <span className="text-neutral-900 font-bold">StyleAura Express</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Tracking Code</span>
                    <span className="text-neutral-900 font-mono font-bold">SA-TRK-98234</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Est. Delivery</span>
                    <span className="text-primary font-bold">3-5 Days</span>
                  </div>
                </div>

                {/* Timeline Progress */}
                <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                  <div className="relative flex items-start gap-4">
                    <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white text-[10px] font-bold">✓</div>
                    <div>
                      <h4 className="text-sm font-extrabold text-neutral-900">Order Placed</h4>
                      <p className="text-xs text-neutral-500">Order received and confirmed into warehouse system.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white text-[10px] font-bold ${
                      trackingOrder.status?.toLowerCase() !== 'processing' ? 'bg-emerald-500 text-white' : 'bg-primary text-white animate-pulse'
                    }`}>
                      {trackingOrder.status?.toLowerCase() !== 'processing' ? '✓' : '•'}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-neutral-900">Processing & Quality Inspection</h4>
                      <p className="text-xs text-neutral-500">Items packed and ready for dispatch.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white text-[10px] font-bold ${
                      trackingOrder.status?.toLowerCase() === 'shipped' || trackingOrder.status?.toLowerCase() === 'in transit' || trackingOrder.status?.toLowerCase() === 'delivered'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-neutral-300 text-white'
                    }`}>
                      {trackingOrder.status?.toLowerCase() === 'delivered' ? '✓' : '•'}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-neutral-900">Shipped / In Transit</h4>
                      <p className="text-xs text-neutral-500">Package dispatched with carrier tracking code SA-TRK-98234.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white text-[10px] font-bold ${
                      trackingOrder.status?.toLowerCase() === 'delivered' ? 'bg-emerald-500 text-white' : 'bg-neutral-300 text-white'
                    }`}>
                      {trackingOrder.status?.toLowerCase() === 'delivered' ? '✓' : '•'}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-neutral-900">Delivered</h4>
                      <p className="text-xs text-neutral-500">Package delivered to your shipping address.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setTrackingOrder(null)}
                className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full font-bold text-xs uppercase tracking-wider"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL ORDER CONFIRMATION MODAL */}
      {cancelConfirmOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
              <XCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-neutral-900">Cancel Order #{cancelConfirmOrder.id}?</h3>
              <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                Are you sure you want to cancel this order? This action cannot be undone once confirmed.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={() => setCancelConfirmOrder(null)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-100 uppercase tracking-wider"
              >
                Keep Order
              </button>
              <button
                onClick={confirmCancel}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md shadow-red-600/30"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
