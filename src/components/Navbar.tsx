import React, { useState } from "react";
import { Ship, Menu, X, ArrowRight, ShieldCheck, Lock, Activity, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackPhoneClick, trackCtaClick } from "../utils/analytics";

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  showAdminHub: boolean;
  setShowAdminHub: (show: boolean) => void;
}

export default function Navbar({ currentTab, setTab, showAdminHub, setShowAdminHub }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "pricing", label: "Pricing Packages" },
    { id: "portfolio", label: "Sample Work" },
    { id: "audit", label: "Free Audit" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (tabId: string, label: string) => {
    trackCtaClick(`nav_${tabId}`, label);
    setTab(tabId);
    setShowAdminHub(false);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePhoneDial = (location: string) => {
    trackPhoneClick("(469) 751-7153", location);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <button 
          onClick={() => handleNav("home", "Home Logo")}
          className="flex items-center gap-3 group text-left cursor-pointer"
          id="nav-logo"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <Activity className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-display text-xl font-bold tracking-tight text-white animate-fadeIn">LeadForge</span>
              <span className="rounded bg-blue-500/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-sky-400 uppercase">Local</span>
            </div>
            <span className="block text-[9px] text-slate-400 tracking-wider">Local Lead Growth Support</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNav(item.id, item.label)}
              className={`text-sm font-medium transition-all hover:text-sky-400 relative py-1 cursor-pointer ${
                currentTab === item.id && !showAdminHub
                  ? "text-sky-400 font-semibold"
                  : "text-slate-300"
              }`}
            >
              {item.label}
              {currentTab === item.id && !showAdminHub && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons & Desktop Click-To-Call */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:4697517153"
            onClick={() => handlePhoneDial("desktop_header")}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-sky-400 transition-colors py-2"
          >
            <Phone className="h-4 w-4 text-sky-400 animate-pulse" />
            <span className="font-mono">Heather: (469) 751-7153</span>
          </a>

          <button
            onClick={() => handleNav("audit", "Get My Free Business Audit CTA")}
            id="nav-cta"
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
          >
            <span>Get My Free Business Audit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger & Mobile Click-To-Call */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="tel:4697517153"
            onClick={() => handlePhoneDial("mobile_header_icon")}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 text-sky-400 bg-slate-900/50 hover:bg-slate-900 hover:text-sky-305 transition-colors active:scale-95 touch-manipulation"
            title="Call Support Team"
          >
            <Phone className="h-5 w-5" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl border border-slate-800 p-2.5 text-slate-300 hover:bg-slate-900 cursor-pointer active:scale-95 touch-manipulation"
            id="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel with Framer Motion wrapper */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-slate-900 bg-slate-950 px-4 py-6 shadow-xl"
            id="mobile-navigation-dropdown"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNav(item.id, `mobile_${item.label}`)}
                  className={`flex items-center py-3.5 text-base font-semibold border-b border-slate-900 text-left touch-manipulation cursor-pointer ${
                    currentTab === item.id && !showAdminHub ? "text-sky-400 pl-3 border-l-2 border-sky-400" : "text-slate-205"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 flex flex-col gap-4">
                <a
                  href="tel:4697517153"
                  onClick={() => handlePhoneDial("mobile_dropdown_cta")}
                  className="flex items-center justify-center gap-2.5 w-full rounded-xl border border-slate-800 bg-slate-900/40 text-sky-400 font-bold py-3.5 text-sm active:scale-95 touch-manipulation"
                >
                  <Phone className="h-4.5 w-4.5" />
                  <span>Call Direct: (469) 751-7153</span>
                </a>

                <button
                  onClick={() => handleNav("audit", "mobile_dropdown_audit_cta")}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 text-white font-bold py-3.5 text-sm shadow-lg shadow-blue-500/25 active:scale-95 touch-manipulation"
                >
                  <span>Get My Free Business Audit</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="pt-4 text-center border-t border-slate-900">
                <span className="text-[11px] text-slate-400 font-medium">Local Visibility & Lead Capture</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
