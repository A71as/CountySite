"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Navigation link type
interface NavLink {
  label: string;
  href: string;
  isPage?: boolean;
  emphasis?: "bold" | "normal";
}

// Navigation links configuration - Claire Valdez style
// Left side links
const leftNavLinks: NavLink[] = [
  { label: "Volunteer", href: "/volunteer", isPage: true, emphasis: "bold" },
  { label: "Commissioner", href: "#commissioner" },
  { label: "Issues", href: "#issues" },
];

// Right side links
const rightNavLinks: NavLink[] = [
  { label: "Endorsements", href: "#endorsements" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#donate";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white border-b border-slate-200"
          : "bg-white"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left navigation */}
          <div className="hidden items-center gap-6 lg:flex flex-1">
            {leftNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] uppercase tracking-[0.1em] transition-colors",
                  link.emphasis === "bold" 
                    ? "font-bold text-slate-900 hover:text-primary-600" 
                    : "font-medium text-slate-600 hover:text-slate-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center Logo - Swiss style */}
          <Link
            href="#home"
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900 hidden sm:block">
              {candidateName}
            </span>
          </Link>

          {/* Right navigation */}
          <div className="hidden items-center gap-6 lg:flex flex-1 justify-end">
            {rightNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.1em] font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
            {/* Donate button - emphasized with color */}
            <Button
              href={actBlueUrl}
              external
              variant="primary"
              size="sm"
              className="uppercase tracking-[0.1em] text-[13px] font-bold"
            >
              Donate
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-md p-2 text-slate-900 transition-colors hover:bg-slate-100 lg:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {[...leftNavLinks, ...rightNavLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "block px-3 py-3 text-sm uppercase tracking-wider transition-colors",
                  link.emphasis === "bold"
                    ? "font-bold text-slate-900"
                    : "font-medium text-slate-600"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Button
                href="/volunteer"
                variant="secondary"
                size="md"
                className="w-full uppercase tracking-wider text-sm font-bold"
                onClick={handleLinkClick}
              >
                Volunteer
              </Button>
              <Button
                href={actBlueUrl}
                external
                variant="primary"
                size="md"
                className="w-full uppercase tracking-wider text-sm"
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
