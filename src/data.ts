import { ServiceItem, PackageItem, PortfolioItem, FaqItem, OutreachTemplate } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "gbp-cleanup",
    title: "Google Business Profile Cleanup",
    category: "Google GBP",
    description: "Claim, verify, format, and align your listing details correctly to build immediate search credibility.",
    detailedDescription: "Many local businesses have broken pins, outdated hours, or duplicate profiles. We perform a detailed diagnostic check and clean up listings, categories, and NAP (Name, Address, Phone) details to help local residents find you quickly.",
    priceTag: "$150",
    benefits: [
      "Designed to improve local search visibility",
      "Removes duplicate listings and profile errors",
      "Syncs accurate operating hours and phone contact fields",
      "Establishes correct trade classification on Google Maps"
    ],
    iconName: "SearchCode"
  },
  {
    id: "gbp-optimization",
    title: "Google Business Profile Optimization",
    category: "Google GBP",
    description: "Optimize Google Business Profiles to improve visibility, trust, customer engagement, and lead generation.",
    detailedDescription: "A fully filled profile supports local search performance. We set up primary categories, upload optimized images, craft search-friendly descriptions, and configure interactive messaging tools.",
    priceTag: "$150-$300",
    benefits: [
      "Supports local search performance within your target city",
      "Highlights key services in the map pack",
      "Designed to help businesses attract more opportunities",
      "Increases customer trust with polished profile assets"
    ],
    iconName: "MapPin"
  },
  {
    id: "gbp-management",
    title: "Google Business Profile Monthly Management",
    category: "Google GBP",
    description: "Keep your profile active with consistent strategic updates, photo uploads, and customer Q&As.",
    detailedDescription: "Search listings require constant updates. We handle postings of weekly offers, publish high-impact photos, answer client Q&As, and manage review triggers. Helps businesses attract more opportunities with no manual effort.",
    priceTag: "Starting at $99/month",
    benefits: [
      "Weekly localized search-friendly visual updates",
      "Answers common prospective customer Q&A threads",
      "Improves online presence and map prominence",
      "Monthly performance reports and outline highlights"
    ],
    iconName: "TrendingUp"
  },
  {
    id: "review-management",
    title: "Google Review Management",
    category: "Reputation",
    description: "Generate consistent positive Google feedback easily using our automated customer campaign tools.",
    detailedDescription: "A steady flow of recent feedback helps increase customer trust. We set up direct review shortcuts, print custom QR magnets for field technicians, and provide pre-written SMS and email request scripts.",
    priceTag: "$49-$99/month",
    benefits: [
      "Creates frictionless, one-tap review links for clients",
      "Print-ready QR sheets for truck magnets or receipts",
      "Polite follow-up SMS and Email text frameworks",
      "Enables proactive notifications for incoming rankings feedback"
    ],
    iconName: "Star"
  },
  {
    id: "local-seo",
    title: "Local SEO Optimization",
    category: "Google GBP",
    description: "Improve local search visibility through local SEO best practices, business listing optimization, keyword targeting, and online trust signals.",
    detailedDescription: "We align local search keywords and search engine markers. We establish citation directories across local registers, configure schema markups, and align Name-Address-Phone citations across the web to solidify rankings trust.",
    priceTag: "$150-$500",
    benefits: [
      "Supports local search performance for industry terms",
      "Builds robust off-page citations across trusted registries",
      "Targets localized service-area keywords to draw local clients",
      "Optimizes schema profiles for better browser discovery"
    ],
    iconName: "SearchCode"
  },
  {
    id: "web-creation",
    title: "Website Creation",
    category: "Websites",
    description: "Sleek, high-converting trade websites engineered with quick navigation and prominent tap-to-call mobile buttons.",
    detailedDescription: "We design modern, mobile-friendly websites focused purely on turning visitors into inquiries. Built on custom lightweight code to ensure instant loading speeds on smartphones.",
    priceTag: "Starting at $500",
    benefits: [
      "Optimized for mobile touch targets and local search readability",
      "Improves online presence with custom service pages",
      "Includes prominent tap-to-call links and layout forms",
      "Ultra-fast page loads to decrease visitor abandon rates"
    ],
    iconName: "Globe"
  },
  {
    id: "web-redesign",
    title: "Website Redesign",
    category: "Websites",
    description: "Transform outdated, slow-loading, or broken web pages into polished mobile booking engines.",
    detailedDescription: "We restructure slow corporate sites. We enhance navigation layout, update old colors and branding, secure contact fields, and display reviews clearly. Helps businesses attract more opportunities.",
    priceTag: "Starting at $500",
    benefits: [
      "Upgrades old pages with beautiful responsive visual hierarchy",
      "Fixes broken text form fields and navigation blocks",
      "Designed to support conversions and reduce lost visits",
      "Ensures full tablet and smartphone touch orientation"
    ],
    iconName: "RefreshCw"
  },
  {
    id: "landing-page",
    title: "Landing Page Creation",
    category: "Websites",
    description: "Isolated single-page campaign layouts tuned specifically for specialized local ads or offers.",
    detailedDescription: "If you run local ad campaigns, send traffic to focused pages. We draft gorgeous, distraction-free offer layouts that guide the visitor down to a single request form.",
    priceTag: "Starting at $250",
    benefits: [
      "100% focused on a single localized trade promotion",
      "Hides unnecessary external links to maximize action",
      "Embedded fast response inquiry form on current line",
      "Designed to improve campaign conversion potential"
    ],
    iconName: "FileText"
  },
  {
    id: "web-audit",
    title: "Website Audit & Optimization",
    category: "Websites",
    description: "Detailed evaluation of page loading speed, conversion flow, search guidelines, and mobile responsiveness.",
    detailedDescription: "Many small business web pages look fine on desktops but lose over half of mobile visitors due to slow scripts or hidden forms. We run diagnostics to point out and fix structural flaws.",
    priceTag: "$150-$300",
    benefits: [
      "Optimizes image assets and minifies scripts for speed",
      "Corrects broken input forms and touch layout shifts",
      "Designed to help improve user experience and engagement",
      "Confirms schema markup and metadata align with search guidelines"
    ],
    iconName: "SearchCode"
  },
  {
    id: "lead-capture",
    title: "Lead Capture Setup",
    category: "Websites",
    description: "Set up interactive digital forms that collect exact client requirements and alert your smartphone instantly.",
    detailedDescription: "Never let an inquiry sit in a dead inbox. We build smart request fields tailored to your specialty, and bind them to your phone via SMS or email alerts.",
    priceTag: "$100",
    benefits: [
      "Custom question trees matching your active trades",
      "Delivers instant email or SMS dispatch previews to your cell",
      "Maintains a secure local client database for outreach",
      "Designed to help businesses coordinate immediate callbacks"
    ],
    iconName: "UserCheck"
  },
  {
    id: "facebook-cleanup",
    title: "Facebook Business Page Cleanup",
    category: "Social Media",
    description: "Claim, clean, and verify Name, Address, Phone, and Hours consistency across your Facebook platform.",
    detailedDescription: "Our team removes old duplicate business pins, formats your bio with proper location tags, updates banners with high-res logos, and installs interactive contact links.",
    priceTag: "$100",
    benefits: [
      "Removes outdated, confusing, or duplicate business listings",
      "Aligns map directions, phones, and hours with Google NAP data",
      "Installs responsive 'Send Message' or 'Call Now' action selectors",
      "Helps increase customer trust with consistent company details"
    ],
    iconName: "Facebook"
  },
  {
    id: "facebook-optimization",
    title: "Facebook Business Page Optimization",
    category: "Social Media",
    description: "Detailed optimization of social handles, review integrations, services menus, and custom header actions.",
    detailedDescription: "We format your page to capture social searches. We configure search-friendly handles, set up direct review tab folders, and display active service lists to improve online presence.",
    priceTag: "$150",
    benefits: [
      "Custom tailored graphic assets matching your core palette",
      "Optimized bio copies with neighborhood and trade keywords",
      "Links Facebook reviews cleanly to encourage client trust",
      "Establishes a highly polished social landing page"
    ],
    iconName: "Facebook"
  },
  {
    id: "facebook-management",
    title: "Facebook Monthly Management",
    category: "Social Media",
    description: "Keep your social media active and professional with consistent weekly trade updates.",
    detailedDescription: "We handle the planning, copywriting, and scheduling of weekly updates. We showcase your recent job completions, customer reviews, and specials. Improves online presence continuously.",
    priceTag: "$99/month",
    benefits: [
      "2-3 custom localized Facebook posts designed every week",
      "Includes professional graphics highlighting your active work",
      "Fosters community engagement and customer retention",
      "No long-term commitments - scale or pause as needed"
    ],
    iconName: "Share2"
  },
  {
    id: "canva-creative",
    title: "Canva Content Creation",
    category: "Social Media",
    description: "A customized set of beautiful social templates ready to update on your phone in Canva.",
    detailedDescription: "We build a localized brand deck in Canva so you can publish stunning quote blocks, seasonal offers, and job completions on the fly with consistent trade colors.",
    priceTag: "$75",
    benefits: [
      "Custom layouts with your business brand guidelines",
      "Simple, plug-and-play before-and-after photo templates",
      "Designed for readability on mobile phone feeds",
      "Includes clear instructional guide for quick edits"
    ],
    iconName: "Palette"
  },
  {
    id: "social-packages",
    title: "Social Media Content Packages",
    category: "Social Media",
    description: "Archived content vaults containing structured caption files and visual graphics for your trade.",
    detailedDescription: "Save hours of writing. We deliver ready-to-publish, service-specific content packages designed to build local authority and support customer trust across all profiles.",
    priceTag: "$150",
    benefits: [
      "A complete library of pre-written educational trade captions",
      "Beautiful companion graphics styled for various channels",
      "Helps keep pages looking highly active and dedicated",
      "Designed to improve social search visibility"
    ],
    iconName: "Share2"
  },
  {
    id: "growth-audit",
    title: "Business Growth Audit",
    category: "Automation",
    description: "A friendly, easy-to-read audit scan of your search ranking errors, mobile speed, and lead leaks.",
    detailedDescription: "We run quick scans of your zip code's maps pack. We point out Name-Address-Phone issues and layout leaks, giving you an easy checklist to help attract more work.",
    priceTag: "Free / Included",
    benefits: [
      "Pinpoints Name-Address-Phone citation issues in under 24 hours",
      "Scans mobile speed to highlight quick ways to fix loading lags",
      "Designed to highlight direct paths to improve your prominence",
      "Completely educational and clear - zero pushy sales pitch"
    ],
    iconName: "FileText"
  },
  {
    id: "lead-generation-setup",
    title: "Lead Generation System Setup",
    category: "Automation",
    description: "Install responsive digital funnels that secure buyer parameters and deliver hot inquiries.",
    detailedDescription: "We set up target request structures that encourage interaction. Clients get quick quote estimators while your company gets immediate contact details sent to your devices.",
    priceTag: "$250",
    benefits: [
      "Tailors inquiry options to match your trade diagnostics",
      "Helps businesses attract more opportunities automatically",
      "Includes professional conversion-focused request headings",
      "Organizes contacts cleanly in local history databases"
    ],
    iconName: "UserCheck"
  },
  {
    id: "customer-followup",
    title: "Customer Follow-Up System Setup",
    category: "Automation",
    description: "Establish polite automated greetings that thank clients and ask for 5-star reviews.",
    detailedDescription: "Polite automated texting sequences that trigger when projects complete. Keeps customers feeling respected and prompts them for positive Google maps feedback.",
    priceTag: "$150",
    benefits: [
      "Helps increase customer trust with quick polite responses",
      "Encourages repeat booking patterns from past clients",
      "Automates review solicitation links to build local ranking",
      "Reduces manual follow-up scheduling hours"
    ],
    iconName: "Bot"
  },
  {
    id: "missed-call",
    title: "Missed Call Text Back Setup",
    category: "Automation",
    description: "Instant automated SMS responder that replies to missed calls on contractor mobile lines.",
    detailedDescription: "If you're busy in the field or on a job, missed calls go to competitors. Our system instantly replies: 'Hi, sorry I missed you! I'm on a job. How can I help you?' which holds the buyer's attention.",
    priceTag: "Starting at $100",
    benefits: [
      "Aims to rescue up to 40% of missed call opportunity leakages",
      "Fires instant text replies within 5 seconds of missed rings",
      "Maintains direct communication so prospects wait for you",
      "Simple setup — binds perfectly to your existing business line"
    ],
    iconName: "PhoneForwarded"
  },
  {
    id: "online-reputation",
    title: "Online Reputation Management",
    category: "Reputation",
    description: "Monitor customer mentions, coordinate polite comments, and maintain premium local ratings.",
    detailedDescription: "Keep your online presence glowing. We monitor mentions across local business directories, helping you write courteous response copies that support search performance.",
    priceTag: "$99/month",
    benefits: [
      "Monitors new reviews and triggers quick owner notifications",
      "Helps draft courteous, professional client replies",
      "Improves online presence by keeping feedback files fresh",
      "Mitigates low-star comments with rapid resolution paths"
    ],
    iconName: "Star"
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot Installation",
    category: "Automation",
    description: "24/7 smart assistant setup that pre-qualifies client requests and gathers lead parameters.",
    detailedDescription: "Keep your website always open. Our beautiful AI chat setups greet late-night visitors, answer standard FAQs, list available times, and collect phone numbers automatically.",
    priceTag: "$250",
    benefits: [
      "Responds to incoming client questions 24/7/365",
      "Collects Name, Phone, and Job Type parameters politely",
      "Filters out low-conversion inquiries automatically",
      "Integrates cleanly on the bottom corner of any website"
    ],
    iconName: "Bot"
  },
  {
    id: "ai-customer-response",
    title: "AI Customer Response Automation",
    category: "Automation",
    description: "Set up smart automated answers to rapidly reply to typical email or message questions.",
    detailedDescription: "Automate responses to frequent questions like 'Do you work in my area?' or 'Are you open weekends?' Helps increase customer trust by delivering rapid replies.",
    priceTag: "$150/month",
    benefits: [
      "Provides rapid, informative replies to basic client emails",
      "Reduces active support time spent on duplicate queries",
      "Helps businesses attract more opportunities with quick turnarounds",
      "Easily adjusts guidelines to fit your unique trade tone"
    ],
    iconName: "Bot"
  },
  {
    id: "ai-lead-capture",
    title: "AI Lead Capture Automation",
    category: "Automation",
    description: "Conversational, smart forms that adjust next questions dynamically based on client answers.",
    detailedDescription: "Replace plain forms with conversational guidance. The system asks relevant next questions depending on whether they need an emergency repair or a custom quote.",
    priceTag: "$200",
    benefits: [
      "Improves user experience with smart diagnostic logic",
      "Collects deeper, service-specific project parameters",
      "Supports campaign conversion rates on service landers",
      "Sends highly detailed dispatch summaries directly to you"
    ],
    iconName: "Bot"
  },
  {
    id: "ai-appointment",
    title: "AI Appointment Request Automation",
    category: "Automation",
    description: "Synchronize client booking calendars directly with automated scheduling systems.",
    detailedDescription: "Let clients view openings and request times directly. The system verifies your availability and coordinates booking schedules on your smartphone without manual calls.",
    priceTag: "$250",
    benefits: [
      "Frictionless client scheduling directly from your website",
      "Maps appointments securely onto your personal device calendars",
      "Sends automatic confirmation texts to minimize no-show rates",
      "Designed to help businesses improve day-to-day coordination"
    ],
    iconName: "Bot"
  },
  {
    id: "monthly-marketing",
    title: "Monthly Marketing Management",
    category: "Automation",
    description: "A complete digital partnership managing your GBP, reviews, social updates, and chat loops.",
    detailedDescription: "Our premium remote marketing team handles maps ranking activity, schedules Facebook updates, responds to Google feedback, and manages mobile text alerts. Helps businesses attract more opportunities with absolute freedom.",
    priceTag: "Starting at $300/month",
    benefits: [
      "Includes both Google GBP and Facebook monthly updates",
      "Monitors and solicit customer reviews automatically",
      "Supports local search performance with ongoing activity",
      "No long-term contracts - complete month-to-month freedom"
    ],
    iconName: "TrendingUp"
  }
];

