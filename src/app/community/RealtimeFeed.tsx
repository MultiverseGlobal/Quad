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
        <div className={styles.postList}>
            {posts.map((post, index) => (
                <article 
                    key={post.id} 
                    className={styles.postCard}
                >
                    <header className={styles.postHeader}>
                        <Link href={`/profile/${post.user_id}`} className={styles.authorInfo}>
                            <Avatar 
                                name={post.profiles?.full_name} 
                                size="large" 
                                src={post.profiles?.avatar_url}
                            />
                            <div className={styles.authorMeta}>
                                <div className={styles.authorName}>{post.profiles?.full_name || 'Anonymous Student'}</div>
                                <div className={styles.authorDept}>{post.profiles?.department || 'Verified Scholar'}</div>
                            </div>
                        </Link>
                        <time className={styles.postTime}>
                            {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </time>
                    </header>
                    
                    <div className={styles.postContent}>
                        {post.content}
                    </div>
                    
                    <footer className={styles.postFooter}>
                        <div className={styles.interactionGroup}>
                            <button className={styles.interactionBtn}>
                                <Heart size={18} />
                                <span>24</span>
                            </button>
                            <Link href={`/community/${post.id}`} className={styles.interactionBtn}>
                                <MessageCircle size={18} />
                                <span>{index % 3 === 0 ? 8 : 2} Comments</span>
                            </Link>
                        </div>
                        <button className={styles.shareBtn}>
                            <Share2 size={18} />
                            <span>Share</span>
                        </button>
                    </footer>
                </article>
            ))}
        </div>
    );
}
