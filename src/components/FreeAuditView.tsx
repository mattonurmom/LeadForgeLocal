import React, { useState } from "react";
import { AuditLead } from "../types";
import { 
  ArrowRight, ShieldCheck, Mail, Phone, BookOpen, AlertTriangle, 
  MapPin, CheckCircle2, TrendingUp, Sparkles, Building, ChevronRight, Copy, Check 
} from "lucide-react";

interface FreeAuditViewProps {
  onAddAuditLead: (lead: Omit<AuditLead, "id" | "submittedAt" | "status">) => void;
}

export default function FreeAuditView({ onAddAuditLead }: FreeAuditViewProps) {
  
  // Form values
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    gbpLink: ""
  });

  // Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.businessName || !formData.email || !formData.phone) {
      alert("Please enter Name, Business Name, Email, and Phone number.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate smart backend processing
    setTimeout(() => {
      onAddAuditLead({
        name: formData.name,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        gbpLink: formData.gbpLink
      });
      setIsSubmitting(false);
      setIsCompleted(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }, 1500);
  };

  const handleCopyReport = () => {
    const mockReport = `LEADFORGE LOCAL - VISIBILITY CHECK REPORT
Business Under Review: ${formData.businessName}
Target Phone Contact: ${formData.phone}
Email Address: ${formData.email}
Initial Checklist Grade: Needs Attention (Found areas for simple improvements)
Priority Discoveries:
- Smart-Phone Design: The website can be simplified to make it faster for mobile callers.
- Missed Call Follow-up: Lacking a fast automated reply message to capture missed calls.
- Google Maps Search: Minor profile changes can help local customers find you much quicker.`;
    
    navigator.clipboard.writeText(mockReport);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16 animate-fadeIn text-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Title layout */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Quick & Friendly Diagnostic Check</span>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Get My Free Simple Online Audit
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            A quick, easy-to-understand check of how your business appears on phones, Google Maps, and search queries—without any complicated tech jargon.
          </p>
        </div>

        {/* COMPLETED TRIGGER CARD: Dynamic Interactive Audit Simulator */}
        {isCompleted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6 sm:p-10" id="audit-success-panel">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-950 text-green-400 flex items-center justify-center rounded-xl border border-slate-800">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Acquisition Received</span>
                  <h3 className="font-display font-extrabold text-[#0E7490] text-lg">Diagnostics Queue Secured!</h3>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopyReport}
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? "Markdown Copied!" : "Copy Report Text"}</span>
                </button>
                <button
                  onClick={() => {
                    setFormData({ name: "", businessName: "", email: "", phone: "", website: "", gbpLink: "" });
                    setIsCompleted(false);
                  }}
                  className="rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-350 font-semibold text-xs px-3 py-2 cursor-pointer transition-colors"
                >
                  Restart Flow
                </button>
              </div>
            </div>

            {/* LIVE SIMULATED REVENUE DIAGNOSTICS REPORT */}
            <div className="bg-slate-950 text-slate-100 border border-slate-900 rounded-2xl p-6 space-y-6">
              
              <div className="flex items-center justify-between gap-1.5 border-b border-slate-900 pb-4">
                <div>
                  <span className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-wider block font-semibold">LeadForge Local Checklist</span>
                  <h4 className="font-display font-bold text-white text-base">
                    Your Web Visibility Preliminary Scan
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded block uppercase tracking-tight">Needs Attention</span>
                </div>
              </div>

              {/* Variable injected stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Business Name</span>
                  <strong className="text-white font-bold block truncate">{formData.businessName}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Owner Contact</span>
                  <strong className="text-white font-bold block truncate">{formData.name} ({formData.phone})</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Website Address</span>
                  <strong className="text-white font-bold block truncate">{formData.website || "None listed"}</strong>
                </div>
              </div>

              {/* Detected Leaks dashboard */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-3">
                <h5 className="font-display font-medium text-xs text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Three Simple Recommendations Found
                </h5>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2 border-b border-slate-850 pb-2">
                    <span className="h-5 w-5 bg-amber-950/40 text-amber-400 rounded flex items-center justify-center font-bold font-mono text-[10px] flex-shrink-0">💡</span>
                    <div>
                      <strong className="text-amber-400 block font-semibold">Smartphone Slowdown</strong>
                      <span className="text-slate-400 block text-[11px]">Your website is a bit heavy, which can make it load slowly on mobile phones. Making it simpler will help keep visitors on the page.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-b border-slate-850 pb-2">
                    <span className="h-5 w-5 bg-amber-950/40 text-amber-400 rounded flex items-center justify-center font-bold font-mono text-[10px] flex-shrink-0">💡</span>
                    <div>
                      <strong className="text-amber-400 block font-semibold font-bold">Unanswered Phone Line Leak</strong>
                      <span className="text-slate-400 block text-[11px]">If someone calls when you're in a middle of a session or job site, they might hang up and try the next listing. Adding a simple automated SMS text back will secure these clients immediately.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="h-5 w-5 bg-amber-950/40 text-amber-400 rounded flex items-center justify-center font-bold font-mono text-[10px] flex-shrink-0">💡</span>
                    <div>
                      <strong className="text-amber-400 block font-semibold">Google Maps Ranking Booster</strong>
                      <span className="text-slate-400 block text-[11px]">With minor updates to your business descriptions and category labels, you can show up higher when people nearby search Google Maps.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next steps advice */}
              <div className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <span className="text-white font-bold block uppercase text-[10px]">What happens next:</span>
                <p>
                  We are preparing a clean, easy-to-read, one-page guide with clear instructions. We will reach out within 24 hours to hand you these straightforward action items. No pushy sales pitch—just practical pointers!
                </p>
              </div>

            </div>

            <div className="text-center font-medium text-xs text-slate-500">
              <span>Thank you for choosing LeadForge Local.</span>
            </div>

          </div>
        ) : (
          /* AUDIT SIGN-UP INITIAL INPUT FIELDS FORM */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-lg max-w-xl mx-auto" id="audit-form-card">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Full Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Charles Davies"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Business / Practice / Restaurant Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Summit Dental Care, Oakwood Law, Cafe Milano"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address <span className="text-rose-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="name@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Operating Mobile Phone <span className="text-rose-500">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="555-0199"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Existing Website Address (If Any)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="www.summitbuilders.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Google Business Profile Listing Link (If Any)</label>
                <input
                  type="text"
                  name="gbpLink"
                  value={formData.gbpLink}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="https://maps.google.com/?cid=..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-extrabold text-xs tracking-wider py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-75 cursor-wait" : ""
                  }`}
                  id="submit-audit-form-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="h-4.5 w-4.5 animate-spin" />
                      <span>PREPARING YOUR VISIBILITY HIGHLIGHTS...</span>
                    </>
                  ) : (
                    <>
                      <span>GET MY FREE SIMPLE AUDIT PLAN</span>
                      <ArrowRight className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                <span>We strictly respect contact privacy. No spam. Secure encryption protocols.</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
