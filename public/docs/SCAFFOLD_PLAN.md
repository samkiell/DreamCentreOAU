# Scaffold Plan — Dream Centre Website
## Next.js 16+ App Router with TypeScript

**Version:** 1.0  
**Date:** February 2026  
**Project:** Senator Oluremi Tinubu Dream Centre, Obafemi Awolowo University

---

## 1. Folder Structure

```
dream-centre/
├── .env.local                    # Environment variables (API keys, CMS endpoints)
├── .env.example                  # Template for required env vars
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
│
├── public/
│   ├── fonts/                    # Self-hosted fonts (Libre Baskerville, Source Serif Pro, Inter)
│   │   ├── libre-baskerville/
│   │   ├── source-serif-pro/
│   │   └── inter/
│   ├── images/
│   │   ├── hero/                 # Hero section imagery
│   │   ├── gallery/              # Space gallery photos
│   │   ├── stakeholders/         # Portraits and institutional imagery
│   │   └── og/                   # Open Graph images for social sharing
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── site.webmanifest
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (fonts, metadata, global providers)
│   │   ├── page.tsx              # Home page (single page for now)
│   │   ├── globals.css           # Global CSS reset and custom properties
│   │   ├── not-found.tsx         # Custom 404 page
│   │   ├── error.tsx             # Error boundary
│   │   ├── loading.tsx           # Loading state (optional)
│   │   │
│   │   ├── (future)/             # Route group for future pages (not rendered yet)
│   │   │   ├── events/
│   │   │   │   └── page.tsx
│   │   │   ├── stories/
│   │   │   │   └── page.tsx
│   │   │   └── reflections/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                  # API routes for future dynamic content
│   │       └── revalidate/
│   │           └── route.ts      # On-demand revalidation endpoint
│   │
│   ├── components/
│   │   ├── layout/               # Structural components
│   │   │   ├── Header.tsx
│   │   │   ├── Header.module.css
│   │   │   ├── Footer.tsx
│   │   │   ├── Footer.module.css
│   │   │   ├── Navigation.tsx
│   │   │   ├── Navigation.module.css
│   │   │   └── index.ts          # Barrel export
│   │   │
│   │   ├── sections/             # Page sections (single-purpose, composable)
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Hero.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Philosophy/
│   │   │   │   ├── Philosophy.tsx
│   │   │   │   ├── Philosophy.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Stakeholders/
│   │   │   │   ├── Stakeholders.tsx
│   │   │   │   ├── StakeholderCard.tsx
│   │   │   │   ├── Stakeholders.module.css
│   │   │   │   └── index.ts
│   │   │   ├── SpaceGallery/
│   │   │   │   ├── SpaceGallery.tsx
│   │   │   │   ├── GalleryImage.tsx
│   │   │   │   ├── SpaceGallery.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Mission/
│   │   │   │   ├── Mission.tsx
│   │   │   │   ├── Mission.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Contact/
│   │   │   │   ├── Contact.tsx
│   │   │   │   ├── Contact.module.css
│   │   │   │   └── index.ts
│   │   │   └── index.ts          # Barrel export for all sections
│   │   │
│   │   ├── ui/                   # Reusable UI primitives
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Typography/
│   │   │   │   ├── Heading.tsx
│   │   │   │   ├── Text.tsx
│   │   │   │   ├── Typography.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Image/
│   │   │   │   ├── OptimizedImage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Container/
│   │   │   │   ├── Container.tsx
│   │   │   │   ├── Container.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Divider/
│   │   │   │   ├── Divider.tsx
│   │   │   │   ├── Divider.module.css
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── shared/               # Cross-cutting components
│   │       ├── SkipLink.tsx      # Accessibility: skip to main content
│   │       ├── ScrollToTop.tsx
│   │       └── index.ts
│   │
│   ├── content/                  # Static content (future CMS migration)
│   │   ├── philosophy.json
│   │   ├── stakeholders.json
│   │   ├── gallery.json
│   │   ├── contact.json
│   │   └── metadata.json         # Site-wide metadata
│   │
│   ├── lib/                      # Utilities and helpers
│   │   ├── fonts.ts              # Font loading configuration
│   │   ├── metadata.ts           # SEO metadata helpers
│   │   ├── content.ts            # Content fetching utilities
│   │   └── utils.ts              # General utilities (classnames, etc.)
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useScrollPosition.ts
│   │   ├── useMediaQuery.ts
│   │   └── useReducedMotion.ts   # Accessibility: respect prefers-reduced-motion
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── content.ts            # Content data structures
│   │   ├── components.ts         # Shared component prop types
│   │   └── index.ts              # Barrel export
│   │
│   └── styles/                   # Shared styles and design tokens
│       ├── tokens.css            # CSS custom properties (colors, spacing, typography)
│       ├── reset.css             # CSS reset / normalize
│       ├── typography.css        # Typography scale and utilities
│       └── animations.css        # Subtle, accessible animations
│
└── tests/                        # Testing (optional, future)
    ├── components/
    └── e2e/
```

