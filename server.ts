import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Secure HTTP Headers Middleware
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

  // Content-Security-Policy (allows self, Tailwind inline styles, Google Fonts, Google Analytics, and local images)
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://images.unsplash.com https://picsum.photos; " +
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;"
  );

  next();
});

// Helper: Fallback heuristic playbook generator
function getHeuristicPlaybook(auditLeads: any[], contactLeads: any[]) {
  const totalLeads = auditLeads.length + contactLeads.length;
  let adviceLines: string[] = [];
  
  if (totalLeads === 0) {
    adviceLines = [
      "🎯 **Cold Outreach Kickoff**: Your CRM database list is empty. Go search Google Maps in your target city for 'roofing contractors' or 'dental clinics' on page 3. Grab three businesses that lack a primary website or have less than 10 reviews.",
      "📝 **Manual Pilot Insertion**: Submit these three local prospects manually using the 'Get Free Business Audit' form on our homepage. This triggers the automatic profile creation, and outputs a bespoke audit PDF for you to email them immediately.",
      "📞 **Missed Call Pitching**: Phone these prospects directly. Mention that you noticed their Google business hours are unverified and that they are losing massive client calls to competitors up the street.",
    ];
  } else {
    // Build customized advice line-by-line using the actual lead names/industries
    adviceLines.push(`📊 **Active Pipeline Secured**: You have ${auditLeads.length} audit requests and ${contactLeads.length} consultation messages in your CRM queue.`);
    
    // Analyze audit leads
    auditLeads.forEach((lead: any, index: number) => {
      const biz = lead.businessName || "Local Prospect";
      const client = lead.name || "Business Owner";
      const hasSite = lead.website && !lead.website.toLowerCase().includes("no existing");
      const phone = lead.phone || "No phone listed";
      
      if (!hasSite) {
        adviceLines.push(`🔥 **CORRELATION [Audit #${index + 1}]**: **${biz}** (${client}) has NO active website listed. This represents a golden $499/mo setup contract. Draft our custom 'Growth Proposal' instantly, copy the outreach card, and text them at **${phone}** offering a free beautiful Google Site draft.`);
      } else {
        adviceLines.push(`⚡ **CORRELATION [Audit #${index + 1}]**: **${biz}** has a website but rankings are low on Google Maps. Copy the 'GBP Optimization Card' script from the pitch cards tab and email **${lead.email || "them"}** with their 7-point audit report.`);
      }
    });
    
    // Analyze contact leads
    contactLeads.forEach((lead: any, index: number) => {
      const biz = lead.businessName || "Inbound Contact";
      const client = lead.name || "Lead";
      const msg = lead.message || "";
      
      adviceLines.push(`💬 **URGENT FOLLOWUP [Contact #${index + 1}]**: **${biz}** (Sender: ${client}) sent a direct inquiry stating: "${msg.length > 50 ? msg.substring(0, 50) + '...' : msg}". Call them back immediately. This lead filled out a direct form, signifying they are extremely warm and ready to transact. Pitch the 'Essential Starter' or 'Growth Engine' Monthly Retainer.`);
    });
    
    adviceLines.push("🌟 **Next Best Action**: Go to our 'Audit & Proposal Writers' tab, type in these details to generate the documents, and send them directly to establish immediate, trust-based authority.");
  }

  return {
    status: "optimized_heuristic",
    text: `### 🤖 LeadForge AI Advisor (Smart Analysis Mode)

Your system is currently running on our local intelligent heuristic engine. Below is your prioritized outreach playbook, dynamically built from your live CRM database:

${adviceLines.map(line => `- ${line}`).join("\n\n")}

*(Note: If you want to enable complex AI chat and unrestricted natural reasoning, select a Gemini API Key in **Settings > Secrets** to automatically unlock raw Gemini responses.)*`
  };
}

