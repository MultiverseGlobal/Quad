import { createClient } from '@/lib/supabase/server';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './network.module.css';
import { Users, Search, MapPin, UserPlus, UserMinus, GraduationCap, Sparkles } from 'lucide-react';
import { toggleFollow } from './actions';
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
                            allProfiles.map((p, index) => {
                                const isFollowing = followingIds.has(p.id);
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
                                            <form action={toggleFollow.bind(null, p.id, isFollowing)}>
                                                <Button 
                                                    variant={isFollowing ? "outline" : "primary"} 
                                                    size="small"
                                                    style={{ width: '100%' }}
                                                >
                                                    {isFollowing ? (
                                                        <>
                                                            <UserMinus size={16} />
                                                            Following
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
