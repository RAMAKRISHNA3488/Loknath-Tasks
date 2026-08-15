import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, Star, Save, X } from 'lucide-react';

export const AddressesPage = () => {
  const { userData, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      isDefault: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditClick = (addr) => {
    setFormData({ ...addr });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, formData);
    } else {
      addAddress(formData);
    }
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-100 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
              Shipping & Delivery
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Saved Addresses
            </h1>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-primary/30"
            >
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          )}
        </div>

        {/* Address Form (Modal / Collapsible) */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-neutral-50/80 p-6 sm:p-8 rounded-2xl border border-neutral-200 space-y-5 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="text-base font-extrabold text-neutral-900">
                {editingId ? 'Edit Address' : 'Add New Shipping Address'}
              </h3>
              <button type="button" onClick={resetForm} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Raga Loknath"
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 (555) 234-5678"
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  required
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  placeholder="Street address, P.O. box"
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. New York"
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. NY"
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Postal / ZIP Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  placeholder="e.g. 10001"
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="United States"
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isDefaultCheckbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-4 h-4 text-primary rounded border-neutral-300 focus:ring-primary"
              />
              <label htmlFor="isDefaultCheckbox" className="text-xs font-semibold text-neutral-700 cursor-pointer">
                Set as default shipping address
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200">
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
                <Save className="w-4 h-4" /> Save Address
              </button>
            </div>
          </form>
        )}

        {/* Address Cards List */}
        {userData?.addresses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userData.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-6 rounded-2xl border transition-all relative flex flex-col justify-between ${
                  addr.isDefault
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider bg-primary text-white px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Default
                  </span>
                )}

                <div className="space-y-2 pr-16">
                  <h3 className="text-base font-extrabold text-neutral-900">{addr.name}</h3>
                  <p className="text-xs text-neutral-600 font-medium">{addr.phone}</p>
                  <div className="text-sm text-neutral-700 font-medium leading-relaxed pt-2">
                    <p>{addr.addressLine1}</p>
                    {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                    <p>{addr.city}, {addr.state} {addr.zip}</p>
                    <p className="text-neutral-500 font-semibold">{addr.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-4 border-t border-neutral-100 text-xs font-bold">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-primary hover:underline flex items-center gap-1 mr-auto"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Set Default
                    </button>
                  )}
                  <button
                    onClick={() => handleEditClick(addr)}
                    className="text-neutral-600 hover:text-neutral-900 flex items-center gap-1 ml-auto"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center space-y-4 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
            <MapPin className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-800">No saved addresses found</h3>
            <p className="text-sm text-neutral-500">Add a shipping address for faster checkout.</p>
          </div>
        )}

      </div>
    </div>
  );
};
