'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
    const router = useRouter();
    const supabase = createClient();

    supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
            router.push('/dashboard');
        }
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <p>Verifying authentication...</p>
        </div>
    );
}
