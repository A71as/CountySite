# Campaign Website Design System & UX Guidelines

## Design Philosophy

This website is built to **build trust, demonstrate competence, and invite community participation**—not to manipulate or overwhelm voters. Every design decision prioritizes:

1. **Clarity over cleverness**
2. **Credibility over campaigning**
3. **Community connection over political theater**
4. **Calm confidence over aggressive rhetoric**

---

## Visual Design Principles

*Aligned with the brand guide and prior campaign art: red primary, chunky rounded type, handmade/organic feel.*

### Color Palette

**Campaign red + neutrals**

- **Primary (Red)**: `#E92128` - Brand red from campaign art; used for logo, CTAs, accents
- **Slate Neutrals**: `#0F172A` to `#F8FAFC` - Text and borders
- **Warm Cream Background**: `#FEFDFB` - Page background
- **Accent (neutral)**: `#525252` - Secondary UI (focus rings, etc.)

The only **100% straight edge** in the layout is the **black border around the site** (frame). All other elements use rounded/organic edges (e.g. `rounded-xl`, `rounded-2xl`).

### Typography (Brand kit — four fonts)

**Hierarchy (load order in `layout.tsx`):**

| Role | Font | Usage | Tailwind / CSS |
|------|------|--------|----------------|
| **H1/H2 headers** | Barber Chop | Campaign headlines, hero, major section titles, CTAs | `font-display`, `font-heading` — bold, uppercase, red or black |
| **Subheaders/labels** | Bernoru Semicondensed* | Section labels (e.g. "ABOUT", "GET INVOLVED"), form labels, card subheads | `font-subhead` — bold, black |
| **Body copy** | Gelica* | Paragraphs, bios, policy text, readable serif | `font-body` — regular weight, black |

\* Bernoru and Gelica use Google Font substitutes (Barlow Semi Condensed, Gelasio) until brand font files are added; Barber Chop uses `public/images/logos/BarberChop.otf`.

**Usage:**

- **Headlines (H1/H2)**: Barber Chop, bold, uppercase (40–56px on desktop), red or black
- **Section labels**: Bernoru-style, bold, uppercase, small tracking
- **Body text**: Gelica-style serif, 18–20px, line-height 1.6–1.7

### Spacing & Layout

**Generous whitespace = mental clarity for voters**

- Section padding: 64-96px vertical
- Card padding: 24-32px
- Max content width: 1280px (readable, not overwhelming)
- Grid gaps: 32-48px (breathing room between elements)

### Shadows & Depth

- Soft shadows for cards at rest; elevated on hover
- Campaign art uses strong red drop shadows on type; site uses subtle shadows for depth without overwhelming

### Handmade / Organic Feel

- **Texture**: Light grain on body and hero (paper/print feel)
- **Edges**: Rounded corners everywhere except the outer site border
- **Accent bars**: Rounded pills or rounded-end bars instead of sharp straight lines

---

## Information Architecture

### Homepage Structure (Priority Order)

1. **Hero Section** - Who, what, why in 10 seconds
   - Clear candidate name and office
   - Community-focused headline (not attack-based)
   - Trust signals (local resident, community leader)
   - Low-friction email signup

2. **About Section** - Credibility through local connection
   - Personal story tied to community
   - Authentic quote (not campaign slogans)
   - Experience & background (checkmarks for quick scanning)

3. **Issues/Platform** - Practical solutions, not promises
   - 6 key issues maximum (focus over breadth)
   - Solution-oriented language
   - Grounded in local realities, not national talking points

4. **Endorsements** - Social proof from trusted community voices
   - Local leaders, organizations, neighbors
   - Real photos, real quotes
   - Diverse representation

5. **Events** - Opportunities to connect in person
   - Clear dates, locations, purposes
   - RSVP options
   - Transparent about format (town hall vs. fundraiser)

6. **Get Involved** - Tiered engagement options
   - Low barrier: Follow on social media
   - Medium barrier: Request yard sign, share content
   - High barrier: Volunteer time, host event

7. **Donate** - Respectful ask, transparent use
   - Clear suggested amounts
   - Plain language about where money goes
   - No guilt-tripping or false urgency

### Navigation Principles

**Make it easy to find what matters**

- **Primary nav**: About, Issues, Endorsements, Events, Volunteer
- **Secondary actions**: Donate (CTA button), Contact (footer)
- **Sticky header** with frosted glass effect (modern, unobtrusive)
- **Mobile-first**: Hamburger menu with large touch targets

---

## UX Patterns & Components

### Buttons & CTAs

**Primary Button** (Brand red `#E92128`)

- Main actions: Sign up, RSVP, Submit, Donate
- Rounded corners (`rounded-xl`)
- Hover: Slightly darker, subtle shadow

**Secondary Button** (Outlined)

- Alternative actions: Learn more, Download
- Same rounded treatment

### Forms

**Respect people's time and privacy**

