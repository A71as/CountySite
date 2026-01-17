import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { IMAGE_PATHS } from "@/lib/constants/images";

export function Donate() {
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";
  const actBlueBaseUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";

  const donationAmounts = [10, 25, 50, 100, 250];

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
    <SectionWrapper id="donate" background="default" className="relative overflow-hidden">
      {/* Retro background elements */}
      <div className="absolute inset-0 bg-retro-diagonal opacity-10 pointer-events-none" />
      
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left column - Image */}
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            {/* Retro decorative border */}
            <div className="absolute inset-0 border-4 border-accent-500 rounded-xl opacity-20"></div>
            <OptimizedImage
              src={IMAGE_PATHS.candidate.action}
              alt="Campaign action photo showing candidate at a rally or canvassing event"
              width={600}
              height={800}
              priority={false}
              placeholder="blur"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right column - Content */}
        <div className="order-1 flex flex-col justify-center space-y-8 lg:order-2">
          {/* Label - retro style */}
          <div className="inline-flex items-center gap-2 self-start px-4 py-2 bg-accent-500 text-white rounded-full text-sm font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            DONATE
          </div>

          {/* Heading - retro-modern typography */}
          <h2 className="font-display text-4xl leading-none sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
            People will power this campaign.
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 text-gray-800">
            <p className="text-xl leading-relaxed font-medium">
              No corporate PAC money. No dark money. Just people like you who
              believe in <span className="text-primary-600 font-bold">{county}'s</span> future.
            </p>
            <p className="text-xl leading-relaxed font-medium">
              Contribute what you can to help us win.
            </p>
          </div>

          {/* Donation amount buttons - retro-modern style */}
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
            {donationAmounts.map((amount) => (
              <a
                key={amount}
                href={getActBlueUrl(amount)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center justify-center rounded-lg border-2 border-gray-300 px-4 py-4 text-center font-display text-xl transition-all",
                  "hover:border-accent-500 hover:bg-accent-500 hover:text-white hover:shadow-lg hover:scale-105",
                  "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                )}
              >
                ${amount}
              </a>
            ))}
            <a
              href={actBlueBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "col-span-3 flex items-center justify-center rounded-lg bg-accent-500 px-4 py-4 text-center font-display text-xl font-bold text-white transition-all shadow-lg",
                "hover:bg-accent-600 hover:shadow-xl hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
                "sm:col-span-1"
              )}
            >
              Other
            </a>
          </div>

          {/* FEC disclaimer */}
          <p className="mt-6 text-xs leading-relaxed text-gray-500">
            Contributions are not tax deductible. Federal law requires us to
            collect and report the name, address, occupation, and employer of
            contributors.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
