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
  const defaultBio = `${candidateName} brings decades of experience in public service and community leadership to the campaign. With a proven track record of bringing people together to solve complex problems, ${candidateName} is committed to transparent, accountable governance that puts families first.`;

  const defaultQuote =
    "I didn't come to politics through party machines. I learned how this system works by living in this community.";

  const defaultConnection = `A lifelong resident of ${county} County, ${candidateName} understands the unique challenges and opportunities facing our communities. From small business owners to working families, ${candidateName} has spent years listening to and working alongside neighbors to build a better future for all.`;

  const displayBio = bio || defaultBio;
  const displayQuote = quote || defaultQuote;
  const displayConnection = connection || defaultConnection;

  return (
    <SectionWrapper id="about" background="cream">
      {/* Swiss-style section header - minimal, systematic */}
      <div className="mb-20 max-w-5xl">
        <div className="uppercase text-xs tracking-[0.2em] text-primary-600 font-medium mb-6">
          Background
        </div>
        <h2 className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
          {candidateName}
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
        {/* Left column - Image */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Candidate photo with elegant shadow */}
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <OptimizedImage
                src={IMAGE_PATHS.candidate.about}
                alt={`${candidateName} at a community event`}
                width={600}
                height={800}
                priority={false}
                placeholder="blur"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Right column - Bio */}
        <div className="order-1 space-y-6 lg:order-2">
          {/* Bio paragraph */}
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed">{displayBio}</p>
          </div>

          {/* Pull quote - clean, credible style */}
          <div className="relative my-8 border-l-4 border-accent-500 bg-slate-50 pl-6 py-6">
            <blockquote className="relative">
              <p className="font-heading text-xl leading-snug text-slate-900 sm:text-2xl italic">
                &ldquo;{displayQuote}&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Connection paragraph */}
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 leading-relaxed">
              {displayConnection}
            </p>
          </div>

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
                      className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0"
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