- **Minimal fields**: Name and email for signups (that's it!)
- **Clear labels**: Above inputs, not placeholders
- **Transparent privacy**: "We won't share your email" visible near submit
- **Success states**: Warm confirmation, not just "Success!"
- **Error states**: Helpful, not accusatory

### Cards & Content Blocks

**Scannable structure for busy voters**

```
┌─────────────────────────┐
│ [Icon/Image]            │
│                         │
│ Bold Title              │
│ 2-3 lines of description│
│                         │
│ [Optional: CTA]         │
└─────────────────────────┘
```

- Border: 1px slate-200, rounded-2xl (organic edges)
- Hover: Lift slightly, border color shifts to primary
- Never more than 3 lines of text per card

### Trust Signals

- ✓ Checkmarks for credentials (primary red)
- 📍 Local resident badge in hero
- 🔒 Secure donation processor logos
- 📊 Transparent finance disclosure links

---

## Content Voice & Tone

### Writing Principles

**Plain language with emotional intelligence**

✅ **Do:**

- Use first person ("I'm running because...")
- Speak like a neighbor, not a politician
- Focus on solutions, not problems alone
- Acknowledge complexity ("This won't be easy, but...")
- Use specific local examples

❌ **Don't:**

- Use jargon or bureaucratic language
- Make promises you can't keep as one commissioner
- Attack opponents by name
- Use fear-based messaging
- Copy national campaign talking points

### Example Tone Shift

**Before (Aggressive):**

> "FIGHT for your RIGHTS! Donate NOW to STOP the corruption!"

**After (Confident & Inviting):**

> "I'm running for County Commissioner because our community deserves leadership that listens, acts with integrity, and delivers practical solutions. Join me."

---

## Accessibility Standards

**WCAG 2.1 AA Compliance Minimum**

### Color Contrast

- Body text: 4.5:1 minimum
- Large text (24px+): 3:1 minimum
- Interactive elements: 3:1 minimum

### Keyboard Navigation

- All interactive elements accessible via Tab
- Focus indicators clearly visible (2px accent outline)
- Skip links for screen readers

### Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for icon-only buttons
- Form labels associated with inputs

### Mobile Accessibility

- Touch targets minimum 44x44px
- No hover-only interactions
- Readable at 200% zoom

---

## Mobile-First Responsive Design

### Breakpoints

```css
sm: 640px   /* Large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktop */
```

### Mobile Optimizations

1. **Navigation**: Full-screen overlay menu, large touch targets
2. **Hero**: Image above content, single column
3. **Forms**: Full-width inputs, large submit buttons
4. **Cards**: Stack vertically with consistent spacing
5. **Typography**: Slightly smaller headers, maintain readability

---

## Performance & Technical Guidelines

### Image Optimization

- WebP format with JPEG fallback
- Lazy loading below the fold
- Responsive srcsets for different screen sizes
- Max 200KB for hero images

### Loading States

- Skeleton screens for content loading
- Disable buttons during form submission
- Optimistic UI updates where safe

### Analytics (Privacy-Respecting)

- Plausible Analytics (no cookies, GDPR-friendly)
- Track conversions, not individuals
- Transparent about what we measure

---

## Component Library

### Hero Section

**Purpose**: Immediate clarity on who the candidate is and why they matter locally

**Elements:**

- Candidate name (large, bold)
- Office seeking (clear context)
- Local connection badges (✓ Local Resident, ✓ Community Leader)
- Community-focused headline
- Email signup form
- Professional photo with soft shadow

### About Section

**Purpose**: Build credibility through authentic personal story

**Elements:**

- Section label: "About"
- Headline: "Meet [Name]"
- Two-column layout (photo + bio)
- Pull quote in bordered callout
- Experience checkmarks
- Warm, community-connected photo

### Issues/Platform Section

**Purpose**: Show practical solutions grounded in local reality

**Elements:**

- Section label: "Our Platform"
- Headline: "Solutions for [County]"
- 3-column grid of issue cards
- Icon + Title + 2-3 line description
- Hover state: Subtle lift and shadow

### Get Involved Section

**Purpose**: Invite participation with clear, tiered options

**Elements:**

- 3-tier structure:
  1. Low commitment: Social media follows
  2. Medium: Yard sign request, share graphics
  3. High: Volunteer form
- Clear descriptions of time commitment
- No pressure or guilt

---

## Dos and Don'ts Summary

### Visual Design

✅ **Do:**

- Use generous whitespace
- Maintain consistent spacing (8px grid system)
- Use real, local photos
- Keep animations subtle (fade, lift)
- Test on actual phones

❌ **Don't:**

- Cram too much content above the fold
- Use stock photos of politicians shaking hands
- Add flashy animations or auto-playing videos
- Use more than 3 accent colors
- Ignore loading times

### Content & Messaging

✅ **Do:**

- Lead with community benefits
- Be specific about what you'll do
- Acknowledge complexity
- Use active voice
- Include credentials naturally

❌ **Don't:**

- Make unrealistic promises
- Use ALL CAPS or excessive exclamation marks!!!
- Attack opponents personally
- Copy national political rhetoric
- Hide who's funding the campaign

### User Experience

✅ **Do:**

- Make navigation obvious
- Show progress in forms
- Confirm actions with warm messages
- Allow easy unsubscribe from emails
- Provide contact methods beyond forms

❌ **Don't:**

- Use dark patterns (fake urgency, tricky language)
- Hide donation amounts or recurring options
- Auto-play videos with sound
- Require accounts for basic actions
- Spam email lists

---

## Voter Psychology Principles

### Building Trust

1. **Transparency**: Show where money goes, who endorses you
2. **Consistency**: Match messaging across all channels
3. **Authenticity**: Real photos, real quotes, real positions
4. **Competence**: Professional design signals capability

### Motivating Action

1. **Social proof**: "Join 500+ neighbors who've signed up"
2. **Low barriers first**: Email signup before donation ask
3. **Clear outcomes**: "You'll receive weekly updates" not just "Submit"
4. **Empowerment language**: "Support" not "Give us money"

### Respecting Voters

1. **No manipulation**: Honest scarcity (real deadlines only)
2. **Easy exit**: One-click unsubscribe, clear privacy
3. **Accessibility**: Works for everyone, including disabilities
4. **Time-conscious**: Quick actions, scannable content

---

## Conclusion

This design system prioritizes **trust over tricks, clarity over clutter, and community over campaign tactics**. Every element should answer: "Does this help a busy voter make an informed decision and feel good about getting involved?"

When in doubt, choose the more transparent, more accessible, more respectful option. Local campaigns win on connection, not conversion optimization.
