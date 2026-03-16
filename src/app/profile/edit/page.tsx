import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { updateProfile } from '../actions';
import styles from '../profile.module.css';

export default async function EditProfilePage({ searchParams }: { searchParams: { error?: string } }) {
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
                <div className="container" style={{ maxWidth: '600px' }}>
                    <div className={styles.contentCard} style={{ padding: '2.5rem' }}>
                        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
                            Personalize Your Profile
                        </h1>
                        {searchParams?.error && (
                            <div style={{ padding: '1rem', background: '#ff000010', color: 'var(--error)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid #ff000020' }}>
                                {searchParams.error}
                            </div>
                        )}
                        <form action={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Full Name</label>
                                <input 
                                    name="fullName" 
                                    defaultValue={profile?.full_name} 
                                    placeholder="Your Display Name" 
                                    className={styles.inputField} 
                                    style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--background)' }}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Bio</label>
                                <textarea 
                                    name="bio" 
                                    defaultValue={profile?.bio} 
                                    placeholder="Tell the campus about yourself..." 
                                    rows={4}
                                    style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--background)', resize: 'none', fontFamily: 'inherit' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Academic Level</label>
                                    <select 
                                        name="level" 
                                        defaultValue={profile?.level || '100L'}
                                        style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--background)' }}
                                    >
                                        <option value="100L">100L</option>
                                        <option value="200L">200L</option>
                                        <option value="300L">300L</option>
                                        <option value="400L">400L</option>
                                        <option value="500L">500L</option>
                                        <option value="Graduate">Graduate</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Loops Shop URL (Optional)</label>
                                    <input 
                                        name="loops_shop_url" 
                                        defaultValue={profile?.loops_shop_url} 
                                        placeholder="loops.com/shop/yourname"
                                        className={styles.inputField}
                                        style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--background)' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <Button type="submit" style={{ flex: 1 }}>Save Changes</Button>
                                <Button variant="ghost" type="button" style={{ flex: 1, border: '1px solid var(--surface-border)' }}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
