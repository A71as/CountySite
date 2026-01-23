import type { Metadata } from "next";
import { VolunteerPageContent } from "./VolunteerPageContent";

const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "David Guirgis";
const office = process.env.NEXT_PUBLIC_OFFICE || "Hudson County Commissioner";

export const metadata: Metadata = {
  title: `Volunteer | ${candidateName} for ${office}`,
  description: `Join the ${candidateName} campaign as a volunteer. Help us build a better Hudson County through canvassing, phone banking, event support, and more.`,
};

export default function VolunteerPage() {
  return <VolunteerPageContent />;
}
