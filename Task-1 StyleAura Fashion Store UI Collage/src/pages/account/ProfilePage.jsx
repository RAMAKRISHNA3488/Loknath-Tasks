import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Phone, Edit2, Save, X, Camera, ShieldCheck } from 'lucide-react';

export const ProfilePage = () => {
  const { user, userData, updateUserProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: userData?.name || user?.name || 'Raga Loknath',
    email: userData?.email || user?.email || 'ragaloknath@gmail.com',
    phone: userData?.phone || '+1 (555) 234-5678',
    avatar: userData?.avatar || user?.avatar || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
  };

  const userInitial = ((formData.name || user?.name || 'U')[0]).toUpperCase();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-100 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
              Account Overview
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              My Profile
            </h1>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>

        {/* Profile Details or Edit Form */}
        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Avatar Circle */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-neutral-100 text-center">
              {userData?.avatar || user?.avatar ? (
                <img
                  src={userData.avatar || user.avatar}
                  alt={userData.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-4"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-primary text-white font-black text-4xl flex items-center justify-center shadow-lg shadow-primary/25 mb-4">
                  {userInitial}
                </div>
              )}
              <h2 className="text-lg font-extrabold text-neutral-900">{userData?.name || user?.name}</h2>
              <p className="text-xs text-neutral-500 font-medium">{userData?.email || user?.email}</p>
              <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Trendsetter
              </span>
            </div>

            {/* Profile Info Summary */}
            <div className="md:col-span-8 space-y-4">
              <div className="p-4 bg-neutral-50/70 rounded-2xl border border-neutral-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-neutral-500 shadow-sm border border-neutral-100">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Full Name</p>
                  <p className="text-base font-extrabold text-neutral-900">{userData?.name || user?.name}</p>
                </div>
              </div>

              <div className="p-4 bg-neutral-50/70 rounded-2xl border border-neutral-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-neutral-500 shadow-sm border border-neutral-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-base font-extrabold text-neutral-900">{userData?.email || user?.email}</p>
                </div>
              </div>

              <div className="p-4 bg-neutral-50/70 rounded-2xl border border-neutral-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-neutral-500 shadow-sm border border-neutral-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-base font-extrabold text-neutral-900">{userData?.phone || '+1 (555) 234-5678'}</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6 max-w-2xl mx-auto bg-neutral-50/70 p-6 sm:p-8 rounded-2xl border border-neutral-100">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Edit Profile Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-semibold text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-semibold text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-semibold text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Profile Photo URL (Optional)
                </label>
                <input
                  type="url"
                  name="avatar"
                  placeholder="https://example.com/my-photo.jpg"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm font-semibold text-neutral-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-primary/30"
              >
                <Save className="w-4 h-4" /> Save Profile
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
