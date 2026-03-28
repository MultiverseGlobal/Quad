import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './profile.module.css';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, GraduationCap, Link as LinkIcon, Instagram, Twitter, ExternalLink, ShoppingBag, Sparkles } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export default async function ProfilePage() {
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
        <div className="container">
          <div className={styles.profileWrapper}>
            <aside className={styles.sidebar}>
              <div className={styles.profileCard}>
                <Avatar 
                  name={profile?.full_name} 
                  size="xl" 
                />
                <h1 className={styles.name}>{profile?.full_name || 'Verified Scholar'}</h1>
                <p className={styles.deptInfo}>{profile?.department || 'Nigerian Student'}</p>
                <p className={styles.bio}>
                  {profile?.bio || 'Proud student of Veritas University. Building my intro on the squad!'}
                </p>
                <Link href="/profile/edit" style={{ width: '100%', textDecoration: 'none' }}>
                  <Button variant="primary" size="large" style={{ width: '100%' }}>
                    <Sparkles size={18} fill="currentColor" />
                    Refine Intro
                  </Button>
                </Link>
              </div>
            </aside>

            <main className={styles.mainSection}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>
                  <LinkIcon size={20} />
                  My Links
                </h2>
                <div className={styles.linkList}>
                  <Link href={profile?.loops_shop_url || '#'} className={styles.linkItem}>
                    <ShoppingBag size={22} />
                    <div className={styles.linkInfo}>
                      <h4>Campus Shop</h4>
                      <p>{profile?.loops_shop_url ? 'Browse My Marketplace' : 'No shop linked yet'}</p>
                    </div>
                    <ExternalLink size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                  </Link>
                  
                  <div className={styles.linkItem}>
                    <Mail size={22} />
                    <div className={styles.linkInfo}>
                      <h4>Institutional Contact</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>
                  <GraduationCap size={20} />
                  Academic Snapshot
                </h2>
                <div className={styles.snapGrid}>
                  <div className={styles.statTile}>
                    <h4 className={styles.statLabel}>Current Year</h4>
                    <span className={styles.statValue}>{profile?.level || '100L'}</span>
                  </div>
                  <div className={styles.statTile}>
                    <h4 className={styles.statLabel}>Matric Number</h4>
                    <span className={styles.matricValue}>{profile?.matric_number || 'Pending'}</span>
                  </div>
                  <div className={styles.statTile}>
                    <h4 className={styles.statLabel}>Squad Status</h4>
                    <span className={styles.matricValue}>Verified ✅</span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
        </>
    );
}
