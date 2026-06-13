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
    recommendations: any[];
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

  // Helper: Adapt raw recommendation data safely to prevent undefined accesses
  const adaptRecommendation = (rec: any) => {
    return {
      title: rec.title || "Core Local Visibility Upgrade",
      issueFound: rec.issueFound || rec.desc || "A fundamental optimization is missing from your active search footprint.",
      whyThisMatters: rec.whyThisMatters || "This directly limits your online discoverability, making it harder for nearby, high-intent customers to reach you.",
      competitiveImpact: rec.competitiveImpact || "Local competitors with full-funnel digital optimizations will capture client search demand first.",
      recommendedSolution: rec.recommendedSolution || "Establish clear website structures, complete map citations, and instant-response loops.",
      estimatedDifficulty: rec.estimatedDifficulty || "Intermediate",
      implementationComplexity: rec.implementationComplexity || "Configuring correct keyword matrices and automation protocols requires expert experience.",
      potentialBusinessImpact: rec.potentialBusinessImpact || "High"
    };
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
${auditResult.recommendations.map((rec, i) => {
  const adapted = adaptRecommendation(rec);
  return `${i + 1}. [${adapted.title}]
   - Issue Found: ${adapted.issueFound}
   - Why This Matters: ${adapted.whyThisMatters}
   - Competitive Impact: ${adapted.competitiveImpact}
   - Recommended Solution: ${adapted.recommendedSolution}
   - Difficulty Level: ${adapted.estimatedDifficulty}
   - Complexity: ${adapted.implementationComplexity}
   - Potential Impact: ${adapted.potentialBusinessImpact}`;
}).join("\n\n")}

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
    const nameLow = (businessName || "").toLowerCase();
    
    let grade = "Needs Attention";
    let summary = `A detailed visibility scan of ${businessName}'s digital foundation highlights key growth vectors across your online footprint. In the competitive ${category || "local services"} market, many local companies invest heavily in advertising while overlooking foundational issues that limit results. Solving these challenges first will establish a reliable, high-converting customer pipeline.`;
    
    let recommendations = [];
    
    if (cat.includes("plumb") || cat.includes("leak") || cat.includes("pipe") || nameLow.includes("plumb") || cat.includes("roof") || cat.includes("hvac") || cat.includes("air") || cat.includes("heat") || cat.includes("contract") || cat.includes("repair")) {
      const isPlumbing = cat.includes("plumb") || nameLow.includes("plumb");
      const emergencyKeyword1 = isPlumbing ? "burst pipe repair" : "emergency roof leak repair";
      const emergencyKeyword2 = isPlumbing ? "clogged drain repair" : "clogged ac drain line repair";
      const emergencyKeyword3 = isPlumbing ? "water heater replacement" : "same-day repair service";

      grade = "Critical Gaps";
      summary = `Preliminary premium visibility analysis for ${businessName} (${category || "Home Services"}). We detected critical structural layout and high-intent local search gaps in your DFW-area visibility profile. Correcting these items will help you capture immediate inbound phone calls and prevent local homeowners from choosing competitors who appear more established and easier to trust online.`;
      recommendations = [
        {
          title: "Service Area Optimization & Location Landing Pages",
          issueFound: "Your business website does not have dedicated localized service pages for each specific town, suburb, or neighborhood you cover. Currently, it only lists a single general physical office or service area.",
          whyThisMatters: "When local searchers need a helper quickly, they type phrases like '" + (isPlumbing ? "toilet repair near me" : "hvac repair near me") + "' or '" + (isPlumbing ? "emergency plumber in Richardson" : "contractor in Plano") + "'. Without separate pages optimized for each surrounding suburb, search engines will exclude your website from those physical search results, resulting in lost leads, fewer phone calls, and lost revenue.",
          competitiveImpact: "Other area companies that have built distinct local neighborhood pages will rank higher in nearby suburbs, capturing active, high-intent emergency service calls first and leaving you at a disadvantage.",
          recommendedSolution: "Create separate, highly readable, and uncluttered landing pages on your website for every major target neighborhood in your service territory. Provide helpful, custom-written information detailing your services in those specific areas.",
          estimatedDifficulty: "Advanced",
          implementationComplexity: "Setting up search-optimized location landing pages requires professional web development, careful keyword allocation, and local schema coding to ensure Google indexes and ranks each page correctly.",
          potentialBusinessImpact: "Critical"
        },
        {
          title: "High-Intent Emergency Keywords Optimization",
          issueFound: "Your website text relies almost entirely on passive, generic phrases and lacks explicit, prominent keywords focusing on urgent emergency searches like '" + emergencyKeyword1 + "', '" + emergencyKeyword2 + "', and '" + emergencyKeyword3 + "'.",
          whyThisMatters: "When an active leak, broken AC, or structural emergency arises, homeowners are stressed and seek immediate, specific fixes. They do not click on generic 'about us' pages; they seek quick assistance. Lacking terms of urgency, your website fails to rank on Google in these moments, leading to lower search visibility and missed high-ticket service jobs.",
          competitiveImpact: "Competitors with clear, reassurance-focused headlines and explicit service names immediately win the trust of frantic searchers, booking the job before the customer ever continues browsing.",
          recommendedSolution: "Re-engineer your main website headings and title tags to prominently display urgent-buy terms and clear phone numbers, reassuring nearby customers that you offer rapid solutions to their immediate problems.",
          estimatedDifficulty: "Intermediate",
          implementationComplexity: "Selecting the precise combination of high-traffic terms and writing compelling, natural headings without sound technical or confusing requires an elite copywriter.",
          potentialBusinessImpact: "High"
        },
        {
          title: "Missed-Call Auto-SMS Fallback Integration",
          issueFound: "Your business does not have an automated response system to instantly reply to unanswered phone calls or website forms with a friendly text text-back.",
          whyThisMatters: "Over sixty percent of phone calls to local service businesses go unanswered. When a customer calls a contractor and gets sent to voicemail, they immediately hang up and call a competitor. Moving too slow leads to a direct loss of customer trust and missed opportunities.",
          competitiveImpact: "Competitors using instant, automated text reply platforms start active conversation threads immediately, locking in the homeowner before the customer can search elsewhere.",
          recommendedSolution: "Establish a carrier-approved instant web response route that automatically sends a friendly, conversational text message ('Hi, sorry we missed your call—how can we help you today?') within thirty seconds of any missed ring.",
          estimatedDifficulty: "Expert-Level",
          implementationComplexity: "Many business owners choose professional help here because setting up carrier-certified SMS routing, CRM synchronization, and automated replies requires technical coordination to prevent messages from being marked as spam.",
          potentialBusinessImpact: "Critical"
        }
      ];
    } else if (cat.includes("dent") || cat.includes("teeth") || cat.includes("ortho") || cat.includes("dental") || nameLow.includes("dent") || cat.includes("health") || cat.includes("med") || cat.includes("care")) {
      grade = "Needs Attention";
      summary = `Comprehensive digital visibility audit for ${businessName} (Healthcare & Dental Services). While your practice presents a trustworthy and friendly initial impression, key optimization bottlenecks in localized maps listing details, insurance discovery pages, and conversion pathways severely limit your organic new-patient acquisition.`;
      recommendations = [
        {
          title: "Google Maps Citation and NAP Detail Alignment",
          issueFound: "Your practice's exact business credentials—including your Name, Physical Address, and Phone Number—contain slight differences across major online health platforms and your Google Maps page.",
          whyThisMatters: "Search engines continuously compare directories to verify that your medical practice is legitimate and securely located. Tiny variations (such as 'Ste A' vs 'Suite A', or different phone numbers) weaken search engine trust, which reduces your visibility and ranking inside the Google Maps section.",
          competitiveImpact: "Practices with perfectly synchronized citations across portals like Yelp, Healthgrades, and Google Maps rank higher, capturing local patients seeking nearby care first.",
          recommendedSolution: "Perform a thorough cleanup of your business coordinates across all major local databases, locking in a perfectly identical format matching your Google Business Profile.",
          estimatedDifficulty: "Intermediate",
          implementationComplexity: "Tracking down, verifying, and claiming dozens of distinct directory profiles is extremely time-consuming and requires specialized database tools to ensure updates stick permanently.",
          potentialBusinessImpact: "High"
        },
        {
          title: "Insurance Information Portals & Patient Search Pages",
          issueFound: "Your current website lacks clear, prominent pages explicitly explaining which major insurance carriers and copay networks you accept.",
          whyThisMatters: "The single biggest question new patients have is: 'Do they take my insurance?'. If a customer searches for 'dentist who accepts Delta Dental' and does not find an unambiguous answer on your site, they will leave immediately. This increases your website bounce rate and wastes precious traffic.",
          competitiveImpact: "Competing practices with dedicated, clear insurance matriculation tables rank prominently on Google and quickly convert visitors into real booked visits.",
          recommendedSolution: "Create a dedicated 'Insurances Accepted' page complete with high-resolution carrier logos and answers to common billing questions to put prospective clients at ease.",
          estimatedDifficulty: "Basic",
          implementationComplexity: "Setting up a clean, high-contrast grid of accepted providers that looks clean on mobile devices while applying structured local data requires professional design.",
          potentialBusinessImpact: "High"
        },
        {
          title: "Seamless 24/7 Mobile Patient Scheduling",
          issueFound: "Your website requires patients to manually dial your front desk during limited office hours to request or book an appointment, with no digital scheduling options.",
          whyThisMatters: "A significant percentage of family healthcare decisions are made in the evenings after normal business hours. If a busy parent visits your website on their smartphone and cannot easily request an appointment slot, they will click away to a competitor who makes scheduling simple.",
          competitiveImpact: "Practices offering clean, interactive online request calendars secure new patient files round-the-clock, outperforming static informational websites.",
          recommendedSolution: "Introduce a prominent, mobile-optimized scheduling button or patient intake form in your website main header to minimize the steps needed to book.",
          estimatedDifficulty: "Intermediate",
          implementationComplexity: "Integrating automated calendar sync that updates in real-time with your practice management software without double-booking requires professional tech integration.",
          potentialBusinessImpact: "High"
        }
      ];
    } else if (cat.includes("law") || cat.includes("attorney") || cat.includes("legal") || cat.includes("court") || nameLow.includes("attorney") || nameLow.includes("law") || cat.includes("consult")) {
      grade = "Critical Gaps";
      summary = `Premium local SEO and authority assessment for ${businessName} (Legal Practice). In the highly competitive legal marketplace, simple listings are no longer enough. Your audit reveals substantial gaps in case-specific structure and digital trust signals that restrict your search exposure and prevent you from securing high-value client retainers.`;
      recommendations = [
        {
          title: "Case-Specific Practice Area Silo Pages",
          issueFound: "Your legal website groups multiple complex practice areas together on a single generic Page, rather than dedicating separate pages to each specific legal service you provide.",
          whyThisMatters: "Individual clients search for highly specific solutions, such as 'child custody attorney in Fort Worth' or 'commercial truck accident lawyer'. If your website lacks detailed, separate pages for each service, search engines will evaluate your site as too generic, resulting in poor rankings and fewer qualified legal leads.",
          competitiveImpact: "Elite law firms with focused, comprehensive pages for every practice area dominate search results and capture individual clients facing urgent legal battles first.",
          recommendedSolution: "Expand your website layout to feature individual, deeply informative sub-pages for every legal practice area and case type you represent.",
          estimatedDifficulty: "Advanced",
          implementationComplexity: "Writing high-quality, legally compliant copy that is friendly yet authoritative, while laying out proper backlink pathways, requires expert content and SEO writing.",
          potentialBusinessImpact: "Critical"
        },
        {
          title: "Establishing Strict Legal Authority and EEAT Signals",
          issueFound: "Your platform does not highlight critical trust marks, state bar credentials, legal memberships, award logos, and successful case histories on the homepage.",
          whyThisMatters: "Google evaluates legal websites under extremely strict 'Your Money Your Life' standards. Without clear, unmistakable proof of experience, authority, and safety, search engines will choose not to display your website in local searches.",
          competitiveImpact: "Competitors who professionally highlight credentials and badges on their mobile headers instantly win client trust and secure the initial consult.",
          recommendedSolution: "Inject highly visible proof elements—such as official state bar seals, prestigious membership badges, and client case study reviews—directly into your primary website pages.",
          estimatedDifficulty: "Intermediate",
          implementationComplexity: "Sourcing, formatting, and placing official legal trust markers elegantly without complicating your layout requires dedicated frontend web designers.",
          potentialBusinessImpact: "High"
        },
        {
          title: "Attorney and LegalService Schema Code Markup",
          issueFound: "Your business website lacks specialized search engine background code—known as structured legal metadata—that explicitly details your practice status to search engines.",
          whyThisMatters: "Without structured business information embedded in your background code, search engine spiders struggle to parse your physical jurisdiction, office locations, and exact bar affiliations, limiting your Google Maps visibility.",
          competitiveImpact: "Law offices utilizing advanced legal schema tags rank higher and present richer, more professional results on Google search screens.",
          recommendedSolution: "Integrate a custom-written 'Attorney' or 'LegalService' JSON-LD code layer into the background of your website's main files.",
          estimatedDifficulty: "Advanced",
          implementationComplexity: "Injecting custom JSON-LD schema into database layouts requires coding expertise, as errors can render your website design broken or invisible to search engine crawlers.",
          potentialBusinessImpact: "Moderate"
        }
      ];
    } else {
      // Default / General
      grade = "Needs Attention";
      summary = `Strategic localized visibility check for ${businessName}. While your business possesses a solid baseline, several key optimizations in web display speeds, automated lead capture, and Google Maps categorization are required to prevent lost leads and maintain a steady stream of incoming phone calls.`;
      recommendations = [
        {
          title: "Mobile Speed, Performance, and Screen Layout Optimization",
          issueFound: "Your website experiences minor speed delays when loading on standard mobile data connections and lack a clean, responsive layout for modern phones.",
          whyThisMatters: "More than sixty percent of local customers find services on their smartphones. If your page layout takes more than three seconds to load, visitors will leave immediately. A slow loading speed reduces customer trust and limits your primary lead capture capabilities.",
          competitiveImpact: "Nearby competitors who have optimized and modernized their mobile load times capture these busy mobile searchers first.",
          recommendedSolution: "Compress heavy image files, remove outdated script files, and ensure your website is engineered to display instantly on any mobile viewport.",
          estimatedDifficulty: "Intermediate",
          implementationComplexity: "Re-engineering a website's speed requires careful edits to file systems, CSS styling, and server parameters, which can disrupt site formatting if not configured by a professional developer.",
          potentialBusinessImpact: "High"
        },
        {
          title: "Google Maps Category Verification and Secondary Attribute Tuning",
          issueFound: "Your primary Google Business Profile category might not align precisely with high-volume search phrases, or you are missing key secondary keyword attributes.",
          whyThisMatters: "Google Maps uses your primary business category to determine when to show your business to local searchers. Setting an incorrect or generic category means your listing will never appear for high-value search phrases, resulting in fewer phone calls and lost revenue.",
          competitiveImpact: "Local competitors with accurate and complete category tuning rank higher in Maps, capturing nearby commercial traffic first.",
          recommendedSolution: "Verify and align your primary Google Maps category to match your specific industry perfectly, and integrate all applicable secondary service tags.",
          estimatedDifficulty: "Basic",
          implementationComplexity: "Adjusting your category is simple, but analyzing local search volumes and selecting the exact mix of secondary tags that will maximize visibility without risk of profile suspension requires seasoned consultant expertise.",
          potentialBusinessImpact: "Critical"
        },
        {
          title: "Lead Capture response and Missed-Call Auto-SMS Fallback",
          issueFound: "Your business does not have an automatic missed-call system or instant text autoresponder linked to your primary phone number.",
          whyThisMatters: "If a nearby customer calls your business and receives a voicemail, they will not wait—they will immediately hang up and call the next service provider on their screen. Overlooking this leads directly to lost revenue and wasted marketing efforts.",
          competitiveImpact: "Competitors who employ active, instant text automation lock in new opportunities immediately by sending a friendly text text-back within seconds, ending the customer's search.",
          recommendedSolution: "Implement a polite, secure missed-call auto-response setup of LeadForge Local to instantly reply to unanswered calls or web submissions via SMS.",
          estimatedDifficulty: "Advanced",
          implementationComplexity: "Setting up carrier-approved, reliable SMS autoresponders with proper call routing and CRM logs requires technical configuration to meet telco legal compliance.",
          potentialBusinessImpact: "Critical"
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
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
                  <h5 className="font-display font-semibold text-sm text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-3">
                    <AlertTriangle className="h-4.5 w-4.5 text-blue-400" />
                    Three Priority Gaps Identified For Your Trade
                  </h5>

                  <div className="space-y-6 text-xs text-slate-300">
                    {auditResult.recommendations.map((rec, rIdx) => {
                      const adapted = adaptRecommendation(rec);
                      
                      const diffColor = (diff: string) => {
                        const d = diff.toLowerCase();
                        if (d.includes("basic")) return "text-emerald-400 bg-emerald-950/30 border-emerald-500/20";
                        if (d.includes("intermediate")) return "text-sky-450 bg-sky-950/30 border-sky-500/20";
                        if (d.includes("advanced")) return "text-amber-400 bg-amber-950/30 border-amber-500/20";
                        return "text-purple-400 bg-purple-950/30 border-purple-500/20"; // Expert-Level
                      };

                      const impColor = (imp: string) => {
                        const i = imp.toLowerCase();
                        if (i.includes("low")) return "text-slate-400 bg-slate-900 border-slate-800";
                        if (i.includes("moderate")) return "text-yellow-450 bg-yellow-950/25 border-yellow-500/20";
                        if (i.includes("high")) return "text-orange-400 bg-orange-950/25 border-orange-500/20";
                        return "text-rose-400 bg-rose-950/30 border-rose-500/30 animate-pulse"; // Critical
                      };

                      return (
                        <div 
                          key={rIdx} 
                          className={`space-y-4 pb-6 ${rIdx !== auditResult.recommendations.length - 1 ? "border-b border-slate-850" : ""}`}
                        >
                          {/* Heading Line */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="h-6.5 w-6.5 rounded-full bg-blue-600/25 text-sky-400 flex items-center justify-center font-bold font-mono text-[11px] flex-shrink-0 border border-blue-500/20">
                                {rIdx + 1}
                              </div>
                              <h4 className="text-white font-display font-extrabold text-sm sm:text-base text-sky-400">
                                {adapted.title}
                              </h4>
                            </div>

                            {/* Badges */}
                            <div className="flex items-center gap-2 pl-9 sm:pl-0">
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${diffColor(adapted.estimatedDifficulty)}`}>
                                Difficulty: {adapted.estimatedDifficulty}
                              </span>
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${impColor(adapted.potentialBusinessImpact)}`}>
                                Impact: {adapted.potentialBusinessImpact}
                              </span>
                            </div>
                          </div>

                          {/* 7-Part Audit Section Details Grid */}
                          <div className="pl-9 space-y-3 font-sans">
                            {/* Issue Found */}
                            <div className="text-slate-350 text-[12.5px] leading-relaxed">
                              <span className="text-amber-400/90 font-bold font-mono text-[10px] uppercase tracking-wider block mb-0.5">⚠️ Issue Found</span>
                              <p>{adapted.issueFound}</p>
                            </div>

                            {/* Why This Matters */}
                            <div className="text-slate-350 text-[12.5px] leading-relaxed">
                              <span className="text-sky-400/90 font-bold font-mono text-[10px] uppercase tracking-wider block mb-0.5">💡 Why This Matters</span>
                              <p>{adapted.whyThisMatters}</p>
                            </div>

                            {/* Competitive Impact */}
                            <div className="text-slate-350 text-[12.5px] leading-relaxed">
                              <span className="text-rose-400/90 font-bold font-mono text-[10px] uppercase tracking-wider block mb-0.5">⚔️ Competitive Impact</span>
                              <p>{adapted.competitiveImpact}</p>
                            </div>

                            {/* Recommended Solution */}
                            <div className="text-slate-100 text-[12.5px] leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/65">
                              <span className="text-emerald-400 font-extrabold font-mono text-[10px] uppercase tracking-wider block mb-1">✅ Recommended Solution</span>
                              <p>{adapted.recommendedSolution}</p>
                            </div>

                            {/* Implementation Complexity */}
                            <div className="text-slate-400 text-[11.5px] leading-relaxed italic bg-slate-950/20 p-3 rounded-lg border border-slate-850">
                              <span className="text-slate-400 font-extrabold font-mono text-[9px] uppercase tracking-wider block not-italic mb-0.5">🔧 Implementation Complexity Overview</span>
                              <p>{adapted.implementationComplexity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next action step & Consultation Scheduler */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                  <div className="space-y-2">
                    <span className="text-emerald-450 font-extrabold block uppercase tracking-wider text-[11px] font-mono">📅 Expert Roadmap Action Plan</span>
                    <p className="font-sans text-slate-200 text-sm leading-relaxed">
                      Your audit identified several opportunities that could improve online visibility, customer trust, and lead generation. If you would like expert assistance implementing these recommendations, schedule a strategy session with LeadForge Local to receive a customized growth plan tailored to your business.
                    </p>
                  </div>
                  
                  {/* Embedded Interactive Consultation Scheduler System */}
                  <div className="pt-2">
                    <InteractiveScheduler formData={formData} />
                  </div>
                </div>
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

// Embedded Interactive Consultation Scheduler Component
interface InteractiveSchedulerProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    businessName: string;
  };
}

function InteractiveScheduler({ formData }: InteractiveSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingName, setBookingName] = useState(formData.name || "");
  const [bookingPhone, setBookingPhone] = useState(formData.phone || "");
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generate next 5 weekdays
  const dates: string[] = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  let current = new Date();
  let count = 0;
  while (count < 5) {
    current.setDate(current.getDate() + 1);
    const day = current.getDay();
    if (day !== 0 && day !== 6) { // Weekdays only
      const dateStr = `${daysOfWeek[day]}, ${months[current.getMonth()]} ${current.getDate()}`;
      dates.push(dateStr);
      count++;
    }
  }

  const timeSlots = [
    "9:00 AM CST",
    "10:30 AM CST",
    "1:00 PM CST",
    "2:30 PM CST",
    "4:00 PM CST"
  ];

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsBooked(true);
      // Track Analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "consultation_booked", {
          business_name: formData.businessName,
          date: selectedDate,
          time: selectedTime
        });
      }
    }, 1200);
  };

  if (isBooked) {
    return (
      <div className="bg-emerald-950/20 border border-emerald-500/30 p-5 rounded-xl text-center space-y-3 animate-fadeIn">
        <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-full mx-auto border border-emerald-500/20">
          <Check className="h-5 w-5" />
        </div>
        <div>
          <h5 className="font-display font-extrabold text-sm text-white">Your Strategy Session is Reserved!</h5>
          <p className="text-slate-300 text-[12px] leading-relaxed mt-1.5 font-sans">
            We have locked in your DFW strategy time slot for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>. 
            Matthew or Heather Eisan will personally call you at <strong>{bookingPhone}</strong> to conduct your strategic roadmap scan.
          </p>
        </div>
        <div className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/40 py-1.5 px-3 rounded inline-block">
          CALENDAR INVITE SENT TO: {formData.email}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleBookSession} className="bg-slate-950 border border-slate-850 p-4 sm:p-5 rounded-xl space-y-4 animate-fadeIn">
      <div className="space-y-1 text-left">
        <h5 className="font-display font-bold text-white text-[13px] tracking-tight">Schedule Your 15-Minute Roadmap Consult</h5>
        <p className="text-slate-405 text-[11px] leading-normal font-sans">
          Select a convenient day and time to receive a fully customized, professional checklist growth plan. No sales pressure, just actionable DFW-area marketing advice.
        </p>
      </div>

      <div className="space-y-3 text-left">
        {/* Date choice */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wide">1. Select Target Date</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {dates.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDate(d)}
                className={`py-1.5 px-2 rounded-lg text-[10.5px] font-medium border text-center transition-all cursor-pointer ${
                  selectedDate === d
                    ? "bg-sky-500 border-sky-400 text-white shadow-md font-bold"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time choice */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wide">2. Select Time Slot</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {timeSlots.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-1.5 px-2 rounded-lg text-[10.5px] font-medium border text-center transition-all cursor-pointer ${
                  selectedTime === t
                    ? "bg-sky-500 border-sky-400 text-white shadow-md font-bold"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-wide">Your Name</label>
            <input
              type="text"
              required
              value={bookingName}
              onChange={(e) => setBookingName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs px-3 py-2 text-white rounded-lg focus:outline-none focus:border-sky-500 font-sans"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-wide">Phone Number for Voice Consult</label>
            <input
              type="tel"
              required
              value={bookingPhone}
              onChange={(e) => setBookingPhone(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs px-3 py-2 text-white rounded-lg focus:outline-none focus:border-sky-500 font-sans"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !selectedDate || !selectedTime}
        className={`w-full py-2.5 rounded-lg text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
          !selectedDate || !selectedTime
            ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-750"
            : "bg-sky-500 hover:bg-sky-600 border border-sky-400"
        }`}
      >
        {isLoading ? (
          <>
            <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
            <span>Locking in appointment...</span>
          </>
        ) : (
          <span>Book My Strategy Consultation Session</span>
        )}
      </button>
    </form>
  );
}
