import { createClient } from '@/lib/supabase/server';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './network.module.css';
import { Users, Search, MapPin, UserPlus, UserMinus, GraduationCap } from 'lucide-react';
import { toggleFollow } from './actions';
import { redirect } from 'next/navigation';

export default async function NetworkPage({ searchParams }: { searchParams: { query?: string } }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect('/auth/login');

    const query = searchParams.query || '';

    // Fetch all profiles except current user
    let profilesQuery = supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id);

    if (query) {
        profilesQuery = profilesQuery.or(`full_name.ilike.%${query}%,department.ilike.%${query}%`);
    }

    const { data: allProfiles } = await profilesQuery.limit(20);

    // Fetch current user's connections
    const { data: connections } = await supabase
        .from('connections')
        .select('following_id')
        .eq('follower_id', user.id);

    const followingIds = new Set(connections?.map(c => c.following_id) || []);

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

                    <div className={styles.directoryGrid}>
                        {allProfiles && allProfiles.length > 0 ? (
                            allProfiles.map((p) => {
                                const isFollowing = followingIds.has(p.id);
                                return (
                                    <div key={p.id} className={styles.profileCard}>
                                        <div className={styles.avatar}>
                                            {p.full_name?.[0] || 'S'}
                                        </div>
                                        <h3 className={styles.name}>{p.full_name}</h3>
                                        <p className={styles.dept}>{p.department}</p>
                                        
                                        <div className={styles.meta}>
                                            <div className={styles.metaItem}>
                                                <GraduationCap size={14} />
                                                <span>Level {p.level || '100L'}</span>
                                            </div>
                                        </div>

                                        <div className={styles.actions}>
                                            <form action={toggleFollow.bind(null, p.id, isFollowing)}>
                                                <Button 
                                                    variant={isFollowing ? "ghost" : "primary"} 
                                                    size="small"
                                                    style={{ width: '100%', border: isFollowing ? '1px solid var(--surface-border)' : 'none' }}
                                                >
                                                    {isFollowing ? (
                                                        <>
                                                            <UserMinus size={16} style={{ marginRight: '0.5rem' }} />
                                                            Following
                                                        </>
                                                    ) : (
                                                        <>
                                                            <UserPlus size={16} style={{ marginRight: '0.5rem' }} />
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
