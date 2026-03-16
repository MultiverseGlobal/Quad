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
            <div className={styles.profile}>
                <div className="container">
                    <div className={styles.profileWrapper}>
                        <aside className={styles.sidebar}>
                            <div className={styles.profileCard}>
                                <div className={styles.avatarLarge}>
                                    {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                                </div>
                                <h1 className={styles.name}>{profile?.full_name || 'Scholar'}</h1>
                                <p className={styles.deptInfo}>{profile?.department || 'Nigerian Student'}</p>
                                <p className={styles.bio}>
                                    {profile?.bio || 'Proud student of Veritas University. Connect with me for collaborations and study groups!'}
                                </p>
                                <Link href="/profile/edit" style={{ width: '100%' }}>
                                    <Button style={{ width: '100%' }}>Edit Profile</Button>
                                </Link>
                            </div>
                        </aside>

                        <main className={styles.mainSection}>
                            <div className={styles.contentCard}>
                                <h2 className={styles.cardTitle}>
                                    <LinkIcon size={24} className="text-secondary" />
                                    Digital Hub
                                </h2>
                                <div className={styles.linkItem}>
                                    <div style={{ padding: '0.75rem', background: '#FF45001a', borderRadius: 'var(--radius-sm)', color: '#FF4500' }}>
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div className={styles.linkInfo}>
                                        <h4>{profile?.full_name?.split(' ')[0] || 'My'} Store</h4>
                                        <p>{profile?.loops_shop_url ? 'Verified Loops Link' : 'No Loops store connected yet'}</p>
                                    </div>
                                    <ExternalLink size={18} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                </div>
                                
                                <div className={styles.linkItem}>
                                    <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', borderRadius: 'var(--radius-sm)', color: 'var(--primary)' }}>
                                        <Mail size={20} />
                                    </div>
                                    <div className={styles.linkInfo}>
                                        <h4>Institutional Email</h4>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.contentCard}>
                                <h2 className={styles.cardTitle}>
                                    <GraduationCap size={24} className="text-secondary" />
                                    Academic Snapshot
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div style={{ padding: '1.5rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                                        <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Academic Level</h4>
                                        <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--secondary)' }}>{profile?.level || '100L'}</span>
                                    </div>
                                    <div style={{ padding: '1.5rem', background: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                                        <h4 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Matriculation</h4>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>{profile?.matric_number || 'Pending'}</span>
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
