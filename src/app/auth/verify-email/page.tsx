import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { resendMagicLink } from '../actions';

export default async function VerifyEmailPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ email?: string; message?: string; error?: string }> 
}) {
    const { email, message, error } = await searchParams;

    return (
        <div className={styles.authWrapper}>
            <div className={styles.card} style={{ textAlign: 'center', maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <div className="animate-pulse-soft" style={{ padding: '1.25rem', background: 'var(--primary-glow)', borderRadius: '100%', color: 'var(--primary)' }}>
                        <Mail size={48} strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className={styles.title} style={{ fontSize: '2.25rem' }}>Check Your Inbox</h1>
                
                {message && (
                    <div style={{ padding: '0.75rem', background: 'var(--success-faded)', color: 'var(--success-text)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} />
                        {message}
                    </div>
                )}

                {error && (
                    <div style={{ padding: '0.75rem', background: 'var(--error-faded)', color: 'var(--error-text)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', fontSize: '0.9rem' }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <p className={styles.subtitle} style={{ marginBottom: '2.5rem' }}>
                    We've sent a verification link to {email ? <strong>{email}</strong> : 'your institutional email'}. Please click it to activate your Quad account.
                </p>

                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginBottom: '2.5rem', textAlign: 'left' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Next Steps:</h4>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem' }}>
                        <li>Check your university email.</li>
                        <li>Click the "Confirm your email" button.</li>
                        <li>You'll be redirected back to the dashboard.</li>
                    </ul>
                </div>

                <Link href="/auth/login" style={{ width: '100%' }}>
                    <Button variant="ghost" style={{ width: '100%', border: '1px solid var(--surface-border)' }}>
                        Back to Sign In
                    </Button>
                </Link>

                <form action={resendMagicLink} style={{ marginTop: '2rem' }}>
                    <input type="hidden" name="email" value={email || ''} />
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                        Didn't receive an email? <button type="submit" style={{ color: 'var(--secondary)', fontWeight: 700, background: 'none', border: 'none', cursor: email ? 'pointer' : 'not-allowed', padding: 0 }} disabled={!email}>Resend Magic Link</button>
                    </p>
                </form>
            </div>
        </div>
    );
}
