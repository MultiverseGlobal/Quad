import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from '../community.module.css';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
    Heart, 
    MessageCircle, 
    Share2, 
    ArrowLeft,
    Sparkles,
    ShieldCheck
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { notFound } from 'next/navigation';

export default async function DiscussionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data: post } = await supabase
        .from('posts')
        .select(`
            *,
            profiles (
                full_name,
                department,
                avatar_url
            )
        `)
        .eq('id', id)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <div className={styles.feed} style={{ paddingTop: '8rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <Link href="/community" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600, transition: 'color 0.2s' }} className={styles.backLink}>
                        <ArrowLeft size={18} />
                        Back to Community Pulse
                    </Link>

                    <article className={styles.postCard} style={{ padding: '3.5rem' }}>
                        <header className={styles.authorInfo} style={{ marginBottom: '2.5rem' }}>
                                <Avatar 
                                    name={post.profiles?.full_name} 
                                    size="large" 
                                    status="academic"
                                />
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                                        {post.profiles?.full_name || 'Anonymous Student'}
                                    </h2>
                                    <Sparkles size={18} className="text-secondary" />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {post.profiles?.department || 'Verified Scholar'}
                                    </span>
                                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--surface-border)' }}></span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500 }}>
                                        {new Date(post.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--primary-glow)', borderRadius: 'var(--radius-full)', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                                    <ShieldCheck size={16} />
                                    Institutional Verified
                                </div>
                            </div>
                        </header>

                        <div className={styles.postContent} style={{ fontSize: '1.35rem', lineHeight: '1.7', marginBottom: '3rem', color: 'var(--foreground)', fontWeight: 450 }}>
                            {post.content}
                        </div>

                        <div className={styles.postActions} style={{ paddingTop: '2rem' }}>
                            <Button variant="ghost" size="medium">
                                <Heart size={20} />
                                <span>Like • 24</span>
                            </Button>
                            <Button variant="ghost" size="medium">
                                <MessageCircle size={20} />
                                <span>Comments • 12</span>
                            </Button>
                            <Button variant="ghost" size="medium" style={{ marginLeft: 'auto' }}>
                                <Share2 size={20} />
                                <span>Share Discussion</span>
                            </Button>
                        </div>
                    </article>

                    {/* Placeholder for Comments Section */}
                    <div style={{ marginTop: '3rem' }} className="animate-slide-up stagger-2">
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
                            Join the Conversation
                        </h3>
                        <div className={styles.postCard} style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <Avatar name="You" size="small" />
                            <textarea 
                                placeholder="Add your thoughts..." 
                                style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.5rem', fontSize: '1rem', resize: 'none', color: 'var(--foreground)', minHeight: '80px', outline: 'none' }}
                            ></textarea>
                            <Button size="small">Reply</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
