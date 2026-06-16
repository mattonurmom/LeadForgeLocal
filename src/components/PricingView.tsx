import React, { useState } from "react";
import { PACKAGES, FAQ } from "../data";
import { Check, Star, HelpCircle, ChevronDown, ChevronUp, Search, SlidersHorizontal } from "lucide-react";

interface PricingViewProps {
  setTab: (tab: string) => void;
}

export default function PricingView({ setTab }: PricingViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const toggleFaq = (id: string) => {
    setExpandedFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAllFaqs = (expand: boolean) => {
    const newExpanded: Record<string, boolean> = {};
    if (expand) {
      filteredFaqs.forEach(faq => {
        newExpanded[faq.id] = true;
      });
    }
    setExpandedFaqs(newExpanded);
  };

  const categories = ["All", "General", "Web Design", "Social Media", "Marketing", "Lead Generation"];

  const filteredFaqs = FAQ.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                    Get My Free Visibility Review
                  </button>
                  <span className="text-[10px] text-slate-450 block">Or book free call above</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: THE COMPREHENSIVE 25 FAQ VAULT */}
      <section className="bg-slate-900 border-t border-slate-850 py-20 sm:py-24" id="faq-vault-section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-sky-400">
              <HelpCircle className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block font-sans">Complete Transparency</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mx-auto font-sans">
              What does LeadForge Local actually do to help your business? Look through our complete 25-point Q&A vault covering Google maps setups, reviews, and missed-call text-back systems.
            </p>
          </div>

          {/* Interactive controls */}
          <div className="bg-slate-950/70 border border-slate-850 p-6 rounded-3xl mb-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search all 25 questions & answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Toggle Controls */}
              <div className="flex gap-2 justify-end text-right">
                <button
                  type="button"
                  onClick={() => toggleAllFaqs(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] font-bold text-slate-300 transition-all cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={() => toggleAllFaqs(false)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[11px] font-bold text-slate-300 transition-all cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 self-center mr-2">Filter Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/10"
                      : "bg-slate-900 border-slate-850 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive matched results status */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[11px] text-slate-400 font-mono">
              Showing <strong className="text-white font-semibold">{filteredFaqs.length}</strong> of 25 directory items
            </span>
          </div>

          {/* FAQ Accordion List */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isExpanded = !!expandedFaqs[faq.id];
                return (
                  <div
                    key={faq.id}
                    className={`bg-slate-950 rounded-2xl border transition-all duration-300 ${
                      isExpanded
                        ? "border-blue-600/50 shadow-md shadow-blue-500/5"
                        : "border-slate-850 hover:border-slate-800"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="flex gap-3 items-start">
                        <span className="text-[10px] font-mono text-slate-500 font-semibold mt-0.5 whitespace-nowrap">
                          {faq.id.replace("faq-", "#")}
                        </span>
                        <div className="space-y-1">
                          <span className="text-[9.5px] uppercase font-bold text-sky-400 tracking-wider">
                            {faq.category}
                          </span>
                          <h3 className="font-display font-bold text-sm text-white leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-850 text-slate-450 flex-shrink-0 mt-1">
                        {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-300" /> : <ChevronDown className="h-4 w-4 text-slate-450" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-850">
                        <div className="text-slate-300 text-[12.5px] leading-relaxed pl-7 italic font-sans">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-950 rounded-3xl p-12 text-center border border-slate-850">
              <HelpCircle className="h-10 w-10 text-slate-600 mx-auto mb-4" />
              <h4 className="font-display font-bold text-white text-sm mb-1">No FAQ entries match your exact query</h4>
              <p className="text-xs text-slate-400 font-sans">Try modifying your search text or switching the category filter.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
