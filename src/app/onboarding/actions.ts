'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function completeOnboarding(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect('/auth/login');

    const interests = formData.get('interests') as string;
    const gradYear = formData.get('gradYear') as string;

    const { error } = await supabase
        .from('profiles')
        .update({
            skills: JSON.parse(interests),
            onboarding_completed: true,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

    if (error) {
        console.error('Onboarding Error:', error);
        return { error: error.message };
    }

    revalidatePath('/dashboard');
    revalidatePath('/profile');
    redirect('/dashboard');
}
