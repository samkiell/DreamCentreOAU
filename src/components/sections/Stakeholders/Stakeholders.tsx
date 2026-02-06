/**
 * Stakeholders Section — Dream Centre
 * Refined institutional presentation with calm orbiting motion
 */

'use client';

import { motion } from 'framer-motion';
import { Container, OptimizedImage } from '@/components/ui';
import { SectionReveal } from '@/components/shared';
import { getStakeholders } from '@/lib/content';
import { clsx } from 'clsx';
import styles from './Stakeholders.module.css';

export function Stakeholders() {
  const stakeholders = getStakeholders();
  
  // Duplicate list for seamless infinite marquee loop
  const marqueeItems = [...stakeholders, ...stakeholders];

  return (
    <section 
      id="stakeholders" 
      className={styles.section}
      aria-labelledby="stakeholders-heading"
    >
      <Container>
        <SectionReveal>
          <header className={styles.header}>
            <p className={styles.label}>Partnership & Legacy</p>
            <h2 id="stakeholders-heading" className={styles.heading}>
              Our Guiding Figures
            </h2>
          </header>
        </SectionReveal>

        {/* Orbiting Track */}
        <div className={styles.orbitContainer}>
          <motion.div 
            className={styles.orbitTrack}
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 40, // Very slow "walking pace"
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {marqueeItems.map((stakeholder, index) => (
              <article key={`${stakeholder.id}-${index}`} className={clsx(styles.card, styles.orbitItem)}>
                <div className={clsx(styles.imageWrapper, 'hover-glow')}>
                  <OptimizedImage
                    src={stakeholder.image.src}
                    alt={stakeholder.image.alt}
                    fill
                    className={styles.image}
                    sizes="180px"
                    style={{ objectPosition: stakeholder.image.position || 'center center' }}
                  />
                </div>
                <h3 className={styles.name}>{stakeholder.name}</h3>
                <p className={styles.title}>{stakeholder.title}</p>
              </article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
