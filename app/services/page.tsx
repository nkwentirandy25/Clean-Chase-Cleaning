"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Shield, CheckCircle2 } from "lucide-react";

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  image: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    name: "Office Cleaning",
    description: "Elevate your workspace standards with our comprehensive office sanitization services. We perform thorough desk dustings, high-traffic floor vacuuming, washroom disinfecting, and surface polishing to ensure a fresh, healthy, and high-productivity environment for your entire team and visiting clients.",
    image: "/assets/services/office_cleaning.png",
  },
  {
    id: 2,
    name: "Business Site Cleaning",
    description: "Maintain a flawless physical brand presence with our premium retail and corporate facility upkeep. From gleaming display glass and polished stone entrances to spotless retail checkout zones and tidy showroom floors, we create a welcoming, professional atmosphere that delights your customers.",
    image: "/assets/services/business_site_cleaning.png",
  },
  {
    id: 3,
    name: "Student & Young Professionals Accommodation Cleaning",
    description: "Reliable and detailed turnaround solutions for student halls, private studios, and co-living housing projects. We handle complete room deep cleaning, sanitizing shared bathrooms, descaling kitchen sinks, oven scrubbing, and waste removal to prepare rooms perfectly for the next tenancy wave.",
    image: "/assets/services/student_accommodation_cleaning.png",
  },
  {
    id: 4,
    name: "Pubs, Nightclubs & Restaurants Cleaning",
    description: "Maintain pristine hygiene ratings with our specialist front-of-house hospitality sanitation. We thoroughly degrease bar counters, sanitize restaurant table surfaces, deep-clean customer restrooms, vacuum seating areas, and wash floors, leaving your establishment ready for flawless food service.",
    image: "/assets/services/restaurant_nightclub_cleaning.png",
  },
  {
    id: 5,
    name: "End of Tenancy House Cleaning",
    description: "Secure your tenancy deposit or prepare your property for immediate lease with our comprehensive move-in/move-out deep cleaning. We clean all skirting boards, internal windows, kitchen cupboards inside-out, bathrooms, ovens, and appliances to exceed landlords' and letting agents' standards.",
    image: "/assets/services/end_of_tenancy_cleaning.png",
  },
  {
    id: 6,
    name: "Commercial Kitchen Cleaning",
    description: "Stay compliant with local health authorities through our heavy-duty kitchen structure sanitation. We deep-clean non-slip floors, scrub wall tiles, sanitize stainless steel work benches, and deep-clean sink areas, removing grease build-ups and food residues to guarantee a highly sterile cooking environment.",
    image: "/assets/services/commercial_kitchen_cleaning.png",
  },
  {
    id: 7,
    name: "Health Care Facilities Cleaning",
    description: "Strict, medical-grade disinfection services designed for doctors' offices, dental clinics, diagnostic labs, and care homes. We utilize high-standard disinfectants to eliminate pathogens on contact points, waiting room furniture, clinical beds, and treatment room surfaces.",
    image: "/assets/services/healthcare_facilities_cleaning.png",
  },
  {
    id: 8,
    name: "Commercial Kitchen Equipment Cleaning",
    description: "Extend the life of your appliances and prevent fire hazards with deep degreasing. We dismantle and clean commercial ovens, deep fryers, gas stoves, griddles, exhaust fans, filters, and ductwork, restoring cooking equipment to pristine, energy-efficient, and fire-safe conditions.",
    image: "/assets/services/kitchen_equipment_cleaning.png",
  },
  {
    id: 9,
    name: "School Cleaning",
    description: "Create a safe and thriving learning environment for students and staff alike. We provide comprehensive sanitization of classrooms, desks, whiteboards, computer labs, library spaces, gymnasiums, and student cafeterias using non-toxic, child-safe cleaning products.",
    image: "/assets/services/school_cleaning.png",
  },
  {
    id: 10,
    name: "After Builders Cleaning",
    description: "Remove heavy dust, plaster splatters, and construction residue from newly built or renovated sites. We scrub floors, wipe fixtures, polish glass panes, clean inside cabinets, and clean vents, making your new building or home addition immediately ready for comfortable occupancy.",
    image: "/assets/services/after_builders_cleaning_new.png",
  },
  {
    id: 11,
    name: "Industrial & Warehouse Cleaning",
    description: "Heavy-duty cleaning programs for factories, assembly lines, distribution hubs, and warehouses. We clean grease spills, sweep and scrub large floor surfaces, wipe down heavy racking systems, and maintain clean safety walkways to keep your industrial operations safe and compliant.",
    image: "/assets/services/warehouse_industrial_cleaning.png",
  },
  {
    id: 12,
    name: "Transport & Fleet Cleaning",
    description: "Keep your logistics assets representing your company professionally on the road. We provide complete exterior high-pressure washing, chassis cleaning, and thorough interior sanitation of buses, trains, delivery vans, cargo trucks, and executive corporate fleets.",
    image: "/assets/services/transport_fleet_cleaning.png",
  },
  {
    id: 13,
    name: "Carpet & Upholstery Cleaning",
    description: "Restore the vibrant color and texture of your carpets and fabric furniture. Using advanced hot-water extraction, steam sanitization, and eco-friendly solutions, we extract deep-seated dirt, dust mites, pet dander, and tough stains from carpets, office chairs, and sofas.",
    image: "/assets/services/carpet_upholstery_cleaning.png",
  },
  {
    id: 14,
    name: "Agricultural Cleaning",
    description: "Professional sanitation and pressure wash solutions for agricultural facilities, livestock barns, storage sheds, and farm machinery. We remove heavy organic matter, disinfect feeding zones, and sanitize pathways to prevent disease and maintain strict agricultural hygiene standards.",
    image: "/assets/services/agricultural_cleaning.png",
  },
  {
    id: 15,
    name: "Store Cleaning",
    description: "Keep your retail store, supermarket, or fashion boutique spotless and inviting for customers. We handle glass window polishing, deep cleaning of checkout zones, aisle floor polishing, and shelf dusting to ensure a premium shopping experience that enhances your brand image.",
    image: "/assets/services/store_cleaning.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-background min-h-screen pt-10 md:pt-12 pb-20">
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Service Portfolio</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6"
          >
            Professional Cleaning Services
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Clean Chase offers reliable, high-quality, and tailormade cleaning solutions for homes, commercial establishments, public buildings, and specialized industrial facilities. Experience the standard of perfect cleanliness.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants as any}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden group rounded-3xl border border-border bg-card text-card-foreground shadow-md transition-all duration-300 flex flex-col h-full p-5 gap-4 md:gap-6 min-h-[300px] md:min-h-[340px]"
            >
              {/* Service Name */}
              <h3 className="font-extrabold text-xl md:text-2xl text-primary tracking-tight text-left w-full">
                {service.name}
              </h3>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-grow">
                {/* Left Side: Image Container (Padded inside the card with rounded corners and border) */}
                <div className="relative w-full md:w-[46%] h-56 md:h-auto overflow-hidden rounded-2xl border border-border/10 bg-muted shrink-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    priority={service.id <= 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Right Side: Content Container */}
                <div className="w-full md:w-[54%] py-2 flex flex-col justify-between gap-4">
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-col items-end gap-2.5 mt-auto pt-4 border-t border-border/40 w-full">
                    <Link
                      href="/quote"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/95 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-105 active:scale-98 shrink-0 group/btn"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Trust/CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-24 p-8 md:p-12 rounded-3xl bg-secondary/50 border border-border text-center max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Looking for a custom cleaning package?
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            We provide custom plans tailored to your specific schedule, facilities, and requirements. Contact our expert team today to design a specialized cleaning checklist for your premises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/10 hover:shadow-primary/20 active:scale-98"
            >
              <span>Get Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold bg-background border border-border hover:bg-muted text-foreground transition-all active:scale-98"
            >
              <span>Contact Support</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8 pt-8 border-t border-border/60">
            <div className="flex items-center gap-3 justify-center text-left">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">Fully Insured</h4>
                <p className="text-xs text-muted-foreground">Protected service delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center text-left">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">100% Satisfaction</h4>
                <p className="text-xs text-muted-foreground">Guaranteed quality results</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center text-left">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">Expert Cleaners</h4>
                <p className="text-xs text-muted-foreground">Trained professionals only</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
