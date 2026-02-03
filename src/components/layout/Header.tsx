/**
 * Header Component — Dream Centre
 * Minimal, elegant header with scroll-triggered styling
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useScrolledPast } from '@/hooks';
import { Container } from '@/components/ui';
import styles from './Header.module.css';

const navLinks = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#features', label: 'Programs' },
  { href: '#stakeholders', label: 'Leadership' },
  { href: '#gallery', label: 'The Space' },
  { href: '#contact', label: 'Visit' },
];

export function Header() {
  const isScrolled = useScrolledPast(50);

  return (
    <header className={cn(styles.header, isScrolled && styles.scrolled)}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            Dream Centre
            <span className={styles.logoAccent}>at Obafemi Awolowo University</span>
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