// Helper: Fallback heuristic outreach script generator
function getHeuristicOutreach(lead: any) {
  const { name = "Owner", businessName = "Local Contractor", phone = "unknown phone", email = "no email", website = "", message = "", type = "Audit" } = lead;
  const isContactInbound = type === "Contact";

  let phoneScript = "";
  let emailDraft = "";
  
  if (isContactInbound) {
    phoneScript = `**Friendly Opener**: "Hey is this ${name}? Hey ${name}, my name is [Your Name] with LeadForge. I saw you just reached out on our site regarding some online visibility. I wanted to call you back personally while I have your file open so we can jump on this message you left: '${message}'."
**Pitching**: "Typically, when we perform these diagnostics, we find three main focus areas: mobile design delay, a high percentage of missed inbound client calls, and Google Maps category labels that are unoptimized. Now, instead of trying to fix these things yourself, here are three things a professional marketing team would do to correct those three errors: re-engineer the layouts for instant phone loading, calibrate custom target labels on Maps to capture local traffic, and spin up an automated SMS fallback system so whenever you're busy, you text callers back immediately. We actually provide that exact service for a fraction of what a full marketing agency charges, except that you get direct, day-to-day access to your marketing team."
**The Close / Booking**: "Let's grab 5-10 minutes tomorrow morning over coffee to look at it together, or I can email you the outline. What's your best address?"`;

    emailDraft = `Subject: Fast follow up regarding your Inquiry - LeadForge Local

Hi ${name},

Thanks again for reaching out to us today! I wanted to follow up immediately regarding your message:
"${message}"

When local search customers are looking for services, they want instant help. When we run standard visibility diagnostics, we look closely at three main errors: mobile design delay, missed inbound client calls, and unoptimized Maps listing labels. 

Instead of trying to fix these things yourself, here are three things a professional marketing team would do to correct those three errors:
1. Re-engineer the layout structure for lightning-speed mobile rendering.
2. Calibrate advanced Google Business categories and microdata optimization to unlock your local maps rank.
3. Configure a carrier-approved instant SMS response route to lock in missed business traffic.

We built LeadForge Local to handle all of this for you. We generally cost significantly less than a marketing team and provide the same service except that you have direct access to your marketing team.

Could we schedule a quick 10-minute chat tomorrow at 9:00 AM or 2:00 PM to show you how to capture these clients?

Best regards,
[Your Name]
LeadForge Local Coordinator
Phone: 555-0199`;
  } else {
    phoneScript = `**Friendly Opener**: "Hi is this ${name}? Hey ${name}, my name is [Your Name]. I am a local coordinator here in town. I was looking through Google Maps profiles and noticed ${businessName}. I ran a quick smartphone speed scan of your listing and wanted to share what I found."
**Pitching the Correction**: "So, here's the deal: when we run diagnostics, we look at three main errors: mobile design slowdown, unoptimized Maps listing categories, and a lack of missed call text-back. Instead of trying to fix these yourself, there are three things a professional marketing team would do to correct those three errors. First, re-engineer your mobile pages so they load in under a second; second, optimize your maps search labels so you rank at the top; and third, install a carrier-certified automatic SMS fallback so you never lose a client. We actually handle all of this. We generally cost significantly less than a marketing team and provide the same service except that you have direct access to your marketing team."
**The Close / Booking**: "I compiled these three points in a clean, free report. Can I email it to ${email} or text it to ${phone}?"`;

    emailDraft = `Subject: Quick helpful report for ${businessName}

Hi ${name},

I was looking at ${businessName} in your area and put together a quick, friendly visibility report of how your business appears on mobile search.

During our check, we noticed three specific bottleneck areas: mobile design slowdown, unoptimized Maps listing categories, and a lack of instant-response text back for busy lines.

Instead of trying to fix these things yourself, here are three things a professional marketing team would do to correct those three errors:
1. Re-engineer your mobile page layout for lightning-fast mobile loading speed.
2. Optimize your Google Business Profile labels and search categorization to rank at the top of maps.
3. Establish an automatic SMS reply system to contact callers immediately if you miss a call.

At LeadForge, we streamline this entire setup for you. We generally cost significantly less than a marketing team and provide the same service except that you have direct access to your marketing team.

Would you prefer me to email the report to ${email} or send a quick copy to ${phone} so we can show you our approach?

Best,
[Your Name]
LeadForge Local Team
555-0199`;
  }

  const text = `### 🤖 AI Copy-and-Paste Outreach Guide (Optimized Template)

Here is your exact word-for-word playbook to engage **${name}** at **${businessName}**. This guidance covers your complete sales calls and emails without any complicated tech talk:

#### 📞 Word-for-Word Phone Script
${phoneScript}

---

#### ✉️ Outbound Sales Email Draft
\`\`\`text
${emailDraft}
\`\`\`

---

#### 💡 Immediate Next Steps
1. **Send a quick text check**: Send a short SMS to **${phone}**: *"Hi ${name}, this is [Your Name]. Just sent a quick, friendly visibility report for ${businessName} to ${email}. Let me know if that helps!"*
2. **Review their details**: Review the business parameters before launching the phone call. Keep the tone casual, like an encouraging neighbor, not a pushy corporate agent.
3. Use our **Audit & Proposal Generators** tab to download the exact PDF and visual report card matching their info.`;

  return { status: "optimized_heuristic", text };
}

// API: Secure Admin passcode verification
app.post("/api/verify-pin", (req, res) => {
  const { pin } = req.body;
  const adminPin = process.env.ADMIN_PIN || "0722";
  if (pin === adminPin) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: "Invalid security credential. Check owner configurations." });
  }
});

