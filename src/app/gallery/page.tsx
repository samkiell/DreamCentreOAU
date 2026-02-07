/**
 * Gallery Page — Dream Centre
 * Dedicated archive of images and videos
 */

import { FullGallery } from '@/components/sections/FullGallery';
import { getMetadata } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const siteMeta = getMetadata();
  return {
    title: `Gallery | ${siteMeta.title}`,
    description: "Explore the visual archive of the Senator Oluremi Tinubu Dream Centre at OAU. Photos and videos documenting the spaces, inauguration, and inspiring moments.",
    keywords: `Gallery, ${siteMeta.keywords}, inauguration photos, Dream Centre interior, OAU innovation hub`,
    openGraph: {
      title: `Gallery — Senator Oluremi Tinubu Dream Centre`,
      description: "Visual documentation of the Dream Centre at Obafemi Awolowo University.",
      url: `${siteMeta.url}/gallery`,
      siteName: siteMeta.title,
      images: [
        {
          url: '/images/gallery/overall-exterior.jpg',
          width: 1200,
          height: 630,
          alt: 'Dream Centre Exterior Facade',
        },
      ],
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Gallery — Senator Oluremi Tinubu Dream Centre`,
      description: 'Explore the visual archive of the Dream Centre at OAU.',
      images: ['/images/gallery/overall-exterior.jpg'],
    },
  };
}

export default function GalleryPage() {
  return (
    <main>
      <FullGallery />
    </main>
  );
}
