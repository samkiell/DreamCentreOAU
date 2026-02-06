/**
 * Mission Section — Dream Centre
 * Core mission statement and values
 */

import { Container } from '@/components/ui';
import { SectionReveal } from '@/components/shared';
import { getMission } from '@/lib/content';
import styles from './Mission.module.css';

export function Mission() {
  const content = getMission();

  return (
    <section 
      id="mission" 
      className={styles.section}
      aria-labelledby="mission-heading"
    >
      <Container>
        <SectionReveal>
          <div className={styles.inner}>
            <h2 id="mission-heading" className={styles.heading}>
              {content.heading}
            </h2>
            
            <p className={styles.statement}>
              {content.statement}
            </p>

            {content.values && content.values.length > 0 && (
              <div className={styles.values}>
                {content.values.map((value, index) => (
                  <article key={index} className={styles.valueCard}>
                    <h3 className={styles.valueTitle}>{value.title}</h3>
                    <p className={styles.valueDescription}>{value.description}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
