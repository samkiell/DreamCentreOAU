/**
 * Header Component — Dream Centre
 * Minimal, elegant header with scroll-triggered styling and mobile hamburger menu
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useScrolledPast } from '@/hooks';
import { Container } from '@/components/ui';
import styles from './Header.module.css';

const navLinks = [
  { href: '/#philosophy', label: 'Philosophy' },
  { href: '/#features', label: 'Programs' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/login', label: 'Login' },
];

export function Header() {
  const isScrolled = useScrolledPast(50);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside or on a link
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={cn(styles.header, isScrolled && styles.scrolled)}>
      <Container>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/assets/logo_nobg.png" 
              alt="Dream Centre Logo" 
              width={450} 
              height={120}
              className={styles.logoImage}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={cn(
                    styles.navLink, 
                    isActive && styles.navLinkHighlight
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className={cn(styles.hamburger, isMenuOpen && styles.hamburgerOpen)}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <div className={cn(styles.mobileMenu, isMenuOpen && styles.mobileMenuOpen)}>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  styles.mobileNavLink, 
                  isActive && styles.navLinkHighlight
                )}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
