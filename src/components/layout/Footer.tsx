import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail } from "lucide-react";
import { SignupForm } from "@/components/forms/SignupForm";

export function Footer() {
  const candidateName =
    process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Hudson County Commissioner";
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@davidguirgis.com";
  const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";
  const currentYear = new Date().getFullYear();

  // Navigation links matching top navbar
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
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Newsletter signup section */}
        <div className="mb-12 pb-12 border-b border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Stay Connected
              </h3>
              <p className="text-slate-400">
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
          {/* Logo/Brand */}
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-3">
              <Image
                src="/images/logo.png"
                alt={`${candidateName} for ${office}`}
                width={140}
                height={56}
                className="h-12 w-auto brightness-0 invert"
              />
              <span className="text-slate-400 text-sm">for {office}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-5">
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              <Link
                href="/volunteer"
                className="text-white font-semibold hover:text-primary-400 transition-colors"
              >
                Volunteer
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={actBlueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
              >
                Donate
              </a>
            </nav>
          </div>

          {/* Social + Contact */}
          <div className="lg:col-span-4 lg:text-right">
            <div className="flex lg:justify-end gap-4 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-10 h-10 flex items-center justify-center bg-slate-800 text-slate-300 transition-colors hover:bg-primary-500 hover:text-white"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
              <a
                href={`mailto:${contactEmail}`}
                aria-label="Email the campaign"
                className="w-10 h-10 flex items-center justify-center bg-slate-800 text-slate-300 transition-colors hover:bg-primary-500 hover:text-white"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
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

        {/* Bottom section - Legal */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Paid for by */}
            <div className="text-sm text-slate-400">
              <p className="font-semibold text-slate-300">
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
              <p>
                &copy; {currentYear} {candidateName}
              </p>
              {/* Photo credit placeholder - add photographer name when available */}
              <p className="text-slate-600">Photography: [Credit Here]</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
