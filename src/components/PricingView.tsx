import React, { useState } from "react";
import { PACKAGES } from "../data";
import { 
  Check, ArrowRight, Calculator, Star, BadgeAlert, 
  HelpCircle, DollarSign, RefreshCw, Sparkles, Sliders 
} from "lucide-react";

interface PricingViewProps {
  setTab: (tab: string) => void;
}

export default function PricingView({ setTab }: PricingViewProps) {
  
  // ROI Calculator States
  const [selectedTrade, setSelectedTrade] = useState<string>("plumber");
  const [ticketSize, setTicketSize] = useState<number>(450);
  const [additionalJobs, setAdditionalJobs] = useState<number>(4);

  // Default values mapping to trades
  const tradeDefaults: { [key: string]: { ticket: number, name: string, shortName?: string } } = {
    roofer: { ticket: 2800, name: "Roofing Contractor", shortName: "Roofer" },
    plumber: { ticket: 450, name: "Plumbing Services", shortName: "Plumber" },
    hvac: { ticket: 1800, name: "HVAC & AC Repair", shortName: "HVAC" },
    landscaper: { ticket: 350, name: "Lawn & Landscaping", shortName: "Landscaper" },
    electrician: { ticket: 500, name: "Electrical Trade", shortName: "Electrician" },
    pest: { ticket: 250, name: "Pest Control Services", shortName: "Pest Control" },
    lawyer: { ticket: 3500, name: "Legal Representation", shortName: "Lawyer" },
    doctor: { ticket: 350, name: "Medical Visits", shortName: "Doctor" },
    dentist: { ticket: 750, name: "Dental Procedures", shortName: "Dentist" },
    restaurant: { ticket: 75, name: "Dining Reservations", shortName: "Restaurant" },
    chiropractor: { ticket: 150, name: "Chiropractic Sessions", shortName: "Chiropractor" },
    masseuse: { ticket: 120, name: "Massage & Spa Therapy", shortName: "Masseuse" },
    therapist: { ticket: 180, name: "Mental Therapy Sessions", shortName: "Therapist" },
    coach: { ticket: 450, name: "Private Coaching", shortName: "Coach" },
    trainer: { ticket: 110, name: "Physical Training", shortName: "Trainer" }
  };

  const handleTradeChange = (tradeKey: string) => {
    setSelectedTrade(tradeKey);
    setTicketSize(tradeDefaults[tradeKey].ticket);
  };

  // ROI math
  const estimatedRevenue = ticketSize * additionalJobs;
  const growthRetainer = 499;
  const netValueCreated = estimatedRevenue - growthRetainer;
  const roiMultiplier = (estimatedRevenue / growthRetainer).toFixed(1);

  const handleCta = () => {
    setTab("audit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="animate-fadeIn bg-slate-950 text-slate-100">
      
      {/* Upper Title */}
      <section className="bg-slate-900 py-16 sm:py-20 border-b border-slate-800" id="pricing-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block font-sans">Affordable Investment</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Simple, Performance-Driven Package Pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-350 leading-relaxed max-w-2xl mx-auto">
            Choose the specific tier that matches your current business traction. We deliver high-end digital systems designed to return your initial setup costs with your very first booking.
          </p>
        </div>
      </section>

      {/* Package tables block */}
      <section className="bg-slate-950 py-16" id="pricing-tables-wrapper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pkg, idx) => (
              <div 
                key={pkg.id}
                className={`bg-slate-900 border rounded-3xl p-8 relative flex flex-col justify-between transition-all hover:shadow-xl ${
                  pkg.isPopular 
                    ? "border-sky-505 ring-1 ring-sky-500/50 shadow-lg lg:-translate-y-2 bg-slate-900/90" 
                    : "border-slate-800 shadow-sm"
                }`}
                id={`pkg-card-${pkg.id}`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 border border-blue-500 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1 shadow-md">
                    <Star className="h-3 w-3 fill-white" /> MOST POPULAR CHOICES
                  </span>
                )}

                <div>
                  
                  {/* Header info */}
                  <div className="space-y-2 mb-6 text-center lg:text-left">
                    <span className="rounded bg-slate-950 px-2.5 py-1 text-[10px] font-bold text-sky-400 uppercase tracking-wide inline-block border border-slate-850">
                      {pkg.badge || "Standard setup"}
                    </span>
                    <h3 className="font-display font-black text-2xl text-white block">{pkg.name}</h3>
                    <p className="text-xs text-slate-305 line-clamp-2 min-h-[32px] block">{pkg.tagline}</p>
                  </div>

                  {/* Pricing big tag */}
                  <div className="border-y border-slate-800 py-5 my-5 text-center bg-slate-950/70 rounded-xl">
                    <span className="text-4xl font-extrabold font-display text-white">{pkg.price}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Pricing Setup Standard Investment</span>
                  </div>

                  {/* Benefit specs */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-2.5">Included Services:</span>
                      <ul className="space-y-2">
                        {pkg.services.map((ser, sIdx) => (
                          <li key={sIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-tight">
                            <Check className="h-4 w-4 text-sky-450 flex-shrink-0 mt-0.5" />
                            <span>{ser}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-2">Primary Advantage:</span>
                      <ul className="space-y-1.5 text-[11px] text-slate-400 italic font-sans">
                        {pkg.benefits.map((ben, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1 leading-snug">
                            <span className="text-sky-400 select-none">•</span>
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>

                {/* Call to Actions on cards */}
                <div className="space-y-3 pt-4 border-t border-slate-800 text-center font-sans">
                  <button
                    onClick={handleCta}
                    className={`w-full font-bold text-xs py-3.5 rounded-xl transition-all shadow cursor-pointer ${
                      pkg.isPopular 
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10" 
                        : "bg-slate-950 hover:bg-slate-850 hover:border-slate-705 border border-slate-800 text-white"
                    }`}
                  >
                    Get My Free Business Audit
                  </button>
                  <span className="text-[10px] text-slate-450 block">Or book free call above</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INTERACTIVE SALES ROI CALCULATOR SECTION */}
      <section className="bg-slate-955 text-white py-20 sm:py-24 border-t border-slate-900 relative" id="pricing-roi-calc">
        <div className="absolute top-0 right-0 h-48 w-48 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 font-sans">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
              <Calculator className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block font-sans">Interactive Diagnostic Tool</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Calculate Your Direct Local Marketing ROI
            </h2>
            <p className="text-sm text-slate-350 leading-relaxed max-w-lg mx-auto font-sans">
              Select your specific trade or professional niche below, set your average job invoice value, and see how simple visibility improvements support your monthly booking ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Calculator controls */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
              <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                <Sliders className="h-4.5 w-4.5 text-blue-400" />
                Adjust Your Parameters
              </h3>

              {/* Trade Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">1. Choose Your Industry Focus</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(tradeDefaults).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleTradeChange(key)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                        selectedTrade === key 
                          ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/10" 
                          : "bg-slate-950 border-slate-850 text-slate-450 hover:text-white"
                      }`}
                    >
                      {tradeDefaults[key].shortName || tradeDefaults[key].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Average Job Value slider */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="text-xs font-bold text-slate-300">2. Average Ticket Value per Job</label>
                  <span className="text-sm font-mono font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900/30">
                    ${ticketSize}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={ticketSize}
                  onChange={(e) => setTicketSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>$50</span>
                  <span>$2,500</span>
                  <span>$5,000</span>
                </div>
              </div>

              {/* Additional Jobs slider */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="text-xs font-bold text-slate-300">3. Estimated Extra Monthly Jobs Secured</label>
                  <span className="text-sm font-mono font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900/30">
                    +{additionalJobs} jobs / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={additionalJobs}
                  onChange={(e) => setAdditionalJobs(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-2 italic leading-relaxed">
                  💡 Note: Just 1-2 plumbing leak recoveries, water heater sales, or roof diagnoses pays back our monthly fees.
                </p>
              </div>
            </div>

            {/* Calculations results display block */}
            <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 border border-blue-900/40 p-8 rounded-3xl flex flex-col justify-between">
              
              <div className="space-y-6">
                <span className="text-[10px] font-bold tracking-wider text-sky-400 uppercase bg-blue-950/60 px-2 py-1 rounded inline-block">
                  Estimated Financial Return
                </span>

                <div className="space-y-1">
                  <span className="text-slate-300 text-xs font-semibold block">Total Estimated Added Monthly Revenue</span>
                  <span className="text-5xl font-display font-extrabold text-white tracking-tight">
                    ${estimatedRevenue.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-sky-400 block font-mono">Formula: Job Ticket Amount * monthly saved bookings count</span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                  <div>
                    <span className="text-[10px] text-slate-450 font-bold block mb-0.5 uppercase tracking-wide">Investment cost</span>
                    <span className="text-sm font-bold text-white block">
                      ${growthRetainer} / mo
                    </span>
                    <span className="text-[9px] text-slate-450 block">Growth Retainer cost</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-450 font-bold block mb-0.5 uppercase tracking-wide">ROI Factor</span>
                    <span className="text-sm font-bold text-green-400 block">
                      {roiMultiplier}x return
                    </span>
                    <span className="text-[9px] text-slate-405 block">Compounding profit multipliers</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-850 mt-6 text-center">
                <button
                  onClick={handleCta}
                  className="w-full font-bold text-xs py-4.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get My Free Business Audit</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span className="block text-[10px] text-slate-500 mt-2.5">
                  Calculate and customize your 1-Page proposal inside our client dashboard
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