export const PACKAGES: PackageItem[] = [
  {
    id: "pkg-starter",
    name: "Starter Local Package",
    price: "$299",
    tagline: "Essential local footprint designed to improve search visibility and built-in trust.",
    badge: "Startup Friendly",
    services: [
      "Google Business Profile Cleanup & Optimization",
      "Facebook Business Page Cleanup & Alignment",
      "Review Automation Link Setup & QR Card",
      "1-Page Click-To-Call Landing Page",
      "Basic On-Page Local SEO Targeting Home City"
    ],
    benefits: [
      "Designed to help nearby customers notice your business",
      "Gives prospective clients an instant shortcut to dial you directly",
      "Automates review triggers to support professional reputational growth",
      "One-time setup with zero recurring obligations unless requested"
    ],
    upsellOpportunities: [
      "Add Automated Call Text-Back for a small setup fee",
      "Switch to Monthly Maintenance to support ongoing activity"
    ]
  },
  {
    id: "pkg-growth",
    name: "Premium Growth Package",
    price: "$499 / mo",
    tagline: "Our most requested system to organically improve local search presence and convert leads.",
    badge: "Best Value",
    isPopular: true,
    services: [
      "High-Converting 5-Page Local Trade Website",
      "Google Business Profile Active Monthly Management",
      "Facebook Monthly Management (2 Custom Posts / Week)",
      "Automated Review Campaign Launch",
      "Missed Call Text Back Auto-Responder Integration",
      "SMS Lead Alert Setup to Business Owner Smart Device"
    ],
    benefits: [
      "Intended to improve your map prominence in nearby neighborhoods",
      "Aims to rescue missed ringer opportunities via helpful SMS follow-up",
      "Organizes and displays your local service history and credentials beautifully",
      "Aims to support consistent inbound inquiries directly on your devices"
    ],
    upsellOpportunities: [
      "Add 24/7 AI Lead Qualifier Chatbot for a small monthly adjustment",
      "Add targeted Google Ads PPC landing page for a one-time configuration"
    ]
  },
  {
    id: "pkg-premium",
    name: "Premium Marketing Package",
    price: "$999 / mo",
    tagline: "Complete marketing management designed to bolster your online presence and client trust.",
    badge: "Complete Growth",
    services: [
      "Premium Interactive Website with Custom Trade Tools",
      "Google Business Profile Monthly Management (3 Posts/Week + Daily Responses)",
      "Facebook + Instagram Monthly Active Marketing",
      "24/7 AI Qualification Assistant Installed",
      "Advanced Multi-City Local SEO Content Pages",
      "Weekly Before/After Custom Graphic Showcase Creation",
      "Dedicated Client Success Monthly Zoom Strategy Review"
    ],
    benefits: [
      "Extensively covers your primary operations across multiple local ZIP codes",
      "Automates lead vetting so you can focus solely on serious buyers",
      "Deepens local reputation to justify your quality trade rates",
      "Ongoing strategic assets designed to help your team command local trust"
    ],
    upsellOpportunities: [
      "Google Local Services Ads management setup support",
      "Video review program initiation to build strong buyer trust"
    ]
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-plumber",
    title: "VIP Plumbing Revamp (Sample Demonstration Project)",
    category: "Website & Google Business Optimization",
    description: "An outdated layout with missing reviews was costing this veteran plumber high-paying drain cleanups and re-piping jobs in their city.",
    beforeImg: "VIP Plumbing (Sample Business Profile Cleanup: Slow loading, non-responsive, 12 reviews, unoptimized profile, missed calls)",
    afterImg: "VIP Plumbing Redesigned (Demonstration Website Redesign: High-speed Vite layout, professional review support system, improved map pack visibility)",
    metric: "Demonstration Example",
    metricLabel: "Designed to help increase calls based on typical client audits",
    details: "We redesigned their layout into a mobile-first appointment landing visual funnel and launched automated review collection to help strengthen their online presence."
  },
  {
    id: "port-roofer",
    title: "Apex Roofing Optimization (Sample Demonstration Project)",
    category: "Google Business Pack & Missed Call Setup",
    description: "Owner was frequently on roofs and missed 35% of incoming homeowner calls, losing them directly to rival fast builders.",
    beforeImg: "Apex Roofers (Sample Lead Flow Concept: No visual profile updates, missed calls with no backup response, low visibility)",
    afterImg: "Active LeadForge Loop (Potential Online Presence Upgrade: Missed call instant auto-text response, localized business profile updates, improved map pack search visibility)",
    metric: "Demonstration Example",
    metricLabel: "Designed to rescue missed opportunities immediately via SMS text-back",
    details: "We updated and cleaned up business citation details, then turned on Missed Call Text-Back. Now, every missed caller gets an immediate automated text reply, helping secure opportunities with no manual effort."
  },
  {
    id: "port-hvac",
    title: "Comfort King HVAC System Setup (Sample Demonstration Project)",
    category: "Mini Web Setup & Facebook Loop",
    description: "An active business with zero digital references besides a broken Facebook group. Homeowners couldn't easily review plans.",
    beforeImg: "Comfort King (Example Visibility Improvement: No website, incomplete social profile, manual calendar bookings, low online visibility)",
    afterImg: "Comfort Landing Engine (Demonstration Website Redesign: Clean brand guide colors, interactive air quote estimator concept, optimized layout)",
    metric: "Demonstration Example",
    metricLabel: "Projected value recovered on first-month deployment based on typical client audits",
    details: "Implemented the 'Starter Local' system. Local customers have secure appointment scheduling, capturing high-intent furnace swap calls that transformed their calendar."
  }
];

