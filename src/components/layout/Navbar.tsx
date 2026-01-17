"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Navigation links configuration
const navLinks = [
  { label: "About", href: "#about" },
  { label: "Issues", href: "#issues" },
  { label: "Endorsements", href: "#endorsements" },
  { label: "Events", href: "#events" },
  { label: "Volunteer", href: "#volunteer" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
  const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white shadow-lg border-b-2 border-accent-500/20"
          : "bg-white"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo area - retro-modern style */}
          <Link
            href="/"
            className="flex flex-col hover:opacity-90 transition-opacity group"
            onClick={handleLinkClick}
          >
            <span className="font-display text-2xl font-bold text-navy sm:text-3xl tracking-tight group-hover:text-primary-600 transition-colors">
              {candidateName}
            </span>
            <span className="text-xs font-bold text-accent-500 sm:text-sm uppercase tracking-wider">
              for {office}
            </span>
          </Link>

          {/* Desktop navigation - retro-modern style */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-bold text-navy uppercase tracking-wider transition-colors hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 rounded-sm group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Button
              href={actBlueUrl}
              external
              variant="accent"
              size="sm"
              className="ml-4 font-display text-lg px-6 py-2 shadow-lg"
            >
              Donate
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-foreground transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-200 bg-white md:hidden"
          role="menu"
        >
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-gray-100 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                href={actBlueUrl}
                external
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleLinkClick}
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
