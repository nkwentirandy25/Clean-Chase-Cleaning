import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function QuoteLandingPage() {
  return (
    <div className="w-full min-h-[80vh] bg-background py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-card text-card-foreground rounded-3xl p-8 sm:p-12 border border-border shadow-lg text-center flex flex-col items-center relative overflow-hidden">
        
        {/* Decorative backdrop glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Animated Accent Icon */}
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-inner mb-6 relative z-10">
          <Sparkles className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-4 relative z-10">
          Request a Custom Quote
        </h1>
        
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-md relative z-10">
          Please select a specific professional service from our services catalog to start your tailormade booking inquiry. We offer custom, step-by-step forms tailored to each cleaning type.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10">
          <Link
            href="/services"
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm tracking-wide shadow-md hover:scale-102 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View Services Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer"
          >
            General Inquiry
          </Link>
        </div>

        {/* Footer Badges */}
        <div className="mt-12 pt-6 border-t border-border/60 w-full flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Professional & Fully Insured Cleaning Services</span>
        </div>
      </div>
    </div>
  );
}
