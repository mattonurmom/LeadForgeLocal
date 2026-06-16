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
import ClientChatbox from "./components/ClientChatbox";
import { AuditLead, ContactLead, ChatSessionLead } from "./types";
import { initGA4 } from "./utils/analytics";

export default function App() {
  const [currentTab, setTab] = useState<string>("home");
  const [showAdminHub, setShowAdminHubState] = useState<boolean>(false);

  const pathToTab: Record<string, string> = {
    "/": "home",
    "/about": "about",
    "/services": "services",
    "/pricing": "pricing",
    "/portfolio": "portfolio",
    "/free-audit": "audit",
    "/contact": "contact",
    "/privacy": "privacy",
    "/terms": "terms",
  };

  const tabToPath: Record<string, string> = {
    "home": "/",
    "about": "/about",
    "services": "/services",
    "pricing": "/pricing",
    "portfolio": "/portfolio",
    "audit": "/free-audit",
    "contact": "/contact",
    "privacy": "/privacy",
    "terms": "/terms",
  };

  const routeMetaData: Record<string, { title: string; desc: string; image: string }> = {
    "home": {
      title: "LeadForge Local | Conversion-Focused Local SEO & Web Design",
      desc: "LeadForge Local helps plumbers, roofers, and local tradesmen get 2x more maps calls. Instant missed-call text back and profile ranking.",
      image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
    },
    "about": {
      title: "About Us | LeadForge Local",
      desc: "Meet Matthew & Heather Eisan, founders of LeadForge Local. We build lightning-fast contractor websites & maps SEO systems that grow your trades business.",
      image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
    },
    "services": {
      title: "Our Local SEO & Tech Services | LeadForge Local",
      desc: "Google Maps SEO, GBP 3-Pack optimization, missed call text back automation, and beautiful websites for local service companies.",
      image: "/src/assets/images/tradesman_worker_1781286632167.jpg"
    },
    "pricing": {
      title: "Simple Pricing Plans | LeadForge Local",
      desc: "Affordable flat-rate contractor local SEO, automated reviews setup, and custom landing pages. No hidden contracts.",
      image: "/src/assets/images/restaurant_owner_1781286617140.jpg"
    },
    "portfolio": {
      title: "Our Work & Client Stories | LeadForge Local",
      desc: "See how local trade companies, roofers, dentists, and restaurants scaled their map rankings and calls with LeadForge Local.",
      image: "/src/assets/images/restaurant_owner_1781286617140.jpg"
    },
    "audit": {
      title: "Get a Free Google Business Scan | LeadForge Local",
      desc: "Run our free automated 3-Point audit on your Google Maps listing. Identify slow mobile pages and text-back leaks instantly.",
      image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
    },
    "contact": {
      title: "Contact LeadForge Local | North Fort Worth/Alliance Area (Serving DFW)",
      desc: "Ready to dominate your city's local search packs? Reach out to Matthew & Heather Eisan today for custom lead growth services.",
      image: "/src/assets/images/tradesman_worker_1781286632167.jpg"
    },
    "privacy": {
      title: "Privacy Policy | LeadForge Local",
      desc: "Learn about how securely we sandboxed your lead information and respect your absolute user data privacy.",
      image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
    },
    "terms": {
      title: "Terms of Service | LeadForge Local",
      desc: "Our plain English terms. How we optimize Google profiles, landing pages, and lead automations for local businesses.",
      image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
    },
    "admin": {
      title: "Command Center Login | LeadForge Admin",
      desc: "Secure entry console for the LeadForge Local CRM and AI Playbook adviser cockpit. PIN-protected credentials lock.",
      image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
    }
  };

  useEffect(() => {
    // 1. Initialize GA4 tracking safely
    initGA4();
  }, []);

  // Update URL history whenever tab / admin console state changes
  useEffect(() => {
    const path = window.location.pathname;
    if (showAdminHub) {
      if (path !== "/admin") {
        window.history.pushState(null, "", "/admin");
      }
    } else {
      const activePath = tabToPath[currentTab] || "/";
      if (path !== activePath) {
        window.history.pushState(null, "", activePath);
      }
    }
  }, [currentTab, showAdminHub]);

  // Handle popstate navigation changes (Forward/Backward browser buttons)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === "/admin") {
        setShowAdminHubState(true);
      } else {
        setShowAdminHubState(false);
        const mappedTab = pathToTab[path] || "home";
        setTab(mappedTab);
      }
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Set page titles, meta tags, and rich JSON-LD schema dynamically
  useEffect(() => {
    const origin = window.location.origin;
    const path = window.location.pathname;
    const currentUrl = origin + path;

    const activeKey = showAdminHub ? "admin" : currentTab;
    const meta = routeMetaData[activeKey] || routeMetaData["home"];

    // Update Title
    document.title = meta.title;

    // Update Description
    let descNode = document.querySelector("meta[name='description']");
    if (descNode) {
      descNode.setAttribute("content", meta.desc);
    } else {
      descNode = document.createElement("meta");
      descNode.setAttribute("name", "description");
      descNode.setAttribute("content", meta.desc);
      document.head.appendChild(descNode);
    }

    // Update Canonical
    let canonicalLinkNode = document.querySelector("link[rel='canonical']");
    if (canonicalLinkNode) {
      canonicalLinkNode.setAttribute("href", currentUrl);
    } else {
      canonicalLinkNode = document.createElement("link");
      canonicalLinkNode.setAttribute("rel", "canonical");
      canonicalLinkNode.setAttribute("href", currentUrl);
      document.head.appendChild(canonicalLinkNode);
    }

    // Update Social Medias og/twitter
    const socialMeta = {
      "og:title": meta.title,
      "og:description": meta.desc,
      "og:url": currentUrl,
      "og:type": "website",
      "og:image": origin + meta.image,
      "twitter:card": "summary_large_image",
      "twitter:title": meta.title,
      "twitter:description": meta.desc,
      "twitter:image": origin + meta.image
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

    // Load structured JSON-LD schemas
    const schemas: any[] = [
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
            "name": "Heather Eisan"
          },
          {
            "@type": "Person",
            "name": "Matthew Eisan"
          }
        ]
      }
    ];

    if (activeKey === "home") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "LeadForge Local",
        "image": origin + "/src/assets/images/tradesman_worker_1781286632167.jpg",
        "telephone": "+1-469-751-7153",
        "email": "support@leadforgelocal.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "North Fort Worth/Alliance Area",
          "addressRegion": "TX",
          "addressCountry": "US"
        },
        "priceRange": "$$",
        "areaServed": "US"
      });
      schemas.push({
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
      });
    }

    if (activeKey === "services") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Conversion-Focused Local SEO Services",
        "provider": {
          "@type": "Organization",
          "name": "LeadForge Local"
        },
        "serviceType": "Digital Visibility Support, Maps SEO, Review Automation, and Web Design for Trade Contractors"
      });
    }

    // Remove any stale injected schemas
    document.querySelectorAll(".leadforge-injected-schema").forEach(e => e.remove());

    schemas.forEach(schema => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.className = "leadforge-injected-schema";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

  }, [currentTab, showAdminHub]);

  const handleSetShowAdminHub = (show: boolean) => {
    setShowAdminHubState(show);
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

  // Load and save client chat sessions leads
  const [chatLeads, setChatLeads] = useState<ChatSessionLead[]>(() => {
    const saved = localStorage.getItem("leadforge_chat_leads");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse chat session leads:", e);
      }
    }
    // Return sample chat session for excellent design display value
    return [
      {
         id: "sample-chat-1",
         startedAt: new Date(Date.now() - 3600000).toISOString(),
         lastActive: new Date(Date.now() - 1200000).toISOString(),
         messagesCount: 4,
         businessContext: "Fort Worth Roofing Shop",
         summaryNotes: "### 📋 Conversation Insights\n\n- **Client Inquiry**: Asked about the Premium Growth Plan ($499/mo) and automated missed-call SMS lookup.\n- **Pain Points**: Owner is often on site and misses about 5 phone calls a day, losing client quotes.\n- **Sales Match**: Highly interested in Missed Call Auto-Text Back.\n- **Lead Rating**: **Hot** - Prompt a callback with sample contract drafts immediately.",
         leadScore: "Hot" as const,
         messages: [
           { sender: "user", text: "how much is the automated missed call text back?", timestamp: new Date(Date.now() - 3600000).toISOString() },
           { sender: "bot", text: "Our Missed Call Auto-Text Back system is fully included in our Premium Growth Package at $499/mo!", timestamp: new Date(Date.now() - 3500000).toISOString() },
           { sender: "user", text: "i miss like 5 calls a day when i am on a roof so this sounds perfect", timestamp: new Date(Date.now() - 3400000).toISOString() },
           { sender: "bot", text: "Yes that is exactly what it is designed for! It texts the owner within 30 seconds so they do not go to your competitor. Would you like to get set up?", timestamp: new Date(Date.now() - 3300000).toISOString() }
         ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("leadforge_audit_leads", JSON.stringify(auditLeads));
  }, [auditLeads]);

  useEffect(() => {
    localStorage.setItem("leadforge_contact_leads", JSON.stringify(contactLeads));
  }, [contactLeads]);

  useEffect(() => {
    localStorage.setItem("leadforge_chat_leads", JSON.stringify(chatLeads));
  }, [chatLeads]);

  const handleSyncChatSession = (session: ChatSessionLead) => {
    setChatLeads(prev => {
      const idx = prev.findIndex(x => x.id === session.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = session;
        return copy;
      } else {
        return [session, ...prev];
      }
    });
  };

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
    localStorage.removeItem("leadforge_chat_leads");
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
    setChatLeads([
      {
         id: "sample-chat-1",
         startedAt: new Date(Date.now() - 3600000).toISOString(),
         lastActive: new Date(Date.now() - 1200000).toISOString(),
         messagesCount: 4,
         businessContext: "Fort Worth Roofing Shop",
         summaryNotes: "### 📋 Conversation Insights\n\n- **Client Inquiry**: Asked about the Premium Growth Plan ($499/mo) and automated missed-call SMS lookup.\n- **Pain Points**: Owner is often on site and misses about 5 phone calls a day, losing client quotes.\n- **Sales Match**: Highly interested in Missed Call Auto-Text Back.\n- **Lead Rating**: **Hot** - Prompt a callback with sample contract drafts immediately.",
         leadScore: "Hot" as const,
         messages: [
           { sender: "user", text: "how much is the automated missed call text back?", timestamp: new Date(Date.now() - 3600000).toISOString() },
           { sender: "bot", text: "Our Missed Call Auto-Text Back system is fully included in our Premium Growth Package at $499/mo!", timestamp: new Date(Date.now() - 3500000).toISOString() },
           { sender: "user", text: "i miss like 5 calls a day when i am on a roof so this sounds perfect", timestamp: new Date(Date.now() - 3400000).toISOString() },
           { sender: "bot", text: "Yes that is exactly what it is designed for! It texts the owner within 30 seconds so they do not go to your competitor. Would you like to get set up?", timestamp: new Date(Date.now() - 3300000).toISOString() }
         ]
      }
    ]);
  };

  const renderActiveView = () => {
    if (showAdminHub) {
      return (
        <AdminHub 
          auditLeads={auditLeads} 
          contactLeads={contactLeads} 
          chatLeads={chatLeads}
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

      {/* Floating AI Client Chatbox */}
      {!showAdminHub && (
        <ClientChatbox setTab={setTab} currentTab={currentTab} onSyncChatSession={handleSyncChatSession} />
      )}

    </div>
  );
}
