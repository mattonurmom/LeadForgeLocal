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
import { initGA4 } from "./utils/analytics";

export default function App() {
  const [currentTab, setTab] = useState<string>("home");
  const [showAdminHub, setShowAdminHubState] = useState<boolean>(false);

  useEffect(() => {
    // 1. Initialize GA4 tracking safely
    initGA4("G-MOCKTRACK8");

    // 2. Overwrite hardcoded canonical tags dynamically based on the exact mounted domain
    const origin = window.location.origin;
    const path = window.location.pathname;
    const currentUrl = origin + path;

    let canonicalLinkNode = document.querySelector("link[rel='canonical']");
    if (canonicalLinkNode) {
      canonicalLinkNode.setAttribute("href", currentUrl);
    } else {
      canonicalLinkNode = document.createElement("link");
      canonicalLinkNode.setAttribute("rel", "canonical");
      canonicalLinkNode.setAttribute("href", currentUrl);
      document.head.appendChild(canonicalLinkNode);
    }

    // 3. Update Open Graph and Twitter metadata dynamically (Task 9)
    const socialMeta = {
      "og:title": "AI-Powered Local Marketing That Generates Leads",
      "og:description": "Websites, SEO, AI Chatbots, and Lead Generation for Local Businesses.",
      "og:url": currentUrl,
      "og:type": "website",
      "og:image": origin + "/src/assets/images/frustrated_laptop_1780974909506.png",
      "twitter:card": "summary_large_image",
      "twitter:title": "AI-Powered Local Marketing That Generates Leads",
      "twitter:description": "Websites, SEO, AI Chatbots, and Lead Generation for Local Businesses.",
      "twitter:image": origin + "/src/assets/images/frustrated_laptop_1780974909506.png"
    };

    Object.entries(socialMeta).forEach(([property, value]) => {
      const isOg = property.startsWith("og:");
      const attrName = isOg ? "property" : "name";
      let metaNode = document.querySelector(`meta[${attrName}='${property}']`);
      if (metaNode) {
        metaNode.setAttribute("content", value);
      } else {
        metaNode = document.createElement("meta");
        metaNode.setAttribute(attrName, property);
        metaNode.setAttribute("content", value);
        document.head.appendChild(metaNode);
      }
    });

    // 4. Inject validated rich Google-compliant JSON-LD schemas (Task 10)
    const jsonLdSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "LeadForge Local",
        "url": origin,
        "logo": origin + "/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-469-751-7153",
          "contactType": "customer care",
          "areaServed": "US",
          "availableLanguage": "en"
        },
        "founder": [
          {
            "@type": "Person",
            "name": "Heather Tucker"
          },
          {
            "@type": "Person",
            "name": "Matthew Tucker"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "LeadForge Local",
        "image": origin + "/src/assets/images/tradesman_worker_1780974939055.png",
        "telephone": "+1-469-751-7153",
        "email": "support@leadforgelocal.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dallas",
          "addressRegion": "TX",
          "addressCountry": "US"
        },
        "priceRange": "$$",
        "areaServed": "US"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Automated Missed Call Text-back?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When you miss an incoming ringer call, our automated service instantly texts the customer back, booking their trade appointment and converting them before they try competitor companies."
            }
          },
          {
            "@type": "Question",
            "name": "Can you optimize my Google Business Profile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we target localized keywords, citations, categories, and review generation flow vectors to improve your visibility inside the local Google Maps 3-Pack."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Conversion-Focused Local SEO Services",
        "provider": {
          "@type": "Organization",
          "name": "LeadForge Local"
        },
        "serviceType": "Digital Visibility Support, Maps SEO, Review Automation, and Web Design for Trade Contractors"
      }
    ];

    // Remove any stale schemas before injects
    document.querySelectorAll(".leadforge-injected-schema").forEach(e => e.remove());

    jsonLdSchemas.forEach(schema => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.className = "leadforge-injected-schema";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === "/admin") {
        setShowAdminHubState(true);
      } else {
        setShowAdminHubState(false);
      }
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleSetShowAdminHub = (show: boolean) => {
    if (show) {
      window.history.pushState(null, "", "/admin");
      setShowAdminHubState(true);
    } else {
      window.history.pushState(null, "", "/");
      setShowAdminHubState(false);
    }
  };

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
        return <HomeView setTab={setTab} setShowAdminHub={handleSetShowAdminHub} />;
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
        return <HomeView setTab={setTab} setShowAdminHub={handleSetShowAdminHub} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Prime Header navigation links */}
      <Navbar 
        currentTab={currentTab} 
        setTab={setTab} 
        showAdminHub={showAdminHub} 
        setShowAdminHub={handleSetShowAdminHub} 
      />

      {/* Main active view container block */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Corporate Footers */}
      <Footer 
        setTab={setTab} 
        setShowAdminHub={handleSetShowAdminHub} 
      />

    </div>
  );
}
