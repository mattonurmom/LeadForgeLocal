import React from "react";
import { PACKAGES } from "../data";
import { Check, Star } from "lucide-react";

interface PricingViewProps {
  setTab: (tab: string) => void;
}

export default function PricingView({ setTab }: PricingViewProps) {
  
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

    </div>
  );
}
