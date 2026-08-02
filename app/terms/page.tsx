"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Clock, 
  CreditCard, 
  Key, 
  Award, 
  ShieldAlert, 
  HeartHandshake, 
  Scale, 
  Sparkles 
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      id: "scope",
      icon: <ClipboardList className="w-5 h-5 text-primary" />,
      title: "1. Scope of Service & Bookings",
      content: "We deliver professional cleaning solutions, including residential, commercial, industrial, agricultural, and store packages. Bookings are confirmed upon deposit payment or formal contract signature. The scope is strictly defined by the cleaning checklist agreed upon during booking."
    },
    {
      id: "cancellation",
      icon: <Clock className="w-5 h-5 text-emerald-500" />,
      title: "2. Cancellations & Rescheduling",
      content: "Coordination is essential to deliver perfect service. The following rules govern cancellations and site access:",
      list: [
        "Notice Period: We require a minimum of 24 hours' notice for any cancellation or rescheduling of an appointment.",
        "Late Fee: Cancellations made inside 24 hours of the scheduled service will be subject to a fee equal to 50% of the cleaning quote.",
        "Inclement Weather: In the event of severe weather, we reserve the right to reschedule services for safety reasons."
      ]
    },
    {
      id: "billing",
      icon: <CreditCard className="w-5 h-5 text-indigo-500" />,
      title: "3. Payments & Billing Terms",
      content: "All quotes provided are estimations based on the information supplied during booking. We reserve the right to adjust rates upon on-site walkthroughs if structural conditions differ significantly. Payment terms are as follows:",
      list: [
        "Invoicing: Invoices are sent upon service completion and must be cleared within 7 days of the invoice date.",
        "Late Fees: We reserve the right to apply late payment charges and interest under active commercial debt recovery guidelines.",
        "Payment Methods: Payments can be securely completed via bank transfer (BACS) or our online credit/debit card portal."
      ]
    },
    {
      id: "access",
      icon: <Key className="w-5 h-5 text-rose-500" />,
      title: "4. Client Cooperation & Access",
      content: "Clients must provide safe access to the premises at the scheduled time (via keys, lockboxes, or on-site personnel). Access to running water and electricity is mandatory to carry out the services. Lockouts are treated as late cancellations."
    },
    {
      id: "guarantee",
      icon: <Award className="w-5 h-5 text-violet-500" />,
      title: "5. Satisfaction Guarantee & Re-Cleans",
      content: "We stand behind the quality of our cleans. If you are unsatisfied, contact us within 24 hours of service completion. We will arrange a team to re-inspect and re-clean any disputed areas at no additional cost. Refunds are not issued before a re-clean attempt."
    },
    {
      id: "liability",
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
      title: "6. Liability Boundaries & Damage",
      content: "While we operate under full Public and Employers Liability Insurance, we are not liable for pre-existing damage, wear and tear, or unstable fixtures. Fragile items must be secured or disclosed to our team prior to cleaning."
    },
    {
      id: "environment",
      icon: <HeartHandshake className="w-5 h-5 text-cyan-500" />,
      title: "7. Safe Working Environment",
      content: "Our staff holds health & safety certifications (including COSHH awareness, Risk Assessment, and heights training). We reserve the right to withdraw our team if site conditions present safety hazards, severe bio-contamination, or structural risks."
    },
    {
      id: "law",
      icon: <Scale className="w-5 h-5 text-blue-500" />,
      title: "8. Governing Law & Contact Details",
      content: "These terms are governed by the laws of England and Wales. For questions or legal notifications, contact our operational office:",
      list: [
        "Company: Clean Chase Cleaning Ltd",
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
            <span>Operational Guidelines</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Terms of Service
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
                  Have questions about these terms?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Contact our operations team for any agreement clarifications.
                </p>
              </div>
              <a
                href="mailto:info@cleanchasecleaning.co.uk"
                className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98 shrink-0"
              >
                Contact Operations
              </a>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
