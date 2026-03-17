'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function toggleFollow(targetUserId: string, isFollowing: boolean) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Authentication required');

    if (isFollowing) {
        // Unfollow
        const { error } = await supabase
            .from('connections')
            .delete()
            .match({ follower_id: user.id, following_id: targetUserId });
            
        if (error) throw error;
    } else {
        // Follow
        const { error } = await supabase
            .from('connections')
            .insert({ follower_id: user.id, following_id: targetUserId });
            
        if (error) throw error;
    }

    revalidatePath('/network');
    revalidatePath('/dashboard');
    revalidatePath('/profile');
}
