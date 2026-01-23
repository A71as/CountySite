import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SignupForm } from "@/components/forms/SignupForm";
import { IMAGE_PATHS } from "@/lib/constants/images";

export function Hero() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";

  return (
    <SectionWrapper id="home" background="default">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-12 lg:gap-12 min-h-[600px]">
        {/* Left column - Content (flush left, 7 columns) */}
        <div className="order-2 flex flex-col justify-center space-y-10 lg:order-1 lg:col-span-7 py-12 lg:py-0">
          {/* Systematic label - Swiss style */}
          <div className="uppercase text-xs tracking-[0.2em] text-primary-600 font-medium">
            {office}
          </div>

          {/* Swiss-style headline - no decoration, pure hierarchy */}
          <h1 className="font-heading text-5xl font-bold leading-[1.05] text-slate-900 sm:text-6xl lg:text-7xl max-w-xl">
            {candidateName}
          </h1>

          {/* Subheadline with red accent bar - flush left */}
          <div className="border-l-[6px] border-primary-500 pl-6 max-w-lg">
            <p className="text-lg text-slate-700 leading-relaxed sm:text-xl">
              Building stronger communities through transparent governance and
              local accountability.
            </p>
          </div>

          {/* Trust signals - grid-based, systematic */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2 max-w-md">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-500 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm text-slate-700 leading-tight">
                Local Resident
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary-500 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm text-slate-700 leading-tight">
                Community Leader
              </span>
            </div>
          </div>

          {/* Clean signup form */}
          <div className="pt-6 max-w-md">
            <SignupForm />
          </div>
        </div>

        {/* Right column - Image (flush right, 5 columns) */}
        <div className="order-1 lg:order-2 lg:col-span-5 relative min-h-[400px] lg:min-h-full">
          <div className="absolute inset-0 lg:absolute lg:right-0 lg:left-auto lg:w-full bg-slate-100">
            <OptimizedImage
              src={IMAGE_PATHS.candidate.hero}
              alt={`${candidateName} for ${office}`}
              fill
              priority={true}
              placeholder="blur"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
