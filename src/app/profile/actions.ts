'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Not authenticated');
    }

    const fullName = formData.get('fullName') as string;
    const bio = formData.get('bio') as string;
    const level = formData.get('level') as string;
    const loops_shop_url = formData.get('loops_shop_url') as string;

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name: fullName,
            bio,
            level,
            loops_shop_url,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

    if (error) {
        return redirect(`/profile/edit?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath('/profile');
    revalidatePath('/dashboard');
    redirect('/profile');
}
