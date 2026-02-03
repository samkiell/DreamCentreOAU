/**
 * Metadata Utilities — Dream Centre
 * Helper functions for generating SEO metadata
 */

import type { Metadata } from 'next';
import { getMetadata } from './content';

/**
 * Generate base metadata for the site
 */
export function generateSiteMetadata(): Metadata {
  const siteData = getMetadata();
  
  return {
    metadataBase: new URL(siteData.url),
    title: {
      default: siteData.title,
      template: `%s | ${siteData.title}`,
    },
    description: siteData.description,
    openGraph: {
      title: siteData.title,
      description: siteData.description,
      url: siteData.url,
      siteName: siteData.title,
      images: [
        {
          url: siteData.ogImage,
          width: 1200,
          height: 630,
          alt: siteData.title,
        },
      ],
      locale: siteData.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteData.title,
      description: siteData.description,
      images: [siteData.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata(
  title: string,
  description?: string,
  image?: string
): Metadata {
  const siteData = getMetadata();
  
  return {
    title,
    description: description || siteData.description,
    openGraph: {
      title,
      description: description || siteData.description,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
  };
}
