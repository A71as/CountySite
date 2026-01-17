# [Candidate Name] for [Office] - Campaign Website

A modern, accessible, and SEO-optimized political campaign website built with Next.js 14, TypeScript, and Tailwind CSS. This website is designed to help candidates connect with voters, collect signups, manage volunteers, and process yard sign requests.

## Overview

This is a full-stack campaign website featuring:
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Form Management**: Email signups, volunteer registration, yard sign requests, and contact forms
- **Security**: Cloudflare Turnstile bot protection, rate limiting, and comprehensive security headers
- **Email Automation**: Automated welcome emails and confirmations via Resend
- **Database Integration**: Supabase for data storage and management
- **SEO Optimized**: Dynamic sitemaps, structured data, Open Graph images, and comprehensive metadata
- **Analytics**: Plausible Analytics integration for privacy-friendly tracking
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized images, lazy loading, and Lighthouse scores 90+

## Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework

### Form & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Zod integration for React Hook Form

### Security & Infrastructure
- **Cloudflare Turnstile** - Bot protection and CAPTCHA alternative
- **Upstash Redis** - Rate limiting and caching
- **Supabase** - PostgreSQL database and backend services

### Email & Communication
- **Resend** - Transactional email service

### UI & Animation
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **clsx & tailwind-merge** - Conditional class utilities

### Testing & Quality
- **Playwright** - End-to-end testing
- **Axe-core** - Accessibility testing
- **Lighthouse CI** - Performance auditing

## Getting Started

### Prerequisites

