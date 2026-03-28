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
            <div className={styles.profile} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)' }}>
                <div className="container" style={{ maxWidth: '540px' }}>
                    <div className={styles.contentCard}>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 800 }}>
                            Personalize Profile
                        </h1>
                        <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                            Refine your professional identity on the Veritas Scholar Network.
                        </p>

                        {params?.error && (
                            <div style={{ padding: '0.75rem', background: '#ff000008', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid #ff000015', fontWeight: 600, textAlign: 'center', fontSize: '0.85rem' }}>
                                {params.error}
                            </div>
                        )}
                        <form action={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Full Professional Name</label>
                                <input 
                                    name="fullName" 
                                    defaultValue={profile?.full_name} 
                                    placeholder="Your Display Name" 
                                    className={styles.searchInput}
                                    style={{ padding: '0.75rem 1rem' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Professional Bio</label>
                                <textarea 
                                    name="bio" 
                                    defaultValue={profile?.bio} 
                                    placeholder="Tell the campus about your academic goals and interests..." 
                                    rows={4}
                                    className={styles.searchInput}
                                    style={{ padding: '0.75rem 1rem', resize: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Academic Level</label>
                                    <select 
                                        name="level" 
                                        defaultValue={profile?.level || '100L'}
                                        className={styles.searchInput}
                                        style={{ padding: '0.75rem 1rem', background: 'var(--surface-muted)' }}
                                    >
                                        <option value="100L">Freshman (100L)</option>
                                        <option value="200L">Sophomore (200L)</option>
                                        <option value="300L">Junior (300L)</option>
                                        <option value="400L">Senior (400L)</option>
                                        <option value="500L">Super Senior (500L)</option>
                                        <option value="Graduate">Post-Graduate Scholar</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Loops Shop URL</label>
                                    <input 
                                        name="loops_shop_url" 
                                        defaultValue={profile?.loops_shop_url} 
                                        placeholder="loops.com/shop/..."
                                        className={styles.searchInput}
                                        style={{ padding: '0.75rem 1rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <Button type="submit" style={{ flex: 1 }}>Save Profile</Button>
                                <Link href="/profile" style={{ flex: 1, textDecoration: 'none' }}>
                                    <Button variant="outline" type="button" style={{ width: '100%' }}>Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
