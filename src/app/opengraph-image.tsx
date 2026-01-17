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
    (
          <div
            style={{
              fontSize: 60,
              background: "#0033A0",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
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
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              lineHeight: 1.2,
            }}
          >
            {candidateName}
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              opacity: 0.9,
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
      </div>
    ),
    {
      ...size,
    }
  );
}
