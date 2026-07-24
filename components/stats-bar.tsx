"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  trigger: boolean;
}

function CountUp({ end, duration = 2000, decimals = 0, suffix = "", trigger }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress * end);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, trigger]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-background  border-border py-4 z-10 transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground text-sm">
        {/* Left Side: 3 Counts with CountUp animations */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary min-w-[3.5rem] text-center">
              <CountUp end={15} suffix="k+" trigger={hasIntersected} />
            </span>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Clients</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary min-w-[3.5rem] text-center">
              <CountUp end={250} suffix="+" trigger={hasIntersected} />
            </span>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Cleaners</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary min-w-[4.5rem] text-center">
              <CountUp end={99.8} decimals={1} suffix="%" trigger={hasIntersected} />
            </span>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Satisfaction</span>
          </div>
        </div>



        {/* Right Side: Support badge */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 border border-primary/10 dark:border-primary/20 px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1" />
          <span>24/7 Premium Cleaning Support</span>
        </div>
      </div>
    </div>
  );
}
