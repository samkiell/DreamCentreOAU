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
    title: `Gallery | ${siteMeta.title} — OAU`,
    description: "Visual archive of the Senator Oluremi Tinubu Dream Centre at Obafemi Awolowo University, documenting the inauguration, the space, and the inspiring atmosphere.",
  };
}

export default function GalleryPage() {
  return (
    <main>
      <FullGallery />
    </main>
  );
}
