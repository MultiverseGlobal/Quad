import { NavLink } from './NavLink';
import { Button } from '../ui/Button';
import styles from './Navbar.module.css';
import { GraduationCap, User as UserIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';
import Link from 'next/link';

export async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <GraduationCap size={28} className="text-secondary" strokeWidth={2.5} />
                    <span>Quad</span>
                </Link>

                <div className={styles.navLinks}>
                    <NavLink href="/community">Feed</NavLink>
                    <NavLink href="/network">Network</NavLink>
                    <NavLink href="/opportunities">Opportunities</NavLink>
                    <div style={{ position: 'relative' }}>
                        <NavLink href="/messages">Briefs</NavLink>
                        {user && (
                            <UnreadDot userId={user.id} />
                        )}
                    </div>
                </div>

                <div className={styles.actions}>
                    {user ? (
                        <>
                            <Link href="/profile">
                                <Button variant="ghost">
                                    <UserIcon size={18} />
                                    Profile
                                </Button>
                            </Link>
                            <form action={signOut}>
                                <Button variant="secondary">Sign Out</Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost">Sign In</Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button>Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

async function UnreadDot({ userId }: { userId: string }) {
    const supabase = await createClient();
    const { count } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', userId)
        .eq('is_read', false);

    if (!count || count === 0) return null;

    return (
        <div className={styles.unreadDot} />
    );
}
