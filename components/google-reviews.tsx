"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, CheckCircle2 } from "lucide-react";

interface ReviewItem {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  content: string;
}

const reviews: ReviewItem[] = [
  {
    id: 1,
    name: "Margaret S.",
    role: "Residential Homeowner",
    location: "Solihull, West Midlands",
    rating: 5,
    content: "The cleaning team is polite, background checked, and they do an excellent job every week. My kitchen counters and bathroom are spotless. Highly recommended for seniors looking for trustworthy cleaners."
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Property Manager",
    location: "Sutton Coldfield, Birmingham",
    rating: 5,
    content: "Clean Chase did an end-of-tenancy clean for my 3-bed house and it was absolutely spotless. The landlord returned my deposit in full without a single question. Highly recommended!"
  },
  {
    id: 3,
    name: "David Miller",
    role: "Office Manager",
    location: "City Centre, Birmingham",
    rating: 5,
    content: "We contracted them for daily office cleaning. Our desks, meeting rooms, and kitchen are immaculate every morning. Outstanding reliability and attention to detail!"
  },
  {
    id: 4,
    name: "Emma Watson",
    role: "Retail Shop Owner",
    location: "Harborne, Birmingham",
    rating: 5,
    content: "Outstanding business site cleaning! The entrance glass is crystal clear, and the showroom floors look brand new. My customers have definitely noticed the cleanliness."
  },
  {
    id: 5,
    name: "James Reynolds",
    role: "Accommodation Manager",
    location: "Selly Oak, Birmingham",
    rating: 5,
    content: "They handle our student accommodation turnovers. They clean 50+ rooms in a short timeframe and always exceed our cleanliness guidelines."
  },
  {
    id: 6,
    name: "Sophia Martinez",
    role: "Restaurant Owner",
    location: "Moseley, Birmingham",
    rating: 5,
    content: "Keeping a restaurant kitchen compliant is tough, but their deep commercial kitchen cleaning is medical-grade. Sparkly clean non-slip floors and sanitised benches."
  }
];

// Colored Google SVG Icon
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

export function GoogleReviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const intervalId = setInterval(() => {
      if (isPaused || isDraggingRef.current) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 15) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const firstChild = container.children[0] as HTMLDivElement;
        const scrollStep = firstChild ? firstChild.clientWidth + 32 : 350;
        container.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    setIsPaused(true);
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.scrollBehavior = "auto";
    scrollContainerRef.current.style.scrollSnapType = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsPaused(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
      scrollContainerRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  return (
    <section className="pt-8 pb-8 bg-background relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Testimonials</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4"
          >
            What Our Clients Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-6"
          >
            We take pride in our spotless reputation. Read the latest verified 5-star Google reviews from our commercial and residential clients.
          </motion.p>

          {/* Google trust bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-sm"
          >
            <GoogleIcon className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <span className="text-lg font-black text-foreground">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Based on 148+ Google Reviews
              </span>
            </div>
          </motion.div>

        </div>

        {/* Carousel Container (Draggable & Swipeable scroll snap container) */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseUpOrLeave();
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-6 px-1 active:cursor-grabbing cursor-grab select-none"
        >
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] snap-start relative p-6 sm:p-8 rounded-3xl border border-border/80 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-all duration-300 flex flex-col shadow-sm group text-left"
            >
              {/* Glowing hover border */}
              <div className="absolute inset-0 border border-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Review Card Header: Star Rating & Verified Badge */}
              <div className="flex items-center justify-between mb-6">
                {/* Star Rating */}
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Verified badge */}
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-emerald-200/50 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Quote Content */}
              <p className="text-base sm:text-lg font-bold text-foreground leading-relaxed tracking-tight mb-2 flex-1">
                "{review.content}"
              </p>

              {/* Divider */}
              <div className="w-full border-t border-border/50 my-2" />

              {/* Author Info */}
              <div className="flex flex-col items-start gap-0.5">
                <span className="font-extrabold text-base sm:text-lg text-foreground tracking-tight">
                  {review.name}
                </span>
                <span className="text-xs sm:text-sm font-bold text-primary">
                  {review.role}
                </span>
                <span className="text-xs text-muted-foreground">
                  {review.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
