'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="bottom-left"
      toastOptions={{
        style: {
          background: 'var(--color-background-elevated)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)',
        },
        success: {
          iconTheme: {
            primary: 'var(--color-primary)',
            secondary: 'var(--color-white)',
          },
        },
      }}
    />
  );
}
