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
    Users,
    Sparkles
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Avatar name={profile?.full_name} size="medium" />
                            <div>
                                <h1 className={styles.welcomeTitle}>
                                    Welcome, {profile?.full_name?.split(' ')[0] || 'Scholar'}
                                </h1>
                                <p className={styles.welcomeSub}>
                                    {profile?.department || 'Veritas University'} • Level {profile?.level || '100L'}
                                </p>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <Button variant="ghost" size="small">
                                <Bell size={18} />
                            </Button>
                        </div>
                    </header>

                    <div className={styles.grid}>
                        <main className={styles.mainContent}>
                            <div className={styles.card}>
                                <h2 className={styles.sectionTitle}>
                                    <TrendingUp size={16} className="text-primary" />
                                    Department Pulse
                                </h2>
                                <div className={styles.feedPlaceholder}>
                                    {recentPost.data ? (
                                        <div style={{ width: '100%', textAlign: 'left' }}>
                                            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)', lineHeight: 1.5 }}>"{recentPost.data.content}"</p>
                                            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Avatar name="Veritas Scholar" size="small" />
                                                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 700 }}>Fresh in {profile?.department}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            <MessageSquare size={32} className="text-muted" style={{ marginBottom: '1rem' }} />
                                            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>No new updates in {profile?.department}.</p>
                                            <Link href="/community" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                                <Button variant="outline" size="small">Join Community</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.card}>
                                <h2 className={styles.sectionTitle}>
                                    <Briefcase size={16} className="text-primary" />
                                    Verified Opportunities
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {recentOpportunities.data && recentOpportunities.data.length > 0 ? (
                                        recentOpportunities.data.map((job) => (
                                            <div key={job.id} style={{ padding: '1rem', background: 'var(--surface-muted)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h4 style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.9rem' }}>{job.title}</h4>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>{job.company}</p>
                                                </div>
                                                <Link href={`/opportunities`}>
                                                    <Button variant="ghost" size="small">View</Button>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem', fontSize: '0.85rem', fontWeight: 600 }}>No new opportunities right now.</p>
                                    )}
                                </div>
                            </div>
                        </main>

                        <aside className={styles.sidebar}>
                            <div className={styles.statGrid}>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue}>154</span>
                                    <span className={styles.statLabel}>Connections</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue}>12</span>
                                    <span className={styles.statLabel}>Active Gigs</span>
                                </div>
                            </div>

                            <div className={styles.card}>
                                <h3 className={styles.sectionTitle}>
                                    Institutional Links
                                </h3>
                                <nav className={styles.quickActions}>
                                    <Link href="/profile" style={{ textDecoration: 'none' }}>
                                        <button className={styles.actionButton}>My Student Profile</button>
                                    </Link>
                                    <Link href="/profile" style={{ textDecoration: 'none' }}>
                                        <button className={styles.actionButton}>Institutional Loops</button>
                                    </Link>
                                    <a href="https://portal.veritas.edu.ng/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <button className={styles.actionButton}>University Portal</button>
                                    </a>
                                    <div style={{ height: '1px', background: 'var(--surface-border)', margin: '0.5rem 0' }}></div>
                                    <form action={signOut} style={{ width: '100%' }}>
                                        <button className={`${styles.actionButton} ${styles.logoutBtn}`}>
                                            Sign Out
                                        </button>
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
