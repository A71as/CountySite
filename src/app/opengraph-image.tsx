import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Campaign Open Graph Image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "Candidate";
  const office = process.env.NEXT_PUBLIC_OFFICE || "Office";
  const county = process.env.NEXT_PUBLIC_COUNTY || "County";
  const state = process.env.NEXT_PUBLIC_STATE || "State";

  return new ImageResponse(
    <div
      style={{
        fontSize: 60,
        background: "#E92128",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontFamily: "system-ui, sans-serif",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "22px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            color: "#1C1917",
            borderRadius: "18px",
            padding: "18px 36px",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {candidateName}!
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: "#FFFFFF",
            opacity: 1,
          }}
        >
          Democratic Socialist for {office}
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            marginTop: "12px",
            color: "#FFAEAE",
          }}
        >
          {county} County, {state}
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
