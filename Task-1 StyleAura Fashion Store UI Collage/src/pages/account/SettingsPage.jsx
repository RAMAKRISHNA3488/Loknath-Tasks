import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Bell, Shield, Trash2, Key, Check } from 'lucide-react';

export const SettingsPage = () => {
  const { userData, updateUserSettings, logoutUser, triggerToast } = useApp();
  const settings = userData?.settings || { emailNotifications: true, smsNotifications: false, twoFactorAuth: false };

  const handleToggle = (key) => {
    updateUserSettings({ [key]: !settings[key] });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your temporary account? This action cannot be undone.')) {
      logoutUser();
      triggerToast('Account data deleted successfully.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-100 space-y-8">
        
        {/* Header */}
        <div className="border-b border-neutral-100 pb-6">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
            Preferences & Security
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Account Settings
          </h1>
        </div>

        {/* Notifications Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" /> Communication Preferences
          </h3>

          <div className="bg-neutral-50/80 rounded-2xl p-4 sm:p-6 border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Email Notifications</h4>
                <p className="text-xs text-neutral-500 font-medium">Receive order updates, exclusive drops, and promotional offers.</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  settings.emailNotifications ? 'bg-primary' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-neutral-200/60 pt-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">SMS Alerts</h4>
                <p className="text-xs text-neutral-500 font-medium">Get instant delivery alerts on your phone.</p>
              </div>
              <button
                onClick={() => handleToggle('smsNotifications')}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  settings.smsNotifications ? 'bg-primary' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.smsNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Security & Password
          </h3>

          <div className="bg-neutral-50/80 rounded-2xl p-4 sm:p-6 border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-neutral-500 font-medium">Add an extra layer of security to your StyleAura account.</p>
              </div>
              <button
                onClick={() => handleToggle('twoFactorAuth')}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  settings.twoFactorAuth ? 'bg-primary' : 'bg-neutral-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-neutral-200/60 pt-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Password</h4>
                <p className="text-xs text-neutral-500 font-medium">Last changed 30 days ago.</p>
              </div>
              <button
                onClick={() => triggerToast('Password reset link sent to your email!')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl border border-neutral-300 text-xs font-bold text-neutral-800 hover:bg-neutral-100 transition-colors shadow-sm"
              >
                <Key className="w-3.5 h-3.5" /> Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t border-neutral-100">
          <div className="bg-red-50/60 rounded-2xl p-6 border border-red-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-extrabold text-red-900">Delete Account</h4>
              <p className="text-xs text-red-700 font-medium pt-0.5">Permanently remove your StyleAura account and temporary stored data.</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-600/30 whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