---

## 2. File Naming Conventions

| Category | Convention | Example |
|----------|------------|---------|
| **Components** | PascalCase | `Hero.tsx`, `StakeholderCard.tsx` |
| **CSS Modules** | PascalCase.module.css | `Hero.module.css` |
| **Utilities/Hooks** | camelCase | `useScrollPosition.ts`, `fonts.ts` |
| **Types** | camelCase | `content.ts`, `components.ts` |
| **Content files** | kebab-case or camelCase | `stakeholders.json` |
| **Route files** | lowercase | `page.tsx`, `layout.tsx`, `route.ts` |
| **Barrel exports** | Always `index.ts` | `index.ts` |

---

## 3. Component Breakdown

### Layout Components

| Component | Purpose |
|-----------|---------|
| `Header` | Minimal header with logo/wordmark. May include sparse navigation links. Initially static, anchors to sections. |
| `Footer` | Institution details, copyright, accessibility statement link, subtle OAU branding. |
| `Navigation` | Anchor-based smooth scroll navigation. Hidden on mobile, accessible skip links. |

### Section Components

| Component | Purpose | Content Source |
|-----------|---------|----------------|
| `Hero` | Full-viewport hero with architectural photography, wordmark, and a single line of text. No CTA buttons. | `metadata.json`, static image |
| `Philosophy` | The centre's purpose and ethos. 2–3 paragraphs maximum. Generous whitespace. | `philosophy.json` |
| `Mission` | Core mission statement. May include a pull quote or highlighted passage. | `philosophy.json` |
| `Stakeholders` | Key figures — the patron (Senator), university leadership, advisory. Portrait images, name, title. | `stakeholders.json` |
| `SpaceGallery` | Photographic gallery of the physical space. Lightbox optional. | `gallery.json` |
| `Contact` | Address, email, phone. Map optional. No contact form initially. | `contact.json` |

### UI Primitives

| Component | Purpose |
|-----------|---------|
| `Heading` | Semantic headings (h1–h6) with consistent styling. |
| `Text` | Body text, captions, small text with size/weight variants. |
| `Button` | Minimal, restrained. Used sparingly. |
| `Container` | Max-width wrapper with responsive padding. |
| `OptimizedImage` | Wrapper around `next/image` with blur placeholder and aspect ratio handling. |
| `Divider` | Subtle horizontal rule or spacing element. |

### Shared/Utility Components

| Component | Purpose |
|-----------|---------|
| `SkipLink` | Accessibility: allows keyboard users to skip to main content. |
| `ScrollToTop` | Optional: gentle scroll-to-top button for long pages. |

---

## 4. TypeScript Usage Guidelines

### General Principles

1. **Strict mode enabled** — `strict: true` in `tsconfig.json`
2. **Explicit return types** for all exported functions and components
3. **Interface over type** for object shapes that may be extended
4. **Type over interface** for unions, primitives, and utility types
5. **No `any`** — use `unknown` if type is truly unknown, then narrow
6. **Props interfaces** named as `{ComponentName}Props`

### Type Definitions

```typescript
// types/content.ts

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  ogImage: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  title: string;
  role: string;
  image: {
    src: string;
    alt: string;
  };
  bio?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface PhilosophyContent {
  heading: string;
  body: string[];
  pullQuote?: string;
}

export interface ContactInfo {
  address: string[];
  email: string;
  phone?: string;
  mapUrl?: string;
}
```

```typescript
// types/components.ts

import type { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  size?: 'narrow' | 'default' | 'wide';
  className?: string;
}

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
  id?: string;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}
```

### Props Structure Guidelines

- **Required props first**, optional props second
- **Boolean props** should default to `false` (avoid `notDisabled` patterns)
- **Children** always typed as `ReactNode`
- **Event handlers** prefixed with `on` (e.g., `onClick`, `onHover`)
- **CSS class overrides** via optional `className` prop

