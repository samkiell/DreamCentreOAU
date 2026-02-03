/**
 * Footer Component — Dream Centre
 * Institutional footer with contact and copyright
 */

import Image from 'next/image';
import { Container } from '@/components/ui';
import { getContact } from '@/lib/content';
import { getCurrentYear, getMailtoLink } from '@/lib/utils';
import styles from './Footer.module.css';

export function Footer() {
  const contact = getContact();
  const year = getCurrentYear();

  return (
    <footer className={styles.footer}>
      <Container size="default">
        <div className={styles.inner}>
          <div className={styles.branding}>
            <span className={styles.institutionName}>
              Senator Oluremi Tinubu Dream Centre
            </span>
            <span className={styles.universityName}>
              Obafemi Awolowo University, Ile-Ife
            </span>
            <span className={styles.commissioning}>
              Commissioned 29 January 2026
            </span>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <address className={styles.contact}>
            <a
              href={getMailtoLink(contact.email)}
              className={styles.contactLink}
            >
              {contact.email}
            </a>
          </address>

          <div className={styles.bottom}>
            <span className={styles.copyright}>
              © {year} Senator Oluremi Tinubu Dream Centre. All rights reserved.
            </span>
            <a href="#accessibility" className={styles.accessibilityLink}>
              Accessibility Statement
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
