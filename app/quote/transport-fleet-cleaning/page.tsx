"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function TransportFleetCleaningQuote() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);
  
  // Transport & Fleet Cleaning Form State
  const [formData, setFormData] = useState({
    jobType: "",
    numVehicles: "",
    frequency: "",
    additionalInfo: "",
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    addressLine1: "",
    postcode: "",
    companyName: "",
    contactMethod: "",
  });

  // Field validation helper
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.jobType) newErrors.jobType = "Please select a type of job";
      if (!formData.numVehicles) newErrors.numVehicles = "Please select the number of vehicles";
      if (!formData.frequency) newErrors.frequency = "Please select the frequency of cleaning";
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
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
      if (!formData.contactMethod) newErrors.contactMethod = "Please select a preferred contact method";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(1)) {
      setStep(2);
      setErrors({});
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(2)) {
      setStep(3); // success state
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({
      jobType: "",
      numVehicles: "",
      frequency: "",
      additionalInfo: "",
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      addressLine1: "",
      postcode: "",
      companyName: "",
      contactMethod: "",
    });
    setStep(1);
    setErrors({});
  };

  return (
    <div className="w-full min-h-[90vh] bg-background pt-4 pb-12 md:pt-6 md:pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      
      <div className="w-full max-w-5xl">
        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">
            Get a Quote
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Enquire below about professional mobile fleet cleaning for commercial operators. Please note, we don't clean single private vehicles other than for MOT Cleans and Graphics/Livery Removal.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step < 3 ? (
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
                      Step {step}: {step === 1 ? "Your Requirements" : "Your Details"}
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
                        animate={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
                        transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      />
                    </div>
                    
                    {/* Step 1 Node */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {step === 1 ? (
                          <motion.div 
                            layoutId="truck-progress-node" 
                            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md ring-4 ring-primary/10 border-2 border-primary"
                          >
                            <Truck className="w-4.5 h-4.5 animate-pulse" />
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
                        {step === 1 ? (
                          <div className="w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                          </div>
                        ) : (
                          <motion.div 
                            layoutId="truck-progress-node" 
                            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md ring-4 ring-primary/10 border-2 border-primary"
                          >
                            <Truck className="w-4.5 h-4.5" />
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
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        {/* Type of Job */}
                        <div className="space-y-3">
                          <label className="block text-sm sm:text-base font-extrabold tracking-wide text-foreground">
                            Type of Job <span className="text-destructive font-bold">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {["Fleet Clean", "RCV Clean", "MOT Clean", "Livery Removal"].map((job) => {
                              const isSelected = formData.jobType === job;
                              return (
                                <button
                                  type="button"
                                  key={job}
                                  onClick={() => setFormData({ ...formData, jobType: job })}
                                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 border cursor-pointer ${
                                    isSelected
                                      ? "bg-primary text-primary-foreground border-primary shadow-sm scale-102"
                                      : "bg-background hover:bg-muted text-foreground border-border hover:border-border/80"
                                  }`}
                                >
                                  {job}
                                </button>
                              );
                            })}
                          </div>
                          {errors.jobType && (
                            <p className="text-destructive text-xs font-semibold">{errors.jobType}</p>
                          )}
                        </div>

                        {/* Number of Vehicles */}
                        <div className="space-y-3">
                          <label className="block text-sm sm:text-base font-extrabold tracking-wide text-foreground">
                            Number of vehicles? <span className="text-destructive font-bold">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {["5 to 20 Vehicles", "20 to 50 Vehicles", "50 to 200 Vehicles", "200+ Vehicles"].map((num) => {
                              const isSelected = formData.numVehicles === num;
                              return (
                                <button
                                  type="button"
                                  key={num}
                                  onClick={() => setFormData({ ...formData, numVehicles: num })}
                                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 border cursor-pointer ${
                                    isSelected
                                      ? "bg-primary text-primary-foreground border-primary shadow-sm scale-102"
                                      : "bg-background hover:bg-muted text-foreground border-border hover:border-border/80"
                                  }`}
                                >
                                  {num}
                                </button>
                              );
                            })}
                          </div>
                          {errors.numVehicles && (
                            <p className="text-destructive text-xs font-semibold">{errors.numVehicles}</p>
                          )}
                        </div>

                        {/* Frequency */}
                        <div className="space-y-3">
                          <label className="block text-sm sm:text-base font-extrabold tracking-wide text-foreground">
                            Frequency of cleaning? <span className="text-destructive font-bold">*</span>
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {["One-Off", "Weekly", "Fortnightly", "Monthly"].map((freq) => {
                              const isSelected = formData.frequency === freq;
                              return (
                                <button
                                  type="button"
                                  key={freq}
                                  onClick={() => setFormData({ ...formData, frequency: freq })}
                                  className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 border cursor-pointer ${
                                    isSelected
                                      ? "bg-primary text-primary-foreground border-primary shadow-sm scale-102"
                                      : "bg-background hover:bg-muted text-foreground border-border hover:border-border/80"
                                  }`}
                                >
                                  {freq}
                                </button>
                              );
                            })}
                          </div>
                          {errors.frequency && (
                            <p className="text-destructive text-xs font-semibold">{errors.frequency}</p>
                          )}
                        </div>

                        {/* Further Info */}
                        <div className="space-y-2">
                          <label htmlFor="additional-info" className="block text-sm sm:text-base font-extrabold tracking-wide text-foreground">
                            Any Further Information
                          </label>
                          <textarea
                            id="additional-info"
                            rows={4}
                            value={formData.additionalInfo}
                            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                            placeholder="Your Message"
                            className="w-full px-4 py-3 rounded-2xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm resize-none"
                          />
                        </div>

                        {/* Next button */}
                        <div className="flex justify-end pt-4 border-t border-border">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wide shadow-md active:scale-97 hover:scale-102 flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>Next step</span>
                            <ArrowRight className="w-4 h-4 stroke-[3]" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* Step 2 Form fields */
                      <motion.div
                        key="step2"
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

                        {/* Company Name Row (Full width) */}
                        <div className="space-y-2">
                          <label htmlFor="company-name" className="block text-sm font-extrabold tracking-wide text-foreground">
                            Company Name <span className="text-destructive font-bold">*</span>
                          </label>
                          <input
                            type="text"
                            id="company-name"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="e.g. 247 Cleaning Services"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          />
                          {errors.companyName && (
                            <p className="text-destructive text-xs font-semibold">{errors.companyName}</p>
                          )}
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
                            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-97 hover:scale-102 flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>Submit Request</span>
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          ) : (
            /* Step 3: Success Confirmation State */
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
                  Thank you, <span className="font-bold text-foreground">{formData.firstName}</span>. Your request for <span className="font-bold text-foreground">Transport & Fleet Cleaning</span> has been received. Our team will analyze your requirements and get back to you with a custom quote within 24 hours.
                </p>

                {/* Submitted Summary box */}
                <div className="w-full max-w-md bg-secondary/50 rounded-2xl p-5 mb-8 border border-border/80 text-left text-xs sm:text-sm space-y-2">
                  <h4 className="font-extrabold text-foreground border-b border-border/60 pb-2 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Enquiry Summary</span>
                  </h4>
                  <p><span className="text-muted-foreground font-medium">Job Type:</span> <span className="font-semibold text-foreground">{formData.jobType}</span></p>
                  <p><span className="text-muted-foreground font-medium">Vehicles Quantity:</span> <span className="font-semibold text-foreground">{formData.numVehicles}</span></p>
                  <p><span className="text-muted-foreground font-medium">Cleaning Frequency:</span> <span className="font-semibold text-foreground">{formData.frequency}</span></p>
                  <p><span className="text-muted-foreground font-medium">Contact Preference:</span> <span className="font-semibold text-foreground">{formData.contactMethod}</span></p>
                  {formData.additionalInfo && (
                    <p><span className="text-muted-foreground font-medium">Additional Info:</span> <span className="italic block mt-1 bg-background p-2.5 rounded-lg border border-border text-foreground">{formData.additionalInfo}</span></p>
                  )}
                  <div className="pt-2.5 border-t border-border/65 flex flex-col gap-1 text-xs text-muted-foreground">
                    <p><span className="font-medium">Contact Email:</span> <span className="text-foreground">{formData.email}</span></p>
                    <p><span className="font-medium">Contact Phone:</span> <span className="text-foreground">{formData.phone}</span></p>
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
