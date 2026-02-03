/**
 * Contact Section — Dream Centre
 * Location and contact information
 */

import { Container } from '@/components/ui';
import { getContact } from '@/lib/content';
import { getMailtoLink, getTelLink } from '@/lib/utils';
import styles from './Contact.module.css';

export function Contact() {
  const contact = getContact();

  return (
    <section 
      id="contact" 
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className={styles.inner}>
          <h2 id="contact-heading" className={styles.heading}>
            {contact.heading || 'Visit Us'}
          </h2>

          <div className={styles.content}>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Address</span>
                <address className={`${styles.detailValue} ${styles.address}`}>
                  {contact.address.map((line, index) => (
                    <span key={index} className={styles.addressLine}>
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email</span>
                <a 
                  href={getMailtoLink(contact.email)} 
                  className={`${styles.detailValue} ${styles.link}`}
                >
                  {contact.email}
                </a>
              </div>

              {contact.phone && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Phone</span>
                  <a 
                    href={getTelLink(contact.phone)} 
                    className={`${styles.detailValue} ${styles.link}`}
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {contact.hours && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Hours</span>
                  <span className={styles.detailValue}>{contact.hours}</span>
                </div>
              )}
            </div>

            <div className={styles.mapPlaceholder}>
              <span className={styles.mapText}>Map coming soon</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
