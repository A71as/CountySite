"use client";

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
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
    <SectionWrapper id="volunteer" background="default">
      {/* Section header — scroll reveal (no form animation) */}
      <ScrollReveal variant="header" className="mb-12 text-center">
        <div className="mb-3">
          <span className="text-sm font-subhead font-bold uppercase tracking-wide text-accent-600">
            Join Us
          </span>
        </div>
        <h2 className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl uppercase tracking-tight">
          Get Involved
        </h2>
        <p className="mt-4 text-lg text-slate-600 sm:text-xl">
          Every action makes a difference
        </p>
      </ScrollReveal>

      {/* Three tiers of engagement — varied organic radii + tilts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Tier 1 - Low commitment */}
        <div className="organic-card-1 border-2 border-slate-200 bg-white p-8 shadow-soft transition-all duration-200 hover:shadow-elevated hover:-translate-y-1 tilt-1">
          <div className="mb-6 flex items-center justify-center">
            <div className="organic-sm bg-primary-50 p-4">
              <Share2 className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h3 className="mb-4 text-center font-display text-xl font-bold text-slate-900 uppercase tracking-tight">
            Spread the Word
          </h3>
          <div className="space-y-4">
            <p className="text-center text-sm text-slate-600">
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
                    className="rounded-full p-3 text-primary-600 transition-all hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <p className="text-center text-sm text-slate-600">
              Share with friends and family
            </p>
          </div>
        </div>

        {/* Tier 2 - Medium commitment */}
        <div className="organic-card-2 border-2 border-primary-200 bg-primary-50/30 p-8 shadow-soft transition-all duration-200 hover:shadow-elevated hover:-translate-y-1 tilt-2">
          <div className="mb-6 flex items-center justify-center">
            <div className="organic-sm bg-primary-100 p-4">
              <Flag className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h3 className="mb-4 text-center font-display text-xl font-bold text-slate-900 uppercase tracking-tight">
            Show Your Support
          </h3>
          <div className="space-y-4">
            <Link href="#yard-sign">
              <Button variant="primary" size="md" className="w-full">
                Request a Yard Sign
              </Button>
            </Link>
            <a
              href="#"
              className="flex items-center justify-center gap-2 organic-sm border-2 border-slate-300 bg-white px-4 py-3 text-sm font-subhead font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-primary-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
            >
              <Download className="h-4 w-4" />
              Download Graphics
            </a>
          </div>
        </div>

        {/* Tier 3 - High commitment */}
        <div className="organic-card-3 border-2 border-accent-200 bg-accent-50/30 p-8 shadow-soft transition-all duration-200 hover:shadow-elevated hover:-translate-y-1 tilt-3">
          <div className="mb-6 flex items-center justify-center">
            <div className="organic-sm bg-accent-100 p-4">
              <Users className="h-8 w-8 text-accent-600" />
            </div>
          </div>
          <h3 className="mb-4 text-center font-display text-xl font-bold text-slate-900 uppercase tracking-tight">
            Join the Team
          </h3>
          <p className="mb-6 text-center text-sm text-slate-600 font-body">
            Knock doors, make calls, help at events
          </p>
          <div className="organic-form border-2 border-black bg-white p-4 block-shadow">
            <VolunteerForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
