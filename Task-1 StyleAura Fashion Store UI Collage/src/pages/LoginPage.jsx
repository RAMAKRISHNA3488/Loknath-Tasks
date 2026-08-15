import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '../components/ui';
import { useApp } from '../context/AppContext';
import { oauthService } from '../services/oauthService';

import modelLoginImg from '../assets/model-login.png';

export const LoginPage = () => {
  const { loginUser, triggerToast } = useApp();
  const navigate = useNavigate();

  // 1. Remove all pre-filled default login values (Initial state MUST be empty)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail
      .split(/[._-]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    loginUser({
      id: 'usr_' + Date.now(),
      name: formattedName || 'Trendsetter',
      email: email,
    });
    navigate('/');
  };

  const handleSocialLogin = (provider) => {
    setErrorMessage('');
    const result = oauthService.openOAuthPopup(provider);

    if (result.error) {
      if (!result.configured) {
        triggerToast(`${result.provider} OAuth window launched. Configure VITE_${provider.toUpperCase()}_CLIENT_ID for live authentication.`);
      } else {
        setErrorMessage(result.error);
      }
    } else {
      triggerToast(`Opening ${result.provider} sign-in window...`);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail || !validateEmail(resetEmail)) {
      triggerToast('Please enter a valid email address.');
      return;
    }
    setResetSent(true);
    triggerToast(`Password reset link sent to ${resetEmail}!`);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-6 px-4">
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* Form Card (Left) */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-2 text-center md:text-left">
            <Link to="/" className="inline-flex items-center text-2xl font-black text-neutral-900">
              <span>Style<span className="text-primary font-black">Aura</span></span>
            </Link>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight pt-2">Welcome Back!</h1>
            <p className="text-xs text-neutral-500">Log in to manage your orders & wishlist.</p>
          </div>

          {/* Validation Error Message */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm" noValidate>
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary font-medium"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-neutral-700">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[11px] font-semibold text-primary hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-neutral-50 text-neutral-900 px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary font-medium"
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full py-3 shadow-md shadow-primary/25 font-extrabold uppercase tracking-wider">
              Login
            </Button>
          </form>

          {/* Social Logins */}
          <div className="space-y-3 pt-2 text-center">
            <span className="text-xs text-neutral-400 font-semibold block">or continue with</span>
            <div className="flex items-center justify-center gap-3">
              
              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-11 h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all border border-neutral-200/60 shadow-sm hover:scale-105"
                title="Continue with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </button>

              {/* Facebook OAuth Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="w-11 h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all border border-neutral-200/60 shadow-sm hover:scale-105"
                title="Continue with Facebook"
              >
                <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>

              {/* Apple OAuth Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                className="w-11 h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all border border-neutral-200/60 shadow-sm hover:scale-105"
                title="Continue with Apple"
              >
                <svg className="w-5 h-5 fill-neutral-900" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3.01 1.08.08 2.18-.55 2.85-1.37z"/>
                </svg>
              </button>

            </div>
          </div>

          <div className="text-center text-xs text-neutral-500 pt-2">
            Don't have an account? <Link to="/signup" className="font-bold text-primary hover:underline">Sign Up</Link>
          </div>
        </div>

        {/* Model Graphic Card (Right) */}
        <div className="hidden md:block relative bg-red-100 overflow-hidden">
          <img src={modelLoginImg} alt="StyleAura Model" className="w-full h-full object-cover" />
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> Reset Password
              </h3>
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setResetSent(false);
                  setResetEmail('');
                }}
                className="text-neutral-400 hover:text-neutral-700 font-bold"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-extrabold text-emerald-900">Reset Email Sent</h4>
                <p className="text-xs text-emerald-800 font-medium">
                  We've sent password reset instructions to <strong>{resetEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(false)}
                  className="mt-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4 text-xs font-medium">
                <p className="text-neutral-600">
                  Enter your registered email address and we'll send you a link to reset your password.
                </p>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(false)}
                    className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-full font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full font-extrabold uppercase tracking-wider shadow-md shadow-primary/30"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
