'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Upload, User as UserIcon, Camera } from 'lucide-react';
import { Container } from '@/components/ui';
import { fetcher } from '@/lib/fetcher';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    sex: '',
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const filteredDepartments = data?.departments?.filter(
    (d: any) => d.facultyId === formData.facultyId
  ) || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'facultyId') {
      setFormData(prev => ({ ...prev, deptId: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sex) {
      toast.error('Please select your sex');
      return;
    }
    
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          profileImage: profilePreview
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      toast.success('Registration successful! Credential generated.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div className={styles.errorState}>Failed to load metadata</div>;
  if (!data) return <div className={styles.loadingState}>Preparing digital portal...</div>;

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.card}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Digital Credentialing</h1>
            <p className={styles.subtitle}>Begin your institutional membership journey</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Profile Picture Upload UX */}
            <div className={styles.profileUploadSection}>
              <div 
                className={styles.profilePreview} 
                onClick={() => fileInputRef.current?.click()}
              >
                {profilePreview ? (
                  <img src={profilePreview} alt="Preview" className={styles.previewImage} />
                ) : (
                  <div className={styles.placeholderIcon}>
                    <Camera size={28} />
                    <span>Upload Photo</span>
                  </div>
                )}
                <div className={styles.uploadOverlay}>
                  <Upload size={16} />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className={styles.hiddenInput} 
              />
              <p className={styles.uploadHint}>Required for your Institutional ID Card</p>
            </div>

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

            <div className={styles.row}>
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
              <div className={styles.group}>
                <label htmlFor="sex">Sex</label>
                <select id="sex" name="sex" required value={formData.sex} onChange={handleChange}>
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
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
                <select id="facultyId" name="facultyId" required value={formData.facultyId} onChange={handleChange}>
                  <option value="">Select Faculty</option>
                  {data.faculties.map((f: any) => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.group}>
                <label htmlFor="deptId">Department</label>
                <select id="deptId" name="deptId" required value={formData.deptId} onChange={handleChange} disabled={!formData.facultyId}>
                  <option value="">Select Department</option>
                  {filteredDepartments.map((d: any) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.group}>
              <label htmlFor="password">Security Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? 'Generating Credential...' : 'Create Institutional Account'}
            </button>

            <div className={styles.footer}>
              Already a member? <span onClick={() => router.push('/login')}>Sign In</span>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
