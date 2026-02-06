'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * SectionReveal — Architectural Unveiling
 * Gentle fade-in with slight upward movement
 */
interface SectionRevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function SectionReveal({
  children,
  delay = 0,
  duration = 1.2,
  yOffset = 30,
  ...props
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom slow-out easing
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * MaskReveal — Legacy Reveal
 * Text reveal that feels like reading, using a wiping mask
 */
interface MaskRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function MaskReveal({
  children,
  delay = 0,
  duration = 1.8,
  className = '',
}: MaskRevealProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * BreathingParallax — Breathing Heritage
 * Very slow zoom/parallax for background images
 */
export function BreathingParallax({ children }: { children: ReactNode }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
