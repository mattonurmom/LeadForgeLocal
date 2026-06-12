import React from "react";
import { ShieldAlert, Fingerprint, Lock } from "lucide-react";

interface PrivacyViewProps {
  setTab: (tab: string) => void;
}

export default function PrivacyView({ setTab }: PrivacyViewProps) {
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
            <Fingerprint className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block font-mono">data security guidelines</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Privacy Policy & Protection
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
              <Lock className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-extrabold text-sm mb-1">Our Data Pledge</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The privacy of our trade partners and their clients is a cornerstone of our service model. We protect contractor details and lead outreach databases with absolute security. We never sell, lease, or rent customer information to third-party brokers.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-sm">
            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">1. Information We Collect</h2>
              <p className="leading-relaxed">
                When requesting free audits or utilizing lead-capture systems, we accumulate basic identifier fields (such as representative names, billing email addresses, physical office phone lines, and active service domains).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">2. How We Apply Your Data</h2>
              <p className="leading-relaxed">
                Client metrics and captured local inquiries are applied exclusively to run the responsive missed-call SMS system, coordinate Google Business listing updates, draft localized trade websites, and track incoming business leads.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">3. Third-Party Integrations Support</h2>
              <p className="leading-relaxed text-slate-400">
                To power automated instant notifications and geographic mapping accuracy, physical details synch via secure APIs to services including Google Platform maps, twilio SMS channels, and secure hosting centers. All data flows remain locked behind specialized keys.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">4. Secure Access Control & Passcodes</h2>
              <p className="leading-relaxed">
                Lead databases are strictly sandboxed behind secure login and restricted access locks. Admin credentials (such as verification passcodes) are kept safe, and are not declared publicly on site indexes or client-side assets to secure absolute privacy control.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-bold text-lg font-display">5. Opt-Out and Deletion Controls</h2>
              <p className="leading-relaxed">
                Should you wish to close your administrative account, clean historic lead databases from active instances, or deactivate missed-call SMS loops, please communicate direct requests to Heather or Matthew Tucker.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 text-center space-y-4">
            <p className="text-xs text-slate-500">
              For any concerns regarding details retention or security setups, we are fully committed to quick updates.
            </p>
            <button
              onClick={handleContactCta}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-850 px-5 py-2.5 text-xs font-bold text-white border border-slate-800 transition-colors"
            >
              <ShieldAlert className="h-4 w-4 text-sky-400" />
              <span>Contact Privacy Officer</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
