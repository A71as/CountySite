import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Mail, ArrowUp } from "lucide-react";
import { SignupForm } from "@/components/forms/SignupForm";
import { LOGO_ASSETS } from "@/lib/constants/images";

export function Footer() {
  const candidateName =
    process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Hudson County Commissioner";
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@davidguirgis.com";
  const photographyCredit =
    process.env.NEXT_PUBLIC_PHOTOGRAPHY_CREDIT || "";
  const actBlueUrl =
    process.env.NEXT_PUBLIC_ACTBLUE_URL || "#donate";
  const currentYear = new Date().getFullYear();

  // Footer nav: same hierarchy as header — Volunteer, About, The Role, Issues, Donate
  const navLinks = [
    { label: "Volunteer", href: "/volunteer", bold: true },
    { label: "About", href: "#about" },
    { label: "The Role", href: "#commissioner" },
    { label: "Issues", href: "#issues" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/davidguirgis",
      ariaLabel: "Follow David on Instagram",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/davidguirgis",
      ariaLabel: "Follow David on Facebook",
    },
  ];

  return (
    <footer className="bg-footerWarm text-slate-100 relative overflow-hidden">
      {/* footerWarm (#3D1A1E) — solid brown, no pattern */}
      <div className="relative mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        {/* Signup + Logo + Nav + Social — condensed single section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
          {/* Left: Stay Connected + Form | Right: HUGE David logo — same level */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div>
              <h3 className="font-display text-lg font-bold text-white mb-1 uppercase tracking-tight">
                Stay Connected
              </h3>
              <p className="text-slate-300/80 text-sm mb-3">
                Campaign updates, events, ways to get involved.
              </p>
              <div className="[&_label]:text-slate-200 [&_.hero-form-privacy]:text-slate-400 [&_.hero-form-privacy_a]:text-slate-300 [&_.hero-form-privacy_a:hover]:text-white">
                <SignupForm variant="footer" privacyVariant="short" compact />
              </div>
            </div>
          </div>

          {/* Right: HUGE David logo — same level as Stay Connected */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <Link
              href="#home"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm organic-sm transition-opacity hover:opacity-90 w-fit"
              aria-label="Back to top"
            >
              <Image
                src={LOGO_ASSETS.horizontal}
                alt={`${candidateName} — Democratic Socialist for ${office}`}
                width={560}
                height={200}
                className="h-28 sm:h-36 md:h-44 lg:h-56 xl:h-64 w-auto object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Nav + Social + Contact */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-all duration-200 font-subhead text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm organic-sm",
                    link.bold
                      ? "text-white font-bold hover:text-primary-400"
                      : "text-slate-400 hover:text-white font-medium"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {actBlueUrl.startsWith("#") ? (
                <Link
                  href={actBlueUrl}
                  className="text-primary-400 font-subhead font-bold text-sm hover:text-primary-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm organic-sm"
                >
                  Donate
                </Link>
              ) : (
                <a
                  href={actBlueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 font-subhead font-bold text-sm hover:text-primary-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm organic-sm"
                >
                  Donate
                </a>
              )}
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center organic-sm bg-white/10 text-slate-300 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </a>
                );
              })}
              <a
                href={`mailto:${contactEmail}`}
                aria-label="Email the campaign"
                className="min-w-[40px] min-h-[40px] w-10 h-10 flex items-center justify-center organic-sm bg-white/10 text-slate-300 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                {contactEmail}
              </a>
            </div>
        </div>

        {/* Back to top — small arrow affordance */}
        <div className="mt-6 flex justify-center lg:justify-end">
          <a
            href="#home"
            className="inline-flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center organic-sm bg-white/10 text-slate-400 transition-all duration-200 hover:bg-primary-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        {/* Bottom section - Legal */}
        <div className="mt-6 pt-6 organic-divider-t organic-divider-light">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Paid for by — required legal line */}
            <div className="text-sm text-slate-400">
              <p className="font-display font-bold text-slate-300 uppercase tracking-wide">
                Paid for by {candidateName} for {office}
              </p>
            </div>

            {/* Legal links + Copyright */}
            <div className="flex flex-col gap-2 sm:items-end sm:text-right text-sm text-slate-500">
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-slate-300 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-slate-300 transition-colors"
                >
                  Terms
                </Link>
              </div>
              <p className="font-heading">
                &copy; {currentYear} {candidateName}
              </p>
              {photographyCredit && (
                <p className="text-slate-600">
                  Photography: {photographyCredit}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
