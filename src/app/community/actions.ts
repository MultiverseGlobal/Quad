'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Not authenticated');
    }

    const content = formData.get('content') as string;
    
    const { error } = await supabase
        .from('posts')
        .insert({
            author_id: user.id,
            content,
        });

    if (error) {
        return redirect(`/community/new?error=${encodeURIComponent(error.message)}`);
    }

    // Grant Scholar Edge (+10)
    await supabase.rpc('increment_scholar_edge', { 
        target_profile_id: user.id, 
        points: 10 
    });
    
    await supabase.from('edge_history').insert({
        profile_id: user.id,
        action: 'FEED_POST',
        points_awarded: 10
    });

    revalidatePath('/community');
    revalidatePath('/dashboard');
    redirect('/community');
}
