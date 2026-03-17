'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOpportunity(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Not authenticated');

    const title = formData.get('title') as string;
    const company = formData.get('company') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const link = formData.get('link') as string;

    const { error } = await supabase
        .from('opportunities')
        .insert({
            title,
            company,
            type,
            description,
            link,
            author_id: user.id
        });

    if (error) {
        console.error('Error creating opportunity:', error);
        return redirect(`/opportunities/new?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath('/opportunities');
    revalidatePath('/dashboard');
    redirect('/opportunities');
}
