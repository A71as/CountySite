# Production Audit Report — CountySite

**Audit date:** February 13, 2025  
**Target:** Netlify deployment readiness

---

## Summary of Changes Applied

### Removed (Dead Code & Unused Dependencies)

| Item | Reason |
|------|--------|
| `src/components/ui/SectionReveal.tsx` | Unused; `ScrollReveal` is used instead |
| `src/components/CustomCursor.tsx` | Never imported; optional feature never enabled |
| `src/data/endorsements.ts` | Duplicate; `lib/constants/endorsements.ts` is the single source |
| `src/hooks/useScrollSpy.ts` | Unused; Navbar uses its own scroll logic |
| `src/components/ui/DistrictMap.tsx` | Unused; Commissioner uses `arcgis-map.html` iframe |
| `src/data/countyPaths.ts` | Only used by DistrictMap |
| `scripts/convert-geojson.js` | Output was for countyPaths; no longer needed |
| `rough-notation`, `roughjs` (npm) | Not used anywhere in codebase |
| `.section-reveal-slot` CSS | Only used by removed SectionReveal |

### Added

| Item | Purpose |
|------|---------|
| `netlify.toml` | Netlify build config; Node 20, build command |
| `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.example` | Used by Footer, Endorsements, Privacy/Terms |

---

## Pre-Deployment Checklist

### Environment Variables (set in Netlify UI)

**Required for signup/forms:**
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`, `EMAIL_FROM`

**Required for rate limiting:**
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

**Site config:**
- `NEXT_PUBLIC_SITE_URL` (e.g. `https://davidguirgis.com`)
- `NEXT_PUBLIC_CANDIDATE_NAME`, `NEXT_PUBLIC_OFFICE`, `NEXT_PUBLIC_COUNTY`, `NEXT_PUBLIC_STATE`
- `NEXT_PUBLIC_ELECTION_DATE` (YYYY-MM-DD for countdown banner)
- `NEXT_PUBLIC_ACTBLUE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`

**Optional:**
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (analytics)
- `NEXT_PUBLIC_PHOTOGRAPHY_CREDIT`

### Assets to Verify

- **`/images/candidate/Graduation photo.JPG`** — Referenced by `IMAGE_PATHS.candidate.about` for the About section. If missing, `OptimizedImage` will show placeholder. Add this file or update `images.ts` to use an existing asset.
- **`/images/candidate/no-bg-final.png`** — Hero image; present per git status.
- **`/arcgis-map.html`** — Commissioner district map; ensure it exists in `public/`.

---

## Architecture Notes

### Section Components ( kept )

- **Section** — Lightweight; used by Hero, About. Handles top/bottom fades, no animation.
- **SectionWrapper** — Full-featured; used by Commissioner, Donate, Issues, etc. Adds backgrounds, paper texture, grain, fades, and wraps content in `AnimatedSection`.
- **AnimatedSection** — Scroll-triggered fade-up (IntersectionObserver).
- **SectionHeader** — Shared header with eyebrow, title, hand-drawn divider; uses Framer Motion.
- **ScrollReveal** — Framer Motion–based reveal with presets (header, card, photo, map, etc.).

### Performance

- **DonationModalTrigger** — Dynamically imported with `ssr: false` to avoid loading modal code until needed.
- **Analytics** — Plausible loads via `strategy="afterInteractive"`.
- **Images** — Next.js Image with AVIF/WebP; `OptimizedImage` adds fallback and blur placeholder.
- **Fonts** — Loaded via `next/font` (local Barber Chop, Google Gelasio, Barlow Semi Condensed, Homemade Apple).

### Security Headers

`next.config.js` includes HSTS, X-Frame-Options, CSP, etc. CSP allows Plausible, Turnstile, Supabase, ActBlue, fonts.

---

## Optional Follow-Ups

1. **npm audit** — 4 high-severity vulnerabilities reported; review with `npm audit` before production.
2. **Image optimization** — Compress hero `no-bg-final.png` if >200KB; design system recommends <200KB for hero.
3. **Endorsements data** — `lib/constants/endorsements.ts` uses `image`; `Endorsements.tsx` expects `image` or `logo`. Current structure uses `image`; ensure consistency if adding new endorsements.

---

## Build Verification

Build completes successfully:
```
npm run build  ✓
```

First load JS: ~87KB shared; homepage ~187KB total.
