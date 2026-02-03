/**
 * Heading Component — Dream Centre
 * Semantic heading with visual level control
 */

import { cn } from '@/lib/utils';
import type { HeadingProps, HeadingLevel } from '@/types/components';
import styles from './Typography.module.css';

const levelStyles: Record<HeadingLevel, string> = {
  1: styles.h1,
  2: styles.h2,
  3: styles.h3,
  4: styles.h4,
  5: styles.h5,
  6: styles.h6,
};

export function Heading({
  level,
  as,
  children,
  className,
  ...props
}: HeadingProps) {
  // Semantic level is 'level', visual level is 'as' (defaults to 'level')
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const visualLevel = as ?? level;

  return (
    <Component
      className={cn(styles.heading, levelStyles[visualLevel], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
