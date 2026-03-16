import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';
import { login } from '../actions';
import { GraduationCap } from 'lucide-react';

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
    return (
        <div className={styles.authWrapper}>
            <div className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div style={{ padding: '1rem', background: 'var(--primary-glow)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
                        <GraduationCap size={40} />
                    </div>
                </div>
                
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to your Quad command center</p>

                {searchParams?.error && <div className={styles.error}>{searchParams.error}</div>}
                
                <form className={styles.form} action={login}>
                    <div className={styles.field}>
                        <label className={styles.label}>Institutional Email</label>
                        <input name="email" type="email" className={styles.input} placeholder="name@veritas.edu.ng" required />
                    </div>

                    <div className={styles.field}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label className={styles.label}>Password</label>
                            <Link href="#" style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>Forgot password?</Link>
                        </div>
                        <input name="password" type="password" className={styles.input} placeholder="••••••••" required />
                    </div>

                    <Button type="submit" size="large" style={{ marginTop: '1rem', width: '100%' }}>
                        Authorize Access
                    </Button>
                </form>

                <div className={styles.footer}>
                    New to the community? <Link href="/auth/signup" className={styles.link}>Get Started</Link>
                </div>
            </div>
        </div>
    );
}
