import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';
import { login } from '../actions';
import { GraduationCap } from 'lucide-react';

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
    return (
        <div className={styles.authWrapper}>
            <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    <GraduationCap size={32} className="text-primary" />
                </div>
                
                <h1 className={styles.title}>Institutional Access</h1>
                <p className={styles.subtitle}>Authorize your scholarship workspace</p>

                {searchParams?.error && (
                    <div style={{ padding: '0.75rem', background: '#ff000008', color: 'var(--error)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.8rem', fontWeight: 700, border: '1px solid #ff000015' }}>
                        {searchParams.error}
                    </div>
                )}
                
                <form className={styles.form} action={login}>
                    <div className={styles.field}>
                        <label className={styles.label}>University Email</label>
                        <input name="email" type="email" className={styles.input} placeholder="scholar@veritas.edu.ng" required />
                    </div>

                    <div className={styles.field}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label className={styles.label} style={{ marginBottom: 0 }}>Access Key</label>
                            <Link href="#" style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700, textDecoration: 'none' }}>Recovery</Link>
                        </div>
                        <input name="password" type="password" className={styles.input} placeholder="••••••••" required />
                    </div>

                    <Button type="submit" style={{ marginTop: '0.5rem', width: '100%' }}>
                        Initialize Session
                    </Button>
                </form>

                <div className={styles.footer} style={{ fontSize: '0.8rem' }}>
                    New registrar? <Link href="/auth/signup" className={styles.link}>System Enrollment</Link>
                </div>
            </div>
        </div>
    );
}
