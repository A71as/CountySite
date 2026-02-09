import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

import { IMAGE_PATHS } from "@/lib/constants/images";

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
      background="blush"
      className="relative overflow-hidden"
    >
      {/* Subtle crosshatch texture on blush bg */}
      <div
        className="absolute inset-0 brand-crosshatch-dark pointer-events-none"
        aria-hidden="true"
      />

      {/* Section header */}
      <div className="relative mb-20 max-w-5xl">
        <div className="uppercase text-xs tracking-[0.2em] text-primary-500 font-semibold mb-6">
          About
        </div>
        <h2 className="font-display text-5xl font-bold text-slate-900 uppercase tracking-tight sm:text-6xl lg:text-6xl leading-[0.95]">
          Meet {candidateName.split(" ")[0]}
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left column - Image with brand-red frame accent */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Brand red accent border — echoes the speech bubble outline */}
            <div
              className="absolute -inset-2 bg-primary-500 rounded-sm"
              aria-hidden="true"
            />
            {/* Candidate photo */}
            <div className="relative rounded-sm overflow-hidden shadow-elevated">
              <OptimizedImage
                src={IMAGE_PATHS.candidate.about}
                alt={`${candidateName} at his Columbia University graduation, where he earned his Master of Social Work degree to serve his community`}
                width={600}
                height={750}
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Right column - Bio */}
        <div className="order-1 space-y-6 lg:order-2">
          {/* Bio paragraphs */}
          <div className="prose prose-lg max-w-none space-y-4">
            {displayBio.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Pull quote — speech-bubble-style card with brand red accent */}
          <div className="relative my-8 bg-white rounded-2xl p-6 sm:p-8 shadow-soft border-2 border-primary-500/20">
            {/* Speech bubble tail */}
            <div
              className="absolute -bottom-3 left-8 w-0 h-0"
              style={{
                borderLeft: "8px solid transparent",
                borderRight: "12px solid transparent",
                borderTop: "14px solid white",
              }}
              aria-hidden="true"
            />
            <blockquote className="relative">
              <div
                className="w-10 h-1 bg-primary-500 mb-4"
                aria-hidden="true"
              />
              <p className="font-heading text-xl leading-snug text-slate-900 sm:text-2xl italic">
                &ldquo;{displayQuote}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Connection paragraph */}
          {displayConnection && (
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {displayConnection}
              </p>
            </div>
          )}

          {/* Credentials list (optional) */}
          {credentials && credentials.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
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
          <div className="rounded-lg border-2 border-gray-200 bg-white p-8 text-center shadow-sm">
            <h3 className="mb-4 font-heading text-2xl font-semibold text-gray-900">
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
              <div className="h-64 w-full max-w-2xl rounded-lg bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Map graphic placeholder</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
