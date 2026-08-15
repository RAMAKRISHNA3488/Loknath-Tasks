import React from 'react'
import { Info, Image as ImageIcon, ArrowRight } from 'lucide-react'

export default function ReferencePlaceholder({ title, route, image, description, nextRoute, nextLabel }) {
  return (
    <div className="min-h-screen bg-[#F0F5FA] text-slate-900 pb-16">
      {/* Page Header / Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-50 border border-sky-200">Route: {route}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">Phase 1 Placeholder View</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
          </div>

          {nextRoute && (
            <a
              href={nextRoute}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm self-start sm:self-auto"
            >
              <span>{nextLabel || 'Next Screen'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Main Content Area displaying temporary reference screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Placeholder Info Banner */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Phase 1 Temporary Reference Screenshot:</span> {description || 'This reference screenshot establishes layout structure, page bounds, and routing flow. It will be replaced with modular React components in Phase 2.'}
          </div>
        </div>

        {/* Reference Image Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden">
          <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2 font-mono">
              <ImageIcon className="w-4 h-4 text-slate-400" />
              <span>Reference Screenshot ({route})</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold text-[10px]">
              Document/extracted_media/
            </span>
          </div>

          <div className="p-4 sm:p-6 bg-slate-900/5 flex justify-center">
            <img
              src={image}
              alt={`Reference screen for ${title}`}
              className="w-full h-auto max-w-5xl rounded-xl shadow-md border border-slate-200 object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