export const FAQ: FaqItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What does LeadForge Local actually do to grow my local company?",
    answer: "We help local service professionals (including lawyers, doctors, dentists, clinics, restaurants, chiropractors, spas, coaches, and trainers) as well as home service contractors get more phone calls, web leads, and paying customer jobs. We do this by optimization of your Google Business Profile to rank in map searches, creating fast modern mobile-friendly websites, automating 5-star customer review collection, and setting up smart automated systems like Missed Call Text-Back so you never lose opportunities to rival companies."
  },
  {
    id: "faq-2",
    category: "General",
    question: "Who is LeadForge Local?",
    answer: "LeadForge Local is a professional small business growth service focused on helping local businesses improve their online presence, visibility, and lead generation systems. We believe in clear pricing, simple setups, and real results."
  },
  {
    id: "faq-3",
    category: "General",
    question: "How do you charge such affordable fees compared to standard corporate agencies?",
    answer: "Traditional digital agencies have heavy corporate office rents, commission salespeople, and bloated overheads. They charge $2,000+ per month for baseline services. Because LeadForge Local is built on ultra-efficient, highly automated operational patterns and specializes solely in local small service trades, we pass those structural savings directly to our partners."
  },
  {
    id: "faq-4",
    category: "General",
    question: "Do I have to sign legal long-term multi-month contracts?",
    answer: "No. We believe in earning our business every single month based on real results. All our ongoing recurring growth subscriptions operate month-to-month and can be suspended or adjusted at any time with a simple 10-day notice."
  },
  {
    id: "faq-5",
    category: "Google GBP",
    question: "Why is Google Business Profile (GBP) so vital for contractors?",
    answer: "Over 82% of citizens searching for local service vendors look directly on the Google Maps '3-Pack' at the top of organic results. If your listing is unverified, missing details, or lacks 5-star validation, you are giving premium jobs directly to your nearest competitors."
  },
  {
    id: "faq-6",
    category: "Google GBP",
    question: "How long does it take for Google Business Profile optimization to show results?",
    answer: "While basic citation cleanup tasks show on search indexing within 7 days, localized map rank growth typically compounds between weeks 3 and 8 as Google registers steady reviews, geo-tagged imagery, and keyword posts."
  },
  {
    id: "faq-7",
    category: "Google GBP",
    question: "My Business Profile was suspended by Google. Can LeadForge Local help?",
    answer: "Yes, we specialize in citation alignment and verification support. We look at exact formatting guidelines, perform name-address-phone (NAP) matching diagnostics, and prepare the official reinstatement templates to help restore business visibility."
  },
  {
    id: "faq-8",
    category: "Google GBP",
    question: "What is Google Map Pack optimization?",
    answer: "It is the process of updating categories, primary service structures, descriptive tags, and municipal citations across online registries to convince Google's algorithm that your company is the most relevant and trusted service in your zip code area."
  },
  {
    id: "faq-9",
    category: "Web Design",
    question: "Can I manage or change my website content after you create it?",
    answer: "Yes! All websites we hand off are built with clean React modular styling or can easily map onto standard builders like Google Sites, WordPress, or Squarespace depending on your preference. We provide full layout instructions so you won't need to pay coders for simple text edits."
  },
  {
    id: "faq-10",
    category: "Web Design",
    question: "I already have an old website. Why should I consider a Website Redesign?",
    answer: "A website is not an online brochure-it is a customer-finding machine. Old websites load slowly, lack mobile touch calling buttons, and leak visitors. A modern LeadForge redesign centers visual call CTA inputs, loads in under a second, and features trust badges to support higher conversions."
  },
  {
    id: "faq-11",
    category: "Web Design",
    question: "How do your websites perform on mobile devices and tablet screens?",
    answer: "They are built mobile-first. In local trade industries, more than 75% of emergency service requests originate on a mobile smartphone with a thumb touch. Our designs prioritize large calling elements, fast navigation, and thumb-friendly fields."
  },
  {
    id: "faq-12",
    category: "Web Design",
    question: "How much do websites cost to launch with you?",
    answer: "A complete professional high-performing custom landing page begins at just $250. Full 5-page custom structural agency websites start at just $500, with zero hidden setup fees."
  },
  {
    id: "faq-13",
    category: "Social Media",
    question: "My Facebook Page looks dead. Does that affect client trust?",
    answer: "Absolutely. Homeowners frequently research local service provider profiles on Facebook to see if they are actively working in their neighborhoods. If your last post was from 2021, customers wonder if you are still in business or if your standards have slipped."
  },
  {
    id: "faq-14",
    category: "Social Media",
    question: "What is Facebook Business Page Cleanup?",
    answer: "We restructure your page, align banners, write optimized meta summaries, remove useless widgets, verify contact sync with your main Google maps, and insert direct 'Call Now' booking actions that trigger calls instantly."
  },
  {
    id: "faq-15",
    category: "Social Media",
    question: "What is Canva and how do we use your Canva Content designs?",
    answer: "Canva is a free visual platform. We design beautiful, branded service banners, before/after tiles, and special review graphics for you. We hand over direct editing links so you can add photos and share them with custom text in seconds."
  },
  {
    id: "faq-16",
    category: "Social Media",
    question: "Can you manage my social media posting schedule completely?",
    answer: "Yes. Our monthly marketing pages cover the layout, copy, timing, and posting of localized social media updates, giving your brand an active, trustworthy digital heartbeat with zero manual effort."
  },
  {
    id: "faq-17",
    category: "Marketing",
    question: "We have a limited $0 startup budget. How can we make progress?",
    answer: "Focus on Google Business optimization, ask every past customer for a review using our free review shortcut, and use our email outreach copy to pitch local business centers. You don't need expensive paid ads to start generating inquiries if you build strong organic foundations."
  },
  {
    id: "faq-18",
    category: "Marketing",
    question: "How does the Reputation / Review Management system get me more stars?",
    answer: "We make review requests frictionless. We generate a short, easy link for you, design custom print-ready QR codes for clean truck magnets or paper invoices, and provide conversational text templates your team can SMS to clients immediately after a job is successfully finished."
  },
  {
    id: "faq-19",
    category: "Marketing",
    question: "Are your local marketing packages tailored to specific blue-collar trades?",
    answer: "Yes, we have custom content, keywords, and campaign formulas tuned specifically for Plumbers, Roofers, Electricians, HVAC specialists, Landscapers, Painters, Home Cleaners, Heavy Mechanics, and all nearby trade service providers."
  },
  {
    id: "faq-20",
    category: "Lead Generation",
    question: "What is an Interactive Free Business Audit?",
    answer: "It is a quick, completely friendly checkup of your company's online visibility. We look at three main things: how easily clients can find your maps listing, whether your website loads fast on phones, and if you have a simple way to text back any missed callers. We send you a short, easy-to-read list of improvements you or our team can handle."
  },
  {
    id: "faq-21",
    category: "Lead Generation",
    question: "How do your lead capture setups notify my phone?",
    answer: "We connect form submissions to direct email alerts and instant SMS triggers. As soon as a hot lead enters their contact and postal address on your site, you get a ping on your smartphone so you can follow up before they reach out to anybody else."
  },
  {
    id: "faq-22",
    category: "AI Automation",
    question: "What is 'Missed Call Text Back' and how does it prevent lost revenue?",
    answer: "When a homeowner dials a contractor and hits voicemail, they immediately close Google and call the next trade provider down the page. Our smart missed-call automation stops this instantly by automatically firing an SMS within 5 seconds: 'Hey, this is VIP Plumbing! We are on a job site but saw your call. What emergency can we assist you with?' which instantly keeps them engaged."
  },
  {
    id: "faq-23",
    category: "AI Automation",
    question: "How does the AI Website Chatbot work?",
    answer: "It is a smart chat bubble at the bottom corner of your page. It answers standard customer questions (e.g. 'Do you offer emergency roofing?', 'Do you operate 24/7?') and prompts them to fill out their contact parameters, scheduling callbacks automatically."
  },
  {
    id: "faq-24",
    category: "Pricing & Results",
    question: "How quickly can I expect new business phone calls from your service?",
    answer: "Automations like Missed Call Text Back save customers on the very first day. Google Business Profile ranking campaigns and local visual updates typically boost call volume within 30 to 60 days."
  },
  {
    id: "faq-25",
    category: "Pricing & Results",
    question: "What if I am unhappy with the marketing metrics?",
    answer: "We stand firmly behind our work and emphasize transparency. If you ever feel our services are not driving results, you can discontinue at anytime. There are no heavy contracts or cancellation fees."
  }
];

