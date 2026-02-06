/**
 * Hero Section — Dream Centre
 * Restrained carousel with inauguration series and elegant typography
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHeroContent } from '@/lib/content';
import { OptimizedImage } from '@/components/ui';
import { MaskReveal, SectionReveal } from '@/components/shared';
import styles from './Hero.module.css';

export function Hero() {
  const content = getHeroContent();
  const [currentImage, setCurrentImage] = useState(0);

  // Slow, restrained carousel transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % content.images.length);
    }, 8000); // 8 seconds for a calm pace
    return () => clearInterval(timer);
  }, [content.images.length]);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Background Carousel */}
      <div className={styles.background}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className={styles.carouselWrapper}
          >
            <OptimizedImage
              src={content.images[currentImage].src}
              alt={content.images[currentImage].alt}
              fill
              priority
              className={styles.backgroundImage}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {content.tagline && (
          <SectionReveal delay={0.5} yOffset={10}>
            <p className={styles.tagline}>{content.tagline}</p>
          </SectionReveal>
        )}
        
        <MaskReveal delay={0.2}>
          <h1 id="hero-heading" className={styles.heading}>
            {content.heading}
          </h1>
        </MaskReveal>
        
        {content.subheading && (
          <SectionReveal delay={0.8} yOffset={20}>
            <div className={styles.subheadingList}>
              {content.subheading.split('•').map((item, index) => (
                <span key={index} className={styles.subheadingItem}>
                  {item.trim()}
                </span>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>

      {/* Scroll Indicator */}
      <SectionReveal delay={1.5} yOffset={0} duration={2}>
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </SectionReveal>
    </section>
  );
}
