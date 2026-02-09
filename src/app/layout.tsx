/**
 * Root Layout — Dream Centre
 * Establishes fonts, metadata, and global structure
 */

import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import { generateSiteMetadata } from '@/lib/metadata';
import { Header, Footer } from '@/components/layout';
import { SkipLink, JsonLd } from '@/components/shared';
import './globals.css';

export const metadata: Metadata = generateSiteMetadata();

import { Toaster } from '@/components/shared/Toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontVariables}>
        <JsonLd />
        <SkipLink />
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