export const SERVICE_PACKAGES_METADATA = {
  starter: {
    title: "Starter Package",
    description: "Designed to help small contractors build an authoritative local baseline quickly.",
    price: "$299 setup",
    upsell: "$99/mo ongoing management option"
  },
  growth: {
    title: "Growth Package",
    description: "Our core revenue engine. Builds local maps authority and converts visitors consistently.",
    price: "$499/mo retainer",
    upsell: "Add Custom AI qualification assistant"
  },
  premium: {
    title: "Premium Package",
    description: "Extensive regional presence. Softly blankets the target towns to support local reach.",
    price: "$999/mo retainer",
    upsell: "Integration with advanced Google Ad campaigns"
  }
};

export const LOGO_CONCEPTS = [
  {
    conceptName: "Concept A: The Growth Forge (Recommended)",
    description: "A professional design balancing industrial strength with digital advancement. Features a stylized minimalist anvil that morphs upwards into a 3bar bar chart, signifying marketing progress.",
    fontRecommendation: "Outfit (Bold) paired with Inter (Regular) and JetBrains Mono for metrics.",
    iconRecommendation: "Anvil meets TrendingUp. Styled in bold Deep Navy Blue (#0F172A) with a striking Bright Electric Blue (#38BDF8) accent dot.",
    colorRules: "Primary mark: Navy blue. Accents: Electric blue. Secondary lockups: Slate Gray. Perfect over light backgrounds."
  },
  {
    conceptName: "Concept B: The Lead Anchor",
    description: "A trustworthy, traditional safety emblem that projects extreme dependability, trust, and deep structural local presence.",
    fontRecommendation: "Space Grotesk (SemiBold) paired with Inter for clear subtitle alignment.",
    iconRecommendation: "Shield integrated with a locator Map Pin, signaling local absolute authority.",
    colorRules: "Primary: Royal Blue (#2563EB). Accents: Silver Gray (#CBD5E1) borders. Confident colors for contracting and trade partners."
  },
  {
    conceptName: "Concept C: Spark Tech Lead Line",
    description: "An modern, technology-forward, clean, minimalistic line icon representing smart automations, instant missed-call text backs, and modern lead systems.",
    fontRecommendation: "Inter (Medium tracking text) combined with sleek thin visual dividers.",
    iconRecommendation: "Lightning bolt connecting a standard Chat communication icon with a phone receiver.",
    colorRules: "Primary: Royal Blue (#2563EB). Accent highlights: Bright Electric Blue (#38BDF8). Outstanding readability online and on mobile screens."
  }
];

