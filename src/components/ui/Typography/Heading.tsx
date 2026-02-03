import React from 'react';
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
  const visualLevel = as ?? level;

  // Use a switch to render the correct heading element
  const headingContent = (
    <span className={cn(styles.heading, levelStyles[visualLevel], className)} {...props}>
      {children}
    </span>
  );

  switch (level) {
    case 1:
      return <h1 className={cn(styles.heading, levelStyles[visualLevel], className)} {...props}>{children}</h1>;
    case 2:
      return <h2 className={cn(styles.heading, levelStyles[visualLevel], className)} {...props}>{children}</h2>;
    case 3:
      return <h3 className={cn(styles.heading, levelStyles[visualLevel], className)} {...props}>{children}</h3>;
    case 4:
      return <h4 className={cn(styles.heading, levelStyles[visualLevel], className)} {...props}>{children}</h4>;
    case 5:
      return <h5 className={cn(styles.heading, levelStyles[visualLevel], className)} {...props}>{children}</h5>;
    case 6:
      return <h6 className={cn(styles.heading, levelStyles[visualLevel], className)} {...props}>{children}</h6>;
    default:
      return <h2 className={cn(styles.heading, levelStyles[visualLevel], className)} {...props}>{children}</h2>;
  }
}

