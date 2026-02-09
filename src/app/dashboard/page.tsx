'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/lib/fetcher';
import { Container } from '@/components/ui';
import { User, IdentificationCard, ShieldCheck, Clock, MapPin, Mail, LogOut } from 'lucide-react';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR('/api/user/profile', fetcher);
  const router = useRouter();

  const handleLogout = async () => {
    // Basic logout logic - in a real app, you'd call an API to clear the cookie
    document.cookie = 'dc_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
    router.refresh();
  };

  if (isLoading) return <div className={styles.loading}>Loading Dashboard...</div>;
  if (error) {
    router.push('/login');
    return null;
  }

  const { user } = data;

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.header}>
          <div className={styles.welcome}>
            <h1>Shalom, {user.firstName}</h1>
            <p>Welcome to your Dream Centre leadership hub.</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        <div className={styles.grid}>
          {/* Main ID Card */}
          <div className={`${styles.card} ${styles.idCard}`}>
            <div className={styles.cardHeader}>
              <IdentificationCard size={24} className={styles.cardIcon} />
              <span>Institutional Identity</span>
            </div>
            
            {user.status === 'ACTIVE' ? (
              <div className={styles.idContent}>
                <div className={styles.dcIdLabel}>DreamCenter ID</div>
                <div className={styles.dcIdValue}>{user.studentId}</div>
                <div className={styles.idBadge}>
                  <ShieldCheck size={14} /> Official Member
                </div>
              </div>
            ) : (
              <div className={styles.pendingId}>
                <Clock size={40} className={styles.pendingIcon} />
                <h3>ID Generation Pending</h3>
                <p>An administrator is currently reviewing your profile. You will receive your official ID once approved.</p>
              </div>
            )}
          </div>

          {/* Academic Profile */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <User size={24} className={styles.cardIcon} />
              <span>Academic Profile</span>
            </div>
            <div className={styles.profileList}>
              <div className={styles.profileItem}>
                <span className={styles.label}>Full Name</span>
                <span className={styles.value}>{user.firstName} {user.lastName}</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Matric Number</span>
                <span className={styles.value}>{user.matricNumber}</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Faculty</span>
                <span className={styles.value}>{user.faculty}</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Department</span>
                <span className={styles.value}>{user.departmentCode}</span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Mail size={24} className={styles.cardIcon} />
              <span>Contact Information</span>
            </div>
            <div className={styles.profileList}>
              <div className={styles.profileItem}>
                <span className={styles.label}>OAU Email</span>
                <span className={styles.value}>{user.email}</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Username</span>
                <span className={styles.value}>{user.username}</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Phone</span>
                <span className={styles.value}>{user.phoneNumber || 'Not provided'}</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>Status</span>
                <span className={`${styles.status} ${styles[user.status.toLowerCase()]}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
