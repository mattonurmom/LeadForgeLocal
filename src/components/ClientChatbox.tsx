import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, Bot, Zap, ArrowRight, Clipboard, ChevronRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  isHeuristic?: boolean;
}

import { ChatSessionLead } from "../types";

interface ClientChatboxProps {
  setTab: (tab: string) => void;
  currentTab: string;
  onSyncChatSession?: (session: ChatSessionLead) => void;
}

export default function ClientChatbox({ setTab, currentTab, onSyncChatSession }: ClientChatboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState<string>(() => {
    const savedId = sessionStorage.getItem("leadforge_client_chat_session_id");
    if (savedId) return savedId;
    const newId = "chat-" + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem("leadforge_client_chat_session_id", newId);
    return newId;
  });
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = sessionStorage.getItem("leadforge_client_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Session storage parse failed", e);
      }
    }
    return [
      {
        id: "welcome",
        sender: "bot",
        text: "### 👋 Welcome to LeadForge Local!\n\nI am your friendly client growth companion here to help you understand our services and how we can grow your local business!\n\nWhat type of business do you run (e.g., plumbing, roofing, landscaping, AC/HVAC, dental)? Let me know and I will share exactly how we can help you double your jobs!"
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem("leadforge_client_messages", JSON.stringify(messages));
    if (isOpen) {
      scrollToBottom();
      setIsPulsing(false);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = "msg-" + Math.random().toString(36).substring(2, 9);
    const userMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Prepare previous history context (up to 8 rounds)
    const historyParam = messages.map(m => ({
      sender: m.sender,
      text: m.text
    }));

    const updatedMessages: { sender: "user" | "bot"; text: string; timestamp: string }[] = [
      ...messages.map(m => ({ sender: m.sender as "user" | "bot", text: m.text, timestamp: new Date().toISOString() })),
      { sender: "user" as const, text: textToSend, timestamp: new Date().toISOString() }
    ];

    try {
      const response = await fetch("/api/client-ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyParam,
          pageContext: currentTab
        })
      });

      if (!response.ok) {
        throw new Error("Local endpoint responded with an error");
      }

      const data = await response.json();
      const botMsgId = "msg-" + Math.random().toString(36).substring(2, 9);
      const botMsgText = data.text;

      setMessages(prev => [...prev, {
        id: botMsgId,
        sender: "bot",
        text: botMsgText,
        isHeuristic: data.status === "optimized_heuristic" || data.status === "fallback_heuristic"
      }]);

      const fullMessages = [
        ...updatedMessages,
        { sender: "bot" as const, text: botMsgText, timestamp: new Date().toISOString() }
      ];

      const chatLead: ChatSessionLead = {
        id: sessionId,
        startedAt: sessionStorage.getItem("leadforge_client_chat_started_at") || (() => {
          const now = new Date().toISOString();
          sessionStorage.setItem("leadforge_client_chat_started_at", now);
          return now;
        })(),
        lastActive: new Date().toISOString(),
        messagesCount: fullMessages.length,
        businessContext: data.businessContext || "Local Business",
        summaryNotes: data.summaryNotes || "Discussions logged.",
        leadScore: data.leadScore || "Warm",
        messages: fullMessages
      };

      if (onSyncChatSession) {
        onSyncChatSession(chatLead);
      }
    } catch (err) {
      console.error("Failed to query API client-chat endpoint:", err);
      // Fallback locally
      const botMsgId = "msg-" + Math.random().toString(36).substring(2, 9);
      const botMsgText = "### 👋 Connection Active\n\nI noticed a small latency on our main gateway. Let me share how we can support you:\n- **Starter Plan ($299)**: Google Business optimizations & a beautiful 1-page site.\n- **Premium Plan ($499/mo)**: Full website, GBP posting updates, and **Missed Call Auto-Text Back**.\n\nCould we run a **Free 3-Point Online Visibility Review** to inspect your Google Maps ranking in under a minute?";
      setMessages(prev => [...prev, {
        id: botMsgId,
        sender: "bot",
        text: botMsgText,
        isHeuristic: true
      }]);

      const fullMessages = [
        ...updatedMessages,
        { sender: "bot" as const, text: botMsgText, timestamp: new Date().toISOString() }
      ];

      const chatLead: ChatSessionLead = {
        id: sessionId,
        startedAt: sessionStorage.getItem("leadforge_client_chat_started_at") || (() => {
          const now = new Date().toISOString();
          sessionStorage.setItem("leadforge_client_chat_started_at", now);
          return now;
        })(),
        lastActive: new Date().toISOString(),
        messagesCount: fullMessages.length,
        businessContext: "Visitor Session",
        summaryNotes: "### Heuristic Logging\n- Client inquired about basic setups.",
        leadScore: "Warm",
        messages: fullMessages
      };

      if (onSyncChatSession) {
        onSyncChatSession(chatLead);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputText);
    }
  };

  // Predefined interactive chips
  const chips = [
    { label: "💰 Starter $299 Setup", query: "Tell me about the $299 Starter package" },
    { label: "📞 Missed Call Text-back", query: "What is Automated Missed Call Text Back?" },
    { label: "📍 Rank Google Maps", query: "How can Google Maps 3-Pack SEO optimization help me grow?" },
    { label: "📊 Online Visibility Review", query: "How do I request a Free 3-Point Business Scan?" }
  ];

  // Client parsing to replace markings with rich styled text
  const parseMarkdownText = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let cleanLine = line;

      // Render headings
      if (cleanLine.startsWith("###")) {
        const headingText = cleanLine.replace("###", "").trim();
        return (
          <h4 key={idx} className="text-xs font-bold text-sky-400 mt-2 mb-1 flex items-center gap-1 select-none leading-tight font-display uppercase tracking-wider">
            {headingText}
          </h4>
        );
      }

      if (cleanLine.startsWith("####")) {
        const headingText = cleanLine.replace("####", "").trim();
        return (
          <h5 key={idx} className="text-[11px] font-extrabold text-blue-450 mt-1.5 mb-0.5 flex items-center leading-tight">
            {headingText}
          </h5>
        );
      }

      // Render bullet items
      const isBullet = cleanLine.trim().startsWith("- ") || cleanLine.trim().startsWith("* ");
      if (isBullet) {
        cleanLine = cleanLine.trim().replace(/^[-*]\s+/, "");
      }

      // bold parsing
      const parts: React.ReactNode[] = [];
      let currentText = cleanLine;
      const regex = /\*\*([^*]+)\*\*/g;
      let match;
      let lastIndex = 0;

      while ((match = regex.exec(currentText)) !== null) {
        if (match.index > lastIndex) {
          parts.push(currentText.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-extrabold text-white text-semibold">
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < currentText.length) {
        parts.push(currentText.substring(lastIndex));
      }

      if (isBullet) {
        return (
          <div key={idx} className="flex gap-2 items-start text-xs text-slate-300 pl-1 py-0.5 leading-relaxed">
            <span className="text-sky-450 text-[9px] select-none mt-0.5">•</span>
            <span className="flex-1 text-slate-300 text-[11.5px] font-sans">{parts.length > 0 ? parts : cleanLine}</span>
          </div>
        );
      }

      const renderedText = parts.length > 0 ? parts : cleanLine;
      const isEmpty = cleanLine.trim() === "";

      return (
        <p key={idx} className={`text-slate-300 text-[11.5px] font-sans leading-relaxed ${isEmpty ? "h-2" : "min-h-[5px]"}`}>
          {renderedText}
        </p>
      );
    });
  };

  // Helper inside messages parsing: if bot response details free audit or contact forms, show dynamic CTA links!
  const renderInlineCtas = (msgText: string) => {
    const textLower = msgText.toLowerCase();
    const hasAuditWord = textLower.includes("audit") || textLower.includes("scan") || textLower.includes("diagnostic");
    const hasContactWord = textLower.includes("contact") || textLower.includes("book") || textLower.includes("consult") || textLower.includes("pricing") || textLower.includes("setup");
    
    return (
      <div className="mt-3.5 space-y-2 pt-2 border-t border-slate-900/60 flex flex-col">
        {hasAuditWord && (
          <button
            onClick={() => {
              setTab("audit");
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full text-left bg-blue-900/40 hover:bg-blue-900/70 border border-blue-500/30 hover:border-blue-500/50 rounded-xl p-3 flex items-center justify-between transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-500/20 p-2 rounded-lg text-sky-400 group-hover:bg-blue-500/30 group-hover:text-blue-200 transition-colors">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="text-left">
                <span className="block text-[11px] font-bold text-white leading-tight">Run Free Visibility Review</span>
                <span className="block text-[9.5px] text-slate-400 font-sans mt-0.5">Scans maps rankings & phone texts instantly</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {hasContactWord && (
          <button
            onClick={() => {
              setTab("contact");
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full text-left bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl p-3 flex items-center justify-between transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="bg-slate-850 p-2 rounded-lg text-sky-400 group-hover:bg-slate-800 transition-colors">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-left">
                <span className="block text-[11px] font-bold text-white leading-tight">Send Consultation Message</span>
                <span className="block text-[9.5px] text-slate-400 font-sans mt-0.5">Let's book a friendly 10-minute callback</span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none" id="visitor-ai-chatbox-system">
      {/* PING INBOUND CHAT CHIP */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.85 }}
            className="mb-3.5 mr-1"
          >
            <div className="relative pointer-events-auto bg-slate-900 hover:bg-slate-850 border border-slate-800 p-3.5 pr-4 rounded-2xl shadow-xl flex items-center gap-3 cursor-pointer select-none group max-w-sm transition-all duration-300"
                 onClick={() => setIsOpen(true)}>
              {isPulsing && (
                <div className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
                </div>
              )}
              <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-blue-500/20">
                <Bot className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5 pr-2">
                <h5 className="text-[11px] font-extrabold text-white uppercase tracking-wider block font-sans">LeadForge Assistant</h5>
                <p className="text-[10px] text-slate-400 font-sans font-medium line-clamp-1 leading-normal max-w-[170px]">
                  Online • Click to chat about Map SEO and Missed Call systems!
                </p>
              </div>
              <div className="bg-slate-950 p-1 rounded-md border border-slate-800 text-slate-400 group-hover:text-white transition-colors">
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING SPARK BUBBLE TRIGGER */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 outline-none select-none cursor-pointer ${
            isOpen 
              ? "bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 hover:text-white"
              : "bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white hover:scale-105 shadow-blue-500/25"
          }`}
          aria-label="Toggle AI Assistance"
        >
          {isOpen ? <X className="h-5.5 w-5.5 animate-spin-once" /> : <MessageSquare className="h-5.5 w-5.5" />}
        </button>
      </div>

      {/* CHAT WINDOW SLIDEOUT COMPONENT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-16 right-0 mb-2 w-[380px] max-w-[94vw] h-[550px] max-h-[80vh] bg-slate-950 rounded-3xl border border-slate-850 shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
          >
            {/* Header: Core Agent info */}
            <div className="bg-slate-900/90 border-b border-slate-850 p-4.5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/20 text-sky-400 border border-blue-500/20 flex items-center justify-center">
                    <Bot className="h-5.5 w-5.5" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-slate-950"></div>
                </div>
                <div className="text-left space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-extrabold text-[12.5px] text-white">LeadForge Concierge</span>
                    <span className="bg-blue-600/20 text-sky-400 border border-blue-500/20 rounded px-1 py-[1.5px] text-[8.5px] font-bold uppercase font-mono tracking-wider select-none">
                      Active
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans block">
                    Our 24/7 client expansion advisor
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-850 text-slate-450 hover:text-slate-300 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation Flow Timeline */}
            <div className="flex-1 overflow-y-auto p-4.5 space-y-4 bg-slate-950/40 select-text">
              {messages.map((msg, index) => {
                const isBot = msg.sender === "bot";
                return (
                  <div key={msg.id || index} className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[85%] flex gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
                      {isBot && (
                        <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center flex-shrink-0 mt-1 select-none">
                          <Bot className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <div className="space-y-1 text-left">
                        <div
                          className={`p-4 rounded-2xl border transition-all ${
                            isBot
                              ? "bg-slate-900/60 border-slate-850/70 text-slate-100 rounded-tl-sm shadow-md"
                              : "bg-blue-600 border-blue-500 text-white rounded-tr-sm shadow-md shadow-blue-500/5"
                          }`}
                        >
                          <div className="space-y-1.5">
                            {isBot ? parseMarkdownText(msg.text) : (
                              <p className="text-xs text-indigo-50 font-sans leading-relaxed">{msg.text}</p>
                            )}
                          </div>
                          
                          {/* Inject inline CTA button nodes based on keywords */}
                          {isBot && renderInlineCtas(msg.text)}
                        </div>

                        {/* Status detail markers */}
                        {isBot && (
                          <div className="flex items-center gap-1.5 pl-1 select-none">
                            <span className="text-[9px] font-mono font-medium text-slate-500 uppercase">
                              {msg.isHeuristic ? "Verified Playbook" : "Live Intelligent Match"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loader Typing bubble animation */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] flex gap-3">
                    <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="bg-slate-900/50 border border-slate-850/60 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-md">
                      <span className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* PRE-DEFINED SUGGESTION PILLS SCROLL */}
            <div className="px-4.5 py-2.5 bg-slate-900/35 border-t border-slate-900 select-none">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
                {chips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(chip.query)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-slate-800 text-[10px] font-bold text-slate-200 hover:text-white transition-all whitespace-nowrap cursor-pointer flex-shrink-0"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom sticky inputs */}
            <div className="bg-slate-900 border-t border-slate-850 p-3.5 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Ask and learn about our services..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 transition-colors disabled:opacity-40"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600 select-none font-mono">
                  Enter
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isLoading}
                className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-850 text-white disabled:text-slate-500 font-bold transition-all flex items-center justify-center cursor-pointer shadow-md disabled:shadow-none"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
