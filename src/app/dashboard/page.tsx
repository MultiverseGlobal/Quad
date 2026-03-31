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
import { EdgeBadge } from '@/components/ui/EdgeBadge';
import { Trophy } from 'lucide-react';

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
            .from('opportunities')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(2),
        supabase
            .from('profiles')
            .select('*')
            .eq('department', profile?.department || '')
            .order('scholar_edge', { ascending: false })
            .limit(3)
    ]);

    const topScholars = topScholarsData.data;

    return (
        <>
            <Navbar />
            <div className={styles.dashboard}>
                <div className="container">
                    <header className={styles.header}>
                        <div className={styles.welcomeInfo}>
                            <Avatar name={profile?.full_name} size="large" />
                            <div>
                                <h1 className={styles.welcomeTitle}>
                                    Hey, {profile?.full_name?.split(' ')[0] || 'Scholar'}!
                                </h1>
                                <p className={styles.welcomeSub}>
                                    The word on campus is spreading today • {profile?.department}
                                </p>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <Button variant="ghost" size="small" className={styles.notifBtn}>
                                <Bell size={18} />
                            </Button>
                        </div>
                    </header>

                    <div className={styles.grid}>
                        <main className={styles.mainContent}>
                            <section className={styles.card}>
                                <h2 className={styles.sectionTitle}>
                                    <TrendingUp size={20} className={styles.accentIcon} />
                                    What's the Word?
                                </h2>
                                <div className={styles.feedPulse}>
                                    {recentPost.data ? (
                                        <div className={styles.pulseContent}>
                                            <p className={styles.pulseQuote}>"{recentPost.data.content}"</p>
                                            <div className={styles.pulseMeta}>
                                                <Avatar name="Scholar" size="small" />
                                                <span>Live from the Feed</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={styles.emptyPulse}>
                                            <MessageCircle size={32} />
                                            <p>No new word on the feed.</p>
                                            <Link href="/community">
                                                <Button variant="outline" size="small">Start a Conversation</Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <section className={styles.card}>
                                <h2 className={styles.sectionTitle}>
                                    <Briefcase size={20} className={styles.secondaryIcon} />
                                    Plays for You
                                </h2>
                                <div className={styles.oppList}>
                                    {recentOpportunities.data && recentOpportunities.data.length > 0 ? (
                                        recentOpportunities.data.map((job) => (
                                            <div key={job.id} className={styles.oppItem}>
                                                <div className={styles.oppInfo}>
                                                    <h4>{job.title}</h4>
                                                    <p>{job.company}</p>
                                                </div>
                                                <Link href={`/opportunities`}>
                                                    <Button variant="ghost" size="small">View Play</Button>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p className={styles.emptyText}>No new plays at the moment.</p>
                                    )}
                                </div>
                            </section>
                        </main>

                        <aside className={styles.sidebar}>
                            <div className={styles.statGroup}>
                                <div className={styles.statTile}>
                                    <span className={styles.statNum}>154</span>
                                    <span className={styles.statLabel}>Connections</span>
                                </div>
                                <div className={styles.statTile}>
                                    <span className={styles.statNum}>
                                        <EdgeBadge score={profile?.scholar_edge || 0} />
                                    </span>
                                </div>
                            </div>

                            <div className={styles.card}>
                                <h3 className={styles.widgetTitle}>
                                    <Trophy size={16} style={{ color: '#f59e0b', marginRight: '0.4rem', verticalAlign: 'middle' }} />
                                    Top Scholars
                                </h3>
                                <div className={styles.linkList} style={{ marginTop: '0.5rem' }}>
                                    {topScholars && topScholars.length > 0 ? (
                                        topScholars.map((scholar, idx) => (
                                            <div key={scholar.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--muted)', width: '20px' }}>
                                                    {idx + 1}
                                                </span>
                                                <Avatar name={scholar.full_name} size="small" />
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <h4 style={{ margin: 0, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {scholar.full_name}
                                                    </h4>
                                                    <div style={{ transform: 'scale(0.85)', transformOrigin: 'left' }}>
                                                        <EdgeBadge score={scholar.scholar_edge || 0} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>No scholars ranked yet.</p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.card}>
                                <h3 className={styles.widgetTitle}>Campus Quick Links</h3>
                                <nav className={styles.linkList}>
                                    <Link href="/profile" className={styles.linkItem}>
                                        <User size={16} />
                                        Your Page
                                    </Link>
                                    <Link href="/network" className={styles.linkItem}>
                                        <Sparkles size={16} />
                                        Discover Peer Network
                                    </Link>
                                    <a href="https://portal.veritas.edu.ng/" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                                        <LayoutDashboard size={16} />
                                        Official VUA Portal
                                    </a>
                                    <div className={styles.divider}></div>
                                    <form action={signOut}>
                                        <button className={styles.logoutAction}>
                                            <LogOut size={16} />
                                            Terminate Session
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
