import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { updateProfile } from '../actions';
import styles from '../profile.module.css';
import { Sparkles } from 'lucide-react';

export default async function EditProfilePage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const params = await searchParams;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/auth/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return (
        <>
            <Navbar />
      <div className={styles.profile}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div className={`${styles.contentCard} page-transition`}>
            <h1 className={styles.cardTitle}>
              <Sparkles size={24} />
              Refine Your Intro
            </h1>
            <p className={styles.bio} style={{ marginBottom: '2.5rem' }}>
              Update your identity on the scholar network. Let the squad know who you are.
            </p>

            {params?.error && (
              <div className={styles.errorBanner}>
                {params.error}
              </div>
            )}

            <form action={updateProfile} className={styles.formArea}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input 
                  name="fullName" 
                  defaultValue={profile?.full_name} 
                  placeholder="Your Display Name" 
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Your Intro (Story)</label>
                <textarea 
                  name="bio" 
                  defaultValue={profile?.bio} 
                  placeholder="Tell the squad about your goals, vibes, and interests..." 
                  rows={4}
                  className={styles.searchInput}
                  style={{ borderRadius: 'var(--radius-xl)', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Academic Level</label>
                  <select 
                    name="level" 
                    defaultValue={profile?.level || '100L'}
                    className={styles.searchInput}
                  >
                    <option value="100L">Freshman (100L)</option>
                    <option value="200L">Sophomore (200L)</option>
                    <option value="300L">Junior (300L)</option>
                    <option value="400L">Senior (400L)</option>
                    <option value="500L">Super Senior (500L)</option>
                    <option value="Graduate">Post-Graduate Scholar</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Marketplace URL</label>
                  <input 
                    name="loops_shop_url" 
                    defaultValue={profile?.loops_shop_url} 
                    placeholder="loops.com/shop/..."
                    className={styles.searchInput}
                  />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <Button type="submit" style={{ flex: 1 }} size="large">Lock It In</Button>
                <Link href="/profile" style={{ flex: 1, textDecoration: 'none' }}>
                  <Button variant="ghost" type="button" style={{ width: '100%' }} size="large">Cancel</Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
        </>
    );
}