export const BRAND_GUIDE = {
  mission: "To help local businesses compete with larger companies by providing affordable, professional marketing, website, and lead generation solutions that create measurable business growth.",
  values: [
    { title: "No corporate fluff", desc: "No complex tech-jargon. Just real business outcomes like phone calls, verified leads, and cash revenue." },
    { title: "Absolute transparency", desc: "Honest pricing, simple cancellation terms, and verified tracking." },
    { title: "Local focus first", desc: "Tailored blue-collar trade marketing optimized for localized search behaviors." },
    { title: "Affordable innovation", desc: "Deploying high-converting systems at a fraction of larger corporate office agency prices." }
  ],
  voice: "Our communication style is friendly, knowledgeable, dependable, and highly focused on results. We avoid sounding like a pushy salesperson or an overly technical computer engineer. We speak simply, directly, and speak directly about jobs and phone calls.",
  colors: {
    navy: "Deep Navy Blue (#0F172A) - Base color representing agency trust, stability, and premium presence.",
    royal: "Royal Blue (#2563EB) - Interactive focus keys, call to actions, and primary highlighting triggers.",
    steel: "Steel Blue (#3B82F6) - Secondary support highlights, button shadows, and interactive state changes.",
    slate: "Slate Gray (#475569) - Highly legible secondary lists and body text alignments.",
    sky: "Bright Electric Blue (#38BDF8) - Accent highlights, badges, and trust indicators."
  },
  fontFamily: "Outfit (for Display headings) & Inter (for structural text and interface labels)."
};

