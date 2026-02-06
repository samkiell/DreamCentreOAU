/**
 * Hero Section — Dream Centre
 * Full-viewport hero with elegant typography and subtle background
 */

import { getHeroContent } from '@/lib/content';
import { OptimizedImage } from '@/components/ui';
import { MaskReveal, SectionReveal, BreathingParallax } from '@/components/shared';
import styles from './Hero.module.css';

export function Hero() {
  const content = getHeroContent();

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Background Image with Breathing Parallax */}
      <div className={styles.background}>
        <BreathingParallax>
          <OptimizedImage
            src={content.image.src}
            alt=""
            fill
            priority
            className={styles.backgroundImage}
            sizes="100vw"
          />
        </BreathingParallax>
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      {/* Content with Mask Reveal and Section Reveal */}
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

      {/* Scroll Indicator with gentle fade */}
      <SectionReveal delay={1.5} yOffset={0} duration={2}>
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </SectionReveal>
    </section>
  );
}
