'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/lib/fetcher';
import { Container } from '@/components/ui';
import { User, IdCard, ShieldCheck, Clock, MapPin, Mail, LogOut, Settings, Bell, ChevronRight, GraduationCap, Phone } from 'lucide-react';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR('/api/user/profile', fetcher);
  const router = useRouter();

  const handleLogout = async () => {
    document.cookie = 'dc_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
    router.refresh();
  };

  if (isLoading) return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
      <span>Securing Session...</span>
    </div>
  );

  if (error) {
    router.push('/login');
    return null;
  }

  const { user } = data;

  return (
    <div className={styles.wrapper}>
      <Container>
        {/* Institutional Header */}
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.badge}>Institutional Portal</div>
            <h1 className={styles.greeting}>Shalom, {user.firstName}</h1>
            <p className={styles.tagline}>Senator Oluremi Tinubu Dream Centre Identity Hub</p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.notificationBell}>
              <Bell size={20} />
              <span className={styles.notifDot}></span>
            </div>
            <div className={styles.actionGroup}>
              <Link href="/dashboard/settings" className={styles.iconAction}>
                <Settings size={20} />
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <LogOut size={18} />
                <span>Exit Portal</span>
              </button>
            </div>
          </div>
        </header>

        <section className={styles.mainGrid}>
          {/* Identity Column */}
          <div className={styles.identityCol}>
            <div className={`${styles.card} ${styles.idCard} ${user.status === 'ACTIVE' ? styles.activeId : styles.pendingIdCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <IdCard size={20} />
                  <span>Leadership Identity</span>
                </div>
                {user.status === 'ACTIVE' && <ShieldCheck size={20} className={styles.verifiedIcon} />}
              </div>

              <div className={styles.idBody}>
                {user.status === 'ACTIVE' ? (
                  <div className={styles.activeDisplay}>
                    <div className={styles.photoBox}>
                       <User size={60} />
                    </div>
                    <div className={styles.activeInfo}>
                       <label>DCO Member ID</label>
                       <div className={styles.idNumber}>{user.studentId}</div>
                       <div className={styles.expiry}>Digital Credential • {new Date().getFullYear()}</div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.pendingDisplay}>
                    <div className={styles.pendingRing}>
                      <Clock size={40} />
                    </div>
                    <h3>Verification Underway</h3>
                    <p>Your institutional credentials are being cross-referenced with university records.</p>
                    <div className={styles.statusPill}>STATUS: {user.status.replace('_', ' ')}</div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.quickActions}>
               <Link href="/dashboard/settings" className={styles.quickItem}>
                  <User size={18} />
                  <span>Complete Profile</span>
                  <ChevronRight size={16} />
               </Link>
               <div className={styles.quickItem}>
                  <GraduationCap size={18} />
                  <span>Academic Verification</span>
                  <ChevronRight size={16} />
               </div>
            </div>
          </div>

          {/* Details Column */}
          <div className={styles.detailsCol}>
            <div className={styles.infoGroup}>
              <h2 className={styles.groupTitle}>Institutional Record</h2>
              <div className={styles.infoCard}>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><User size={18} /></div>
                   <div className={styles.infoData}>
                      <label>Full Name</label>
                      <span>{user.firstName} {user.lastName}</span>
                   </div>
                </div>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><ShieldCheck size={18} /></div>
                   <div className={styles.infoData}>
                      <label>Matriculation Number</label>
                      <span>{user.matricNumber}</span>
                   </div>
                </div>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><MapPin size={18} /></div>
                   <div className={styles.infoData}>
                      <label>Academic Faculty</label>
                      <span>{user.faculty}</span>
                   </div>
                </div>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><GraduationCap size={18} /></div>
                   <div className={styles.infoData}>
                      <label>Major Department</label>
                      <span>{user.departmentCode}</span>
                   </div>
                </div>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <h2 className={styles.groupTitle}>Contact Connection</h2>
              <div className={styles.infoCard}>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><Mail size={18} /></div>
                   <div className={styles.infoData}>
                      <label>University Email</label>
                      <span>{user.email}</span>
                   </div>
                </div>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><Phone size={18} /></div>
                   <div className={styles.infoData}>
                      <label>Mobile Number</label>
                      <span>{user.phoneNumber || 'Provision pending'}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
