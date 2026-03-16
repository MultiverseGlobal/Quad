import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { createPost } from '../actions';
import styles from '../community.module.css';

export default function NewPostPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <>
            <Navbar />
            <div className={styles.feed} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div className={styles.postCard} style={{ padding: '2.5rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                            Start a Discussion
                        </h1>
                        {searchParams?.error && (
                            <div style={{ padding: '1rem', background: '#ff000010', color: 'var(--error)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid #ff000020' }}>
                                {searchParams.error}
                            </div>
                        )}
                        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
                            Share your thoughts, ask a question, or post an update for your university community.
                        </p>
                        
                        <form action={createPost} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <textarea 
                                name="content" 
                                placeholder="What's happening in your department?" 
                                rows={6}
                                required
                                style={{ 
                                    padding: '1.2rem', 
                                    borderRadius: 'var(--radius-md)', 
                                    border: '1px solid var(--surface-border)', 
                                    background: 'var(--background)', 
                                    resize: 'none', 
                                    fontFamily: 'inherit',
                                    fontSize: '1.1rem'
                                }}
                            />
                            
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Button type="submit" style={{ flex: 2 }}>Post to Feed</Button>
                                <Button variant="ghost" type="button" style={{ flex: 1, border: '1px solid var(--surface-border)' }}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
