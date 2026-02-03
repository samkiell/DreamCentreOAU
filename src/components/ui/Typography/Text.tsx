/**
 * Text Component — Dream Centre
 * Body text with size and muted variants
 */

import { cn } from '@/lib/utils';
import type { TextProps, TextSize } from '@/types/components';
import styles from './Typography.module.css';

const sizeStyles: Record<TextSize, string> = {
  xs: styles.xs,
  sm: styles.sm,
  base: styles.base,
  lg: styles.lg,
  xl: styles.xl,
};

export function Text({
  children,
  size = 'base',
  as: Component = 'p',
  muted = false,
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        styles.text,
        sizeStyles[size],
        muted && styles.muted,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
