// Google Analytics 4 Tracking Utility
// Provides custom hooks and safe window.gtag dispatchers with development logging feedback for QA verification.

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Initialize GA4 datalayer safety
export const initGA4 = () => {
  if (typeof window === "undefined") return;

  const measurementId = (import.meta as any).env.VITE_GA_ID;

  if (!measurementId || measurementId === "G-MOCKTRACK8" || measurementId.trim() === "") {
    console.warn(
      `[Google Analytics 4] Tracking is disabled because VITE_GA_ID is not configured in environment variables.\n` +
      `To activate real GA4 coverage, register VITE_GA_ID in your configuration (e.g., VITE_GA_ID=G-XXXXXXXXXX).`
    );
    return;
  }

  // Insert standard script tag
  if (!document.getElementById("google-tag-manager")) {
    const script = document.createElement("script");
    script.id = "google-tag-manager";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(arguments);
    };
    
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: true,
      cookie_flags: "SameSite=None;Secure",
    });

    console.log(`[Google Analytics 4] Initialized live tracking with G-ID: ${measurementId}`);
  }
};

// Safe event sender
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    // Standard event logging in console for developer/QA auditing (as requested in specifications)
    console.log(`[GA4 Track Event]: "${eventName}"`, params);
    
    if (window.gtag) {
      window.gtag("event", eventName, params);
    }
  }
};

// Target and explicit event tracker wrappers
export const trackContactFormSubmission = (businessName: string) => {
  trackEvent("contact_form_submission", {
    category: "Inbound Lead",
    label: businessName || "Anonymous Business",
    value: 1,
  });
};

export const trackAuditRequest = (businessName: string, category: string, hasWebsite: boolean) => {
  trackEvent("audit_request_submission", {
    category: "Audit Lead",
    industry_category: category,
    label: businessName,
    has_website: hasWebsite ? 1 : 0,
    value: 1,
  });
};

export const trackRoiCalculatorUsage = (trade: string, ticketSize: number, additionalJobs: number, revenueResult: number) => {
  trackEvent("roi_calculator_usage", {
    category: "Calculator Engagement",
    trade,
    ticket_size: ticketSize,
    additional_jobs_monthly: additionalJobs,
    value: revenueResult,
  });
};

export const trackPhoneClick = (phoneNumber: string, elementLocation: string) => {
  trackEvent("phone_link_click", {
    category: "Click to Call",
    phone_number: phoneNumber,
    location: elementLocation,
  });
};

export const trackCtaClick = (ctaId: string, buttonText: string) => {
  trackEvent("cta_button_click", {
    category: "User Navigation",
    cta_id: ctaId,
    label: buttonText,
  });
};
