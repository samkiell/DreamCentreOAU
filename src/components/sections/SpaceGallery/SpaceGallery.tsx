/**
 * SpaceGallery Section — Dream Centre
 * Photographic gallery of the physical space with a premium carousel
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { Container, OptimizedImage } from '@/components/ui';
import { getGalleryImages } from '@/lib/content';
import { cn } from '@/lib/utils';
import styles from './SpaceGallery.module.css';

export function SpaceGallery() {
  const images = getGalleryImages();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle scroll to update active index
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.7)); // Adjusted for slide width
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const slideWidth = scrollRef.current.scrollWidth / images.length;
    scrollRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const next = () => scrollTo((activeIndex + 1) % images.length);
  const prev = () => scrollTo((activeIndex - 1 + images.length) % images.length);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const nextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const prevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

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
  }, [lightboxIndex]);

  return (
    <section 
      id="gallery" 
      className={styles.section}
      aria-labelledby="gallery-heading"
    >
      <Container size="wide">
        <header className={styles.header}>
          <p className={styles.label}>
            The Space
          </p>
          <h2 id="gallery-heading" className={styles.heading}>
            A Place of Quiet Inspiration
          </h2>
        </header>

        <div className={styles.carouselContainer}>
          <div 
            className={styles.viewport} 
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {images.map((image, idx) => (
              <figure 
                key={image.id} 
                className={cn(styles.slide, activeIndex === idx && styles.active)}
                onClick={() => openLightbox(idx)}
                style={{ cursor: 'zoom-in' }}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                {image.caption && (
                  <figcaption className={styles.caption}>
                    <span className={styles.captionText}>{image.caption}</span>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          <div className={styles.controls}>
            <button 
              onClick={prev} 
              className={styles.arrow} 
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <div className={styles.indicators}>
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={cn(styles.dot, activeIndex === idx && styles.dotActive)}
                  onClick={() => scrollTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={next} 
              className={styles.arrow} 
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Lightbox / Modal */}
      {lightboxIndex !== null && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button className={styles.closeButton} onClick={closeLightbox} aria-label="Close lightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className={styles.lightboxContent}>
            <button className={cn(styles.lightboxArrow, styles.arrowPrev)} onClick={prevLightbox} aria-label="Previous image">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <div className={styles.lightboxImageWrapper}>
              <OptimizedImage
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className={styles.lightboxImage}
                sizes="100vw"
                priority
              />
            </div>

            <div className={styles.lightboxFooter}>
              <p className={styles.lightboxCaption}>{images[lightboxIndex].caption}</p>
              <p className={styles.lightboxCounter}>{lightboxIndex + 1} / {images.length}</p>
            </div>

            <button className={cn(styles.lightboxArrow, styles.arrowNext)} onClick={nextLightbox} aria-label="Next image">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
