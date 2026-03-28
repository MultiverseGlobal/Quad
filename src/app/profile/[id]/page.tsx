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
    MessageSquare
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
                    <Link href="/network" className={styles.backLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} />
                        Back to Network
                    </Link>

                    <div className={styles.profileWrapper}>
                        <aside className={styles.sidebar}>
                            <div className={styles.profileCard}>
                                <Avatar 
                                    name={profile.full_name} 
                                    size="xl" 
                                    style={{ margin: '0 auto 1.5rem' }}
                                />
                                <h1 className={styles.name}>{profile.full_name}</h1>
                                <p className={styles.deptInfo}>{profile.department || 'Veritas Scholar'}</p>
                                <p className={styles.bio}>
                                    {profile.bio || 'Professional student active on Quad. Connect with me for collaborations!'}
                                </p>
                                
                                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                    <Button style={{ flex: 1 }}>
                                        <UserPlus size={16} />
                                        Connect
                                    </Button>
                                    <Button variant="outline" style={{ flex: 1 }}>
                                        <MessageSquare size={16} />
                                        Message
                                    </Button>
                                </div>
                            </div>
                        </aside>

                        <main className={styles.mainSection}>
                            <div className={styles.contentCard}>
                                <h2 className={styles.cardTitle}>
                                    <GraduationCap size={18} />
                                    Academic Spotlight
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Current Standing</label>
                                        <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>{profile.level || '100L'} Scholar</p>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>University Email</label>
                                        <p style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>{profile.email || 'Protected'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.contentCard}>
                                <h2 className={styles.cardTitle}>
                                    <Sparkles size={18} />
                                    Social Loops
                                </h2>
                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                    {profile.website && (
                                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                                            <LinkIcon size={18} />
                                            <div className={styles.linkInfo}>
                                                <h4>Professional Portfolio</h4>
                                                <p>{profile.website}</p>
                                            </div>
                                            <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                        </a>
                                    )}
                                    <div className={styles.linkItem}>
                                        <Instagram size={18} />
                                        <div className={styles.linkInfo}>
                                            <h4>Instagram</h4>
                                            <p>@scholar_quad</p>
                                        </div>
                                    </div>
                                    <div className={styles.linkItem}>
                                        <Twitter size={18} />
                                        <div className={styles.linkInfo}>
                                            <h4>Twitter / X</h4>
                                            <p>@veritas_student</p>
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
