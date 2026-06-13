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
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Meet the Founders</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Meet the Local Team Behind LeadForge Local
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Real Texans helping local businesses grow through modern marketing, automation, and honest hard work.
          </p>
        </div>
      </section>

      {/* Core Narrative / About Us Section */}
      <section className="bg-slate-950 py-20 border-b border-slate-900" id="about-narrative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-[11px] font-bold text-sky-400">
              <Building2 className="h-3.5 w-3.5 text-sky-400" />
              Family-Owned & Local Operations
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Honest, Results-Driven Marketing for Local Trades
            </h2>
            
            <div className="text-xs sm:text-sm text-slate-300 space-y-5 leading-relaxed font-sans">
              <p>
                LeadForge Local was founded by <strong>Matthew and Heather Eisan</strong>, lifelong Texans who understand the values of hard work, community, and taking care of local businesses.
              </p>
              <p>
                Born and raised in Texas and proudly serving the DFW area, Matthew and Heather built LeadForge Local with one mission: help small businesses compete with larger companies by giving them access to affordable, powerful marketing tools.
              </p>
              <p>
                Matthew brings years of contractor and oilfield experience along with a background in marketing, giving him firsthand knowledge of both the business side and the hard work that keeps local companies running. He understands the challenges business owners face because he has lived them.
              </p>
              <p>
                Heather is known for her strong work ethic, attention to detail, and dedication to helping others succeed. Her perseverance and commitment are reflected in every client relationship and project.
              </p>
              <p>
                After facing and overcoming breast cancer, Heather developed an even deeper appreciation for family, community, and supporting local businesses. That experience strengthened the values that drive LeadForge Local today: integrity, resilience, and service.
              </p>
              <p className="border-l-2 border-sky-500 pl-4 italic text-slate-400">
                "Together, Matthew and Heather believe local businesses deserve enterprise-level tools without enterprise-level prices."
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => { setTab("audit"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-6 shadow-md transition-all cursor-pointer text-center"
              >
                Get My Free Business Audit
              </button>
              <button
                onClick={() => { setTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 font-semibold text-xs py-3.5 px-5 transition-all cursor-pointer text-center"
              >
                Book a Free Call
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: CORE BRAND VALUES */}
      <section className="bg-slate-900 py-20 border-b border-slate-800" id="about-values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Our Foundation</span>
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

      {/* SECTION 3.5: MEET THE FOUNDERS (BIO CARDS) */}
      <section className="bg-slate-950 py-20 border-b border-slate-900" id="about-founders">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Direct Accountability</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Professional Backgrounds
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We don't hide behind automated templates or anonymous support tickets. You communicate directly with us—local business advocates focused on helping your company thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Matthew Eisan Card (No Photo) */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden group flex flex-col sm:flex-row gap-6 items-start">
              <div className="absolute top-0 left-0 h-1 bg-blue-600 w-full" />
              <div className="space-y-4 flex-grow w-full">
                <div>
                  <h3 className="font-display font-extrabold text-white text-lg">Matthew Eisan</h3>
                  <span className="text-xs text-sky-400 font-bold block uppercase tracking-wider mt-0.5">Co-Founder</span>
                </div>
                
                {/* Professional bullet credentials */}
                <div className="space-y-1.5">
                  {[
                    "Texas Native",
                    "Contractor Experience",
                    "Oilfield Background",
                    "Marketing Experience",
                    "Local Business Advocate"
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-sky-400">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-350 leading-relaxed italic font-sans">
                  "Matthew combines hands-on field experience with business and marketing knowledge to help local companies generate more leads and grow."
                </p>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-medium">
                  <a href="tel:4693402871" className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors">
                    <Phone className="h-4 w-4 text-sky-400" />
                    <span>(469) 340-2871</span>
                  </a>
                  <a href="mailto:support@leadforgelocal.com" className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors">
                    <Mail className="h-4 w-4 text-sky-400" />
                    <span>support@leadforgelocal.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Heather Eisan Card (No Photo) */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden group flex flex-col sm:flex-row gap-6 items-start">
              <div className="absolute top-0 left-0 h-1 bg-blue-600 w-full" />
              <div className="space-y-4 flex-grow w-full">
                <div>
                  <h3 className="font-display font-extrabold text-white text-lg">Heather Eisan</h3>
                  <span className="text-xs text-sky-400 font-bold block uppercase tracking-wider mt-0.5">Co-Founder</span>
                </div>

                {/* Professional bullet credentials */}
                <div className="space-y-1.5">
                  {[
                    "Texas Native",
                    "Detail Oriented",
                    "Client Success Focused",
                    "Community Driven",
                    "Breast Cancer Survivor"
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-sky-400">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-350 leading-relaxed italic font-sans">
                  "Heather's dedication, resilience, and attention to detail help ensure every client receives exceptional support and care."
                </p>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-medium">
                  <a href="tel:4697517153" className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors">
                    <Phone className="h-4 w-4 text-sky-400" />
                    <span>(469) 751-7153</span>
                  </a>
                  <a href="mailto:support@leadforgelocal.com" className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors">
                    <Mail className="h-4 w-4 text-sky-400" />
                    <span>support@leadforgelocal.com</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 bg-slate-901 rounded-2xl p-6 border border-slate-800 text-center max-w-2xl mx-auto bg-slate-900/50">
            <span className="text-[10px] text-sky-450 font-bold uppercase tracking-widest block mb-1">Our Location & Availability</span>
            <p className="text-xs font-semibold text-white">
              Location: North Fort Worth/Alliance Area (Serving DFW)
            </p>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              We support local business owners nationwide, with centralized strategic hubs operating out of Texas. Schedule a direct callback session with Matthew or Heather today.
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
            Our team is online and ready to prepare your custom free performance audit. In under 24 hours, you will know exactly what citations are broken and how to strengthen your online visibility in your target town.
          </p>
          <button
            onClick={() => { setTab("audit"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 px-6 py-3.5 rounded-xl shadow-md cursor-pointer text-center"
          >
            <span>Get My Free Business Audit</span>
          </button>
        </div>
      </section>

    </div>
  );
}