---

## 5. Image Handling Strategy

### Classification

| Type | Storage | Optimization |
|------|---------|--------------|
| **Hero images** | `public/images/hero/` | Pre-optimized, blur placeholders generated at build |
| **Gallery photos** | `public/images/gallery/` | Multiple sizes via `next/image` srcset |
| **Stakeholder portraits** | `public/images/stakeholders/` | Fixed size, circular crop in CSS |
| **Open Graph images** | `public/images/og/` | 1200×630px, pre-generated |
| **Future dynamic images** | External CDN or CMS | URL-based, remote patterns in `next.config.ts` |

### Optimization Configuration

```typescript
// next.config.ts

const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Future CMS domain
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
  },
};
```

### Responsive Strategy

- **Hero**: Full-bleed, `object-fit: cover`, lazy loading disabled (`priority`)
- **Gallery**: Aspect ratio preserved, lazy loaded, blur placeholder
- **Portraits**: Fixed dimensions, eager loading for above-the-fold
- **All images**: `alt` text required, decorative images marked with `alt=""`

### Blur Placeholder Generation

Use `plaiceholder` or `sharp` at build time to generate low-quality image placeholders (LQIP) for smooth loading transitions. Store base64 data in content JSON.

---

## 6. Styling Strategy

### Recommendation: CSS Modules + CSS Custom Properties

**Rationale:**

| Consideration | CSS Modules | Tailwind | Styled-Components |
|---------------|-------------|----------|-------------------|
| Bundle size | ✅ Minimal | ⚠️ Requires purge | ❌ Runtime overhead |
| Co-location | ✅ Per-component | ⚠️ Inline only | ✅ Per-component |
| Design tokens | ✅ Via custom properties | ✅ Config-based | ⚠️ Theme provider |
| Learning curve | ✅ Standard CSS | ⚠️ Utility syntax | ⚠️ Template literals |
| Server components | ✅ Full support | ✅ Full support | ❌ Client only |
| Institutional tone | ✅ Refined control | ⚠️ Can feel generic | ✅ Refined control |

**CSS Modules** provide scoped styling without runtime cost, full server component compatibility, and precise control over the refined, restrained aesthetic this project requires.

### Design Token Structure

```css
/* styles/tokens.css */

:root {
  /* Colors — from Visual Design Document */
  --color-canvas: #FAF7F2;
  --color-stone: #E8E0D5;
  --color-earth: #B5836A;
  --color-deep: #5C4A3D;
  --color-muted-gold: #A68B5B;
  --color-sage: #8A9A7A;
  
  /* Typography */
  --font-heading: 'Libre Baskerville', Georgia, serif;
  --font-body: 'Source Serif Pro', Georgia, serif;
  --font-ui: 'Inter', system-ui, sans-serif;
  
  /* Font sizes — modular scale (1.25 ratio) */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.25rem;      /* 20px */
  --text-xl: 1.5rem;       /* 24px */
  --text-2xl: 1.875rem;    /* 30px */
  --text-3xl: 2.25rem;     /* 36px */
  --text-4xl: 3rem;        /* 48px */
  --text-5xl: 3.75rem;     /* 60px */
  
  /* Spacing — 8px base unit */
  --space-1: 0.25rem;      /* 4px */
  --space-2: 0.5rem;       /* 8px */
  --space-3: 0.75rem;      /* 12px */
  --space-4: 1rem;         /* 16px */
  --space-6: 1.5rem;       /* 24px */
  --space-8: 2rem;         /* 32px */
  --space-12: 3rem;        /* 48px */
  --space-16: 4rem;        /* 64px */
  --space-24: 6rem;        /* 96px */
  --space-32: 8rem;        /* 128px */
  
  /* Layout */
  --max-width-narrow: 42rem;   /* ~672px — prose */
  --max-width-default: 64rem;  /* ~1024px — content */
  --max-width-wide: 80rem;     /* ~1280px — gallery */
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Shadows — subtle, warm */
  --shadow-sm: 0 1px 2px rgba(92, 74, 61, 0.05);
  --shadow-md: 0 4px 12px rgba(92, 74, 61, 0.08);
  --shadow-lg: 0 12px 32px rgba(92, 74, 61, 0.12);
}
```

### CSS Module Pattern

