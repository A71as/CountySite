import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, ArrowUp } from "lucide-react";
import { SignupForm } from "@/components/forms/SignupForm";
import { LOGO_ASSETS } from "@/lib/constants/images";

export function Footer() {
  const candidateName =
    process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Hudson County Commissioner";
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@davidguirgis.com";
  const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";
  const currentYear = new Date().getFullYear();

  // Footer nav: same hierarchy as top nav — Donate (red), Volunteer (emphasized), then Commissioner/Issues/Endorsements
  const navLinks = [
    { label: "Commissioner", href: "#commissioner" },
    { label: "Issues", href: "#issues" },
    { label: "Endorsements", href: "#endorsements" },
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
      {/* footerWarm (#3D1A1E) — intentional warm dark brown/maroon, not black; feels more human */}
      <div className="relative mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        {/* Newsletter signup — same API/list as hero form (POST /api/signup) */}
        <div className="mb-12 pb-12 organic-divider-b organic-divider-light">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                Stay Connected
              </h3>
              <p className="text-slate-300/80">
                Get the latest campaign updates, event invitations, and ways to
                get involved.
              </p>
            </div>
            <div className="lg:pl-8">
              <SignupForm variant="footer" />
            </div>
          </div>
        </div>

        {/* Top section - Logo + Nav + Social */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logo/Brand — clickable, scrolls to top (#home) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <Link
              href="#home"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm organic-sm transition-opacity hover:opacity-90"
              aria-label="Back to top"
            >
              <Image
                src={LOGO_ASSETS.vertical}
                alt={`${candidateName} — Democratic Socialist for ${office}`}
                width={140}
                height={180}
                className="h-24 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Navigation — Donate in red, Volunteer emphasized, rest plain */}
          <div className="lg:col-span-5">
            <nav className="flex flex-wrap gap-x-8 gap-y-4 items-center">
              <Link
                href="/volunteer"
                className="text-white font-subhead font-bold text-base hover:text-primary-400 hover:underline transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm organic-sm"
              >
                Volunteer
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-all duration-200 font-subhead font-medium text-base hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm organic-sm"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={actBlueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 font-subhead font-bold text-base hover:text-primary-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm organic-sm"
              >
                Donate
              </a>
            </nav>
          </div>

          {/* Social + Contact — min 44x44px touch targets for mobile */}
          <div className="lg:col-span-4 lg:text-right">
            <div className="flex lg:justify-end gap-3 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center organic-sm bg-white/10 text-slate-300 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:scale-110 hover:rotate-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                  </a>
                );
              })}
              <a
                href={`mailto:${contactEmail}`}
                aria-label="Email the campaign"
                className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center organic-sm bg-white/10 text-slate-300 transition-all duration-200 hover:bg-primary-500 hover:text-white hover:scale-110 hover:-rotate-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm"
              >
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </a>
            </div>
            <a
              href={`mailto:${contactEmail}`}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              {contactEmail}
            </a>
          </div>
        </div>

        {/* Back to top — small arrow affordance */}
        <div className="mt-8 flex justify-center lg:justify-end">
          <a
            href="#home"
            className="inline-flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center organic-sm bg-white/10 text-slate-400 transition-all duration-200 hover:bg-primary-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-footerWarm"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        {/* Bottom section - Legal */}
        <div className="mt-8 pt-8 organic-divider-t organic-divider-light">
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
              {/* Photography credit — replace with photographer name once confirmed */}
              <p className="text-slate-600">Photography: TBD</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
