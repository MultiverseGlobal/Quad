'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const matricNumber = formData.get('matricNumber') as string;
    const department = formData.get('department') as string;

    // Email Domain Validation (Veritas University Abuja)
    const allowedTestingEmails = ['multiverseglobals@gmail.com'];
    if (!email.endsWith('@veritas.edu.ng') && !allowedTestingEmails.includes(email)) {
        return redirect('/auth/signup?error=Only @veritas.edu.ng email addresses are allowed.');
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                matric_number: matricNumber,
                department,
            },
        },
    });

    if (authError) {
        return redirect(`/auth/signup?error=${encodeURIComponent(authError.message)}`);
    }

    if (authData.user) {
        // Manually create profile in case triggers are not set up
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: authData.user.id,
                full_name: fullName,
                matric_number: matricNumber,
                department,
                level: '100L', // Default
                updated_at: new Date().toISOString(),
            });

        if (profileError) {
            console.error('Error creating profile:', profileError);
            // We don't necessarily want to block signup if profile creation fails, 
            // but the dashboard might break. Better to have it.
        }
    }

    return redirect('/auth/verify-email');
}

export async function login(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
    }

    return redirect('/dashboard');
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect('/');
}
