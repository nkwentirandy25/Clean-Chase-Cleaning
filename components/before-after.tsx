"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterItem {
  id: string;
  label: string;
  before: string;
  after: string;
}

const items: BeforeAfterItem[] = [
  {
    id: "kitchen",
    label: "Kitchen Deep Clean",
    before: "/assets/before-after/kitchen-before.png",
    after: "/assets/before-after/kitchen-after.png"
  },
  {
    id: "sofa",
    label: "Sofa & Upholstery",
    before: "/assets/before-after/sofa-before.png",
    after: "/assets/before-after/sofa-after.png"
  },
  {
    id: "office",
    label: "Office Workspace",
    before: "/assets/before-after/office-before.png",
    after: "/assets/before-after/office-after.png"
  },
  {
    id: "window",
    label: "Window Cleaning",
    before: "/assets/before-after/window-before.png",
    after: "/assets/before-after/window-after.png"
  },
  {
    id: "floor",
    label: "Tile & Floor Care",
    before: "/assets/before-after/floor-before.png",
    after: "/assets/before-after/floor-after.png"
  }
];

export function BeforeAfter() {
  const [activeTab, setActiveTab] = useState("kitchen");
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = items.find((item) => item.id === activeTab) || items[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="pt-8 pb-8 bg-slate-50/50 dark:bg-slate-950/20 border-y border-border/40 relative overflow-hidden select-none">
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
            Drag the slider horizontally to reveal the dramatic difference our premium cleaning services deliver.
          </motion.p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {items.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSliderPosition(50); // reset slider
                }}
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

        {/* Comparison Slider Container */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-4xl mx-auto h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-border bg-muted cursor-ew-resize select-none"
        >
          {/* AFTER Image (Always in Background) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={activeItem.after}
              alt="After cleaning"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 900px"
              className="object-cover object-center pointer-events-none"
            />
            {/* Labeled Badge */}
            <div className="absolute bottom-6 right-6 z-20 bg-emerald-500/90 text-white font-extrabold text-xs tracking-wider uppercase px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
              After Clean
            </div>
          </div>

          {/* BEFORE Image (On Top, Clipped) */}
          <div 
            className="absolute inset-0 w-full h-full z-10 overflow-hidden"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <Image
              src={activeItem.before}
              alt="Before cleaning"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 900px"
              className="object-cover object-center pointer-events-none"
            />
            {/* Labeled Badge */}
            <div className="absolute bottom-6 left-6 z-20 bg-rose-500/90 text-white font-extrabold text-xs tracking-wider uppercase px-4 py-2 rounded-xl backdrop-blur-sm shadow-md">
              Before Clean
            </div>
          </div>

          {/* Sliding Drag Handle Bar & Circle */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-[3px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Central Circle Grip */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-[3px] border-white bg-primary text-white shadow-xl flex items-center justify-center pointer-events-auto hover:scale-105 active:scale-95 transition-transform duration-200 cursor-ew-resize"
            >
              <div className="flex items-center gap-0.5 animate-pulse">
                <ChevronLeft className="w-4 h-4 stroke-[3px]" />
                <ChevronRight className="w-4 h-4 stroke-[3px]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
