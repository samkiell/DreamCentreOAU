/**
 * Stakeholders Section — Dream Centre
 * Refined institutional presentation with interactive orbiting motion
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { Container, OptimizedImage } from '@/components/ui';
import { SectionReveal } from '@/components/shared';
import { getStakeholders } from '@/lib/content';
import { clsx } from 'clsx';
import styles from './Stakeholders.module.css';

export function Stakeholders() {
  const stakeholders = getStakeholders();
  
  // Duplicate list thrice to ensure enough overflow for swiping in both directions
  const marqueeItems = [...stakeholders, ...stakeholders, ...stakeholders];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Constants for motion
  const baseVelocity = -0.5; // slow leftward drift
  
  useAnimationFrame((t, delta) => {
    if (isDragging) return;

    let moveBy = baseVelocity * (delta / 16); // Normalise to ~60fps
    let currentX = x.get() + moveBy;

    // Wrap around logic
    // We want to keep the track within the center of the triplet
    const trackWidth = trackRef.current?.offsetWidth || 0;
    const itemWidth = trackWidth / 3;

    if (currentX <= -itemWidth * 2) {
      currentX += itemWidth;
    } else if (currentX >= 0) {
      currentX -= itemWidth;
    }

    x.set(currentX);
  });

  // Handle manual wrapping during drag to prevent hitting edges
  const handleDrag = () => {
    const trackWidth = trackRef.current?.offsetWidth || 0;
    const itemWidth = trackWidth / 3;
    let currentX = x.get();

    if (currentX <= -itemWidth * 2) {
      x.set(currentX + itemWidth);
    } else if (currentX >= -itemWidth * 0.5) {
      x.set(currentX - itemWidth);
    }
  };

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
        <div className={styles.orbitContainer} ref={containerRef}>
          <motion.div 
            ref={trackRef}
            className={styles.orbitTrack}
            style={{ x }}
            drag="x"
            dragConstraints={containerRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onDrag={handleDrag}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {marqueeItems.map((stakeholder, index) => (
              <article 
                key={`${stakeholder.id}-${index}`} 
                className={clsx(styles.card, styles.orbitItem)}
              >
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
