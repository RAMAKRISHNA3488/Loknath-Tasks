import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Plus, Trash2, CheckCircle2, Star, Save, X, Lock } from 'lucide-react';

export const PaymentMethodsPage = () => {
  const { userData, addPaymentMethod, deletePaymentMethod, setDefaultPaymentMethod } = useApp();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    type: 'Visa',
    cardNumber: '',
    cardHolder: userData?.name || 'Raga Loknath',
    expiry: '12/28',
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      type: 'Visa',
      cardNumber: '',
      cardHolder: userData?.name || 'Raga Loknath',
      expiry: '12/28',
      isDefault: false,
    });
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = formData.cardNumber.replace(/\D/g, '').slice(-4) || '4242';
    const masked = `•••• •••• •••• ${digits}`;
    addPaymentMethod({
      ...formData,
      cardNumber: masked,
    });
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-100 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
              Billing & Payments
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Payment Methods
            </h1>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-primary/30"
            >
              <Plus className="w-4 h-4" /> Add Demo Payment Method
            </button>
          )}
        </div>

        {/* Demo Payment Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-neutral-50/80 p-6 sm:p-8 rounded-2xl border border-neutral-200 space-y-5 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="text-base font-extrabold text-neutral-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Add Demo Payment Card
              </h3>
              <button type="button" onClick={resetForm} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Card Provider
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">American Express</option>
                  <option value="Apple Pay">Apple Pay</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.cardHolder}
                  onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                  placeholder="e.g. Raga Loknath"
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Card Number (Demo Only)
                </label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  placeholder="4532 •••• •••• 4242"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Expiration Date (MM/YY)
                </label>
                <input
                  type="text"
                  required
                  placeholder="12/28"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isDefaultPayCheckbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-4 h-4 text-primary rounded border-neutral-300 focus:ring-primary"
              />
              <label htmlFor="isDefaultPayCheckbox" className="text-xs font-semibold text-neutral-700 cursor-pointer">
                Set as default payment method
              </label>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-200 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-500" /> Demo security mode — zero real card info stored.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md shadow-primary/30"
                >
                  <Save className="w-4 h-4" /> Save Method
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Payment Methods List */}
        {userData?.paymentMethods?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userData.paymentMethods.map((pay) => (
              <div
                key={pay.id}
                className={`p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${
                  pay.isDefault
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                {pay.isDefault && (
                  <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider bg-primary text-white px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Default
                  </span>
                )}

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-black text-xs">
                    {pay.type}
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-widest text-neutral-900 font-mono">{pay.cardNumber}</h3>
                    <p className="text-xs text-neutral-500 font-medium pt-1">Holder: {pay.cardHolder}</p>
                    <p className="text-xs text-neutral-500 font-medium">Expires: {pay.expiry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-4 border-t border-neutral-100 text-xs font-bold">
                  {!pay.isDefault && (
                    <button
                      onClick={() => setDefaultPaymentMethod(pay.id)}
                      className="text-primary hover:underline flex items-center gap-1 mr-auto"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Set Default
                    </button>
                  )}
                  <button
                    onClick={() => deletePaymentMethod(pay.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-4 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
            <CreditCard className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-800">No payment methods added</h3>
            <p className="text-sm text-neutral-500">Save a demo payment method for faster 1-click checkout.</p>
          </div>
        )}

      </div>
    </div>
  );
};
