import React from "react";
import { 
  ArrowRight, ShieldCheck, MapPin, PhoneCall, AlertTriangle, 
  Users, CheckCircle2, TrendingUp, MessageSquare, Star, Settings, DollarSign 
} from "lucide-react";

const TICKER_ITEMS = [
  { text: "Plumbing Services", emoji: "🚰" },
  { text: "Lawyers & Attorneys", emoji: "⚖️" },
  { text: "HVAC Specialists", emoji: "❄️" },
  { text: "Doctors & Clinic Visits", emoji: "🩺" },
  { text: "Roofers & Builders", emoji: "🏠" },
  { text: "Restaurants & Cafes", emoji: "🍽️" },
  { text: "Electrician Crews", emoji: "⚡" },
  { text: "Dentists & Dental Clinics", emoji: "🦷" },
  { text: "Landscaping Groups", emoji: "🌱" },
  { text: "Chiropractic Care", emoji: "🦴" },
  { text: "Recording Studios", emoji: "🎙️" },
  { text: "Auto Mechanics", emoji: "🔧" },
  { text: "Masseuses & Spas", emoji: "💆" },
  { text: "Concrete Paving", emoji: "🧱" },
  { text: "Mental Therapists", emoji: "🧠" },
  { text: "Pest Control", emoji: "🐜" },
  { text: "Private Coaches", emoji: "⚽" },
  { text: "Mom & Pop Shops", emoji: "🏪" },
  { text: "Physical Trainers", emoji: "💪" },
  { text: "Locally-Owned Boutiques", emoji: "🛍️" },
];

interface HomeViewProps {
  setTab: (tab: string) => void;
  setShowAdminHub: (show: boolean) => void;
}

