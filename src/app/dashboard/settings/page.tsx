'use client';

import { useState, useRef } from 'react';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { Container } from '@/components/ui';
import { fetcher } from '@/lib/fetcher';
import { User, Mail, Phone, Lock, Camera, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './settings.module.css';

export default function SettingsPage() {
  const { data, error, mutate, isLoading: isFetching } = useSWR('/api/user/profile', fetcher);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const syncProfilePhoto = async (base64Image: string) => {
    setIsUploadingPhoto(true);
    const toastId = toast.loading('Uploading institutional portrait...');
    
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileImage: base64Image,
        }),
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      toast.success("Portrait updated successfully", { id: toastId });
      await mutate();
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        syncProfilePhoto(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    
    setIsUpdating(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber || undefined,
          password: formData.password || undefined,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      toast.success("Profile details updated");
      await mutate();
      setFormData({ phoneNumber: '', password: '', confirmPassword: '' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) return <div className={styles.loading}>Failed to load profile</div>;
  if (!data || isFetching) return <div className={styles.loading}>Synchronizing Account...</div>;

  const { user } = data;

  return (
    <div className={styles.wrapper}>
      <Container>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className={styles.header}>
          <h1>Profile Settings</h1>
          <p>Manage your institutional account details</p>
        </div>

        <div className={styles.grid}>
          {/* Avatar Section */}
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className={`${styles.avatar} ${isUploadingPhoto ? styles.avatarBlur : ''}`} 
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {user.firstName[0]}{user.lastName[0]}
                </div>
              )}
              
              {isUploadingPhoto && (
                <div className={styles.photoLoader}>
                  <Loader2 size={24} className={styles.spin} />
                </div>
              )}

              <button 
                type="button"
                className={styles.uploadBtn} 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
              >
                <Camera size={16} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className={styles.hiddenInput}
              />
            </div>
            <h3>{user.firstName} {user.lastName}</h3>
            <span className={styles.roleBadge}>{user.role}</span>
          </div>

          {/* Forms Section */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.sectionTitle}>Identity Details (Immutable)</div>
              <div className={styles.readonlyGrid}>
                <div className={styles.group}>
                  <label>Full Name</label>
                  <div className={styles.readonlyValue}>{user.firstName} {user.lastName}</div>
                </div>
                <div className={styles.group}>
                  <label>Institutional Email</label>
                  <div className={styles.readonlyValue}>{user.email}</div>
                </div>
                <div className={styles.group}>
                  <label>Matric Number</label>
                  <div className={styles.readonlyValue}>{user.matricNumber}</div>
                </div>
                <div className={styles.group}>
                  <label>DreamCenter ID</label>
                  <div className={styles.readonlyValue}>{user.studentId || 'DCO-PENDING'}</div>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.sectionTitle}>Contact & Security</div>
              <div className={styles.group}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <div className={styles.inputWithIcon}>
                  <Phone size={16} className={styles.inputIcon} />
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder={user.phoneNumber || "Enter phone number"}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.group}>
                  <label htmlFor="password">New Password</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={16} className={styles.inputIcon} />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.group}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className={styles.inputWithIcon}>
                    <Lock size={16} className={styles.inputIcon} />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.saveBtn} disabled={isUpdating}>
                {isUpdating ? 'Synchronizing Records...' : 'Save Profile Details'}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
