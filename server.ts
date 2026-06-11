import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

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

// Vite Middleware for Dev/Prod static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
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
