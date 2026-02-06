'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container, OptimizedImage } from '@/components/ui';
import { SectionReveal } from '@/components/shared';
import { getGalleryItems } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { GalleryItem } from '@/types/content';
import styles from './FullGallery.module.css';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'inauguration', label: 'Inauguration' },
  { id: 'space', label: 'The Space' },
  { id: 'moments', label: 'Moments' }
] as const;

export function FullGallery() {
  const allItems = getGalleryItems();
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]['id']>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const nextLightbox = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevLightbox = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextLightbox, prevLightbox]);

  return (
    <section className={styles.section} aria-labelledby="gallery-page-heading">
      <Container>
        <SectionReveal>
          <header className={styles.header}>
            <span className={styles.label}>Visual Archive</span>
            <h1 id="gallery-page-heading" className={styles.heading}>
              The Dream Centre Gallery
            </h1>
            <p className={styles.subheading}>
              A curated collection documenting the spaces, the inauguration, and the 
              inspiring moments at the Senator Oluremi Tinubu Dream Centre.
            </p>
          </header>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <nav className={styles.filters} aria-label="Gallery categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={cn(
                  styles.filterButton,
                  activeCategory === cat.id && styles.activeFilter
                )}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </SectionReveal>

        <div className={styles.grid}>
          {filteredItems.map((item, idx) => (
            <SectionReveal 
              key={item.id} 
              delay={0.1 * (idx % 6)} 
              yOffset={20}
            >
              <figure 
                className={styles.item}
                onClick={() => openLightbox(idx)}
                role="button"
                aria-label={`View ${item.type}: ${item.caption}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
              >
                <div className={styles.imageWrapper}>
                  <OptimizedImage
                    src={item.type === 'video' ? (item.thumbnail || '/images/gallery/main-hall.jpg') : item.src}
                    alt={item.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {item.type === 'video' && (
                    <div className={styles.videoBadge}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                  <div className={styles.overlay}>
                    <figcaption className={styles.itemCaption}>
                      {item.caption}
                    </figcaption>
                  </div>
                </div>
              </figure>
            </SectionReveal>
          ))}
        </div>
      </Container>

      {/* Lightbox / Modal */}
      {lightboxIndex !== null && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button 
            className={styles.closeButton} 
            onClick={closeLightbox} 
            aria-label="Close"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={cn(styles.arrow, styles.arrowPrev)} 
              onClick={prevLightbox} 
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <div className={styles.lightboxMediaWrapper}>
              {filteredItems[lightboxIndex].type === 'image' ? (
                <OptimizedImage
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].alt}
                  fill
                  className={styles.lightboxImage}
                  sizes="90vw"
                  priority
                />
              ) : (
                <video 
                  src={filteredItems[lightboxIndex].src} 
                  controls 
                  autoPlay={false}
                  className={styles.lightboxVideo}
                />
              )}
            </div>

            <div className={styles.footer}>
              <div className={styles.footerCaption}>
                {filteredItems[lightboxIndex].caption}
                <p style={{ fontSize: 'var(--text-sm)', opacity: 0.7, fontWeight: 'normal', fontStyle: 'italic', marginTop: 'var(--space-2)' }}>
                  {filteredItems[lightboxIndex].alt}
                </p>
              </div>
              <div className={styles.counter}>
                {lightboxIndex + 1} / {filteredItems.length}
              </div>
            </div>

            <button 
              className={cn(styles.arrow, styles.arrowNext)} 
              onClick={nextLightbox} 
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
