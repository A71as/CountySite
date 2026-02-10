# UI/UX Audit — Brand Alignment & Campaign Aesthetic

**Basis:** Client critique (brand guide alignment, fonts, logo, loading page, splash photo, group photo, handmade feel, organic edges)  
**Reference:** Prior campaign art (chunky rounded type, red/white/black, speech bubble, “Democratic Socialist for Hudson County”)  
**Scope:** Visual design, typography, layout, and consistency with stated brand direction.

---

## Executive Summary

| Criterion | Status | Priority |
|-----------|--------|----------|
| Brand guide alignment | Partial | High |
| Fonts from brand guide | Not implemented | High |
| Logo includes “democratic socialist for hudson county” | Met | — |
| Loading page removed | Met | — |
| Splash photo (client to pick) | Pending | Medium |
| Group photo no longer extending off page | Met | — |
| Handmade feel | Partial | Medium |
| Organic edges (only straight = site border) | Mostly met | Low |

**Main gap:** Typography does not use the brand guide font (BarberChop.otf is present but unused). The design system document also still describes a blue/teal palette and different type stack, which conflicts with the client’s campaign art and feedback.

---

## 1. Brand Guide Alignment

**Client ask:** “Improve alignment with brand guide.”

**Current state:**
- **Color:** Primary is on-brand red (`#E92128`). Background and neutrals are cream/slate. No blue/teal in UI.
- **Logo:** Context-specific assets are used (speech bubble in nav, vertical in Hero/Footer, no-bubble for OG). All include or accompany “Democratic Socialist” / Hudson County messaging.
- **Typography:** Still using Bebas Neue (display), Space Grotesk (heading), Inter (body). Campaign art and brand assets use a chunky, rounded sans-serif (BarberChop.otf is in `public/images/logos/` but not loaded).
- **Documentation:** `DESIGN_SYSTEM.md` describes a “trust-building” blue/teal palette and the current font stack. It does not reflect the red, handmade, campaign-art direction and can confuse future updates.

**Recommendation:**
- Treat the campaign art and logo assets (and any formal brand guide PDF/PNG) as the source of truth.
- Add BarberChop.otf via `@font-face` and map it to display and/or heading in `layout.tsx` and `tailwind.config.ts`.
- Update or retire `DESIGN_SYSTEM.md` so it matches the red, organic, handmade direction (or mark it “superseded by brand guide”).

---

## 2. Fonts from Brand Guide

**Client ask:** “Please use the fonts from the brand guide.”

**Current state:**
- **Display:** Bebas Neue (Google Font) — geometric, condensed; not the chunky rounded style in the art.
- **Heading:** Space Grotesk (Google Font) — clean, technical; again not the campaign-art style.
- **Body:** Inter (Google Font).
- **Brand asset:** `public/images/logos/BarberChop.otf` is present and matches the “chunky, rounded” look in the reference art but is **not** referenced in CSS or layout.

**Recommendation:**
1. Add `@font-face` in `globals.css` (or a dedicated font file) for BarberChop using the `.otf` path.
2. Expose a CSS variable (e.g. `--font-display` or `--font-brand`) and use it for hero headlines, section titles, and any type that should match the logo lockup.
3. In `layout.tsx`, either load BarberChop via local font and pass a `variable` into the document, or keep one fallback (e.g. Inter) for body and use BarberChop for display/heading.
4. In `tailwind.config.ts`, point `fontFamily.display` (and optionally `heading`) at the new variable so existing `font-display` / `font-heading` classes align with the brand guide.

**UX impact:** Headlines and key CTAs will visually match the logo and printed materials, strengthening recognition and trust.

---

## 3. Logo Includes “Democratic Socialist for Hudson County”

**Client ask:** “The logo includes the text saying democratic socialist for hudson county.”

**Current state:** Met.  
- **Hero:** Vertical logo asset (includes DAVID! + Democratic Socialist + for Hudson County Commissioner + districts).  
- **Footer:** Same vertical lockup (inverted).  
- **Navbar:** Speech bubble only (compact); full lockup is visible in Hero/Footer.  
- **OG/social:** No-speech-bubble text lockup used for shares.

No further change required for this criterion.

---

## 4. Loading Page Removed

**Client ask:** “Scrap the loading page.”

**Current state:** Met.  
- `LoadingAnimation` has been removed from `ClientLayout` and the component file deleted.  
- No full-screen loading overlay on first visit.

No further change required.

---

## 5. Splash Page Photo

**Client ask:** “We will pick splash page photo.”

