"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Award, Clock, Star, Sparkles, CheckCircle2 } from "lucide-react";

interface FeatureItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "100% Insured & Trusted",
    description: "Your peace of mind is our priority. Every cleaner on our team undergoes comprehensive background checks and is fully insured for safe, worry-free servicing.",
    badge: "Maximum Safety"
  },
  {
    id: 2,
    icon: <Leaf className="w-6 h-6 text-emerald-500" />,
    title: "Eco-Friendly Products",
    description: "We care for your health and the environment. We utilize premium non-toxic, pet-safe, and biodegradable cleaning products to leave spaces fresh and safe.",
    badge: "Eco Standard"
  },
  {
    id: 3,
    icon: <Award className="w-6 h-6 text-amber-500" />,
    title: "Certified Professionals",
    description: "Our staff is trained in professional-grade sanitation protocols. We follow strict checklist cleaning guidelines to ensure absolute perfection.",
    badge: "Premium Quality"
  },
  {
    id: 4,
    icon: <Clock className="w-6 h-6 text-blue-500" />,
    title: "Reliable & Flexible",
    description: "We adapt to your schedules seamlessly. From customized deep cleaning timelines to prompt arrivals, we value and save your time.",
    badge: "Always Prompt"
  }
];

export function WhyChooseUs() {
  return (
    <section className="pt-8 pb-8 bg-slate-50/50 dark:bg-slate-950/20 border-y border-border/40 relative overflow-hidden">
      {/* Radiant Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

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
            <span>Why Choose Us</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Why Clients Trust Clean Chase
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-6"
          >
            We are not just standard cleaners; we are professionals committed to transforming environments. We combine premium products, certified techniques, and absolute safety to make your space shine.
          </motion.p>

          {/* Quick Metrics Trust Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex flex-wrap justify-center items-center gap-6 sm:gap-12 mt-4 px-6 py-3 rounded-2xl border border-border bg-card/50 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-primary">99.8%</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Satisfaction Rate</span>
            </div>
            <div className="h-4 w-[1px] bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-foreground flex items-center gap-1">
                5.0 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Reviews</span>
            </div>
            <div className="h-4 w-[1px] bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">DBS-Checked Staff</span>
            </div>
          </motion.div>
        </div>

        {/* Features Grid (4 cards per row on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-6 sm:p-8 rounded-3xl border border-border bg-card hover:bg-card/90 transition-all duration-300 flex flex-col shadow-sm group"
            >
              {/* Glowing card border on hover */}
              <div className="absolute inset-0 border border-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon Box with glass backdrop */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 group-hover:bg-primary/10 transition-colors duration-300">
                  <div className="transition-transform duration-500 group-hover:rotate-6">
                    {feature.icon}
                  </div>
                </div>

                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary px-2.5 py-1 rounded-full">
                  {feature.badge}
                </span>
              </div>

              <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h4>

              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
