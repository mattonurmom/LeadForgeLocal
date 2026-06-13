import React, { useState } from "react";
import { ContactLead } from "../types";
import { 
  Mail, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck, 
  HelpCircle, MessageSquare, Clock, Building 
} from "lucide-react";
import { trackContactFormSubmission } from "../utils/analytics";

interface ContactViewProps {
  onAddContactLead: (lead: Omit<ContactLead, "id" | "submittedAt">) => void;
}

export default function ContactView({ onAddContactLead }: ContactViewProps) {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!formData.name || !formData.email || !formData.phone) {
      const errorMsg = "Name, Email, and Phone are required.";
      setErrorMessage(errorMsg);
      console.warn("[LeadForge Contact Form] Form validation failure:", errorMsg);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate database submission and dispatch tracking events
      setTimeout(() => {
        onAddContactLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          message: formData.message
        });

        // Dispatch GA4 event
        trackContactFormSubmission(formData.businessName);

        setIsSubmitting(false);
        setIsCompleted(true);
        window.scrollTo({ top: 120, behavior: "smooth" });
      }, 1200);
    } catch (err: any) {
      console.error("[LeadForge Contact Form] Submission error details:", err);
      setErrorMessage("A system timeout occurred. Please call details to support directly at (469) 751-7153.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16 animate-fadeIn text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Action Call Booking</span>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Book A Strategy Consultation Call
          </h1>
          <p className="text-sm text-slate-305 leading-relaxed">
            Have a question about Google Map Pack optimization, custom trade websites, or SMS missed call text backs? Drop our division specialists a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Direct agency info columns */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-3xl p-8 border border-slate-800 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-6">
              
              <div>
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block mb-1">Local Growth Service</span>
                <h3 className="font-display font-extrabold text-white text-xl">LeadForge Local HQ</h3>
                <span className="block text-slate-400 text-xs mt-0.5">Helping small businesses improve visibility and lead generation.</span>
              </div>

              <div className="space-y-4 text-xs font-sans text-slate-300">
                
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-xl text-sky-400 mt-0.5">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Direct Phone Lines</span>
                    <strong className="text-white block">Heather: (469) 751-7153</strong>
                    <strong className="text-white block">Matthew: (469) 340-2871</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-xl text-sky-400 mt-0.5">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Corporate Mail</span>
                    <strong className="text-white">support@leadforgelocal.com</strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-xl text-sky-400 mt-0.5">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">Location</span>
                    <strong className="text-white block">North Fort Worth/Alliance Area (Serving DFW)</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Matthew & Heather Eisan, Owners</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Micro details */}
            <div className="pt-6 border-t border-slate-900 mt-6 text-[10.5px] text-slate-400 space-y-1">
              <span className="block font-bold">⏰ Operating Hours:</span>
              <span className="block">Open 24/7 • Always Available</span>
              <span className="block text-[9.5px]">Online form submissions alerts trigger 24/7.</span>
            </div>

          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-slate-905 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg text-slate-100">
            
            {isCompleted ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-8" id="contact-success-panel">
                <div className="h-12 w-12 rounded-full bg-green-950/50 text-green-400 border border-green-800/60 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                </div>
                <h3 className="font-display font-extrabold text-white text-lg">Request Received!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                  We have successfully registered your call request in our LeadForge database. An outreach specialist will reach back quickly.
                </p>
                <button
                  onClick={() => {
                    setFormData({ name: "", email: "", phone: "", businessName: "", message: "" });
                    setIsCompleted(false);
                  }}
                  className="rounded-xl border border-slate-800 hover:bg-slate-900 px-5 py-2.5 text-xs text-white font-bold transition-all cursor-pointer"
                >
                  Post Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <h3 className="font-display font-extrabold text-white text-base mb-2">Book a Free Call</h3>

                {errorMessage && (
                  <div className="bg-rose-950/45 border border-rose-900/65 text-rose-250 p-3 rounded-xl text-xs flex items-center gap-2 text-rose-350 font-medium">
                    <span>⚠️ {errorMessage}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g., Markus Clara"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Email Address <span className="text-rose-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g., mark@myservice.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Phone Number <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="555-0199"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">Your Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g., Summit HVAC Service"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Describe Your Business / Goals</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl text-xs px-3.5 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
                    placeholder="e.g., We are a plumbing company looking to improve our local visibility and save missed calls..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-extrabold text-xs tracking-wider py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                      isSubmitting ? "opacity-75" : ""
                    }`}
                    id="submit-contact-form-btn"
                  >
                    {isSubmitting ? (
                      <span>Booking...</span>
                    ) : (
                      <>
                        <span>Book a Free Call</span>
                        <ArrowRight className="h-4.5 w-4.5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Your info is safe. We never share or sell your contact details.</span>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
