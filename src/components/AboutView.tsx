import React from "react";
import { 
  Building2, Users, Rocket, Target, ShieldCheck, 
  MapPin, Check, Sparkles, MessageCircle, Star,
  Phone, Mail
} from "lucide-react";

interface AboutViewProps {
  setTab: (tab: string) => void;
}

export default function AboutView({ setTab }: AboutViewProps) {
  return (
    <div className="animate-fadeIn bg-slate-950 text-slate-100">
      
      {/* Editorial Header */}
      <section className="bg-slate-900 py-16 sm:py-20 border-b border-slate-800" id="about-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Our Mission & Identity</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Helping Local Businesses Forge Stronger Growth
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            We believe small business owners are the absolute backbone of our communities. Our mission is to secure their digital footprints so they can compete—and win—against heavily-funded corporate franchises.
          </p>
        </div>
      </section>

      {/* Core Narrative / Compelling story */}
      <section className="bg-slate-950 py-20 border-b border-slate-900" id="about-narrative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-[11px] font-bold text-sky-400">
                <Building2 className="h-3.5 w-3.5 text-sky-400" />
                Local Business Growth Service
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Our Story: Why We Built LeadForge Local
              </h2>
              
              <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
                <p>
                  Most digital marketing agencies talk in circle metrics. They charge $2,000+ per month retainers for abstract search keyword clusters, decorative social impressions, or 'click rates' that nobody can put in the bank. 
                </p>
                <p>
                  We saw honest, hardworking local business owners—plumbers, concrete builders, roofers, landscapers—getting overcharged by lazy agencies or lost in complex algorithms. Many were leaking dozens of high-paying calls simply because their Google maps pin was unoptimized or they missed client inquiries on active job sites.
                </p>
                <p>
                  That's why we founded <strong>LeadForge Local</strong>. By combining advanced digital tools and automation setups with localized, hyper-targeted marketing copy, we designed a client-acquisition and visibility system that operates at a tiny segment of traditional agency overheads.
                </p>
                <p>
                  We don't build long, confusing tech contracts. We build simple, incredibly high-speed digital tools, optimize your maps pack directory properly, and install immediate call text-back systems that preserve incoming cash flow from day one.
                </p>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => { setTab("audit"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-6 shadow-md transition-all cursor-pointer"
                >
                  Request A Free Audit
                </button>
                <button
                  onClick={() => { setTab("pricing"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 font-semibold text-xs py-3.5 px-5 transition-all cursor-pointer"
                >
                  View Marketing Packages
                </button>
              </div>
            </div>

            {/* Large visually polished side card representing standard details */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 relative">
              <div className="absolute top-0 right-0 h-24 w-24 bg-blue-600/10 blur-2xl pointer-events-none rounded-full" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">Professional Operations</span>
                  <h3 className="font-display font-extrabold text-white text-lg">Optimized Technical Systems</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    LeadForge Local provides small businesses with access to premium cloud-hosting, secure communication pipelines, and certified SMS communication channels designed to support high reliability.
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold text-[11px]">99.9% Uptime SLA Commitment</strong>
                      <span className="text-slate-400 block text-[10px]">Your web lead channels never go down.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="h-4.5 w-4.5 text-sky-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold text-[11px]">HIPAA & Carrier Compliant SMS</strong>
                      <span className="text-slate-400 block text-[10px]">Your missed call responses trigger safely 24/7.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 italic">
                  <span>Reliable Growth Partnerships</span>
                  <span>Est. 2026</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: CORE BRAND VALUES */}
      <section className="bg-slate-900 py-20 border-b border-slate-800" id="about-values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">The Foundation of Our Business</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Core Agency Operational Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We guide all client campaigns with a set of four humble, clear-cut promises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "1. No Corporate Fluff",
                desc: "We skip complex computer jargon and telemetry lines. We talk plainly in inbound phone rings, appointment volumes, and customer cash flow."
              },
              {
                title: "2. Absolute Price Integrity",
                desc: "With websites starting at $500, we show our pricing options upfront. No hidden setup fees or unannounced marketing charges."
              },
              {
                title: "3. Trade Specialization",
                desc: "We study local service contractor search metrics specifically, optimizing structures for plumbers, HVAC tech, roofers, and local trades."
              },
              {
                title: "4. Month-to-Month Freedom",
                desc: "We don't lock your business down into legal annual contracts. If you ever feel our systems aren't moving the needle, modify anytime."
              }
            ].map((val, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-850 p-6 rounded-2xl">
                <span className="font-mono text-xs font-black text-sky-400 block mb-2">PROMISE 0{idx+1}</span>
                <h3 className="font-display font-bold text-white text-sm mb-1.5">{val.title}</h3>
                <p className="text-xs text-slate-350 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3.5: MEET THE FOUNDERS */}
      <section className="bg-slate-950 py-20 border-b border-slate-900" id="about-founders">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Direct Accountability</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Meet Our Founders & Leadership
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We don't hide behind automated email response portals or outsourced customer centers. You get direct access to our agency principals whenever you need coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Heather Tucker Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-1.5 bg-blue-605 w-full" />
              <div className="space-y-4">
                <div>
                  <h3 className="font-display font-extrabold text-white text-lg">Heather Tucker</h3>
                  <span className="text-xs text-sky-400 font-bold block uppercase tracking-wider mt-0.5">Co-Founder & Client Success Director</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal text-slate-300">
                  Heather manages our local onboarding schedules, citation reviews loops, and client partnership retention. She ensures your brand receives elite representation and persistent localized placement.
                </p>
                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-medium">
                  <a href="tel:6822099273" className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors">
                    <Phone className="h-4 w-4 text-sky-400" />
                    <span>(682) 209-9273</span>
                  </a>
                  <a href="mailto:m.h.onlineservices722@gmail.com" className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors">
                    <Mail className="h-4 w-4 text-sky-400" />
                    <span>m.h.onlineservices722@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Matthew Tucker Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-1.5 bg-blue-605 w-full" />
              <div className="space-y-4">
                <div>
                  <h3 className="font-display font-extrabold text-white text-lg">Matthew Tucker</h3>
                  <span className="text-xs text-sky-400 font-bold block uppercase tracking-wider mt-0.5">Co-Founder & Technical Operations Director</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal text-slate-305">
                  Matthew leads our custom container infrastructure, digital optimization systems, Google API synchronizations, and automated call SMS responders. He keeps your inbound funnel secure and loading at 99.9% speeds.
                </p>
                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-medium">
                  <a href="tel:4693402871" className="flex items-center gap-2.5 text-slate-305 hover:text-sky-400 transition-colors">
                    <Phone className="h-4 w-4 text-sky-400" />
                    <span>(469) 340-2871</span>
                  </a>
                  <a href="mailto:m.h.onlineservices722@gmail.com" className="flex items-center gap-2.5 text-slate-305 hover:text-sky-400 transition-colors">
                    <Mail className="h-4 w-4 text-sky-400" />
                    <span>m.h.onlineservices722@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 bg-slate-901 rounded-2xl p-6 border border-slate-800 text-center max-w-2xl mx-auto bg-slate-900/50">
            <span className="text-[10px] text-sky-450 font-bold uppercase tracking-widest block mb-1">Our Location & Availability</span>
            <p className="text-xs font-semibold text-white">
              Executive Office: Dallas, Texas
            </p>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              We support contractors nationwide, with centralized strategic hubs operating out of Texas and Colorado. Schedule a direct callback session with Matthew or Heather today.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: TRUST SEAL BADGES AND DIRECT OUTREACH MESSAGE */}
      <section className="bg-slate-950 py-16 text-center" id="about-badges">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-sky-400 mx-auto">
            <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
          </div>
          <h3 className="font-display font-extrabold text-white text-xl tracking-tight">
            Ready To Upgrade Your Online Presence?
          </h3>
          <p className="text-xs text-slate-350 leading-relaxed max-w-lg mx-auto">
            Our team is online and ready to prepare your custom free performance audit. In under 24 hours, you will know exactly what citations are broken and how to rank Page 1 in your target town.
          </p>
          <button
            onClick={() => { setTab("audit"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 px-6 py-3.5 rounded-xl shadow-md cursor-pointer"
          >
            <span>Request Your Free Visibility Audit</span>
          </button>
        </div>
      </section>

    </div>
  );
}
