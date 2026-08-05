"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  image: string;
  points: string[];
}

const coreServices: ServiceItem[] = [
  {
    id: 1,
    name: "Office Cleaning",
    description: "Elevate your workspace standards with our comprehensive office sanitization services. We ensure a fresh, healthy, and highly productive environment.",
    image: "/assets/services/office_cleaning.png",
    points: [
      "Desk & equipment sanitizing",
      "High-traffic floor care",
      "Washroom deep disinfecting"
    ]
  },
  {
    id: 2,
    name: "Business Site Cleaning",
    description: "Maintain a flawless physical brand presence with premium retail and corporate facility upkeep. We create a welcoming atmosphere that delights customers.",
    image: "/assets/services/business_site_cleaning.png",
    points: [
      "Entrance & glass polishing",
      "Showroom floor care",
      "Checkout zone sanitization"
    ]
  },
  {
    id: 3,
    name: "Student Accommodation Cleaning",
    description: "Reliable and detailed turnaround solutions for student halls, private studios, and co-living spaces. We prepare rooms perfectly for the next tenancy wave.",
    image: "/assets/services/student_accommodation_cleaning.png",
    points: [
      "Bathroom & kitchen descaling",
      "Room deep disinfection",
      "Post-tenancy waste removal"
    ]
  },
  {
    id: 4,
    name: "Pubs, Nightclubs & Restaurants Cleaning",
    description: "Maintain pristine hygiene ratings with our specialist front-of-house hospitality sanitation. We leave your establishment ready for flawless food service.",
    image: "/assets/services/restaurant_nightclub_cleaning.png",
    points: [
      "Bar counter degreasing",
      "Customer restroom sanitizing",
      "Dining area floor washing"
    ]
  },
  {
    id: 5,
    name: "End of Tenancy House Cleaning",
    description: "Secure your tenancy deposit or prepare your property for immediate lease with move-in/move-out deep cleaning. We clean to exceed landlords' standards.",
    image: "/assets/services/end_of_tenancy_cleaning.png",
    points: [
      "Skirting boards & windows wipe",
      "Kitchen appliances & oven scrub",
      "Sanitary ware deep clean"
    ]
  },
  {
    id: 6,
    name: "Commercial Kitchen Cleaning",
    description: "Stay compliant with local health authorities through our heavy-duty kitchen structure sanitation. We remove grease and ensure a sterile environment.",
    image: "/assets/services/commercial_kitchen_cleaning.png",
    points: [
      "Non-slip floor deep scrubbing",
      "Stainless steel bench sanitizing",
      "Sink & drainage deep wash"
    ]
  },
  {
    id: 7,
    name: "Health Care Facilities Cleaning",
    description: "Strict, medical-grade disinfection services designed for doctors' offices, dental clinics, and care homes. We utilize high-standard disinfectants.",
    image: "/assets/services/healthcare_facilities_cleaning.png",
    points: [
      "Medical-grade sanitization",
      "Waiting room disinfection",
      "Treatment table deep clean"
    ]
  },
  {
    id: 8,
    name: "Commercial Kitchen Equipment Cleaning",
    description: "Extend the life of your appliances and prevent fire hazards with deep degreasing. We clean commercial ovens, gas stoves, filters, and ducts.",
    image: "/assets/services/kitchen_equipment_cleaning.png",
    points: [
      "Oven & stove degreasing",
      "Exhaust fan & filter clean",
      "Fire hazard prevention check"
    ]
  },
  {
    id: 9,
    name: "School Cleaning",
    description: "Create a safe and thriving learning environment for students and staff alike. We sanitize classrooms, labs, and gymnasiums with child-safe products.",
    image: "/assets/services/school_cleaning.png",
    points: [
      "Classroom & desk sanitization",
      "Computer lab & library dusting",
      "Child-safe non-toxic products"
    ]
  },
  {
    id: 10,
    name: "After Builders Cleaning",
    description: "Remove heavy dust, plaster splatters, and construction residue from newly built or renovated sites. We make your space immediately ready for occupancy.",
    image: "/assets/services/after_builders_cleaning.png",
    points: [
      "Heavy dust & plaster removal",
      "Glass pane polishing",
      "Internal cabinet dusting"
    ]
  },
  {
    id: 11,
    name: "Industrial & Warehouse Cleaning",
    description: "Heavy-duty cleaning programs for factories, assembly lines, distribution hubs, and warehouses. We maintain clean and safe operations.",
    image: "/assets/services/warehouse_industrial_cleaning.png",
    points: [
      "Industrial floor scrubbing",
      "High racking system wipe",
      "Safety walkway maintenance"
    ]
  },
  {
    id: 12,
    name: "Transport & Fleet Cleaning",
    description: "Keep your logistics assets representing your company professionally on the road. We provide pressure washing and interior sanitation.",
    image: "/assets/services/transport_fleet_cleaning.png",
    points: [
      "Exterior pressure washing",
      "Interior transport sanitizing",
      "Chassis & cargo clean-up"
    ]
  },
  {
    id: 13,
    name: "Carpet, Upholstery and Floor Cleaning",
    description: "Restore the vibrant color, cleanliness, and texture of your carpets, hard floors, and fabric furniture. We also offer commercial carpet and floor cleaning.",
    image: "/assets/services/carpet_upholstery_cleaning.png",
    points: [
      "Hot-water deep extraction",
      "Hard floor scrubbing & polish",
      "Commercial carpet & floor care"
    ]
  },
  {
    id: 14,
    name: "Agricultural Cleaning",
    description: "Professional sanitation and pressure wash solutions for agricultural facilities, barns, and machinery. We maintain strict hygiene standards.",
    image: "/assets/services/agricultural_cleaning.png",
    points: [
      "Livestock barn disinfecting",
      "High-pressure wash & sanitation",
      "Bio-security hygiene compliance"
    ]
  },
  {
    id: 15,
    name: "Store Cleaning",
    description: "Keep your retail store, supermarket, or shop spotless and inviting. We ensure a premium shopping experience that highlights your brand.",
    image: "/assets/services/store_cleaning.png",
    points: [
      "Glass window & aisle floor care",
      "Checkout zone & shelf dusting",
      "Customer-facing sanitization"
    ]
  }
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

export function ServicesSection() {
  return (
    <section className="pt-10 pb-2 bg-background relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-semibold text-xs tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Service Core</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4"
          >
            Professional Cleaning Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-6"
          >
            Clean Chase offers reliable, high-quality, and tailormade cleaning solutions. Experience the standard of absolute cleanliness in every space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <Button
              render={<Link href="/quote" />}
              size="lg"
              className="rounded-full shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all duration-200 font-semibold h-11 px-8 gap-2"
            >
              Book Your Cleaning
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Services Grid (3 cards per row on desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {coreServices.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants as any}
              whileHover={{ y: -6 }}
              className="relative flex flex-col h-full rounded-3xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >


              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6 sm:p-8">
                <h3 className="text-xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  {service.name}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-8 mt-auto">
                  {service.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm font-medium text-foreground/80">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>


              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Our Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Button
            render={<Link href="/services" />}
            variant="outline"
            size="lg"
            className="rounded-full shadow-md hover:shadow-lg transition-all duration-200 font-semibold h-11 px-8 gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary"
          >
            View Our Services
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