export const AUDIT_TEMPLATE = `# LEADFORGE LOCAL - SIMPLE BUSINESS VISIBILITY AUDIT

## BUSINESS UNDER REVIEW: [Insert Local Business Name]
**DATE OF EVALUATION:** ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
**EVALUATION ENGINE:** LeadForge Local Business Growth Service

---

### Part 1: Diagnostic Metrics & Scores
1. **Google Business Profile Score:** ⭐⭐⭐☆☆ (Claimed but lacks citations / missing active posts)
2. **Organic Local Rankings (Map Pack):** Page 2, Page 3 (Not optimized in primary service area)
3. **Mobile response & Speed Index:** ⚠️ Outdated (3.4s load time, small call touch-targets)
4. **Social Heartbeat Alert:** ❌ Inactive (Last Facebook page update: Over 6 months ago)
5. **Trust Validation Index:** ⚠️ Weak (Lacks real-time Google review stream badge on homepage)
6. **Missed Opportunity Leak:** ❌ High (No Missed-Call Text Back system configured)
7. **Lead Capture Mechanics:** ❌ Manual (Basic 'mailto' link instead of high-converting trade-focused forms)

---

### Part 2: Discovered Revenue Leaks & Opportunities
*   **Leak 1 (Google Maps):** GBP lacks secondary trade categories, letting competitors rank higher.
*   **Leak 2 (Voicemail losses):** Customers call but hang up without voicemail, heading directly to competitors.
*   **Leak 3 (Mobile Experience):** Customers on mobile phones cannot quickly tap-to-call, leading to high drop-offs.

---

### Part 3: Recommended Action Plan
1. **Fix Google Citations** - Update secondary trade categories, upload 10 geo-tagged photos and activate weekly keyword posts ($150 setup).
2. **Launch Review QR Cards** - Give field specialists custom review codes to request 5-star feedback instantly ($49/mo).
3. **Turn on Auto-Text Responders** - Instantly text missed callers to secure emergency jobs ($100 setup).

**Potential Improvement Example:** Helps improve client engagement and search visibility. Results vary by business, market, and competition.

---
**Prepared By:** LeadForge Local Outreach Team | www.leadforgelocal.com`;

