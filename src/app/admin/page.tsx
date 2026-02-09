'use client';

import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { Container } from '@/components/ui';
import { fetcher } from '@/lib/fetcher';
import { UserCheck, UserX, Search, Shield } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const { data, error, mutate } = useSWR('/api/admin/users', fetcher); // I'll need to create this API route

  const handleApprove = async (userId: string) => {
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast.success(result.message);
      mutate();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (error) return <div className={styles.error}>Failed to load admin data</div>;
  if (!data) return <div className={styles.loading}>Loading Admin Console...</div>;

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <Shield className={styles.icon} size={32} />
            <div>
              <h1>Administrative Console</h1>
              <p>Institutional oversight and member verification</p>
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Members</span>
            <span className={styles.statValue}>{data.users?.length || 0}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Awaiting Approval</span>
            <span className={styles.statValue}>
              {data.users?.filter((u: any) => u.status === 'AWAITING_APPROVAL').length || 0}
            </span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.tableHeader}>
            <h2>Pending Verified Registrations</h2>
          </div>
          
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Matric Number</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.users?.filter((u: any) => u.status === 'AWAITING_APPROVAL').map((user: any) => (
                  <tr key={user._id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td><code>{user.matricNumber}</code></td>
                    <td>{user.departmentCode}</td>
                    <td>{user.admissionYear}</td>
                    <td>
                      <button 
                        onClick={() => handleApprove(user._id)}
                        className={styles.approveBtn}
                      >
                        <UserCheck size={16} />
                        Approve & Issue ID
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.users?.filter((u: any) => u.status === 'AWAITING_APPROVAL').length === 0 && (
              <div className={styles.empty}>No pending approvals at this time.</div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
