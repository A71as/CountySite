import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import { IMAGE_PATHS } from "@/lib/constants/images";

export function Donate() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
  const actBlueBaseUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";

  const donationAmounts = [10, 25, 50, 100, 250, 500];

  const getActBlueUrl = (amount?: number) => {
    if (!amount || actBlueBaseUrl === "#") {
      return actBlueBaseUrl;
    }
    try {
      const url = new URL(actBlueBaseUrl);
      url.searchParams.set("amount", amount.toString());
      return url.toString();
    } catch {
      // If URL construction fails, append query param manually
      const separator = actBlueBaseUrl.includes("?") ? "&" : "?";
      return `${actBlueBaseUrl}${separator}amount=${amount}`;
    }
  };

  return (
    <SectionWrapper id="donate" background="default">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-12 lg:gap-16 min-h-[500px]">
        {/* Left column - Content (7 columns) */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center py-12 lg:py-0">
          {/* Swiss-style systematic label */}
          <div className="uppercase text-xs tracking-[0.2em] text-primary-600 font-medium mb-6">
            Support the Campaign
          </div>

          {/* Swiss-style headline */}
          <h2 className="font-heading text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl max-w-xl mb-8">
            People-powered. No exceptions.
          </h2>

          {/* Subheadline with red accent bar */}
          <div className="border-l-[6px] border-primary-500 pl-6 max-w-lg mb-10">
            <p className="text-lg text-slate-700 leading-relaxed">
              No corporate PAC money. No developers. No dark money. Just working 
              people who believe Hudson County can do better.
            </p>
          </div>

          {/* Donation amount grid - Swiss clean grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mb-6">
            {donationAmounts.map((amount) => (
              <a
                key={amount}
                href={getActBlueUrl(amount)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center border-2 border-slate-300 px-4 py-4 text-center font-heading text-lg font-semibold transition-all bg-white",
                  "hover:border-primary-500 hover:bg-primary-50",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                )}
              >
                ${amount}
              </a>
            ))}
          </div>

          {/* Main donate CTA */}
          <a
            href={actBlueBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "max-w-md flex items-center justify-center bg-primary-500 px-8 py-4 text-center font-heading text-lg font-bold text-white transition-all",
              "hover:bg-primary-600",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
            )}
          >
            Donate Now via ActBlue
          </a>

          {/* FEC disclaimer */}
          <p className="mt-8 text-xs leading-relaxed text-slate-500 max-w-md">
            Contributions are not tax deductible. Federal law requires us to
            collect and report the name, address, occupation, and employer of
            contributors.
          </p>
        </div>

        {/* Right column - Image (5 columns) */}
        <div className="order-1 lg:order-2 lg:col-span-5 relative min-h-[300px] lg:min-h-full">
          <div className="absolute inset-0 bg-slate-100">
            <OptimizedImage
              src={IMAGE_PATHS.candidate.action}
              alt={`${candidateName} at a community event`}
              fill
              priority={false}
              placeholder="blur"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
