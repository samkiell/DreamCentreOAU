'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { fetcher } from '@/lib/fetcher';
import { Container } from '@/components/ui';
import { 
  User, 
  IdCard, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Mail, 
  LogOut, 
  Settings, 
  Bell, 
  ChevronRight, 
  GraduationCap, 
  Phone,
  RotateCcw,
  QrCode
} from 'lucide-react';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR('/api/user/profile', fetcher);
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);

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
            <div className={styles.idCardContainer}>
              <motion.div 
                className={styles.flipCardInner}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
              >
                {/* FRONT SIDE */}
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardHeaderLeft}>
                      <IdCard size={18} />
                      <span>Institutional Identity</span>
                    </div>
                    <ShieldCheck size={20} className={styles.verifiedIcon} />
                  </div>

                  <div className={styles.idBody}>
                    <div className={styles.photoContainer}>
                      {user.profileImage ? (
                        <img src={user.profileImage} alt="Profile" className={styles.idPhoto} />
                      ) : (
                        <div className={styles.defaultPhoto}>
                          <User size={48} />
                        </div>
                      )}
                    </div>
                    <div className={styles.mainInfo}>
                      <div className={styles.idName}>{user.firstName} {user.lastName}</div>
                      <div className={styles.idSubLabel}>{user.faculty}</div>
                      
                      <div className={styles.metadataGrid}>
                        <div className={styles.metaItem}>
                          <label>DCO ID</label>
                          <span>{user.studentId}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <label>SEX</label>
                          <span>{user.sex}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <div className={styles.footerBrand}>Senator Oluremi Tinubu Dream Centre</div>
                    <button className={styles.flipBtn} onClick={() => setIsFlipped(true)}>
                      <RotateCcw size={14} /> Flip
                    </button>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                  <div className={styles.cardHeader}>
                    <span>SECURITY CREDENTIAL</span>
                    <QrCode size={20} />
                  </div>
                  
                  <div className={styles.backBody}>
                     <div className={styles.qrPlaceholder}>
                        <div className={styles.qrInner}>
                          <QrCode size={80} />
                        </div>
                     </div>
                     <div className={styles.backDetails}>
                        <div className={styles.detailRow}>
                           <label>Matric No:</label>
                           <span>{user.matricNumber}</span>
                        </div>
                        <div className={styles.detailRow}>
                           <label>Department:</label>
                           <span>{user.departmentCode}</span>
                        </div>
                        <div className={styles.detailRow}>
                           <label>Status:</label>
                           <span className={styles.activeStatus}>ACTIVE MEMBER</span>
                        </div>
                        <div className={styles.detailRow}>
                           <label>Issued:</label>
                           <span>JANUARY 2026</span>
                        </div>
                     </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.signatureBlock}>
                       <div className={styles.signLine}></div>
                       <label>Institutional Registrar</label>
                    </div>
                    <button className={styles.flipBtn} onClick={() => setIsFlipped(false)}>
                      <RotateCcw size={14} /> Back
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className={styles.quickActions}>
               <Link href="/dashboard/settings" className={styles.quickItem}>
                  <User size={18} />
                  <span>Administrative Settings</span>
                  <ChevronRight size={16} />
               </Link>
               <div className={styles.quickItem}>
                  <GraduationCap size={18} />
                  <span>Academic Tracking</span>
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
                      <label>Full Legal Name</label>
                      <span>{user.firstName} {user.lastName}</span>
                   </div>
                </div>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><ShieldCheck size={18} /></div>
                   <div className={styles.infoData}>
                      <label>University Matriculation</label>
                      <span>{user.matricNumber}</span>
                   </div>
                </div>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><MapPin size={18} /></div>
                   <div className={styles.infoData}>
                      <label>Host Faculty</label>
                      <span>{user.faculty}</span>
                   </div>
                </div>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><GraduationCap size={18} /></div>
                   <div className={styles.infoData}>
                      <label>Departmental Code</label>
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
                      <label>Institutional Email</label>
                      <span>{user.email}</span>
                   </div>
                </div>
                <div className={styles.infoRow}>
                   <div className={styles.infoIcon}><Phone size={18} /></div>
                   <div className={styles.infoData}>
                      <label>Contact Phone</label>
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
