"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { IMAGE_PATHS } from "@/lib/constants/images";

/** Key phrases to bold in the bio for scannable emphasis (mailer-style) */
const BIO_BOLD_PHRASES = [
  "social worker, organizer, and democratic socialist",
  "Right to Counsel",
  "free community college for all",
  "green social housing",
  "universal childcare",
  "audit everything",
];

/** Wraps key phrases in bold for scannable emphasis; returns array of string | JSX */
function bioWithBoldPhrases(text: string): (string | React.ReactNode)[] {
  type Segment = { type: "text"; value: string } | { type: "bold"; value: string };
  const segments: Segment[] = [{ type: "text", value: text }];
  for (const phrase of BIO_BOLD_PHRASES) {
    const next: Segment[] = [];
    for (const seg of segments) {
      if (seg.type === "bold") {
        next.push(seg);
        continue;
      }
      let remaining = seg.value;
      while (true) {
        const i = remaining.indexOf(phrase);
        if (i === -1) {
          if (remaining.length) next.push({ type: "text", value: remaining });
          break;
        }
        if (i > 0) next.push({ type: "text", value: remaining.slice(0, i) });
        next.push({ type: "bold", value: phrase });
        remaining = remaining.slice(i + phrase.length);
      }
    }
    segments.length = 0;
    segments.push(...next);
  }
  return segments.map((seg, idx) =>
    seg.type === "bold" ? (
      <span key={`${seg.value}-${idx}`} className="font-bold text-slate-900">
        {seg.value}
      </span>
    ) : (
      seg.value
    )
  );
}

export interface AboutProps {
  bio?: string;
  quote?: string;
  connection?: string;
  credentials?: string[];
  showMap?: boolean;
}

export function About({
  bio,
  quote,
  connection,
  credentials,
  showMap = false,
}: AboutProps) {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";
  const state = process.env.NEXT_PUBLIC_STATE || "State";

  // Default content
  const defaultBio = `David Sabry Guirgis, LMSW is a social worker, organizer, and democratic socialist with lifelong roots in Jersey City. David grew up in poverty and an abusive childhood environment, but it was his mother's resilience — as well as her ability to get a free four-year college education and a union job as a patient care technician — that lifted her and her children out.\n\nFor his entire career, David has helped lead campaigns to tax the rich, end legacy college admissions, and fight for trans rights in Congress. And in Jersey City, he helped pass Right to Counsel and hold landlords accountable, keeping thousands of tenants in their homes.\n\nNow, he's running for Hudson County Commissioner in District 4 to deliver free community college for all; build green social housing and deliver universal childcare on county-owned land; and audit everything to end county corruption.`;

  const defaultQuote =
    "I didn't come to politics through party machines or climbing political ladders. I got here by living in this community — and fighting for it.";

  const defaultConnection = ``;

  const displayBio = bio || defaultBio;
  const displayQuote = quote || defaultQuote;
  const displayConnection = connection || defaultConnection;

  return (
    <SectionWrapper
      id="about"
      background="white"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 texture-speckle pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 brand-crosshatch-dark pointer-events-none opacity-80" aria-hidden="true" />

      {/* Section header — scroll reveal */}
      <ScrollReveal variant="header" className="relative mb-20 max-w-5xl">
        <div className="uppercase text-sm tracking-[0.25em] text-primary-500 font-subhead font-bold mb-6">
          About
        </div>
        <h2 className="font-display text-5xl font-bold text-primary-500 uppercase tracking-tight sm:text-6xl lg:text-7xl leading-[0.95] hand-underline inline-block">
          Meet {candidateName.split(" ")[0]}
        </h2>
      </ScrollReveal>

      {/* Two-column layout — photo column 1.5x text column */}
      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16 items-center">
        {/* Left column - Family photo: hand-drawn organic red border (mailer aesthetic) */}
        <div className="order-2 lg:order-1">
          <div className="relative slight-tilt-right" style={{ transform: "rotate(-2deg)" }}>
            <ScrollReveal variant="photo" className="relative photo-frame-standard overflow-hidden">
              <OptimizedImage
                src={IMAGE_PATHS.candidate.about}
                alt="David Guirgis with his mother at his graduation ceremony"
                width={600}
                height={750}
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                className="w-full h-auto"
                quality={82}
              />
            </ScrollReveal>
          </div>
        </div>

        {/* Right column - Bio */}
        <div className="order-1 space-y-6 lg:order-2">
          {/* Bio paragraphs — Gelica (serif), key phrases bolded for scannable emphasis */}
          <div className="prose prose-lg max-w-none space-y-4 font-body">
            {displayBio.split("\n\n").map((paragraph, i) => (
              <p key={i} className="font-body text-slate-700 leading-relaxed text-base sm:text-lg">
                {bioWithBoldPhrases(paragraph)}
              </p>
            ))}
          </div>

          {/* Pull quote — bold speech bubble callout */}
          <div className="relative my-8 slight-tilt-sm-right">
            <div className="speech-bubble-accent p-6 sm:p-8 shadow-soft bg-primary-50/40">
              <blockquote className="relative">
                <span
                  className="block font-display text-6xl sm:text-7xl text-primary-500 leading-none select-none mb-2 drop-shadow-sm"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="accent-callout font-display text-xl leading-snug text-slate-900 sm:text-2xl">
                  {displayQuote}
                </p>
                <span
                  className="block font-display text-6xl sm:text-7xl text-primary-500 leading-none select-none mt-1 text-right drop-shadow-sm"
                  aria-hidden="true"
                >
                  &rdquo;
                </span>
              </blockquote>
            </div>
          </div>

          {/* Connection paragraph */}
          {displayConnection && (
            <div className="prose prose-lg max-w-none font-body">
              <p className="font-body text-slate-700 leading-relaxed">
                {displayConnection}
              </p>
            </div>
          )}

          {/* Credentials list (optional) */}
          {credentials && credentials.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-heading font-bold text-slate-900 mb-4">
                Experience & Background
              </h3>
              <ul className="space-y-3">
                {credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-slate-700">{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* County map graphic section (optional) */}
      {showMap && (
        <div className="mt-12">
          <div className="organic-card-2 border-2 border-gray-200 bg-white p-8 text-center shadow-sm tilt-3">
            <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900">
              {county} County District
            </h3>
            <p className="mx-auto max-w-2xl text-gray-700">
              The district encompasses communities across {county} County,{" "}
              {state}, representing diverse neighborhoods, rural areas, and
              urban centers. This district includes [specific areas/communities]
              and serves approximately [number] residents.
            </p>
            {/* Placeholder for future map graphic */}
            <div className="mt-6 flex items-center justify-center">
              <div className="h-64 w-full max-w-2xl organic-md bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Map graphic placeholder</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
