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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {posts.map((post, index) => (
                <article 
                    key={post.id} 
                    className={styles.postCard}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <Link href={`/profile/${post.user_id}`} className={styles.authorInfo} style={{ textDecoration: 'none' }}>
                            <Avatar 
                                name={post.profiles?.full_name} 
                                size="medium" 
                            />
                            <div>
                                <div className={styles.authorName}>{post.profiles?.full_name || 'Anonymous Student'}</div>
                                <div className={styles.authorDept}>{post.profiles?.department || 'Verified Scholar'}</div>
                            </div>
                        </Link>
                        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                            {new Date(post.created_at).toLocaleDateString()}
                        </div>
                    </div>
                    
                    <div className={styles.postContent} style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--foreground)', marginBottom: '1rem' }}>
                        {post.content}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--surface-border)', paddingTop: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <button style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                                <Heart size={14} />
                                24
                            </button>
                            <Link href={`/community/${post.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                                <MessageCircle size={14} />
                                {index % 3 === 0 ? 8 : 2} Comments
                            </Link>
                        </div>
                        <button style={{ marginLeft: 'auto', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                            <Share2 size={14} />
                            Share
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}
