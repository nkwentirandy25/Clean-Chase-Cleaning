"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Sparkles,
  User, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  FileText,
  Minus,
  Plus,
  ChevronDown,
  CalendarIcon,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

export default function EndOfTenancyQuote() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);
  
  // End of Tenancy Cleaning Form State
  const [formData, setFormData] = useState({
    // Step 1: Property Details
    bedrooms: 2,
    bathrooms: 1,
    livingRooms: 1,
    propertySize: "",
    adults: 2,
    children: 0,
    pets: "No Pets",
    lastCleaned: "Within last month",
    heavilySoiled: "No — Standard condition",
    
    // Step 2: Extras
    selectedExtras: [] as string[],
    specialRequests: "",
    siteVisitDate: "",
    
    // Step 3: Contact Details
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    addressLine1: "",
    postcode: "",
    contactMethod: "",
  });

  // Toggle booking extras
  const toggleExtra = (extraName: string) => {
    const isSelected = formData.selectedExtras.includes(extraName);
    const updatedExtras = isSelected
      ? formData.selectedExtras.filter(e => e !== extraName)
      : [...formData.selectedExtras, extraName];
    setFormData({ ...formData, selectedExtras: updatedExtras });
  };

  // Field validation helper
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      // Counters and sizes are optional or pre-filled, so no validation needed here
    } else if (currentStep === 2) {
      if (!formData.specialRequests.trim()) {
        newErrors.specialRequests = "Special requests notes are required (write 'None' if you have no special requests)";
      }
    } else if (currentStep === 3) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.surname.trim()) newErrors.surname = "Surname is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
      if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required";
      if (!formData.contactMethod) newErrors.contactMethod = "Please select a preferred contact method";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await fetch("/api/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceName: "End of Tenancy House Cleaning",
            ...formData,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to submit quote request. Please try again.");
        }

        setStep(4); // success state
        setErrors({});
      } catch (err: any) {
        setSubmitError(err.message || "Failed to submit request. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      bedrooms: 2,
      bathrooms: 1,
      livingRooms: 1,
      propertySize: "",
      adults: 2,
      children: 0,
      pets: "No Pets",
      lastCleaned: "Within last month",
      heavilySoiled: "No — Standard condition",
      selectedExtras: [],
      specialRequests: "",
      siteVisitDate: "",
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      addressLine1: "",
      postcode: "",
      contactMethod: "",
    });
    setStep(1);
    setErrors({});
  };

  const extrasList = [
    { name: "Oven Cleaning", desc: "Stripping carbon deposits & burnt grease" },
    { name: "Fridge Cleaning", desc: "Sanitizing inside panels & drawers" },
    { name: "Inside Windows", desc: "Streak-free glass & frame detailing" },
    { name: "Carpet Cleaning", desc: "Steam hot-water soil extraction" },
  ];

  return (
    <div className="w-full min-h-[90vh] bg-background pt-4 pb-12 md:pt-6 md:pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <div className="w-full max-w-5xl">
        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">
            Get a Quote
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Secure your tenancy deposit or prepare your property for immediate lease with our comprehensive move-in/move-out deep cleaning form.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step < 4 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Form Wizard Container */}
              <div className="w-full bg-card text-card-foreground rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-md relative overflow-hidden">
                
                {/* Custom Stepper */}
                <div className="bg-secondary/40 rounded-2xl p-4 sm:p-5 mb-8 border border-border/60">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-extrabold text-sm sm:text-base tracking-wide text-foreground uppercase">
                      Step {step}: {step === 1 ? "Property Details" : step === 2 ? "Booking Extras" : "Your Details"}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground bg-background border border-border px-2.5 py-1 rounded-full">
                      {step} of 3
                    </span>
                  </div>
                  
                  <div className="relative flex items-center justify-between px-6 mt-6 pb-8">
                    {/* Progress track line */}
                    <div className="absolute left-[44px] right-[44px] top-[20px] -translate-y-1/2 h-[3px] bg-border z-0 rounded-full">
                      <motion.div 
                        className="h-full bg-primary rounded-full" 
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" 
                        }}
                        transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      />
                    </div>
                    
                    {/* Step 1 Node */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {step === 1 ? (
                          <motion.div 
                            layoutId="stepper-active-node"
                            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md ring-4 ring-primary/10 border-2 border-primary"
                          >
                            <Home className="w-4.5 h-4.5 animate-pulse" />
                          </motion.div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-white shadow-md">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="hidden sm:block text-[10px] sm:text-xs font-bold text-foreground absolute top-12 whitespace-nowrap">Property Details</span>
                    </div>

                    {/* Step 2 Node */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {step < 2 ? (
                          <div className="w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                          </div>
                        ) : step === 2 ? (
                          <motion.div 
                            layoutId="stepper-active-node"
                            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md ring-4 ring-primary/10 border-2 border-primary"
                          >
                            <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                          </motion.div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-white shadow-md">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <span className="hidden sm:block text-[10px] sm:text-xs font-bold text-foreground absolute top-12 whitespace-nowrap">Booking Extras</span>
                    </div>

                    {/* Step 3 Node */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {step < 3 ? (
                          <div className="w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                          </div>
                        ) : (
                          <motion.div 
                            layoutId="stepper-active-node"
                            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md ring-4 ring-primary/10 border-2 border-primary"
                          >
                            <User className="w-4.5 h-4.5" />
                          </motion.div>
                        )}
                      </div>
                      <span className="hidden sm:block text-[10px] sm:text-xs font-bold text-foreground absolute top-12 whitespace-nowrap">Your Details</span>
                    </div>

                    {/* Complete Node */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full bg-background border-2 border-border/40 flex items-center justify-center shadow-inner">
                          <Check className="w-4 h-4 text-muted-foreground/20" />
                        </div>
                      </div>
                      <span className="hidden sm:block text-[10px] sm:text-xs font-bold text-muted-foreground/40 absolute top-12 whitespace-nowrap">Done</span>
                    </div>
                  </div>
                </div>

                {/* Wizard Form Fields */}
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      /* STEP 1: Property Details */
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-lg font-extrabold text-foreground mb-1">Property Details</h3>
                          <p className="text-xs text-muted-foreground">Specify details of the property needing the clean.</p>
                        </div>

                        {/* Rooms grid counter */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {/* Bedrooms */}
                          <div className="bg-card border border-border/80 rounded-2xl p-4.5 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-sm font-extrabold text-foreground mb-3">Bedrooms</span>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, bedrooms: Math.max(1, formData.bedrooms - 1) })}
                                className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                              >
                                <Minus className="w-3 h-3 stroke-[3]" />
                              </button>
                              <span className="font-extrabold text-base text-foreground w-12 text-center">{formData.bedrooms}</span>
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, bedrooms: formData.bedrooms + 1 })}
                                className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                              >
                                <Plus className="w-3 h-3 stroke-[3]" />
                              </button>
                            </div>
                          </div>

                          {/* Bathrooms */}
                          <div className="bg-card border border-border/80 rounded-2xl p-4.5 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-sm font-extrabold text-foreground mb-3">Bathrooms</span>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, bathrooms: Math.max(1, formData.bathrooms - 1) })}
                                className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                              >
                                <Minus className="w-3 h-3 stroke-[3]" />
                              </button>
                              <span className="font-extrabold text-base text-foreground w-12 text-center">{formData.bathrooms}</span>
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, bathrooms: formData.bathrooms + 1 })}
                                className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                              >
                                <Plus className="w-3 h-3 stroke-[3]" />
                              </button>
                            </div>
                          </div>

                          {/* Living Rooms */}
                          <div className="bg-card border border-border/80 rounded-2xl p-4.5 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-sm font-extrabold text-foreground mb-3">Living Rooms</span>
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, livingRooms: Math.max(1, formData.livingRooms - 1) })}
                                className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                              >
                                <Minus className="w-3 h-3 stroke-[3]" />
                              </button>
                              <span className="font-extrabold text-base text-foreground w-12 text-center">{formData.livingRooms}</span>
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, livingRooms: formData.livingRooms + 1 })}
                                className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                              >
                                <Plus className="w-3 h-3 stroke-[3]" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Property Size */}
                        <div className="space-y-2">
                          <label htmlFor="property-size" className="block text-sm font-extrabold tracking-wide text-foreground">
                            Property Size (Approx. Sq. Ft / Sq. M) <span className="text-muted-foreground font-normal">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            id="property-size"
                            value={formData.propertySize}
                            onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                            placeholder="e.g. 1,200 sq. ft or 3 Bedroom Semi-detached"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          />
                        </div>

                        {/* Occupants & Pets */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm sm:text-base font-extrabold text-foreground">Occupants & Pets</h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Adults */}
                            <div className="bg-card border border-border/80 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm">
                              <span className="text-sm font-extrabold text-foreground">Adults in Household</span>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                                  className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                                >
                                  <Minus className="w-3 h-3 stroke-[3]" />
                                </button>
                                <span className="font-extrabold text-base text-foreground w-10 text-center">{formData.adults}</span>
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                                  className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                                >
                                  <Plus className="w-3 h-3 stroke-[3]" />
                                </button>
                              </div>
                            </div>

                            {/* Children */}
                            <div className="bg-card border border-border/80 rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm">
                              <span className="text-sm font-extrabold text-foreground">Children in Household</span>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                                  className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                                >
                                  <Minus className="w-3 h-3 stroke-[3]" />
                                </button>
                                <span className="font-extrabold text-base text-foreground w-10 text-center">{formData.children}</span>
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                                  className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer border border-border/40"
                                >
                                  <Plus className="w-3 h-3 stroke-[3]" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Any Pets dropdown */}
                          <div className="space-y-2">
                            <label className="block text-sm font-extrabold tracking-wide text-foreground">
                              Any Pets?
                            </label>
                            <div className="relative">
                              <select
                                value={formData.pets}
                                onChange={(e) => setFormData({ ...formData, pets: e.target.value })}
                                className="w-full px-4 py-3 pr-10 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                              >
                                <option value="No Pets">No Pets</option>
                                <option value="Yes (Dogs/Cats/Other)">Yes (Dogs/Cats/Other)</option>
                              </select>
                              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* Cleaning History */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm sm:text-base font-extrabold text-foreground">Cleaning History</h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Last Cleaned Dropdown */}
                            <div className="space-y-2">
                              <label className="block text-sm font-extrabold tracking-wide text-foreground">
                                When was it last cleaned?
                              </label>
                              <div className="relative">
                                <select
                                  value={formData.lastCleaned}
                                  onChange={(e) => setFormData({ ...formData, lastCleaned: e.target.value })}
                                  className="w-full px-4 py-3 pr-10 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                                >
                                  <option value="Within last week">Within last week</option>
                                  <option value="Within last month">Within last month</option>
                                  <option value="1 - 3 months ago">1 - 3 months ago</option>
                                  <option value="3+ months ago">3+ months ago</option>
                                  <option value="Never / Don't know">Never / Don't know</option>
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>

                            {/* Heavily Soiled Dropdown */}
                            <div className="space-y-2">
                              <label className="block text-sm font-extrabold tracking-wide text-foreground">
                                Is property heavily soiled?
                              </label>
                              <div className="relative">
                                <select
                                  value={formData.heavilySoiled}
                                  onChange={(e) => setFormData({ ...formData, heavilySoiled: e.target.value })}
                                  className="w-full px-4 py-3 pr-10 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
                                >
                                  <option value="No — Standard condition">No — Standard condition</option>
                                  <option value="Yes — Heavy grease/grime/construction dust">Yes — Heavy grease/grime/construction dust</option>
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between items-center pt-6 border-t border-border mt-6">
                          <Link
                            href="/services"
                            className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-xs sm:text-sm tracking-wide transition-all active:scale-97 flex items-center gap-1.5 cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4 stroke-[3]" />
                            <span>Back</span>
                          </Link>
                          
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-97 hover:scale-102 flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>Next Step</span>
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                          </button>
                        </div>
                      </motion.div>
                    ) : step === 2 ? (
                      /* STEP 2: Booking Extras */
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-lg font-extrabold text-foreground mb-1">Select Booking Extras</h3>
                          <p className="text-xs text-muted-foreground">Add specialty services to your package checklist.</p>
                        </div>

                        {/* Extras list grid selection cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {extrasList.map((extra) => {
                            const isSelected = formData.selectedExtras.includes(extra.name);
                            return (
                              <button
                                type="button"
                                key={extra.name}
                                onClick={() => toggleExtra(extra.name)}
                                className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-sm relative group ${
                                  isSelected
                                    ? "bg-primary/5 border-primary ring-2 ring-primary/10"
                                    : "bg-card border-border/80 hover:bg-muted hover:border-border"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="space-y-1 pr-6">
                                    <span className="font-extrabold text-sm sm:text-base text-foreground block">{extra.name}</span>
                                    <span className="text-xs text-muted-foreground block">{extra.desc}</span>
                                  </div>
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : "border-border bg-background group-hover:border-muted-foreground"
                                  }`}>
                                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Notes input */}
                        <div className="space-y-2">
                          <label htmlFor="special-requests" className="block text-sm sm:text-base font-extrabold tracking-wide text-foreground">
                            Other Special Requests / Notes <span className="text-destructive font-bold">*</span>
                          </label>
                          <textarea
                            id="special-requests"
                            rows={4}
                            value={formData.specialRequests}
                            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                            placeholder="Tell us about lock codes, rubbish disposal, delicate antiques, or write 'None' if you have no requests..."
                            className="w-full px-4 py-3 rounded-2xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm resize-none"
                          />
                          {errors.specialRequests && (
                            <p className="text-destructive text-xs font-semibold">{errors.specialRequests}</p>
                          )}
                        </div>



                        {/* Navigation buttons */}
                        <div className="flex justify-between items-center pt-6 border-t border-border mt-6">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-xs sm:text-sm tracking-wide transition-all active:scale-97 flex items-center gap-1.5 cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4 stroke-[3]" />
                            <span>Back</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-97 hover:scale-102 flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>Next Step</span>
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* STEP 3: Your Details */
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6 text-foreground"
                      >
                        {/* Name fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="first-name" className="block text-sm font-extrabold tracking-wide text-foreground">
                              First Name <span className="text-destructive font-bold">*</span>
                            </label>
                            <input
                              type="text"
                              id="first-name"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              placeholder="e.g. John"
                              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                            />
                            {errors.firstName && (
                              <p className="text-destructive text-xs font-semibold">{errors.firstName}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="surname" className="block text-sm font-extrabold tracking-wide text-foreground">
                              Surname <span className="text-destructive font-bold">*</span>
                            </label>
                            <input
                              type="text"
                              id="surname"
                              value={formData.surname}
                              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                              placeholder="e.g. Doe"
                              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                            />
                            {errors.surname && (
                              <p className="text-destructive text-xs font-semibold">{errors.surname}</p>
                            )}
                          </div>
                        </div>

                        {/* Email Row (Full width) */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-extrabold tracking-wide text-foreground">
                            Email <span className="text-destructive font-bold">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. john.doe@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          />
                          {errors.email && (
                            <p className="text-destructive text-xs font-semibold">{errors.email}</p>
                          )}
                        </div>

                        {/* Phone Row (Full width) */}
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-sm font-extrabold tracking-wide text-foreground">
                            Phone <span className="text-destructive font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. 070 1234 5678"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          />
                          {errors.phone && (
                            <p className="text-destructive text-xs font-semibold">{errors.phone}</p>
                          )}
                        </div>

                        {/* First Line of Address Row (Full width) */}
                        <div className="space-y-2">
                          <label htmlFor="address-1" className="block text-sm font-extrabold tracking-wide text-foreground">
                            First Line of Address <span className="text-destructive font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            id="address-1"
                            value={formData.addressLine1}
                            onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                            placeholder="e.g. 10 Downing Street"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          />
                          {errors.addressLine1 && (
                            <p className="text-destructive text-xs font-semibold">{errors.addressLine1}</p>
                          )}
                        </div>

                        {/* Postcode Row (Full width) */}
                        <div className="space-y-2">
                          <label htmlFor="postcode" className="block text-sm font-extrabold tracking-wide text-foreground">
                            Postcode <span className="text-destructive font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            id="postcode"
                            value={formData.postcode}
                            onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                            placeholder="e.g. SW1A 2AA"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          />
                          {errors.postcode && (
                            <p className="text-destructive text-xs font-semibold">{errors.postcode}</p>
                          )}
                        </div>

                        {/* Schedule a Site Visit */}
                        <div className="space-y-2">
                          <label className="block text-sm sm:text-base font-extrabold tracking-wide text-foreground">
                            Schedule a Site Visit
                          </label>
                          <Popover open={isSiteVisitOpen} onOpenChange={setIsSiteVisitOpen}>
                            <PopoverTrigger
                              type="button"
                              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-left focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm flex items-center justify-between cursor-pointer"
                            >
                              <span className={formData.siteVisitDate ? "text-foreground" : "text-muted-foreground/60"}>
                                {formData.siteVisitDate
                                  ? format(new Date(formData.siteVisitDate + "T00:00:00"), "PPP")
                                  : "Pick a date"}
                              </span>
                              <CalendarIcon className="w-4 h-4 text-muted-foreground/80" />
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-popover border border-border rounded-2xl shadow-lg z-50" align="start">
                              <ShadcnCalendar
                                mode="single"
                                selected={formData.siteVisitDate ? new Date(formData.siteVisitDate + "T00:00:00") : undefined}
                                onSelect={(date) => {
                                  const dateString = date ? format(date, "yyyy-MM-dd") : "";
                                  setFormData((prev) => ({ ...prev, siteVisitDate: dateString }));
                                  setIsSiteVisitOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>


                        {/* How would you like to be contacted preference (Radio Selection Pills) */}
                        <div className="space-y-3">
                          <label className="block text-sm sm:text-base font-extrabold tracking-wide text-foreground">
                            How would you like to be contacted? <span className="text-destructive font-bold">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {["What's app", "Call", "Email", "Text message"].map((method) => {
                              const isSelected = formData.contactMethod === method;
                              return (
                                <button
                                  type="button"
                                  key={method}
                                  onClick={() => setFormData({ ...formData, contactMethod: method })}
                                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 border cursor-pointer ${
                                    isSelected
                                      ? "bg-primary text-primary-foreground border-primary shadow-sm scale-102"
                                      : "bg-background hover:bg-muted text-foreground border-border hover:border-border/80"
                                  }`}
                                >
                                  {method}
                                </button>
                              );
                            })}
                          </div>
                          {errors.contactMethod && (
                            <p className="text-destructive text-xs font-semibold">{errors.contactMethod}</p>
                          )}
                        </div>

                        {submitError && (
                          <div className="pt-4 text-red-500 font-medium text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                            {submitError}
                          </div>
                        )}

                        {/* Navigation buttons */}
                        <div className="flex justify-between items-center pt-6 border-t border-border mt-6">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-xs sm:text-sm tracking-wide transition-all active:scale-97 flex items-center gap-1.5 cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4 stroke-[3]" />
                            <span>Back</span>
                          </button>
                          
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-97 hover:scale-102 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                          >
                            {isSubmitting ? (
                              <>
                                <span>Submitting...</span>
                                <Loader2 className="w-4 h-4 animate-spin" />
                              </>
                            ) : (
                              <>
                                <span>Submit Request</span>
                                <CheckCircle2 className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          ) : (
            /* STEP 4: Success Confirmation State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full text-center"
            >
              <div className="bg-card text-card-foreground rounded-3xl p-8 sm:p-12 border border-border shadow-lg relative overflow-hidden flex flex-col items-center">
                
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.15 }}
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md mb-6"
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">Request Submitted!</h2>
                <p className="text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed mb-8">
                  Thank you, <span className="font-bold text-foreground">{formData.firstName}</span>. Your request for <span className="font-bold text-foreground">End of Tenancy House Cleaning</span> has been received. Our team will analyze your requirements and get back to you with a custom quote within 24 hours.
                </p>

                {/* Submitted Summary box */}
                <div className="w-full max-w-md bg-secondary/50 rounded-2xl p-5 mb-8 border border-border/80 text-left text-xs sm:text-sm space-y-2">
                  <h4 className="font-extrabold text-foreground border-b border-border/60 pb-2 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Enquiry Summary</span>
                  </h4>
                  <p><span className="text-muted-foreground font-medium">Property Size / Rooms:</span> <span className="font-semibold text-foreground">{formData.bedrooms} Bed, {formData.bathrooms} Bath, {formData.livingRooms} Living {formData.propertySize && `(${formData.propertySize})`}</span></p>
                  <p><span className="text-muted-foreground font-medium">Occupants:</span> <span className="font-semibold text-foreground">{formData.adults} Adults, {formData.children} Children</span></p>
                  <p><span className="text-muted-foreground font-medium">Pets:</span> <span className="font-semibold text-foreground">{formData.pets}</span></p>
                  <p><span className="text-muted-foreground font-medium">Last Cleaned:</span> <span className="font-semibold text-foreground">{formData.lastCleaned}</span></p>
                  <p><span className="text-muted-foreground font-medium">Heavily Soiled:</span> <span className="font-semibold text-foreground">{formData.heavilySoiled}</span></p>
                  <p><span className="text-muted-foreground font-medium">Selected Extras:</span> <span className="font-semibold text-foreground">{formData.selectedExtras.length > 0 ? formData.selectedExtras.join(", ") : "None"}</span></p>
                  <p><span className="text-muted-foreground font-medium">Contact Preference:</span> <span className="font-semibold text-foreground">{formData.contactMethod}</span></p>
                  
                  {formData.specialRequests && (
                    <p><span className="text-muted-foreground font-medium">Special Notes:</span> <span className="italic block mt-1 bg-background p-2.5 rounded-lg border border-border text-foreground">{formData.specialRequests}</span></p>
                  )}
                  {formData.siteVisitDate && (
                    <p className="mt-1">
                      <span className="text-muted-foreground font-medium">Scheduled Site Visit:</span>{" "}
                      <span className="font-semibold text-foreground block mt-1 bg-background p-2.5 rounded-lg border border-border">{format(new Date(formData.siteVisitDate + "T00:00:00"), "PPP")}</span>
                    </p>
                  )}
                  
                  <div className="pt-2.5 border-t border-border/65 flex flex-col gap-1 text-xs text-muted-foreground">
                    <p><span className="font-medium">Contact Email:</span> <span className="text-foreground">{formData.email}</span></p>
                    <p><span className="font-medium">Contact Phone:</span> <span className="text-foreground">{formData.phone}</span></p>
                    <p><span className="font-medium">Address:</span> <span className="text-foreground">{formData.addressLine1}, {formData.postcode}</span></p>
                  </div>
                </div>

                {/* CTA Navigation buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-sm transition-all cursor-pointer active:scale-97"
                  >
                    Submit Another Quote
                  </button>
                  <Link
                    href="/services"
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm transition-all flex items-center justify-center gap-1 shadow-md active:scale-97 hover:scale-102 cursor-pointer"
                  >
                    <span>Go back to Services</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
