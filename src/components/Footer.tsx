import React from "react";
import { Activity, ShieldAlert, Heart, HelpCircle, PhoneCall, Mail } from "lucide-react";

interface FooterProps {
  setTab: (tab: string) => void;
  setShowAdminHub: (show: boolean) => void;
}

export default function Footer({ setTab, setShowAdminHub }: FooterProps) {
  
  const handleNav = (tabId: string) => {
    setTab(tabId);
    setShowAdminHub(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800" id="agency-footer">
      
      {/* Top section links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow shadow-blue-500/20">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-white tracking-tight">LeadForge Local</span>
              <span className="block text-[9px] text-slate-500 uppercase tracking-widest">An M&H OnlineServices Company</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-450 leading-relaxed max-w-sm">
            We help local home service trade contractors generate more inquiries, book more property jobs, and grow localized digital rankings. Simple setup. Clear pricing. Real dollars in your bank.
          </p>

          <div className="text-[10px] text-slate-500">
            <span>Primary division of</span> • <strong className="text-slate-450">M&H OnlineServices, LLC</strong>
          </div>
        </div>

        {/* Navigation column */}
        <div className="md:col-span-3 space-y-3.5">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Agency Operations</h4>
          <ul className="text-xs space-y-2 font-medium">
            {[
              { id: "home", label: "Home Base" },
              { id: "about", label: "Our Narrative" },
              { id: "services", label: "Pillar Services" },
              { id: "pricing", label: "Special Packages" },
              { id: "portfolio", label: "Case Examples" }
            ].map(link => (
              <li key={link.id}>
                <button 
                  onClick={() => handleNav(link.id)}
                  className="hover:text-blue-400 cursor-pointer transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Niche list column */}
        <div className="md:col-span-4 space-y-3.5">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider font-display">Target Industries We Serve</h4>
          <div className="text-xs text-slate-400 grid grid-cols-2 gap-x-4 gap-y-2 italic">
            <span>• Home Services & Trades</span>
            <span>• Lawyers & Attorneys</span>
            <span>• Doctors & Dental Clinics</span>
            <span>• Restaurants & Cafes</span>
            <span>• Chiropractors & Spas</span>
            <span>• Therapists & Coaches</span>
            <span>• Physical Trainers</span>
            <span>• Local Small Business</span>
          </div>
          
          <div className="pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-blue-500 fill-blue-500" />
            <span>Supporting local health, trade, restaurant & legal communities</span>
          </div>
        </div>

      </div>

      {/* Underbar terms copyrights */}
      <div className="bg-slate-950/60 py-6 text-center text-[10.5px] border-t border-slate-900 text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} LeadForge Local. An M&H OnlineServices company. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-slate-350">Service Terms</span>
            <span className="cursor-pointer hover:text-slate-350">Privacy Protection</span>
            <span className="cursor-pointer hover:text-slate-350" onClick={() => { setShowAdminHub(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Owner Desk</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
