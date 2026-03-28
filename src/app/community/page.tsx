import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './community.module.css';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
    Heart, 
    MessageCircle, 
    Share2, 
    Plus,
    User,
    Sparkles,
    Search
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import RealtimeFeed from './RealtimeFeed';

export default async function CommunityPage({ searchParams }: { searchParams: Promise<{ query?: string, category?: string }> }) {
    const params = await searchParams;
    const query = params.query || '';
    const category = params.category || '';
    
    const supabase = await createClient();
    
    // Build the query
    let postsQuery = supabase
        .from('posts')
        .select(`
            *,
            profiles!inner (
                full_name,
                department
            )
        `)
        .order('created_at', { ascending: false });

    if (query) {
        postsQuery = postsQuery.ilike('content', `%${query}%`);
    }

    if (category && category !== 'All Feed') {
        // Special case for Campus Events if it's not a department
        if (category === 'Campus Events') {
             // For now, let's just search for "event" in content as a fallback or if we had a category field
             postsQuery = postsQuery.ilike('content', '%event%');
        } else {
             postsQuery = postsQuery.eq('profiles.department', category);
        }
    }

    const { data: posts } = await postsQuery;

    const { data: { user } } = await supabase.auth.getUser();

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

    const categories = ["All Feed", "Computer Science", "Economics", "Law", "Mass Communication"];
    
    return (
        <>
            <Navbar />
            <div className={styles.feed}>
                <div className="container">
                    <div className={styles.layoutGrid}>
                        {/* Left Sidebar: Profile & Nav */}
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarCard}>
                                <div className={styles.profileMini}>
                                    <Avatar name={profile?.full_name} size="large" />
                                    <div className={styles.profileName}>{profile?.full_name}</div>
                                    <div className={styles.profileDept}>{profile?.department}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <Link href="/profile" className={styles.categoryLink}>
                                        <User size={16} />
                                        Your Page
                                    </Link>
                                    <Link href="/network" className={styles.categoryLink}>
                                        <Sparkles size={16} />
                                        Scholar Network
                                    </Link>
                                </div>
                            </div>
                            
                            <div className={styles.sidebarCard}>
                                <h4 className={styles.widgetTitle}>Departments</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {categories.map((cat, i) => (
                                        <Link 
                                            key={i} 
                                            href={`/community?category=${encodeURIComponent(cat)}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                                            className={`${styles.categoryLink} ${category === cat || (!category && cat === 'All Feed') ? styles.activeCategory : ''}`}
                                        >
                                            {cat}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Center: Feed Column */}
                        <main className={styles.feedColumn}>
                            <header className={styles.header}>
                                <div>
                                    <h2 className={styles.headerTitle}>The Feed</h2>
                                    <p className={styles.headerSub}>The institutional discussion stream for Veritas University.</p>
                                </div>
                                
                                <div className={styles.toolbar}>
                                    <form action="/community" className={styles.searchWrapper}>
                                        <Search className={styles.searchIcon} size={14} />
                                        <input 
                                            name="query" 
                                            type="text" 
                                            placeholder="Search the feed..." 
                                            className={styles.searchInput}
                                            defaultValue={query}
                                        />
                                        {category && <input type="hidden" name="category" value={category} />}
                                    </form>
                                    <Link href="/community/new" style={{ textDecoration: 'none' }}>
                                        <Button>
                                            <Plus size={16} />
                                            New Post
                                        </Button>
                                    </Link>
                                </div>
                            </header>

                            <div className={styles.postList}>
                                {posts && posts.length > 0 ? (
                                    <RealtimeFeed initialPosts={posts as any} />
                                ) : (
                                    <div className={styles.emptyState}>
                                        <MessageCircle size={32} />
                                        <p style={{ fontWeight: 600, marginTop: '1rem' }}>No posts found in this feed.</p>
                                    </div>
                                )}
                            </div>
                        </main>

                        {/* Right Sidebar: Discovery */}
                        <aside className={styles.widgets}>
                            <div className={styles.sidebarCard}>
                                <h4 className={styles.widgetTitle}>Campus Connect</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>Meet fellow scholars in your department.</p>
                                <Link href="/network" style={{ textDecoration: 'none' }}>
                                    <Button variant="outline" style={{ width: '100%' }}>Explore Directory</Button>
                                </Link>
                            </div>
                            
                            <div className={styles.sidebarCard}>
                                <h4 className={styles.widgetTitle}>Trending Plays</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div className={styles.trendingItem}>
                                        <div className={styles.trendingTitle}>Research Assistant</div>
                                        <div className={styles.trendingMeta}>Economics • 200 Pulse</div>
                                    </div>
                                    <div className={styles.trendingItem}>
                                        <div className={styles.trendingTitle}>Visual Branding</div>
                                        <div className={styles.trendingMeta}>Design • 500 Pulse</div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
