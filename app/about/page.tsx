"use client"

import * as React from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { ShieldCheck, Leaf, HeartHandshake, Sparkles, Award, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  }
}

const statsData = [
  {
    icon: ShieldCheck,
    title: "100% Vetted Cleaners",
    description: "Fully DBS background-checked, interviewed, and trained staff.",
    color: "text-primary",
    bgColor: "from-primary/20 to-primary/5 dark:from-primary/10 dark:to-primary/2"
  },
  {
    icon: Award,
    title: "Full Insurance Cover",
    description: "Comprehensive public and employers liability insurance up to £5M.",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "from-emerald-500/20 to-emerald-500/5 dark:from-emerald-500/10 dark:to-emerald-500/2"
  },
  {
    icon: HeartHandshake,
    title: "Satisfaction Guarantee",
    description: "Not completely happy? Let us know and we'll reclean inside 24 hours.",
    color: "text-primary",
    bgColor: "from-primary/20 to-emerald-500/5 dark:from-primary/10 dark:to-emerald-500/2"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly & Safe",
    description: "COSHH-compliant, pet-friendly and biodegradable cleaning agents.",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "from-emerald-500/20 to-primary/5 dark:from-emerald-500/10 dark:to-primary/2"
  }
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Header Hero Section */}
      <section className="relative overflow-hidden bg-background pt-12 pb-8 md:pt-16 md:pb-12 lg:pb-16 border-b border-border/40 dark:border-border/10">
        {/* Background glows */}
        <div className="absolute top-[-10%] right-[-10%] -z-10 size-[300px] sm:size-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] -z-10 size-[300px] sm:size-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl" />
        
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary dark:border-primary-foreground/30 dark:bg-primary/10 dark:text-primary-foreground shadow-sm">
              <Sparkles className="size-3.5 text-emerald-500 animate-pulse" />
              <span>About Clean Chase Cleaning LTD</span>
            </div>

            {/* Title */}
            <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl font-heading leading-[1.1]">
              Our Story, Our Mission &
              <span className="block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Our Spotless Standards
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg sm:text-xl text-foreground/80 dark:text-foreground/90 leading-relaxed font-medium">
              We are committed to delivering reliable, safe, and elite cleaning services across the West Midlands and the entire UK, tailored to your commercial and residential needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Highlight Metrics Grid */}
      <section className="py-12 bg-card/30 dark:bg-secondary/5 border-b border-border/40 dark:border-border/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {statsData.map((stat, index) => {
              const IconComp = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group rounded-2xl border border-border/60 bg-background p-6 shadow-sm hover:shadow-md hover:border-primary/20 dark:border-border/10 dark:bg-card/75 dark:hover:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  <div className={`inline-flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-br ${stat.bgColor} shadow-inner`}>
                    <IconComp className={`size-5.5 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground mt-4 leading-tight group-hover:text-primary dark:group-hover:text-primary transition-colors">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-foreground/75 dark:text-foreground/85 mt-2 leading-relaxed font-semibold">
                    {stat.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. Our Journey & Purpose Split Layout */}
      <section className="relative overflow-hidden bg-background pt-10 pb-8 md:pt-14 md:pb-12 lg:pb-16 border-b border-border/40 dark:border-border/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Column: Extensive, readable text details */}
            <motion.div
              className="flex flex-col lg:col-span-7 text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            >
              <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary dark:border-primary-foreground/30 dark:bg-primary/10 dark:text-primary-foreground shadow-sm">
                <Sparkles className="size-3.5 text-emerald-500 animate-pulse" />
                <span>Our Heritage</span>
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl font-heading leading-tight">
                Crafting Spotless Spaces
                <span className="block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  with Trust & Care
                </span>
              </h2>

              <div className="mt-6 space-y-6 text-base sm:text-lg text-foreground/80 dark:text-foreground/90 font-medium leading-relaxed">
                <p>
                  Clean Chase Cleaning was founded with a clear vision: to provide premier, elite cleaning services that go beyond surface-level sweeps. We understand that letting someone into your workspace, school, venue, or home requires immense trust. That is why we built our foundation on rigid safety vetting, comprehensive liability insurance, and a team of meticulous, trained professionals.
                </p>
                <p>
                  We are proud to serve the West Midlands and the entire UK, supporting businesses, offices, educational institutions, hospitality venues, and residential properties. Our expert cleaning teams take special care when handling specialized requirements—whether it is high-traffic workspace disinfection, post-renovation builder cleans, or detailed tenancy handovers.
                </p>
                <p>
                  Whether you need scheduled weekly office cleaning, an intensive deep clean, or custom commercial contract services, Clean Chase remains dedicated to spotless standards, eco-friendly practices, and complete peace of mind.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Visual Trust Panel */}
            <motion.div
              className="lg:col-span-5 flex flex-col justify-center gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            >
              <div className="p-8 rounded-3xl border border-border/60 bg-card/60 dark:border-border/10 dark:bg-card/40 backdrop-blur-sm shadow-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 -z-10 size-24 bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-bl-full group-hover:scale-110 transition-transform duration-500" />
                
                <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-5.5 text-primary shrink-0" />
                  <span>Our Promise to You</span>
                </h3>
                
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3 text-base text-foreground/80 dark:text-foreground/90 font-semibold">
                    <div className="size-2 rounded-full bg-primary shrink-0 mt-2" />
                    <div>
                      <span className="block text-foreground font-black text-lg">Reliability First</span>
                      <span className="text-sm font-medium opacity-90 text-muted-foreground dark:text-foreground/70">Always arrive on time, fully equipped, and prepared to clean to the highest standards.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-base text-foreground/80 dark:text-foreground/90 font-semibold">
                    <div className="size-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <div>
                      <span className="block text-foreground font-black text-lg">Safety Guarantee</span>
                      <span className="text-sm font-medium opacity-90 text-muted-foreground dark:text-foreground/70">All cleaners are DBS-checked, vetted, and we hold full £5M public and employers liability coverage.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-base text-foreground/80 dark:text-foreground/90 font-semibold">
                    <div className="size-2 rounded-full bg-primary shrink-0 mt-2" />
                    <div>
                      <span className="block text-foreground font-black text-lg">Eco-Conscious Health</span>
                      <span className="text-sm font-medium opacity-90 text-muted-foreground dark:text-foreground/70">We use biodegradable, COSHH-compliant, pet-friendly products to protect your space.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-base text-foreground/80 dark:text-foreground/90 font-semibold">
                    <div className="size-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <div>
                      <span className="block text-foreground font-black text-lg">Nationwide Coverage</span>
                      <span className="text-sm font-medium opacity-90 text-muted-foreground dark:text-foreground/70">Providing premium residential and commercial cleaning across the West Midlands and all UK regions.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="relative overflow-hidden bg-card/40 dark:bg-secondary/10 pt-10 pb-8 md:pt-14 md:pb-12 lg:pb-16 border-b border-border/40 dark:border-border/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary dark:border-primary-foreground/30 dark:bg-primary/10 dark:text-primary-foreground shadow-sm">
              <Sparkles className="size-3.5 text-emerald-500 animate-pulse" />
              <span>What Drives Us</span>
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl font-heading leading-tight">
              Our Core{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Values
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-foreground/80 dark:text-foreground/90 leading-relaxed">
              We hold ourselves to the highest standards of safety, quality, and care. Here are the values that define our cleaning team.
            </p>
          </div>

          {/* Core Values Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Value 1 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-border/60 bg-background p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-primary/20 dark:border-border/10 dark:bg-card/75 dark:hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/2 dark:to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-inner shrink-0">
                <ShieldCheck className="size-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-[22px] font-extrabold text-foreground mt-5 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                Trust & Transparency
              </h3>
              <p className="text-base text-foreground/80 dark:text-foreground/90 mt-3 leading-relaxed font-medium">
                We believe in complete transparency. Every cleaner on our team is fully vetted, DBS checked, and trained. We provide competitive upfront quotes with no contract locks or hidden fees.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-border/60 bg-background p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-primary/20 dark:border-border/10 dark:bg-card/75 dark:hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-500/2 dark:to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 shadow-inner shrink-0">
                <Leaf className="size-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-[22px] font-extrabold text-foreground mt-5 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                Safety & Compliance
              </h3>
              <p className="text-base text-foreground/80 dark:text-foreground/90 mt-3 leading-relaxed font-medium">
                We protect your environment. By adhering strictly to COSHH guidelines and using safe, biodegradable cleaning detergents, we keep your premises healthy and compliant for staff, children, and pets.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-2xl border border-border/60 bg-background p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-primary/20 dark:border-border/10 dark:bg-card/75 dark:hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/2 dark:to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/5 text-primary shadow-inner shrink-0">
                <HeartHandshake className="size-6 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-[22px] font-extrabold text-foreground mt-5 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                Quality & Care
              </h3>
              <p className="text-base text-foreground/80 dark:text-foreground/90 mt-3 leading-relaxed font-medium">
                We clean with care and pay attention to detailed, hard-to-reach places. We tailor our cleaning checklist to meet your specific budget and property requirements, backed by our 24-hour reclean guarantee.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. Call-to-Action Section */}
      <section className="relative overflow-hidden bg-background pt-10 pb-16 md:pt-14 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-black text-foreground sm:text-4xl font-heading leading-tight">
              Ready to Experience the{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Clean Chase Standard?
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-foreground/80 dark:text-foreground/90 leading-relaxed font-medium">
              Join dozens of satisfied offices, hospitality venues, and homes across the West Midlands and the UK. Get your free custom quote today!
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                render={<Link href="/quote" />}
                className="h-12 bg-primary hover:bg-primary/95 dark:bg-primary dark:hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-8 shadow-lg shadow-primary/20 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                render={<Link href="/contact" />}
                variant="outline"
                className="h-12 border-2 border-border text-foreground font-bold rounded-xl px-8 hover:bg-muted/50 transition-all cursor-pointer flex items-center justify-center"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
