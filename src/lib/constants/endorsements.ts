/**
 * Endorsements data — single source of truth.
 * Edit this file to add/remove endorsements; no layout code changes needed.
 *
 * Structure:
 * - type: "organization" | "individual"
 * - name: string
 * - title: string (organization subtitle or individual title/office)
 * - image: string (logo URL for organizations, headshot URL for individuals)
 * - quote?: string (organizations; optional for individuals)
 */

export type EndorsementType = "organization" | "individual";

export interface Endorsement {
  type: EndorsementType;
  name: string;
  title: string;
  image: string;
  quote?: string;
}

export const ENDORSEMENTS: Endorsement[] = [
  // ─── ORGANIZATIONS (large cards with logos + quotes) ───
  {
    type: "organization",
    name: "North Jersey DSA",
    title: "",
    image: "/images/logos/NNJDSA.png",
    quote:
      "David Guirgis represents the grassroots, working-class politics Hudson County needs. He's committed to fighting for housing justice, worker rights, and democratic accountability.",
  },
  {
    type: "organization",
    name: "Working Families Party",
    title: "",
    image: "/images/logos/NJWFP.png",
    quote:
      "We're proud to endorse David Guirgis for Hudson County Commissioner. He shares our vision of a county that works for working families, not developers and special interests.",
  },

  // ─── INDIVIDUALS (row/grid: circular headshot, name, title/office) ───
  // Add headshot paths under /images/endorsements/ when available; placeholder until then.
  {
    type: "individual",
    name: "Katie Brennan",
    title: "Former Jersey City Council candidate",
    image: "/images/placeholder.svg",
  },
  {
    type: "individual",
    name: "Joel Brooks",
    title: "Community advocate",
    image: "/images/placeholder.svg",
  },
  {
    type: "individual",
    name: "Jake Ephros",
    title: "Organizer",
    image: "/images/placeholder.svg",
  },
  {
    type: "individual",
    name: "Eleana Little",
    title: "Community leader",
    image: "/images/placeholder.svg",
  },
  {
    type: "individual",
    name: "Michael Griffin",
    title: "Community advocate",
    image: "/images/placeholder.svg",
  },
];
