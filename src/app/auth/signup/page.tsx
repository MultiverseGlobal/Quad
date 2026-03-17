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
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.75rem', background: 'var(--secondary-glow)', borderRadius: 'var(--radius-md)', color: 'var(--secondary)' }}>
                        <ShieldCheck size={32} />
                    </div>
                </div>

                <h1 className={styles.title}>Join the Quad</h1>
                <p className={styles.subtitle}>Create your account to join the community</p>

                {error && <div className={styles.error}>{error}</div>}

                <form className={styles.form} action={signup}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
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
                        <label className={styles.label}>Major Department</label>
                        <select name="department" className={styles.input} required style={{ appearance: 'none' }}>
                            <option value="">Select your department</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Economics">Economics</option>
                            <option value="Law">Law</option>
                            <option value="Mass Communication">Mass Communication</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Email Address</label>
                        <input name="email" type="email" className={styles.input} placeholder="name@email.com" required />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Create Password</label>
                        <input name="password" type="password" className={styles.input} placeholder="••••••••" required />
                    </div>

                    <Button type="submit" size="large" style={{ marginTop: '1rem', width: '100%' }}>
                        Initialize Profile
                    </Button>
                </form>

                <div className={styles.footer}>
                    Already a member? <Link href="/auth/login" className={styles.link}>Sign In</Link>
                </div>
            </div>
        </div>
    );
}