- **Node.js 20+** - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Supabase Account** - [Sign up](https://supabase.com/) (free tier available)
- **Cloudflare Account** - [Sign up](https://www.cloudflare.com/) (free tier available)
- **Resend Account** - [Sign up](https://resend.com/) (free tier available)
- **Upstash Account** - [Sign up](https://upstash.com/) (free tier available)

### Environment Setup

1. **Clone the repository** (or download the project)

```bash
git clone <repository-url>
cd CountySite
```

2. **Install dependencies**

```bash
npm install
```

3. **Copy environment variables**

```bash
cp .env.example .env.local
```

4. **Fill in environment variables** in `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_CANDIDATE_NAME=Jane Doe
NEXT_PUBLIC_OFFICE=County Commissioner
NEXT_PUBLIC_COUNTY=Springfield
NEXT_PUBLIC_STATE=IL
NEXT_PUBLIC_ELECTION_DATE=2024-11-05

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key

# Resend Email
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# Donations
NEXT_PUBLIC_ACTBLUE_URL=https://secure.actblue.com/donate/your-campaign

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### Database Setup

#### Supabase Database Schema

Run the following SQL in your Supabase SQL Editor to create the required tables:

```sql
-- Email signups table
CREATE TABLE IF NOT EXISTS signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  zip_code TEXT,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  zip_code TEXT,
  interests TEXT[],
  availability TEXT,
  contacted BOOLEAN DEFAULT FALSE,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Yard sign requests table
CREATE TABLE IF NOT EXISTS yard_sign_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  quantity INTEGER DEFAULT 1 CHECK (quantity >= 1 AND quantity <= 5),
  fulfilled BOOLEAN DEFAULT FALSE,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  responded BOOLEAN DEFAULT FALSE,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_volunteers_email ON volunteers(email);
CREATE INDEX IF NOT EXISTS idx_volunteers_contacted ON volunteers(contacted);
CREATE INDEX IF NOT EXISTS idx_yard_sign_fulfilled ON yard_sign_requests(fulfilled);
CREATE INDEX IF NOT EXISTS idx_contact_responded ON contact_submissions(responded);
```

#### Row Level Security (RLS)

For security, enable RLS on all tables. Since we're using the service role key in API routes, RLS can be restrictive:

```sql
-- Enable RLS on all tables
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE yard_sign_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Deny all public access (API routes use service role key)
CREATE POLICY "Deny all public access" ON signups FOR ALL USING (false);
CREATE POLICY "Deny all public access" ON volunteers FOR ALL USING (false);
CREATE POLICY "Deny all public access" ON yard_sign_requests FOR ALL USING (false);
CREATE POLICY "Deny all public access" ON contact_submissions FOR ALL USING (false);
```

## Project Structure

```
CountySite/
├── public/                    # Static assets
│   └── images/               # Campaign images (add your images here)
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── contact/      # Contact form endpoint
│   │   │   ├── signup/       # Email signup endpoint
│   │   │   ├── volunteer/    # Volunteer signup endpoint
│   │   │   └── yard-sign/    # Yard sign request endpoint
│   │   ├── privacy/          # Privacy policy page
│   │   ├── terms/            # Terms of service page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx          # Homepage
│   │   ├── globals.css       # Global styles
│   │   ├── robots.ts         # Dynamic robots.txt
│   │   ├── sitemap.ts        # Dynamic sitemap
│   │   └── opengraph-image.tsx # Dynamic OG image
│   ├── components/
│   │   ├── forms/            # Form components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   ├── VolunteerForm.tsx
│   │   │   └── YardSignForm.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── AnnouncementBar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── sections/         # Page sections
│   │   │   ├── About.tsx
│   │   │   ├── Donate.tsx
│   │   │   ├── Endorsements.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── GetInvolved.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Issues.tsx
│   │   │   ├── News.tsx
│   │   │   ├── VideoQuote.tsx
│   │   │   └── YardSign.tsx
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── AnimatedSection.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── OptimizedImage.tsx
│   │   │   └── SectionWrapper.tsx
│   │   ├── Analytics.tsx     # Analytics component
│   │   ├── ErrorBoundary.tsx # Error handling
│   │   └── StructuredData.tsx # JSON-LD schema
│   ├── hooks/                # Custom React hooks
│   │   ├── useCountdown.ts
│   │   └── useScrollSpy.ts
│   ├── lib/
│   │   ├── constants/
│   │   │   └── images.ts     # Image path constants
│   │   ├── integrations/
│   │   │   ├── ratelimit.ts  # Rate limiting
│   │   │   ├── resend.ts     # Email templates
│   │   │   └── supabase.ts   # Supabase clients
│   │   ├── analytics.ts      # Analytics utilities
│   │   ├── utils.ts          # Utility functions
│   │   └── validations.ts    # Zod schemas
│   └── types/                # TypeScript types
├── tests/
│   ├── accessibility/        # Accessibility tests
│   │   └── axe.spec.ts
│   └── e2e/                  # End-to-end tests
│       └── forms.spec.ts
├── .github/
│   └── workflows/            # CI/CD workflows
│       ├── ci.yml
│       └── lighthouse.yml
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Customization Guide

### Updating Content

#### Candidate Information
Update environment variables in `.env.local`:
- `NEXT_PUBLIC_CANDIDATE_NAME` - Candidate's full name
- `NEXT_PUBLIC_OFFICE` - Office being sought
- `NEXT_PUBLIC_COUNTY` - County name
- `NEXT_PUBLIC_STATE` - State abbreviation
- `NEXT_PUBLIC_ELECTION_DATE` - Election date (YYYY-MM-DD format)

#### Issues Section
Edit `src/components/sections/Issues.tsx` to update:
- Issue titles
- Descriptions
- Icons (from Lucide React)

#### Endorsements
Edit `src/components/sections/Endorsements.tsx` to:
- Add/remove endorsements
- Update quotes
- Add endorsement photos to `/public/images/endorsements/`

#### Events
Edit `src/components/sections/Events.tsx` to:
- Add upcoming events
- Update event details
- Link to RSVP pages

#### About Section
Edit `src/components/sections/About.tsx` to:
- Update candidate biography
- Modify pull quotes
- Add credentials/experience

### Styling

#### Colors
Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: {
    // Main brand color (blue)
    50: '#E6F0FF',
    // ... other shades
    900: '#001F54',
  },
  accent: {
    // Secondary brand color (orange)
    50: '#FFF4E6',
    // ... other shades
    900: '#CC5500',
  },
}
```

#### Fonts
Fonts are configured in `src/app/layout.tsx`:
- **Headings**: Outfit (from Google Fonts)
- **Body**: Inter (from Google Fonts)

To change fonts, update the font imports and CSS variables.

### Adding Images

1. **Add images to `/public/images/`** following the structure in `src/lib/constants/images.ts`
2. **Update image paths** in `src/lib/constants/images.ts` if needed
3. **Optimize images** before adding:
   - Use WebP or AVIF format
   - Compress using tools like [Squoosh](https://squoosh.app/)
   - Target file sizes: Hero < 200KB, Headshots < 50KB

Required images:
- `/public/images/candidate/hero.jpg` (1200x1600px)
- `/public/images/candidate/about.jpg` (800x1000px)
- `/public/images/candidate/action.jpg` (1200x800px)
- `/public/images/endorsements/*.jpg` (600x600px each)
- `/public/images/yard-sign-mockup.png` (800x1000px)

### Legal Compliance

#### Disclaimer Requirements
**IMPORTANT**: Update the footer disclaimer in `src/components/layout/Footer.tsx`:

```tsx
<p className="text-sm text-gray-400">
  Paid for by {candidateName} for {office}
</p>
```

**Check your state's requirements** for:
- Campaign finance disclosure language
- Authorized by statements
- Treasurer information
- Contact information requirements

#### Privacy Policy
Review and update `src/app/privacy/page.tsx`:
- Add actual campaign email address
- Update data collection practices
- Verify SMS opt-in language (if using text messaging)
- Add state-specific privacy requirements

#### Terms of Service
Review `src/app/terms/page.tsx`:
- Update contact information
- Add state-specific terms
- Verify donation processing language

#### FEC Compliance
- Ensure all donation links go through ActBlue (or your compliant processor)
- Verify contribution limits are displayed
- Add required FEC disclaimers on donation pages

## Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure environment variables**
   - Add all variables from `.env.local` to Vercel
   - Use Vercel's environment variable interface

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your site will be live at `your-project.vercel.app`

5. **Custom domain** (optional)
   - Add your domain in Vercel settings
   - Update DNS records as instructed
   - Update `NEXT_PUBLIC_SITE_URL` in environment variables

### Environment Variables for Production

Ensure all these are set in your hosting platform:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_CANDIDATE_NAME=Your Candidate Name
NEXT_PUBLIC_OFFICE=Office Name
NEXT_PUBLIC_COUNTY=County Name
NEXT_PUBLIC_STATE=ST
NEXT_PUBLIC_ELECTION_DATE=2024-11-05

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxx
TURNSTILE_SECRET_KEY=xxx

# Resend
RESEND_API_KEY=xxx
EMAIL_FROM=noreply@yourdomain.com

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# Donations
NEXT_PUBLIC_ACTBLUE_URL=https://secure.actblue.com/donate/xxx

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

### Other Deployment Options

- **Netlify**: Similar to Vercel, supports Next.js out of the box
- **AWS Amplify**: Full AWS integration
- **Self-hosted**: Requires Node.js server setup

## Pre-Launch Checklist

### Content & Branding
- [ ] Update all placeholder content with real campaign information
- [ ] Add real candidate photos (hero, about, action shots)
- [ ] Add endorsement photos and quotes
- [ ] Update all social media links in Footer
- [ ] Verify all text for typos and accuracy
- [ ] Update video URL in VideoQuote section (if applicable)

### Technical Setup
- [ ] Configure ActBlue donation link
- [ ] Set up Supabase production database
- [ ] Run database migrations in production
- [ ] Configure Cloudflare Turnstile for production domain
- [ ] Set up Resend email domain verification
- [ ] Configure Upstash Redis for production
- [ ] Set up Plausible Analytics (or alternative)
- [ ] Test all forms (signup, volunteer, yard sign, contact)
- [ ] Verify email delivery (check spam folders)

### Legal & Compliance
- [ ] Review and update Privacy Policy
- [ ] Review and update Terms of Service
- [ ] Verify disclaimer language with campaign counsel
- [ ] Add required FEC disclaimers
- [ ] Check state-specific requirements
- [ ] Add treasurer information if required

### Testing & Quality
- [ ] Run Lighthouse audit (target: 90+ in all categories)
- [ ] Test on mobile devices (iOS and Android)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Run accessibility tests (`npm run test:a11y`)
- [ ] Run end-to-end tests (`npm run test:e2e`)
- [ ] Test all external links
- [ ] Verify all images load correctly
- [ ] Test form submissions end-to-end

### SEO & Performance
- [ ] Verify sitemap is accessible at `/sitemap.xml`
- [ ] Verify robots.txt is accessible at `/robots.txt`
- [ ] Test Open Graph image generation
- [ ] Verify structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Submit sitemap to Google Search Console
- [ ] Optimize all images (WebP/AVIF format)
- [ ] Test page load speeds

### Security
- [ ] Verify security headers are working
- [ ] Test rate limiting on forms
- [ ] Verify Turnstile is blocking bots
- [ ] Check that API routes are not publicly accessible
- [ ] Verify environment variables are not exposed

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run all tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:a11y` - Run accessibility tests

## Troubleshooting

### Forms not submitting
- Check browser console for errors
- Verify Turnstile keys are correct
- Check Supabase connection
- Verify rate limiting isn't blocking legitimate requests

### Images not loading
- Ensure images are in `/public/images/` directory
- Check image paths in `src/lib/constants/images.ts`
- Verify Next.js Image optimization is working

### Email not sending
- Verify Resend API key is correct
- Check Resend dashboard for errors
- Verify email domain is verified in Resend
- Check spam folders

### Database errors
- Verify Supabase credentials
- Check database tables exist
- Verify RLS policies allow service role access
- Check Supabase logs for errors

## License

This project is for campaign use only. All rights reserved.

**Note**: This template is provided as-is. Campaigns are responsible for:
- Legal compliance with FEC and state regulations
- Content accuracy
- Data privacy compliance
- Accessibility requirements

## Credits

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Next.js documentation
3. Check Supabase, Resend, and Cloudflare documentation
4. Consult with your development team

---

**Built with ❤️ for grassroots campaigns**
