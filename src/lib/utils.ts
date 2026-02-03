/**
 * Utility Functions — Dream Centre
 */

import { type ClassValue, clsx } from 'clsx';

/**
 * Conditionally join class names
 * Usage: cn('base', condition && 'conditional', 'always')
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\+\d{3})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
}

/**
 * Generate a mailto link
 */
export function getMailtoLink(email: string, subject?: string): string {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${params}`;
}

/**
 * Generate a tel link
 */
export function getTelLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}

/**
 * Check if we're running on the server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Delay execution (useful for staggered animations)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get the current year for copyright notices
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
