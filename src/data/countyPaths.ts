// ═══════════════════════════════════════════════════════════
// County outline — from hudson_county_geojson.geojson
// District 4 — traced from official street-level district map
// Regenerate county: node scripts/convert-geojson.js
// ═══════════════════════════════════════════════════════════

export const VIEW_WIDTH = 600;
export const VIEW_HEIGHT = 768;

// Projection: x = (lon - minLon) * scaleX + padding
//             y = (maxLat - lat) * scaleY + padding
export const PROJ = {
  minLon: -74.166087,
  maxLon: -73.984883,
  minLat: 40.642149,
  maxLat: 40.823569,
  centerLat: 40.732859,
  scaleX: 2869.6938,
  scaleY: 3787.0737,
  padding: 40,
} as const;

// ── County outline (889 pts → 100 simplified from GeoJSON) ─────
export const COUNTY_PATH =
  "M40.3,326.3 L44.5,294.4 L47.7,283 L64.1,257.6 L69.5,239.8 L76.8,227 L89.1,212.6 L93.3,180.4 L142.3,213.9 L144.5,218.1 L144.6,229.1 L150.7,234 L151.6,236.9 L159.7,234.9 L169.4,238.3 L172,241.7 L177.5,242.5 L184.3,238.7 L183.5,234.9 L186.6,234.2 L186.6,230.4 L190.1,230.4 L189.8,225.8 L192.7,220.9 L202.4,214.8 L216.2,217.5 L220.8,221.7 L227.1,220.5 L229.1,230 L232.3,233 L235.7,243.2 L232.3,251.7 L237.4,259.5 L240.9,270.1 L242.6,272 L246.6,271.7 L248.3,268.6 L256.4,272.7 L263.9,252.2 L257.4,220.8 L258.1,210.3 L293.4,156.5 L293.5,148.2 L295.7,143 L311.7,139.7 L319.8,134.6 L329.7,117.8 L340.1,108.5 L360.3,102.8 L412.9,99.1 L418.1,93.3 L424.5,80.4 L434.3,80.8 L434.6,67 L438.8,66.8 L447.3,73 L444.4,67.4 L450.1,65.6 L450,59.6 L457.6,58.4 L459.5,55.3 L458.3,50.5 L461.4,49.6 L463.4,43 L467.2,40.1 L472.6,42.8 L477.2,42.3 L485.1,51.6 L482.8,59.2 L478.8,60.3 L480.5,69 L536.5,107.7 L535.2,125.1 L560,138.7 L477.1,293.6 L456,404.1 L441.2,508.3 L356.7,690.7 L267.5,691.3 L247.6,704 L201,704.9 L156.3,720 L132.3,721.2 L105.5,727.1 L53.5,719 L193,496.2 L171.4,447.7 L168.3,428.4 L180.9,367.4 L179.1,357.9 L164.3,348.5 L122.1,351.2 L107.1,359.1 L99.7,372.8 L94.2,377.7 L69.8,381.1 L57.5,377.4 L51.5,371.2 L40.3,336.8 L40.3,326.3 Z";

// ── Island holes ────────────────────────────────────────────────
export const HOLE_1_PATH =
  "M401,506.9 L402.4,511.7 L407.1,511.4 L403.3,506 L401.3,505.7 L401,506.9 Z";
export const HOLE_2_PATH =
  "M381.8,545.2 L383.3,547.8 L387.3,550.6 L389.2,551.4 L391.5,549.7 L390.6,545 L384.4,541.3 L381.3,541.6 L381.8,545.2 Z";

// ── District 4 — traced from official street-level map ──────────
//
// The shape is angular, following ward/census-block boundaries
// aligned to the street grid. Key features:
//
//   • Wide upper section (the Heights, Washington Park, Pershing Field)
//   • Distinctive east-side NOTCH where Hoboken/D5 territory juts in
//   • Lower section includes Journal Square wards (D, E, F)
//   • Angular step pattern at the southern boundary
//
// 25 vertices, clockwise from NW:
//
//   NW  (-74.080, 40.757)    Heights NW
//   ↗   (-74.075, 40.759)    north jog up
//   →   (-74.068, 40.759)    north edge
//   ↗   (-74.060, 40.762)    north jog up (Communipaw area)
//   →   (-74.048, 40.761)    heading east (Washington Park)
//   →   (-74.042, 40.761)    NE corner
//   ↘   (-74.038, 40.758)    turning south
//   ↓   (-74.036, 40.752)    east side upper Heights
//   ↓   (-74.034, 40.746)    east, approaching Palisades
//   ↓   (-74.034, 40.741)    start of east-side NOTCH
//   ←   (-74.048, 40.741)    notch jogs WEST (Hoboken cuts in)
//   ↓   (-74.048, 40.737)    notch south edge
//   →   (-74.035, 40.736)    back EAST for lower wards
//   ↓   (-74.033, 40.730)    east side (Ward E area)
//   ↓   (-74.033, 40.725)    east side continuing south
//   ←   (-74.038, 40.722)    SE step west
//   ↓   (-74.038, 40.718)    south-east dropping
//   ←   (-74.045, 40.717)    south step west
//   ←   (-74.055, 40.716)    south edge
//   ←   (-74.065, 40.718)    SW area
//   ←   (-74.072, 40.720)    SW corner
//   ↑   (-74.078, 40.724)    west side lower
//   ↑   (-74.080, 40.732)    west side mid
//   ↑   (-74.080, 40.740)    west side upper-mid
//   ↗   (-74.078, 40.748)    west side, slight jog east
//   → back to NW
//
export const DISTRICT_4_PATH =
  "M287.0,292.1 L301.4,284.5 L321.5,284.5 L344.4,273.2 L378.9,277.0 L396.1,277.0 L407.6,288.3 L413.3,311.0 L419.0,333.8 L419.0,352.7 L378.9,352.7 L378.9,367.8 L416.2,371.6 L421.9,394.4 L421.9,413.3 L407.6,424.6 L407.6,439.8 L387.5,443.6 L358.8,447.4 L330.1,439.8 L310.0,432.2 L292.8,417.1 L287.0,386.8 L287.0,356.5 L292.8,326.2 Z";

// ── Neighborhood label positions (geo → SVG) ───────────────────
export const LABEL_POINTS = {
  "The Heights": { x: 355, y: 285 },
  "Journal Square": { x: 320, y: 365 },
  "McGinley Square": { x: 345, y: 430 },
  "West Side": { x: 310, y: 425 },
  "Pershing Field": { x: 350, y: 296 },
  "Hoboken": { x: 450, y: 340 },
  "Downtown JC": { x: 430, y: 465 },
  "Union City": { x: 420, y: 268 },
  "North Bergen": { x: 418, y: 155 },
  "Bayonne": { x: 215, y: 640 },
  "Kearny": { x: 150, y: 340 },
  "Secaucus": { x: 240, y: 210 },
} as const;
