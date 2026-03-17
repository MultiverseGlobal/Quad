import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { signOut } from '../auth/actions';
import { Navbar } from '@/components/layout/Navbar';
import styles from './dashboard.module.css';
import { 
    LayoutDashboard, 
    MessageSquare, 
    Briefcase, 
    User, 
    LogOut,
    Bell,
    TrendingUp,
    Users
} from 'lucide-react';

export default async function DashboardPage() {
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

    if (profile && !profile.onboarding_completed) {
        return redirect('/onboarding');
    }

    // Fetch dynamic content for dashboard
    const [recentPost, recentOpportunities] = await Promise.all([
        supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single(),
        supabase
            .from('opportunities')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(2)
    ]);

    return (
        <>
            <Navbar />
            <div className={styles.dashboard}>
                <div className="container">
                    <header className={styles.header}>
                        <div className={styles.welcome}>
                            <h1>Welcome back, {profile?.full_name?.split(' ')[0] || 'Scholar'}</h1>
                            <p>{profile?.department || 'Veritas University Student'} • Level {profile?.level || '100L'}</p>
                        </div>
                        <div className={styles.actions}>
                            <Button variant="ghost" className={styles.notifBtn}>
                                <Bell size={20} />
                            </Button>
                        </div>
                    </header>

                    <div className={styles.grid}>
                        <main className={styles.mainContent}>
                            <div className={`${styles.card} animate-slide-up stagger-1`}>
                                <h2 className={styles.sectionTitle}>
                                    <TrendingUp size={24} className="text-secondary" />
                                    Department Pulse
                                </h2>
                                <div className={styles.feedPlaceholder}>
                                    {recentPost.data ? (
                                        <div style={{ width: '100%', textAlign: 'left' }}>
                                            <p style={{ fontSize: '1.25rem', fontStyle: 'italic', fontWeight: 500, color: 'var(--primary)', lineHeight: 1.5 }}>"{recentPost.data.content}"</p>
                                            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifySelf: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 800 }}>V</div>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>Fresh in {profile?.department}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <MessageSquare size={48} strokeWidth={1.5} />
                                            <p style={{ fontWeight: 500 }}>No new updates in {profile?.department} yet.</p>
                                            <Link href="/community/new">
                                                <Button variant="subtle">Start a Conversation</Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={`${styles.card} animate-slide-up stagger-2`}>
                                <h2 className={styles.sectionTitle}>
                                    <Briefcase size={24} className="text-secondary" />
                                    Fresh Opportunities
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {recentOpportunities.data && recentOpportunities.data.length > 0 ? (
                                        recentOpportunities.data.map((job) => (
                                            <div key={job.id} style={{ padding: '1.5rem', background: 'var(--surface-muted)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s ease' }}>
                                                <div>
                                                    <h4 style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.1rem' }}>{job.title}</h4>
                                                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', fontWeight: 500 }}>{job.company} • Verified Opportunity</p>
                                                </div>
                                                <Link href="/opportunities">
                                                    <Button variant="outline" size="small">View Details</Button>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem', border: '2px dashed var(--surface-border)', borderRadius: 'var(--radius-md)' }}>No new opportunities right now.</p>
                                    )}
                                </div>
                            </div>
                        </main>

                        <aside className={`${styles.sidebar} animate-slide-up stagger-3`}>
                            <div className={styles.statGrid}>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue}>154</span>
                                    <span className={styles.statLabel}>Connections</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue}>12</span>
                                    <span className={styles.statLabel}>Gigs Found</span>
                                </div>
                            </div>

                            <div className={styles.card}>
                                <h3 className={styles.sectionTitle} style={{ fontSize: '1.25rem' }}>
                                    <Users size={20} />
                                    University Links
                                </h3>
                                <nav className={styles.quickActions}>
                                    <Link href="/profile" style={{ width: '100%', textDecoration: 'none' }}>
                                        <Button variant="ghost" className={styles.actionButton}>My Student Profile</Button>
                                    </Link>
                                    <Link href="/profile" style={{ width: '100%', textDecoration: 'none' }}>
                                        <Button variant="ghost" className={styles.actionButton}>My Loops Shop</Button>
                                    </Link>
                                    <a href="https://portal.veritas.edu.ng/" target="_blank" rel="noopener noreferrer" style={{ width: '100%', textDecoration: 'none' }}>
                                        <Button variant="ghost" className={styles.actionButton}>Veritas University Portal</Button>
                                    </a>
                                    <div style={{ height: '1px', background: 'var(--surface-border)', margin: '0.5rem 0' }}></div>
                                    <form action={signOut} style={{ width: '100%' }}>
                                        <Button variant="ghost" className={styles.actionButton} style={{ color: '#ef4444' }}>
                                            <LogOut size={18} />
                                            Sign Out
                                        </Button>
                                    </form>
                                </nav>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
