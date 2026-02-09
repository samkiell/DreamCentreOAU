/**
 * Hero Section — Dream Centre
 * Restrained carousel with inauguration series (images and video) and elegant typography
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getHeroContent } from '@/lib/content';
import { OptimizedImage } from '@/components/ui';
import { MaskReveal, SectionReveal } from '@/components/shared';
import styles from './Hero.module.css';

export function Hero() {
  const content = getHeroContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slow, restrained carousel transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.media.length);
    }, 10000); // 10 seconds to allow videos some time
    return () => clearInterval(timer);
  }, [content.media.length]);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Background Carousel */}
      <div className={styles.background}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className={styles.carouselWrapper}
          >
            {content.media[currentIndex].type === 'video' ? (
              <video
                src={content.media[currentIndex].src}
                autoPlay
                muted
                loop
                playsInline
                className={styles.backgroundVideo}
              />
            ) : (
              <OptimizedImage
                src={content.media[currentIndex].src}
                alt={content.media[currentIndex].alt}
                fill
                priority
                className={styles.backgroundImage}
                sizes="100vw"
              />
            )}
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

        <SectionReveal delay={1.2} yOffset={30}>
          <div className={styles.actions}>
            <Link href="/register" className={styles.ctaPrimary}>
              Register
            </Link>
            <Link href="/login" className={styles.ctaSecondary}>
              Sign In
            </Link>
          </div>
        </SectionReveal>
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
