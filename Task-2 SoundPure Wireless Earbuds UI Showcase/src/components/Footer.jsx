import React from 'react'
import { Link } from 'react-router-dom'
import { Headphones } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200/80 pt-12 lg:pt-16 pb-8">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-12">

        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="inline-flex items-center group">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                Sound<span className="text-sky-600">Pure</span>
              </span>
            </Link>

            
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-normal">
              Premium sound for a better tomorrow. Engineered with studio precision and true wireless freedom.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/features" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/product/details" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Details
                </Link>
              </li>
              <li>
                <Link to="/product" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Overview & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/support?tab=help" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/support?tab=warranty" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Warranty & Returns
                </Link>
              </li>
              <li>
                <Link to="/support?tab=contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link to="/orders" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Blog & News
                </Link>
              </li>
              <li>
                <Link to="/account" onClick={() => window.scrollTo(0, 0)} className="hover:text-sky-600 transition-colors">
                  Account Dashboard
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 SoundPure Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>



      </div>
    </footer>
  )
}

