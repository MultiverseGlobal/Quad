import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';
import { Mail, ArrowRight } from 'lucide-react';

export default function VerifyEmailPage() {
    return (
        <div className={styles.authWrapper}>
            <div className={styles.card} style={{ textAlign: 'center', maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div className="animate-pulse-soft" style={{ padding: '1.25rem', background: 'var(--primary-glow)', borderRadius: '100%', color: 'var(--primary)' }}>
                        <Mail size={48} strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className={styles.title} style={{ fontSize: '2.25rem' }}>Check Your Inbox</h1>
                <p className={styles.subtitle} style={{ marginBottom: '2.5rem' }}>
                    We've sent a verification link to your institutional email. Please click it to activate your Quad account.
                </p>

                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginBottom: '2.5rem', textAlign: 'left' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Next Steps:</h4>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem' }}>
                        <li>Check your Veritas University email.</li>
                        <li>Click the "Confirm your email" button.</li>
                        <li>You'll be redirected back to complete your onboarding.</li>
                    </ul>
                </div>

                <Link href="/auth/login" style={{ width: '100%' }}>
                    <Button variant="ghost" style={{ width: '100%', border: '1px solid var(--surface-border)' }}>
                        Back to Sign In
                    </Button>
                </Link>

                <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Didn't receive an email? <button style={{ color: 'var(--secondary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Resend Magic Link</button>
                </p>
            </div>
        </div>
    );
}
