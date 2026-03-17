import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { createPost } from '../actions';
import styles from '../community.module.css';

export default function NewPostPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <>
            <Navbar />
            <div className={`${styles.feed} animate-fade-in`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div className={`${styles.postCard} animate-slide-up`} style={{ padding: '3.5rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', color: 'var(--primary)', fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                            Start a Discussion
                        </h1>
                        {searchParams?.error && (
                            <div style={{ padding: '1rem', background: '#ff000010', color: 'var(--error)', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', border: '1px solid #ff000020', fontWeight: 600 }}>
                                {searchParams.error}
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
                                style={{ 
                                    padding: '1.5rem', 
                                    borderRadius: 'var(--radius-xl)', 
                                    border: '1px solid var(--surface-border)', 
                                    background: 'var(--surface-muted)', 
                                    resize: 'none', 
                                    fontFamily: 'inherit',
                                    fontSize: '1.15rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                                    color: 'var(--foreground)'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--primary)';
                                    e.target.style.background = 'var(--surface)';
                                    e.target.style.boxShadow = '0 0 0 3px var(--border-focus)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'var(--surface-border)';
                                    e.target.style.background = 'var(--surface-muted)';
                                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)';
                                }}
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
