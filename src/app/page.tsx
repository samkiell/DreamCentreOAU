/**
 * Home Page — Dream Centre
 * Composes all sections for the single-page informational site
 */

import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Mission } from '@/components/sections/Mission';
import { Features } from '@/components/sections/Features';
import { Stakeholders } from '@/components/sections/Stakeholders';
import { SpaceGallery } from '@/components/sections/SpaceGallery';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stakeholders />
      <Philosophy />
      <Mission />
      <Features />
      <SpaceGallery />
      <Contact />
    </>
  );
}

