import React, { useState } from "react";
import { PORTFOLIO } from "../data";
import { 
  Check, ArrowRight, Star, ArrowUpRight, TrendingUp, 
  MapPin, Clock, BadgeAlert, AlertCircle, FileSpreadsheet, Layers 
} from "lucide-react";

interface PortfolioViewProps {
  setTab: (tab: string) => void;
}

export default function PortfolioView({ setTab }: PortfolioViewProps) {
  // Store which view is selected for each project (key: projectId, value: 'before' | 'after')
  const [toggleState, setToggleState] = useState<{ [key: string]: "before" | "after" }>({
    "port-plumber": "after",
    "port-roofer": "after",
    "port-hvac": "after"
  });

  const handleToggle = (projectId: string, state: "before" | "after") => {
    setToggleState(prev => ({ ...prev, [projectId]: state }));
  };

  const handleAuditCta = () => {
    setTab("audit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="animate-fadeIn bg-slate-950 text-slate-100">
      
      {/* Upper Header */}
      <section className="bg-slate-900 py-16 sm:py-20 border-b border-slate-800" id="portfolio-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Client Proof Concepts</span>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Local Service Demonstration Models
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            These examples illustrate the precise digital improvements and ranking elevations we deploy for our partners. Review the transformations below to see how we locate and patch active revenue leaks.
          </p>
          
          {/* Important standard label */}
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-955/30 border border-amber-900/40 p-2.5 text-[11px] font-medium text-amber-205 max-w-lg mx-auto">
            <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <span><strong>Sample Demonstration Models:</strong> These cases are synthetic layouts prepared for educational client pitches and do not represent actual client accounts.</span>
          </div>
        </div>
      </section>

      {/* Grid of Case Studies */}
      <section className="bg-slate-950 py-16" id="portfolio-cases-grid shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          {PORTFOLIO.map((project, idx) => {
            const isAfter = toggleState[project.id] === "after";
            
            return (
              <div 
                key={project.id}
                className="bg-slate-900 border border-slate-850 shadow-sm rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 flex items-stretch"
                id={`portfolio-case-${project.id}`}
              >
                {/* Visual Diagnostic Panel before-and-after */}
                <div className="lg:col-span-5 bg-slate-955 text-white p-8 flex flex-col justify-between relative min-h-[300px]">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

                  {/* Toggle header buttons */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
                      <span className="text-[10px] font-bold text-sky-450 uppercase tracking-widest">A/B Diagnostics Slider</span>
                      <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg">
                        <button
                          onClick={() => handleToggle(project.id, "before")}
                          className={`px-3 py-1 text-[10px] uppercase font-bold rounded cursor-pointer transition-all ${
                            !isAfter ? "bg-red-950/80 border border-red-500/30 text-red-300" : "text-slate-500"
                          }`}
                        >
                          BEFORE
                        </button>
                        <button
                          onClick={() => handleToggle(project.id, "after")}
                          className={`px-3 py-1 text-[10px] uppercase font-bold rounded cursor-pointer transition-all ${
                            isAfter ? "bg-green-950/80 border border-green-500/30 text-green-300" : "text-slate-500"
                          }`}
                        >
                          AFTER
                        </button>
                      </div>
                    </div>

                    {/* Active State View */}
                    <div className="space-y-4 py-4 min-h-[140px]">
                      {!isAfter ? (
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 block bg-red-950/30 w-max px-2 py-0.5 rounded border border-red-900/30">
                            Discovered Revenue Leaks
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-mono">
                            {project.beforeImg}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <BadgeAlert className="h-4 w-4 text-red-500" />
                            <span>Lacking Maps validation or SMS textback</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-green-400 block bg-green-950/30 w-max px-2 py-0.5 rounded border border-green-900/30">
                            Pillar Performance Applied
                          </span>
                          <p className="text-xs text-slate-100 leading-relaxed font-mono">
                            {project.afterImg}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span>100% Secure automated Google Local sync</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlight core metric bubble */}
                  <div className="bg-slate-900 border border-slate-800 p-4.5 rounded-xl mt-4 relative z-10">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block mb-0.5">Key Performance Indicator</span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-black font-display ${isAfter ? 'text-green-400' : 'text-slate-500'}`}>
                        {isAfter ? project.metric : "---"}
                      </span>
                      <span className="text-xs text-slate-300">{project.metricLabel}</span>
                    </div>
                  </div>

                </div>

                {/* Content description details */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="rounded bg-slate-950 px-2 py-0.5 text-[10px] font-bold text-sky-400 tracking-wide uppercase inline-block border border-slate-850">
                      {project.category}
                    </span>
                    
                    <h3 className="font-display font-extrabold text-white text-xl sm:text-2xl leading-tight block">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-305 leading-relaxed block">
                      {project.description}
                    </p>

                    <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-850">
                      <h4 className="font-display font-bold text-white text-xs mb-1">Diagnosis Analysis & Results Approach:</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {project.details}
                      </p>
                    </div>
                  </div>

                  {/* Card bottom action */}
                  <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-slate-405">
                      <Clock className="h-4 w-4 text-slate-450" />
                      <span className="text-[10px] font-mono">10-Day Implementation Timeline</span>
                    </div>

                    <button
                      onClick={handleAuditCta}
                      className="text-xs font-bold text-sky-450 hover:text-sky-305 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                    >
                      <span>Draft similar plan for my business</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* CTA Final Block */}
      <section className="bg-slate-955 text-white py-16 text-center border-t border-slate-900" id="portfolio-lower-cta">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Want To Uncover Your Discovered Revenue Gaps?
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
            Our free Audit checks every zip code citation, page index loading performance, and mobile layout. No obligations required.
          </p>
          <button
            onClick={handleAuditCta}
            className="font-extrabold text-xs py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer transition-all uppercase tracking-wider inline-flex items-center gap-1"
          >
            <span>Claim My Free Business Diagnostic Plan</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
