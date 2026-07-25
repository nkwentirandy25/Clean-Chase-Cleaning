"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "What is included in a deep clean versus a regular clean?",
    answer: "A regular clean covers routine dusting, vacuuming, mopping, and surface sanitation in bathrooms and kitchens. A deep clean targets accumulated grime, limescale buildup, cleaning inside appliances (like ovens/microwaves), baseboards, door frames, deep tile scrubbing, and behind major furniture. Deep cleaning is ideal for first-time visits or seasonal updates."
  },
  {
    id: 2,
    question: "Are your cleaning products safe for pets and children?",
    answer: "Yes, absolutely! We prioritize your family's health and safety. We use eco-friendly, non-toxic, and biodegradable cleaning products that are USDA-certified green. They leave zero toxic residues, fumes, or harsh chemical smells behind, making them 100% safe for children, dogs, cats, and other household pets."
  },
  {
    id: 3,
    question: "Do I need to be home during the cleaning session?",
    answer: "No, you do not need to be home. Most of our clients prefer to provide access via a key lockbox, building reception, or numeric keypad code. Rest assured that all of our cleaners undergo rigorous identity screening, DBS background checks, and professional training. We are fully insured for your complete peace of mind."
  },
  {
    id: 4,
    question: "How do you vet and screen your cleaners?",
    answer: "Trust and security are our highest priorities. Every candidate goes through a multi-stage vetting process: face-to-face interviews, complete employment references checks, address verification, and an official DBS (criminal history) background check. Only after passing these filters do they undergo practical training to meet our meticulous cleaning standards."
  },
  {
    id: 5,
    question: "What happens if I need to cancel or reschedule?",
    answer: "We offer maximum flexibility. You can reschedule or cancel any session free of charge up to 24 hours before your scheduled appointment. Cancellations made within less than 24 hours notice may incur a 50% cancellation fee to compensate our cleaners for their reserved schedule."
  },
  {
    id: 6,
    question: "What is your 100% Satisfaction Guarantee?",
    answer: "We stand behind the quality of our work. If you are not entirely satisfied with any part of our service, notify us within 24 hours of completion. We will immediately dispatch a team back to your property to re-clean the specific areas to your complete satisfaction—completely free of charge."
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="pt-8 pb-16 bg-slate-50/50 dark:bg-slate-950/20 border-t border-border/40 relative overflow-hidden select-none">
      {/* Decorative Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Support</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Got questions about our services? Find quick answers below, or contact our support team.
          </motion.p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-355 overflow-hidden ${
                  isOpen 
                    ? "bg-card border-primary/30 shadow-md" 
                    : "bg-card/50 border-border hover:bg-card/90"
                }`}
              >
                {/* Accordion Trigger button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className={`w-5.5 h-5.5 shrink-0 transition-colors duration-200 ${
                      isOpen ? "text-primary" : "text-muted-foreground"
                    }`} />
                    <span className="font-bold text-foreground text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Rotating Arrow Indicator */}
                  <div className={`w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-primary/10 text-primary" : ""
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5px]" />
                  </div>
                </button>

                {/* Animated Dropdown Height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-muted-foreground leading-relaxed pl-[44px] sm:pl-[48px] border-t border-border/40 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
