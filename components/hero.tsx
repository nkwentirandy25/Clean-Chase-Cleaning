"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const images = [
  "/assets/hero/building-cleaning.jpg",
  "/assets/hero/carpet-cleaning.jpg",
  "/assets/hero/office-cleaning.jpg",
  "/assets/hero/outdoor-cleaning.jpg",
];

// Slider variants for Framer Motion sliding transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 10,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

// Text fade-in-up variants for staggered slide intro
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export function Hero() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeSlideIndex = ((page % images.length) + images.length) % images.length;

  // Manual pagination
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setPage((prevPage) => prevPage + newDirection);
    setProgress(0); // Reset timer progress
  }, []);

  const handleDotClick = useCallback((index: number) => {
    const diff = index - activeSlideIndex;
    if (diff === 0) return;
    setDirection(diff > 0 ? 1 : -1);
    setPage((prevPage) => prevPage + diff);
    setProgress(0); // Reset timer progress
  }, [activeSlideIndex]);

  // Autoplay functionality with custom progress tracking (pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Trigger next slide
          setDirection(1);
          setPage((p) => p + 1);
          return 0;
        }
        // Increment progress (approx 1.67% every 100ms leads to 100% in 6 seconds)
        return prev + 1.67;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isHovered, page]);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Swipe gesture configuration for touch devices
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section 
      className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-slate-950 flex items-center justify-center select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Images Slider */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 220, damping: 26 },
              opacity: { duration: 0.6 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Zoom / Ken Burns Effect */}
            <motion.div
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={images[activeSlideIndex]}
                alt={`Cleaning service image ${activeSlideIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center pointer-events-none"
              />
              
              {/* Premium dark overlays for readability and depth */}
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/50" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content Section (Central, non-sliding) */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16 md:pb-24 items-center">
        <div className="max-w-3xl w-full flex flex-col items-center text-center">
          <motion.div
            variants={textContainerVariants as any}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center w-full"
          >
            {/* Glassmorphic Badge */}
            <motion.div
              variants={textItemVariants as any}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 dark:border-primary/45 bg-primary/10 backdrop-blur-md text-primary-foreground dark:text-primary font-semibold text-xs tracking-wider uppercase mb-6 shadow-lg shadow-primary/5"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>Professional Cleaning Services</span>
            </motion.div>

            {/* Title heading with gradient highlight */}
            <motion.h1
              variants={textItemVariants as any}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] md:leading-[1.05] drop-shadow-sm"
            >
              Your Trusted Partner for a{" "}
              <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                Spotless
              </span>
              , Healthier Space
            </motion.h1>

            {/* Description body */}
            <motion.p
              variants={textItemVariants as any}
              className="text-base sm:text-lg md:text-xl text-white/95 drop-shadow-sm max-w-2xl mt-6 font-medium leading-relaxed mx-auto"
            >
              Professional cleaning solutions tailored for homes, offices, and commercial buildings. Experience the standard of absolute cleanliness.
            </motion.p>

            {/* Call to action buttons */}
            <motion.div
              variants={textItemVariants as any}
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center items-center"
            >
              <Button
                render={<Link href="/quote" /> as any}
                className="h-12 px-7 rounded-xl text-base font-bold bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/35 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              
              <Button
                render={<Link href="/services" /> as any}
                variant="outline"
                className="h-12 px-7 rounded-xl text-base font-bold bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-md transition-all duration-300 shadow-lg active:scale-98 flex items-center justify-center cursor-pointer"
              >
                Our Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Manual Slide Navigation Arrows (Desktop) */}
      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-between pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full border border-white/15 hover:border-white/30 bg-black/35 hover:bg-black/55 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 pointer-events-auto hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 group cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full border border-white/15 hover:border-white/30 bg-black/35 hover:bg-black/55 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 pointer-events-auto hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 group cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Slide Indicators / Progress Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {images.map((_, index) => {
          const isActive = index === activeSlideIndex;
          return (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300 bg-white/20 hover:bg-white/40 cursor-pointer"
              style={{ width: isActive ? "2.5rem" : "0.5rem" }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {isActive && (
                <div
                  className={cn(
                    "h-full bg-primary",
                    progress === 0 ? "transition-none w-0" : "transition-all duration-100 ease-linear"
                  )}
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

