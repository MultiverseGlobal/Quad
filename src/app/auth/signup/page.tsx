import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';
import { signup } from '../actions';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const { error } = await searchParams;
    return (
        <div className={styles.authWrapper}>
      <div className={`${styles.card} page-transition`}>
        <div className={styles.iconHeader}>
          <ShieldCheck size={48} fill="currentColor" />
        </div>

        <h1 className={styles.title}>Join the Squad!</h1>
        <p className={styles.subtitle}>Verify your identity and build your pulse</p>

        {error && (
          <div className={styles.errorBanner}>
            {error}
          </div>
        )}

        <form className={styles.form} action={signup}>
          <div className={styles.inputGrid}>
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
            <label className={styles.label}>Your Department</label>
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

          <Button type="submit" variant="secondary" size="large" className={styles.submitBtn}>
            <Zap size={18} fill="currentColor" />
            Verify & Matriculate
          </Button>
        </form>

        <div className={styles.footer}>
          Already in the squad? <Link href="/auth/login" className={styles.link}>Sign In Here</Link>
        </div>
      </div>
        </div>
    );
}
