import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
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
  const defaultBio =
    `${candidateName} brings decades of experience in public service and community leadership to the campaign. With a proven track record of bringing people together to solve complex problems, ${candidateName} is committed to transparent, accountable governance that puts families first.`;

  const defaultQuote =
    "I didn't come to politics through party machines. I learned how this system works by living in this community.";

  const defaultConnection =
    `A lifelong resident of ${county} County, ${candidateName} understands the unique challenges and opportunities facing our communities. From small business owners to working families, ${candidateName} has spent years listening to and working alongside neighbors to build a better future for all.`;

  const displayBio = bio || defaultBio;
  const displayQuote = quote || defaultQuote;
  const displayConnection = connection || defaultConnection;

  return (
    <SectionWrapper id="about" background="cream" className="relative overflow-hidden">
      {/* Retro background pattern */}
      <div className="absolute inset-0 bg-retro-diagonal opacity-10 pointer-events-none" />
      
      {/* Section header */}
      <div className="relative mb-16 text-center">
        <div className="inline-block mb-4">
          <span className="text-sm font-bold uppercase tracking-widest text-accent-500">The Candidate</span>
        </div>
        <h2 className="font-display text-4xl leading-none sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
          About {candidateName}
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left column - Image */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Optional decorative shape */}
            <div className="absolute -right-4 -bottom-4 h-full w-full rounded-lg bg-primary-200 rotate-3 opacity-50 lg:-right-6 lg:-bottom-6" />

            {/* Candidate photo */}
            <div className="relative z-10">
              <OptimizedImage
                src={IMAGE_PATHS.candidate.about}
                alt={`${candidateName} at a community event`}
                width={600}
                height={800}
                priority={false}
                placeholder="blur"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Right column - Bio */}
        <div className="order-1 space-y-6 lg:order-2">
          {/* Bio paragraph */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">{displayBio}</p>
          </div>

          {/* Pull quote - retro-modern style */}
          <div className="relative my-8 rounded-xl bg-white p-8 shadow-xl border-2 border-accent-500/20 lg:p-10">
            {/* Decorative quotation marks */}
            <div className="absolute left-6 top-4 text-accent-500 opacity-30">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-16 w-16"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="relative z-10 pl-12">
              <p className="font-display text-2xl leading-tight text-navy sm:text-3xl lg:text-4xl tracking-tight">
                {displayQuote}
              </p>
            </blockquote>
          </div>

          {/* Connection paragraph */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">{displayConnection}</p>
          </div>

          {/* Credentials list (optional) */}
          {credentials && credentials.length > 0 && (
            <div className="prose prose-lg max-w-none">
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                {credentials.map((credential, index) => (
                  <li key={index} className="leading-relaxed">
                    {credential}
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
              The district encompasses communities across {county} County, {state},
              representing diverse neighborhoods, rural areas, and urban centers.
              This district includes [specific areas/communities] and serves
              approximately [number] residents.
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
