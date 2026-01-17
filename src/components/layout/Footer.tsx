import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";
  const state = process.env.NEXT_PUBLIC_STATE || "State";
  const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Issues", href: "#issues" },
    { label: "Endorsements", href: "#endorsements" },
    { label: "Events", href: "#events" },
    { label: "Volunteer", href: "#volunteer" },
    { label: "Yard Signs", href: "#yard-signs" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      ariaLabel: "Visit our Facebook page",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      ariaLabel: "Visit our Instagram page",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      ariaLabel: "Visit our Twitter page",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "#",
      ariaLabel: "Visit our YouTube channel",
    },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Four-column grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Branding */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-heading font-bold">{candidateName}</h3>
              <p className="mt-1 text-sm text-gray-300">for {office}</p>
            </div>
            <Button
              href={actBlueUrl}
              external
              variant="accent"
              size="md"
              className="w-full sm:w-auto"
            >
              Donate
            </Button>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-gray-300">
              <p>
                <a
                  href="mailto:info@candidateforcounty.com"
                  className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded-sm"
                >
                  info@candidateforcounty.com
                </a>
              </p>
              <p>
                {county} County, {state}
              </p>
              <p className="text-gray-400">
                Mailing address available upon request
              </p>
            </address>
          </div>

          {/* Column 4 - Social Media */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="rounded-full p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legal section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col gap-4 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="font-semibold text-white">
                Paid for by {candidateName} for {office}
              </p>
              <p>Campaign finance information available upon request</p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end sm:text-right">
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy rounded-sm"
                >
                  Terms of Service
                </Link>
              </div>
              <p>&copy; {currentYear} {candidateName}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
