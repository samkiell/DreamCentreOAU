/**
 * Component Types — Dream Centre
 * Shared component prop type definitions
 */

import type { ReactNode, HTMLAttributes } from 'react';

/** Container size variants */
export type ContainerSize = 'narrow' | 'default' | 'wide' | 'full';

/** Container component props */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: ContainerSize;
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
  noPadding?: boolean;
}

/** Heading levels */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Heading component props */
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: ReactNode;
  as?: HeadingLevel;  // Visual level can differ from semantic level
}

/** Text size variants */
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/** Text component props */
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  size?: TextSize;
  as?: 'p' | 'span' | 'div';
  muted?: boolean;
}

/** Optimized image props */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  style?: React.CSSProperties;
}

/** Section wrapper props */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  id?: string;
  background?: 'default' | 'alt' | 'accent';
  spacing?: 'normal' | 'compact' | 'spacious';
}

/** Button variants */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/** Button component props */
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  external?: boolean;
}
