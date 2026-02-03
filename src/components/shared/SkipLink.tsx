/**
 * SkipLink Component — Dream Centre
 * Accessibility: allows keyboard users to skip to main content
 */

import styles from './SkipLink.module.css';

export function SkipLink() {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
}
