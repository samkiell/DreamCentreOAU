/**
 * 404 Not Found Page — Dream Centre
 */

import Link from 'next/link';
import { Container, Heading, Text } from '@/components/ui';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'var(--color-canvas)',
      paddingTop: 'var(--space-16)',
    }}>
      <Container size="narrow">
        <div style={{ textAlign: 'center' }}>
          <Heading level={1} style={{ marginBottom: 'var(--space-4)' }}>
            Page Not Found
          </Heading>
          <Text size="lg" muted style={{ marginBottom: 'var(--space-8)' }}>
            The page you are looking for does not exist or has been moved.
          </Text>
          <Link 
            href="/" 
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-medium)',
              color: 'var(--color-earth)',
              textDecoration: 'none',
              padding: 'var(--space-3) var(--space-6)',
              border: '1px solid var(--color-earth)',
              borderRadius: 'var(--radius-md)',
              transition: 'all var(--transition-fast)',
            }}
          >
            Return Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
