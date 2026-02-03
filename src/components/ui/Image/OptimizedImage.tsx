/**
 * OptimizedImage Component — Dream Centre
 * Wrapper around next/image with sensible defaults
 */

import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import type { OptimizedImageProps } from '@/types/components';

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  fill = false,
  className,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  // Default sizes if not provided
  const defaultSizes = fill
    ? '100vw'
    : `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`;

  return (
    <NextImage
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      quality={quality}
      sizes={sizes || defaultSizes}
      placeholder={blurDataURL ? 'blur' : placeholder}
      blurDataURL={blurDataURL}
      className={cn(className)}
      {...props}
    />
  );
}
