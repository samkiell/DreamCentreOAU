/**
 * useScrollPosition Hook — Dream Centre
 * Track scroll position for header effects and animations
 */

'use client';

import { useEffect, useState } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
  isAtTop: boolean;
}

/**
 * Returns the current scroll position and direction
 */
export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isAtTop: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const direction = currentY > lastY ? 'down' : currentY < lastY ? 'up' : null;
          
          setScrollPosition({
            x: window.scrollX,
            y: currentY,
            direction,
            isAtTop: currentY < 10,
          });
          
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

/**
 * Simple hook to check if page has scrolled past a threshold
 */
export function useScrolledPast(threshold: number = 100): boolean {
  const { y } = useScrollPosition();
  return y > threshold;
}
