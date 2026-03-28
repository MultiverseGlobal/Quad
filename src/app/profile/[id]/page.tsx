import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from '../profile.module.css';
import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { 
    Mail, 
    GraduationCap, 
    Link as LinkIcon, 
    Instagram, 
    Twitter, 
    ExternalLink, 
    Sparkles,
    ArrowLeft,
    UserPlus,
    MessageSquare,
    ShoppingBag
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';

export default async function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    
    // Check if it's the current user's own profile
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (currentUser?.id === id) {
        return redirect('/profile');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (!profile) {
        notFound();
    }

    return (
        <>
            <Navbar />
      <div className={styles.profile}>
        <div className="container">
          <Link href="/network" className={`${styles.backLink} page-transition`}>
            <ArrowLeft size={18} />
            Back to Network
          </Link>

          <div className={styles.profileWrapper}>
            <aside className={styles.sidebar}>
              <div className={styles.profileCard}>
                <Avatar 
                  name={profile.full_name} 
                  size="xl" 
                />
                <h1 className={styles.name}>{profile.full_name}</h1>
                <p className={styles.deptInfo}>{profile.department || 'Veritas Scholar'}</p>
                <p className={styles.bio}>
                  {profile.bio || 'Building my future on Quad. Connect with me for collaborations!'}
                </p>
                
                <div className={styles.buttonGroup}>
                  <Button style={{ flex: 1 }} variant="primary" size="large">
                    <UserPlus size={18} fill="currentColor" />
                    Connect
                  </Button>
                  <Button variant="outline" style={{ flex: 1 }} size="large">
                    <MessageSquare size={18} />
                    Brief
                  </Button>
                </div>
              </div>
            </aside>

            <main className={styles.mainSection}>
              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>
                  <GraduationCap size={20} />
                  Academic Profile
                </h2>
                <div className={styles.snapGrid}>
                  <div className={styles.statTile}>
                    <h4 className={styles.statLabel}>Standing</h4>
                    <span className={styles.statValue}>{profile.level || '100L'}</span>
                  </div>
                  <div className={styles.statTile}>
                    <h4 className={styles.statLabel}>Email</h4>
                    <span className={styles.matricValue}>{profile.email || 'Verified'}</span>
                  </div>
                  <div className={styles.statTile}>
                    <h4 className={styles.statLabel}>University</h4>
                    <span className={styles.matricValue}>Veritas Uni</span>
                  </div>
                </div>
              </div>

              <div className={styles.contentCard}>
                <h2 className={styles.cardTitle}>
                  <Sparkles size={20} />
                  Social Loops
                </h2>
                <div className={styles.linkList}>
                  {profile.loops_shop_url && (
                    <Link href={profile.loops_shop_url} className={styles.linkItem}>
                      <ShoppingBag size={22} />
                      <div className={styles.linkInfo}>
                        <h4>Marketplace</h4>
                        <p>Browse Scholar Shop</p>
                      </div>
                      <ExternalLink size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                    </Link>
                  )}
                  <div className={styles.linkItem}>
                    <Instagram size={22} />
                    <div className={styles.linkInfo}>
                      <h4>Instagram</h4>
                      <p>@scholar_pulse</p>
                    </div>
                  </div>
                  <div className={styles.linkItem}>
                    <Twitter size={22} />
                    <div className={styles.linkInfo}>
                      <h4>Twitter / X</h4>
                      <p>@veritas_quad</p>
                    </div>
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
