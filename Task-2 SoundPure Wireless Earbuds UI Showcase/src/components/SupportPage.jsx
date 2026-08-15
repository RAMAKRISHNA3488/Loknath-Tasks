import React, { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { 
  HelpCircle, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react'

export default function SupportPage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const [selectedCardId, setSelectedCardId] = useState(() => {
    return searchParams.get('tab') || location.state?.tab || 'help'
  })

  useEffect(() => {
    const tabParam = searchParams.get('tab') || location.state?.tab
    if (tabParam) {
      setSelectedCardId(tabParam)
    }
  }, [searchParams, location.state])

  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')


  const handleDownloadPDF = () => {
    const doc = new jsPDF()

    // 1. Header Banner Background (Dark Navy)
    doc.setFillColor(11, 21, 39) // #0B1527
    doc.rect(0, 0, 210, 45, 'F')

    // Header Text
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.text('SOUNDPURE WIRELESS EARBUDS', 20, 22)

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(56, 189, 248) // Sky blue
    doc.text('OFFICIAL USER GUIDE & OPERATING MANUAL', 20, 32)

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.text('Model: SoundPure Pro Ultra | Rev 1.0', 140, 32)

    // Body Setup
    let y = 60

    // Section 1: Quick Setup & Bluetooth Pairing
    doc.setTextColor(11, 21, 39)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('1. Quick Setup & Bluetooth Pairing', 20, y)
    
    y += 4
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.5)
    doc.line(20, y, 190, y)
    
    y += 10
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(71, 85, 105)
    doc.text('Step 1: Open the charging case lid near your smartphone, tablet, or PC.', 25, y)
    y += 7
    doc.text('Step 2: Ensure Bluetooth is turned ON in your device settings.', 25, y)
    y += 7
    doc.text('Step 3: Select "SoundPure Wireless" from the list of available devices.', 25, y)
    y += 7
    doc.text('Step 4: A tone will chime once instant pairing is completed successfully.', 25, y)

    // Section 2: Touch Controls Cheat Sheet
    y += 16
    doc.setTextColor(11, 21, 39)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('2. Smart Touch Control Gestures', 20, y)
    
    y += 4
    doc.line(20, y, 190, y)
    
    y += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(14, 165, 233)
    doc.text('Gesture Action', 25, y)
    doc.text('Function', 110, y)
    
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(71, 85, 105)
    
    const controls = [
      ['Single Tap (Left / Right)', 'Play / Pause Music & Answer / End Call'],
      ['Double Tap (Right Earbud)', 'Next Audio Track'],
      ['Double Tap (Left Earbud)', 'Previous Audio Track'],
      ['Press & Hold (2 Seconds)', 'Toggle Active Noise Cancellation (-35dB ANC)'],
      ['Triple Tap (Left / Right)', 'Activate Voice Assistant (Siri / Google)']
    ]

    controls.forEach(([gesture, func]) => {
      doc.setFont('helvetica', 'bold')
      doc.text(gesture, 25, y)
      doc.setFont('helvetica', 'normal')
      doc.text(func, 110, y)
      y += 7
    })

    // Section 3: Battery & Charging Performance
    y += 10
    doc.setTextColor(11, 21, 39)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('3. Battery & Charging Specifications', 20, y)
    
    y += 4
    doc.line(20, y, 190, y)
    
    y += 10
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(71, 85, 105)
    doc.text('• Playtime per Charge: Up to 8 hours of continuous audio playback.', 25, y)
    y += 7
    doc.text('• Total Reserve with Case: Up to 30 hours total battery capacity.', 25, y)
    y += 7
    doc.text('• Fast Charging: 10 minutes USB-C charging provides 2 hours of playtime.', 25, y)
    y += 7
    doc.text('• LED Status: Green (100%), Amber (20%-90%), Flashing Red (Low Battery <20%).', 25, y)

    // Section 4: Warranty & Customer Support
    y += 16
    doc.setTextColor(11, 21, 39)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('4. Warranty & Support Information', 20, y)
    
    y += 4
    doc.line(20, y, 190, y)
    
    y += 10
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(71, 85, 105)
    doc.text('• 1-Year Limited Hardware Warranty covering all manufacturing defects.', 25, y)
    y += 7
    doc.text('• 30-Day Risk-Free Trial with hassle-free returns and prepaid shipping labels.', 25, y)
    y += 7
    doc.text('• 24/7 Technical Support: support@soundpureaudio.com | www.soundpure.com', 25, y)

    // Footer Copyright Box
    y += 18
    doc.setFillColor(241, 245, 249)
    doc.rect(20, y, 170, 14, 'F')
    doc.setFontSize(9)
    doc.setTextColor(100, 116, 139)
    doc.text('© 2026 SoundPure Audio Inc. All rights reserved. Designed for Pure Sound.', 32, y + 9)

    // Trigger local PDF download
    doc.save('SoundPure_Wireless_Earbuds_User_Manual.pdf')
  }


  const supportCards = [
    {
      id: 'help',
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Find answers to common questions.'
    },
    {
      id: 'warranty',
      icon: ShieldCheck,
      title: 'Warranty',
      description: 'Learn about coverage and claims.'
    },
    {
      id: 'contact',
      icon: MessageSquare,
      title: 'Contact Us',
      description: 'Reach our support team.'
    },
    {
      id: 'guide',
      icon: BookOpen,
      title: 'User Guide',
      description: 'Step-by-step instructions.'
    }
  ]

  const faqs = [
    {
      question: 'How do I pair my SoundPure earbuds via Bluetooth?',
      answer: 'Open the charging case lid near your smartphone, tablet, or laptop. Ensure Bluetooth is enabled on your device, then select "SoundPure Wireless" from the list of available devices to complete instant pairing.'
    },
    {
      question: 'What is covered under the 1-Year Warranty?',
      answer: 'SoundPure provides a 1-Year Limited Warranty covering all manufacturing defects, electronic hardware failures, acoustic driver defects, and battery charging case performance degradation.'
    },
    {
      question: 'How does the 30-Day Risk-Free Trial work?',
      answer: 'Test your SoundPure earbuds for up to 30 days. If you are not 100% satisfied with the sound quality, comfort, or battery performance, contact our support team for a full refund and free return shipping label.'
    },
    {
      question: 'How do I clean and maintain my SoundPure earbuds?',
      answer: 'Gently wipe the earbuds and charging case using a clean, soft microfiber cloth. Remove silicone ear tips to rinse them under lukewarm water, ensuring they are completely dry before reattaching.'
    }
  ]

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    }, 3000)
  }

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900">
      
      {/* 1. INTERACTIVE SUPPORT HERO SECTION */}
      <section className="relative pt-2 pb-6 lg:pt-4 lg:pb-10 overflow-hidden flex items-center">

        <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Heading & 4 Clickable Option Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Header Title Area */}
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
                  SUPPORT
                </span>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1527] tracking-tight leading-[1.12]">
                  We're Here to Help
                </h1>

                <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
                  Get the support you need, when you need it.
                </p>
              </div>

              {/* 4 Support Option Cards Stacked Vertically */}
              <div className="space-y-3 max-w-md">
                {supportCards.map((card) => {
                  const Icon = card.icon
                  const isActive = card.id === selectedCardId
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setSelectedCardId(card.id)}
                      className={`w-full text-left rounded-2xl p-4 transition-all duration-200 flex items-center justify-between group cursor-pointer focus:outline-none ${
                        isActive
                          ? 'bg-white ring-2 ring-sky-500 border-2 border-sky-500 shadow-md scale-[1.01]'
                          : 'bg-white/80 hover:bg-white border border-white/80 shadow-xs opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl transition-colors ${
                          isActive ? 'bg-sky-500 text-white' : 'bg-sky-50 text-sky-600 border border-sky-100/80'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="space-y-0.5">
                          <h3 className={`text-sm font-bold tracking-tight transition-colors ${
                            isActive ? 'text-sky-600' : 'text-slate-900 group-hover:text-sky-600'
                          }`}>
                            {card.title}
                          </h3>
                          <p className="text-xs text-slate-400 font-normal leading-tight">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-sky-500 translate-x-1' : 'text-slate-300 group-hover:text-slate-500'
                      }`} />
                    </button>
                  )
                })}
              </div>

            </div>

            {/* Right Column: DYNAMIC INTERACTIVE INFORMATION PANEL */}
            <div className="lg:col-span-7 w-full pt-2 lg:pt-0">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-white/80 p-6 sm:p-8 shadow-sm space-y-6 min-h-[440px] flex flex-col justify-between animate-in fade-in duration-200">
                
                {/* DYNAMIC CONTENT TYPE 1: HELP CENTER */}
                {selectedCardId === 'help' && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0B1527]">Help Center & Knowledge Base</h3>
                        <p className="text-xs text-slate-400">Quick solutions and troubleshooting guides</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Top Help Topics</h4>
                      
                      <div className="space-y-2.5">
                        {faqs.slice(0, 3).map((faq, index) => (
                          <div key={index} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900">{faq.question}</h5>
                            <p className="text-xs text-slate-500 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}


                {/* DYNAMIC CONTENT TYPE 2: WARRANTY */}
                {selectedCardId === 'warranty' && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0B1527]">1-Year Limited Warranty</h3>
                        <p className="text-xs text-slate-400">Official SoundPure hardware protection policy</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1.5">
                        <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
                          <CheckCircle2 className="w-4 h-4 text-sky-500" />
                          <span>Active Coverage Included</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          All SoundPure earbuds purchased directly or through authorized retailers come with a complimentary 1-Year Limited Hardware Warranty.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">What's Covered</h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            <span>Manufacturing and material defects</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            <span>Charging case battery & port electronic failures</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            <span>Driver acoustic imbalance or speaker failure</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            <span>30-Day Risk-Free returns with prepaid shipping</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedCardId('contact')}
                        className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all"
                      >
                        <span>File Warranty Support Request</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* DYNAMIC CONTENT TYPE 3: CONTACT US */}
                {selectedCardId === 'contact' && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0B1527]">Contact Support Team</h3>
                        <p className="text-xs text-slate-400">Our customer success specialists respond within 2 hours</p>
                      </div>
                    </div>

                    {contactSubmitted ? (
                      <div className="py-12 text-center space-y-3">
                        <div className="inline-flex p-3.5 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                          Thank you! Your ticket has been logged in our system. A support representative will email you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">Your Name</label>
                            <input
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="e.g. Alex Turner"
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">Email Address</label>
                            <input
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="name@example.com"
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">How Can We Help?</label>
                          <textarea
                            rows={3}
                            required
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Describe your question, pairing issue, or warranty request..."
                            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-sm transition-all"
                          >
                            <Mail className="w-4 h-4 text-sky-400" />
                            <span>Submit Support Ticket</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* DYNAMIC CONTENT TYPE 4: USER GUIDE */}
                {selectedCardId === 'guide' && (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0B1527]">User Guide & Quick Setup</h3>
                        <p className="text-xs text-slate-400">Step-by-step instructions for your SoundPure earbuds</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">3-Step Quick Start</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                          <span className="text-xs font-extrabold text-sky-600">STEP 1</span>
                          <h5 className="text-xs font-bold text-slate-900">Open Case</h5>
                          <p className="text-[11px] text-slate-500 leading-tight">Open charging lid near your phone or tablet.</p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                          <span className="text-xs font-extrabold text-sky-600">STEP 2</span>
                          <h5 className="text-xs font-bold text-slate-900">Pair Device</h5>
                          <p className="text-[11px] text-slate-500 leading-tight">Select 'SoundPure Wireless' in Bluetooth settings.</p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                          <span className="text-xs font-extrabold text-sky-600">STEP 3</span>
                          <h5 className="text-xs font-bold text-slate-900">Touch Controls</h5>
                          <p className="text-[11px] text-slate-500 leading-tight">Single tap to play/pause; hold for ANC mode.</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                      <span>Full Owner's Manual PDF (English, Spanish, French)</span>
                      <span className="font-bold text-sky-600">PDF (2.4 MB)</span>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleDownloadPDF}
                        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
                      >

                        <span>Download User Manual PDF</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}


