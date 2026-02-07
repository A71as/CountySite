import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { IMAGE_PATHS } from "@/lib/constants/images";
import { cn } from "@/lib/utils";

export interface VideoQuoteProps {
  quote?: string;
  attribution?: string;
  videoUrl?: string;
  id?: string;
}

export function VideoQuote({
  quote,
  attribution,
  videoUrl,
  id,
}: VideoQuoteProps) {
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";

  // Default quote if none provided
  const defaultQuote = `One out of every three tax dollars you pay go straight to ${county} County. I'm running to audit every dollar — and deliver free community college, green social housing, and universal childcare for our neighbors.`;
  const displayQuote = quote || defaultQuote;

  // Extract YouTube video ID from URL if provided
  const getYouTubeId = (url?: string): string | null => {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const videoId = videoUrl ? getYouTubeId(videoUrl) : null;
  const hasVideo = Boolean(videoId);

  // ── With video: dark section with video + quote side by side ──
  if (hasVideo) {
    return (
      <SectionWrapper id={id} background="dark" className="relative overflow-hidden">
        {/* Brand crosshatch texture */}
        <div className="absolute inset-0 brand-crosshatch pointer-events-none" aria-hidden="true" />

        <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Quote column */}
          <div className="flex flex-col justify-center">
            <div className="border-l-4 border-primary-500 pl-6 sm:pl-8">
              <blockquote>
                <p className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl uppercase tracking-tight">
                  &ldquo;{displayQuote}&rdquo;
                </p>
                {attribution && (
                  <footer className="mt-6 text-lg font-semibold text-accent-400">
                    — {attribution}
                  </footer>
                )}
              </blockquote>
            </div>
          </div>

          {/* Video column */}
          <div className="flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-sm shadow-elevated border border-white/10">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title="Campaign video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute left-0 top-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  // ── Without video: full-bleed photo background with overlaid quote ──
  return (
    <section
      id={id}
      className="relative w-full overflow-hidden"
    >
      {/* Background image */}
      <Image
        src={IMAGE_PATHS.candidate.quoteBackground}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_30%]"
        aria-hidden="true"
      />

      {/* Dark overlay for text legibility — deep brand red, not black */}
      <div className="absolute inset-0 bg-[#1C0A0C]/80" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="border-l-4 border-primary-500 pl-6 sm:pl-8">
          <blockquote>
            <p className="font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-tight">
              &ldquo;{displayQuote}&rdquo;
            </p>
            {attribution && (
              <footer className="mt-6 text-lg font-semibold text-accent-400">
                — {attribution}
              </footer>
            )}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
