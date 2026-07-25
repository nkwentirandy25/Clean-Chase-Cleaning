"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, UserCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface StepItem {
  id: number;
  stepNum: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    id: 1,
    stepNum: "01",
    icon: <ClipboardList className="w-6 h-6 text-primary" />,
    title: "Request a Quote",
    description: "Tell us about your space. Select custom dates, timings, and specify your exact cleaning requirements in seconds."
  },
  {
    id: 2,
    stepNum: "02",
    icon: <UserCheck className="w-6 h-6 text-primary" />,
    title: "Get Matched",
    description: "We assign a certified, fully insured, and DBS-checked professional cleaner optimized for your specific tasks."
  },
  {
    id: 3,
    stepNum: "03",
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: "Meticulous Clean",
    description: "Our team arrives on time with eco-friendly cleaning supplies and executes our detailed checklists flawlessly."
  },
  {
    id: 4,
    stepNum: "04",
    icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
    title: "Walkthrough & Smile",
    description: "Inspect your freshly cleaned environment. We back every session with our 100% Satisfaction Guarantee."
  }
];

export function HowItWorks() {
  return (
    <section className="pt-8 pb-8 bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Process</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4"
          >
            How Clean Chase Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Our simple, streamlined 4-step workflow is designed to get your home, office, or commercial space spotless with zero hassle.
          </motion.p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          
          {/* Connector Line for Desktop */}
          <div className="absolute top-7 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 border-t border-dashed border-primary/45 -translate-y-1/2 z-0 pointer-events-none hidden lg:block" />

          {/* Grid Layout (4 steps side-by-side on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Circle Marker */}
                <div className="w-14 h-14 rounded-full border border-primary/20 bg-background flex items-center justify-center font-extrabold text-lg text-primary shadow-md z-10 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary select-none">
                  {step.stepNum}
                </div>

                {/* Card Container */}
                <div className="relative p-6 sm:p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 flex flex-col items-center text-center shadow-sm group-hover:shadow-md h-full w-full">
                  
                  {/* Glowing Hover Border */}
                  <div className="absolute inset-0 border border-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon Wrapper */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 group-hover:bg-primary/10 transition-colors duration-300 mb-5">
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
