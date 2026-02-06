/**
 * Content Utilities — Dream Centre
 * Functions for fetching and processing content data
 * This abstraction layer allows easy migration to a CMS in the future
 */

import type { 
  SiteMetadata, 
  PhilosophyContent, 
  MissionContent,
  Stakeholder, 
  GalleryItem, 
  ContactInfo,
  HeroContent,
  FeaturesContent,
} from '@/types/content';

// Static imports from JSON files
import metadataData from '@/content/metadata.json';
import heroData from '@/content/hero.json';
import philosophyData from '@/content/philosophy.json';
import missionData from '@/content/mission.json';
import stakeholdersData from '@/content/stakeholders.json';
import galleryData from '@/content/gallery.json';
import contactData from '@/content/contact.json';
import featuresData from '@/content/features.json';
import quotesData from '@/content/quotes.json';

/**
 * Get the list of formal quotes
 */
export function getQuotes(): string[] {
  return quotesData as string[];
}

/**
 * Get site metadata for SEO
 */
export function getMetadata(): SiteMetadata {
  return metadataData as SiteMetadata;
}

/**
 * Get hero section content
 */
export function getHeroContent(): HeroContent {
  return heroData as HeroContent;
}

/**
 * Get philosophy section content
 */
export function getPhilosophy(): PhilosophyContent {
  return philosophyData as PhilosophyContent;
}

/**
 * Get mission section content
 */
export function getMission(): MissionContent {
  return missionData as MissionContent;
}

/**
 * Get features/programs content
 */
export function getFeatures(): FeaturesContent {
  return featuresData as FeaturesContent;
}

/**
 * Get all stakeholders, optionally filtered by role
 */
export function getStakeholders(role?: Stakeholder['role']): Stakeholder[] {
  const stakeholders = stakeholdersData as Stakeholder[];
  
  if (role) {
    return stakeholders.filter(s => s.role === role).sort((a, b) => a.order - b.order);
  }
  
  return stakeholders.sort((a, b) => a.order - b.order);
}

/**
 * Get single stakeholder by ID
 */
export function getStakeholderById(id: string): Stakeholder | undefined {
  const stakeholders = stakeholdersData as Stakeholder[];
  return stakeholders.find(s => s.id === id);
}

/**
 * Get all gallery items, optionally filtered by category
 */
export function getGalleryItems(category?: GalleryItem['category']): GalleryItem[] {
  const items = galleryData as GalleryItem[];
  
  if (category) {
    return items.filter(item => item.category === category);
  }
  
  return items;
}

/**
 * Get contact information
 */
export function getContact(): ContactInfo {
  return contactData as ContactInfo;
}

