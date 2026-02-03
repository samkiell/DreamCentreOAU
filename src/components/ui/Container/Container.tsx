/**
 * Container Component — Dream Centre
 * Max-width wrapper with responsive padding
 */

import { cn } from '@/lib/utils';
import type { ContainerProps, ContainerSize } from '@/types/components';
import styles from './Container.module.css';

const sizeClasses: Record<ContainerSize, string> = {
  narrow: styles.narrow,
  default: styles.default,
  wide: styles.wide,
  full: styles.full,
};

export function Container({
  children,
  size = 'default',
  as: Component = 'div',
  noPadding = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        styles.container,
        sizeClasses[size],
        noPadding && styles.noPadding,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
