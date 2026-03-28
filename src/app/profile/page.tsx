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
                                    style={{ margin: '0 auto 1.5rem' }}
                                />
                                <h1 className={styles.name}>{profile?.full_name || 'Scholar'}</h1>
                                <p className={styles.deptInfo}>{profile?.department || 'Nigerian Student'}</p>
                                <p className={styles.bio}>
                                    {profile?.bio || 'Proud student of Veritas University. Connect with me for collaborations and study groups!'}
                                </p>
                                <Link href="/profile/edit" style={{ width: '100%', textDecoration: 'none' }}>
                                    <Button variant="outline" style={{ width: '100%' }}>Edit Professional Profile</Button>
                                </Link>
                            </div>
                        </aside>

                        <main className={styles.mainSection}>
                            <div className={styles.contentCard}>
                                <h2 className={styles.cardTitle}>
                                    <LinkIcon size={18} />
                                    Digital Hub
                                </h2>
                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                    <div className={styles.linkItem}>
                                        <ShoppingBag size={18} />
                                        <div className={styles.linkInfo}>
                                            <h4>Entrepreneurial Store</h4>
                                            <p>{profile?.loops_shop_url ? 'Verified Loops Link' : 'No Loops store connected yet'}</p>
                                        </div>
                                        <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                    </div>
                                    
                                    <div className={styles.linkItem}>
                                        <Mail size={18} />
                                        <div className={styles.linkInfo}>
                                            <h4>Institutional Email</h4>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.contentCard}>
                                <h2 className={styles.cardTitle}>
                                    <GraduationCap size={18} />
                                    Academic Snapshot
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                                    <div style={{ padding: '1.25rem', background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', textAlign: 'center' }}>
                                        <h4 style={{ fontWeight: 800, color: 'var(--muted)', marginBottom: '0.5rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Level</h4>
                                        <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)' }}>{profile?.level || '100L'}</span>
                                    </div>
                                    <div style={{ padding: '1.25rem', background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', textAlign: 'center' }}>
                                        <h4 style={{ fontWeight: 800, color: 'var(--muted)', marginBottom: '0.5rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Matriculation</h4>
                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)' }}>{profile?.matric_number || 'Pending'}</span>
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
