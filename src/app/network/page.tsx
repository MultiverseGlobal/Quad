import { createClient } from '@/lib/supabase/server';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './network.module.css';
import { Users, Search, MapPin, UserPlus, UserMinus, GraduationCap, Sparkles } from 'lucide-react';
import { toggleFollow, acceptConnectionRequest } from './actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';

export default async function NetworkPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const params = await searchParams;
    const query = params.query || '';
    
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    if (!currentUser) return redirect('/auth/login');

    // Fetch all profiles except current user
    let profilesQuery = supabase
        .from('profiles')
        .select('*')
        .neq('id', currentUser.id);

    if (query) {
        profilesQuery = profilesQuery.or(`full_name.ilike.%${query}%,department.ilike.%${query}%`);
    }

    const { data: allProfiles } = await profilesQuery.limit(20);

    // Fetch current user's connections (both sent and received)
    const { data: connections } = await supabase
        .from('connections')
        .select('*')
        .or(`follower_id.eq.${currentUser.id},following_id.eq.${currentUser.id}`);

    // Fetch pending requests FOR the current user
    const { data: pendingInvitations } = await supabase
        .from('connections')
        .select(`
            id,
            follower_id,
            profiles!connections_follower_id_fkey (
                full_name,
                department,
                avatar_url
            )
        `)
        .eq('following_id', currentUser.id)
        .eq('status', 'pending');

    // Map connections for easy lookup
    const connectionMap = new Map();
    connections?.forEach(c => {
        const otherId = c.follower_id === currentUser.id ? c.following_id : c.follower_id;
        connectionMap.set(otherId, c.status || 'accepted'); // Default to accepted for legacy
    });

    return (
        <>
            <Navbar />
            <div className={styles.network}>
                <div className="container">
                    <header className={styles.header}>
                        <div className={styles.titleArea}>
                            <h1>Scholars Directory</h1>
                            <p>Build your university network and find collaborators.</p>
                        </div>
                        
                        <form className={styles.searchBar}>
                            <Search size={20} className={styles.searchIcon} />
                            <input 
                                name="query" 
                                type="text" 
                                defaultValue={query}
                                placeholder="Search by name, department, or level..." 
                                className={styles.searchInput}
                            />
                        </form>
                    </header>

                    {pendingInvitations && pendingInvitations.length > 0 && (
                        <section className={styles.invitationsSection} style={{ marginBottom: '4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <Sparkles size={24} className="text-secondary" />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>Invitation Center</h2>
                                <span className={styles.invitationCount}>{pendingInvitations.length}</span>
                            </div>
                            <div className={styles.invitationGrid}>
                                {pendingInvitations.map((inv: any) => (
                                    <div key={inv.id} className={styles.invitationCard}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <Avatar name={inv.profiles?.full_name} size="medium" />
                                            <div>
                                                <h4 style={{ fontWeight: 700, color: 'var(--primary)' }}>{inv.profiles?.full_name}</h4>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{inv.profiles?.department}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                            <form action={acceptConnectionRequest.bind(null, inv.follower_id)} style={{ flex: 1 }}>
                                                <Button size="small" style={{ width: '100%' }}>Accept</Button>
                                            </form>
                                            <form action={toggleFollow.bind(null, inv.follower_id, true)} style={{ flex: 1 }}>
                                                <Button variant="ghost" size="small" style={{ width: '100%', border: '1px solid var(--surface-border)' }}>Ignore</Button>
                                            </form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className={styles.directoryGrid}>
                        {allProfiles && allProfiles.length > 0 ? (
                            allProfiles.map((p, index) => {
                                const status = connectionMap.get(p.id);
                                return (
                                    <div 
                                        key={p.id} 
                                        className={`${styles.profileCard} animate-slide-up`}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <Link href={`/profile/${p.id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Avatar 
                                                name={p.full_name} 
                                                size="medium" 
                                                status="academic"
                                            />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                                                <h3 className={styles.name}>{p.full_name}</h3>
                                                <Sparkles size={14} className="text-secondary" />
                                            </div>
                                            <p className={styles.dept}>{p.department}</p>
                                            
                                            <div className={styles.meta}>
                                                <div className={styles.metaItem}>
                                                    <GraduationCap size={14} />
                                                    <span>{p.level || '100L'} Scholar</span>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className={styles.actions} style={{ width: '100%' }}>
                                            <form action={toggleFollow.bind(null, p.id, !!status)}>
                                                <Button 
                                                    variant={status === 'accepted' ? "outline" : status === 'pending' ? "ghost" : "primary"} 
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                    disabled={status === 'pending'}
                                                >
                                                    {status === 'accepted' ? (
                                                        <>
                                                            <Users size={16} />
                                                            Connected
                                                        </>
                                                    ) : status === 'pending' ? (
                                                        <>
                                                            <Sparkles size={16} className="text-secondary" />
                                                            Pending Discovery
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserPlus size={16} />
                                                            Connect
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.emptyState}>
                                <Users size={48} />
                                <h3>No scholars found</h3>
                                <p>Try adjusting your search terms.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
