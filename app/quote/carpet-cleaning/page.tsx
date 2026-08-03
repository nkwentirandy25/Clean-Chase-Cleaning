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
  Bed,
  Wind,
  Armchair,
  Layers,
  ChevronDown,
  ShieldCheck,
  Loader2,
  Sparkle,
  Footprints,
  CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CarpetCleaningQuote() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, isSubmitted]);

  // Carpet & Upholstery Cleaning Form State
  const [formData, setFormData] = useState({
    // Step 1: Cleaning Details
    bedroomCarpets: 0,
    stairsCarpets: 0,
    landingCarpets: 0,
    twoSeaterSofas: 0,
    threeSeaterSofas: 0,
    rugs: 0,
    armchairs: 0,
    fabricType: "Cotton",
    stainSeverity: "Standard",

    // Step 2: Contact Details
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    addressLine1: "",
    postcode: "",
    contactMethod: "",
    comments: "",
    siteVisitDate: "",
  });

  const handleCountChange = (field: keyof typeof formData, value: string) => {
    const parsed = value === "" ? 0 : Math.max(0, parseInt(value, 10));
    setFormData((prev) => ({ ...prev, [field]: isNaN(parsed) ? 0 : parsed }));

    // Clear Step 1 validation error if user sets any count > 0
    if (errors.counts) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.counts;
        return copy;
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleFabricTypeChange = (value: string | null) => {
    if (value) {
      setFormData((prev) => ({ ...prev, fabricType: value }));
    }
  };

  const handleStainSeverityChange = (value: string | null) => {
    if (value) {
      setFormData((prev) => ({ ...prev, stainSeverity: value }));
    }
  };

  const selectContactMethod = (method: string) => {
    setFormData((prev) => ({ ...prev, contactMethod: method }));
    if (errors.contactMethod) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.contactMethod;
        return copy;
      });
    }
  };

  // Step validation
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      // Validate that at least one quantity is set or fabric selection requires quote
      const totalQuantities =
        formData.bedroomCarpets +
        formData.stairsCarpets +
        formData.landingCarpets +
        formData.twoSeaterSofas +
        formData.threeSeaterSofas +
        formData.rugs +
        formData.armchairs;

      if (totalQuantities === 0) {
        newErrors.counts = "Please specify the quantity for at least one item before proceeding.";
      }
    } else if (currentStep === 2) {
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
      if (!formData.contactMethod) newErrors.contactMethod = "Preferred contact method is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) {
      // scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName: "Carpet & Upholstery Cleaning",
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      bedroomCarpets: 0,
      stairsCarpets: 0,
      landingCarpets: 0,
      twoSeaterSofas: 0,
      threeSeaterSofas: 0,
      rugs: 0,
      armchairs: 0,
      fabricType: "Cotton",
      stainSeverity: "Standard",
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      addressLine1: "",
      postcode: "",
      contactMethod: "",
      comments: "",
      siteVisitDate: "",
    });
    setStep(1);
    setErrors({});
    setIsSubmitted(false);
  };

  const countsConfig = [
    { key: "bedroomCarpets" as const, label: "Bedroom Carpet", icon: Bed },
    { key: "stairsCarpets" as const, label: "Stairs Carpet", icon: Footprints },
    { key: "landingCarpets" as const, label: "Landing Carpet", icon: Home },
    { key: "twoSeaterSofas" as const, label: "2-seater Sofa", icon: Armchair },
    { key: "threeSeaterSofas" as const, label: "3-seater Sofa", icon: Armchair },
    { key: "rugs" as const, label: "Rug", icon: Layers },
    { key: "armchairs" as const, label: "Armchair", icon: Armchair },
  ];

  const fabricTypes = ["Cotton", "Leather", "Velvet", "Other"];
  const stainSeverities = ["Standard", "Deep-set stains", "Heavy pet stains"];
  const contactMethods = ["What's app", "Call", "Email", "Text message"];

  return (
    <div className="w-full min-h-[90vh] bg-background pt-6 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkle className="w-3.5 h-3.5" />
            <span>Carpet & Upholstery Care</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-3"
          >
            Get a Carpet Cleaning Quote
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base leading-relaxed"
          >
            Deep steam extraction, stain removal, and sanitization for home carpets, rugs, and upholstery.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="quote-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full bg-card text-card-foreground rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-md relative overflow-hidden"
            >
              {/* Decorative backdrop glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Stepper progress bar */}
              <div className="bg-secondary/40 rounded-2xl p-4 sm:p-5 mb-8 border border-border/60 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-extrabold text-sm sm:text-base tracking-wide text-foreground uppercase">
                    Step {step}: {step === 1 ? "Cleaning Requirements" : "Your Details"}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground bg-background border border-border px-2.5 py-1 rounded-full">
                    {step} of 2
                  </span>
                </div>
                
                <div className="relative flex items-center justify-between px-6 mt-6 pb-8">
                  {/* Progress track line */}
                  <div className="absolute left-[44px] right-[44px] top-[20px] -translate-y-1/2 h-[3px] bg-border z-0 rounded-full">
                    <motion.div 
                      className="h-full bg-primary rounded-full" 
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: step === 1 ? "0%" : "100%" 
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
                          <Home className="w-4.5 h-4.5" />
                        </motion.div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-white shadow-md">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="hidden sm:block text-[10px] sm:text-xs font-bold text-foreground absolute top-12 whitespace-nowrap">Requirements</span>
                  </div>
                  
                  {/* Step 2 Node */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {step === 2 ? (
                        <motion.div 
                          layoutId="stepper-active-node"
                          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md ring-4 ring-primary/10 border-2 border-primary"
                        >
                          <User className="w-4.5 h-4.5" />
                        </motion.div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                        </div>
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

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Specify Quantities</h3>
                        <p className="text-xs text-muted-foreground">Select the number of carpets, rugs, or upholstery elements requiring service.</p>
                      </div>

                      {errors.counts && (
                        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold rounded-2xl animate-shake">
                          {errors.counts}
                        </div>
                      )}

                      {/* Quantities Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {countsConfig.map((item) => {
                          const IconComponent = item.icon;
                          const countValue = formData[item.key] as number;
                          return (
                            <div
                              key={item.key}
                              className="bg-card border border-border/80 rounded-3xl p-6 flex flex-col items-center justify-between text-center shadow-sm relative overflow-hidden transition-all duration-300 hover:border-primary/40 group min-h-[195px] gap-3"
                            >
                              <div className="w-12 h-12 rounded-2xl bg-secondary/80 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="w-6 h-6" />
                              </div>

                              <span className="text-sm sm:text-base font-extrabold text-foreground tracking-tight block">
                                {item.label}
                              </span>

                              <input
                                type="number"
                                min="0"
                                value={countValue || ""}
                                onChange={(e) => handleCountChange(item.key, e.target.value)}
                                placeholder="0"
                                className="w-28 px-4 py-3 bg-background border border-border/80 rounded-2xl text-center text-lg text-foreground font-bold focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-200"
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Category Dropdowns */}
                      <div className="pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Fabric Type Dropdown */}
                        <div className="space-y-2">
                          <label htmlFor="fabricType" className="block font-bold text-foreground text-sm sm:text-base">
                            Upholstery Fabric Type
                          </label>
                          <Select
                            value={formData.fabricType}
                            onValueChange={handleFabricTypeChange}
                          >
                            <SelectTrigger
                              id="fabricType"
                              className="w-full !h-[50px] px-5 bg-card border border-border/80 rounded-2xl text-foreground flex items-center justify-between focus-visible:ring-2 focus-visible:ring-primary/10 focus-visible:border-primary font-medium"
                            >
                              <SelectValue placeholder="Select fabric type..." />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border border-border text-popover-foreground rounded-2xl shadow-lg z-50">
                              <SelectGroup>
                                <SelectLabel className="font-bold text-xs">Fabric Options</SelectLabel>
                                {fabricTypes.map((type) => (
                                  <SelectItem key={type} value={type} className="hover:bg-secondary cursor-pointer">
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Stain Severity Dropdown */}
                        <div className="space-y-2">
                          <label htmlFor="stainSeverity" className="block font-bold text-foreground text-sm sm:text-base">
                            Stain Severity
                          </label>
                          <Select
                            value={formData.stainSeverity}
                            onValueChange={handleStainSeverityChange}
                          >
                            <SelectTrigger
                              id="stainSeverity"
                              className="w-full !h-[50px] px-5 bg-card border border-border/80 rounded-2xl text-foreground flex items-center justify-between focus-visible:ring-2 focus-visible:ring-primary/10 focus-visible:border-primary font-medium"
                            >
                              <SelectValue placeholder="Select stain severity..." />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border border-border text-popover-foreground rounded-2xl shadow-lg z-50">
                              <SelectGroup>
                                <SelectLabel className="font-bold text-xs">Stain Options</SelectLabel>
                                {stainSeverities.map((severity) => (
                                  <SelectItem key={severity} value={severity} className="hover:bg-secondary cursor-pointer">
                                    {severity}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                      </div>

                      {/* Next Button Footer */}
                      <div className="pt-6 mt-8 border-t border-border/60 flex items-center justify-between">
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-sm transition-all active:scale-97 cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Services</span>
                        </Link>

                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm tracking-wide shadow-md active:scale-97 hover:scale-102 transition-all cursor-pointer"
                        >
                          <span>Next Step</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Name fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="block font-bold text-foreground text-sm sm:text-base">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="e.g. John"
                            className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.firstName ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"}`}
                          />
                          {errors.firstName && (
                            <p className="text-xs font-semibold text-destructive mt-1">{errors.firstName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="surname" className="block font-bold text-foreground text-sm sm:text-base">
                            Surname <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            placeholder="e.g. Doe"
                            className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.surname ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"}`}
                          />
                          {errors.surname && (
                            <p className="text-xs font-semibold text-destructive mt-1">{errors.surname}</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block font-bold text-foreground text-sm sm:text-base">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. john.doe@example.com"
                          className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.email ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"}`}
                        />
                        {errors.email && (
                          <p className="text-xs font-semibold text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block font-bold text-foreground text-sm sm:text-base">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 070 1234 5678"
                          className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.phone ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"}`}
                        />
                        {errors.phone && (
                          <p className="text-xs font-semibold text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* First Line of Address */}
                      <div className="space-y-2">
                        <label htmlFor="addressLine1" className="block font-bold text-foreground text-sm sm:text-base">
                          First Line of Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="addressLine1"
                          name="addressLine1"
                          value={formData.addressLine1}
                          onChange={handleInputChange}
                          placeholder="e.g. 10 Downing Street"
                          className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.addressLine1 ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"}`}
                        />
                        {errors.addressLine1 && (
                          <p className="text-xs font-semibold text-destructive mt-1">{errors.addressLine1}</p>
                        )}
                      </div>

                      {/* Postcode */}
                      <div className="space-y-2">
                        <label htmlFor="postcode" className="block font-bold text-foreground text-sm sm:text-base">
                          Postcode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleInputChange}
                          placeholder="e.g. SW1A 2AA"
                          className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.postcode ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"}`}
                        />
                        {errors.postcode && (
                          <p className="text-xs font-semibold text-destructive mt-1">{errors.postcode}</p>
                        )}
                      </div>

                      {/* Comments */}
                      <div className="space-y-2">
                        <label htmlFor="comments" className="block font-bold text-foreground text-sm sm:text-base">
                          Comments
                        </label>
                        <textarea
                          id="comments"
                          name="comments"
                          value={formData.comments}
                          onChange={handleInputChange}
                          placeholder="e.g. Please let us know if you have any special requirements or additional details."
                          rows={3}
                          className="w-full px-5 py-3.5 bg-card border border-border/80 rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 focus:border-primary resize-y"
                        />
                      </div>

                      {/* Schedule a Site Visit */}
                      <div className="space-y-2">
                        <label className="block font-bold text-foreground text-sm sm:text-base">
                          Schedule a Site Visit
                        </label>
                        <Popover open={isSiteVisitOpen} onOpenChange={setIsSiteVisitOpen}>
                          <PopoverTrigger
                            type="button"
                            className="w-full px-5 py-3.5 bg-card border border-border/80 rounded-2xl text-foreground text-left outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 focus:border-primary flex items-center justify-between cursor-pointer"
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

                      {/* How would you like to be contacted? */}
                      <div className="space-y-3 pt-2">
                        <label className="block font-bold text-foreground text-sm sm:text-base">
                          How would you like to be contacted? <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {contactMethods.map((method) => {
                            const isSelected = formData.contactMethod === method;
                            return (
                              <button
                                key={method}
                                type="button"
                                onClick={() => selectContactMethod(method)}
                                className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${isSelected
                                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                                    : "border-border/80 bg-card text-foreground hover:bg-muted"
                                  }`}
                              >
                                {method}
                              </button>
                            );
                          })}
                        </div>
                        {errors.contactMethod && (
                          <p className="text-xs font-semibold text-destructive mt-1">{errors.contactMethod}</p>
                        )}
                      </div>

                      {submitError && (
                        <div className="pt-4 text-red-500 font-medium text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                          {submitError}
                        </div>
                      )}

                      {/* Form Navigation buttons */}
                      <div className="pt-6 mt-8 border-t border-border/60 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-sm transition-all active:scale-97 cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-sm tracking-wide shadow-md active:scale-97 hover:scale-102 transition-all cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
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
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-full text-center"
            >
              <div className="bg-card text-card-foreground rounded-3xl p-8 sm:p-12 border border-border shadow-lg relative overflow-hidden flex flex-col items-center">
                
                {/* Success backdrop glows */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.15 }}
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md mb-6 relative z-10"
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4 relative z-10">
                  Request Submitted!
                </h2>

                <p className="text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed mb-8 relative z-10">
                  Thank you, <span className="font-bold text-foreground">{formData.firstName}</span>. Your request for Carpet & Upholstery Cleaning has been received. Our team will review the details and reach out with a custom quote within 24 hours.
                </p>

                {/* Enquiries Summary box */}
                <div className="w-full max-w-lg bg-secondary/40 rounded-2xl p-5 mb-8 border border-border/80 text-left text-xs sm:text-sm space-y-4 relative z-10">
                  <h4 className="font-extrabold text-foreground border-b border-border/60 pb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Booking Details Summary</span>
                  </h4>

                  {/* Quantity list */}
                  <div>
                    <span className="font-bold text-foreground text-xs uppercase tracking-wider text-muted-foreground block mb-2">Items to Clean:</span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-foreground bg-background/50 p-3.5 rounded-xl border border-border/50">
                      {countsConfig.map((item) => {
                        const val = formData[item.key];
                        if (val === 0) return null;
                        return (
                          <div key={item.key} className="flex justify-between items-center py-0.5">
                            <span className="font-medium text-muted-foreground">{item.label}:</span>
                            <span className="font-bold text-primary">{val}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="pt-2.5 border-t border-border/60 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground font-medium block">Fabric Type:</span>
                      <span className="font-bold text-foreground">{formData.fabricType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium block">Stain Severity:</span>
                      <span className="font-bold text-foreground">{formData.stainSeverity}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-3 border-t border-border/60 space-y-1.5 text-xs">
                    <p>
                      <span className="text-muted-foreground font-medium">Name:</span>{" "}
                      <span className="font-semibold text-foreground">{formData.firstName} {formData.surname}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground font-medium">Address:</span>{" "}
                      <span className="font-semibold text-foreground">{formData.addressLine1}, {formData.postcode}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground font-medium">Preference:</span>{" "}
                      <span className="font-semibold text-foreground">{formData.contactMethod}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground font-medium">Email:</span> <span className="text-foreground">{formData.email}</span>
                    </p>
                    <p>
                      <span className="text-muted-foreground font-medium">Phone:</span> <span className="text-foreground">{formData.phone}</span>
                    </p>
                    {formData.comments && (
                      <p className="pt-2 border-t border-border/60 mt-2">
                        <span className="font-medium block text-muted-foreground mb-0.5">Comments:</span>
                        <span className="text-foreground italic font-normal break-words block bg-background/50 p-2.5 rounded-lg border border-border/40">
                          "{formData.comments}"
                        </span>
                      </p>
                    )}
                    {formData.siteVisitDate && (
                      <p className="pt-2 border-t border-border/60 mt-2">
                        <span className="font-medium block text-muted-foreground mb-0.5">Scheduled Site Visit:</span>
                        <span className="text-foreground font-semibold block bg-background/50 p-2.5 rounded-lg border border-border/40">
                          {format(new Date(formData.siteVisitDate + "T00:00:00"), "PPP")}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA Navigation buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center relative z-10">
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
                  </Link>
                </div>

                {/* Secure Badge */}
                <div className="mt-8 pt-6 border-t border-border/60 w-full flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Fully Encrypted & Confidential Enquiry System</span>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
