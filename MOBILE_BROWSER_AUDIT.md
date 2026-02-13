# Mobile & Cross-Browser Display Audit

**Date:** February 2025  
**Scope:** Responsive layout, viewport, touch targets, overflow, and cross-browser/scale behavior.

---

## Summary of Fixes Applied

| Issue | Fix |
|-------|-----|
| **No explicit viewport** | Added `viewport` export in `layout.tsx`: `width: device-width`, `initialScale: 1`, `maximumScale: 5` (allows zoom for accessibility). |
| **Hero district label overflow** | On viewports ≤480px, `.hero-district-label` now uses `white-space: normal` and `word-break: break-word` so "DISTRICT 4 · JOURNAL SQUARE · …" doesn’t force horizontal scroll. |
| **Hero right column flex overflow** | Set `min-width: 0` on `.hero-right-column` so the flex child can shrink and avoid horizontal overflow on narrow screens. |

---

## What Was Already in Good Shape

- **Touch targets:** Nav links, Donate pill, hamburger, footer buttons, and Commissioner map lightbox close use `min-h-[44px]` / `min-w-[44px]` (44×44px minimum).
- **Overflow:** `html` and `body` use `overflow-x: hidden` in `globals.css`; sections use `overflow-hidden` where needed.
- **Breakpoints:** Tailwind sm/md/lg/xl (640 / 768 / 1024 / 1280) are used consistently; Hero switches to single column at 1023px.
- **Hero mobile:** At &lt;1024px, grid is single column, photo above content; cutout image uses `max-width: 85vw`, `max-height: 65vh`.
- **Nav:** Full-screen mobile menu with large tap targets; Escape closes; body scroll locked when open.
- **Forms:** Hero and footer signup use responsive grids; Turnstile and buttons are full-width on small screens.
- **Donate section:** Amount grid is 2 columns on mobile, 3 on sm+; CTA is full-width and tappable.

---

## Recommended Manual Testing

### Devices / viewports

1. **Narrow mobile (320–390px)** – e.g. iPhone SE, small Android.  
   - Check: Hero headline wraps; district label doesn’t overflow; no horizontal scroll; form and CTA usable.
2. **Standard mobile (393–430px)** – e.g. iPhone 14, Pixel.  
   - Check: Hero, About, Commissioner, Donate, Issues all readable; nav menu opens and closes.
3. **Tablet (768–1024px)** – Portrait and landscape.  
   - Check: Hero layout (photo vs content); Donate split layout; section spacing.
4. **Desktop (1280px+)** – Max content width 1200px; layout centered.

### Browsers

- **Chrome/Edge (Chromium)** – Primary target.
- **Safari (iOS and macOS)** – Check viewport height (e.g. 100vh vs. dynamic toolbar), fixed nav, and any `-webkit-` quirks.
- **Firefox (desktop and Android)** – Layout and scroll.
- **Samsung Internet** – If you care about that user base.

### Zoom and scale

- **200% zoom (accessibility):** Design system calls for “readable at 200% zoom.” Manually zoom to 200% and confirm no clipping, overlapping, or lost functionality.
- **Browser text-size:** Increase default font size and ensure layout doesn’t break and text remains readable.

### Things to click through

- Hero and footer signup (Turnstile + submit).
- Nav: all links, Donate pill, mobile menu open/close.
- Commissioner: “Tap to expand map” and lightbox close.
- Donate: amount selection and “DONATE NOW VIA ACTBLUE.”
- Any other CTAs (Volunteer, etc.).

---

## Known Considerations (No Change Made)

- **Safari 100vh:** If the hero or any full-viewport block looks short on iOS Safari, consider `dvh` (dynamic viewport height) or a small JS/CSS workaround for the address bar. Current hero doesn’t rely on full 100vh for content.
- **Poster frame (6px border):** Fixed overlay is intentional; it’s part of the design and doesn’t affect tap targets.
- **News section:** Uses `overflow-x-auto` on small screens for a horizontal strip; intentional.

---

## Checklist Before Launch

- [ ] Test on at least one real iOS and one Android device (or reliable device emulation).
- [ ] Test at 320px width; confirm no horizontal scroll.
- [ ] Test at 200% zoom; confirm content readable and usable.
- [ ] Confirm Turnstile widget and forms work in mobile Safari and Chrome.
- [ ] If using Netlify preview URLs, test the live URL on a phone (not only localhost).
