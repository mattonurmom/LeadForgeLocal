import React from "react";
import { ShieldCheck, FileText, Scale } from "lucide-react";

interface TermsViewProps {
  setTab: (tab: string) => void;
}

export default function TermsView({ setTab }: TermsViewProps) {
  const handleContactCta = () => {
    setTab("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="animate-fadeIn bg-slate-950 text-slate-100 min-h-screen">
      
      {/* Header section */}
      <section className="bg-slate-900 py-16 sm:py-20 border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-sky-400 border border-blue-500/20">
            <Scale className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block font-mono">legal framework</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Service Terms & Agreement
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Last Updated: June 11, 2026
          </p>
        </div>
      </section>

      {/* Content section */}
      <section className="py-16 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10 text-slate-300">
          
          <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-extrabold text-sm mb-1">Standard Operational Framework</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Welcome to LeadForge Local. These Terms of Service ("Agreement") govern your access to and use of our digital visibility, citation design, and local lead automation services. Having service parameters drafted ensures smooth partnership execution.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-sm">
            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">1. Purpose and Scope of Services</h2>
              <p className="leading-relaxed">
                LeadForge Local, operated by Matthew & Heather Eisan, provides specialized online optimization, including local landing pages, map citation enhancements, and missed-call text fallback automation setups. All services are aimed at bolstering small brand local prominence.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">2. No Guaranteed Results Disclaimer</h2>
              <p className="leading-relaxed text-slate-400 italic">
                You acknowledge and agree that LeadForge Local does not guarantee specific listings ranks, direct conversion levels, or volume metrics. Small business marketing relies upon complex algorithms and localized market criteria that evolve independently.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">3. Pricing & Month-To-Month Retainers</h2>
              <p className="leading-relaxed">
                All scheduled ongoing systems or campaign services operate under a flexible month-to-month schedule with no long term binding lock-ins. Cancellation requests require ten (10) business days written communication notice prior to subsequent auto-renewal cycles.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">4. Intellectual Property Rights</h2>
              <p className="leading-relaxed">
                Until final payments are satisfied, active creative assets, optimization structures, and proprietary responsive templates belong to LeadForge Local. Once completed, standard deployment licenses transfer entirely to your operations control.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">5. Mutual Trust and Cooperation</h2>
              <p className="leading-relaxed">
                Delivering highly optimized local visibility requires reliable client information and prompt assets verification (Google Business pins, address details, trade licenses). Delays in credential provisions may suspend campaign timelines.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 text-center space-y-4">
            <p className="text-xs text-slate-500">
              For administrative inquiries, formal drafts submission, or physical contract definitions, please contact Heather or Matthew.
            </p>
            <button
              onClick={handleContactCta}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-850 px-5 py-2.5 text-xs font-bold text-white border border-slate-800 transition-colors"
            >
              <FileText className="h-4 w-4 text-sky-400" />
              <span>Contact Owner Desk</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
