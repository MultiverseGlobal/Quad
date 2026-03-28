import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { updateProfile } from '../actions';
import styles from '../profile.module.css';

export default async function EditProfilePage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const params = await searchParams;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/auth/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return (
        <>
            <Navbar />
            <div className={`${styles.profile} animate-fade-in`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '10rem 0 6rem' }}>
                <div className="container" style={{ maxWidth: '640px' }}>
                    <div className={`${styles.contentCard} animate-slide-up`} style={{ padding: '3.5rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.25rem', color: 'var(--primary)', fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.03em' }}>
                            Personalize Profile
                        </h1>
                        <p style={{ color: 'var(--muted)', marginBottom: '3rem', fontSize: '1.1rem', fontWeight: 500 }}>
                            Refine your professional identity on the Quad campus network.
                        </p>

                        {params?.error && (
                            <div style={{ padding: '1rem', background: '#ff000010', color: 'var(--error)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', border: '1px solid #ff000020', fontWeight: 600, textAlign: 'center' }}>
                                {params.error}
                            </div>
                        )}
                        <form action={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Full Professional Name</label>
                                <input 
                                    name="fullName" 
                                    defaultValue={profile?.full_name} 
                                    placeholder="Your Display Name" 
                                    style={{ 
                                        padding: '1rem 1.25rem', 
                                        borderRadius: 'var(--radius-lg)', 
                                        border: '1px solid var(--surface-border)', 
                                        background: 'var(--surface-muted)',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        transition: 'all 0.3s ease',
                                        color: 'var(--foreground)'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Professional Bio</label>
                                <textarea 
                                    name="bio" 
                                    defaultValue={profile?.bio} 
                                    placeholder="Tell the campus about your academic goals and interests..." 
                                    rows={4}
                                    style={{ 
                                        padding: '1.25rem', 
                                        borderRadius: 'var(--radius-lg)', 
                                        border: '1px solid var(--surface-border)', 
                                        background: 'var(--surface-muted)', 
                                        resize: 'none', 
                                        fontFamily: 'inherit',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        transition: 'all 0.3s ease',
                                        color: 'var(--foreground)'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Academic Level</label>
                                    <select 
                                        name="level" 
                                        defaultValue={profile?.level || '100L'}
                                        style={{ 
                                            padding: '1rem 1.25rem', 
                                            borderRadius: 'var(--radius-lg)', 
                                            border: '1px solid var(--surface-border)', 
                                            background: 'var(--surface-muted)',
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            appearance: 'none',
                                            color: 'var(--foreground)'
                                        }}
                                    >
                                        <option value="100L">Freshman (100L)</option>
                                        <option value="200L">Sophomore (200L)</option>
                                        <option value="300L">Junior (300L)</option>
                                        <option value="400L">Senior (400L)</option>
                                        <option value="500L">Super Senior (500L)</option>
                                        <option value="Graduate">Post-Graduate Scholar</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Loops Shop URL</label>
                                    <input 
                                        name="loops_shop_url" 
                                        defaultValue={profile?.loops_shop_url} 
                                        placeholder="loops.com/shop/..."
                                        style={{ 
                                            padding: '1rem 1.25rem', 
                                            borderRadius: 'var(--radius-lg)', 
                                            border: '1px solid var(--surface-border)', 
                                            background: 'var(--surface-muted)',
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: 'var(--foreground)'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem' }}>
                                <Button type="submit" size="large" style={{ flex: 1 }}>Save Professional Profile</Button>
                                <Link href="/profile" style={{ flex: 1 }}>
                                    <Button variant="ghost" type="button" style={{ width: '100%', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-lg)' }}>Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
