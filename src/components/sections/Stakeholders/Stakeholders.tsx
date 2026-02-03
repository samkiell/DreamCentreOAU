/**
 * Stakeholders Section — Dream Centre
 * Key figures and leadership
 */

import { Container, OptimizedImage } from '@/components/ui';
import { getStakeholders } from '@/lib/content';
import styles from './Stakeholders.module.css';

export function Stakeholders() {
  const stakeholders = getStakeholders();

  return (
    <section 
      id="stakeholders" 
      className={styles.section}
      aria-labelledby="stakeholders-heading"
    >
      <Container>
        <header className={styles.header}>
          <p className={styles.label}>Leadership</p>
          <h2 id="stakeholders-heading" className={styles.heading}>
            Our Guiding Figures
          </h2>
        </header>

        <div className={styles.grid}>
          {stakeholders.map((stakeholder) => (
            <article key={stakeholder.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <OptimizedImage
                  src={stakeholder.image.src}
                  alt={stakeholder.image.alt}
                  fill
                  className={styles.image}
                  sizes="180px"
                />
              </div>
              <h3 className={styles.name}>{stakeholder.name}</h3>
              <p className={styles.title}>{stakeholder.title}</p>
              {stakeholder.bio && (
                <p className={styles.bio}>{stakeholder.bio}</p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
