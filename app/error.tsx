"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Home, Sparkles } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error("Encountered global error:", error);
  }, [error]);

  return (
    <div className="w-full bg-background min-h-[75vh] flex items-center justify-center relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-destructive/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Animated Error Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-destructive/10 text-destructive mb-8 shadow-inner"
        >
          <AlertCircle className="w-10 h-10 animate-pulse" />
        </motion.div>

        {/* Heading & description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-destructive/20 bg-destructive/5 text-destructive font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm">
            An unexpected error occurred while loading this page. Our technical team has been alerted.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10 w-full px-4"
        >
          {/* Try again reset button */}
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/10 hover:shadow-primary/20 active:scale-98 cursor-pointer w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 animate-spin-hover" />
            <span>Try Again</span>
          </button>

          {/* Safe Link back to homepage */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-border hover:bg-muted font-bold text-sm text-foreground transition-all active:scale-98 cursor-pointer w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Footer Support Prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-muted-foreground mt-12"
        >
          If the issue continues, please{" "}
          <Link href="/contact" className="underline hover:text-primary font-medium">
            contact our support team
          </Link>
          .
        </motion.p>

      </div>
    </div>
  );
}
