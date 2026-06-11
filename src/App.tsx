import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ServicesView from "./components/ServicesView";
import PricingView from "./components/PricingView";
import PortfolioView from "./components/PortfolioView";
import FreeAuditView from "./components/FreeAuditView";
import ContactView from "./components/ContactView";
import AdminHub from "./components/AdminHub";
import Footer from "./components/Footer";
import TermsView from "./components/TermsView";
import PrivacyView from "./components/PrivacyView";
import { AuditLead, ContactLead } from "./types";

export default function App() {
  const [currentTab, setTab] = useState<string>("home");
  const [showAdminHub, setShowAdminHub] = useState<boolean>(false);

  // Load and save audit leads with local storage
  const [auditLeads, setAuditLeads] = useState<AuditLead[]>(() => {
    const saved = localStorage.getItem("leadforge_audit_leads");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse audit leads:", e);
      }
    }
    // Return sample realistic trade contractor leads initially for excellent demonstration value
    return [
      {
        id: "sample-1",
        name: "Arthur Pendelton",
        businessName: "VIP Plumbing & Drain",
        email: "arthur@vipplumbing.com",
        phone: "555-0182",
        website: "www.vipplumbingdallas.com",
        gbpLink: "https://maps.google.com/?cid=1214",
        submittedAt: "2026-06-06 14:32",
        status: "In Review"
      },
      {
        id: "sample-2",
        name: "Gary Davidson",
        businessName: "Apex Roofing Group",
        email: "gary@apexroofs.com",
        phone: "555-0104",
        website: "No existing website",
        gbpLink: "https://maps.google.com/?cid=8329",
        submittedAt: "2026-06-07 09:12",
        status: "Pending"
      }
    ];
  });

  const [contactLeads, setContactLeads] = useState<ContactLead[]>(() => {
    const saved = localStorage.getItem("leadforge_contact_leads");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse contact leads:", e);
      }
    }
    return [
      {
        id: "sample-c1",
        name: "Raymond King",
        email: "rking@comfortkingair.com",
        phone: "555-0118",
        businessName: "Comfort King Air",
        message: "We need an ultra-fast website redesign and custom review QR setups. Please recall back.",
        submittedAt: "2026-06-07 10:20"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("leadforge_audit_leads", JSON.stringify(auditLeads));
  }, [auditLeads]);

  useEffect(() => {
    localStorage.setItem("leadforge_contact_leads", JSON.stringify(contactLeads));
  }, [contactLeads]);

  const handleAddAuditLead = (lead: Omit<AuditLead, "id" | "submittedAt" | "status">) => {
    const newLead: AuditLead = {
      ...lead,
      id: "audit-" + Math.random().toString(36).substring(2, 9),
      submittedAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "Pending"
    };
    setAuditLeads(prev => [newLead, ...prev]);
  };

  const handleAddContactLead = (lead: Omit<ContactLead, "id" | "submittedAt">) => {
    const newLead: ContactLead = {
      ...lead,
      id: "contact-" + Math.random().toString(36).substring(2, 9),
      submittedAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setContactLeads(prev => [newLead, ...prev]);
  };

  const handleClearLeads = () => {
    localStorage.removeItem("leadforge_audit_leads");
    localStorage.removeItem("leadforge_contact_leads");
    // Reload standard sample leads
    setAuditLeads([
      {
        id: "sample-1",
        name: "Arthur Pendelton",
        businessName: "VIP Plumbing & Drain",
        email: "arthur@vipplumbing.com",
        phone: "555-0182",
        website: "www.vipplumbingdallas.com",
        gbpLink: "https://maps.google.com/?cid=1214",
        submittedAt: "2026-06-06 14:32",
        status: "In Review"
      },
      {
        id: "sample-2",
        name: "Gary Davidson",
        businessName: "Apex Roofing Group",
        email: "gary@apexroofs.com",
        phone: "555-0104",
        website: "No existing website",
        gbpLink: "https://maps.google.com/?cid=8329",
        submittedAt: "2026-06-07 09:12",
        status: "Pending"
      }
    ]);
    setContactLeads([
      {
        id: "sample-c1",
        name: "Raymond King",
        email: "rking@comfortkingair.com",
        phone: "555-0118",
        businessName: "Comfort King Air",
        message: "We need an ultra-fast website redesign and custom review QR setups. Please recall back.",
        submittedAt: "2026-06-07 10:20"
      }
    ]);
  };

  const renderActiveView = () => {
    if (showAdminHub) {
      return (
        <AdminHub 
          auditLeads={auditLeads} 
          contactLeads={contactLeads} 
          onClearLeads={handleClearLeads}
        />
      );
    }

    switch (currentTab) {
      case "home":
        return <HomeView setTab={setTab} setShowAdminHub={setShowAdminHub} />;
      case "about":
        return <AboutView setTab={setTab} />;
      case "services":
        return <ServicesView setTab={setTab} />;
      case "pricing":
        return <PricingView setTab={setTab} />;
      case "portfolio":
        return <PortfolioView setTab={setTab} />;
      case "audit":
        return <FreeAuditView onAddAuditLead={handleAddAuditLead} />;
      case "contact":
        return <ContactView onAddContactLead={handleAddContactLead} />;
      case "terms":
        return <TermsView setTab={setTab} />;
      case "privacy":
        return <PrivacyView setTab={setTab} />;
      default:
        return <HomeView setTab={setTab} setShowAdminHub={setShowAdminHub} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Prime Header navigation links */}
      <Navbar 
        currentTab={currentTab} 
        setTab={setTab} 
        showAdminHub={showAdminHub} 
        setShowAdminHub={setShowAdminHub} 
      />

      {/* Main active view container block */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Corporate Footers */}
      <Footer 
        setTab={setTab} 
        setShowAdminHub={setShowAdminHub} 
      />

    </div>
  );
}
