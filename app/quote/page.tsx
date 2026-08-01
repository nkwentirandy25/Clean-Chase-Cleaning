"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServiceItem {
  name: string;
  path: string;
}

const services: ServiceItem[] = [
  { name: "Office Cleaning", path: "/quote/office-cleaning" },
  { name: "Business Site Cleaning", path: "/quote/business-site-cleaning" },
  { name: "Store Cleaning", path: "/quote/store-cleaning" },
  { name: "Industrial & Warehouse Cleaning", path: "/quote/industrial-warehouse-cleaning" },
  { name: "Pubs, Nightclubs & Restaurants Cleaning", path: "/quote/pubs-nightclubs-restaurants" },
  { name: "Commercial Kitchen Cleaning", path: "/quote/commercial-kitchen" },
  { name: "Commercial Kitchen Equipment Cleaning", path: "/quote/commercial-kitchen-equipment-cleaning" },
  { name: "Student Accommodation Cleaning", path: "/quote/student-accommodation-cleaning" },
  { name: "Health Care Facilities Cleaning", path: "/quote/healthcare-facilities" },
  { name: "School Cleaning", path: "/quote/school-cleaning" },
  { name: "After Builders Cleaning", path: "/quote/after-builders-cleaning" },
  { name: "Agricultural Cleaning", path: "/quote/agricultural-cleaning" },
  { name: "Transport & Fleet Cleaning", path: "/quote/transport-fleet-cleaning" },
  { name: "End of Tenancy House Cleaning", path: "/quote/end-of-tenancy-house-cleaning" },
  { name: "Deep Home Cleaning", path: "/quote/deep-home-cleaning" },
  { name: "Carpet & Upholstery Cleaning", path: "/quote/carpet-cleaning" }
];

export default function QuoteLandingPage() {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNext = () => {
    const matchedService = services.find((s) => s.name === selectedValue);
    if (matchedService) {
      setIsNavigating(true);
      router.push(matchedService.path);
    }
  };

  return (
    <div className="w-full min-h-[90vh] bg-background py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      
      {/* 1. Header Title Section (Outside & Above Form) */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary dark:border-primary-foreground/30 dark:bg-primary/10 dark:text-primary-foreground shadow-sm mb-4">
          <Sparkles className="size-3.5 text-emerald-500 animate-pulse" />
          <span>Clean Chase Booking Portal</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-[1.1]">
          Request a Custom
          <span className="block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Cleaning Quote
          </span>
        </h1>
        
        
      </div>

      {/* 2. Visual Stepper */}
      <div className="flex items-center justify-between w-full max-w-lg mb-10 px-4">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-primary/20 transition-all duration-300">
            1
          </div>
          <span className="text-xs font-bold text-foreground">Select Service</span>
        </div>
        <div className="flex-1 h-0.5 bg-border/60 mx-2 -translate-y-2.5" />
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm transition-all duration-300">
            2
          </div>
          <span className="text-xs font-bold text-muted-foreground">Specific Details</span>
        </div>
        <div className="flex-1 h-0.5 bg-border/60 mx-2 -translate-y-2.5" />
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm transition-all duration-300">
            3
          </div>
          <span className="text-xs font-bold text-muted-foreground">Confirmation</span>
        </div>
      </div>

      {/* 3. Enlarged Form Card */}
      <div className="w-full max-w-3xl bg-card text-card-foreground rounded-[2rem] p-8 sm:p-12 md:p-16 border border-border shadow-xl text-center flex flex-col items-center relative overflow-visible">
        
        {/* Clip container for backdrop glows */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        
        {/* Accent Icon */}
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/25 shadow-inner mb-8 relative z-10">
          <ClipboardList className="w-8 h-8" />
        </div>

        {/* Dropdown container */}
        <div className="w-full max-w-xl mx-auto text-left mb-10 relative z-10">
          <label className="block text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">
            Select Cleaning Service
          </label>
          
          <Select value={selectedValue} onValueChange={(val) => setSelectedValue(val || "")}>
            <SelectTrigger className="w-full h-12 rounded-xl text-base px-5 border-border/80 bg-background flex items-center justify-between gap-1.5 focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:border-primary">
              <SelectValue placeholder="Choose a service..." />
            </SelectTrigger>
            <SelectContent className="max-h-80 bg-popover text-popover-foreground border border-border rounded-xl shadow-lg">
              {services.map((service) => (
                <SelectItem
                  key={service.name}
                  value={service.name}
                  className="px-5 py-3 hover:bg-primary/5 text-base cursor-pointer focus:bg-primary/5 focus:text-primary font-semibold"
                >
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* CTA Button */}
        <div className="w-full max-w-xl mx-auto relative z-10">
          <Button
            type="button"
            disabled={!selectedValue || isNavigating}
            onClick={handleNext}
            className="w-full h-12 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-base rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-97 hover:scale-102 transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
          >
            <span>{isNavigating ? "Loading form..." : "Next Step"}</span>
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Footer Trust Badges */}
        <div className="mt-12 pt-6 border-t border-border/60 w-full flex items-center justify-center gap-2 text-xs text-muted-foreground font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Professional, Fully Vetted & DBS Checked Personnel</span>
        </div>
      </div>
    </div>
  );
}
