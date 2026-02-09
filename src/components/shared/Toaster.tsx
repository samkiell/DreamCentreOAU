'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="bottom-left"
      toastOptions={{
        style: {
          background: 'var(--color-white)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-strong)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-sm)',
          fontFamily: 'var(--font-ui)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--space-4) var(--space-6)',
        },
        success: {
          iconTheme: {
            primary: 'var(--color-earth)',
            secondary: 'var(--color-white)',
          },
        },
        error: {
          iconTheme: {
            primary: '#e11d48',
            secondary: 'var(--color-white)',
          },
        },
      }}
    />
  );
}
