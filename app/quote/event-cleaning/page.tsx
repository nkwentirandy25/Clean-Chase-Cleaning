"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Check,
  FileText,
  Loader2,
  Sparkles,
  ShieldCheck,
  CalendarIcon,
  PartyPopper,
  Sparkle
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CleaningPhases {
  preCleaning: boolean;
  duringEvent: boolean;
  postCleaning: boolean;
  wasteManagement: boolean;
}

export default function EventCleaningQuotePage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [phases, setPhases] = useState<CleaningPhases>({
    preCleaning: false,
    duringEvent: false,
    postCleaning: false,
    wasteManagement: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    addressLine1: "",
    postcode: "",
    comments: "",
    siteVisitDate: "",
    contactMethod: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handlePhaseToggle = (phase: keyof CleaningPhases) => {
    setPhases((prev) => {
      const updated = { ...prev, [phase]: !prev[phase] };
      // Clear phase selection error if at least one is selected
      if (Object.values(updated).some(Boolean) && errors.phases) {
        setErrors((prevErr) => {
          const copy = { ...prevErr };
          delete copy.phases;
          return copy;
        });
      }
      return updated;
    });
  };

  const handleNextStep = () => {
    const isAnyPhaseSelected = Object.values(phases).some(Boolean);
    if (!isAnyPhaseSelected) {
      setErrors({ phases: "Please select at least one cleaning phase to continue." });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName: "Event Cleaning",
          ...formData,
          ...phases,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request. Please try again.");
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      addressLine1: "",
      postcode: "",
      comments: "",
      siteVisitDate: "",
      contactMethod: "",
    });
    setPhases({
      preCleaning: false,
      duringEvent: false,
      postCleaning: false,
      wasteManagement: false,
    });
    setErrors({});
    setStep(1);
    setIsSubmitted(false);
  };

  const contactMethods = ["What's app", "Call", "Email", "Text message"];

  return (
    <div className="w-full min-h-[90vh] bg-background pt-6 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Event cleaning services</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-3"
          >
            Get an Event Cleaning Quote
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base leading-relaxed"
          >
            Please complete the details below to request a tailored quote for your upcoming event.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key={step === 1 ? "step-1" : "step-2"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full bg-card text-card-foreground rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-md relative overflow-hidden"
            >
              {/* Decorative backdrop glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

              {/* Progress Stepper indicator */}
              <div className="bg-secondary/40 rounded-2xl p-4 sm:p-5 mb-8 border border-border/60 relative z-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-extrabold text-sm sm:text-base tracking-wide text-foreground uppercase">
                    Step {step}: {step === 1 ? "Select Cleaning Phases" : "Contact & Booking Details"}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground bg-background border border-border px-2.5 py-1 rounded-full">
                    {step} of 2
                  </span>
                </div>
                <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: step === 1 ? "50%" : "100%" }}
                  />
                </div>
              </div>

              {step === 1 ? (
                /* STEP 1: Checklist of Phases */
                <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      Which cleaning phases do you require? <span className="text-red-500">*</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      You can select multiple phases based on your event structure.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    {/* Pre-cleaning card */}
                    <button
                      type="button"
                      onClick={() => handlePhaseToggle("preCleaning")}
                      className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-sm relative group flex flex-col justify-between min-h-[160px] ${
                        phases.preCleaning
                          ? "bg-primary/5 border-primary ring-2 ring-primary/10"
                          : "bg-card border-border hover:bg-muted hover:border-border/80"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-extrabold text-base sm:text-lg text-foreground">Pre-cleaning</span>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                            phases.preCleaning
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border bg-background group-hover:border-muted-foreground"
                          }`}>
                            {phases.preCleaning && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          Preparing the venue beforehand. Setting up bins, pre-event dusting, and sanitation.
                        </p>
                      </div>
                    </button>

                    {/* During Event cleaning card */}
                    <button
                      type="button"
                      onClick={() => handlePhaseToggle("duringEvent")}
                      className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-sm relative group flex flex-col justify-between min-h-[160px] ${
                        phases.duringEvent
                          ? "bg-primary/5 border-primary ring-2 ring-primary/10"
                          : "bg-card border-border hover:bg-muted hover:border-border/80"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-extrabold text-base sm:text-lg text-foreground">During Event Cleaning</span>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                            phases.duringEvent
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border bg-background group-hover:border-muted-foreground"
                          }`}>
                            {phases.duringEvent && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          Active upkeep during the event. Restroom maintenance, rubbish clearance, and immediate spill cleanups.
                        </p>
                      </div>
                    </button>

                    {/* Post-cleaning card */}
                    <button
                      type="button"
                      onClick={() => handlePhaseToggle("postCleaning")}
                      className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-sm relative group flex flex-col justify-between min-h-[160px] ${
                        phases.postCleaning
                          ? "bg-primary/5 border-primary ring-2 ring-primary/10"
                          : "bg-card border-border hover:bg-muted hover:border-border/80"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-extrabold text-base sm:text-lg text-foreground">Post-cleaning</span>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                            phases.postCleaning
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border bg-background group-hover:border-muted-foreground"
                          }`}>
                            {phases.postCleaning && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          Complete venue recovery. Breakdown deep cleaning, full waste removal, floor scrubbing, and returning venue space to its original state.
                        </p>
                      </div>
                    </button>

                    {/* Waste Management card */}
                    <button
                      type="button"
                      onClick={() => handlePhaseToggle("wasteManagement")}
                      className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-sm relative group flex flex-col justify-between min-h-[160px] ${
                        phases.wasteManagement
                          ? "bg-primary/5 border-primary ring-2 ring-primary/10"
                          : "bg-card border-border hover:bg-muted hover:border-border/80"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-extrabold text-base sm:text-lg text-foreground">Waste Management</span>
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                            phases.wasteManagement
                              ? "bg-primary border-primary text-primary-foreground"
                              : "border-border bg-background group-hover:border-muted-foreground"
                          }`}>
                            {phases.wasteManagement && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          Dedicated rubbish disposal and recycling. Bin placement, waste sorting, and eco-friendly disposal solutions for events of any scale.
                        </p>
                      </div>
                    </button>
                  </div>

                  {errors.phases && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm font-semibold text-destructive mt-3"
                    >
                      {errors.phases}
                    </motion.p>
                  )}

                  {/* Navigation Footer */}
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
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* STEP 2: Contact Form (Matching the user-supplied layout) */
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {/* First Name & Surname */}
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
                        className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${
                          errors.firstName ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
                        }`}
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
                        className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${
                          errors.surname ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
                        }`}
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
                      className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${
                        errors.email ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
                      }`}
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
                      className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${
                        errors.phone ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
                      }`}
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
                      className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${
                        errors.addressLine1 ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
                      }`}
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
                      className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${
                        errors.postcode ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
                      }`}
                    />
                    {errors.postcode && (
                      <p className="text-xs font-semibold text-destructive mt-1">{errors.postcode}</p>
                    )}
                  </div>

                  {/* Comments / Message */}
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
                            className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                              isSelected
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

                  {/* Form Footer Separator & Navigation */}
                  {submitError && (
                    <div className="pt-4 text-red-500 font-medium text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-left">
                      {submitError}
                    </div>
                  )}

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
                </form>
              )}
            </motion.div>
          ) : (
            /* Success Confirmation State */
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
                  Thank you, <span className="font-bold text-foreground">{formData.firstName}</span>. Your request for <span className="font-bold text-foreground">Event Cleaning</span> has been received. Our team will review details and reach out to you with a custom quote within 24 hours.
                </p>

                {/* Submitted Summary box */}
                <div className="w-full max-w-md bg-secondary/40 rounded-2xl p-5 mb-8 border border-border/80 text-left text-xs sm:text-sm space-y-2.5 relative z-10">
                  <h4 className="font-extrabold text-foreground border-b border-border/60 pb-2 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Enquiry Summary</span>
                  </h4>
                  <p>
                    <span className="text-muted-foreground font-medium">Service Inquired:</span>{" "}
                    <span className="font-bold text-primary">Event Cleaning</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground font-medium">Phases Selected:</span>{" "}
                    <span className="font-bold text-foreground text-xs bg-card px-2 py-1 border border-border rounded-lg inline-block mt-0.5">
                      {[
                        phases.preCleaning && "Pre-cleaning",
                        phases.duringEvent && "During Event Cleaning",
                        phases.postCleaning && "Post-cleaning",
                        phases.wasteManagement && "Waste Management",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground font-medium">Name:</span>{" "}
                    <span className="font-semibold text-foreground">
                      {formData.firstName} {formData.surname}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground font-medium">Address:</span>{" "}
                    <span className="font-semibold text-foreground">
                      {formData.addressLine1}, {formData.postcode}
                    </span>
                  </p>
                  <div className="pt-2 border-t border-border/60 flex flex-col gap-1 text-xs text-muted-foreground">
                    <p>
                      <span className="font-medium">Preference:</span>{" "}
                      <span className="text-foreground font-semibold">{formData.contactMethod}</span>
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> <span className="text-foreground">{formData.email}</span>
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> <span className="text-foreground">{formData.phone}</span>
                    </p>
                    {formData.comments && (
                      <p className="pt-1.5 border-t border-border/60 mt-1.5">
                        <span className="font-medium block text-muted-foreground mb-0.5">Comments:</span>
                        <span className="text-foreground italic font-normal break-words block bg-secondary/20 p-2 rounded-lg border border-border/40">
                          "{formData.comments}"
                        </span>
                      </p>
                    )}
                    {formData.siteVisitDate && (
                      <p className="pt-1.5 border-t border-border/60 mt-1.5">
                        <span className="font-medium block text-muted-foreground mb-0.5">Scheduled Site Visit:</span>
                        <span className="text-foreground font-semibold block bg-secondary/20 p-2 rounded-lg border border-border/40">
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
