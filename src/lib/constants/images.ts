/**
 * Image Constants and Requirements
 * 
 * This file lists all images required for the campaign website.
 * Images should be optimized as WebP or AVIF format for best performance.
 * 
 * Recommended image optimization:
 * - Use WebP format for maximum compatibility
 * - Use AVIF for modern browsers (configured in next.config.ts)
 * - Compress images before adding to /public/images/
 * - Use appropriate dimensions (see recommendations below)
 */

export const IMAGE_PATHS = {
  // Candidate images
  // Using JPG format for actual photos
  candidate: {
    hero: "/images/candidate/no-bg.png", // Main candidate photo for hero section
    about: "/images/candidate/Graduation photo.JPG", // Recommended: 800x1000px
    action: "/images/candidate/JKCF scholars weekend.JPG", // Recommended: 1200x800px
  },

  // Endorsement images
  // Note: Using SVG placeholders until real images are added
  endorsements: {
    mayor: "/images/endorsements/mayor.svg", // Recommended: 600x600px (square)
    unionPresident: "/images/endorsements/union-president.svg", // Recommended: 600x600px
    organizer: "/images/endorsements/organizer.svg", // Recommended: 600x600px
  },

  // Campaign assets
  logo: "/images/logo.png", // DAVID! speech bubble logo
  yardSign: "/images/placeholder.svg", // Placeholder until yard sign mockup is added
  ogImage: "/images/logo.png", // Fallback until OG image is added
  placeholder: "/images/placeholder.svg", // Recommended: 400x400px (fallback)
} as const;

/**
 * TODO: Add the following images to /public/images/:
 * 
 * 1. /images/candidate/hero.jpg
 *    - Dimensions: 1200x1600px
 *    - Format: WebP or AVIF
 *    - Description: Professional candidate photo for hero section
 * 
 * 2. /images/candidate/about.jpg
 *    - Dimensions: 800x1000px
 *    - Format: WebP or AVIF
 *    - Description: Candidate at community event for about section
 * 
 * 3. /images/candidate/action.jpg
 *    - Dimensions: 1200x800px
 *    - Format: WebP or AVIF
 *    - Description: Campaign action photo (rally, canvassing) for donate section
 * 
 * 4. /images/endorsements/mayor.jpg
 *    - Dimensions: 600x600px (square)
 *    - Format: WebP or AVIF
 *    - Description: Headshot of Mayor Jane Smith
 * 
 * 5. /images/endorsements/union-president.jpg
 *    - Dimensions: 600x600px (square)
 *    - Format: WebP or AVIF
 *    - Description: Headshot of union president
 * 
 * 6. /images/endorsements/organizer.jpg
 *    - Dimensions: 600x600px (square)
 *    - Format: WebP or AVIF
 *    - Description: Headshot of community organizer
 * 
 * 7. /images/yard-sign-mockup.png
 *    - Dimensions: 800x1000px
 *    - Format: PNG (for transparency if needed) or WebP
 *    - Description: Yard sign mockup/design
 * 
 * 8. /images/og-image.png
 *    - Dimensions: 1200x630px (Open Graph standard)
 *    - Format: PNG or WebP
 *    - Description: Social media preview image
 * 
 * 9. /images/placeholder.jpg
 *    - Dimensions: 400x400px
 *    - Format: WebP or AVIF
 *    - Description: Generic placeholder for missing images
 */

/**
 * Image optimization tips:
 * 
 * 1. Use tools like:
 *    - Squoosh (https://squoosh.app/)
 *    - ImageOptim
 *    - Sharp (for programmatic optimization)
 * 
 * 2. Target file sizes:
 *    - Hero images: < 200KB
 *    - About/Action images: < 150KB
 *    - Endorsement headshots: < 50KB
 *    - Yard sign mockup: < 100KB
 *    - OG image: < 200KB
 * 
 * 3. Next.js automatically:
 *    - Serves WebP/AVIF when supported
 *    - Generates responsive sizes
 *    - Lazy loads below-fold images
 *    - Optimizes on-the-fly
 */
