"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Lock, 
  Share2, 
  Key, 
  FileCheck, 
  Globe, 
  Mail, 
  Sparkles 
} from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      id: "scope",
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: "1. Introduction & Scope",
      content: "Clean Chase Cleaning (\"we,\" \"our,\" or \"us\") is committed to protecting your privacy. This Privacy Policy details our commitment and scope regarding the processing of personal data for individuals accessing our website or hiring our professional residential, commercial, agricultural, and store cleaning services across the United Kingdom. We operate in full alignment with active data safety directives, including the UK General Data Protection Regulation (UK GDPR), to keep your information secure."
    },
    {
      id: "collection",
      icon: <Eye className="w-5 h-5 text-emerald-500" />,
      title: "2. Information We Collect",
      content: "We gather details required to carry out our cleaning proposals and schedule staff. This includes:",
      list: [
        "Personal Details: Full name, active phone number, email address, and service address provided voluntarily through our quote and contact forms.",
        "Access Credentials: Gate codes, lockbox sequences, and custom instructions provided to enable cleaning scheduling and secure building entry.",
        "Technical Logs: IP addresses, browser configurations, operating systems, and session cookies collected automatically as you navigate our platform."
      ]
    },
    {
      id: "usage",
      icon: <Lock className="w-5 h-5 text-indigo-500" />,
      title: "3. How We Use Your Information",
      content: "We process your collected data under legal bases to serve your cleaning operations. This includes:",
      list: [
        "Executing cleaning agreements: Generating quotes, building customized cleaning checklists, and managing cleaner shifts.",
        "Billing & Invoices: Secure card processing systems handling billing records, processing invoices, and recovering outstanding balances.",
        "Communications: Sending service notifications, schedule confirmations, or responding to client support enquiries."
      ]
    },
    {
      id: "sharing",
      icon: <Share2 className="w-5 h-5 text-rose-500" />,
      title: "4. Information Sharing & Third Parties",
      content: "We do not sell, lease, or distribute your personal data. We share details only with verified third parties necessary to perform our services:",
      list: [
        "Payment Gateways: Secure card processing systems handling billing records.",
        "Vetted Employees: Background-checked cleaning team members assigned to clean your specific premises.",
        "Legal Authorities: Where legally mandated under UK regulations or to protect safety, assets, and liability insurance rights."
      ]
    },
    {
      id: "keyholding",
      icon: <Key className="w-5 h-5 text-violet-500" />,
      title: "5. Key Holding & Security Standards",
      content: "Security of your premises is our primary focus. For clients utilizing our key-holding services, we maintain strict protection measures:",
      list: [
        "Encryption: Access codes, key numbers, and alarm sequences are encrypted in our secure management database.",
        "Staff Vetting: Keys are only handled by DBS-checked, fully insured personnel assigned to your property.",
        "Physical Safety: Keys are logged out on service days and returned to secure lockboxes immediately upon shift completion."
      ]
    },
    {
      id: "gdpr",
      icon: <FileCheck className="w-5 h-5 text-amber-500" />,
      title: "6. Your Data Rights (GDPR)",
      content: "Under the UK GDPR and the Data Protection Act 2018, you possess key rights over your personal data:",
      list: [
        "Right of Access: Request copies of all personal records we hold for your account.",
        "Right to Rectification: Correct any incomplete or outdated details in our database.",
        "Right to Erasure: Request permanent deletion of your customer record (subject to statutory audit or invoice retention requirements)."
      ]
    },
    {
      id: "cookies",
      icon: <Globe className="w-5 h-5 text-cyan-500" />,
      title: "7. Cookies & Web Tracking",
      content: "Our platform uses cookies and tracking technologies to improve visitor experience. Cookies help us keep your preferences, analyze web traffic, and secure your session. You can manage or disable cookies inside your browser preferences, though some interactive elements might not operate as intended."
    },
    {
      id: "contact",
      icon: <Mail className="w-5 h-5 text-blue-500" />,
      title: "8. Data Protection Contact",
      content: "If you wish to execute any data rights, submit compliance questions, or request key-holding logs, contact our Data Protection Officer:",
      list: [
        "Officer: Compliance Department",
        "Email: info@cleanchasecleaning.co.uk",
        "Address: 8b Coppice Road, Wolverhampton"
      ]
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pt-10 md:pt-12 pb-20 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legal Directives</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground uppercase tracking-widest font-bold"
          >
            Last Updated: July 2026
          </motion.p>
        </div>

        {/* Content Body */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            {sections.map((section) => (
              <div key={section.id} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-border/40 pb-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {section.content}
                </p>

                {section.list && (
                  <ul className="list-disc list-inside pl-2 space-y-3.5">
                    {section.list.map((item, index) => {
                      const parts = item.split(":");
                      if (parts.length > 1) {
                        return (
                          <li key={index} className="text-muted-foreground text-sm sm:text-base leading-relaxed align-top">
                            <span className="font-bold text-foreground">{parts[0]}:</span>
                            {parts.slice(1).join(":")}
                          </li>
                        );
                      }
                      return (
                        <li key={index} className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}

            {/* Support section */}
            <div className="bg-card border border-border p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 shadow-sm">
              <div>
                <h3 className="font-bold text-base text-foreground mb-1">
                  Have questions about your data privacy?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Our compliance officer is ready to address your data queries.
                </p>
              </div>
              <a
                href="mailto:info@cleanchasecleaning.co.uk"
                className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98 shrink-0"
              >
                Contact Officer
              </a>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
