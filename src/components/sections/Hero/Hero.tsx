/**
 * Hero Section — Dream Centre
 * Full-viewport hero with elegant typography and subtle background
 */

import { getHeroContent } from '@/lib/content';
import { OptimizedImage } from '@/components/ui';
import styles from './Hero.module.css';

export function Hero() {
  const content = getHeroContent();

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Background Image */}
      <div className={styles.background}>
        <OptimizedImage
          src={content.image.src}
          alt=""
          fill
          priority
          className={styles.backgroundImage}
          sizes="100vw"
        />
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {content.tagline && (
          <p className={styles.tagline}>{content.tagline}</p>
        )}
        
        <h1 id="hero-heading" className={styles.heading}>
          {content.heading}
        </h1>
        
        {content.subheading && (
          <p className={styles.subheading}>{content.subheading}</p>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
