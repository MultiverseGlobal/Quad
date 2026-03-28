import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';
import { login } from '../actions';
import { Sparkles } from 'lucide-react';

export default function LoginPage({ searchParams }: { searchParams: { error?: string, message?: string } }) {
  return (
    <div className={styles.authWrapper}>
      <div className={`${styles.card} page-transition`}>
        <div className={styles.iconHeader}>
          <Sparkles size={48} fill="currentColor" />
        </div>
        
        <h1 className={styles.title}>Welcome Back!</h1>
        <p className={styles.subtitle}>Log in to join the campus pulse</p>

        {searchParams?.error && (
          <div className={styles.errorBanner}>
            {searchParams.error}
          </div>
        )}
        
        <form className={styles.form} action={login}>
          <div className={styles.field}>
            <label className={styles.label}>University Email</label>
            <input name="email" type="email" className={styles.input} placeholder="scholar@veritas.edu.ng" required />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldHeader}>
              <label className={styles.label}>Password</label>
              <Link href="#" className={styles.forgotLink}>Forgot?</Link>
            </div>
            <input name="password" type="password" className={styles.input} placeholder="••••••••" required />
          </div>

          <Button type="submit" variant="primary" size="large" className={styles.submitBtn}>
            Enter the Quad
          </Button>
        </form>

        <div className={styles.footer}>
          New to the squad? <Link href="/auth/signup" className={styles.link}>Join for Free</Link>
        </div>
      </div>
    </div>
  );
}
