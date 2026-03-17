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

    const categories = ["All Feed", "Computer Science", "Economics", "Law", "Mass Communication"];
    
    return (
        <>
            <Navbar />
            <div className={styles.feed}>
                <div className="container">
                    <header className={styles.header}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                            <div>
                                <h1>Community Pulse</h1>
                                <p style={{ color: 'var(--muted)', fontWeight: 500 }}>Stay connected with the heartbeat of Veritas University.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <form action="/community" className={styles.searchWrapper}>
                                    <Search className={styles.searchIcon} size={18} />
                                    <input 
                                        name="query" 
                                        type="text" 
                                        placeholder="Search discussions..." 
                                        className={styles.searchInput}
                                        defaultValue={query}
                                    />
                                    {category && <input type="hidden" name="category" value={category} />}
                                </form>
                                <Link href="/community/new">
                                    <Button size="large">
                                        <Plus size={20} />
                                        Launch Discussion
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        
                        <div className={styles.filterBar}>
                            {categories.map((cat, i) => (
                                <Link 
                                    key={i} 
                                    href={`/community?category=${encodeURIComponent(cat)}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                                    className={styles.categoryLink}
                                >
                                    <div className={`${styles.filterChip} ${category === cat || (!category && cat === 'All Feed') ? styles.activeChip : ''}`}>
                                        {cat}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </header>

                    <div className={styles.postList}>
                        {posts && posts.length > 0 ? (
                            <RealtimeFeed initialPosts={posts as any} />
                        ) : (
                            <div className={styles.postCard} style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                                <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'var(--surface-muted)', borderRadius: 'var(--radius-xl)', color: 'var(--muted)', marginBottom: '1.5rem' }}>
                                    <MessageCircle size={48} />
                                </div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1.5rem', fontWeight: 800 }}>
                                    {query || (category && category !== 'All Feed') ? 'No discussions found' : 'The feed is quiet...'}
                                </h3>
                                <p style={{ color: 'var(--muted)', maxWidth: '400px', margin: '0 auto', fontSize: '1.1rem' }}>
                                    {query || (category && category !== 'All Feed') 
                                        ? 'Try adjusting your search terms or category filter to find what you are looking for.' 
                                        : 'Be the first to start a conversation and inspire your university community.'}
                                </p>
                                {(query || (category && category !== 'All Feed')) && (
                                    <Link href="/community" style={{ marginTop: '2rem', display: 'inline-block' }}>
                                        <Button variant="outline">Clear All Filters</Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
