import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
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
                            <div className={styles.card}>
                                <h2 className={styles.sectionTitle}>
                                    <TrendingUp size={24} className="text-secondary" />
                                    Department Pulse
                                </h2>
                                <div className={styles.feedPlaceholder}>
                                    {recentPost.data ? (
                                        <div style={{ width: '100%', textAlign: 'left' }}>
                                            <p style={{ fontStyle: 'italic', color: 'var(--foreground)' }}>"{recentPost.data.content}"</p>
                                            <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: 'var(--muted)' }}>Latest from {profile?.department}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <MessageSquare size={48} />
                                            <p>No new updates in {profile?.department || 'your department'} yet.</p>
                                            <Button variant="secondary">Start a Conversation</Button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={styles.card}>
                                <h2 className={styles.sectionTitle}>
                                    <Briefcase size={24} className="text-secondary" />
                                    Fresh Opportunities
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {recentOpportunities.data && recentOpportunities.data.length > 0 ? (
                                        recentOpportunities.data.map((job) => (
                                            <div key={job.id} style={{ padding: '1.5rem', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <h4 style={{ fontWeight: 700, color: 'var(--primary)' }}>{job.title}</h4>
                                                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{job.company} • Verified</p>
                                                </div>
                                                <Button variant="ghost" size="small">View Details</Button>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '1rem' }}>No new opportunities right now.</p>
                                    )}
                                </div>
                            </div>
                        </main>

                        <aside className={styles.sidebar}>
                            <div className={styles.statGrid}>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue}>-</span>
                                    <span className={styles.statLabel}>Connections</span>
                                </div>
                                <div className={styles.statCard}>
                                    <span className={styles.statValue}>-</span>
                                    <span className={styles.statLabel}>Opportunities</span>
                                </div>
                            </div>

                            <div className={styles.card}>
                                <h3 className={styles.sectionTitle} style={{ fontSize: '1.1rem' }}>
                                    <Users size={18} />
                                    University Links
                                </h3>
                                <nav className={styles.quickActions}>
                                    <Button variant="ghost" className={styles.actionButton}>My Profile</Button>
                                    <Button variant="ghost" className={styles.actionButton}>Loops Shop</Button>
                                    <Button variant="ghost" className={styles.actionButton}>Veritas Portal</Button>
                                    <form action={signOut} style={{ width: '100%' }}>
                                        <Button variant="ghost" className={styles.actionButton} style={{ color: 'var(--error)' }}>
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
