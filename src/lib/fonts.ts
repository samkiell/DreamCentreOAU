/**
 * Font Configuration — Dream Centre
 * Self-hosted fonts optimized with next/font
 */

import { Libre_Baskerville, Source_Serif_4, Inter } from 'next/font/google';

/**
 * Libre Baskerville — Heading font
 * Classical serif for institutional gravitas
 */
export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

/**
 * Source Serif 4 — Body font
 * Readable serif for prose content
 */
export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

/**
 * Inter — UI font
 * Clean sans-serif for navigation and labels
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ui',
  display: 'swap',
  preload: false, // Secondary font, load lazily
});

/**
 * Combined font variables for body class
 */
export const fontVariables = `${libreBaskerville.variable} ${sourceSerif.variable} ${inter.variable}`;
