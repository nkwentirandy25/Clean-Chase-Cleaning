"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  User,
  Check,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  CalendarIcon,
  Home,
  Hammer,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

export default function AfterBuildersQuote() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);

  // Scroll to top on step change/success
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, isSubmitted]);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Property & Work Details
    propertySize: "",
    bathrooms: "",
    livingRooms: "",
    workType: "New Build", // "New Build" | "Extension" | "Renovation" | "Other"
    completionDate: "",

    // Step 2: Your Details
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

  const selectWorkType = (type: string) => {
    setFormData((prev) => ({ ...prev, workType: type }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.propertySize.trim()) newErrors.propertySize = "Property size is required";
      if (!formData.bathrooms.trim()) newErrors.bathrooms = "Number of bathrooms is required";
      if (!formData.livingRooms.trim()) newErrors.livingRooms = "Number of living rooms is required";
      if (!formData.completionDate) newErrors.completionDate = "Completion date is required";
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
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  const handleReset = () => {
    setFormData({
      propertySize: "",
      bathrooms: "",
      livingRooms: "",
      workType: "New Build",
      completionDate: "",
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
    setErrors({});
    setStep(1);
    setIsSubmitted(false);
  };

  const contactMethods = ["What's app", "Call", "Email", "Text message"];

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as any } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: "easeIn" as any } }
  };

  if (isSubmitted) {
    return (
      <div className="w-full min-h-[90vh] bg-background pt-10 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-card text-card-foreground rounded-3xl p-8 sm:p-12 border border-border shadow-lg relative overflow-hidden flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.15 }}
              className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-md mb-6"
            >
              <Check className="w-8 h-8 stroke-[3]" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">Request Submitted!</h2>
            <p className="text-muted-foreground max-w-md text-center text-sm sm:text-base leading-relaxed mb-8">
              Thank you, <span className="font-bold text-foreground">{formData.firstName}</span>. Your request for <span className="font-bold text-foreground">After Builders Cleaning</span> has been received. Our team will review your details and reach out with a custom quote within 24 hours.
            </p>

            <div className="w-full max-w-md bg-secondary/50 rounded-2xl p-5 mb-8 border border-border/80 text-left text-xs sm:text-sm space-y-2.5">
              <h4 className="font-extrabold text-foreground border-b border-border/60 pb-2 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                <FileText className="w-4 h-4 text-primary" />
                <span>Enquiry Summary</span>
              </h4>
              <p><span className="text-muted-foreground font-medium">Work Type:</span> <span className="font-bold text-foreground">{formData.workType}</span></p>
              <p><span className="text-muted-foreground font-medium">Property Size:</span> <span className="font-semibold text-foreground">{formData.propertySize}</span></p>
              <p><span className="text-muted-foreground font-medium">Bathrooms / Living Rooms:</span> <span className="font-semibold text-foreground">{formData.bathrooms} Bath, {formData.livingRooms} Living</span></p>
              <p><span className="text-muted-foreground font-medium">Preferred Completion Date:</span> <span className="font-semibold text-foreground">{formData.completionDate ? format(new Date(formData.completionDate + "T00:00:00"), "PPP") : "Not specified"}</span></p>
              {formData.siteVisitDate && (
                <p><span className="text-muted-foreground font-medium">Scheduled Site Visit:</span> <span className="font-semibold text-foreground">{format(new Date(formData.siteVisitDate + "T00:00:00"), "PPP")}</span></p>
              )}
              <p><span className="text-muted-foreground font-medium">Name:</span> <span className="font-semibold text-foreground">{formData.firstName} {formData.surname}</span></p>
              <p><span className="text-muted-foreground font-medium">Address:</span> <span className="font-semibold text-foreground">{formData.addressLine1}, {formData.postcode}</span></p>
              <p><span className="text-muted-foreground font-medium">Contact Preference:</span> <span className="font-semibold text-foreground">{formData.contactMethod}</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <button 
                onClick={handleReset}
                className="w-full text-center px-5 py-3 rounded-xl border border-border hover:bg-muted font-bold text-xs sm:text-sm transition-all"
              >
                Submit Another Quote
              </button>
              <Link 
                href="/services" 
                className="w-full text-center px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center"
              >
                Back to Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90vh] bg-background pt-4 pb-12 md:pt-6 md:pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-3">
            Get a Quote
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Get your renovated or newly built property perfectly clean and ready to move in with our specialized After Builders deep clean.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground mb-2">
            <span>Progress</span>
            <span>Step {step} of 2</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out" 
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="bg-card text-card-foreground rounded-3xl p-6 sm:p-8 border border-border shadow-lg space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                <Hammer className="w-5 h-5 text-primary" />
                <span>Step 1: Property & Work Details</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Property Size */}
                <div className="space-y-2 md:col-span-2 text-left">
                  <label htmlFor="propertySize" className="block font-bold text-foreground text-sm sm:text-base">
                    Property Size <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="propertySize"
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleInputChange}
                    placeholder="e.g. 1,500 sq ft or 3 Bedroom House"
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.propertySize ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.propertySize && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.propertySize}</p>
                  )}
                </div>

                {/* Bathrooms */}
                <div className="space-y-2 text-left">
                  <label htmlFor="bathrooms" className="block font-bold text-foreground text-sm sm:text-base">
                    Bathrooms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="e.g. 2"
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.bathrooms ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.bathrooms && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.bathrooms}</p>
                  )}
                </div>

                {/* Living Rooms */}
                <div className="space-y-2 text-left">
                  <label htmlFor="livingRooms" className="block font-bold text-foreground text-sm sm:text-base">
                    Living Rooms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="livingRooms"
                    name="livingRooms"
                    value={formData.livingRooms}
                    onChange={handleInputChange}
                    placeholder="e.g. 1"
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.livingRooms ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.livingRooms && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.livingRooms}</p>
                  )}
                </div>

                {/* Work Type Selection */}
                <div className="space-y-3 md:col-span-2 text-left">
                  <label className="block font-bold text-foreground text-sm sm:text-base">
                    What work was done?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {["New Build", "Extension", "Renovation", "Other"].map((type) => {
                      const isSelected = formData.workType === type;
                      return (
                        <button
                          type="button"
                          key={type}
                          onClick={() => selectWorkType(type)}
                          className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-sm scale-102"
                              : "border-border/80 bg-card text-foreground hover:bg-muted"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* When do you need it done? */}
                <div className="space-y-2 md:col-span-2 text-left">
                  <label className="block font-bold text-foreground text-sm sm:text-base">
                    When you need to get it done? <span className="text-red-500">*</span>
                  </label>
                  <Popover open={isCompletionOpen} onOpenChange={setIsCompletionOpen}>
                    <PopoverTrigger
                      type="button"
                      className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground text-left outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 flex items-center justify-between cursor-pointer ${errors.completionDate ? "border-destructive" : "border-border/80 focus:border-primary"}`}
                    >
                      <span className={formData.completionDate ? "text-foreground" : "text-muted-foreground/60"}>
                        {formData.completionDate
                          ? format(new Date(formData.completionDate + "T00:00:00"), "PPP")
                          : "Pick a date"}
                      </span>
                      <CalendarIcon className="w-4 h-4 text-muted-foreground/80" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover border border-border rounded-2xl shadow-lg z-50" align="start">
                      <ShadcnCalendar
                        mode="single"
                        selected={formData.completionDate ? new Date(formData.completionDate + "T00:00:00") : undefined}
                        onSelect={(date) => {
                          const dateString = date ? format(date, "yyyy-MM-dd") : "";
                          setFormData((prev) => ({ ...prev, completionDate: dateString }));
                          setIsCompletionOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.completionDate && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.completionDate}</p>
                  )}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-end pt-6 border-t border-border mt-6">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs sm:text-sm tracking-wide shadow-md active:scale-97 hover:scale-102 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="step2"
              onSubmit={handleSubmit}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="bg-card text-card-foreground rounded-3xl p-6 sm:p-8 border border-border shadow-lg space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <span>Step 2: Your Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* First Name */}
                <div className="space-y-2 text-left">
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.firstName ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.firstName && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Surname */}
                <div className="space-y-2 text-left">
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.surname ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.surname && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.surname}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2 md:col-span-2 text-left">
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.email ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.email && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2 md:col-span-2 text-left">
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.phone ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.phone && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* First Line of Address */}
                <div className="space-y-2 md:col-span-2 text-left">
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.addressLine1 ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.addressLine1 && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.addressLine1}</p>
                  )}
                </div>

                {/* Postcode */}
                <div className="space-y-2 md:col-span-2 text-left">
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.postcode ? "border-destructive focus:border-destructive" : "border-border/80 focus:border-primary"}`}
                  />
                  {errors.postcode && (
                    <p className="text-xs font-semibold text-destructive mt-1">{errors.postcode}</p>
                  )}
                </div>

                {/* Comments */}
                <div className="space-y-2 md:col-span-2 text-left">
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
                <div className="space-y-2 md:col-span-2 text-left">
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

                {/* Contact Method */}
                <div className="space-y-3 pt-2 md:col-span-2 text-left">
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
              </div>

              {/* Navigation buttons */}
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
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
