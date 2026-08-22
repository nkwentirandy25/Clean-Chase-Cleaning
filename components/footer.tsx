"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

// Custom SVGs since brand icons are not exported in newer lucide-react versions
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const Tiktok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);


export function Footer() {
  const pathname = usePathname();
  const validRoutes = ["/", "/about", "/contact", "/privacy", "/quote", "/services", "/terms"];
  const isQuoteSubroute = pathname?.startsWith("/quote/");
  const isNotFound = !validRoutes.includes(pathname) && !isQuoteSubroute;

  if (isNotFound) return null;

  const services = [
    { name: "Office Cleaning", href: "/services" },
    { name: "Business Site Cleaning", href: "/services" },
    { name: "End of Tenancy Cleaning", href: "/services" },
    { name: "Carpet, Upholstery and Floor Cleaning", href: "/services" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Request a Quote", href: "/quote" },
  ];

  return (
    <footer className="border-t border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20 w-full mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-8 border-b border-border/40">

          {/* Column 1: Brand Pitch */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/assets/logo/logo.png"
                alt="CleanChase Logo"
                width={220}
                height={55}
                className="h-14 w-auto object-contain"
              />
              <span className="text-xl font-bold tracking-tight">
                Clean Chase <span className="text-primary font-extrabold">Cleaning</span>
              </span>
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed">
              We deliver elite residential and commercial cleaning plans. Fully vetted personnel, environmental certified, and absolute satisfaction guaranteed.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 w-full">
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/share/1QLkFgm8js/?mibextid=wwXIfr" },
                  { icon: Instagram, href: "https://www.instagram.com/cleanchase_cleaning_ltd" },
                  { icon: Twitter, href: "https://x.com/iseebeautyy/" },
                  { icon: Youtube, href: "https://www.youtube.com/@Cleanchase-r9q" },
                  { icon: Tiktok, href: "https://www.tiktok.com/@cleanchase237" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/cleanchase-cleaning-ltd/" },
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={idx}
                      href={social.href}
                      target="_blank"
                      className="w-9 h-9 rounded-lg bg-background border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/20 flex items-center justify-center transition-all hover:scale-115"
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </Link>
                  );
                })}
              </div>
              <span className="text-sm md:text-base text-muted-foreground font-medium">
                Company Registration Number: 17401543
              </span>
            </div>
          </div>

          {/* Column 2: Services Link List */}
          <div className="space-y-4 md:justify-self-center">
            <h3 className="text-base font-bold tracking-wide uppercase text-foreground">Services</h3>
            <ul className="space-y-2.5">
              {services.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Link List */}
          <div className="space-y-4 md:justify-self-end md:pr-4">
            <h3 className="text-base font-bold tracking-wide uppercase text-foreground">Company</h3>
            <ul className="space-y-2.5">
              {company.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-base text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-6 space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Quick Info & Details */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm md:text-base text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary/80" />
                +443301335407
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary/80" />
                info@cleanchasecleaning.co.uk
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary/80" />
                8b coppice road Wolverhampton
              </span>
            </div>

            {/* Privacy Policy & Terms */}
            <div className="flex items-center gap-4 text-sm md:text-base text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors py-0.5">
                Privacy Policy
              </Link>
              <span className="text-border">|</span>
              <Link href="/terms" className="hover:text-primary transition-colors py-0.5">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Copyrights */}
          <div className="text-center pt-6 border-t border-border/30 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CleanChase. All rights reserved.</p>
          </div>

        </div>

      </div>
    </footer>
  );
}
