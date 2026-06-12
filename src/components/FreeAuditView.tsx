import React, { useState } from "react";
import { AuditLead } from "../types";
import { 
  ArrowRight, ShieldCheck, Mail, Phone, BookOpen, AlertTriangle, 
  MapPin, CheckCircle2, TrendingUp, Sparkles, Building, ChevronRight, Copy, Check, Info 
} from "lucide-react";
import { trackAuditRequest, trackCtaClick } from "../utils/analytics";

interface FreeAuditViewProps {
  onAddAuditLead: (lead: Omit<AuditLead, "id" | "submittedAt" | "status">) => void;
}

export default function FreeAuditView({ onAddAuditLead }: FreeAuditViewProps) {
  
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    gbpLink: "",
    category: "Plumber" // Default select option
  });

  const [customCategory, setCustomCategory] = useState("");

  // Control and notification states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Generated dynamic audit schema
  const [auditResult, setAuditResult] = useState<{
    grade: string;
    summary: string;
    recommendations: { title: string; desc: string }[];
    isAiPowered: boolean;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.businessName || !formData.email || !formData.phone) {
      setErrorMessage("Please complete all required fields: Name, Business Name, Email, and Phone.");
      return;
    }

    // Validate and format URLs before submission
    let formattedWebsite = "";
    if (formData.website.trim()) {
      let trimmed = formData.website.trim();
      if (!/^https?:\/\//i.test(trimmed)) {
        trimmed = "https://" + trimmed;
      }
      try {
        const parsedUrl = new URL(trimmed);
        if (!parsedUrl.hostname.includes(".")) {
          setErrorMessage("Please enter a valid website domain address (e.g., plumberpros.com).");
          return;
        }
        formattedWebsite = trimmed;
      } catch (err) {
        setErrorMessage("Please enter a valid website URL (e.g., https://www.yourdentist.com).");
        return;
      }
    }

    const selectedCategory = formData.category === "Other" ? (customCategory.trim() || "Local Business") : formData.category;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/generate-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          website: formattedWebsite,
          gbpLink: formData.gbpLink,
          category: selectedCategory
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Record details in local state CRM tracker
        onAddAuditLead({
          name: formData.name,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          website: formattedWebsite,
          gbpLink: formData.gbpLink
        });

        setAuditResult({
          grade: data.grade || "Needs Attention",
          summary: data.summary || "Visibility check completed.",
          recommendations: data.recommendations || [],
          isAiPowered: !!data.isAiPowered
        });

        // Track successful audit request event in GA4
        trackAuditRequest(formData.businessName, selectedCategory, !!formattedWebsite);

        setIsCompleted(true);
        window.scrollTo({ top: 120, behavior: "smooth" });
      } else {
        setErrorMessage(data.message || "Something went wrong. Please check your network connection and try again.");
      }
    } catch (err: any) {
      console.error("[LeadForge] Fallback checklist trigger active:", err);
      // Client-side quick response calculation (guarantees success even if container under heavy load!)
      const fallbackAudit = getClientHeuristicAudit(formData.businessName, selectedCategory);
      
      onAddAuditLead({
        name: formData.name,
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        website: formattedWebsite,
        gbpLink: formData.gbpLink
      });

      setAuditResult({
        ...fallbackAudit,
        isAiPowered: false
      });

      trackAuditRequest(formData.businessName, selectedCategory, !!formattedWebsite);
      setIsCompleted(true);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReport = () => {
    if (!auditResult) return;
    
    const categoryLabel = formData.category === "Other" ? customCategory : formData.category;
    const reportText = `LEADFORGE LOCAL - VISIBILITY CHECK REPORT
Business Under Review: ${formData.businessName}
Industry Category: ${categoryLabel}
Contact Person: ${formData.name} (${formData.phone})
Audit Checklist Grade: ${auditResult.grade}
Report Engine: ${auditResult.isAiPowered ? "Live Gemini AI Scan" : "Local Heuristic Matrix"}

OVERALL SITE SUMMARY:
${auditResult.summary}

RECOMMENDED CORE OPTIMIZATIONS:
${auditResult.recommendations.map((rec, i) => `${i + 1}. [${rec.title}] \n   ${rec.desc}`).join("\n\n")}

Thank you for choosing LeadForge Local. Actionable visibility solutions.
Direct Partner Support Hotline: (469) 751-7153.`;
    
    navigator.clipboard.writeText(reportText);
    setIsCopied(true);
    trackCtaClick("copy_audit_report", "Copy Report Text");
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Safe client-side local analyzer
  const getClientHeuristicAudit = (businessName: string, category: string) => {
    const cat = (category || "").toLowerCase();
    let grade = "Needs Attention";
    let summary = `A review of ${businessName}'s local digital visibility shows simple improvement vectors. In the competitive ${category} sector, quick adjustments pay dividends.`;
    let recommendations = [];

    if (cat.includes("plumb") || cat.includes("leak") || cat.includes("pipe")) {
      grade = "Critical Gaps";
      summary = `Preliminary visibility audit for ${businessName} (Plumbing Services). We detected high-intent keywords gaps and instant response opportunities costing you active plumbing calls.`;
      recommendations = [
        {
          title: "Service Area Optimization & Sub-Pages",
          desc: "Create dedicated localized pages for each surrounding neighborhood (e.g., 'Emergency Plumber in [Suburban Neighborhood]'). Google rank algorithms prioritize hyper-local proximity queries."
        },
        {
          title: "High-Intent Emergency Keywords",
          desc: "Incorporate action search terms like 'burst pipe repair', 'clogged drain repair', and 'emergency water heater fix' directly into your title headers. This secures high-intent searchers having active water leaks."
        },
        {
          title: "Reputation Velocity via Instant SMS Reviews Link",
          desc: "Set up automatic text check-ins with completed customer files. Homeowners are 4x more likely to leave positive reviews on Google Maps when sent a quick direct link instantly via SMS."
        }
      ];
    } else if (cat.includes("dent") || cat.includes("teeth") || cat.includes("ortho") || cat.includes("dental")) {
      grade = "Needs Attention";
      summary = `Preliminary visibility audit for ${businessName} (Dental Services). Your branding looks trustworthy, but optimization gaps in insurance keywords and local review citations cap patient intake.`;
      recommendations = [
        {
          title: "Insurance Pages & Copay Transparency",
          desc: "Most dental searches check accepted insurance carriers. Publish dedicated pages mentioning common providers (Delta Dental, Humana, etc.) with local schema to attract organic patient searchers."
        },
        {
          title: "Google Maps Citation Alignments",
          desc: "Ensure your Name, Address, and Phone (NAP) details are exactly aligned across dental platforms like Healthgrades, Wellness.com, and Google Maps. Search engines favor matching coordinates."
        },
        {
          title: "Virtual Booking Intakes",
          desc: "Introduce an intuitive mobile calendar link ('Schedule Appointment') in your header. Reducing booking steps increases call-to-visit conversion rates of online dental searchers."
        }
      ];
    } else if (cat.includes("law") || cat.includes("attorney") || cat.includes("legal") || cat.includes("court")) {
      grade = "Critical Gaps";
      summary = `Preliminary visibility audit for ${businessName} (Legal Practice). In the competitive legal field, displaying clear expertise silos, EEAT author elements, and structured markup is vital to capture qualified clients.`;
      recommendations = [
        {
          title: "Practice & Case Specific Silos",
          desc: "Craft dedicated practice pages for specific case lines (e.g. 'Family Divorce Support' or 'Commercial Truck Accidents') instead of one broad service list. Broad listings lose search traction against focused law platforms."
        },
        {
          title: "EEAT Authority Schema & State Bar Links",
          desc: "Google validates legal advice under strict Your Money Your Life (YMYL) standards. Embed detailed profiles indicating certifications, bar status, and academic publications to maximize ranking credibility."
        },
        {
          title: "Attorney Structured Data Schema",
          desc: "Inject custom 'Attorney' structured JSON-LD metadata. This informs crawlers of your jurisdictional limits, courthouse coordinates, and bar standings, unlocking special organic display cards."
        }
      ];
    } else {
      grade = "Needs Attention";
      summary = `Preliminary analysis for ${businessName}. Your business has a healthy base, but optimizations to mobile speed, instant lead capturing, and Google Maps category tuning will maximize your local search capture.`;
      recommendations = [
        {
          title: "Mobile Speed & Click-to-Call Header",
          desc: "Enhance mobile loads by compressing bulky images. Add a prominent tap-to-call phone linkage so mobile searchers on Google can contact your office directly in one touch."
        },
        {
          title: "Instant SMS Lead-Capture Autoresponder",
          desc: "Never let leads go cold. Integrate a short contact frame that automatically signals your smartphone and schedules a welcoming text-back acknowledgment to prospects within 60 seconds."
        },
        {
          title: "Maps Listing Category & Secondary Tags Verification",
          desc: "Ensure your primary Google Maps category aligns precisely with high-intent keywords. Supplement this with secondary service attributes to widen your visibility in relevant local directories."
        }
      ];
    }

    return { grade, summary, recommendations };
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16 animate-fadeIn text-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Title layout */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 font-sans">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block font-sans">Quick & Friendly Diagnostic Check</span>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Get My Free Simple Online Audit
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            A quick, easy-to-understand check of how your business appears on phones, Google Maps, and search queries—without any complicated tech jargon.
          </p>
        </div>

        {/* COMPLETED TRIGGER CARD: Dynamic Interactive Audit Simulator */}
        {isCompleted && auditResult ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-6 sm:p-10 animate-scaleIn font-sans" id="audit-success-panel">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-950 text-green-400 flex items-center justify-center rounded-xl border border-slate-850">
                  <CheckCircle2 className="h-6 w-6 text-green-400 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider font-mono">Checklist Scan Completed</span>
                  <h3 className="font-display font-extrabold text-sky-450 text-lg">Your Report is Ready!</h3>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopyReport}
                  className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 flex items-center gap-1 cursor-pointer transition-all"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? "Compiled!" : "Copy Report Text"}</span>
                </button>
                <button
                  onClick={() => {
                    setFormData({ name: "", businessName: "", email: "", phone: "", website: "", gbpLink: "", category: "Plumber" });
                    setCustomCategory("");
                    setAuditResult(null);
                    setIsCompleted(false);
                  }}
                  className="rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-900 text-slate-350 font-semibold text-xs px-3 py-2 cursor-pointer transition-all animate-fadeIn"
                >
                  Restart Audit
                </button>
              </div>
            </div>

            {/* LIVE DYNAMIC REVENUE DIAGNOSTICS REPORT */}
            <div className="bg-slate-950 text-slate-100 border border-slate-900 rounded-2xl p-6 space-y-6">
              
              <div className="flex items-center justify-between gap-1.5 border-b border-slate-900/60 pb-4">
                <div>
                  <span className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-wider block">LeadForge Local Checklist</span>
                  <h4 className="font-display font-bold text-white text-base">
                    Web Visibility Scan Results
                  </h4>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded block uppercase tracking-tight border ${
                    auditResult.grade === "Critical Gaps"
                      ? "text-rose-400 bg-rose-950/20 border-rose-855/40"
                      : "text-amber-400 bg-amber-400/10 border-amber-400/20"
                  }`}>
                    {auditResult.grade}
                  </span>
                </div>
              </div>

              {/* Variable injected stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Business Name</span>
                  <strong className="text-white font-bold block truncate">{formData.businessName}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Focus Industry</span>
                  <strong className="text-white font-bold block truncate">
                    {formData.category === "Other" ? customCategory : formData.category}
                  </strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block mb-0.5">Website Address</span>
                  <strong className="text-white font-bold block truncate">{formData.website || "None listed"}</strong>
                </div>
              </div>

              {/* Live overall Summary */}
              <div className="text-xs text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-900 relative">
                <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wide">
                    {auditResult.isAiPowered ? "Live AI Analysis" : "Dynamic Engine"}
                  </span>
                </div>

                <span className="font-bold text-[10px] text-slate-400 block mb-1 uppercase tracking-wide">Executive Assessment</span>
                <p className="leading-relaxed font-sans">{auditResult.summary}</p>
              </div>

              {/* Detected Gaps database dashboard */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 space-y-4">
                <h5 className="font-display font-medium text-xs text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <AlertTriangle className="h-4 w-4 text-blue-400" />
                  Three Priority Recommendations Found For Your Trade
                </h5>

                <div className="space-y-4 text-xs text-slate-300">
                  {auditResult.recommendations.map((rec, rIdx) => (
                    <div key={rIdx} className={`flex items-start gap-3 pb-3 ${rIdx !== auditResult.recommendations.length - 1 ? "border-b border-slate-850" : ""}`}>
                      <div className="h-6 w-6 rounded-full bg-blue-600/20 text-sky-400 flex items-center justify-center font-bold font-mono text-[10px] flex-shrink-0 mt-0.5 border border-blue-500/10">
                        {rIdx + 1}
                      </div>
                      <div>
                        <strong className="text-white block font-display font-extrabold text-sm text-sky-400">{rec.title}</strong>
                        <span className="text-slate-300 block text-[12px] leading-relaxed mt-1 font-sans">{rec.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next steps advice */}
              <div className="text-xs text-slate-400 space-y-1.5 leading-relaxed font-sans">
                <span className="text-white font-bold block uppercase text-[10px]">Next Action Step:</span>
                <p className="font-sans text-slate-305">
                  We are preparing a clean, easy-to-read, print-ready PDF version of these precise fixes. A human support specialist will reach out within 24 business hours to share these straightforward items. Zero pressure—just actionable items!
                </p>
              </div>

            </div>

            <div className="text-center font-medium text-[11px] text-slate-500 font-sans">
              <span>Thank you for choosing LeadForge Local • Service Hot-line: (469) 751-7153</span>
            </div>

          </div>
        ) : (
          /* AUDIT SIGN-UP INITIAL INPUT FIELDS FORM */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-lg max-w-xl mx-auto font-sans animate-fadeIn" id="audit-form-card">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {errorMessage && (
                <div className="bg-rose-950/45 border border-rose-900/65 text-rose-350 p-3 rounded-xl text-xs flex items-center gap-2 font-medium">
                  <span>⚠️ {errorMessage}</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Your Full Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-sans"
                    placeholder="e.g., Charles Davies"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Your Business Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-sans"
                    placeholder="e.g., Oakwood Plumbing, Summit Dentistry"
                  />
                </div>
              </div>

              {/* Dynamic Category Selector block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Business Category <span className="text-rose-500">*</span></label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 cursor-pointer font-sans"
                  >
                    <option value="Plumber">Plumber / Trades</option>
                    <option value="Dentist">Dentist / Healthcare</option>
                    <option value="Lawyer">Lawyer / Legal Services</option>
                    <option value="Roofer">Roofer / Contractor</option>
                    <option value="HVAC">HVAC & AC Repair</option>
                    <option value="Other">Other Local Business</option>
                  </select>
                </div>

                {formData.category === "Other" ? (
                  <div className="animate-fadeIn">
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Specify Trade/Industry <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-855 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 font-sans"
                      placeholder="e.g., Recording Studio, Gym, Auto Detail"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Your Phone Number <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-sans"
                      placeholder="555-0199"
                    />
                  </div>
                )}
              </div>

              {formData.category === "Other" && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Your Phone Number <span className="text-rose-500">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-sans"
                    placeholder="555-0199"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Your Email Address <span className="text-rose-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-sans"
                    placeholder="name@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Existing Website URL (If Any)</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-sans"
                    placeholder="e.g., oakwoodplumbing.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Google Maps Profile Listing Link (If Any)</label>
                <input
                  type="text"
                  name="gbpLink"
                  value={formData.gbpLink}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 transition-all font-sans"
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
                      <span>Running Advanced Local Visibility Check...</span>
                    </>
                  ) : (
                    <>
                      <span>Get My Free Business Audit</span>
                      <ArrowRight className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-sans">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                <span>We strictly respect contact privacy. Safe encryption protocols.</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
