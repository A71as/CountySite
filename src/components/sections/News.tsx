import { ExternalLink } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";

interface NewsItem {
  headline: string;
  source: string;
  date: string;
  excerpt: string;
  link: string;
}

export function News() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";

  const newsItems: NewsItem[] = [
    {
      headline: `${candidateName} Announces Run for County Commissioner`,
      source: "County Tribune",
      date: "March 1, 2024",
      excerpt:
        "In a packed community center, local organizer and longtime resident announced their candidacy, promising to bring fresh leadership to county government.",
      link: "#",
    },
    {
      headline: "Local Organizer Brings Fresh Perspective to County Race",
      source: "Daily News",
      date: "March 5, 2024",
      excerpt:
        "With deep roots in the community and a track record of organizing for change, the candidate brings a different approach to local politics.",
      link: "#",
    },
    {
      headline: `Union Members Rally Behind ${candidateName}`,
      source: "Labor Weekly",
      date: "March 10, 2024",
      excerpt:
        "Local unions have thrown their support behind the campaign, citing the candidate's commitment to working families and economic justice.",
      link: "#",
    },
  ];

  return (
    <SectionWrapper id="news" background="cream">
      {/* Section header */}
      <div className="mb-12 text-center">
        <div className="mb-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-600">
            Press Coverage
          </span>
        </div>
        <h2 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          In the News
        </h2>
        <p className="mt-4 text-lg text-slate-600 sm:text-xl">
          What people are saying
        </p>
      </div>

      {/* News cards - horizontal scroll on mobile, grid on desktop */}
      <div className="overflow-x-auto pb-4 lg:overflow-visible lg:pb-0">
        <div className="flex gap-6 lg:grid lg:grid-cols-3 lg:gap-6">
          {newsItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex min-w-[280px] flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:shadow-elevated hover:border-primary-300",
                "lg:min-w-0",
              )}
            >
              {/* Source */}
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-600">
                {item.source}
              </p>

              {/* Headline */}
              <h3 className="mb-3 font-heading text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                {item.headline}
                <ExternalLink className="ml-2 inline-block h-4 w-4 text-slate-400 group-hover:text-accent-500" />
              </h3>

              {/* Excerpt */}
              <p className="mb-4 flex-grow text-sm leading-relaxed text-slate-600">
                {item.excerpt}
              </p>

              {/* Date */}
              <p className="text-xs text-slate-500">{item.date}</p>
            </a>
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="mt-12 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-primary-600 transition-colors hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-blush rounded-sm"
        >
          View all press coverage
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </SectionWrapper>
  );
}
