"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HelpCircle, Home, Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full bg-background min-h-[75vh] flex items-center justify-center relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Animated 404 Visual Indicator */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="relative mb-6"
        >
          <div className="text-8xl sm:text-9xl font-black tracking-tighter text-primary/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
              <HelpCircle className="w-8 h-8 animate-bounce" />
            </div>
          </div>
        </motion.div>

        {/* Heading & description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Page Not Found</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Lost in Clean Space?
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm">
            The page you are looking for doesn't exist, has been removed, or the URL address was misspelled.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full px-4"
        >
          {/* Safe Link back to homepage */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/10 hover:shadow-primary/20 active:scale-98 cursor-pointer w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* View services link */}
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-border hover:bg-muted font-bold text-sm text-foreground transition-all active:scale-98 cursor-pointer w-full sm:w-auto"
          >
            <span>View Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Footer Support Prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-muted-foreground mt-12"
        >
          Need help? Feel free to{" "}
          <Link href="/contact" className="underline hover:text-primary font-medium">
            contact our support team
          </Link>
          .
        </motion.p>

      </div>
    </div>
  );
}
