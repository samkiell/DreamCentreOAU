'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { Container } from '@/components/ui';
import { fetcher } from '@/lib/fetcher';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const { data, error } = useSWR('/api/metadata', fetcher);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    matricNumber: '',
    facultyId: '',
    deptId: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Filter departments based on selected faculty
  const filteredDepartments = data?.departments?.filter(
    (d: any) => d.facultyId === formData.facultyId
  ) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    
    // Reset department if faculty changes
    if (name === 'facultyId') {
      setFormData(prev => ({ ...prev, deptId: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      toast.success('Registration successful! Please check your email.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>Failed to load metadata</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.card}>
          <h1 className={styles.title}>Join The Dream Centre</h1>
          <p className={styles.subtitle}>Begin your leadership journey with us</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Samuel"
                />
              </div>
              <div className={styles.group}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Ogunnaike"
                />
              </div>
            </div>

            <div className={styles.group}>
              <label htmlFor="email">OAU Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="yours@student.oauife.edu.ng"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Unique ID"
                />
              </div>
              <div className={styles.group}>
                <label htmlFor="matricNumber">Matric Number</label>
                <input
                  type="text"
                  id="matricNumber"
                  name="matricNumber"
                  required
                  value={formData.matricNumber}
                  onChange={handleChange}
                  placeholder="ABC/20XX/XXX"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.group}>
                <label htmlFor="facultyId">Faculty</label>
                <select
                  id="facultyId"
                  name="facultyId"
                  required
                  value={formData.facultyId}
                  onChange={handleChange}
                >
                  <option value="">Select Faculty</option>
                  {data.faculties.map((f: any) => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.group}>
                <label htmlFor="deptId">Department</label>
                <select
                  id="deptId"
                  name="deptId"
                  required
                  value={formData.deptId}
                  onChange={handleChange}
                  disabled={!formData.facultyId}
                >
                  <option value="">Select Department</option>
                  {filteredDepartments.map((d: any) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
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
              {isLoading ? 'Processing...' : 'Register'}
            </button>

            <div className={styles.footer}>
              Already have an account? <span onClick={() => router.push('/login')}>Sign In</span>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
