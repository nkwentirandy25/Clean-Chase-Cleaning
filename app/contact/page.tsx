"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactInfo = [
  {
    id: "phone",
    icon: <Phone className="w-6 h-6 text-primary" />,
    title: "Call Us Anytime",
    value: "+447348140317",
    description: "Speak directly with our expert team for bookings or queries.",
    actionText: "Call now",
    href: "tel:+447348140317"
  },
  {
    id: "email",
    icon: <Mail className="w-6 h-6 text-emerald-500" />,
    title: "Email Support",
    value: "info@cleanchasecleaning.co.uk",
    description: "Send us your questions or documents and we will reply within 24 hours.",
    actionText: "Email us",
    href: "mailto:info@cleanchasecleaning.co.uk"
  },
  {
    id: "location",
    icon: <MapPin className="w-6 h-6 text-indigo-500" />,
    title: "Service Location",
    value: "8b Coppice Road, Wolverhampton",
    description: "Providing high-standard commercial and residential services across the region.",
    actionText: "View coverage",
    href: "#coverage"
  }
];

const servicesList = [
  "Office Cleaning",
  "Business Site Cleaning",
  "Student & Young Professionals Accommodation Cleaning",
  "Pubs, Nightclubs & Restaurants Cleaning",
  "End of Tenancy House Cleaning",
  "Commercial Kitchen Cleaning",
  "Health Care Facilities Cleaning",
  "Commercial Kitchen Equipment Cleaning",
  "School Cleaning",
  "After Builders Cleaning",
  "Industrial & Warehouse Cleaning",
  "Transport & Fleet Cleaning",
  "Carpet & Upholstery Cleaning",
  "Agricultural Cleaning",
  "Store Cleaning",
  "Other / Custom Package"
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string | null) => {
    if (value) {
      setFormData((prev) => ({ ...prev, service: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email. Please try again.");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen pt-10 md:pt-12 pb-20 relative overflow-hidden">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6"
          >
            Let's Start a Conversation
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Have a question, need a cleaning proposal, or looking to schedule a custom walkthrough? Get in touch today. Our expert support team is ready to assist you.
          </motion.p>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {contactInfo.map((info, idx) => (
            <motion.div
              key={info.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden group rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Glowing Card Border */}
              <div className="absolute inset-0 border border-primary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex flex-col gap-3">
                {/* Header: Icon + Title side-by-side */}
                <div className="flex items-center gap-3">
                  {/* Icon Container */}
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/5 shrink-0">
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {info.icon}
                    </div>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-foreground tracking-tight">
                    {info.title}
                  </h3>
                </div>
                
                <div>
                  <p className="font-bold text-sm sm:text-base text-primary tracking-tight break-all mb-1.5">
                    {info.value}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {info.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 w-full">
                <a
                  href={info.href}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors duration-200"
                >
                  <span>{info.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12 relative animate-in fade-in-0 duration-300"
          >
            {/* Glowing Orb */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8 text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-2">
                      Send a Message
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      Fill out the form below and an expert representative will review your cleaning requirements.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Row 1: Full Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-bold text-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    {/* Row 2: Email & Phone (Side-by-side) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold text-foreground">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm font-bold text-foreground">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+44 (0) 7911 123456"
                          className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Row 3: Shadcn Select Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className="text-sm font-bold text-foreground">
                        Service You Need
                      </label>
                      <Select
                        value={formData.service}
                        onValueChange={handleServiceChange}
                      >
                        <SelectTrigger
                          className="w-full !h-12 px-4 rounded-xl border border-border bg-background text-sm font-medium text-foreground flex items-center justify-between focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent"
                          id="service"
                        >
                          <SelectValue placeholder="Select a service..." />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border text-popover-foreground rounded-xl shadow-lg z-50">
                          <SelectGroup>
                            <SelectLabel className="font-bold text-xs">Services List</SelectLabel>
                            {servicesList.map((service, index) => (
                              <SelectItem key={index} value={service} className="hover:bg-secondary cursor-pointer">
                                {service}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Row 4: Details / Question Textarea */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-bold text-foreground">
                        Details / Question
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Provide details about your required clean (e.g. square footage, special instructions, dates)..."
                        className="w-full p-4 rounded-xl border border-border bg-background text-sm font-medium text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="text-red-500 font-medium text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/10 hover:shadow-primary/20 active:scale-98 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                            <span>Sending Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="py-12 text-center flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>

                  <div className="max-w-md">
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-3">
                      Enquiry Sent!
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      Thank you for contacting Clean Chase. Your message has been successfully transmitted, and an account representative will get in touch with you shortly.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-lg border border-border hover:bg-muted font-bold text-sm text-foreground transition-all cursor-pointer"
                  >
                    <span>Send another message</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
