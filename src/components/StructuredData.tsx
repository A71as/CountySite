import { IMAGE_PATHS } from "@/lib/constants/images";

export function StructuredData() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";
  const state = process.env.NEXT_PUBLIC_STATE || "State";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const actBlueUrl = process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";
  const baseUrl = siteUrl.replace(/\/$/, "");

  // Organization schema for the campaign
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${candidateName} for ${office}`,
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    description: `Campaign website for ${candidateName} running for ${office} in ${county} County, ${state}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: county,
      addressRegion: state,
      addressCountry: "US",
    },
    sameAs: [
      // Add social media URLs when available
      // "https://www.facebook.com/...",
      // "https://www.twitter.com/...",
    ],
  };

  // Person schema for the candidate
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: candidateName,
    jobTitle: `Candidate for ${office}`,
    description: `${candidateName} is running for ${office} in ${county} County, ${state}`,
    image: `${baseUrl}${IMAGE_PATHS.candidate.hero}`,
    url: baseUrl,
    knowsAbout: [
      "Public Policy",
      "Community Leadership",
      "Government",
      office,
    ],
  };

  // WebSite schema with search potential
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${candidateName} for ${office}`,
    url: baseUrl,
    description: `Official campaign website for ${candidateName} running for ${office} in ${county} County, ${state}`,
    publisher: {
      "@type": "Organization",
      name: `${candidateName} for ${office}`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // PoliticalCandidate schema
  const politicalCandidateSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: candidateName,
    jobTitle: `Candidate for ${office}`,
    description: `${candidateName} is running for ${office} in ${county} County, ${state}`,
    image: `${baseUrl}${IMAGE_PATHS.candidate.hero}`,
    url: baseUrl,
    affiliation: {
      "@type": "Organization",
      name: `${candidateName} for ${office}`,
    },
    knowsAbout: [office, "Public Policy", "Community Leadership"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(politicalCandidateSchema),
        }}
      />
    </>
  );
}
