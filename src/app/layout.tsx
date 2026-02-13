import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Barlow_Semi_Condensed, Homemade_Apple } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { ClientLayout } from "@/components/ClientLayout";

/* ── Brand type system (from brand guide) ── */

// H1/Hero headlines only — Barber Chop, bold, uppercase, red (#E92128) or black (#000000)
const barberChop = localFont({
  src: "../../public/images/logos/BarberChop.otf",
  variable: "--font-display",
  display: "swap",
  weight: "700",
});

// H2/Section headers & subheadings — Bernoru Semicondensed, bold (Barlow Semi Condensed until brand font file added)
const bernoru = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-section",
  display: "swap",
});

// Body text — Gelica (brand serif) from public/images/Gelica-fontiko/
const gelica = localFont({
  src: [
    { path: "../../public/images/Gelica-fontiko/Gelica-Extra-Light.otf", weight: "200" },
    { path: "../../public/images/Gelica-fontiko/Gelica-Light.otf", weight: "300" },
    { path: "../../public/images/Gelica-fontiko/Gelica-Regular.otf", weight: "400" },
    { path: "../../public/images/Gelica-fontiko/Gelica-Medium.otf", weight: "500" },
    { path: "../../public/images/Gelica-fontiko/Gelica-Semi-Bold.otf", weight: "600" },
    { path: "../../public/images/Gelica-fontiko/Gelica-Bold.otf", weight: "700" },
    { path: "../../public/images/Gelica-fontiko/Gelica-Black.otf", weight: "900" },
    { path: "../../public/images/Gelica-fontiko/Gelica-Italic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});

// Accent/callout — Homemade Apple, handwritten script; use sparingly + rotate(-2deg)
const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-accent",
  display: "swap",
});
// Get environment variables for metadata
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
const county = process.env.NEXT_PUBLIC_COUNTY || "County";
const state = process.env.NEXT_PUBLIC_STATE || "State";

// Export metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${candidateName} for ${office}`,
    template: `%s | ${candidateName} for ${office}`,
  },
  description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}. Learn about our platform, volunteer opportunities, and how you can help bring change to our community.`,
  keywords: [
    candidateName,
    office,
    county,
    state,
    "campaign",
    "election",
    "politics",
    "volunteer",
    "donate",
    "yard sign",
    "political campaign",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${candidateName} for ${office}`,
    title: `${candidateName} for ${office}`,
    description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}.`,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${candidateName} for ${office}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${candidateName} for ${office}`,
    description: `Join ${candidateName}'s campaign for ${office} in ${county} County, ${state}.`,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${barberChop.variable} ${bernoru.variable} ${gelica.variable} ${homemadeApple.variable}`}
    >
      <body
        className={`${gelica.className} bg-background text-foreground antialiased font-body text-base`}
      >
        <div className="poster-frame" aria-hidden="true" />
        <a
          href="#main"
          className="skip-link"
        >
          Skip to main content
        </a>
        <ClientLayout>
          <StructuredData />
          <AnnouncementBar />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Analytics />
        </ClientLayout>
      </body>
    </html>
  );
}
