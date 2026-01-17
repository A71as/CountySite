import {
  Share2,
  Flag,
  Users,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Download,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function GetInvolved() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      ariaLabel: "Follow us on Facebook",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      ariaLabel: "Follow us on Instagram",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      ariaLabel: "Follow us on Twitter",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "#",
      ariaLabel: "Follow us on YouTube",
    },
  ];

  return (
    <SectionWrapper id="volunteer" background="default" className="bg-white">
      {/* Section header */}
      <div className="mb-12 text-center">
        <h2 className="font-heading text-3xl font-bold text-primary-600 sm:text-4xl lg:text-5xl">
          Get Involved
        </h2>
        <p className="mt-4 text-lg text-gray-700 sm:text-xl">
          Every action makes a difference
        </p>
      </div>

      {/* Three tiers of engagement */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Tier 1 - Low commitment */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-4 flex items-center justify-center">
            <Share2 className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="mb-4 text-center font-heading text-xl font-bold text-navy">
            Spread the Word
          </h3>
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-700">
              Follow us on social media
            </p>
            <div className="flex justify-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="rounded-full p-2 text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <p className="text-center text-sm text-gray-700">
              Share with friends and family
            </p>
          </div>
        </div>

        {/* Tier 2 - Medium commitment */}
        <div className="rounded-lg border-2 border-primary-200 bg-primary-50 p-6 shadow-sm lg:p-8">
          <div className="mb-4 flex items-center justify-center">
            <Flag className="h-10 w-10 text-primary-600" />
          </div>
          <h3 className="mb-4 text-center font-heading text-xl font-bold text-navy">
            Show Your Support
          </h3>
          <div className="space-y-4">
            <Link href="#yard-sign">
              <Button
                variant="primary"
                size="md"
                className="w-full"
              >
                Request a Yard Sign
              </Button>
            </Link>
            <a
              href="#"
              className="flex items-center justify-center gap-2 rounded-md border border-primary-300 bg-white px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
            >
              <Download className="h-4 w-4" />
              Download Shareable Graphics
            </a>
          </div>
        </div>

        {/* Tier 3 - High commitment */}
        <div className="rounded-lg border-2 border-accent-200 bg-accent-50 p-6 shadow-sm lg:p-8">
          <div className="mb-4 flex items-center justify-center">
            <Users className="h-10 w-10 text-accent-600" />
          </div>
          <h3 className="mb-4 text-center font-heading text-xl font-bold text-navy">
            Join the Team
          </h3>
          <p className="mb-6 text-center text-sm text-gray-700">
            Knock doors, make calls, help at events
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <VolunteerForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
