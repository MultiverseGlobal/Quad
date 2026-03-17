import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';
import { signup } from '../actions';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const { error } = await searchParams;
    return (
        <div className={styles.authWrapper}>
            <div className={`${styles.card} animate-slide-up`} style={{ maxWidth: '580px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div style={{ padding: '1rem', background: 'var(--secondary-glow)', borderRadius: 'var(--radius-xl)', color: 'var(--secondary)', boxShadow: '0 8px 20px -4px var(--secondary-glow)' }}>
                        <ShieldCheck size={40} />
                    </div>
                </div>

                <h1 className={styles.title}>Join the Quad</h1>
                <p className={styles.subtitle}>Initialize your professional student profile</p>

                {error && <div className={styles.error}>{error}</div>}

                <form className={styles.form} action={signup}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className={styles.field}>
                            <label className={styles.label}>Full Name</label>
                            <input name="fullName" type="text" className={styles.input} placeholder="Zahra Musa" required />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Matric Number</label>
                            <input name="matricNumber" type="text" className={styles.input} placeholder="VUA/CSC/20/..." required />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>University Department</label>
                        <div style={{ position: 'relative' }}>
                            <select name="department" className={styles.input} required style={{ appearance: 'none', paddingRight: '3rem' }}>
                                <option value="">Select your academic major</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Economics">Economics</option>
                                <option value="Law">Law</option>
                                <option value="Mass Communication">Mass Communication</option>
                            </select>
                            <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }}>
                                <GraduationCap size={18} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Institutional Email</label>
                        <input name="email" type="email" className={styles.input} placeholder="name@veritas.edu.ng" required />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Professional Password</label>
                        <input name="password" type="password" className={styles.input} placeholder="••••••••" required />
                    </div>

                    <Button type="submit" size="large" style={{ marginTop: '1.5rem', width: '100%' }}>
                        Initialize Scholar Profile
                    </Button>
                </form>

                <div className={styles.footer}>
                    Already have a profile? <Link href="/auth/login" className={styles.link}>Sign In to Workspace</Link>
                </div>
            </div>
        </div>
    );
}
