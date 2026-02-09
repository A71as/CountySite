"use client";

import {
  COUNTY_PATH,
  DISTRICT_4_PATH,
  HOLE_1_PATH,
  HOLE_2_PATH,
  VIEW_WIDTH,
  VIEW_HEIGHT,
  LABEL_POINTS,
} from "@/data/countyPaths";

/**
 * Branded SVG map of Hudson County highlighting District 4.
 *
 * - County outline: accurate, from official GeoJSON.
 * - District 4: angular shape traced from street-level district map.
 * - Brand: "For the People" — Red #E92128, Black #000, Pink #FFC8C8.
 */
export function DistrictMap({ className = "" }: { className?: string }) {
  const RED = "#E92128";
  const BLACK = "#000000";
  const PINK = "#FFC8C8";
  const WHITE = "#FFFFFF";
  const WATER = "#DAE3ED";
  const WATER_DEEP = "#C6D4E2";
  const TEXT_DARK = "#1C1917";
  const TEXT_MUTED = "#78716C";
  const TEXT_WATER = "#8DA4BE";

  const DISTRICT_VIEWBOX = "290 275 140 160";

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={DISTRICT_VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Hudson County District 4 — the Heights, Journal Square, McGinley Square, and West Side"
      >
        <defs>
          <filter id="county-shadow" x="-6%" y="-4%" width="116%" height="112%">
            <feDropShadow dx="3" dy="5" stdDeviation="7" floodColor={BLACK} floodOpacity="0.2" />
          </filter>
          <filter id="d4-glow" x="-14%" y="-14%" width="128%" height="128%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
            <feFlood floodColor={RED} floodOpacity="0.35" />
            <feComposite in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="d4-tex" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          </pattern>
          <pattern id="water-pat" patternUnits="userSpaceOnUse" width="40" height="40">
            <rect width="40" height="40" fill={WATER} />
            <circle cx="20" cy="20" r="18" fill="none" stroke={WATER_DEEP} strokeWidth="0.5" opacity="0.35" />
          </pattern>
        </defs>

        {/* ═══ WATER ══════════════════════════════════════════ */}
        <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#water-pat)" rx="8" />
        <text x={VIEW_WIDTH - 20} y={285} fill={TEXT_WATER} fontSize="9" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="500" letterSpacing="4" textAnchor="middle" transform={`rotate(-90, ${VIEW_WIDTH - 20}, 285)`}>HUDSON RIVER</text>
        <text x={95} y={488} fill={TEXT_WATER} fontSize="8" fontFamily="'Space Grotesk', system-ui, sans-serif" fontWeight="500" letterSpacing="3" textAnchor="middle" transform="rotate(-30, 95, 488)">NEWARK BAY</text>

        {/* ═══ COUNTY ═════════════════════════════════════════ */}
        <path d={COUNTY_PATH} fill={PINK} stroke={BLACK} strokeWidth="2.5" strokeLinejoin="round" filter="url(#county-shadow)" />
        <path d={HOLE_1_PATH} fill={WATER} stroke={BLACK} strokeWidth="1" />
        <path d={HOLE_2_PATH} fill={WATER} stroke={BLACK} strokeWidth="1" />

        {/* ═══ DISTRICT 4 ════════════════════════════════════ */}
        <path d={DISTRICT_4_PATH} fill={RED} stroke={BLACK} strokeWidth="3" strokeLinejoin="round" filter="url(#d4-glow)" />
        <path d={DISTRICT_4_PATH} fill="url(#d4-tex)" />

        {/* ── Labels inside District 4 ─────────────────────── */}
        <text x={LABEL_POINTS["The Heights"].x} y={LABEL_POINTS["The Heights"].y} textAnchor="middle" fill={WHITE} fontSize="12" fontWeight="800" fontFamily="'Bebas Neue', 'Barber Chop', system-ui, sans-serif" letterSpacing="2.5">
          THE HEIGHTS
        </text>

        {/* Badge */}
        <rect x="305" y="340" width="92" height="22" rx="3" fill="rgba(0,0,0,0.4)" />
        <text x="351" y="356" textAnchor="middle" fill={WHITE} fontSize="13" fontWeight="900" fontFamily="'Bebas Neue', 'Barber Chop', system-ui, sans-serif" letterSpacing="4">
          DISTRICT 4
        </text>

        <text x={LABEL_POINTS["Journal Square"].x} y={LABEL_POINTS["Journal Square"].y} textAnchor="middle" fill={WHITE} fontSize="10.5" fontWeight="700" fontFamily="'Space Grotesk', 'Bernoru Semicondensed', system-ui, sans-serif" letterSpacing="2">
          JOURNAL SQUARE
        </text>

        <text x={(LABEL_POINTS["McGinley Square"].x + LABEL_POINTS["West Side"].x) / 2} y={LABEL_POINTS["McGinley Square"].y} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="8" fontWeight="600" fontFamily="'Inter', 'Gelica', Georgia, serif" letterSpacing="0.8">
          McGinley Sq · West Side
        </text>

        {/* ── Surrounding area context labels ──────────────── */}
        <text x={LABEL_POINTS["Hoboken"].x} y={LABEL_POINTS["Hoboken"].y} textAnchor="middle" fill={TEXT_DARK} fontSize="10" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">Hoboken</text>
        <text x={LABEL_POINTS["Union City"].x} y={LABEL_POINTS["Union City"].y} textAnchor="middle" fill={TEXT_DARK} fontSize="9" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">Union City</text>
        <text x={LABEL_POINTS["Downtown JC"].x} y={LABEL_POINTS["Downtown JC"].y} textAnchor="middle" fill={TEXT_DARK} fontSize="8.5" fontWeight="500" fontFamily="'Space Grotesk', sans-serif">Downtown JC</text>
        <text x={LABEL_POINTS["Kearny"].x} y={LABEL_POINTS["Kearny"].y} textAnchor="middle" fill={TEXT_DARK} fontSize="10" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">Kearny</text>
        <text x={LABEL_POINTS["Bayonne"].x} y={LABEL_POINTS["Bayonne"].y} textAnchor="middle" fill={TEXT_DARK} fontSize="11" fontWeight="700" fontFamily="'Space Grotesk', sans-serif">Bayonne</text>
        <text x={LABEL_POINTS["Secaucus"].x} y={LABEL_POINTS["Secaucus"].y} textAnchor="middle" fill={TEXT_DARK} fontSize="10" fontWeight="600" fontFamily="'Space Grotesk', sans-serif">Secaucus</text>
        <text x={LABEL_POINTS["North Bergen"].x} y={LABEL_POINTS["North Bergen"].y} textAnchor="middle" fill={TEXT_DARK} fontSize="10" fontWeight="700" fontFamily="'Space Grotesk', sans-serif">North Bergen</text>

        {/* ═══ COMPASS ═══════════════════════════════════════ */}
        <g transform={`translate(${VIEW_WIDTH - 42}, ${VIEW_HEIGHT - 65})`}>
          <circle cx="0" cy="0" r="19" fill="rgba(255,255,255,0.85)" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
          <polygon points="0,-13 -3.5,-4 3.5,-4" fill={RED} />
          <text x="0" y="-4.5" textAnchor="middle" fill={BLACK} fontSize="7" fontWeight="800" fontFamily="'Space Grotesk', sans-serif">N</text>
          <line x1="0" y1="3" x2="0" y2="13" stroke={BLACK} strokeWidth="1.2" />
          <line x1="4" y1="0" x2="12" y2="0" stroke={BLACK} strokeWidth="0.8" />
          <line x1="-4" y1="0" x2="-12" y2="0" stroke={BLACK} strokeWidth="0.8" />
        </g>

        {/* ═══ SCALE BAR ═════════════════════════════════════ */}
        <g transform={`translate(${VIEW_WIDTH - 200}, ${VIEW_HEIGHT - 28})`}>
          <rect x="0" y="0" width="174" height="4" fill={BLACK} rx="1" />
          <line x1="0" y1="-3" x2="0" y2="7" stroke={BLACK} strokeWidth="1.5" />
          <line x1="87" y1="-2" x2="87" y2="6" stroke={BLACK} strokeWidth="1" />
          <line x1="174" y1="-3" x2="174" y2="7" stroke={BLACK} strokeWidth="1.5" />
          <text x="0" y="16" textAnchor="middle" fill={TEXT_DARK} fontSize="7.5" fontWeight="600" fontFamily="'Inter', sans-serif">0</text>
          <text x="87" y="16" textAnchor="middle" fill={TEXT_DARK} fontSize="7.5" fontWeight="600" fontFamily="'Inter', sans-serif">1</text>
          <text x="174" y="16" textAnchor="middle" fill={TEXT_DARK} fontSize="7.5" fontWeight="600" fontFamily="'Inter', sans-serif">2</text>
          <text x="192" y="16" fill={TEXT_MUTED} fontSize="7" fontFamily="'Inter', sans-serif">mi</text>
        </g>

        {/* ═══ LEGEND ════════════════════════════════════════ */}
        <g transform="translate(16, 16)">
          <rect x="0" y="0" width="170" height="50" rx="6" fill="rgba(255,255,255,0.92)" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          <text x="10" y="17" fill={BLACK} fontSize="9" fontWeight="800" fontFamily="'Bebas Neue', 'Barber Chop', sans-serif" letterSpacing="2">HUDSON COUNTY</text>
          <rect x="10" y="25" width="12" height="12" rx="2" fill={RED} stroke={BLACK} strokeWidth="1" />
          <text x="28" y="35" fill={BLACK} fontSize="8" fontWeight="700" fontFamily="'Space Grotesk', sans-serif">District 4</text>
          <rect x="100" y="25" width="12" height="12" rx="2" fill={PINK} stroke={BLACK} strokeWidth="1" />
          <text x="118" y="35" fill={TEXT_MUTED} fontSize="8" fontWeight="500" fontFamily="'Space Grotesk', sans-serif">Other</text>
        </g>
      </svg>
    </div>
  );
}
