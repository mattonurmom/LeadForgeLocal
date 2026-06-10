import React, { useState, useEffect } from "react";
import { 
  Lock, Check, Copy, FileText, MessageSquare, Shield, Award, 
  ChevronRight, Phone, Mail, Globe, CheckSquare, Layers, 
  Eye, Download, RefreshCw, Sparkles, Building, Play, Star, AlertCircle, Search
} from "lucide-react";
import { AuditLead, ContactLead, OutreachTemplate } from "../types";
import { 
  SERVICES, PACKAGES, FAQ, OUTREACH_TEMPLATES, 
  LOGO_CONCEPTS, BRAND_GUIDE, AUDIT_TEMPLATE, 
  PROPOSAL_TEMPLATE, PLAIN_TEXT_GOOGLE_SITES 
} from "../data";

interface AdminHubProps {
  auditLeads: AuditLead[];
  contactLeads: ContactLead[];
  onClearLeads: () => void;
}

export default function AdminHub({ auditLeads, contactLeads, onClearLeads }: AdminHubProps) {
  // Security Locks states
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("leadforge_admin_unlocked") === "true";
  });
  const [passcode, setPasscode] = useState<string>("");
  const [passcodeError, setPasscodeError] = useState<string>("");

  // AI Strategic Coordinator components
  const [aiPlaybook, setAiPlaybook] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const [activeSubTab, setActiveSubTab] = useState<string>("coordination");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Custom templates editing states
  const [clientBusinessName, setClientBusinessName] = useState<string>("Alpha Contractors");
  const [clientCity, setClientCity] = useState<string>("Dallas");
  const [clientServiceType, setClientServiceType] = useState<string>("Roofing");

  // AI Outreach Copilot states
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [outreachScript, setOutreachScript] = useState<string>("");
  const [outreachLoading, setOutreachLoading] = useState<boolean>(false);

  const handleGenerateOutreach = async (leadToProcess: any) => {
    setOutreachLoading(true);
    setOutreachScript("");
    try {
      const res = await fetch("/api/ai-lead-outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: leadToProcess }),
      });
      const data = await res.json();
      setOutreachScript(data.text);
    } catch (error) {
      console.error(error);
      setOutreachScript("### ❌ Outreach Generation Failure\n\nFailed to fetch call scripts and emails from server. Please retry.");
    } finally {
      setOutreachLoading(false);
    }
  };

  const handleSelectLeadForOutreach = (lead: any) => {
    setSelectedLead(lead);
    handleGenerateOutreach(lead);
    // Give the layout a tiny tick to render then scroll elegantly
    setTimeout(() => {
      const consoleElement = document.getElementById("ai-copilot-console");
      if (consoleElement) {
        consoleElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  // FAQ Search inside Admin Panel
  const [faqSearch, setFaqSearch] = useState<string>("");
  const [faqFilter, setFaqFilter] = useState<string>("All");

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "7220" || passcode.toLowerCase() === "admin") {
      setIsAdminUnlocked(true);
      localStorage.setItem("leadforge_admin_unlocked", "true");
      setPasscodeError("");
    } else {
      setPasscodeError("Invalid security credential. Check owner configurations.");
    }
  };

  const handleLockSession = () => {
    setIsAdminUnlocked(false);
    localStorage.removeItem("leadforge_admin_unlocked");
    setPasscode("");
    setPasscodeError("");
  };

  const handleFetchAiPlaybook = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai-coordinate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditLeads, contactLeads }),
      });
      const data = await res.json();
      setAiPlaybook(data.text);
    } catch (e) {
      console.error(e);
      setAiPlaybook(`### ❌ Connection Refused\n\nFailed to sync with local Express coordinator endpoint. Please verify server is launched.`);
    } finally {
      setAiLoading(false);
    }
  };

  // Fetch playbook on mount or when the Tab is loaded
  useEffect(() => {
    if (isAdminUnlocked && activeSubTab === "coordination" && !aiPlaybook) {
      handleFetchAiPlaybook();
    }
  }, [activeSubTab, isAdminUnlocked]);

  const handleSendAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatLoading(true);
    setChatResponse("");
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatMessage, auditLeads, contactLeads }),
      });
      const data = await res.json();
      setChatResponse(data.text);
    } catch (error) {
      console.error(error);
      setChatResponse("### ❌ Error calling Chat Advisor\n\nUnable to establish communication with the custom server routing. Please try again.");
    } finally {
      setChatLoading(false);
    }
  };

  // Modern Markdown element renderer
  const renderPlaybookContent = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return (
      <div className="space-y-3.5 text-slate-300 text-sm font-sans leading-relaxed">
        {lines.map((line, i) => {
          if (line.startsWith("###")) {
            return (
              <h4 key={i} className="text-base font-bold font-display text-white mt-6 mb-2 border-b border-slate-800 pb-1 flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-blue-400" />
                {line.replace("###", "").trim()}
              </h4>
            );
          }
          if (line.startsWith("- ") || line.startsWith("* ")) {
            // Check if there is bold text inside
            const cleanLine = line.substring(2);
            const parts = cleanLine.split("**");
            return (
              <div key={i} className="flex items-start gap-2.5 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 transition-all hover:bg-slate-950/70 hover:border-slate-700/65">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <p className="flex-1 text-slate-300 selection:bg-blue-600">
                  {parts.map((p, idx) => idx % 2 === 1 ? <strong key={idx} className="text-white font-extrabold">{p}</strong> : p)}
                </p>
              </div>
            );
          }
          if (line.trim() === "") return null;
          return <p key={i} className="text-slate-300 pl-1">{line}</p>;
        })}
      </div>
    );
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredFaqs = FAQ.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesFilter = faqFilter === "All" || faq.category === faqFilter;
    return matchesSearch && matchesFilter;
  });

  // Dynamic template text generators
  const getRenderedAuditText = () => {
    return AUDIT_TEMPLATE
      .replace(/\[Insert Local Business Name\]/g, clientBusinessName)
      .replace(/\[City Name\]/g, clientCity)
      .replace(/\[Service Type\]/g, clientServiceType);
  };

  const getRenderedProposalText = () => {
    return PROPOSAL_TEMPLATE
      .replace(/\[Insert Prospect Business Name\]/g, clientBusinessName)
      .replace(/\[City Name\]/g, clientCity)
      .replace(/plumbing, roofing, or electrical/g, clientServiceType.toLowerCase());
  };

  const getRenderedOutreachText = (template: OutreachTemplate) => {
    return template.content
      .replace(/\[Business Owner Name\]/g, "Business Owner")
      .replace(/\[Business Name\]/g, clientBusinessName)
      .replace(/\[City Name\]/g, clientCity)
      .replace(/\[City\]/g, clientCity)
      .replace(/\[Service Type, e.g., plumbers\]/g, clientServiceType.toLowerCase() + " partners")
      .replace(/\[Service Trade, e.g., HVAC companies\]/g, clientServiceType + " Services")
      .replace(/\[Owner Name\]/g, "Business Owner")
      .replace(/\[Your Name\]/g, "LeadForge Coordinator")
      .replace(/\[Your Phone Number\]/g, "555-0199")
      .replace(/\[Your Booking Link\]/g, "leadforgelocal.com/book-consult");
  };

  if (!isAdminUnlocked) {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
        <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10 text-center space-y-6 animate-fadeIn">
          <div className="mx-auto h-16 w-16 bg-blue-900/40 rounded-2xl flex items-center justify-center border border-blue-500/30 text-sky-400">
            <Lock className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold font-display text-white">Owner Security Desk</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              This is a private administrative dashboard. Enter your secure agency PIN to verify authentication and view active lead collections, strategy logs, and proposal templates.
            </p>
          </div>

          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Agency Security PIN</label>
              <input
                type="password"
                placeholder="••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-center text-white tracking-widest placeholder:text-slate-700 outline-none transition-all font-mono font-bold"
                autoFocus
              />
            </div>
            
            {passcodeError && (
              <p className="text-xs bg-rose-950/40 text-rose-400 border border-rose-900/60 rounded-xl p-3 font-semibold leading-relaxed">
                ⚠️ {passcodeError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-xl cursor-pointer transition-colors text-sm shadow shadow-blue-500/20"
            >
              Verify & Unlock Console
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">🔑 DEMO ACCESS PIN:</span>
            <span className="text-xs text-slate-300 font-semibold font-mono block mt-1">"7220" or "admin"</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen pb-20">
      
      {/* Banner / Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 py-12 border-b border-blue-900/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Partner Launch Suite
                </span>
                <span className="text-xs text-slate-400">Secure Access Mode</span>
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                LeadForge Local <span className="text-blue-400">Dashboard</span>
              </h1>
              <p className="mt-2 text-slate-300 max-w-2xl text-sm">
                A high-converting startup cockpit. Use this private panel to manage incoming inquiries, copy instant Outreach structures, print client Audit documents, and reference our complete brand specifications.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCopy("leadforgelocal.com/partnership", "Copy Link")}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/60 transition-colors px-4 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Layers className="h-4 w-4 text-blue-400" />
                {copiedText === "Copy Link" ? "Copied Link!" : "Copy Intake Form Link"}
              </button>

              <button
                onClick={handleLockSession}
                className="rounded-xl bg-rose-950/40 hover:bg-rose-900/40 text-rose-400 border border-rose-900/40 hover:border-rose-800 transition-colors px-4 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Lock className="h-4 w-4 text-rose-400" />
                <span>Lock Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-20 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-none">
            {[
              { id: "coordination", label: "🤖 AI Action Coordinator" },
              { id: "leads", label: "Incoming Leads Database", count: auditLeads.length + contactLeads.length },
              { id: "outreach", label: "Outreach & Pitch Cards", count: 5 },
              { id: "generators", label: "Audit & Proposal Writers" },
              { id: "brand", label: "Brand Guide & Logo Systems" },
              { id: "faq", label: "FAQ Vault (25 Q&As)" },
              { id: "packages", label: "Pricing Structures" },
              { id: "sites", label: "Google Sites Plain-Text" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  activeSubTab === tab.id 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                {"count" in tab && (
                  <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${activeSubTab === tab.id ? 'bg-white text-blue-700' : 'bg-slate-800 text-slate-300'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-tab Contents */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TAB 0: AI STRATEGIC ACTION COORDINATOR */}
        {activeSubTab === "coordination" && (
          <div className="space-y-6 animate-fadeIn">
            {/* AI Advisor Banner Card */}
            <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="absolute top-0 right-0 h-40 w-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-10 h-32 w-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/30 px-3.5 py-1 text-xs font-bold text-sky-400">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-yellow-400" />
                    <span>Real-Time Strategic Coordination Engine</span>
                  </div>
                  <h3 className="text-2xl font-extrabold font-display text-white">AI Tactical Copilot</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                    This advanced coordinator coordinates your ongoing daily tasks in accordance with potential client data stored in your CRM. It parses custom pain points and lists custom scripts to maximize your local contract closing rate.
                  </p>
                </div>
                
                <button
                  onClick={handleFetchAiPlaybook}
                  disabled={aiLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900/40 text-white font-bold text-xs px-5 py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0 shadow shadow-blue-500/10"
                >
                  <RefreshCw className={`h-4 w-4 ${aiLoading ? "animate-spin" : ""}`} />
                  <span>{aiLoading ? "Analyzing CRM Database..." : "Recalculate Advisor Action Plan"}</span>
                </button>
              </div>

              {/* Playbook result container */}
              <div className="mt-8 border-t border-slate-800 pt-6">
                {aiLoading ? (
                  <div className="space-y-4 py-8 text-center animate-pulse">
                    <div className="inline-block relative">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mx-auto scale-110" />
                      <Sparkles className="h-4 w-4 text-yellow-400 absolute top-0 -right-2 animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white font-bold font-mono uppercase tracking-widest">Running Deep Lead Forge Correlation...</p>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">Connecting to server node to synthesize high-value outreach tasks for your listed trade niches...</p>
                    </div>
                  </div>
                ) : aiPlaybook ? (
                  <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4 shadow-inner">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-850">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
                        <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase">Strategic Playbook Compiled</span>
                      </div>
                      <span className="text-[10px] font-mono bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-400">
                        Total Client Profiles: {auditLeads.length + contactLeads.length}
                      </span>
                    </div>
                    
                    {renderPlaybookContent(aiPlaybook)}
                  </div>
                ) : (
                  <div className="bg-slate-950/40 rounded-2xl border border-slate-800/80 p-8 text-center space-y-4">
                    <p className="text-slate-400 text-sm">No analysis has been initialized for this session yet.</p>
                    <button
                      onClick={handleFetchAiPlaybook}
                      className="bg-blue-600/15 border border-blue-500/20 hover:bg-blue-600/30 text-sky-400 font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      Process Lead Database
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AI Interactive Chat Query Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Sparkles className="h-5 w-5" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Ask AI Strategy Coach</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Type any strategic objection, client target trade question, or pricing challenge here. Your coordinator AI will consult the active lead history to generate an exact proposal counter.
                </p>
                
                <form onSubmit={handleSendAiChat} className="space-y-3 pt-2">
                  <textarea
                    rows={3}
                    placeholder="e.g. How should I counter a chiropractor who says $499/mo is too expensive?"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-600 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !chatMessage.trim()}
                    className="w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900/60 text-white font-bold text-xs py-3.5 px-4 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2 border border-slate-700/60"
                  >
                    {chatLoading ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Play className="h-3 w-3 fill-white stroke-none" />
                    )}
                    <span>Consult AI Advisor</span>
                  </button>
                </form>
              </div>

              <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[220px] flex flex-col">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider font-bold text-slate-500 uppercase">Consultation Response Vault</span>
                  <Award className="h-4 w-4 text-blue-500" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center mt-4">
                  {chatLoading ? (
                    <div className="text-center py-10 space-y-3">
                      <RefreshCw className="h-6 w-6 text-yellow-400 animate-spin mx-auto scale-110" />
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">Consulting Strategic Heuristics...</p>
                    </div>
                  ) : chatResponse ? (
                    <div className="bg-slate-950/40 border border-slate-800/85 rounded-xl p-5 space-y-3 text-slate-300 select-all animate-fadeIn">
                      {renderPlaybookContent(chatResponse)}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-xs text-slate-500 max-w-sm mx-auto">
                      💡 Ask your AI strategic director questions like: *"How do I close mom & pop shop owners?"* or *"What proposal email is best for a recording studio?"* to generate immediate text plays.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: LEADS DATABASE */}
        {activeSubTab === "leads" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header statistics bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-semibold block mb-1">Total Leads Acquired</span>
                <span className="text-4xl font-display font-bold text-white">
                  {auditLeads.length + contactLeads.length}
                </span>
                <span className="text-[10px] text-green-400 block mt-1">● 100% Client-Side Local State Validated</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-semibold block mb-1">Business Audits Requested</span>
                <span className="text-4xl font-display font-bold text-blue-400">
                  {auditLeads.length}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">High conversion prospecting intent</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                <span className="text-slate-400 text-xs font-semibold block mb-1">Consultation Requests</span>
                <span className="text-4xl font-display font-bold text-sky-400">
                  {contactLeads.length}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Direct callback requirements</span>
              </div>
            </div>

            {/* AI OUTREACH COPILOT CONSOLE */}
            {selectedLead && (
              <div id="ai-copilot-console" className="bg-slate-950 border-2 border-yellow-500/30 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn shadow-xl shadow-yellow-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="text-slate-400 hover:text-white text-xs bg-slate-900/60 transition-all hover:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 cursor-pointer"
                  >
                    Close Copilot
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-yellow-400 animate-pulse">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75 animate-ping"></span>
                      </span>
                      <span className="text-[10px] font-mono tracking-wider font-bold text-yellow-400 uppercase">Live AI Outreach Copilot</span>
                    </div>
                    <h3 className="text-xl font-bold font-display text-white">
                      Action Playbook for {selectedLead.businessName || "Local Contractor"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tailored specifically for owner <strong className="text-slate-200">{selectedLead.name}</strong> to close a monthly retainer.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleGenerateOutreach(selectedLead)}
                      disabled={outreachLoading}
                      className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <RefreshCw className={`h-3.5 w-3.5 ${outreachLoading ? "animate-spin" : ""}`} />
                      <span>Regenerate Pitch Scripts</span>
                    </button>
                  </div>
                </div>

                {/* Lead Contact Info Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block uppercase font-mono text-[9px] font-bold">Contact Name</span>
                    <span className="text-slate-200 font-semibold">{selectedLead.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase font-mono text-[9px] font-bold">Direct Phone</span>
                    <span className="text-slate-200 font-semibold">{selectedLead.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase font-mono text-[9px] font-bold">Email Address</span>
                    <span className="text-slate-200 font-semibold max-w-[150px] truncate block">{selectedLead.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase font-mono text-[9px] font-bold">Inquiry Type</span>
                    <span className="text-slate-200 font-semibold">
                      {selectedLead.type === "Contact" ? "💬 General Inquiry" : "🔍 Free Visibility Check"}
                    </span>
                  </div>
                </div>

                {/* Result Display */}
                <div className="bg-slate-900/40 rounded-2xl border border-slate-850 p-6 min-h-[300px]">
                  {outreachLoading ? (
                    <div className="space-y-4 py-16 text-center animate-pulse">
                      <div className="inline-block relative">
                        <RefreshCw className="h-9 w-9 text-yellow-400 animate-spin mx-auto scale-110" />
                        <Sparkles className="h-4 w-4 text-sky-400 absolute top-0 -right-2 animate-bounce" />
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-sm text-yellow-400 font-extrabold font-mono uppercase tracking-widest">AI Drafting Sales Scripts...</p>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          Analyzing {selectedLead.businessName}'s digital gaps to craft precise phone openers, objections handlers, copy-paste email templates, and sequential next steps...
                        </p>
                      </div>
                    </div>
                  ) : outreachScript ? (
                    <div className="space-y-6">
                      <p className="text-xs text-green-400 font-semibold flex items-center gap-1.5 pb-2 border-b border-slate-800">
                        <span>●</span> Generated outreach tools ready. Copy and use immediately to convert this prospect:
                      </p>
                      <div className="text-slate-300">
                        {renderPlaybookContent(outreachScript)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-xs text-slate-400 max-w-sm mx-auto space-y-3">
                      <p>Something went wrong or setup is incomplete. Click generate to retry.</p>
                      <button 
                        onClick={() => handleGenerateOutreach(selectedLead)}
                        className="text-xs bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold py-2 px-4 rounded-xl cursor-pointer"
                      >
                        Generate Scripts Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Audit Lead List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    Audit Submissions
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">These contractor leads filled out the detailed 6-field free performance audit inquiry form.</p>
                </div>
                <button
                  onClick={onClearLeads}
                  className="px-3.5 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-800 transition-all cursor-pointer"
                >
                  Reset Leads to Sample Data
                </button>
              </div>

              {auditLeads.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400 text-sm">No incoming audit leads requested yet. Test the audit flow on the website!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold text-slate-400 tracking-wider">
                        <th className="py-3 px-5">Business Name</th>
                        <th className="py-3 px-5">Contact person</th>
                        <th className="py-3 px-5">Connection details</th>
                        <th className="py-3 px-5">Digital references</th>
                        <th className="py-3 px-5">Timestamp</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                      {auditLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-5">
                            <span className="font-semibold text-white block">{lead.businessName}</span>
                            <span className="text-[10px] text-blue-400 rounded bg-blue-950/60 px-1.5 py-0.5 mt-1 inline-block">
                              Target Client
                            </span>
                          </td>
                          <td className="py-4 px-5 font-medium text-slate-100">{lead.name}</td>
                          <td className="py-4 px-5">
                            <div className="flex flex-col gap-1">
                              <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-slate-500" /> {lead.email}</span>
                              <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-slate-500" /> {lead.phone}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <div className="max-w-[200px] truncate flex flex-col gap-1 text-[11px]">
                              <span className="text-slate-400 text-xs truncate">Web: {lead.website || "No existing site"}</span>
                              <span className="text-slate-400 text-xs truncate">GBP: {lead.gbpLink || "No linked GBP"}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5 text-slate-400">{lead.submittedAt}</td>
                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleSelectLeadForOutreach(lead)}
                                className="px-2.5 py-1.5 bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500 hover:text-slate-950 rounded font-bold transition-all text-[11px] flex items-center gap-1 cursor-pointer"
                                title="Let AI write your exact phone script & email pitch"
                              >
                                <Sparkles className="h-3 w-3" />
                                <span>AI Script Copilot</span>
                              </button>
                              <button
                                onClick={() => {
                                  setClientBusinessName(lead.businessName);
                                  setActiveSubTab("generators");
                                }}
                                className="px-2.5 py-1.5 bg-blue-900/60 text-sky-300 hover:bg-blue-800 hover:text-white rounded font-bold transition-all"
                                title="Draft audit instantly"
                              >
                                Draft Audit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* General Contact Lead List */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mt-6">
              <div className="px-6 py-5 border-b border-slate-800">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400"></span>
                  Consultation Bookings & Messages
                </h2>
                <p className="text-xs text-slate-400 mt-1">General inquiries gathered via the responsive business contacts form.</p>
              </div>

              {contactLeads.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400 text-sm">No regular contact entries submitted yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-bold text-slate-400 tracking-wider">
                        <th className="py-3 px-5">Prospect Business Name</th>
                        <th className="py-3 px-5">Sender</th>
                        <th className="py-3 px-5">Communication</th>
                        <th className="py-3 px-5">Messages / Questions</th>
                        <th className="py-3 px-5">Time</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                      {contactLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-5 font-semibold text-white">{lead.businessName || "Not Specified"}</td>
                          <td className="py-4 px-5 text-slate-200">{lead.name}</td>
                          <td className="py-4 px-5">
                            <span className="block">{lead.email}</span>
                            <span className="block text-slate-400">{lead.phone}</span>
                          </td>
                          <td className="py-4 px-5 text-slate-300">
                            <p className="italic max-w-[280px] line-clamp-2 bg-slate-950/40 px-3 py-2 rounded border border-slate-800/70">
                              "{lead.message}"
                            </p>
                          </td>
                          <td className="py-4 px-5 text-slate-400">{lead.submittedAt}</td>
                          <td className="py-4 px-5 text-right">
                            <button
                              onClick={() => handleSelectLeadForOutreach({ ...lead, type: "Contact" })}
                              className="px-2.5 py-1.5 bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500 hover:text-slate-950 rounded font-bold transition-all text-[11px] flex items-center gap-1 cursor-pointer ml-auto"
                              title="Let AI write your exact phone script & email pitch"
                            >
                              <Sparkles className="h-3 w-3" />
                              <span>AI Script Copilot</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-blue-950/30 border border-blue-900/60 rounded-2xl p-6">
              <h3 className="font-display font-bold text-white text-sm flex items-center gap-2 mb-2">
                <AlertCircle className="h-4.5 w-4.5 text-blue-400" />
                Startup Strategy Callout - Direct Local Outreach Priority
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                As a startup targeting zero initial capital spend, your primary objective is to find 20-30 prospects directly in your local area (roofers, concrete guys, mobile mechanics). Submit them on your own landing pages here to generate their initial profiles, print their 1-page audits using our built-in writer below, and email them! It establishes a massive value-first rapport which leads to continuous monthly recurring retainers.
              </p>
            </div>

          </div>
        )}

        {/* TAB 2: OUTREACH AND PITCH CARD SCRIPTS */}
        {activeSubTab === "outreach" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">Outreach Script Vault & Pitch Materials</h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero budget outreach templates. These are tailored with proven conversion mechanics so businesses reply quickly.
              </p>
            </div>

            {/* Target Industries List */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-display font-semibold text-sm text-sky-300 mb-3 block">High-Value Target Blue-Collar Verticals</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Roofers", "Plumbers", "Electricians", "HVAC Companies", "Landscapers", 
                  "Pressure Washers", "Fence Builders", "Tree Services", "Pool Technicians", 
                  "Mobile Mechanics", "Cleaning Contractors", "Pest Control", "Handymen"
                ].map((ind, i) => (
                  <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 transition-colors border border-slate-800/60 text-slate-300">
                    🏠 {ind}
                  </span>
                ))}
              </div>
              <span className="block text-[11px] text-slate-500 mt-2.5">
                Note: These businesses rely heavily on Maps visual placement and immediate phone responses. They represent the highest ROI prospects for LeadForge Local services.
              </span>
            </div>

            {/* Individual templates list with interactive copy button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OUTREACH_TEMPLATES.map((item, idx) => {
                const textToCopy = getRenderedOutreachText(item);
                const uniqueId = `outreach-${idx}`;
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase bg-blue-950/60 px-2 py-1 rounded">
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-500 font-medium italic">
                          {item.name.replace(" Template", "")}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-white text-base mb-1">{item.name}</h4>
                      
                      {item.subject && (
                        <p className="text-xs font-semibold text-slate-300 mb-2 bg-slate-950/60 px-2 py-1.5 rounded border border-slate-800">
                          <span className="text-slate-500">Subject:</span> {item.subject}
                        </p>
                      )}

                      <p className="text-[11px] text-sky-400 bg-sky-950/20 border border-sky-900/30 rounded p-2.5 mb-4 leading-relaxed italic">
                        💡 <strong>Strategy tip:</strong> {item.tips}
                      </p>

                      <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 h-48 overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
                        {textToCopy}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(textToCopy, uniqueId)}
                      className="w-full font-bold text-xs py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-2"
                    >
                      {copiedText === uniqueId ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Copied outreach script!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy script to Clipboard</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: AUDIT AND PROPOSAL GENERATORS */}
        {activeSubTab === "generators" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">Client Prospect Document Generator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Customize your client variables below. Our generator dynamically injects these into the 1-Page Audit Report and Professional Services Proposal.
              </p>
            </div>

            {/* Variables setting row */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Business Under Review</label>
                <input
                  type="text"
                  value={clientBusinessName}
                  onChange={(e) => setClientBusinessName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Summit HVAC"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Primary Target City</label>
                <input
                  type="text"
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Denver"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Industry / Vertical Focus</label>
                <input
                  type="text"
                  value={clientServiceType}
                  onChange={(e) => setClientServiceType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Dental Practice, Law Firm, HVAC, Restaurant"
                />
              </div>
            </div>

            {/* Split layout: Paper reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Document Block A: 1-Page Audit */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-base text-white">1. Business Audit Report Tool</h3>
                  <button
                    onClick={() => handleCopy(getRenderedAuditText(), "audit-doc")}
                    className="text-xs font-bold text-sky-400 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-lg border border-slate-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedText === "audit-doc" ? "Copied!" : "Copy Report Text"}
                  </button>
                </div>
                
                <div className="bg-white text-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-200 aspect-[1/1.3] overflow-y-auto leading-relaxed text-xs">
                  <div className="border-b-4 border-slate-900 pb-4 mb-4 text-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 block">LeadForge Local Evaluation</span>
                    <h4 className="font-display font-extrabold text-lg text-slate-950 tracking-tight uppercase">Simple Business Visibility Audit</h4>
                    <span className="text-[9px] text-slate-400 block mt-1">An M&H OnlineServices company</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 text-[11px]">
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[9px] block">Business Name</span>
                      <strong className="text-slate-900 font-bold block">{clientBusinessName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[9px] block">Primary Target Location</span>
                      <strong className="text-slate-900 font-bold block">{clientCity} Market</strong>
                    </div>
                  </div>

                  <div className="space-y-3 font-sans">
                    <h5 className="font-bold border-b border-slate-200 pb-1 text-slate-950 uppercase text-[10px]">Diagnostics & Metrics Score</h5>
                    <div className="grid grid-cols-1 gap-2 text-[10px]">
                      <div className="flex justify-between border-b border-slate-100 py-1">
                        <span>1. Google Business Profile Rank Page:</span>
                        <span className="font-bold text-amber-600 bg-amber-50 px-1 rounded">⭐ Unoptimized Category Gaps</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 py-1">
                        <span>2. Organic Maps Index (Top 3 Map pack):</span>
                        <span className="font-bold text-rose-600 bg-rose-50 px-1 rounded">❌ Page 3 Invisible</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 py-1">
                        <span>3. Mobile Load & Interactive Index:</span>
                        <span className="font-bold text-amber-600 bg-amber-50 px-1 rounded">⚠️ Slow Loading (3.4 seconds delay)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 py-1">
                        <span>4. Social Footprint Activation:</span>
                        <span className="font-bold text-slate-500 bg-slate-100 px-1 rounded">No Recent Client-trust Loop Posts</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 py-1">
                        <span>5. Missed Client Text-Back setup:</span>
                        <span className="font-bold text-rose-600 bg-rose-50 px-1 rounded">❌ High Vulnerability (Calls Die)</span>
                      </div>
                    </div>

                    <h5 className="font-bold border-b border-slate-200 pb-1 text-slate-950 uppercase text-[10px] pt-2">Discovered Gaps & Leakages</h5>
                    <p className="text-[11px] text-slate-600 italic">
                      "We discovered {clientBusinessName} is ranking page 3 in search maps, which hides you from up to 88% of local buyers. When phone lines are busy, callers immediately search for another contractor."
                    </p>

                    <h5 className="font-bold border-b border-slate-200 pb-1 text-slate-950 uppercase text-[10px] pt-2">Recommended Steps</h5>
                    <ul className="list-decimal pl-4 text-[10px] space-y-1 text-slate-700">
                      <li>Verify secondary trade tags for your Google listing.</li>
                      <li>Deploy automated SMS missed call responder.</li>
                      <li>Launch high converting modern mobile trade homepage.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Document Block B: Proposal */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-base text-white">2. Service Proposal Document</h3>
                  <button
                    onClick={() => handleCopy(getRenderedProposalText(), "prop-doc")}
                    className="text-xs font-bold text-sky-400 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-lg border border-slate-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedText === "prop-doc" ? "Copied!" : "Copy Proposal Text"}
                  </button>
                </div>

                <div className="bg-white text-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-200 aspect-[1/1.3] overflow-y-auto leading-relaxed text-xs">
                  <div className="border-b-4 border-blue-600 pb-4 mb-4 text-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 block">LeadForge Local Pitch System</span>
                    <h4 className="font-display font-extrabold text-lg text-slate-950 tracking-tight uppercase">High Ticket Growth Proposal</h4>
                    <span className="text-[9px] text-slate-400 block mt-1">An M&H OnlineServices company</span>
                  </div>

                  <p className="text-[11px] text-slate-600 mb-3">
                    <strong>Objective:</strong> Secure steady customer calls, high Google ratings, and automate response booking structures for <strong>{clientBusinessName}</strong>.
                  </p>

                  <div className="space-y-3 font-sans text-slate-700 text-[10px]">
                    <h5 className="font-bold border-b border-slate-200 pb-1 text-slate-950 uppercase text-[10px]">1. Scope of Work</h5>
                    <p>
                      Instead of charging expensive monthly corporate branding fees, we build three foundational pillars for <strong>{clientBusinessName}</strong> to capture maximum city searches:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Map Pack Dominance:</strong> Clean listing hours, local geo keywords, citation indexing.</li>
                      <li><strong>Digital Booking Funnel:</strong> A beautiful high speed 5-page trades layout with instant SMS lead alerting.</li>
                      <li><strong>Missed Call Text Back:</strong> Setup automated text responses in 5 seconds to win emergency requests.</li>
                    </ul>

                    <h5 className="font-bold border-b border-slate-200 pb-1 text-slate-950 uppercase text-[10px] pt-2">2. Budget Requirement</h5>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 flex justify-between items-center">
                      <div>
                        <strong className="text-blue-700 block text-[11px]">Growth Engine Package</strong>
                        <span className="text-slate-500 text-[9px]">Google Business Sync, custom site & reviews loop</span>
                      </div>
                      <strong className="text-slate-900 text-sm">$499 / Month</strong>
                    </div>

                    <h5 className="font-bold border-b border-slate-200 pb-1 text-slate-950 uppercase text-[10px] pt-3">3. Verification & Terms</h5>
                    <p className="text-[9.5px]">
                      No locking contracts. Cancel or alter your active monthly marketing packages anytime with a simple 10-day email directive to terms@leadforgelocal.com.
                    </p>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-3 mt-4 text-[9px] text-slate-400">
                      <div>
                        <span>Authorized By:</span>
                        <div className="h-6 border-b border-slate-200 mt-1"></div>
                        <span className="block mt-1">LeadForge Local Agent</span>
                      </div>
                      <div>
                        <span>Client Accepted By:</span>
                        <div className="h-6 border-b border-slate-200 mt-1"></div>
                        <span className="block mt-1">Authorized Representative</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: BRAND GUIDE AND LOGO SYSTEMS */}
        {activeSubTab === "brand" && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">Agency Branding & Logo Guidelines</h2>
              <p className="text-xs text-slate-400 mt-1">
                Establish high authority immediately. Follow these exact styling rules when building promotional items, corporate cards, or visual envelopes.
              </p>
            </div>

            {/* Brand guide variables details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2 space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-base text-white mb-2">Agency Mission Statement</h3>
                  <p className="text-xs italic text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                    "{BRAND_GUIDE.mission}"
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-base text-white mb-3">Visual Brand Values</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BRAND_GUIDE.values.map((val, i) => (
                      <div key={i} className="bg-slate-950 p-4 border border-slate-800 rounded-xl">
                        <span className="font-bold text-xs text-sky-400 block mb-1">
                          0{i+1}. {val.title}
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {val.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-extrabold text-sm text-slate-200 mb-2">Professional Voice Tone</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {BRAND_GUIDE.voice}
                  </p>
                </div>
              </div>

              {/* Color palettes container */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-display font-extrabold text-base text-white mb-2">Color Palette Guidelines</h3>
                
                <div className="space-y-3">
                  {[
                    { key: "navy", name: "Deep Navy Blue", hex: "#0F172A", desc: "Base container backgrounds, footers, & clean headers." },
                    { key: "royal", name: "Royal Blue", hex: "#2563EB", desc: "Interactive triggers, button selections, & hyperlinks." },
                    { key: "steel", name: "Steel Blue", hex: "#3B82F6", desc: "Subtle borders, secondary boxes & shadows." },
                    { key: "slate", name: "Slate Gray", hex: "#475569", desc: "Text paragraphs & secondary details." },
                    { key: "sky", name: "Bright Electric Blue", hex: "#38BDF8", desc: "Success tags, highlight icons, & custom badges." }
                  ].map((color, idx) => (
                    <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/60 flex items-center gap-3">
                      <div 
                        className="h-10 w-10 rounded-lg flex-shrink-0 border border-slate-700/50 shadow"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-white block truncate">{color.name}</span>
                          <button
                            onClick={() => handleCopy(color.hex, `hex-${idx}`)}
                            className="text-[10px] font-mono text-blue-400 hover:text-white flex items-center cursor-pointer"
                          >
                            {copiedText === `hex-${idx}` ? "Copied!" : color.hex}
                          </button>
                        </div>
                        <span className="block text-[10px] text-slate-400 leading-tight mt-0.5">{color.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950 p-3 border border-slate-850 rounded-xl mt-2 text-center text-xs">
                  <span className="text-slate-500 font-bold uppercase text-[9px] block">Typography Match</span>
                  <span className="text-slate-300 font-semibold">{BRAND_GUIDE.fontFamily}</span>
                </div>
              </div>

            </div>

            {/* Logo concepts displays */}
            <div className="border-t border-slate-800 pt-6">
              <h3 className="font-display font-extrabold text-lg text-white mb-4">3 Professional Agency Logo Concepts</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LOGO_CONCEPTS.map((concept, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      {/* Live stylized icon simulation */}
                      <div className="h-14 w-14 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center mb-4">
                        {i === 0 ? (
                          <div className="flex items-center gap-1">
                            <Layers className="h-7 w-7 text-sky-400" />
                          </div>
                        ) : i === 1 ? (
                          <Shield className="h-7 w-7 text-blue-500" />
                        ) : (
                          <Sparkles className="h-7 w-7 text-sky-400" />
                        )}
                      </div>
                      
                      <h4 className="font-display font-bold text-white text-sm mb-1">{concept.conceptName}</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed mb-4">{concept.description}</p>
                      
                      <div className="space-y-2 border-t border-slate-800 pt-3 text-[10px] text-slate-400">
                        <div>
                          <strong className="text-slate-300 font-bold block">Font Stack:</strong>
                          <span>{concept.fontRecommendation}</span>
                        </div>
                        <div>
                          <strong className="text-slate-300 font-bold block">Icon Style:</strong>
                          <span>{concept.iconRecommendation}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(`${concept.conceptName}\nDescription: ${concept.description}\nFonts: ${concept.fontRecommendation}`, `concept-${i}`)}
                      className="w-full mt-5 font-bold text-xs py-2 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {copiedText === `concept-${i}` ? "Copied Info!" : "Copy Concept Specs"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: FAQ MASTER VAULT (25 QUESTIONS) */}
        {activeSubTab === "faq" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Support FAQ Master Vault Enclosure</h2>
                <p className="text-xs text-slate-400 mt-1">
                  25+ comprehensive diagnostic questions matching GBP, websites, social rules, automations, and results expectations.
                </p>
              </div>

              {/* Instant Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search FAQ vault..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full sm:w-64 bg-slate-950 text-xs text-white border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Filter Sub-selectors */}
            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-lg border border-slate-800/60 max-w-max">
              {["All", "General", "Google GBP", "Web Design", "Social Media", "Pricing & Results"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqFilter(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                    faqFilter === cat 
                      ? "bg-slate-800 text-white" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFaqs.map((faq, idx) => (
                <div key={faq.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold text-blue-400 py-0.5 px-2 bg-blue-950/60 rounded">
                        {faq.category}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">FAQ #{faq.id.split('-')[1]}</span>
                    </div>
                    <h4 className="font-display font-bold text-white text-sm mb-2 leading-tight">
                      Q: {faq.question}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                      A: {faq.answer}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(`Q: ${faq.question}\nA: ${faq.answer}`, `faq-${idx}`)}
                    className="mt-3 text-xs font-semibold text-slate-400 hover:text-white self-start flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded border border-slate-850 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedText === `faq-${idx}` ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                    <span>Copy Q&A</span>
                  </button>
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <div className="col-span-2 text-center p-12 bg-slate-950 border border-slate-850 rounded-2xl">
                  <p className="text-slate-400 text-sm">No matched questions. Try refining your keyword filter!</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 6: SPECIFIC SERVICES PACKAGES */}
        {activeSubTab === "packages" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">Structured Sales Service Pack Matrix</h2>
              <p className="text-xs text-slate-400 mt-1">
                Pitch these three beautifully engineered packages. They feature solid entry points, high margins, and excellent monthly upsell vectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg, idx) => {
                const uniqueId = `pkg-sales-${idx}`;
                return (
                  <div key={idx} className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between ${pkg.isPopular ? 'ring-2 ring-blue-500 bg-gradient-to-b from-slate-900 to-blue-950/30' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded">
                          {pkg.badge || "Standard Plan"}
                        </span>
                        {pkg.isPopular && (
                          <span className="flex items-center gap-0.5 text-[9px] font-bold text-yellow-400 bg-yellow-950/80 px-2 py-0.5 rounded border border-yellow-500/30">
                            <Star className="h-2.5 w-2.5 fill-yellow-400" /> RECOMMENDED
                          </span>
                        )}
                      </div>

                      <h4 className="font-display font-bold text-white text-lg mb-0.5">{pkg.name}</h4>
                      <p className="text-[11px] text-slate-400 min-h-[32px]">{pkg.tagline}</p>
                      
                      <div className="my-4">
                        <span className="text-2xl font-extrabold text-white block">{pkg.price}</span>
                        <span className="text-[10px] text-slate-500 block">Pricing Recommended Target Retainer</span>
                      </div>

                      <div className="space-y-4 border-t border-slate-800/80 pt-4">
                        <div>
                          <strong className="text-[10.5px] uppercase tracking-wider text-slate-400 font-bold block mb-2">Pillar Services:</strong>
                          <ul className="space-y-1.5">
                            {pkg.services.map((ser, sIdx) => (
                              <li key={sIdx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-tight">
                                <Check className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span>{ser}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <strong className="text-[10.5px] uppercase tracking-wider text-slate-400 font-bold block mb-2">Upsell Leverage Points:</strong>
                          <ul className="space-y-1">
                            {pkg.upsellOpportunities.map((ups, uIdx) => (
                              <li key={uIdx} className="text-[11px] text-sky-300 italic flex items-start gap-1 leading-tight">
                                <ChevronRight className="h-3 w-3 text-sky-400 flex-shrink-0 mt-0.5" />
                                <span>{ups}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(`${pkg.name}\nServices: ${pkg.services.join(", ")}\nPrice: ${pkg.price}`, uniqueId)}
                      className="w-full mt-6 font-bold text-xs py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer border border-slate-750"
                    >
                      {copiedText === uniqueId ? "Specs Copied!" : "Copy Package Proposal Specs"}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 7: GOOGLE SITES PLAIN-TEXT PORTABILITY */}
        {activeSubTab === "sites" && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold font-display text-white">Google Sites / Wix Copy-Paste Plain-Text Port</h2>
              <p className="text-xs text-slate-400 mt-1">
                Launching with a $0 budget on Google Sites, Wix, or WordPress? Use these beautifully pre-written document structures to map your layout sections instantly without code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Homepage Outline", key: "homepage", raw: PLAIN_TEXT_GOOGLE_SITES.homepage },
                { label: "Services Page Outline", key: "servicesPage", raw: PLAIN_TEXT_GOOGLE_SITES.servicesPage },
                { label: "Pricing Page Outline", key: "pricingPage", raw: PLAIN_TEXT_GOOGLE_SITES.pricingPage },
                { label: "FAQ Page Outline", key: "faqPage", raw: PLAIN_TEXT_GOOGLE_SITES.faqPage },
              ].map((sitePt, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                      <span className="font-display font-semibold text-sm text-white">📄 {sitePt.label}</span>
                      <span className="text-[10px] text-slate-500 font-mono">No Dependencies Required</span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 h-56 overflow-y-auto font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {sitePt.raw}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(sitePt.raw, `plain-site-${sitePt.key}`)}
                    className="w-full mt-4 font-bold text-xs py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-2"
                  >
                    {copiedText === `plain-site-${sitePt.key}` ? "Copied Plain Text!" : "Copy Section Block to Clipboard"}
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
