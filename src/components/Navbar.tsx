import React, { useState } from "react";
import { Ship, Menu, X, ArrowRight, ShieldCheck, Lock, Activity } from "lucide-react";

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
    { id: "portfolio", label: "Case Studies" },
    { id: "audit", label: "Free Audit" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (tabId: string) => {
    setTab(tabId);
    setShowAdminHub(false);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleAdmin = () => {
    setShowAdminHub(!showAdminHub);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <button 
          onClick={() => handleNav("home")}
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
            <span className="block text-[9px] text-slate-400 tracking-wider">M&H OnlineServices</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNav(item.id)}
              className={`text-sm font-medium transition-colors hover:text-sky-450 relative py-1 cursor-pointer ${
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

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleAdmin}
            id="nav-admin-toggle"
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              showAdminHub 
                ? "bg-slate-900 text-white hover:bg-slate-800 border border-slate-800" 
                : "text-slate-300 bg-slate-900 border border-slate-800/80 hover:bg-slate-800"
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            {showAdminHub ? "Public Website" : "Launch Suite & Leads"}
          </button>
          
          <button
            onClick={() => handleNav("audit")}
            id="nav-cta"
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
          >
            <span>Free Business Audit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleAdmin}
            id="nav-admin-toggle-mobile"
            className={`flex items-center justify-center p-2 rounded-xl border border-slate-800 transition-colors ${
              showAdminHub ? "bg-slate-900 text-white" : "bg-slate-900 text-slate-300"
            }`}
            title="Launch Suite & Leads"
          >
            <Lock className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl border border-slate-800 p-2.5 text-slate-300 hover:bg-slate-900 cursor-pointer"
            id="mobile-menu-btn"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-900 bg-slate-950 px-4 py-6 shadow-xl transition-all">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center py-2.5 text-base font-semibold border-b border-slate-900 text-left ${
                  currentTab === item.id && !showAdminHub ? "text-sky-400 pl-2 border-l-2 border-sky-400" : "text-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={toggleAdmin}
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-slate-900 text-white font-medium py-3 text-sm shadow-md border border-slate-800"
              >
                <Lock className="h-4 w-4" />
                {showAdminHub ? "Return to Live Website" : "Launch Suite (100% Free Tools)"}
              </button>

              <button
                onClick={() => handleNav("audit")}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 text-white font-bold py-3.5 text-sm shadow-lg shadow-blue-500/25"
              >
                <span>Request Free Business Audit</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="pt-4 text-center border-t border-slate-900">
              <span className="text-[11px] text-slate-400 font-medium">An M&H OnlineServices company</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
