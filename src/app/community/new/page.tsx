import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { createPost } from '../actions';
import styles from '../community.module.css';

export default async function NewPostPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const params = await searchParams;
    
    return (
        <>
            <Navbar />
            <div className={`${styles.feed} animate-fade-in`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div className={`${styles.postCard} animate-slide-up`} style={{ padding: '3.5rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', color: 'var(--primary)', fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                            Start a Discussion
                        </h1>
                        {params?.error && (
                            <div style={{ padding: '1rem', background: '#ff000010', color: 'var(--error)', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', border: '1px solid #ff000020', fontWeight: 600 }}>
                                {params.error}
                            </div>
                        )}
                        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: 500 }}>
                            Share your thoughts, ask a question, or post an update for your university community.
                        </p>
                        
                        <form action={createPost} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <textarea 
                                name="content" 
                                placeholder="What's happening in your department?" 
                                rows={6}
                                required
                                className={styles.newPostTextarea}
                            />
                            
                            <div style={{ display: 'flex', gap: '1.25rem' }}>
                                <Button type="submit" size="large" style={{ flex: 2 }}>Post to Community Feed</Button>
                                <Button variant="ghost" type="button" style={{ flex: 1, border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-lg)' }}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