// API: AI Playbook Coordinator
app.post("/api/ai-coordinate", async (req, res) => {
  const { auditLeads = [], contactLeads = [] } = req.body;
  try {
    // Check for API Key presence
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      const fallbackResult = getHeuristicPlaybook(auditLeads, contactLeads);
      return res.json(fallbackResult);
    }

    // Lazy initialization of Gemini SDK
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Construct prompt containing all current CRM list context
    const leadContext = {
      auditLeads: auditLeads.map((l: any) => ({
        businessName: l.businessName,
        owner: l.name,
        email: l.email,
        phone: l.phone,
        website: l.website,
        timestamp: l.submittedAt
      })),
      contactLeads: contactLeads.map((c: any) => ({
        businessName: c.businessName,
        sender: c.name,
        email: c.email,
        phone: c.phone,
        message: c.message,
        timestamp: c.submittedAt
      }))
    };

    const promptText = `
Given the following list of active local business leads stored in the LeadForge Local CRM database:
${JSON.stringify(leadContext, null, 2)}

Provide a highly targeted, step-by-step Plain Text outreach blueprint and coordinator guide matching this client roster. 
Tell me exactly what to do for each specific lead to convert them into a paying monthly customer (pricing packages are $299 Starter Local, $499/mo Premium Growth, $999/mo Monthly Marketing Management).

Format your response in beautiful Markdown:
- Start with a professional header: "### 🤖 LeadForge AI Coordinator Playbook"
- Focus heavily on correlating their specifics (e.g. if Gary Davidson has 'no existing website', recommend proposing our $499/mo Premium Growth package and pitching the missed-call text-back automation).
- Provide 3-5 clear, concrete, sequential next-action bullets.
- Mention specific names, business titles, and numbers with suggested copy-paste tips.
- Keep the tone highly strategic, crisp, encouraging, and focused on gaining client retainers.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
    });

    return res.json({
      status: "live_gemini",
      text: response.text
    });

  } catch (error: any) {
    console.error("Gemini API error:", error);
    const fallbackResult = getHeuristicPlaybook(auditLeads, contactLeads);
    return res.json({
      status: "fallback_heuristic",
      text: `${fallbackResult.text}\n\n*(Note: Your customized Gemini API Key returned a rate-limit/quota error. We have automatically activated the Local Heuristic Advisor Engine to compile your playbook with zero downtime. Check Settings > Secrets inside the code window or your billing details on Google AI Studio to increase your live API limits.)*`
    });
  }
});

// API: AI Interactive Strategic Advisor Chat
app.post("/api/ai-chat", async (req, res) => {
  const { message = "", auditLeads = [], contactLeads = [] } = req.body;
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Deterministic fallback response when Gemini key is not yet set
      let text = `### 🤖 LeadForge Advisor response (Heuristic Mode)

I received your strategy query: *"${message}"*

Here is our agency guideline recommendation:

- **Target Professional Niches**: When aiming for high-margin groups like recording studios, law firms, dental clinics, chiropractors, or spas, always highlight **trust and seamlessness**. These clients care heavily about branding clean aesthetics and fast mobile performance.
- **Pitching the Google Sites blueprint**: Outline that you will deploy a fast 5-page, responsive Google Sites template with zero slow hosting costs and a custom premium domains connection (e.g. \`www.yourcitystudio.com\`).
- **Missed Call Text-back implementation**: Pitch that 62% of calls to local contractors, doctors, or studios go unanswered because the operator is in a meeting or session. By deploying our instantaneous automated SMS loop ("Hey! Missed your call, we are in a session. What can we book for you?"), they save thousands in lost ticket opportunities.

*Select a Gemini API Key in Settings > Secrets to unlock unrestricted natural reasoning responses.*`;
      return res.json({ status: "optimized_heuristic", text });
    }

    // Initialize Gemini Client
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const context = `
Current Active Leads Context:
${JSON.stringify({ auditLeads, contactLeads }, null, 2)}
`;

    const promptText = `
You are the built-in LeadForge Local agency strategic director and coordinator.
A partner is requesting advice based on their active lead pipeline.
Partner Query: "${message}"

${context}

Provide a short, crisp, highly strategic reply. Show them exactly how to close potential clients or answer their objections. Use bullet points and focus heavily on practical sales advice. Return beautiful Markdown. Keep your response under 180 words.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
    });

    return res.json({ status: "live_gemini", text: response.text });

  } catch (error: any) {
    console.error("Gemini Chat API error:", error);
    return res.json({
      status: "fallback_heuristic",
      text: `### 🤖 LeadForge Advisor (Heuristic Recovery Mode)

I received your strategy query: *"${message}"*

*(Note: Your Gemini API Key returned a rate-limit/quota error. We have automatically activated the Local Heuristic Advisor Engine.)*

Here is our top sales recommendations to close this client:
- **Never teach the owner to fix things herself**: Explain what traditional marketing teams do (mobile design layout re-engineering, maps label and secondary tag optimization, and SMS fallback setup). 
- **Present our unfair pricing advantage**: Highlight that we cost significantly less than a marketing team and provide the same high tier service, except you get direct, day-to-day access to your marketing team.
- **Propose a quick next step**: Secure a 5-minute call tomorrow morning to show their diagnostic sheet.`
    });
  }
});

// Helper: Heuristic local audit generator
function generateHeuristicAudit(businessName: string, category: string, website: string, gbpLink: string) {
  const cat = (category || "").toLowerCase();
  const nameLow = (businessName || "").toLowerCase();
  
  let grade = "Needs Attention";
  let summary = `A detailed visibility scan of ${businessName}'s digital foundation highlights key growth vectors across your online footprint. In the competitive ${category || "local services"} market, many local companies invest heavily in advertising while overlooking foundational issues that limit results. Solving these challenges first will establish a reliable, high-converting customer pipeline.`;
  
  let recommendations = [];
  
  if (cat.includes("plumb") || cat.includes("leak") || cat.includes("pipe") || nameLow.includes("plumb") || cat.includes("roof") || cat.includes("hvac") || cat.includes("air") || cat.includes("heat") || cat.includes("contract") || cat.includes("repair")) {
    const isPlumbing = cat.includes("plumb") || nameLow.includes("plumb");
    const serviceName = isPlumbing ? "plumbing" : "home services";
    const emergencyKeyword1 = isPlumbing ? "burst pipe repair" : "emergency roof leak repair";
    const emergencyKeyword2 = isPlumbing ? "clogged drain repair" : "clogged ac drain line repair";
    const emergencyKeyword3 = isPlumbing ? "water heater replacement" : "same-day repair service";

    grade = "Critical Gaps";
    summary = `Preliminary premium visibility analysis for ${businessName} (${category || "Home Services"}). We detected critical structural layout and high-intent local search gaps in your DFW-area visibility profile. Correcting these items will help you capture immediate inbound phone calls and prevent local homeowners from choosing competitors who appear more established and easier to trust online.`;
    recommendations = [
      {
        title: "Service Area Optimization & Location Landing Pages",
        issueFound: "Your business website does not have dedicated localized service pages for each specific town, suburb, or neighborhood you cover. Currently, it only lists a single general physical office or service area.",
        whyThisMatters: "When local searchers need a helper quickly, they type phrases like '" + (isPlumbing ? "toilet repair near me" : "hvac repair near me") + "' or '" + (isPlumbing ? "emergency plumber in Richardson" : "contractor in Plano") + "'. Without separate pages optimized for each surrounding suburb, search engines will exclude your website from those physical search results, resulting in lost leads, fewer phone calls, and lost revenue.",
        competitiveImpact: "Other area companies that have built distinct local neighborhood pages will rank higher in nearby suburbs, capturing active, high-intent emergency service calls first and leaving you at a disadvantage.",
        recommendedSolution: "Create separate, highly readable, and uncluttered landing pages on your website for every major target neighborhood in your service territory. Provide helpful, custom-written information detailing your services in those specific areas.",
        estimatedDifficulty: "Advanced",
        implementationComplexity: "Setting up search-optimized location landing pages requires professional web development, careful keyword allocation, and local schema coding to ensure Google indexes and ranks each page correctly.",
        potentialBusinessImpact: "Critical"
      },
      {
        title: "High-Intent Emergency Keywords Optimization",
        issueFound: "Your website text relies almost entirely on passive, generic phrases and lacks explicit, prominent keywords focusing on urgent emergency searches like '" + emergencyKeyword1 + "', '" + emergencyKeyword2 + "', and '" + emergencyKeyword3 + "'.",
        whyThisMatters: "When an active leak, broken AC, or structural emergency arises, homeowners are stressed and seek immediate, specific fixes. They do not click on generic 'about us' pages; they seek quick assistance. Lacking terms of urgency, your website fails to rank on Google in these moments, leading to lower search visibility and missed high-ticket service jobs.",
        competitiveImpact: "Competitors with clear, reassurance-focused headlines and explicit service names immediately win the trust of frantic searchers, booking the job before the customer ever continues browsing.",
        recommendedSolution: "Re-engineer your main website headings and title tags to prominently display urgent-buy terms and clear phone numbers, reassuring nearby customers that you offer rapid solutions to their immediate problems.",
        estimatedDifficulty: "Intermediate",
        implementationComplexity: "Selecting the precise combination of high-traffic terms and writing compelling, natural headings without sound technical or confusing requires an elite copywriter.",
        potentialBusinessImpact: "High"
      },
      {
        title: "Missed-Call Auto-SMS Fallback Integration",
        issueFound: "Your business does not have an automated response system to instantly reply to unanswered phone calls or website forms with a friendly text message.",
        whyThisMatters: "Over sixty percent of phone calls to local service businesses go unanswered. When a customer calls a contractor and gets sent to voicemail, they immediately hang up and call a competitor. Moving too slow leads to a direct loss of customer trust and missed opportunities.",
        competitiveImpact: "Competitors using instant, automated text reply platforms start active conversation threads immediately, locking in the homeowner before the customer can search elsewhere.",
        recommendedSolution: "Establish a carrier-approved instant web response route that automatically sends a friendly, conversational text message ('Hi, sorry we missed your call—how can we help you today?') within thirty seconds of any missed ring.",
        estimatedDifficulty: "Expert-Level",
        implementationComplexity: "Many business owners choose professional help here because setting up carrier-certified SMS routing, CRM synchronization, and automated replies requires technical coordination to prevent messages from being marked as spam.",
        potentialBusinessImpact: "Critical"
      }
    ];
  } else if (cat.includes("dent") || cat.includes("teeth") || cat.includes("ortho") || cat.includes("dental") || nameLow.includes("dent") || cat.includes("health") || cat.includes("med") || cat.includes("care")) {
    grade = "Needs Attention";
    summary = `Comprehensive digital visibility audit for ${businessName} (Healthcare & Dental Services). While your practice presents a trustworthy and friendly initial impression, key optimization bottlenecks in localized maps listing details, insurance discovery pages, and conversion pathways severely limit your organic new-patient acquisition.`;
    recommendations = [
      {
        title: "Google Maps Citation and NAP Detail Alignment",
        issueFound: "Your practice's exact business credentials—including your Name, Physical Address, and Phone Number—contain slight differences across major online health platforms and your Google Maps page.",
        whyThisMatters: "Search engines continuously compare directories to verify that your medical practice is legitimate and securely located. Tiny variations (such as 'Ste A' vs 'Suite A', or different phone numbers) weaken search engine trust, which reduces your visibility and ranking inside the Google Maps section.",
        competitiveImpact: "Practices with perfectly synchronized citations across portals like Yelp, Healthgrades, and Google Maps rank higher, capturing local patients seeking nearby care first.",
        recommendedSolution: "Perform a thorough cleanup of your business coordinates across all major local databases, locking in a perfectly identical format matching your Google Business Profile.",
        estimatedDifficulty: "Intermediate",
        implementationComplexity: "Tracking down, verifying, and claiming dozens of distinct directory profiles is extremely time-consuming and requires specialized database tools to ensure updates stick permanently.",
        potentialBusinessImpact: "High"
      },
      {
        title: "Insurance Information Portals & Patient Search Pages",
        issueFound: "Your current website lacks clear, prominent pages explicitly explaining which major insurance carriers and copay networks you accept.",
        whyThisMatters: "The single biggest question new patients have is: 'Do they take my insurance?'. If a customer searches for 'dentist who accepts Delta Dental' and does not find an unambiguous answer on your site, they will leave immediately. This increases your website bounce rate and wastes precious traffic.",
        competitiveImpact: "Competing practices with dedicated, clear insurance matriculation tables rank prominently on Google and quickly convert visitors into real booked visits.",
        recommendedSolution: "Create a dedicated 'Insurances Accepted' page complete with high-resolution carrier logos and answers to common billing questions to put prospective clients at ease.",
        estimatedDifficulty: "Basic",
        implementationComplexity: "Setting up a clean, high-contrast grid of accepted providers that looks clean on mobile devices while applying structured local data requires professional design.",
        potentialBusinessImpact: "High"
      },
      {
        title: "Seamless 24/7 Mobile Patient Scheduling",
        issueFound: "Your website requires patients to manually dial your front desk during limited office hours to request or book an appointment, with no digital scheduling options.",
        whyThisMatters: "A significant percentage of family healthcare decisions are made in the evenings after normal business hours. If a busy parent visits your website on their smartphone and cannot easily request an appointment slot, they will click away to a competitor who makes scheduling simple.",
        competitiveImpact: "Practices offering clean, interactive online request calendars secure new patient files round-the-clock, outperforming static informational websites.",
        recommendedSolution: "Introduce a prominent, mobile-optimized scheduling button or patient intake form in your website main header to minimize the steps needed to book.",
        estimatedDifficulty: "Intermediate",
        implementationComplexity: "Integrating automated calendar sync that updates in real-time with your practice management software without double-booking requires professional tech integration.",
        potentialBusinessImpact: "High"
      }
    ];
  } else if (cat.includes("law") || cat.includes("attorney") || cat.includes("legal") || cat.includes("court") || nameLow.includes("attorney") || nameLow.includes("law") || cat.includes("consult")) {
    grade = "Critical Gaps";
    summary = `Premium local SEO and authority assessment for ${businessName} (Legal Practice). In the highly competitive legal marketplace, simple listings are no longer enough. Your audit reveals substantial gaps in case-specific structure and digital trust signals that restrict your search exposure and prevent you from securing high-value client retainers.`;
    recommendations = [
      {
        title: "Case-Specific Practice Area Silo Pages",
        issueFound: "Your legal website groups multiple complex practice areas together on a single generic Page, rather than dedicating separate pages to each specific legal service you provide.",
        whyThisMatters: "Individual clients search for highly specific solutions, such as 'child custody attorney in Fort Worth' or 'commercial truck accident lawyer'. If your website lacks detailed, separate pages for each service, search engines will evaluate your site as too generic, resulting in poor rankings and fewer qualified legal leads.",
        competitiveImpact: "Elite law firms with focused, comprehensive pages for every practice area dominate search results and capture individual clients facing urgent legal battles first.",
        recommendedSolution: "Expand your website layout to feature individual, deeply informative sub-pages for every legal practice area and case type you represent.",
        estimatedDifficulty: "Advanced",
        implementationComplexity: "Writing high-quality, legally compliant copy that is friendly yet authoritative, while laying out proper backlink pathways, requires expert content and SEO writing.",
        potentialBusinessImpact: "Critical"
      },
      {
        title: "Establishing Strict Legal Authority and EEAT Signals",
        issueFound: "Your platform does not highlight critical trust marks, state bar credentials, legal memberships, award logos, and successful case histories on the homepage.",
        whyThisMatters: "Google evaluates legal websites under extremely strict 'Your Money Your Life' standards. Without clear, unmistakable proof of experience, authority, and safety, search engines will choose not to display your website in local searches.",
        competitiveImpact: "Competitors who professionally highlight credentials and badges on their mobile headers instantly win client trust and secure the initial consult.",
        recommendedSolution: "Inject highly visible proof elements—such as official state bar seals, prestigious membership badges, and client case study reviews—directly into your primary website pages.",
        estimatedDifficulty: "Intermediate",
        implementationComplexity: "Sourcing, formatting, and placing official legal trust markers elegantly without complicating your layout requires dedicated frontend web designers.",
        potentialBusinessImpact: "High"
      },
      {
        title: "Attorney and LegalService Schema Code Markup",
        issueFound: "Your business website lacks specialized search engine background code—known as structured legal metadata—that explicitly details your practice status to search engines.",
        whyThisMatters: "Without structured business information embedded in your background code, search engine spiders struggle to parse your physical jurisdiction, office locations, and exact bar affiliations, limiting your Google Maps visibility.",
        competitiveImpact: "Law offices utilizing advanced legal schema tags rank higher and present richer, more professional results on Google search screens.",
        recommendedSolution: "Integrate a custom-written 'Attorney' or 'LegalService' JSON-LD code layer into the background of your website's main files.",
        estimatedDifficulty: "Advanced",
        implementationComplexity: "Injecting custom JSON-LD schema into database layouts requires coding expertise, as errors can render your website design broken or invisible to search engine crawlers.",
        potentialBusinessImpact: "Moderate"
      }
    ];
  } else {
    // Default / General
    grade = "Needs Attention";
    summary = `Strategic localized visibility check for ${businessName}. While your business possesses a solid baseline, several key optimizations in web display speeds, automated lead capture, and Google Maps categorization are required to prevent lost leads and maintain a steady stream of incoming phone calls.`;
    recommendations = [
      {
        title: "Mobile Speed, Performance, and Screen Layout Optimization",
        issueFound: "Your website experiences minor speed delays when loading on standard mobile data connections and lack a clean, responsive layout for modern phones.",
        whyThisMatters: "More than sixty percent of local customers find services on their smartphones. If your page layout takes more than three seconds to load, visitors will leave immediately. A slow loading speed reduces customer trust and limits your primary lead capture capabilities.",
        competitiveImpact: "Nearby competitors who have optimized and modernized their mobile load times capture these busy mobile searchers first.",
        recommendedSolution: "Compress heavy image files, remove outdated script files, and ensure your website is engineered to display instantly on any mobile viewport.",
        estimatedDifficulty: "Intermediate",
        implementationComplexity: "Re-engineering a website's speed requires careful edits to file systems, CSS styling, and server parameters, which can disrupt site formatting if not configured by a professional developer.",
        potentialBusinessImpact: "High"
      },
      {
        title: "Google Maps Category Verification and Secondary Attribute Tuning",
        issueFound: "Your primary Google Business Profile category might not align precisely with high-volume search phrases, or you are missing key secondary keyword attributes.",
        whyThisMatters: "Google Maps uses your primary business category to determine when to show your business to local searchers. Setting an incorrect or generic category means your listing will never appear for high-value search phrases, resulting in fewer phone calls and lost revenue.",
        competitiveImpact: "Local competitors with accurate and complete category tuning rank higher in Maps, capturing nearby commercial traffic first.",
        recommendedSolution: "Verify and align your primary Google Maps category to match your specific industry perfectly, and integrate all applicable secondary service tags.",
        estimatedDifficulty: "Basic",
        implementationComplexity: "Adjusting your category is simple, but analyzing local search volumes and selecting the exact mix of secondary tags that will maximize visibility without risk of profile suspension requires seasoned consultant expertise.",
        potentialBusinessImpact: "Critical"
      },
      {
        title: "Lead Capture response and Missed-Call Auto-SMS Fallback",
        issueFound: "Your business does not have an automatic missed-call system or instant text autoresponder linked to your primary phone number.",
        whyThisMatters: "If a nearby customer calls your business and receives a voicemail, they will not wait—they will immediately hang up and call the next service provider on their screen. Overlooking this leads directly to lost revenue and wasted marketing efforts.",
        competitiveImpact: "Competitors who employ active, instant text automation lock in new opportunities immediately by sending a friendly text text-back within seconds, ending the customer's search.",
        recommendedSolution: "Implement a polite, secure missed-call auto-response setup of LeadForge Local to instantly reply to unanswered calls or web submissions via SMS.",
        estimatedDifficulty: "Advanced",
        implementationComplexity: "Setting up carrier-approved, reliable SMS autoresponders with proper call routing and CRM logs requires technical configuration to meet telco legal compliance.",
        potentialBusinessImpact: "Critical"
      }
    ];
  }

  return {
    grade,
    summary,
    recommendations,
    isAiPowered: false
  };
}

// API: Generate Live Business Audit with Heuristic Safe Recovery
app.post("/api/generate-audit", async (req, res) => {
  const { name, businessName, email, phone, website = "", gbpLink = "", category = "" } = req.body;
  
  console.log(`[LeadForge Server] Received Audit Generation Request for: "${businessName}" (${category})`);

  // Validate basic parameters
  if (!name || !businessName || !email || !phone) {
    return res.status(400).json({ 
      status: "error", 
      message: "Please complete all required fields: Name, Business Name, Email, and Phone Number." 
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Check if we should use Live Gemini API or Fallback Heuristics
    if (!apiKey) {
      console.log("[LeadForge Server] No GEMINI_API_KEY detected. Utilizing local adaptive heuristic audit engine.");
      const heuristicResult = generateHeuristicAudit(businessName, category, website, gbpLink);
      return res.json({
        success: true,
        ...heuristicResult,
        isAiPowered: false
      });
    }

    console.log("[LeadForge Server] GEMINI_API_KEY found. Orchestrating dynamic Gemini-powered visibility check.");
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const promptText = `
    You are an elite conversion copywriter, local SEO consultant, and B2B marketing strategist for LeadForge Local.
    Perform an industry-specific, highly custom, actionable, and professional 3-point digital visibility audit for:
    - Business Owner: "${name}"
    - Business Name: "${businessName}"
    - Primary Category/Industry: "${category || "Local Service"}"
    - Website: "${website || "None listed"}"
    - Google Business Profile: "${gbpLink || "None provided"}"

    Your writing style MUST be:
    - Easy for non-technical business owners to understand.
    - Written at approximately a 6th–8th grade reading level.
    - Free of abbreviations, acronyms, and technical jargon unless immediately explained in plain English.
    - Highly detailed, comprehensive, valuable, and authoritative.
    - Focused on business impact, lost revenue, lost customers, and competitive disadvantage.
    - Written in a way that clearly shows why expert implementation is valuable.
    - Avoid fear tactics, false claims, exaggerated results/guarantees, or false claims of Google penalty (explain Google algorithms factually where relevant).

    Avoid technical terms alone:
    - Instead of "Implement GBP optimization.", write "Create and fully optimize your Google Business Profile so customers can find your business on Google Maps, view reviews, and contact you directly."
    - Instead of "Deploy JSON-LD schema.", write "Add structured business information to your website so search engines clearly understand your services, service areas, and business details."
    - Instead of "Improve local SEO.", write "Increase your visibility when nearby customers search for businesses like yours."

    For every recommendation, you MUST provide these exact 7 fields in the JSON object:
    1. issueFound - Explain what is wrong in plain English.
    2. whyThisMatters - Explain how this directly affects customer trust, phone calls, leads, and revenue.
    3. competitiveImpact - Explain how competitors with stronger digital foundations may capture customers first.
    4. recommendedSolution - Explain what should be done to fix the issue.
    5. estimatedDifficulty - Rate select strictly from: "Basic", "Intermediate", "Advanced", "Expert-Level".
    6. implementationComplexity - Briefly explain why many business owners choose professional help for setup, optimization, and ongoing maintenance.
    7. potentialBusinessImpact - Rate select strictly from: "Low", "Moderate", "High", "Critical".

    You MUST output a valid JSON object matching this exact structure:
    {
      "grade": "Needs Attention" | "Critical Gaps",
      "summary": "A comprehensive executive summary (3-4 sentences in plain English) that highlights lost opportunity and emphasizes how digital systems must work together (website, search visibility, reviews, conversion systems, technical setup, ongoing monitoring)...",
      "recommendations": [
        {
          "title": "Clear Actionable Recommendation Title",
          "issueFound": "plain English explanation of what is wrong...",
          "whyThisMatters": "how this affects customer trust, phone calls, and revenue...",
          "competitiveImpact": "how competitors capture customers first...",
          "recommendedSolution": "what should be done to fix it...",
          "estimatedDifficulty": "Basic" | "Intermediate" | "Advanced" | "Expert-Level",
          "implementationComplexity": "why many business owners choose professional help for setup...",
          "potentialBusinessImpact": "Low" | "Moderate" | "High" | "Critical"
        },
        ... (exactly 3 objects in the recommendations array)
      ]
    }
    IMPORTANT: Output ONLY a valid JSON string. Do not wrap it in markdown block fences like \`\`\`json or add other preambles. Output only the pure raw parseable JSON string.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
    });

    const responseText = response.text || "";
    let cleanJsonStr = responseText.trim();
    
    // Safety check: strip markdown block fences if the model wraps them anyway
    if (cleanJsonStr.startsWith("```json")) {
      cleanJsonStr = cleanJsonStr.substring(7);
    } else if (cleanJsonStr.startsWith("```")) {
      cleanJsonStr = cleanJsonStr.substring(3);
    }
    if (cleanJsonStr.endsWith("```")) {
      cleanJsonStr = cleanJsonStr.substring(0, cleanJsonStr.length - 3);
    }
    cleanJsonStr = cleanJsonStr.trim();

    try {
      const parsedAudit = JSON.parse(cleanJsonStr);
      if (parsedAudit && parsedAudit.grade && Array.isArray(parsedAudit.recommendations)) {
        console.log(`[LeadForge Server] Successfully generated and parsed dynamic Gemini audit for: "${businessName}"`);
        return res.json({
          success: true,
          ...parsedAudit,
          isAiPowered: true
        });
      } else {
        throw new Error("Parsed JSON did not match expected database schema.");
      }
    } catch (parseErr: any) {
      console.warn("[LeadForge Server] Malformed/invalid JSON returned from Gemini API. Falling back to local heuristic matrix:", parseErr);
      const heuristicResult = generateHeuristicAudit(businessName, category, website, gbpLink);
      return res.json({
        success: true,
        ...heuristicResult,
        isAiPowered: false,
        warning: "Gemini JSON parsing issue"
      });
    }

  } catch (apiError: any) {
    console.error("[LeadForge Server] Gemini API error/timeout during audit orchestration:", apiError);
    // Silent recovery: serve heuristic recommendations so form always submits successfully!
    const heuristicResult = generateHeuristicAudit(businessName, category, website, gbpLink);
    return res.json({
      success: true,
      ...heuristicResult,
      isAiPowered: false,
      errorLog: apiError.message || apiError
    });
  }
});

// API: AI Tailored Outreach Script Generator (Call scripts & email drafts)
app.post("/api/ai-lead-outreach", async (req, res) => {
  const { lead } = req.body;
  try {
    if (!lead) {
      return res.status(400).json({ status: "error", text: "Please select a valid prospect lead." });
    }
    
    const { name = "Owner", businessName = "Local Contractor", phone = "unknown phone", email = "no email", website = "", gbpLink = "", message = "", type = "Audit" } = lead;
    
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const fallbackResult = getHeuristicOutreach(lead);
      return res.json(fallbackResult);
    }

    // Process with Live Gemini API
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const leadInfo = `
Type of Lead: ${type}
Business Name: ${businessName}
Owner/Sender Name: ${name}
Phone Number: ${phone}
Email Address: ${email}
Website: ${website || "No existing website listed"}
GBP Maps: ${gbpLink || "No maps listed"}
Message Details (if any): "${message}"
`;

    const promptText = `
You are the built-in LeadForge Local agency strategic outreach director.
We need an exact step-by-step outreach guide for a local trade contractor/business owner lead.
The lead details are:
${leadInfo}

Provide a comprehensive, copy-paste-ready strategic outreach blueprint designed to close this specific lead.
Write this in plain English without any complex technical jargon, so any business partner can read and execute it immediately.

Your response MUST be in beautiful Markdown and contain:
- "### 🤖 AI outreach blueprint & Playbook for ${businessName}"
- "#### 📞 Word-for-Word Call Script" (A realistic, friendly, non-pushy phone conversation guide with a helpful opening line). 
  CRITICAL: In the script, DO NOT tell the business owners how to fix things themselves off the rip. Instead, explain that there are three things a professional marketing team would do to correct those three errors (speed layout layout re-engineering, Google Maps advanced category/secondary tag optimization, and carrier-approved automated instant-response SMS fallback). Explicitly mention that: "We generally cost significantly less than a marketing team and provide the same service except that you have direct access to your marketing team."
- "#### ✉️ Outbound Email Draft" (A casual, fully-written, direct, and persuasive copy-paste business email including a customized Subject line).
  CRITICAL: In the email, DO NOT tell the business owners how to fix things themselves off the rip. Instead, specify the three things a professional marketing team would do to correct these errors, and explain that: "We generally cost significantly less than a marketing team and provide the same service except that you have direct access to your marketing team."
- "#### 💡 Immediate Actions" (2-3 very easy, sequential tasks like sending a friendly text message to their phone: ${phone}, printing documents, and timing recommendation).

Keep the tone encouraging, crisp, professional, and practical. Return only the beautiful Markdown output.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
    });

    return res.json({ status: "live_gemini", text: response.text });

  } catch (error: any) {
    console.error("Outreach API error:", error);
    const fallbackResult = getHeuristicOutreach(lead);
    return res.json({
      status: "fallback_heuristic",
      text: `### 🤖 AI Copy-and-Paste Outreach Guide (Optimized Template)

*(Note: Your customized Gemini API Key returned a rate-limit/quota error. We have automatically activated the Local Heuristic Advisor Engine to compile your playbook with zero downtime. Check Settings > Secrets inside the code window or your billing details on Google AI Studio to increase your live API limits.)*

${fallbackResult.text}`
    });
  }
});

// API: SEO Robots.txt route
app.get("/robots.txt", (req, res) => {
  const domain = process.env.APP_URL || "https://leadforgelocal.onrender.com";
  const cleanDomain = domain.replace(/\/$/, "");
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: ${cleanDomain}/sitemap.xml`);
});

// API: SEO Sitemap.xml route
app.get("/sitemap.xml", (req, res) => {
  const domain = process.env.APP_URL || "https://leadforgelocal.onrender.com";
  const cleanDomain = domain.replace(/\/$/, "");
  
  res.type("application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${cleanDomain}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${cleanDomain}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanDomain}/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanDomain}/pricing</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanDomain}/portfolio</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanDomain}/free-audit</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${cleanDomain}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${cleanDomain}/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${cleanDomain}/terms</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`);
});

import fs from "fs";

interface RouteMeta {
  title: string;
  description: string;
  image: string;
}

const routesMeta: Record<string, RouteMeta> = {
  "/": {
    title: "LeadForge Local | Conversion-Focused Local SEO & Web Design",
    description: "LeadForge Local helps plumbers, roofers, and local tradesmen get 2x more maps calls. Instant missed-call text back and profile ranking.",
    image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
  },
  "/about": {
    title: "About Us | LeadForge Local",
    description: "Meet Matthew & Heather Eisan, founders of LeadForge Local. We build lightning-fast contractor websites & maps SEO systems that grow your trades business.",
    image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
  },
  "/services": {
    title: "Our Local SEO & Tech Services | LeadForge Local",
    description: "Google Maps SEO, GBP 3-Pack optimization, missed call text back automation, and beautiful websites for local service companies.",
    image: "/src/assets/images/tradesman_worker_1781286632167.jpg"
  },
  "/pricing": {
    title: "Simple Pricing Plans | LeadForge Local",
    description: "Affordable flat-rate contractor local SEO, automated reviews setup, and custom landing pages. No hidden contracts.",
    image: "/src/assets/images/restaurant_owner_1781286617140.jpg"
  },
  "/portfolio": {
    title: "Our Work & Client Stories | LeadForge Local",
    description: "See how local trade companies, roofers, dentists, and restaurants scaled their map rankings and calls with LeadForge Local.",
    image: "/src/assets/images/restaurant_owner_1781286617140.jpg"
  },
  "/free-audit": {
    title: "Get a Free Google Business Scan | LeadForge Local",
    description: "Run our free automated 3-Point audit on your Google Maps listing. Identify slow mobile pages and text-back leaks instantly.",
    image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
  },
  "/contact": {
    title: "Contact LeadForge Local | North Fort Worth/Alliance Area (Serving DFW)",
    description: "Ready to dominate your city's local search packs? Reach out to Matthew & Heather Eisan today for custom lead growth services.",
    image: "/src/assets/images/tradesman_worker_1781286632167.jpg"
  },
  "/privacy": {
    title: "Privacy Policy | LeadForge Local",
    description: "Learn about how securely we sandboxed your lead information and respect your absolute user data privacy.",
    image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
  },
  "/terms": {
    title: "Terms of Service | LeadForge Local",
    description: "Our plain English terms. How we optimize Google profiles, landing pages, and lead automations for local businesses.",
    image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
  },
  "/admin": {
    title: "Command Center Login | LeadForge Admin",
    description: "Secure entry console for the LeadForge Local CRM and AI Playbook adviser cockpit. PIN-protected credentials lock.",
    image: "/src/assets/images/frustrated_laptop_1781286600083.jpg"
  }
};

// Vite Middleware for Dev/Prod static files
async function startServer() {
  let viteDevServer: any = null;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    viteDevServer = vite;
  }

  // Intercept specific navigation routes and server-render core meta tags 
  const routesList = ["/", "/about", "/services", "/pricing", "/portfolio", "/free-audit", "/contact", "/privacy", "/terms", "/admin"];

  app.get(routesList, async (req, res, next) => {
    const reqPath = req.path;
    const meta = routesMeta[reqPath] || routesMeta["/"];
    const domain = process.env.APP_URL || "https://leadforgelocal.onrender.com";
    const cleanDomain = domain.replace(/\/$/, "");
    const currentUrl = cleanDomain + reqPath;
    const origin = cleanDomain;
    const imageAbsUrl = meta.image.startsWith("http") ? meta.image : (origin + meta.image);

    let htmlPath = "";
    if (process.env.NODE_ENV !== "production") {
      htmlPath = path.join(process.cwd(), "index.html");
    } else {
      htmlPath = path.join(process.cwd(), "dist", "index.html");
    }

    try {
      let html = fs.readFileSync(htmlPath, "utf-8");

      // Replace Title
      const titleRegex = /<title>[^<]*<\/title>/;
      if (titleRegex.test(html)) {
        html = html.replace(titleRegex, `<title>${meta.title}</title>`);
      } else {
        html = html.replace("<head>", `<head>\n    <title>${meta.title}</title>`);
      }

      // Replace Description
      const descRegex = /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/;
      const newDescTag = `<meta name="description" content="${meta.description}" />`;
      if (descRegex.test(html)) {
        html = html.replace(descRegex, newDescTag);
      } else {
        html = html.replace("<head>", `<head>\n    ${newDescTag}`);
      }

      // Replace Canonical
      const canonRegex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/;
      const newCanonTag = `<link rel="canonical" href="${currentUrl}" />`;
      if (canonRegex.test(html)) {
        html = html.replace(canonRegex, newCanonTag);
      } else {
        html = html.replace("<head>", `<head>\n    ${newCanonTag}`);
      }

      // Open Graph & Twitter Card tags
      const socialTags = `
    <!-- Server-Rendered Social Meta Tags -->
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${currentUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${imageAbsUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${imageAbsUrl}" />
    `;

      html = html.replace("</head>", `${socialTags}\n  </head>`);

      if (process.env.NODE_ENV !== "production" && viteDevServer) {
        html = await viteDevServer.transformIndexHtml(req.originalUrl || reqPath, html);
      }

      return res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      console.error("HTML server-render error:", err);
      next(err);
    }
  });

  if (process.env.NODE_ENV !== "production") {
    app.use(viteDevServer.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[LeadForge Server] Running full-stack on http://0.0.0.0:${PORT}`);
  });
}

startServer();
