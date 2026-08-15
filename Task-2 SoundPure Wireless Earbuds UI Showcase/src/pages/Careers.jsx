import React, { useState } from 'react'
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Headphones, Sparkles } from 'lucide-react'
import Footer from '../components/Footer'

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [applied, setApplied] = useState(false)

  const positions = [
    {
      id: 1,
      title: 'Senior Acoustic Hardware Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Hybrid',
      type: 'Full-Time',
      description: 'Lead the R&D and tuning of our next-generation dynamic driver acoustic architectures and ANC microphone array balance.'
    },
    {
      id: 2,
      title: 'DSP Audio Algorithm Specialist',
      department: 'Software & Firmware',
      location: 'Remote (US/EU)',
      type: 'Full-Time',
      description: 'Design low-latency digital signal processing algorithms for real-time spatial audio, transparency mode, and noise reduction.'
    },
    {
      id: 3,
      title: 'Lead UI/UX Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-Time',
      description: 'Craft intuitive mobile app companions and e-commerce digital experiences that wow millions of music lovers.'
    },
    {
      id: 4,
      title: 'E-Commerce Growth & Operations Manager',
      department: 'Marketing',
      location: 'New York, NY / Hybrid',
      type: 'Full-Time',
      description: 'Scale direct-to-consumer digital channels, global retail distribution, and brand partnerships worldwide.'
    }
  ]

  const benefits = [
    'Competitive Salary & Equity Packages',
    'Full Health, Dental & Vision Coverage',
    'Flexible Hybrid & Remote Work Culture',
    '$1,500 Annual Audio Equipment & Tech Stipend',
    'Unlimited PTO & Paid Wellness Days',
    '401(k) Matching Program'
  ]

  const handleApply = (e) => {
    e.preventDefault()
    setApplied(true)
    setTimeout(() => {
      setApplied(false)
      setSelectedJob(null)
    }, 2500)
  }

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900 min-h-screen flex flex-col justify-between">
      <div>
        
        {/* HERO HEADER */}
        <section className="pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/60">
          <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-6">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
                JOIN THE SOUNDPURE TEAM
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1527] tracking-tight leading-[1.1]">
                Build the Future of Sound With Us
              </h1>
              <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
                We are a team of acoustic engineers, software developers, and product creators obsessed with pushing the boundaries of wireless audio technology.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-3.5 border border-white/80 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS SECTION */}
        <section className="py-16 bg-white/60 border-b border-slate-200/60">
          <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-sky-500" />
                <span>OPEN OPPORTUNITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1527] tracking-tight">
                Current Job Openings
              </h2>
            </div>

            <div className="space-y-4">
              {positions.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-extrabold uppercase">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{job.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all shrink-0 cursor-pointer"
                  >
                    <span>Apply Position</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>

      {/* APPLICATION MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-sky-600">{selectedJob.department}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedJob.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {applied ? (
              <div className="py-8 text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Application Submitted!</h4>
                <p className="text-xs text-slate-500">Our HR recruiting team will review your application within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">LinkedIn / Portfolio URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 rounded-full border border-slate-300 text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
