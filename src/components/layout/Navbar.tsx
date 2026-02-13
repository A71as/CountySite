"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LOGO_ASSETS } from "@/lib/constants/images";
import { cn } from "@/lib/utils";

// Left nav: text links — Bernoru, medium, black, 14–15px (Volunteer bold)
const leftNavLinks: { label: string; href: string; bold?: boolean }[] = [
  { label: "Volunteer", href: "/volunteer", bold: true },
  { label: "About", href: "#about" },
  { label: "The Role", href: "#commissioner" },
  { label: "Issues", href: "#issues" },
];

const SCROLL_THRESHOLD = 120; // px — below this, header is expanded with huge logo

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // at top = expanded
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heroInView, setHeroInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 10);
      setIsExpanded(y < SCROLL_THRESHOLD);
    };
    handleScroll(); // init on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update --nav-height so hero/sections reserve correct space
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--nav-height", isExpanded ? "112px" : "64px");
  }, [isExpanded]);

  const pathname = usePathname();

  // Hide nav logo when hero section's large logo is visible (reduces visual redundancy)
  useEffect(() => {
    if (pathname !== "/") {
      setHeroInView(false);
      return;
    }

    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.01, rootMargin: "0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const [logoPop, setLogoPop] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleLinkClick();
    if (pathname === "/") {
      e.preventDefault();
      setLogoPop(true);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLogoPop(false);
      }, 350);
    }
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

  // Lock body scroll when full-screen menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#donate";

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-40 transition-all duration-300 ease-out",
        "top-[var(--announcement-height)]",
        "nav-bar-bg",
        isScrolled && "nav-bar-scrolled",
        isExpanded ? "nav-expanded" : "nav-collapsed"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between gap-4 nav-inner transition-all duration-300 ease-out">
          {/* Left: Volunteer, WTF is a Commissioner?, Issues — Bernoru, 14–15px, black; Volunteer bold */}
          <div className="nav-left hidden lg:flex items-center justify-start gap-6 flex-1 min-w-0">
            {leftNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link text-black transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 rounded min-h-[44px] inline-flex items-center shrink-0",
                  link.bold ? "font-bold" : "font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center: DAVID! speech bubble logo — links to top of page, 48–56px height */}
          <div className="nav-center flex-shrink-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0">
            <Link
              href="/"
              className={cn(
                "flex items-center justify-center transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 rounded min-h-[44px]",
                logoPop && "logo-pop-trigger"
              )}
              onClick={handleLogoClick}
              aria-label="Go to top of page"
            >
              <Image
                src={LOGO_ASSETS.speechBubbleOnly}
                alt={`${candidateName} — Democratic Socialist for Hudson County Commissioner`}
                width={180}
                height={96}
                className={cn("nav-logo-image transition-all duration-300 ease-out", isExpanded && "nav-logo-expanded")}
                priority
              />
            </Link>
          </div>

          {/* Right: Donate pill button — the one button that looks like a button */}
          <div className="nav-right hidden lg:flex items-center justify-end gap-6 flex-1 min-w-0">
            <a
              href={actBlueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-donate-pill"
            >
              Donate
            </a>
          </div>

          {/* Mobile: hamburger (left), logo centered, Donate pill (right) */}
          <div className="flex items-center justify-between w-full lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-900 transition-colors hover:bg-black/5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            {/* Spacer for balance — logo is in nav-center which is absolutely centered on mobile */}
            <div className="w-11 flex-shrink-0" aria-hidden="true" />
            <a
              href={actBlueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-donate-pill text-sm px-4 py-2 min-h-[44px] inline-flex items-center justify-center"
              onClick={handleLinkClick}
            >
              Donate
            </a>
          </div>
        </div>
      </div>

      {/* Mobile: full-screen overlay menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col items-center justify-center px-6 py-20"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <nav className="flex flex-col items-center gap-1 w-full max-w-sm">
            {leftNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "w-full min-h-[44px] flex items-center justify-center px-4 py-3 nav-link text-slate-900 hover:bg-slate-50 hover:text-primary-600 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
                  link.bold && "font-bold text-primary-600"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-full pt-6 mt-4 organic-divider-t">
              <a
                href={actBlueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-donate-pill w-full min-h-[48px] flex items-center justify-center"
                onClick={handleLinkClick}
              >
                Donate
              </a>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}
