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
    Search
} from 'lucide-react';

export default async function CommunityPage() {
    const supabase = await createClient();
    
    // Fetch posts with author profile information
    const { data: posts, error } = await supabase
        .from('posts')
        .select(`
            *,
            profiles:author_id (
                full_name,
                department
            )
        `)
        .order('created_at', { ascending: false });

    const categories = ["All Feed", "Computer Science", "Economics", "Law", "Campus Events", "Marketplace"];
    
    return (
        <>
            <Navbar />
            <div className={styles.feed}>
                <div className="container">
                    <header className={styles.header}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h1>Community Pulse</h1>
                            <Link href="/community/new">
                                <Button>
                                    <Plus size={20} />
                                    Start a Discussion
                                </Button>
                            </Link>
                        </div>
                        
                        <div className={styles.filterBar}>
                            {categories.map((cat, i) => (
                                <div key={i} className={`${styles.filterChip} ${i === 0 ? styles.activeChip : ''}`}>
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </header>

                    <div className={styles.postList}>
                        {posts && posts.length > 0 ? (
                            posts.map((post, index) => (
                                <article 
                                    key={post.id} 
                                    className={`${styles.postCard} animate-slide-up`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={styles.authorInfo}>
                                        <div className={styles.avatar}>
                                            {post.profiles?.full_name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <div className={styles.authorName}>{post.profiles?.full_name || 'Anonymous Student'}</div>
                                                <Sparkles size={14} className="text-secondary" />
                                            </div>
                                            <div className={styles.authorDept}>{post.profiles?.department || 'Verified Scholar'}</div>
                                        </div>
                                    </div>
                                    <div className={styles.postContent}>
                                        {post.content}
                                    </div>
                                    <div className={styles.postActions}>
                                        <Button variant="ghost" size="small" className={styles.action}>
                                            <Heart size={18} />
                                            0
                                        </Button>
                                        <Button variant="ghost" size="small" className={styles.action}>
                                            <MessageCircle size={18} />
                                            0
                                        </Button>
                                        <Button variant="ghost" size="small" className={styles.action} style={{ marginLeft: 'auto' }}>
                                            <Share2 size={18} />
                                            Share
                                        </Button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className={styles.postCard} style={{ textAlign: 'center', padding: '4rem' }}>
                                <MessageCircle size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.2 }} />
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>The feed is quiet...</h3>
                                <p style={{ color: 'var(--muted)' }}>Be the first to start a conversation in your university community.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
