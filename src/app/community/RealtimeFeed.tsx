'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from './community.module.css';
import { 
    Heart, 
    MessageCircle, 
    Share2, 
    Sparkles
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface Post {
    id: string;
    content: string;
    user_id: string;
    created_at: string;
    profiles?: {
        full_name: string;
        department: string;
        avatar_url: string;
    };
}

export default function RealtimeFeed({ initialPosts }: { initialPosts: Post[] }) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel('public:posts')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'posts'
                },
                async (payload) => {
                    const newPost = payload.new as Post;
                    
                    // Fetch profile for the new post
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('full_name, department, avatar_url')
                        .eq('id', newPost.user_id)
                        .single();
                    
                    const postWithProfile = {
                        ...newPost,
                        profiles: profile || undefined
                    };
                    
                    setPosts((currentPosts) => [postWithProfile, ...currentPosts]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    return (
        <div className={styles.feedGrid}>
            {posts.map((post, index) => (
                <article 
                    key={post.id} 
                    className={`${styles.postCard} animate-slide-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <Link href={`/profile/${post.user_id}`} className={styles.authorInfo} style={{ textDecoration: 'none' }}>
                        <Avatar 
                            name={post.profiles?.full_name} 
                            size="medium" 
                            status="academic"
                        />
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <div className={styles.authorName}>{post.profiles?.full_name || 'Anonymous Student'}</div>
                                <Sparkles size={14} className="text-secondary" />
                            </div>
                            <div className={styles.authorDept}>{post.profiles?.department || 'Verified Scholar'}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>
                            {new Date(post.created_at).toLocaleDateString()}
                        </div>
                    </Link>
                    
                    <div className={styles.postContent}>
                        {post.content}
                    </div>
                    
                    <div className={styles.postActions}>
                        <Button variant="ghost" size="small" className={styles.action}>
                            <Heart size={18} />
                            <span>24</span>
                        </Button>
                        <Link href={`/community/${post.id}`}>
                            <Button variant="ghost" size="small" className={styles.action}>
                                <MessageCircle size={18} />
                                <span>12</span>
                            </Button>
                        </Link>
                        <Link href={`/community/${post.id}`} style={{ marginLeft: 'auto' }}>
                            <Button variant="ghost" size="small" className={styles.action}>
                                <Share2 size={18} />
                                <span>View Discussion</span>
                            </Button>
                        </Link>
                    </div>
                </article>
            ))}
        </div>
    );
}
