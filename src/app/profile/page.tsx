import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './profile.module.css';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, GraduationCap, Link as LinkIcon, Instagram, Twitter, ExternalLink, ShoppingBag } from 'lucide-react';

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
            <div className={`${styles.profile} animate-fade-in`}>
                <div className="container">
                    <div className={styles.profileWrapper}>
                        <aside className={`${styles.sidebar} animate-slide-up stagger-1`}>
                            <div className={styles.profileCard}>
                                <div className={styles.avatarLarge}>
                                    {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                                    <h1 className={styles.name}>{profile?.full_name || 'Scholar'}</h1>
                                    <Sparkles size={20} className="text-secondary" />
                                </div>
                                <p className={styles.deptInfo}>{profile?.department || 'Nigerian Student'}</p>
                                <p className={styles.bio}>
                                    {profile?.bio || 'Proud student of Veritas University. Connect with me for collaborations and study groups!'}
                                </p>
                                <Link href="/profile/edit" style={{ width: '100%' }}>
                                    <Button variant="outline" style={{ width: '100%' }}>Edit Professional Profile</Button>
                                </Link>
                            </div>
                        </aside>

                        <main className={styles.mainSection}>
                            <div className={`${styles.contentCard} animate-slide-up stagger-2`}>
                                <h2 className={styles.cardTitle}>
                                    <LinkIcon size={24} className="text-secondary" />
                                    Digital Hub
                                </h2>
                                <div className={styles.linkItem}>
                                    <div style={{ padding: '0.75rem', background: 'hsla(142, 70%, 38%, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--secondary)' }}>
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div className={styles.linkInfo}>
                                        <h4 style={{ fontFamily: 'var(--font-display)' }}>{profile?.full_name?.split(' ')[0] || 'My'} Store</h4>
                                        <p>{profile?.loops_shop_url ? 'Verified Loops Link' : 'No Loops store connected yet'}</p>
                                    </div>
                                    <ExternalLink size={18} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                </div>
                                
                                <div className={styles.linkItem}>
                                    <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
                                        <Mail size={20} />
                                    </div>
                                    <div className={styles.linkInfo}>
                                        <h4 style={{ fontFamily: 'var(--font-display)' }}>Institutional Email</h4>
                                        <p style={{ fontWeight: 500 }}>{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.contentCard} animate-slide-up stagger-3`}>
                                <h2 className={styles.cardTitle}>
                                    <GraduationCap size={24} className="text-secondary" />
                                    Academic Snapshot
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div style={{ padding: '2rem', background: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', textAlign: 'center' }}>
                                        <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Level</h4>
                                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--secondary)', fontFamily: 'var(--font-display)' }}>{profile?.level || '100L'}</span>
                                    </div>
                                    <div style={{ padding: '2rem', background: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)', textAlign: 'center' }}>
                                        <h4 style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Matriculation</h4>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.02em' }}>{profile?.matric_number || 'Pending'}</span>
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
