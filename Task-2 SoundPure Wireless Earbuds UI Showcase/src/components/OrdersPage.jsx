import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Package, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Truck, 
  XCircle, 
  RotateCcw,
  RefreshCw,
  Eye,
  AlertCircle,
  X,
  HelpCircle
} from 'lucide-react'
import { useCart } from '../data/cartContext'
import productImg from '../assets/product_intro_case.png'

export default function OrdersPage() {
  const navigate = useNavigate()
  const { orderHistory, lastOrder, updateOrderStatus } = useCart()

  // Modals state
  const [cancelModalOrder, setCancelModalOrder] = useState(null)
  const [cancelReason, setCancelReason] = useState('Ordered by mistake / Change of mind')
  const [cancelNotes, setCancelNotes] = useState('')

  const [returnModalOrder, setReturnModalOrder] = useState(null)
  const [returnType, setReturnType] = useState('replace') // 'replace' or 'return'
  const [returnReason, setReturnReason] = useState('Defective / Audio quality issue')
  const [returnNotes, setReturnNotes] = useState('')

  const [toastMessage, setToastMessage] = useState('')

  // Use orderHistory if populated, or fallback to lastOrder array
  const orders = orderHistory.length > 0 ? orderHistory : (lastOrder ? [lastOrder] : [])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 4000)
  }

  const renderStatusBadge = (status) => {
    const s = (status || 'Processing').toLowerCase()
    if (s.includes('delivered')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Delivered</span>
        </span>
      )
    }
    if (s.includes('shipped')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold shadow-sm">
          <Truck className="w-3.5 h-3.5" />
          <span>Shipped</span>
        </span>
      )
    }
    if (s.includes('cancel')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold shadow-sm">
          <XCircle className="w-3.5 h-3.5" />
          <span>Cancelled</span>
        </span>
      )
    }
    if (s.includes('return')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-sm">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Return Requested</span>
        </span>
      )
    }
    if (s.includes('replace')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-sm">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replacement Processing</span>
        </span>
      )
    }
    // Default: Processing / Paid
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold shadow-sm">
        <Clock className="w-3.5 h-3.5" />
        <span>Processing</span>
      </span>
    )
  }

  const handleViewOrder = (ord) => {
    navigate('/order-confirmation', { state: { orderData: ord } })
  }

  const handleConfirmCancel = (e) => {
    e.preventDefault()
    if (!cancelModalOrder) return
    const id = cancelModalOrder.orderId
    updateOrderStatus(id, 'Cancelled', cancelReason + (cancelNotes ? `: ${cancelNotes}` : ''))
    showToast(`Order #${id} has been cancelled. Full refund initiated.`)
    setCancelModalOrder(null)
    setCancelNotes('')
  }

  const handleConfirmReturn = (e) => {
    e.preventDefault()
    if (!returnModalOrder) return
    const id = returnModalOrder.orderId
    const newStatus = returnType === 'replace' ? 'Replacement Processing' : 'Return Requested'
    updateOrderStatus(id, newStatus, returnReason + (returnNotes ? `: ${returnNotes}` : ''))
    showToast(
      returnType === 'replace'
        ? `Replacement request submitted for Order #${id}! Free return label generated.`
        : `Return request submitted for Order #${id}! Refund will be processed upon pickup.`
    )
    setReturnModalOrder(null)
    setReturnNotes('')
  }

  if (orders.length === 0) {
    return (
      <div className="w-full bg-[#F0F5FA] text-slate-900 py-16 sm:py-24">
        <div className="max-w-md mx-auto px-4 text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto shadow-sm">
            <Package className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              No Orders Yet
            </h2>
            <p className="text-slate-500 text-sm">
              You haven't placed any orders yet. Experience SoundPure audio today!
            </p>
          </div>

          <Link
            to="/product"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-6 rounded-full shadow-md transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-sky-400" />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#F0F5FA] text-slate-900 py-10 lg:py-16 border-b border-slate-200/60 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Title Area */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-sm">
              <span>MY ORDERS</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Your Orders
            </h1>

            <p className="text-slate-500 text-base sm:text-lg font-normal">
              Track, view, cancel, or request returns & replacements for your purchases.
            </p>
          </div>

          <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200/90 shadow-sm text-xs sm:text-sm font-bold text-slate-700 w-fit">
            All Orders: <span className="text-sky-600 font-extrabold">{orders.length}</span>
          </div>
        </div>

        {/* Main Orders Table / Cards Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* DESKTOP TABLE VIEW (Hidden on small mobile screens) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 text-xs font-bold uppercase text-slate-400 tracking-wider">
                  <th className="pb-4 pr-6">Order ID</th>
                  <th className="pb-4 pr-6">Date</th>
                  <th className="pb-4 pr-6">Items</th>
                  <th className="pb-4 pr-6">Total</th>
                  <th className="pb-4 pr-6">Status</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord, idx) => {
                  const firstItem = ord.items && ord.items.length > 0 ? ord.items[0] : null
                  const statusLower = (ord.shippingStatus || 'Processing').toLowerCase()
                  const isCancelable = statusLower.includes('processing') || statusLower.includes('paid') || statusLower.includes('placed')
                  const isReturnable = statusLower.includes('delivered') || statusLower.includes('shipped') || statusLower.includes('completed')

                  return (
                    <tr key={ord.orderId || idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-5 pr-6 font-mono font-extrabold text-slate-900">
                        #{ord.orderId || 'SP-2026-849201'}
                      </td>
                      <td className="py-5 pr-6 text-sm font-medium text-slate-600">
                        {ord.orderDate || 'August 12, 2026'}
                      </td>
                      <td className="py-5 pr-6 text-xs text-slate-500 font-medium">
                        {firstItem ? `${firstItem.name} (${firstItem.quantity})` : 'SoundPure Wireless Earbuds (1)'}
                      </td>
                      <td className="py-5 pr-6 font-extrabold text-slate-900 text-base">
                        ${(ord.total || 199).toFixed(2)}
                      </td>
                      <td className="py-5 pr-6">
                        {renderStatusBadge(ord.shippingStatus)}
                      </td>
                      <td className="py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewOrder(ord)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all shadow-xs cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          {isCancelable && (
                            <button
                              type="button"
                              onClick={() => setCancelModalOrder(ord)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 px-3 py-1.5 rounded-full transition-all shadow-xs cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Cancel</span>
                            </button>
                          )}

                          {isReturnable && (
                            <button
                              type="button"
                              onClick={() => setReturnModalOrder(ord)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-white bg-amber-50 hover:bg-amber-600 px-3 py-1.5 rounded-full transition-all shadow-xs cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Return / Replace</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS VIEW */}
          <div className="md:hidden space-y-4">
            {orders.map((ord, idx) => {
              const statusLower = (ord.shippingStatus || 'Processing').toLowerCase()
              const isCancelable = statusLower.includes('processing') || statusLower.includes('paid') || statusLower.includes('placed')
              const isReturnable = statusLower.includes('delivered') || statusLower.includes('shipped') || statusLower.includes('completed')

              return (
                <div
                  key={ord.orderId || idx}
                  className="bg-slate-50/90 rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Order ID</span>
                      <span className="font-mono font-extrabold text-slate-900 text-base">#{ord.orderId || 'SP-2026-849201'}</span>
                    </div>
                    {renderStatusBadge(ord.shippingStatus)}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Date</span>
                      <span className="font-bold text-slate-800">{ord.orderDate || 'August 12, 2026'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Total</span>
                      <span className="font-extrabold text-slate-900 text-sm">${(ord.total || 199).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-1 border-t border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => handleViewOrder(ord)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-full shadow-md transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Order Details</span>
                    </button>

                    {isCancelable && (
                      <button
                        type="button"
                        onClick={() => setCancelModalOrder(ord)}
                        className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-bold py-2.5 rounded-full border border-rose-200 transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Order</span>
                      </button>
                    )}

                    {isReturnable && (
                      <button
                        type="button"
                        onClick={() => setReturnModalOrder(ord)}
                        className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white text-xs font-bold py-2.5 rounded-full border border-amber-200 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Return or Replace</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>

      {/* CANCEL ORDER MODAL */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-rose-600">
                <XCircle className="w-6 h-6" />
                <h3 className="text-xl font-bold text-slate-900">Cancel Order</h3>
              </div>
              <button
                type="button"
                onClick={() => setCancelModalOrder(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1 text-xs text-slate-600">
              <p className="font-bold text-slate-900 text-sm">Order #{cancelModalOrder.orderId}</p>
              <p>Placed on: {cancelModalOrder.orderDate || 'August 15, 2026'}</p>
              <p>Total Refund Amount: <span className="font-extrabold text-slate-900">${(cancelModalOrder.total || 199).toFixed(2)}</span></p>
            </div>

            <form onSubmit={handleConfirmCancel} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Reason for Cancellation *
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="Ordered by mistake / Change of mind">Ordered by mistake / Change of mind</option>
                  <option value="Color or variant selection change">Color or variant selection change</option>
                  <option value="Shipping address update required">Shipping address update required</option>
                  <option value="Delivery timeframe too long">Delivery timeframe too long</option>
                  <option value="Found better price / alternative">Found better price elsewhere</option>
                  <option value="Other reason">Other reason</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={cancelNotes}
                  onChange={(e) => setCancelNotes(e.target.value)}
                  placeholder="Provide any additional comments for customer support..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 font-medium">
                Cancellation will immediately stop fulfillment and initiate a full 100% refund to your original payment method.
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCancelModalOrder(null)}
                  className="flex-1 py-3 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
                >
                  Keep Order
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RETURN & REPLACEMENT MODAL */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-amber-600">
                <RotateCcw className="w-6 h-6" />
                <h3 className="text-xl font-bold text-slate-900">Return or Replace Item</h3>
              </div>
              <button
                type="button"
                onClick={() => setReturnModalOrder(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1 text-xs text-slate-600">
              <p className="font-bold text-slate-900 text-sm">Order #{returnModalOrder.orderId}</p>
              <p>Item: SoundPure Wireless Earbuds</p>
              <p>Warranty Status: <span className="font-extrabold text-emerald-600">Covered under 30-Day Guarantee & 1-Year Warranty</span></p>
            </div>

            <form onSubmit={handleConfirmReturn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Request Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReturnType('replace')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      returnType === 'replace'
                        ? 'border-sky-500 bg-sky-50 text-sky-700 ring-1 ring-sky-500'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4 text-sky-600" />
                    <span>Free Replacement</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReturnType('return')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      returnType === 'return'
                        ? 'border-amber-500 bg-amber-50 text-amber-800 ring-1 ring-amber-500'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <RotateCcw className="w-4 h-4 text-amber-600" />
                    <span>Return for Refund</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Reason for Request *
                </label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Defective / Audio quality issue">Defective / Audio driver malfunction</option>
                  <option value="Damaged package upon arrival">Damaged package or case upon arrival</option>
                  <option value="Wrong item or color received">Wrong item or color received</option>
                  <option value="Earbud fit / Comfort issue">Earbud fit / Comfort issue</option>
                  <option value="Changed mind / Don't need item">Changed mind / Don't need item</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Issue Description & Notes
                </label>
                <textarea
                  rows={3}
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  placeholder="Describe the issue or specify preferred replacement color..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800 font-medium">
                SoundPure provides 100% free doorstep pickup and prepaid return shipping labels for all warranty & return requests.
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReturnModalOrder(null)}
                  className="flex-1 py-3 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
                >
                  Cancel Request
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
