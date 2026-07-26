"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem {
  id: number;
  stepNum: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

const steps: StepItem[] = [
  {
    id: 1,
    stepNum: "01",
    icon: <FileText className="w-5 h-5" />,
    title: "Request a Quote",
    description: "Fill out our quick online quote request or give us a call. We'll provide a transparent, custom estimate tailored to your cleaning needs.",
    colorClass: "bg-primary/5 dark:bg-primary/10 text-primary border border-primary/10 dark:border-primary/20"
  },
  {
    id: 2,
    stepNum: "02",
    icon: <Calendar className="w-5 h-5" />,
    title: "Schedule Your Service",
    description: "Choose a convenient date and time. Our vetted, professional cleaning team will arrive fully equipped and ready to refresh your space.",
    colorClass: "bg-primary/5 dark:bg-primary/10 text-primary border border-primary/10 dark:border-primary/20"
  },
  {
    id: 3,
    stepNum: "03",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Enjoy a Spotless Space",
    description: "Walk in, take a breath, and enjoy the absolute shine. We follow up to ensure you're 100% satisfied with our meticulous cleaning.",
    colorClass: "bg-primary/5 dark:bg-primary/10 text-primary border border-primary/10 dark:border-primary/20"
  }
];

export function HowItWorks() {
  return (
    <section className="pt-20 pb-20 bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

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
            <span>Simple 3-Step Process</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            How It <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Works</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Getting your home or commercial space cleaned has never been easier. Follow our straightforward three-step method.
          </motion.p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-start group"
            >
              {/* Top Row: Icon, Dashed Lines, and Number */}
              <div className="flex items-center w-full mb-6 gap-3">
                {/* Icon Wrapper */}
                <div className={cn(
                  "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 shadow-sm",
                  step.colorClass
                )}>
                  {step.icon}
                </div>

                {/* Left Dashed Connector Line */}
                <div className="flex-1 border-t-2 border-dashed border-slate-300/80 dark:border-slate-700/80" />

                {/* Step Number */}
                <div className={cn(
                  "text-5xl lg:text-6xl font-black tracking-tighter select-none transition-colors duration-300",
                  "text-slate-200/90 dark:text-slate-800/70 group-hover:text-primary/10"
                )}>
                  {step.stepNum}
                </div>

                {/* Right Dashed Connector Line (Only for steps 1 and 2) */}
                {idx < 2 && (
                  <div className="flex-1 border-t-2 border-dashed border-slate-300/80 dark:border-slate-700/80" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                {step.title}
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
