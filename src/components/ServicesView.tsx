import React, { useState } from "react";
import { 
  SERVICES 
} from "../data";
import { 
  SearchCode, MapPin, Facebook, Share2, Star, Palette, Globe, 
  RefreshCw, FileText, UserCheck, Bot, PhoneForwarded, TrendingUp, 
  Check, Sparkles, Filter, AlertCircle, Phone 
} from "lucide-react";

interface ServicesViewProps {
  setTab: (tab: string) => void;
}

// Icon mapper to prevent compile or import failures
const renderLucideIcon = (iconName: string) => {
  const props = { className: "h-6 w-6 text-sky-400 flex-shrink-0" };
  switch (iconName) {
    case "SearchCode": return <SearchCode {...props} />;
    case "MapPin": return <MapPin {...props} />;
    case "Facebook": return <Facebook {...props} />;
    case "Share2": return <Share2 {...props} />;
    case "Star": return <Star {...props} />;
    case "Palette": return <Palette {...props} />;
    case "Globe": return <Globe {...props} />;
    case "RefreshCw": return <RefreshCw {...props} />;
    case "FileText": return <FileText {...props} />;
    case "UserCheck": return <UserCheck {...props} />;
    case "Bot": return <Bot {...props} />;
    case "PhoneForwarded": return <PhoneForwarded {...props} />;
    case "TrendingUp": return <TrendingUp {...props} />;
    default: return <Sparkles {...props} />;
  }
};

export default function ServicesView({ setTab }: ServicesViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Google GBP", "Websites", "Social Media", "Reputation", "Automation"];

  const filteredServices = activeCategory === "All" 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  const handleAuditCta = () => {
    setTab("audit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="animate-fadeIn bg-slate-950 text-slate-100">
      
      {/* Editorial Header */}
      <section className="bg-slate-900 py-16 sm:py-20 border-b border-slate-800" id="services-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Complete Portfolio</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Affordable Local SEO, Web Design, & Lead Systems
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Choose from our individual targeted setup packages or comprehensive monthly retainers. We help you establish high rankings, look professional, and secure hot bookings with zero tech complexity.
          </p>
        </div>
      </section>

      {/* SEO Targets callout block - Act as SEO expert */}
      <section className="bg-slate-950 py-10 border-b border-slate-900" id="services-seo-dashboard">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#38BDF8] block animate-pulse">Localized SEO Metrics</span>
                <h4 className="font-display font-bold text-sm text-white">How We Optimize Your Listings for Local Searches</h4>
                <p className="text-[11px] text-slate-350 leading-relaxed font-sans text-slate-300">
                  Every service we configure—from layout headers to GBP descriptions—is built around target local search categories to help search engines and local residents find your specific trade instantly.
                </p>
              </div>

              {/* Keyword Cloud */}
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {[
                  "Local SEO", "Google Business Profile Optimization", "Google Business Management", 
                  "Website Design", "Website Creation", "Lead Generation", "Facebook Business Marketing", 
                  "Online Reputation Management", "Small Business Marketing"
                ].map((kw, i) => (
                  <span key={i} className="text-[9.5px] font-mono rounded bg-slate-950 text-slate-300 border border-slate-850 px-2.5 py-1">
                    🏷️ {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Listings Section */}
      <section className="bg-slate-950 py-16" id="services-grid-wrapper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Category filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-6 scrollbar-none mb-12 border-b border-slate-900">
            <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter Industry Vault:</span>
            
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  activeCategory === cat 
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-900 text-slate-355 hover:bg-slate-850 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Master Grid of Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service, idx) => (
              <div 
                key={service.id} 
                className="bg-slate-900 border border-slate-850 rounded-2xl p-7 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-md transition-all flex flex-col justify-between"
                id={`service-card-${service.id}`}
              >
                {/* Content */}
                <div>
                  
                  {/* Title block */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex select-none h-11 w-11 items-center justify-center rounded-xl bg-slate-955 border border-slate-800">
                      {renderLucideIcon(service.iconName)}
                    </div>
                    
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-sky-400 block">{service.priceTag}</span>
                      <span className="text-[10px] text-slate-450 leading-none">Starting Rate</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <span className="rounded bg-slate-950 px-1.5 py-0.5 text-[9px] font-bold text-sky-400 tracking-wide uppercase inline-block border border-slate-800">
                      {service.category}
                    </span>
                    <h3 className="font-display font-extrabold text-white text-lg leading-tight block">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed block">
                      {service.description}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pl-3.5 border-l-2 border-slate-800 italic block">
                      {service.detailedDescription}
                    </p>
                  </div>

                  {/* Bullet Benefits */}
                  <div className="mt-6">
                    <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-bold block mb-2">What is included:</span>
                    <ul className="space-y-1.5">
                      {service.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-tight">
                          <Check className="h-4 w-4 text-sky-400 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Footer action */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-405 font-semibold">M&H Division Setup Standards</span>
                  <button
                    onClick={handleAuditCta}
                    className="text-xs font-bold text-sky-400 hover:text-sky-305 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Audit & Quote</span>
                    <Check className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust reassurance banner */}
      <section className="bg-slate-950 text-white py-16 border-t border-slate-900" id="services-trust-reassurance">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white mx-auto">
            <Check className="h-6 w-6 stroke-[2.5]" />
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Not Sure Which Services You Require?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
            Our 100% Free Simple Online Checkup looks at your Google Maps listing and how your business displays on clients' phones—giving you an easy-to-understand game plan to win more customers in your area.
          </p>

          <button
            onClick={handleAuditCta}
            className="font-extrabold text-xs py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer shadow-md inline-flex items-center gap-1"
          >
            <span>Request Free Diagnostic Report Card</span>
            <Check className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
