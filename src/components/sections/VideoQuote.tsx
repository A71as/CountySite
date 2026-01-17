import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

export interface VideoQuoteProps {
  quote: string;
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
    <SectionWrapper
      id={id}
      background="cream"
      className="bg-cream relative overflow-hidden"
    >
      {/* Retro background pattern */}
      <div className="absolute inset-0 bg-retro-diagonal opacity-20 pointer-events-none" />
      
      <div
        className={cn(
          "relative grid gap-8 lg:gap-16",
          hasVideo ? "lg:grid-cols-2" : "lg:grid-cols-1 lg:max-w-5xl lg:mx-auto"
        )}
      >
        {/* Quote column */}
        <div className="flex flex-col justify-center">
          <div className="relative">
            {/* Decorative quotation marks - retro style */}
            <div className="absolute -left-6 -top-6 text-accent-500 opacity-30">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Quote text - retro-modern typography */}
            <blockquote className="relative z-10 pl-12 sm:pl-16 lg:pl-20">
              <p className="font-display text-3xl leading-tight text-navy sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                {displayQuote}
              </p>
              {attribution && (
                <footer className="mt-6 text-lg font-bold text-primary-600 sm:text-xl uppercase tracking-wide">
                  — {attribution}
                </footer>
              )}
            </blockquote>
          </div>
        </div>

        {/* Video column - only show if video URL is provided */}
        {hasVideo && (
          <div className="flex items-center justify-center">
            <div className="w-full overflow-hidden rounded-lg shadow-2xl">
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
