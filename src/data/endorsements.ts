// Central endorsements data used by the Endorsements section.
// Editing this file lets the campaign team add or update endorsements
// without touching component logic.

export type EndorsementType = "organization" | "individual";

export interface Endorsement {
  name: string;
  type: EndorsementType;
  logo?: string;
  title?: string;
  quote?: string;
}

export const ENDORSEMENTS: Endorsement[] = [
  // -------------------------------------
  // ORGANIZATIONS
  // -------------------------------------
  {
    name: "North New Jersey DSA",
    type: "organization",
    logo: "/images/logos/NNJDSA.png",
    quote:
      "David Guirgis represents the grassroots, working-class politics Hudson County needs. He's committed to fighting for housing justice, worker rights, and democratic accountability.",
  },
  {
    name: "NJ Working Families Party",
    type: "organization",
    logo: "/images/logos/NJWFP.png",
    quote:
      "We're proud to endorse David Guirgis for Hudson County Commissioner. He shares our vision of a county that works for working families, not developers and special interests.",
  },
  // -------------------------------------
  // Add more organizations here...
  // -------------------------------------

  // -------------------------------------
  // INDIVIDUALS
  // -------------------------------------
  // {
  //   name: "Jane Doe",
  //   type: "individual",
  //   title: "Community Leader, Jersey City",
  //   quote: "David has been organizing alongside our community for years...",
  // },
  // -------------------------------------
  // Add more individuals here...
  // -------------------------------------
];

