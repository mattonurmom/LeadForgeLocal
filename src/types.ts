export interface ServiceItem {
  id: string;
  title: string;
  category: "Google GBP" | "Social Media" | "Websites" | "Reputation" | "Automation";
  description: string;
  detailedDescription: string;
  iconName: string;
  priceTag: string;
  benefits: string[];
}

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  services: string[];
  benefits: string[];
  upsellOpportunities: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  metric: string;
  metricLabel: string;
  details: string;
}

export interface FaqItem {
  id: string;
  category: "General" | "Google GBP" | "Web Design" | "Social Media" | "Pricing & Results" | "Marketing" | "Lead Generation" | "AI Automation";
  question: string;
  answer: string;
}

export interface AuditLead {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  gbpLink: string;
  submittedAt: string;
  status: "Pending" | "In Review" | "Report Sent";
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
  submittedAt: string;
}

export interface OutreachTemplate {
  name: string;
  type: "Email" | "Facebook Message" | "Text Message" | "Follow-up";
  subject?: string;
  content: string;
  tips: string;
}