```css
/* components/sections/Hero/Hero.module.css */

.root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--color-canvas);
}

.imageWrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: var(--max-width-narrow);
  padding: var(--space-8);
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  color: var(--color-deep);
  letter-spacing: 0.02em;
  margin-bottom: var(--space-6);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .heading {
    font-size: var(--text-3xl);
  }
}
```

---

## 7. Content Management Approach

### Phase 1: Static JSON (Current)

Content lives in `src/content/` as JSON files. This provides:
- Version control for all content
- Type-safe imports
- Zero external dependencies
- Fast build times

```typescript
// lib/content.ts

import philosophyData from '@/content/philosophy.json';
import stakeholdersData from '@/content/stakeholders.json';
import galleryData from '@/content/gallery.json';
import contactData from '@/content/contact.json';
import metadataData from '@/content/metadata.json';

import type { 
  PhilosophyContent, 
  Stakeholder, 
  GalleryImage, 
  ContactInfo,
  SiteMetadata 
} from '@/types/content';

export function getPhilosophy(): PhilosophyContent {
  return philosophyData as PhilosophyContent;
}

export function getStakeholders(): Stakeholder[] {
  return stakeholdersData as Stakeholder[];
}

export function getGallery(): GalleryImage[] {
  return galleryData as GalleryImage[];
}

export function getContact(): ContactInfo {
  return contactData as ContactInfo;
}

export function getMetadata(): SiteMetadata {
  return metadataData as SiteMetadata;
}
```

### Phase 2: Markdown + MDX (Future Stories/Reflections)

For narrative content like stories and reflections:

```
src/
└── content/
    └── stories/
        ├── 2026-02-mentorship-journey.mdx
        └── 2026-01-opening-ceremony.mdx
```

Use `@next/mdx` or `contentlayer` for type-safe MDX processing.

### Phase 3: Headless CMS (Future)

When content editors need direct access, migrate to:

| CMS | Rationale |
|-----|-----------|
| **Sanity** | Excellent TypeScript support, real-time preview, generous free tier |
| **Contentful** | Mature, enterprise-ready, structured content |
| **Strapi** | Self-hosted option if data sovereignty required |

The abstraction layer in `lib/content.ts` means swapping from JSON to a CMS requires only changing the data fetching functions, not the components.

---

## 8. Routing and Layout Strategy

### Current Structure (Single Page)

```
src/app/
├── layout.tsx      # Root layout: fonts, metadata, Header, Footer, main wrapper
├── page.tsx        # Home: composes all sections
├── globals.css     # Import tokens, reset, global styles
├── not-found.tsx   # 404 page
└── error.tsx       # Error boundary
```

### Root Layout Responsibilities

```typescript
// app/layout.tsx (conceptual structure)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### Home Page Composition

```typescript
// app/page.tsx (conceptual structure)

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Mission />
      <Stakeholders />
      <SpaceGallery />
      <Contact />
    </>
  );
}
```

### Future Route Expansion

```
src/app/
├── layout.tsx
├── page.tsx                    # Home
├── (future)/
│   ├── events/
│   │   ├── page.tsx            # Events listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual event
│   ├── stories/
│   │   ├── page.tsx            # Stories listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual story
│   └── reflections/
│       └── page.tsx            # Reflections/testimonials
```

The `(future)` route group allows preparing these routes without exposing them. Remove the parentheses when ready to publish.

---

## 9. Accessibility Considerations

### Semantic HTML

| Element | Usage |
|---------|-------|
| `<header>` | Site header |
| `<nav>` | Navigation sections |
| `<main>` | Primary content (one per page) |
| `<section>` | Each major page section with `aria-labelledby` |
| `<article>` | Future: stories, reflections |
| `<footer>` | Site footer |
| `<figure>` / `<figcaption>` | Gallery images with captions |

### Keyboard Navigation

- Skip link as first focusable element
- Visible focus indicators (styled, not removed)
- Logical tab order
- Interactive elements reachable via keyboard

### Screen Reader Support

- All images have descriptive `alt` text
- Decorative images marked `alt=""`
- Headings in logical order (h1 → h2 → h3, no skipping)
- Landmarks properly labeled
- Live regions for any dynamic content (future)

### Motion and Animation

```typescript
// hooks/useReducedMotion.ts

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

Disable or reduce all animations when user prefers reduced motion.

### Color Contrast