export const PROPOSAL_TEMPLATE = `# PREMIUM BUSINESS GROWTH PROPOSAL

**PREPARED FOR:** [Insert Prospect Business Name]
**PREPARED BY:** LeadForge Local Business Growth Service
**ESTIMATED TIMELINE:** 2-3 Weeks from Ignition

---

## 1. Executive Summary
Most trade service providers lose high-paying plumbing, roofing, or electrical projects because their search engine presence is broken, invisible, or slowly responsive. LeadForge Local removes these friction points by building a clean, modern, ultra-fast online booking system and pairing it with automated customer follow-ups and Maps optimization.

---

## 2. Identified Objectives
*   Improve visibility and customer trust in the Google Map Pack.
*   Fix mobile loading page delays and integrate interactive calling CTA buttons.
*   Secure 100% of missed contractor line ringers with immediate auto-SMS callbacks.
*   Increase Google 5-star review quantity significantly to build local buyer confidence.

---

## 3. Scope of Service & Pricing Models
We advise launching with the **Growth Engine Package** to lock in continuous growth:

| Recommended Package | Deliverables & Setup Features | Retainer Investment |
| :--- | :--- | :--- |
| **Growth Engine System** | Map Citation Cleanup, 5-Page Trades Website, Weekly Social Media, Missed Call SMS setup, Lead Alerts | **$499 / Month** (Month-to-month, cancel anytime) |

---

## 4. Next Steps to Launch
*   **Step 1:** Complete our 10-minute Trade Intake Diagnostic.
*   **Step 2:** Secure your Google Business listing credentials and city targets.
*   **Step 3:** Review and approve the custom homepage wireframe draft within 72 hours.
*   **Step 4:** Launch site and begin customer client outreach systems.

---
**Authorized Signature:** LeadForge Local Support | terms@leadforgelocal.com`;

export const OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    name: "30-Second Elevator Sales Pitch",
    type: "Follow-up",
    tips: "Speak slowly, clearly, and keep your focus entirely on their incoming calls and customer bookings.",
    content: "Hi! I'm with LeadForge Local. We help local service contractors like plumbers and roofers get more phone calls and client jobs right here in [City Name]. Most contractors are losing business because they don't appear in the top spots on Google Maps or because they miss busy phone calls on site. We set up simple, low-cost automations that instantly text back missed callers and optimize your Google listing to improve Google Maps search visibility so you never lose opportunities to your competitors. Is securing more steady calls something your team is currently focused on?"
  },
  {
    name: "Cold Facebook Message Template",
    type: "Facebook Message",
    tips: "Find local painters, landscapers, or cleaning companies on Facebook who are inactive and message them.",
    content: "Hi [Business Owner Name]! 👋\n\nI was looking for local [Service Type, e.g., plumbers] in [City Name] today and noticed your Facebook page, but struggled to find your Google listing on the Map Pack. \n\nI did a quick audit of your online profiles and discovered 3 minor errors that are likely blocking customers from finding your phone number on Google. \n\nI created a quick, free 1-page Business Performance Audit detailing how to fix these errors yourself to get more calls in [City Name]. Can I drop the PDF link over to you right here? No pitch, just some helpful local tips!\n\nBest,\n[Your Name]\nLeadForge Local Business Growth Service"
  },
  {
    name: "Cold Outreach Text Message (SMS)",
    type: "Text Message",
    tips: "Excellent for contractors since they read 99% of text messages during high-activity field jobs.",
    content: "Hi [Owner Name], this is [Your Name] from LeadForge Local. I noticed your [Business Name] listing is currently missing from the Google Map 3-Pack for search queries in [City]. Many local contractors lose 30%+ of their jobs because of minor profile errors and delayed response times on missed calls. I drafted a free 1-page business report showing how to fix this yourself to get more calls. Would it be alright if I texted you the PDF link here? Let me know!"
  },
  {
    name: "Cold Email Prospecting Script",
    type: "Email",
    subject: "Improvement Plan for [Business Name] - More calls in [City Name]",
    tips: "Keep your email brief, casual, and focused strictly on the free audit value.",
    content: "Hi [Owner Name],\n\nI was researching [Service Trade, e.g., HVAC companies] in [City Name] and came across your website ([Website Link]). \n\nYou have a great business, but I noticed a couple of structural gaps that are causing you to lose high-value calls to other competitors in the neighborhood:\n\n1. Your website loads slowly on mobile devices, which causes up to 40% of page visitors to back out before they call.\n2. Your Google Business Profile is showing incomplete search categories, causing you to rank on map page 2 where clients rarely click.\n\nWe specialize in setting up fast, high-converting service websites and Google listings that generate steady customer calling streams. \n\nI've generated a free, custom 1-page Business performance audit for [Business Name] with tailored, straight-to-the-point instructions on how to patch these leaks. You can apply them yourself, or have us do it for you.\n\nWould you be open to reviewing the free report and a brief 5-minute call to discuss how to capture 10-15 more jobs per month?\n\nIf so, please let me know or book directly here: [Your Booking Link]\n\nWarm regards,\n\n[Your Name]\nLeadForge Local\n[Your Phone Number]"
  },
  {
    name: "Quick Lead Follow-Up Sequence",
    type: "Follow-up",
    tips: "Send this immediately within 5 minutes of a prospect downloading our Free Audit on our website.",
    content: "Hi [Name]!\n\nThank you for requesting your Free Business Performance Audit for [Business Name] from LeadForge Local.\n\nOur system is running our optimized citation scans on your Google map coordinates and mobile speeds right now. We've identified a couple of quick-wins that will instantly boost your search index rankings in [City].\n\nI am compiling the final report into a shareable PDF and will mail it to you in the next 30 minutes.\n\nIn the meantime, many local service trade owners find it easiest to review their report over a quick 5-minute phone call. If you would like to secure a free slot to speak about growing your calls, click here: [Your Consulting Schedule Link].\n\nTalk soon,\n[Your Name]\nLeadForge Local Support"
  }
];

