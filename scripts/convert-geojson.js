/**
 * Converts Hudson County GeoJSON to SVG path data for the DistrictMap component.
 * Run: node scripts/convert-geojson.js
 */
const fs = require("fs");
const path = require("path");

const geojson = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../public/hudson_county_geojson.geojson"),
    "utf8"
  )
);

const feature = geojson.features[0];
const multiPoly = feature.geometry.coordinates;

// MultiPolygon → first polygon → rings
const rings = multiPoly[0];
const outerRing = rings[0];
const holes = rings.slice(1);

// ── Compute bounds from outer ring ─────────────────────────────
let minLon = Infinity,
  maxLon = -Infinity,
  minLat = Infinity,
  maxLat = -Infinity;

for (const [lon, lat] of outerRing) {
  if (lon < minLon) minLon = lon;
  if (lon > maxLon) maxLon = lon;
  if (lat < minLat) minLat = lat;
  if (lat > maxLat) maxLat = lat;
}

// ── Projection parameters ──────────────────────────────────────
const centerLat = (minLat + maxLat) / 2;
const cosCenter = Math.cos((centerLat * Math.PI) / 180);

const padding = 40;
const targetDrawWidth = 520;

const scaleX = targetDrawWidth / (maxLon - minLon);
const scaleY = scaleX / cosCenter;

const drawWidth = (maxLon - minLon) * scaleX;
const drawHeight = (maxLat - minLat) * scaleY;

const viewWidth = Math.ceil(drawWidth + 2 * padding);
const viewHeight = Math.ceil(drawHeight + 2 * padding);

function toSvg(lon, lat) {
  const x = (lon - minLon) * scaleX + padding;
  const y = (maxLat - lat) * scaleY + padding;
  return [parseFloat(x.toFixed(1)), parseFloat(y.toFixed(1))];
}

// ── Simplification (Ramer-Douglas-Peucker) ─────────────────────
function perpendicularDist(point, lineStart, lineEnd) {
  const [x, y] = point;
  const [x1, y1] = lineStart;
  const [x2, y2] = lineEnd;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / lenSq));
  const px = x1 + t * dx;
  const py = y1 + t * dy;
  return Math.sqrt((x - px) ** 2 + (y - py) ** 2);
}

function rdpSimplify(points, epsilon) {
  if (points.length <= 2) return points;
  let maxDist = 0;
  let maxIdx = 0;
  const first = points[0];
  const last = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDist(points[i], first, last);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }
  if (maxDist > epsilon) {
    const left = rdpSimplify(points.slice(0, maxIdx + 1), epsilon);
    const right = rdpSimplify(points.slice(maxIdx), epsilon);
    return left.slice(0, -1).concat(right);
  }
  return [first, last];
}

function ringToSvgPoints(ring) {
  return ring.map(([lon, lat]) => toSvg(lon, lat));
}

function simplifyAndConvert(ring, epsilon) {
  const svgPoints = ringToSvgPoints(ring);
  return rdpSimplify(svgPoints, epsilon);
}

function pointsToPath(points) {
  return (
    points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
      .join(" ") + " Z"
  );
}

// ── Convert rings ──────────────────────────────────────────────
const epsilon = 1.2; // simplification threshold in SVG pixels
const outerSimplified = simplifyAndConvert(outerRing, epsilon);
const holesSimplified = holes.map((h) => simplifyAndConvert(h, 0.8));

const outerPath = pointsToPath(outerSimplified);
const holePaths = holesSimplified.map(pointsToPath);

