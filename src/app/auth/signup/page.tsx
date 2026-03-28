import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';
import { signup } from '../actions';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const { error } = await searchParams;
    return (
        <div className={styles.authWrapper}>
            <div className={styles.card} style={{ maxWidth: '540px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <ShieldCheck size={32} className="text-primary" />
                </div>

                <h1 className={styles.title}>Matriculation Portal</h1>
                <p className={styles.subtitle}>Initialize your scholarship presence</p>

                {error && (
                    <div style={{ padding: '0.75rem', background: '#ff000008', color: 'var(--error)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.8rem', fontWeight: 700, border: '1px solid #ff000015' }}>
                        {error}
                    </div>
                )}

                <form className={styles.form} action={signup}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div className={styles.field}>
                            <label className={styles.label}>Full Name</label>
                            <input name="fullName" type="text" className={styles.input} placeholder="e.g. Zahra Musa" required />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Matric ID</label>
                            <input name="matricNumber" type="text" className={styles.input} placeholder="VUA/CSC/..." required />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Primary Field</label>
                        <select name="department" className={styles.input} required>
                            <option value="">Select Department</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Economics">Economics</option>
                            <option value="Law">Law</option>
                            <option value="Mass Communication">Mass Communication</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>University Email</label>
                        <input name="email" type="email" className={styles.input} placeholder="scholar@veritas.edu.ng" required />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Secure Password</label>
                        <input name="password" type="password" className={styles.input} placeholder="••••••••" required />
                    </div>

                    <Button type="submit" style={{ marginTop: '0.5rem', width: '100%' }}>
                        Initialize Enrollment
                    </Button>
                </form>

                <div className={styles.footer} style={{ fontSize: '0.8rem' }}>
                    Already enrolled? <Link href="/auth/login" className={styles.link}>Access Workspace</Link>
                </div>
            </div>
        </div>
    );
}