export const PLAIN_TEXT_GOOGLE_SITES = {
  header: `LEADFORGE LOCAL
Business Growth Service
Tagline: More Calls. More Leads. More Customers.`,
  homepage: `=== GOOGLE SITES COMPATIBLE PORT: HOMEPAGE ===

--- HERO SECTION ---
Headline: Get More Calls, More Leads, and More Customers
Subheadline: We help local businesses improve their online presence, attract more customers, build trust, and generate more revenue through Google Business Profile optimization, website creation, social media management, lead generation systems, and AI-powered automation.
Primary Button Text: Get My Free Audit (Links to Free Audit Page)
Secondary Button Text: Book A Consultation (Links to Contact Page)

--- PROBLEM SECTION ---
Headline: Are You Losing Customers to Your Competitors?
Subheadlines:
* Not enough leads: Your phones are quiet and search impressions are declining.
* Outdated website: Slow pages turn away mobile customers looking for quick service.
* Weak Google presence: You target a city but do not show up in the top search map pack.
* Poor online trust: Lacking steady reviews makes customers question your business credentials.
* Inactive social media: A deserted Facebook profile hints your business might be closed.
* Missed customer opportunities: Over 40% of contractor phone calls go unanswered on active job sites.

--- SERVICES BULLET LIST ---
* Google Business Profile Cleanup (Fix errors and citations) - $150
* GBP Active Monthly Management (Posts, reviews & keyword sync) - $99/mo
* Facebook Business Page Cleanup (Beautiful layouts & branding) - $100
* Facebook Monthly Management (2 dynamic posts every week) - $99/mo
* Review Automation Setup (Printable QR and SMS requesting links) - $49/mo
* High-Converting Web Design (Mobile-first trade booking engines) - $500
* Automated Call Text-backs (Secure every busy contractor line missed ring) - $100

--- EXPERIENCE STEPS ---
* Step 1: Free Business Audit - We locate exact gaps in your searches, mobile pages, and structures.
* Step 2: Growth Strategy - We structure an affordable localized roadmap to bring steady inquiries.
* Step 3: Implementation - We build rapid websites, claim maps, and install modern automations.
* Step 4: Business Growth - Your phone rings, review metrics soar, and weekly client counts scale up.`,
  servicesPage: `=== GOOGLE SITES COMPATIBLE PORT: SERVICES ===

Headline: affordable Local SEO, Website Creation, and Lead Systems

- Google Business Profile Cleanup [Price: $150]
  Description: We handle verifying citations, primary trade categories, removing bad duplicate pins, and filling hours to lock in maps ranking.
- Google Business Profile Monthly Management [Price: $99/mo]
  Description: Keep your listing highly active on Google. We schedule weekly updates and answer customer questions using keywords.
- Review and Reputation Setup [Price: $49/mo]
  Description: Create automated customer feedback pipelines with customized truck QR scan badges.
- High-Converting Website Creation [Price: $500]
  Description: Custom designed high-speed pages optimized for click-to-call mobile buttons and client lead forms.`,
  pricingPage: `=== GOOGLE SITES COMPATIBLE PORT: PRICING ===

- STARTER LOCAL PACKAGE ($299 Setup, No recurring fees)
  * Google Business Listing Cleanup & SEO optimization
  * Facebook profile clean alignment
  * Review automation link setup
  * 1-Page fast loading landing page
  * Click to Call mobile button setup

- GROWTH ENGINE PACKAGE ($499/mo Retainer, 10-day notice)
  * Complete 5-Page mobile trade website
  * Monthly active GBP management (weekly keyword uploads)
  * Active Facebook monthly marketing
  * Automated review QR generation
  * Missed Call Text-back active SMS installation
  * Instant lead smartphone alerts

- PREMIUM MARKETING PACKAGE ($999/mo Retainer)
  * Premium custom trades website
  * Daily Google Maps postings & visual updates
  * Fully configured AI reception chatbot
  * Multi-city landing pages targeted for surrounding towns`,
  faqPage: `=== GOOGLE SITES COMPATIBLE PORT: TOP QUESTIONS ===

1. Does LeadForge Local have a licensing parent?
   - LeadForge Local is a dedicated business growth service focused on helping local small businesses improve their online presence and lead generation system, giving customers premium tech at direct contractor friendly prices.
2. What is Missed Call Text-Back?
   - If clients call and you don't answer because you're busy on a job, our system instantly shoots them a text. This helps save leads from booking another option.
3. How long do local search results take to show?
   - Core page cleanups index in 10 days. Map pack search visibility leaps show solid compound gains between weeks 3 and 8.`
};
