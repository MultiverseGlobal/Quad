import Link from 'next/link';
import { Button } from '../ui/Button';
import styles from './Navbar.module.css';
import { GraduationCap, User as UserIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';

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
                    <Link href="/community" className={styles.link}>Feed</Link>
                    <Link href="/opportunities" className={styles.link}>Opportunities</Link>
                    <Link href="/profile" className={styles.link}>Marketplace</Link>
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