**Current state:** Pending client.  
- Hero image is driven by `IMAGE_PATHS.candidate.hero` (e.g. `no-bg.png`) with a comment that the client will choose the final asset.
- No code change needed until the chosen file is provided; then update the path in `src/lib/constants/images.ts`.

**Recommendation:** When the asset is ready, replace the path and ensure it’s optimized (resolution, format, alt text) for the hero area.

---

## 6. Group Photo Not Extending Off Page

**Client ask:** “The group photo extending off the page needs to be tinkered with. The visual of it extending off the page is not very good.”

**Current state:** Met.  
- Donate section no longer uses full-bleed (`lg:mr-[calc(50%-50vw)]` removed).
- Group photo sits in a rounded container (`rounded-2xl`) within the section grid and no longer bleeds off the viewport.

No further change required.

---

## 7. Handmade Feel

**Client ask:** “Please make the site feel more handmade.”

**Current state:** Partial.  
- **Texture:** Body has a light full-screen grain (`body::before`); Hero has a stronger grain overlay. This supports a printed/tactile feel.
- **Shape:** Rounded corners (e.g. `rounded-xl`, `rounded-2xl`) are used widely; speech bubbles and cards feel softer.
- **Typography:** Until BarberChop (or an equivalent) is in use, the type will feel more “product UI” than “campaign poster,” which can work against the handmade ask.

**Recommendation:**
- Implement brand font (Section 2) so headlines and key type feel of a piece with the logo.
- Optionally increase grain visibility slightly (e.g. body grain opacity or Hero grain) if the client wants a stronger “paper” feel, without harming readability.
- Keep animation minimal; the current subtle motion is consistent with a handmade, non-flashy aesthetic.

---

## 8. Organic Edges — Only Straight Edge Is Site Border

**Client ask:** “Whatever design elements we go with will probably just need to look more organic — nothing 100% straight edges except the black border around the site.”

**Current state:** Mostly met.  
- **Site border:** A single straight black border wraps the app in `ClientLayout` (`border-2 border-black`). This is the only intentional “100% straight” frame.
- **UI:** Cards, buttons, inputs, images, and sections use `rounded-xl` / `rounded-2xl` (and similar). No systematic use of `rounded-none` or sharp rectangles for inner content.
- **Accent lines:** Some sections use straight accent bars (e.g. `border-l-[6px]` on Donate/Commissioner/Endorsements, `border-t-[3px]` on dark section). These are thin and functional. If the client wants *zero* straight edges inside the frame, consider rounded end caps or a small decorative treatment; otherwise they can stay as-is.

**Recommendation:** Confirm with client whether thin accent borders (left/top bars) are acceptable. If not, replace with rounded or organic accents.

---

## 9. Documentation and Consistency

**Finding:** `DESIGN_SYSTEM.md` still describes:
- Primary color as sky blue and accent as teal.
- Bebas Neue, Space Grotesk, and Inter as the type stack.
- A “trust-building,” non-partisan visual direction.

The live site and client feedback instead align to:
- Red primary, cream/slate, campaign-art style.
- Chunky rounded type (BarberChop available).
- Handmade, organic, “campaign poster” feel.

**Recommendation:** Update `DESIGN_SYSTEM.md` to match the current brand (red, BarberChop/organic type, handmade, single straight site border) or add a short note that it is superseded by the brand guide and campaign art, and that typography and color are defined there and in `tailwind.config.ts` / `globals.css`.

---

## 10. Action Summary

| # | Action | Status |
|---|--------|--------|
| 1 | Add BarberChop.otf via next/font/local and wire into display/heading | **Done** — `layout.tsx`, `tailwind.config.ts` |
| 2 | Update DESIGN_SYSTEM.md to match red, organic, brand-guide direction | **Done** — palette, typography, buttons, organic edges |
| 3 | Slightly increase grain visibility for stronger handmade feel | **Done** — body 0.04→0.07, Hero 0.08→0.11 |
| 4 | Replace straight accent bars with rounded/organic treatment | **Done** — Donate, Commissioner, Endorsements, VideoQuote, SectionWrapper (dark), Volunteer error |
| 5 | When provided, swap hero image path for client-chosen splash photo | Pending client asset |

---

## Appendix: File References

- **Fonts:** `src/app/layout.tsx`, `src/app/globals.css`, `tailwind.config.ts`
- **Logos:** `src/lib/constants/images.ts` (`LOGO_ASSETS`), Navbar, Hero, Footer
- **Site border:** `src/components/ClientLayout.tsx`
- **Donate group photo:** `src/components/sections/Donate.tsx`
- **Hero image path:** `src/lib/constants/images.ts` (`IMAGE_PATHS.candidate.hero`)
- **Brand font asset:** `public/images/logos/BarberChop.otf`
