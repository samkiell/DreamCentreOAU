# SEO Strategy: Senator Oluremi Tinubu Dream Centre

## 1. Keywords & Search Strategy

### Core Keywords (Institutional & Location)
*   **Primary:** Senator Oluremi Tinubu Dream Centre
*   **Secondary:** Dream Centre OAU, Mentorship Hub Ile-Ife
*   **Location-based:** Obafemi Awolowo University Dream Centre, Youth Hub Osun State, Nigeria Digital Information Hub

### Supporting Keywords
*   Responsible leadership mentorship
*   Digital information hub Nigeria
*   Institutional sanctuary for reflection
*   OAU digital technology research

### Long-tail Phrases
*   "Mentorship programs at Obafemi Awolowo University"
*   "Senator Oluremi Tinubu youth empowerment initiatives"
*   "Digitally-driven inspiration hubs for Nigerian students"
*   "How to visit the Dream Centre OAU"

## 2. Page-level SEO (One-Page Layout)

### Meta Tags
*   **Title Tag:** Senator Oluremi Tinubu Dream Centre | OAU Ile-Ife
*   **Meta Description:** A digital information hub and mentorship sanctuary at Obafemi Awolowo University. Inspiring responsible leadership through technology and storytelling.

### Heading Hierarchy
*   **H1:** Senator Oluremi Tinubu Dream Centre (The brand identity)
*   **H2:** Our Philosophy, Our Mission, Meet Our Leadership (The core pillars)
*   **H3:** Program titles (Digital Mastery, Leadership, etc.) and specific stakeholder titles.

## 3. Next.js App Router Implementation

### Metadata Configuration
We use `generateSiteMetadata()` in `layout.tsx` to provide:
*   `canonical` URL to prevent duplicate content issues.
*   Localized `og:locale` set to `en_NG`.
*   Twitter Card set to `summary_large_image`.

### JSON-LD Structured Data
Implemented via a component in `layout.tsx` to inject:
*   `EducationalOrganization` for the institutional context.
*   `Place` for physical location discoverability.

## 4. Image SEO Strategy

*   **Naming:** Use `dream-centre-mural-perspective.jpg` instead of `IMG_1234.jpg`.
*   **Alt Text:** "Wide perspective of the iconic footprint mural at the Dream Centre, featuring the quote 'A journey of 1000 miles begins with a single step'."
*   **Sizing:** Images are served via Next.js `next/image` for automatic AVIF/WebP conversion and responsive resizing.

## 5. Local & Institutional SEO

*   **Address Optimization:** Physical address included in `contact.json` maps directly to OAU campus structure.
*   **Institutional Backlinking:** Target links from `oauife.edu.ng` and related government portals to build authority.
*   **Google Maps:** Active integration with `maps.app.goo.gl` for local "Near Me" search relevance.

## 6. Performance & Core Web Vitals

*   **LCP:** Minimized by prioritizing the Hero image with `priority` attribute.
*   **CLS:** Fixed aspect ratios for all gallery items and stakeholder portraits.
*   **INP:** Lightweight interactions using CSS transitions instead of heavy JS animations.

## 7. Future-proofing

*   **URL Structure:** Ready for `/events` or `/reflections` as sub-pages.
*   **Slug Generation:** Standardized naming conventions for all new dynamic content.
