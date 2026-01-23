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
        background: "#FFFFFF",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#000000",
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
            backgroundColor: "#E92128",
            color: "#FFFFFF",
            border: "10px solid #000000",
            borderRadius: "18px",
            padding: "18px 26px",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {candidateName}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            opacity: 1,
          }}
        >
          for {office}
        </div>
        <div
          style={{
            fontSize: 32,
            opacity: 0.8,
            marginTop: "20px",
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
