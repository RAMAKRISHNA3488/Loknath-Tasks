import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { useApp } from '../context/AppContext';

import modelLoginImg from '../assets/model-login.png';

export const SignupPage = () => {
  const { loginUser } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ name: fullName || email.split('@')[0], email });
    navigate('/');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-6">
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* Form Card (Left) */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-5">
          <div className="space-y-1 text-center md:text-left">
            <Link to="/" className="inline-flex items-center text-2xl font-black text-neutral-900">
              <span>Style<span className="text-primary font-black">Aura</span></span>
            </Link>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight pt-1">Create Account</h1>
            <p className="text-xs text-neutral-500">Sign up to get started with StyleAura.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-neutral-50 text-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-neutral-50 text-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full bg-neutral-50 text-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-neutral-50 text-neutral-900 px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer pt-1">
              <input type="checkbox" required className="accent-primary w-4 h-4" />
              <span>I agree to the <a href="#terms" className="text-primary font-bold">Terms & Conditions</a></span>
            </label>

            <Button type="submit" variant="primary" size="md" className="w-full py-3 shadow-md shadow-primary/25">
              Sign Up
            </Button>
          </form>

          {/* Social Logins */}
          <div className="space-y-3 pt-1 text-center">
            <span className="text-xs text-neutral-400 font-semibold block">or sign up with</span>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all border border-neutral-200/60 shadow-sm hover:scale-105"
                title="Sign up with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all border border-neutral-200/60 shadow-sm hover:scale-105"
                title="Sign up with Facebook"
              >
                <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all border border-neutral-200/60 shadow-sm hover:scale-105"
                title="Sign up with Apple"
              >
                <svg className="w-4 h-4 fill-neutral-900" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3.01 1.08.08 2.18-.55 2.85-1.37z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-neutral-500">
            Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Login</Link>
          </div>
        </div>

        {/* Model Graphic Card (Right) */}
        <div className="hidden md:block relative bg-red-100 overflow-hidden">
          <img src={modelLoginImg} alt="StyleAura Model" className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  );
};