// ── District 4 boundary — traced from official district map ────
// Shape: wider top (Heights), east-side notch where Hoboken juts
// in, narrows in middle, widens for Journal Square, tapers south.
const district4GeoCoords = [
  [-74.074, 40.753],   // NW - western Heights border
  [-74.058, 40.756],   // N - along northern edge
  [-74.048, 40.755],   // NE1 - upper Heights
  [-74.040, 40.752],   // NE2 - east toward Hoboken
  [-74.036, 40.748],   // E1 - Heights east edge (Palisades)
  [-74.037, 40.743],   // E2 - east side (notch west)
  [-74.042, 40.740],   // E3 - narrowing pinch
  [-74.040, 40.734],   // E4 - back east for Journal Square
  [-74.037, 40.728],   // E5 - Journal Square east
  [-74.040, 40.724],   // E6 - turning southwest
  [-74.048, 40.720],   // SE - southeast corner
  [-74.058, 40.718],   // S - southern edge
  [-74.067, 40.720],   // SW - southwest corner
  [-74.073, 40.726],   // W1 - west lower
  [-74.076, 40.734],   // W2 - west mid-lower
  [-74.077, 40.742],   // W3 - west mid-upper
  [-74.075, 40.749],   // W4 - west upper
  [-74.074, 40.753],   // back to NW
];

const d4SvgPoints = district4GeoCoords.map(([lon, lat]) => toSvg(lon, lat));
const d4Path = pointsToPath(d4SvgPoints);

// ── Output ─────────────────────────────────────────────────────
console.log("// ═══════════════════════════════════════════════════════════");
console.log("// AUTO-GENERATED from hudson_county_geojson.geojson");
console.log("// Run: node scripts/convert-geojson.js");
console.log("// ═══════════════════════════════════════════════════════════");
console.log("");
console.log(`export const VIEW_WIDTH = ${viewWidth};`);
console.log(`export const VIEW_HEIGHT = ${viewHeight};`);
console.log("");
console.log("// Projection parameters for coordinate conversion");
console.log(`export const PROJ = {`);
console.log(`  minLon: ${minLon},`);
console.log(`  maxLon: ${maxLon},`);
console.log(`  minLat: ${minLat},`);
console.log(`  maxLat: ${maxLat},`);
console.log(`  centerLat: ${centerLat},`);
console.log(`  scaleX: ${scaleX.toFixed(4)},`);
console.log(`  scaleY: ${scaleY.toFixed(4)},`);
console.log(`  padding: ${padding},`);
console.log(`} as const;`);
console.log("");
console.log(`// County outline: ${outerRing.length} pts → ${outerSimplified.length} simplified`);
console.log(`export const COUNTY_PATH = "${outerPath}";`);
console.log("");

for (let i = 0; i < holePaths.length; i++) {
  console.log(
    `// Hole ${i + 1}: ${holes[i].length} pts → ${holesSimplified[i].length} simplified`
  );
  console.log(`export const HOLE_${i + 1}_PATH = "${holePaths[i]}";`);
  console.log("");
}

console.log(
  `// District 4 (Heights + Journal Square + McGinley Square + West Side)`
);
console.log(`export const DISTRICT_4_PATH = "${d4Path}";`);
console.log("");

// ── Also output some useful geo-to-SVG reference points ────────
const referencePoints = {
  "Journal Square": [-74.0631, 40.7326],
  "The Heights (center)": [-74.0580, 40.7480],
  "McGinley Square": [-74.0580, 40.7250],
  "West Side": [-74.0720, 40.7230],
  "Hoboken": [-74.0280, 40.7440],
  "Downtown JC": [-74.0340, 40.7170],
  "Union City": [-74.0640, 40.7680],
  "North Bergen": [-74.0310, 40.7860],
  "Bayonne": [-74.1140, 40.6640],
  "Kearny": [-74.1180, 40.7440],
  "Jersey City Heights": [-74.0530, 40.7510],
};

console.log("// ── Reference points (geo → SVG) ──────────────────────────");
console.log("export const LABEL_POINTS = {");
for (const [name, [lon, lat]] of Object.entries(referencePoints)) {
  const [x, y] = toSvg(lon, lat);
  console.log(`  "${name}": { x: ${x}, y: ${y} },`);
}
console.log("} as const;");
