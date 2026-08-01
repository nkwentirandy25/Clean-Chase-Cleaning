"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const validRoutes = ["/", "/about", "/contact", "/privacy", "/quote", "/services", "/terms"];
  const isQuoteSubroute = pathname?.startsWith("/quote/");
  const isNotFound = !validRoutes.includes(pathname) && !isQuoteSubroute;

  if (isNotFound) return null;

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const useWhiteText = false;

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 transition-all duration-300 w-full border-b py-3 bg-background/80 backdrop-blur-md border-border/40 shadow-sm"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-1 group">
            <Image
              src="/assets/logo/logo.png"
              alt="CleanChase Logo"
              width={160}
              height={40}
              priority
              className="h-10 w-auto object-contain transition-all duration-300 -mr-1"
            />
            <span className={cn(
              "text-2xl font-bold tracking-tight transition-colors duration-300",
              useWhiteText
                ? "text-white"
                : "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            )}>
              Clean<span className={cn(
                "transition-colors duration-300 font-extrabold",
                useWhiteText ? "text-white/90" : "text-primary"
              )}>Chase</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative py-2 text-sm font-semibold transition-colors duration-200 group",
                    isActive
                      ? (useWhiteText ? "text-white font-extrabold" : "text-primary dark:text-primary")
                      : (useWhiteText
                          ? "text-white/90 hover:text-white dark:text-white/90 dark:hover:text-white"
                          : "text-black/80 hover:text-primary dark:text-white/80 dark:hover:text-primary")
                  )}
                >
                  <span>{link.name}</span>
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[2px] origin-left transition-transform duration-300 ease-out",
                    isActive 
                      ? "scale-x-100" 
                      : "scale-x-0 group-hover:scale-x-100",
                    useWhiteText ? "bg-white" : "bg-primary"
                  )} />
                </Link>
              );
            })}
          </nav>

          {/* Actions (Theme Toggle & Quote Button) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative w-9 h-9 rounded-lg border border-transparent transition-colors",
                useWhiteText
                  ? "hover:bg-white/10 hover:border-white/20 text-white"
                  : "hover:bg-secondary hover:border-border/30 text-foreground"
              )}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {!mounted ? (
                  <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
                ) : (
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                      <motion.div
                        key="moon"
                        initial={{ y: 20, rotate: 45, opacity: 0 }}
                        animate={{ y: 0, rotate: 0, opacity: 1 }}
                        exit={{ y: -20, rotate: -45, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className={cn("w-[18px] h-[18px] transition-colors", useWhiteText ? "text-white" : "text-primary")} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ y: 20, rotate: -45, opacity: 0 }}
                        animate={{ y: 0, rotate: 0, opacity: 1 }}
                        exit={{ y: -20, rotate: 45, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className={cn("w-[18px] h-[18px] transition-colors", useWhiteText ? "text-white" : "text-primary")} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </Button>

            <Button
              render={<Link href="/quote" /> as any}
              variant="default"
              className="relative overflow-hidden group/btn px-5 h-10 shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all duration-200 flex items-center gap-1.5 font-semibold"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </div>

          {/* Mobile Actions Menu and Toggle */}
          <div className="flex md:hidden items-center gap-3">
            
            {/* Theme Switcher for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-9 h-9 rounded-lg transition-colors",
                useWhiteText ? "hover:bg-white/10 text-white" : "hover:bg-secondary text-foreground"
              )}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              {!mounted ? (
                <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
              ) : theme === "dark" ? (
                <Moon className={cn("w-[18px] h-[18px] transition-colors", useWhiteText ? "text-white" : "text-primary")} />
              ) : (
                <Sun className={cn("w-[18px] h-[18px] transition-colors", useWhiteText ? "text-white" : "text-primary")} />
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-9 h-9 rounded-lg transition-colors",
                    useWhiteText ? "hover:bg-white/10 text-white" : "hover:bg-secondary text-foreground"
                  )}
                  aria-label="Toggle Menu"
                /> as any
              }>
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <Menu className="w-5 h-5" />
                </div>
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-6 flex flex-col gap-6">
                <SheetHeader className="p-0 border-b border-border/40 pb-4">
                  <SheetTitle className="flex items-center gap-1">
                    <Image
                      src="/assets/logo/logo.png"
                      alt="CleanChase Logo"
                      width={120}
                      height={30}
                      priority
                      className="h-7.5 w-auto object-contain -mr-1"
                    />
                    <span className="text-xl font-bold tracking-tight">
                      Clean<span className="text-primary font-extrabold">Chase</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1 mt-4">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block py-2 px-3 rounded-lg text-base font-medium transition-colors",
                            isActive
                              ? "text-primary bg-primary/5 font-bold"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-auto pt-6 border-t border-border/40">
                  <Button
                    render={<Link href="/quote" /> as any}
                    variant="default"
                    onClick={() => setIsOpen(false)}
                    className="w-full justify-center gap-2 h-11 flex items-center font-semibold"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
