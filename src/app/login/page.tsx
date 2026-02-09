'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Container } from '@/components/ui';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Login failed');
      }

      toast.success('Welcome back!');
      router.push('/dashboard');
      router.refresh(); // Update the navbar/middleware state
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Enter your credentials to access your dashboard</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.group}>
              <label htmlFor="identifier">Email / Username</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                required
                value={formData.identifier}
                onChange={handleChange}
                placeholder="yours@oauife.edu.ng"
              />
            </div>

            <div className={styles.group}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className={styles.footer}>
              Don't have an account? <span onClick={() => router.push('/register')}>Register</span>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