All text meets WCAG AA standards:
- `--color-deep` (#5C4A3D) on `--color-canvas` (#FAF7F2): **8.5:1** ✅
- `--color-earth` (#B5836A) on `--color-canvas` (#FAF7F2): **3.2:1** ⚠️ (use only for large text or decorative)

---

## 10. Performance Considerations

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Priority loading for hero image, font preloading |
| **FID** | < 100ms | Minimal JavaScript, no blocking scripts |
| **CLS** | < 0.1 | Explicit image dimensions, font-display swap |

### Font Loading Strategy

```typescript
// lib/fonts.ts

import localFont from 'next/font/local';

export const libreBaskerville = localFont({
  src: [
    { path: '../public/fonts/libre-baskerville/regular.woff2', weight: '400' },
    { path: '../public/fonts/libre-baskerville/italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/libre-baskerville/bold.woff2', weight: '700' },
  ],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

export const sourceSerifPro = localFont({
  src: [
    { path: '../public/fonts/source-serif-pro/regular.woff2', weight: '400' },
    { path: '../public/fonts/source-serif-pro/semibold.woff2', weight: '600' },
  ],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

export const inter = localFont({
  src: [
    { path: '../public/fonts/inter/regular.woff2', weight: '400' },
    { path: '../public/fonts/inter/medium.woff2', weight: '500' },
  ],
  variable: '--font-ui',
  display: 'swap',
  preload: false, // Secondary font, load lazily
});
```

### Image Loading Priority

| Image | Priority | Loading |
|-------|----------|---------|
| Hero background | `priority={true}` | Eager |
| First 2 stakeholder portraits | `priority={true}` | Eager |
| Gallery images | `priority={false}` | Lazy |
| Footer logo | `priority={false}` | Lazy |

### Bundle Optimization

- All components are React Server Components by default
- Client components only where interactivity required (future: lightbox, navigation toggle)
- No third-party animation libraries initially
- CSS-only animations where possible

---

## 11. SEO Considerations

### Metadata Configuration

```typescript
// app/layout.tsx

import type { Metadata } from 'next';
import { getMetadata } from '@/lib/content';

const siteMetadata = getMetadata();

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
```

### Structured Data (JSON-LD)

Include Organization and WebSite schemas:

```typescript
// components/shared/StructuredData.tsx

export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Senator Oluremi Tinubu Dream Centre',
    description: 'A mentorship and reflection centre at Obafemi Awolowo University',
    url: 'https://dreamcentre.oauife.edu.ng',
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Obafemi Awolowo University',
      url: 'https://oauife.edu.ng',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ile-Ife',
      addressRegion: 'Osun State',
      addressCountry: 'NG',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

### Additional SEO Elements

- Canonical URL on all pages
- Proper heading hierarchy (single h1 per page)
- Descriptive anchor text (no "click here")
- XML sitemap (auto-generated by Next.js 14+)
- robots.txt with sitemap reference

---

## 12. Development Workflow

### Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Pre-commit Hooks (Recommended)

Use `husky` + `lint-staged` to run:
- ESLint
- Prettier
- TypeScript type checking

### Environment Variables

```bash
# .env.example

# Site URL (used for metadata, sitemap)
NEXT_PUBLIC_SITE_URL=https://dreamcentre.oauife.edu.ng

# Future: CMS API keys
# SANITY_PROJECT_ID=
# SANITY_DATASET=
# SANITY_API_TOKEN=

# Future: Analytics
# NEXT_PUBLIC_GA_ID=
```

---

## 13. Deliverables Checklist

### Phase 1: Foundation
- [ ] Initialize Next.js 16+ with TypeScript
- [ ] Configure `next.config.ts`
- [ ] Set up folder structure
- [ ] Create design tokens (`styles/tokens.css`)
- [ ] Implement font loading
- [ ] Create root layout with metadata

### Phase 2: Core Components
- [ ] Build UI primitives (Container, Heading, Text, OptimizedImage)
- [ ] Build layout components (Header, Footer)
- [ ] Create content JSON files

### Phase 3: Sections
- [ ] Hero section
- [ ] Philosophy section
- [ ] Mission section
- [ ] Stakeholders section
- [ ] SpaceGallery section
- [ ] Contact section

### Phase 4: Polish
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] SEO validation
- [ ] Cross-browser testing
- [ ] Responsive testing

---

*Document prepared for implementation. No code generated. Ready for development phase.*
