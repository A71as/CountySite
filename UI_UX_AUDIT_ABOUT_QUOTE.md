# UI/UX Audit: About Section Quote Box

**Perspective:** Fortune 100 political design firm  
**Reference:** Brand guide (Brand guide.png), DESIGN_SYSTEM.md, site context

---

## Summary

The About section pull quote is a key trust signal: an authentic statement from the candidate. The audit aligns the implementation with the brand kit (Primary Red `#E92128`, Primary Black `#000000`, typography hierarchy) and the design system’s “calm confidence” and “authentic quote” principles.

---

## Audit Findings

### 1. Color

| Element | Before | Brand / Standard | Action |
|--------|--------|-------------------|--------|
| Box border | `#E92128` (2.5px) | Primary Red `#E92128` | ✓ Keep |
| Quotation marks | `text-primary-500` | Red for accents | ✓ Keep |
| Box interior | `bg-primary-50/40` | “Pure white” for quote box (brand) | Use `bg-white` |
| Quote text | `text-slate-900` | Primary Black `#000000` for main quote text | Use `text-black` |

### 2. Typography

| Element | Before | Brand / Design system | Action |
|--------|--------|------------------------|--------|
| Quote copy | Barber Chop (`font-display`) | Headlines = Barber Chop; body/readable = Gelica | Use **Gelica** (`font-body`) for quote to read as authentic voice, not headline |
| Quotation marks | `font-display` | Decorative; red, prominent | Keep display-style size; ensure red `#E92128` |
| Case | Sentence case (content) | Avoid ALL CAPS (design system) | ✓ Keep sentence case |

Rationale: The design system calls for “authentic quote,” “speak like a neighbor,” and “calm confidence over aggressive rhetoric.” Gelica for the quote text supports that; Barber Chop remains for section titles and hero.

### 3. Readability & Hierarchy

- **Leading:** `leading-snug` is tight for a multi-line quote. Use **`leading-relaxed`** for better scannability.
- **Contrast:** Black on white meets WCAG AA. Explicit `text-black` matches brand black.
- **Quotes:** Red, large quotation marks are on-brand; keep as-is.

### 4. Context & Tone

- **Speech bubble:** Red border + tail correctly tie the quote to the candidate; keep.
- **Background pattern:** Section already uses `brand-crosshatch-dark`; consistent with brand “quilted” feel.
- **Tilt:** Slight tilt on the box is acceptable for “handmade” feel; kept but could be removed for a more formal variant.

### 5. Accessibility

- Semantic `<blockquote>` and `<p>` are correct.
- Decorative quotation marks use `aria-hidden="true"` so they are not read twice.
- Contrast and touch targets are sufficient.

---

## Implemented Changes

1. **Background:** `bg-primary-50/40` → `bg-white` for the quote box interior.
2. **Quote text:** `font-display` + `accent-callout` → `font-body` (Gelica), `text-black`, `leading-relaxed`; remove `accent-callout` so the quote is not tilted.
3. **Explicit black:** Use `text-black` for quote text to match Primary Black `#000000`.
4. **Leading:** `leading-snug` → `leading-relaxed` for the quote paragraph.

No change to border color, border width, quotation mark color/size, or speech-bubble tail. Red remains `#E92128` throughout.
