/**
 * Footer Component — Dream Centre
 * Institutional footer with contact and copyright
 */

import Image from 'next/image';
import Link from 'next/link';
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
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              View on Google Maps
            </a>
          </address>

          {contact.socials && (
            <div className={styles.socials}>
              {contact.socials.instagram && (
                <a 
                  href={contact.socials.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
            </div>
          )}

          <div className={styles.bottom}>
            <span className={styles.copyright}>
              © {year} Senator Oluremi Tinubu Dream Centre. All rights reserved.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
