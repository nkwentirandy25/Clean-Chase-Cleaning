"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface BeforeAfterItem {
  id: string;
  label: string;
  before: string;
  after: string;
  beforeTitle: string;
  beforeDesc: string;
  afterTitle: string;
  afterDesc: string;
}

const items: BeforeAfterItem[] = [
  {
    id: "kitchen",
    label: "Kitchen Cleaning",
    before: "/assets/before-after/kitchen-before.png",
    after: "/assets/before-after/kitchen-after.png",
    beforeTitle: "Initial Condition",
    beforeDesc: "Grease build-up, messy counters, and stovetop grime.",
    afterTitle: "Post-Cleaning Result",
    afterDesc: "Polished counters, pristine surfaces, and sterilized appliances."
  },
  {
    id: "sofa",
    label: "Sofa & Upholstery",
    before: "/assets/before-after/sofa-before.png",
    after: "/assets/before-after/sofa-after.png",
    beforeTitle: "Deep Stains & Dirt",
    beforeDesc: "Embedded dirt, stubborn stains, and dull fabric color.",
    afterTitle: "Restored Fabric",
    afterDesc: "Completely extracted dirt, stain-free, and refreshed fabric fibers."
  },
  {
    id: "office",
    label: "Office Workspace",
    before: "/assets/before-after/office-before.png",
    after: "/assets/before-after/office-after.png",
    beforeTitle: "Cluttered Desk & Dust",
    beforeDesc: "Dusty surfaces, unorganized cables, and chaotic workspace.",
    afterTitle: "Clean & Organized",
    afterDesc: "Sanitized desks, organized workspace, and clear tidy environment."
  },
  {
    id: "window",
    label: "Window Cleaning",
    before: "/assets/before-after/window-before.png",
    after: "/assets/before-after/window-after.png",
    beforeTitle: "Smudged & Cloudy Glass",
    beforeDesc: "Rain spots, dirt film, and fingerprints blocking natural light.",
    afterTitle: "Streak-Free Clarity",
    afterDesc: "Perfect transparency, clean frames, and brighter indoor spaces."
  },
  {
    id: "floor",
    label: "Tile & Floor Care",
    before: "/assets/before-after/floor-before.png",
    after: "/assets/before-after/floor-after.png",
    beforeTitle: "Dull Tiles & Grout",
    beforeDesc: "Discolored grout lines, surface dirt, and lack of shine.",
    afterTitle: "Deep-Cleaned Polish",
    afterDesc: "Restored shine, brightened grout, and pristine polished floors."
  }
];

export function BeforeAfter() {
  const [activeTab, setActiveTab] = useState("kitchen");

  const activeItem = items.find((item) => item.id === activeTab) || items[0];

  return (
    <section className="pt-16 pb-16 bg-slate-50/50 dark:bg-slate-950/20 border-y border-border/40 relative overflow-hidden select-none">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Results</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Before & After Transformations
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Compare the dramatic difference our premium cleaning services deliver side-by-side.
          </motion.p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {items.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground bg-card hover:bg-card/85 border border-border"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-primary rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {/* BEFORE Card */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg p-4 flex flex-col gap-4"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={activeItem.before}
                    alt={`${activeItem.label} Before`}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center"
                    priority
                  />
                  {/* Before Badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-[10px] sm:text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-lg shadow-md z-10">
                    Before
                  </div>
                </div>
                {/* Content */}
                <div className="px-2 pb-2">
                  <h3 className="font-extrabold text-lg text-foreground mb-1 tracking-tight">
                    {activeItem.beforeTitle}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {activeItem.beforeDesc}
                  </p>
                </div>
              </motion.div>

              {/* AFTER Card */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg p-4 flex flex-col gap-4"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={activeItem.after}
                    alt={`${activeItem.label} After`}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center"
                    priority
                  />
                  {/* After Badge */}
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white font-extrabold text-[10px] sm:text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-lg shadow-md z-10">
                    After
                  </div>
                </div>
                {/* Content */}
                <div className="px-2 pb-2">
                  <h3 className="font-extrabold text-lg text-foreground mb-1 tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{activeItem.afterTitle}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {activeItem.afterDesc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
