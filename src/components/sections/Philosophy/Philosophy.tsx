/**
 * Philosophy Section — Dream Centre
 * Core philosophy and ethos of the centre
 */

import { Container } from '@/components/ui';
import { getPhilosophy } from '@/lib/content';
import styles from './Philosophy.module.css';

export function Philosophy() {
  const content = getPhilosophy();

  return (
    <section 
      id="philosophy" 
      className={styles.section}
      aria-labelledby="philosophy-heading"
    >
      <Container>
        <div className={styles.inner}>
          <header className={styles.header}>
            <p className={styles.label}>Our Philosophy</p>
            <h2 id="philosophy-heading" className={styles.heading}>
              {content.heading}
            </h2>
            {content.subheading && (
              <p className={styles.subheading}>{content.subheading}</p>
            )}
          </header>

          <div className={styles.body}>
            {content.body.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            {content.pullQuote && (
              <blockquote className={styles.pullQuote}>
                "{content.pullQuote.text}"
                {content.pullQuote.attribution && (
                  <cite className={styles.attribution}>
                    — {content.pullQuote.attribution}
                  </cite>
                )}
              </blockquote>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