export default function HomeView({ setTab, setShowAdminHub }: HomeViewProps) {
  
  const handleAuditCta = () => {
    setTab("audit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConsultCta = () => {
    setTab("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="animate-fadeIn">
      
      {/* SEAMLESS INFINITE SCROLL CAROUSEL OF SERVICE VERTICALS */}
      <div className="bg-slate-950/80 border-b border-slate-900/50 py-2 text-center">
        <span className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-wider uppercase font-mono px-4 block">
          Online visibility management to cover professional services alongside home trade contractors
        </span>
      </div>

      <div className="relative bg-slate-950 border-b border-slate-900 py-3 overflow-hidden select-none">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max items-center animate-scroll">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-300 mx-5 whitespace-nowrap">
              <span className="text-sm">{item.emoji}</span>
              <span className="tracking-tight">{item.text}</span>
              <span className="h-1 w-1 rounded-full bg-blue-500/60 ml-4"></span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 1: HERO SECTION - Dark Navy Blue with subtle gradients & mock graphics */}
      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 border-b border-slate-900" id="home-hero">
        {/* Ambient background blur circles */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-[350px] w-[350px] rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero text */}
            <div className="lg:col-span-7 space-y-6 lg:pr-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3.5 py-1 text-xs font-semibold tracking-wide text-sky-400">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                LeadForge Local Business Growth Service
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                More Calls. More Leads. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-blue-500">
                  More Customers.
                </span>
              </h1>
              
              <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                <p>
                  LeadForge Local helps small businesses improve their online presence, attract more local customers, and turn online searches into booked jobs.
                </p>
                <p className="text-sm sm:text-base text-slate-400">
                  From Google Business Profile optimization and websites to review management and AI-powered automation, we provide affordable, results-driven solutions without expensive agency pricing.
                </p>
              </div>
              
              <div className="py-2 space-y-1.5 text-slate-300 text-xs sm:text-sm font-medium">
                <p className="text-sky-400 font-bold block pb-1">Our goal is simple:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-bold text-lg leading-none">•</span>
                    <span>More Calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-bold text-lg leading-none">•</span>
                    <span>More Leads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-bold text-lg leading-none">•</span>
                    <span>More Customers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-bold text-lg leading-none">•</span>
                    <span>Better Online Visibility</span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 flex items-center gap-2">
                    <span className="text-sky-400 font-bold text-lg leading-none">•</span>
                    <span>A More Professional Online Presence</span>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-medium italic border-l-2 border-sky-500 pl-3">
                Get a Free Business Audit today and discover what's holding your business back online.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={handleAuditCta}
                  id="hero-primary-cta"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all cursor-pointer active:scale-98"
                >
                  <span>Get My Free Business Audit</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
                
                <button
                  onClick={handleConsultCta}
                  id="hero-secondary-cta"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/40 hover:bg-slate-900 px-7 py-4 text-sm font-bold text-white transition-all cursor-pointer"
                >
                  <span>Book a Free Call</span>
                </button>
              </div>

              {/* Value list */}
              <div className="pt-6 border-t border-slate-900 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full bg-blue-600 border border-slate-950 flex items-center justify-center text-[10px] shadow" title="Legal">⚖️</span>
                  <span className="h-7 w-7 rounded-full bg-sky-500 border border-slate-950 flex items-center justify-center text-[10px] shadow" title="Dental">🦷</span>
                  <span className="h-7 w-7 rounded-full bg-indigo-600 border border-slate-950 flex items-center justify-center text-[10px] shadow" title="Studios">🎙️</span>
                  <span className="h-7 w-7 rounded-full bg-green-600 border border-slate-950 flex items-center justify-center text-[10px] shadow" title="Dining & shops">🏪</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Proven systems operating across <strong className="text-white font-bold">20+ distinct service niches</strong>, medical practices, local shops, and contractors.
                </p>
              </div>
            </div>

            {/* Hero graphics - stylized dashboards & metrics preview */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-[420px] rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm">
                
                {/* Simulated Google Map Result */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <span className="text-[10px] font-mono font-bold text-slate-500">DEMONSTRATION SAMPLE</span>
                    <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold text-sky-400 uppercase">MAP PACK ACCELERATOR</span>
                  </div>
                  <div className="flex items-start gap-3 mt-3">
                    <div className="bg-blue-600 text-white rounded-lg p-2.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-display text-white">VIP HVAC & Plumbing Services</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] font-bold text-yellow-400">4.9</span>
                        <div className="flex gap-0.5 text-yellow-400">
                          {Array(5).fill(0).map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-yellow-400 stroke-none" />)}
                        </div>
                        <span className="text-[9px] text-slate-400">(184 Reviews)</span>
                      </div>
                      <span className="text-[9.5px] text-slate-300 block mt-1">Open 24/7 • Serving Your Local Area</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Performance stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-slate-950 to-blue-950/40 border border-slate-800/80 rounded-xl p-4">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Monthly inbound calls</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-white font-display">184</span>
                      <span className="text-[10px] font-bold text-green-400">+35%</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-950 to-blue-950/40 border border-slate-800/80 rounded-xl p-4">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Leads Secured via Text-back</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-white font-display">43</span>
                      <span className="text-[10px] font-bold text-sky-400">Saved</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Call Log interaction */}
                <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div>
                      <span className="block text-[10px] text-slate-400 leading-tight">Latest automated callback</span>
                      <span className="font-bold text-xs text-white">"Got you booked for Tuesday at 9!"</span>
                    </div>
                  </div>
                  <PhoneCall className="h-4.5 w-4.5 text-sky-400" />
                </div>

              </div>
              {/* Foreground float badge */}
              <div className="absolute -bottom-4 right-4 bg-blue-600 rounded-xl p-3 border border-blue-500 text-white shadow-xl flex items-center gap-2 max-w-[170px] hidden sm:flex">
                <ShieldCheck className="h-5 w-5 text-white flex-shrink-0" />
                <span className="text-[10px] font-bold tracking-tight leading-snug">Demonstration Graphic. Results Vary.</span>
              </div>

            </div>
          </div>
        </div>
      </section>
            {/* SECTION 2: COMMON PROBLEMS SECTION - Visual alert indicators with frustrated owner photo */}
      <section className="bg-slate-900 py-20 sm:py-24 border-b border-slate-800" id="home-problems">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">The Local Marketing Challenge</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
                Are You Losing Customers to Competitors Online?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Most local businesses lose customers every day because their online presence is outdated, difficult to find, or slow to respond.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Not Enough Leads",
                    desc: "Your phone isn't ringing consistently, and you're relying on word-of-mouth to keep business flowing."
                  },
                  {
                    title: "Outdated Website",
                    desc: "A slow or outdated website drives potential customers to competitors."
                  },
                  {
                    title: "Weak Google Presence",
                    desc: "If customers can't find you on Google or Google Maps, they're finding someone else."
                  },
                  {
                    title: "Poor Online Trust",
                    desc: "Without strong reviews and an active online presence, customers may question your credibility."
                  },
                  {
                    title: "Inactive Social Media",
                    desc: "An outdated Facebook page can make customers think your business is no longer active."
                  },
                  {
                    title: "Missed Calls",
                    desc: "When you're busy on the job and miss a call, many customers simply call the next company."
                  }
                ].map((prob, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-5.5 shadow-sm hover:border-slate-705 transition-all relative overflow-hidden group">
                    <div className="absolute top-0 left-0 h-1 w-full bg-rose-500/80" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 mb-3">
                      <AlertTriangle className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-display font-extrabold text-white text-sm mb-1">{prob.title}</h3>
                    <p className="text-[11px] text-slate-350 leading-relaxed">{prob.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleAuditCta}
              className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-sky-400 hover:text-sky-355 bg-slate-950 border border-slate-800 px-6 py-3 rounded-xl shadow-sm hover:bg-slate-900 transition-all cursor-pointer"
            >
              <span>Get My Free Business Audit</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 3: SERVICES SNEAK PEEK */}
      <section className="bg-slate-950 py-20 sm:py-24 border-b border-slate-900" id="home-services">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Our Core Services</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
                Local Growth Systems Built for Small Businesses
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Simple, affordable solutions designed to help local businesses generate more calls, leads, and customers—without expensive agency contracts.
              </p>
              <p className="text-xs text-sky-400 font-semibold">
                No long-term commitments. Just results.
              </p>
            </div>
            
            <button
              onClick={() => { setTab("services"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xs font-bold text-sky-400 hover:text-sky-350 flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start"
            >
              <span>Explore All 25 Services</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Google Business Profile Optimization",
                badge: "Starting Under $150",
                desc: "Improve your visibility on Google Search and Maps by optimizing categories, hours, services, photos, and business information to help customers find you faster."
              },
              {
                title: "Website Creation",
                badge: "Starting Under $500",
                desc: "Fast, mobile-friendly websites built to convert visitors into customers with clear calls-to-action and lead capture tools."
              },
              {
                title: "Review & Reputation Management",
                badge: "Starting Under $49/month",
                desc: "Build customer trust and generate more 5-star reviews with automated review requests and custom QR code solutions."
              },
              {
                title: "Missed Call Text Back",
                badge: "Starting Under $100",
                desc: "Never lose another lead. Automatically send a text message to customers when you miss a call, helping you capture jobs before they contact a competitor."
              }
            ].map((ser, i) => (
              <div key={i} className="bg-slate-900/55 hover:bg-slate-900 border border-slate-800 rounded-2xl p-5.5 transition-all shadow-sm flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-sky-400 block mb-2">{ser.badge}</span>
                  <h3 className="font-display font-extrabold text-white text-sm mb-1.5">{ser.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{ser.desc}</p>
                </div>
                <button
                  onClick={() => { setTab("services"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="text-xs font-bold text-slate-300 hover:text-sky-405 flex items-center gap-1 text-left cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="bg-slate-900 py-20 sm:py-24 border-b border-slate-805 text-white" id="home-how-it-works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">How It Works</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Our 4-Step Business Growth Blueprint
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We focus on practical solutions that deliver results quickly. Our systems are designed to help local businesses generate more calls, leads, and customers as efficiently as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {[
              {
                title: "Free Business Audit",
                desc: "We analyze your Google Business Profile, website performance, online reviews, local SEO, and customer response systems to identify opportunities for growth."
              },
              {
                title: "Custom Growth Strategy",
                desc: "Every business is different. We create a customized action plan based on your industry, goals, competition, and local market."
              },
              {
                title: "Implementation & Optimization",
                desc: "We optimize your Google Business Profile, improve your website, implement review systems, and set up automation tools like missed-call text back and AI chat."
              },
              {
                title: "Growth & Ongoing Support",
                desc: "As your online presence improves, you'll gain more visibility, stronger customer trust, and more opportunities to generate leads and bookings."
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-colors relative z-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white font-display font-black text-sm mb-4 tracking-tighter">
                  0{idx+1}
                </div>
                <h3 className="font-display font-extrabold text-white text-base mb-2">{step.title}</h3>
                <p className="text-xs text-slate-350 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE US */}
      <section className="bg-slate-955 py-20 sm:py-24 border-b border-slate-900" id="home-why-us">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-sky-450 uppercase tracking-widest block">Direct Accountability</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
                Why Business Owners Trust LeadForge Local
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We focus on what matters most: helping local businesses generate more calls, leads, and customers.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "No Long-Term Contracts",
                    desc: "We earn your business month-to-month. No long-term contracts or hidden commitments."
                  },
                  {
                    title: "Affordable Pricing",
                    desc: "Transparent, budget-friendly solutions designed specifically for small businesses."
                  },
                  {
                    title: "Real People",
                    desc: "Work directly with founders Matthew and Heather Eisan—not overseas call centers or automated support systems."
                  },
                  {
                    title: "Personalized Support",
                    desc: "We take the time to understand your business, your market, and your goals to create solutions tailored to your needs."
                  },
                  {
                    title: "Local Business Focus",
                    desc: "We specialize in helping local businesses, contractors, and service providers grow their online presence and attract more customers."
                  }
                ].map((edge, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sky-400">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-white text-sm mb-1">{edge.title}</h4>
                      <p className="text-xs text-slate-350 leading-relaxed">{edge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-8 border border-slate-800">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-400 uppercase tracking-wider inline-block border border-sky-500/20">
                    Example Customer Scenario
                  </span>
                </div>
                
                <p className="text-slate-300 font-normal text-sm leading-relaxed">
                  "Before improving our online presence, we relied heavily on word-of-mouth and expensive lead services. LeadForge Local optimized our Google Business Profile, improved our visibility, and set up missed-call text back automation. We began receiving more direct calls and capturing leads we previously would have missed."
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block mt-0.5">Example scenario provided for demonstration purposes. Individual results vary.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Trust Badges Grid */}
          <div className="mt-16 pt-10 border-t border-slate-800/85">
            <h3 className="font-display font-bold text-slate-400 text-xs uppercase tracking-widest text-center mb-8">Built for Local Businesses</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: "Secure Forms", icon: ShieldCheck, desc: "Encrypted and spam-protected submissions." },
                { label: "No Long-Term Contracts", icon: CheckCircle2, desc: "Flexible month-to-month service." },
                { label: "Small Business Focused", icon: Users, desc: "Built specifically for local businesses and contractors." },
                { label: "Transparent Pricing", icon: DollarSign, desc: "Clear pricing with no hidden fees or surprises." }
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-5 hover:border-slate-700/70 transition-all flex flex-col items-center">
                    <div className="h-10 w-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-sky-400 mb-3 border border-blue-500/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-display font-extrabold text-white text-sm mb-1">{badge.label}</h4>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{badge.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5.5: REAL PEOPLE COMMUNITIES GALLERY */}
      <section className="bg-slate-900 py-20 border-b border-slate-800" id="home-community-gallery">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Illustrative Target Verticals</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Engineered For Hardworking Teams In Our Communities
            </h2>
            <p className="text-sm text-slate-350 leading-relaxed font-normal text-slate-300">
              We focus on local visibility systems and direct response setups for physical commerce, hometown services, and local trade operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Owner card 1 */}
            <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/65 p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden flex-shrink-0 border border-slate-800 shadow-md">
                <img 
                  src="/src/assets/images/restaurant_owner_1781286617140.jpg" 
                  alt="Cozy bistro restaurant owner" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2 text-center md:text-left flex-1">
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9.5px] font-bold text-emerald-400 uppercase tracking-wider inline-block">
                  Example Cafe Scenario
                </span>
                <h3 className="font-display font-extrabold text-white text-sm">Typical Local Visibility Layout</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "Our maps listing coordinates menu highlights and direct booking links. Local visibility changes can significantly assist venue traffic."
                </p>
                <div className="text-[10px] text-slate-500 font-mono mt-2">Example Hospitality Concept Layout</div>
              </div>
            </div>

            {/* Owner card 2 */}
            <div className="relative group overflow-hidden rounded-2xl border border-slate-850 bg-slate-950/65 p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden flex-shrink-0 border border-slate-800 shadow-md">
                <img 
                  src="/src/assets/images/tradesman_worker_1781286632167.jpg" 
                  alt="Tradesman plumber contractor crew" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2 text-center md:text-left flex-1">
                <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[9.5px] font-bold text-sky-400 uppercase tracking-wider inline-block">
                  Example HVAC Scenario
                </span>
                <h3 className="font-display font-extrabold text-white text-sm">Direct Pipeline Response Flow</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "Estimating jobs we own without paying massive lead hubs. A missed-call fallback solution secures emergency calls while busy on site."
                </p>
                <div className="text-[10px] text-slate-500 font-mono mt-2">Example Service Trade Concept Layout</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ HIGHLIGHTS PREVIEW */}
      <section className="bg-slate-950 py-20 sm:py-24 border-b border-slate-900" id="home-faq-preview">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Got Questions?</span>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-350 leading-relaxed">
              We believe in simple answers. Here are our top homeowner & contractor inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "What does LeadForge Local actually do?",
                a: "We help home service companies get more local client jobs by ranking their business listings in Google Maps, building fast trade websites, and implementing instant missed-call responses."
              },
              {
                q: "What is LeadForge 's primary focus?",
                a: "LeadForge Local is a specialized local business growth service focused on helping small businesses improve their online presence, search visibility, and lead generation systems."
              },
              {
                q: "Do I have to sign binding long-term plans?",
                a: "No! All our digital packages and recurring maintenance retentions operate purely month-to-month. Cancel anytime with standard 10 days notice."
              },
              {
                q: "What is 'Missed Call Text Back' auto SMS?",
                a: "If you miss a contractor call because you're busy, our system instantly fires an automated SMS to secure the client from contacting rival builders."
              }
            ].map((fq, idx) => (
              <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                <h4 className="font-display font-extrabold text-xs text-white mb-1.5">Q: {fq.q}</h4>
                <p className="text-[11px] text-slate-350 leading-relaxed">A: {fq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => { setTab("pricing"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xs font-bold text-sky-400 hover:text-sky-350 flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <span>View full 25 FAQ vault and package pricing</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 7: FINAL CALL TO ACTION BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-20 text-white" id="home-cta-banner">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400">Claim Your Regional Positioning</span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready To Turn Online Searches Into Booked Jobs?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Don't let competitor listings take another premium drainage job, roofing evaluation, or electrical swap in your area. Request your free evaluation blueprint now!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleAuditCta}
              className="w-full sm:w-auto font-extrabold text-xs tracking-wide py-3.5 px-7 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-1"
            >
              <span>Get My Free Business Audit</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleConsultCta}
              className="w-full sm:w-auto font-bold text-xs py-3.5 px-6 rounded-xl border border-slate-700 hover:bg-slate-900 text-white transition-all cursor-pointer"
            >
              <span>Book a Free Call</span>
            </button>
          </div>

          <span className="block text-[10px] text-slate-400">
            No charge. No obligation. Direct, actionable value delivered inside 24 hours.
          </span>
        </div>
      </section>

    </div>
  );
}
