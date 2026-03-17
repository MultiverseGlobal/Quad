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
            <div className={`${styles.profile} animate-fade-in`}>
                <div className="container">
                    <Link href="/network" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600 }}>
                        <ArrowLeft size={18} />
                        Back to Network
                    </Link>

                    <div className={styles.profileWrapper}>
                        <aside className={`${styles.sidebar} animate-slide-up`}>
                            <div className={styles.profileCard}>
                                <Avatar 
                                    name={profile.full_name} 
                                    size="xl" 
                                    status="academic"
                                    style={{ margin: '0 auto 2rem' }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                                    <h1 className={styles.name}>{profile.full_name}</h1>
                                    <Sparkles size={20} className="text-secondary" />
                                </div>
                                <p className={styles.deptInfo}>{profile.department || 'Veritas Scholar'}</p>
                                <p className={styles.bio}>
                                    {profile.bio || 'Professional student active on Quad. Connect with me for collaborations!'}
                                </p>
                                
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                    <Button style={{ flex: 1 }}>
                                        <UserPlus size={18} />
                                        Connect
                                    </Button>
                                    <Button variant="outline" style={{ flex: 1 }}>
                                        <MessageSquare size={18} />
                                        Message
                                    </Button>
                                </div>
                            </div>
                        </aside>

                        <main className={styles.mainSection}>
                            <div className={`${styles.contentCard} animate-slide-up stagger-1`}>
                                <h2 className={styles.cardTitle}>Academic Spotlight</h2>
                                <div className={styles.infoGrid}>
                                    <div className={styles.infoItem}>
                                        <GraduationCap className={styles.infoIcon} />
                                        <div>
                                            <label>Current Standing</label>
                                            <p>{profile.level || '100L'} Scholar</p>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <Mail className={styles.infoIcon} />
                                        <div>
                                            <label>University Email</label>
                                            <p>{profile.email || 'Protected'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles.contentCard} animate-slide-up stagger-2`} style={{ marginTop: '2rem' }}>
                                <h2 className={styles.cardTitle}>Social Loops</h2>
                                <div className={styles.socialLinks}>
                                    {profile.website && (
                                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                            <LinkIcon size={20} />
                                            <span>Portfolio</span>
                                            <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                                        </a>
                                    )}
                                    <div className={styles.socialLink}>
                                        <Instagram size={20} />
                                        <span>@scholar_quad</span>
                                    </div>
                                    <div className={styles.socialLink}>
                                        <Twitter size={20} />
                                        <span>@veritas_student</span>
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
