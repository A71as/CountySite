import { SectionWrapper } from "@/components/ui/SectionWrapper";
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
  const defaultQuote = `We will usher in a new era of accountability and transparency in ${county} government.`;
  const displayQuote = quote || defaultQuote;

  // Extract YouTube video ID from URL if provided
  const getYouTubeId = (url?: string): string | null => {
    if (!url) return null;

    // Handle various YouTube URL formats
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

  return (
    <SectionWrapper id={id} background="cream">
      <div
        className={cn(
          "grid gap-12 lg:gap-16",
          hasVideo
            ? "lg:grid-cols-2"
            : "lg:grid-cols-1 lg:max-w-5xl lg:mx-auto",
        )}
      >
        {/* Quote column */}
        <div className="flex flex-col justify-center">
          <div className="border-l-4 border-accent-500 pl-6 sm:pl-8">
            {/* Quote text */}
            <blockquote>
              <p className="font-display text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-5xl italic">
                &ldquo;{displayQuote}&rdquo;
              </p>
              {attribution && (
                <footer className="mt-6 text-lg font-semibold text-slate-700">
                  — {attribution}
                </footer>
              )}
            </blockquote>
          </div>
        </div>

        {/* Video column - only show if video URL is provided */}
        {hasVideo && (
          <div className="flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-xl shadow-elevated">
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
        )}
      </div>
    </SectionWrapper>
  );
}
