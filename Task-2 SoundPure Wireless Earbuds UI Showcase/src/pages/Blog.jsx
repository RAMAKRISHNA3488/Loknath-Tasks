import React, { useState } from 'react'
import { Calendar, Clock, ArrowRight, Sparkles, Newspaper, Tag, CheckCircle2, Search } from 'lucide-react'
import Footer from '../components/Footer'

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  const categories = ['All', 'Product Launch', 'Firmware Update', 'Acoustic Engineering', 'Awards & Press', 'Guides & Tips']

  const articles = [
    {
      id: 1,
      title: 'Introducing SoundPure Pro Ultra: Next-Gen 45dB Hybrid Active Noise Cancellation',
      category: 'Product Launch',
      date: 'August 12, 2026',
      readTime: '4 min read',
      author: 'Dr. Marcus Vance, Head of Acoustic Engineering',
      image: 'p3',
      featured: true,
      summary: 'Experience studio-quality sound tuning with custom 10mm graphene dynamic drivers, dual-microphone noise isolation, and 32 hours of total battery reserve.',
      content: `We are thrilled to officially unveil the SoundPure Pro Ultra flagship wireless earbuds. Engineered over two years in our acoustic research labs, the Pro Ultra introduces our proprietary 45dB Hybrid Active Noise Cancellation architecture.

Key Highlights of SoundPure Pro Ultra:
• Custom 10mm Graphene Drivers: Engineered to reproduce ultra-deep bass responses without distorting acoustic vocal transparency.
• 45dB Hybrid ANC: Real-time dual-microphone arrays sample external ambient noise 40,000 times per second to neutralize background distractions.
• 32-Hour Battery System: 8 hours per single earbud charge, backed by an additional 24 hours stored within the fast-charging USB-C case.
• Bluetooth 5.3 & Multipoint: Seamlessly switch between your phone and laptop without disconnecting.`
    },
    {
      id: 2,
      title: 'Firmware v2.4 Released: Enhanced Voice Isolation & 38ms Ultra-Low Latency Mode',
      category: 'Firmware Update',
      date: 'August 5, 2026',
      readTime: '3 min read',
      author: 'SoundPure Software Team',
      featured: false,
      summary: 'Our latest over-the-air update improves microphone voice clarity during phone calls and introduces a dedicated low-latency gaming mode.',
      content: `Firmware Update v2.4 is now rolling out to all SoundPure earbuds via the companion app. This update brings key algorithm enhancements requested by our global community:

1. Advanced Beamforming Noise Suppression: Upgraded beamforming mic algorithms isolate your voice during high-wind environments or busy coffee shops.
2. Low-Latency Gaming Mode: Triple-tap the right stem to trigger 38ms ultra-low latency audio synchronization for competitive mobile gaming and video playback.
3. Adaptive Battery Saver: Intelligently pauses ANC during inactive audio periods to preserve battery life.`
    },
    {
      id: 3,
      title: 'Inside the Lab: Tuning 10mm Graphene Drivers for Studio Acoustic Balance',
      category: 'Acoustic Engineering',
      date: 'July 28, 2026',
      readTime: '5 min read',
      author: 'Elena Rostova, Senior Audio Tuning Specialist',
      featured: false,
      summary: 'An inside look at our sound lab acoustic testing, frequency response curve tuning, and pressure-equalized earbud ergonomics.',
      content: `Achieving true audiophile sound quality in a compact wireless form factor requires re-thinking traditional speaker diaphragm design.

By utilizing micro-layered graphene diaphragms—a material 200 times stronger than steel yet ultra-lightweight—our drivers eliminate unwanted harmonic distortion at high volume levels.

Our tuning curve delivers punchy sub-bass down to 20Hz while keeping mid-range frequencies crisp for clean vocal acoustics.`
    },
    {
      id: 4,
      title: 'SoundPure Named Best Wireless Earbuds of 2026 by Audio Tech Magazine',
      category: 'Awards & Press',
      date: 'July 15, 2026',
      readTime: '2 min read',
      author: 'Press Relations',
      featured: false,
      summary: 'Audio Tech Magazine awarded SoundPure top honors for outstanding sound clarity, ergonomic comfort, and exceptional battery performance.',
      content: `We are honored to share that Audio Tech Magazine has awarded SoundPure Wireless Earbuds "Best Overall True Wireless Earbuds of 2026".

The review praised SoundPure for providing flagship acoustic performance, active noise cancellation, and a comfortable ergonomic fit at a competitive price point.`
    },
    {
      id: 5,
      title: '5 Simple Tips to Maximize Earbud Battery Lifespan & Keep Sound Crystal Clear',
      category: 'Guides & Tips',
      date: 'July 2, 2026',
      readTime: '3 min read',
      author: 'Customer Success Team',
      featured: false,
      summary: 'Simple daily maintenance habits to extend battery cell longevity, clean silicone ear tips safely, and care for your charging case.',
      content: `To ensure your SoundPure earbuds perform like new for years to come, follow these quick maintenance guidelines:

• Keep Charging Contacts Clean: Periodically wipe the gold-plated charging pins on the stems and inside the case with a dry microfiber cloth.
• Avoid Extreme Temperatures: Do not leave your charging case in direct sunlight or freezing cars.
• Wash Ear Tips Separately: Detach silicone tips and rinse under lukewarm water. Allow them to dry completely before reattaching.`
    }
  ]

  const filteredArticles = articles.filter((art) => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const featuredArticle = articles.find((a) => a.featured)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3000)
  }

  return (
    <div className="w-full bg-[#EDF5FC] text-slate-900 min-h-screen flex flex-col justify-between">
      <div>
        
        {/* HERO HEADER */}
        <section className="pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-200/60">
          <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-500 uppercase block">
                  SOUNDPURE NEWSROOM & INSIGHTS
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1527] tracking-tight">
                  Latest Company News & Product Updates
                </h1>
                <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
                  Discover acoustic engineering breakthroughs, firmware releases, and insider product stories from SoundPure Audio.
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-80 shrink-0">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles or news..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/90 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer focus:outline-none ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white/80 hover:bg-white text-slate-600 border border-white/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* FEATURED BANNER ARTICLE */}
        {featuredArticle && activeCategory === 'All' && !searchQuery && (
          <section className="py-10 border-b border-slate-200/60">
            <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
              <div 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-10 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
              >
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-extrabold uppercase tracking-wider">
                      FEATURED ANNOUNCEMENT
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticle.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {featuredArticle.summary}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-600 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="lg:col-span-4 bg-sky-50/70 rounded-2xl p-6 border border-sky-100 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-extrabold uppercase text-sky-700">AUTHOR INSIGHT</div>
                    <div className="text-sm font-bold text-slate-900">{featuredArticle.author}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white text-xs text-slate-500 font-medium border border-sky-100/80">
                    "Our goal with SoundPure Pro Ultra was to eliminate acoustic compromise once and for all."
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ARTICLES GRID */}
        <section className="py-14 bg-white/60 border-b border-slate-200/60">
          <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-8">
            
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-[#0B1527] tracking-tight">
                {activeCategory === 'All' ? 'Recent News & Articles' : `${activeCategory} Posts`}
              </h2>
              <span className="text-xs text-slate-500 font-semibold">{filteredArticles.length} Articles Found</span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-12 text-center bg-white rounded-3xl p-8 border border-slate-200 space-y-2">
                <Newspaper className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No articles match your search</h3>
                <p className="text-xs text-slate-500">Try searching for a different keyword or select "All" categories.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-extrabold uppercase">
                          {art.category}
                        </span>
                        <span>{art.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                      <span>{art.date}</span>
                      <span className="text-sky-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read Post <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* NEWSLETTER SUBSCRIBE BAR */}
        <section className="py-14 bg-[#0B1527] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <div className="inline-flex p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Newspaper className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight">Stay Ahead of Sound Pure News</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Subscribe to get firmware update notifications, new product launches, and exclusive acoustic insights delivered to your inbox.
              </p>
            </div>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-6 py-3 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing to SoundPure News!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 rounded-full bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>

      </div>

      {/* FULL ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-extrabold uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400 font-medium block">{selectedArticle.date} • {selectedArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1527] leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600">
                By {selectedArticle.author}
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-normal">
                {selectedArticle.content}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-sm"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
