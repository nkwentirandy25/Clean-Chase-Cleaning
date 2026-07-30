"use client";

import React, { useState, useEffect } from "react";
import { use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Check,
  FileText,
  Loader2,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ServiceInfo {
  id: number;
  name: string;
  description: string;
}

const serviceMap: Record<string, ServiceInfo> = {
  "office-cleaning": {
    id: 1,
    name: "Office Cleaning",
    description: "Elevate your workspace standards with our comprehensive office sanitization services. We perform thorough desk dustings, high-traffic floor vacuuming, washroom disinfecting, and surface polishing to ensure a fresh, healthy, and high-productivity environment for your entire team and visiting clients.",
  },
  "business-site-cleaning": {
    id: 2,
    name: "Business Site Cleaning",
    description: "Maintain a flawless physical brand presence with our premium retail and corporate facility upkeep. From gleaming display glass and polished stone entrances to spotless retail checkout zones and tidy showroom floors, we create a welcoming, professional atmosphere that delights your customers.",
  },
  "pubs-nightclubs-restaurants": {
    id: 4,
    name: "Pubs, Nightclubs & Restaurants Cleaning",
    description: "Maintain pristine hygiene ratings with our specialist front-of-house hospitality sanitation. We thoroughly degrease bar counters, sanitize restaurant table surfaces, deep-clean customer restrooms, vacuum seating areas, and wash floors, leaving your establishment ready for flawless food service.",
  },
  "commercial-kitchen": {
    id: 6,
    name: "Commercial Kitchen Cleaning",
    description: "Stay compliant with local health authorities through our heavy-duty kitchen structure sanitation. We deep-clean non-slip floors, scrub wall tiles, sanitize stainless steel work benches, and deep-clean sink areas, removing grease build-ups and food residues to guarantee a highly sterile cooking environment.",
  },
  "healthcare-facilities": {
    id: 7,
    name: "Health Care Facilities Cleaning",
    description: "Strict, medical-grade disinfection services designed for doctors' offices, dental clinics, diagnostic labs, and care homes. We utilize high-standard disinfectants to eliminate pathogens on contact points, waiting room furniture, clinical beds, and treatment room surfaces.",
  },
  "school-cleaning": {
    id: 9,
    name: "School Cleaning",
    description: "Create a safe and thriving learning environment for students and staff alike. We provide comprehensive sanitization of classrooms, desks, whiteboards, computer labs, library spaces, gymnasiums, and student cafeterias using non-toxic, child-safe cleaning products.",
  },
  "agricultural-cleaning": {
    id: 14,
    name: "Agricultural Cleaning",
    description: "Professional sanitation and pressure wash solutions for agricultural facilities, livestock barns, storage sheds, and farm machinery. We remove heavy organic matter, disinfect feeding zones, and sanitize pathways to prevent disease and maintain strict agricultural hygiene standards.",
  },
  "store-cleaning": {
    id: 15,
    name: "Store Cleaning",
    description: "Keep your retail store, supermarket, or fashion boutique spotless and inviting for customers. We handle glass window polishing, deep cleaning of checkout zones, aisle floor polishing, and shelf dusting to ensure a premium shopping experience that enhances your brand image.",
  },
};

export default function ServiceQuotePage({ params }: { params: Promise<{ serviceSlug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const serviceSlug = resolvedParams.serviceSlug;
  const serviceInfo = serviceMap[serviceSlug];

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    addressLine1: "",
    postcode: "",
    comments: "",
    contactMethod: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle loading or invalid service route redirect
  useEffect(() => {
    if (serviceSlug && !serviceInfo) {
      router.push("/services");
    }
  }, [serviceSlug, serviceInfo, router]);

  if (!serviceInfo) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
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
      contactMethod: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const contactMethods = ["What's app", "Call", "Email", "Text message"];

  return (
    <div className="w-full min-h-[90vh] bg-background pt-6 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-3"
          >
            Get a Quote
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base leading-relaxed"
          >
            Fill out the details below to request a tailored cleaning quote for <strong className="text-foreground">{serviceInfo.name}</strong>.
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
                      className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.firstName ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
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
                      className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.surname ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.email ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.phone ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.addressLine1 ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
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
                    className={`w-full px-5 py-3.5 bg-card border rounded-2xl text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/10 ${errors.postcode ? "border-destructive focus:border-destructive animate-shake" : "border-border/80 focus:border-primary"
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

                {/* Form Footer Separator & Navigation */}
                <div className="pt-6 mt-8 border-t border-border/60 flex items-center justify-between">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-sm transition-all active:scale-97 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Link>

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
                  Thank you, <span className="font-bold text-foreground">{formData.firstName}</span>. Your request for <span className="font-bold text-foreground">{serviceInfo.name}</span> has been received. Our team will review your contact details and reach out to you with a custom quote within 24 hours.
                </p>

                {/* Submitted Summary box */}
                <div className="w-full max-w-md bg-secondary/40 rounded-2xl p-5 mb-8 border border-border/80 text-left text-xs sm:text-sm space-y-2.5 relative z-10">
                  <h4 className="font-extrabold text-foreground border-b border-border/60 pb-2 mb-2 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>Enquiry Summary</span>
                  </h4>
                  <p>
                    <span className="text-muted-foreground font-medium">Service Inquired:</span>{" "}
                    <span className="font-bold text-primary">{serviceInfo.name}</span>
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
