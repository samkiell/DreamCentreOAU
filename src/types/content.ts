/**
 * Content Types — Dream Centre
 * Type definitions for all content data structures
 */

/** Site-wide metadata for SEO and Open Graph */
export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  locale: string;
}

/** Philosophy and mission content */
export interface PhilosophyContent {
  heading: string;
  subheading?: string;
  body: string[];
  pullQuote?: {
    text: string;
    attribution?: string;
  };
}

/** Mission statement content */
export interface MissionContent {
  heading: string;
  statement: string;
  values?: Array<{
    title: string;
    description: string;
  }>;
}

/** Stakeholder profile */
export interface Stakeholder {
  id: string;
  name: string;
  title: string;
  role: 'patron' | 'leadership' | 'advisory' | 'staff';
  image: {
    src: string;
    alt: string;
  };
  bio?: string;
  order: number;
}

/** Gallery image item */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  category?: 'exterior' | 'interior' | 'detail' | 'grounds';
}

/** Contact information */
export interface ContactInfo {
  heading?: string;
  address: string[];
  email: string;
  phone?: string;
  hours?: string;
  mapUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/** Hero section content */
export interface HeroContent {
  heading: string;
  subheading?: string;
  tagline?: string;
  image: {
    src: string;
    alt: string;
  };
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

/** Footer content */
export interface FooterContent {
  institutionName: string;
  universityName: string;
  copyright: string;
  links?: NavLink[];
}
