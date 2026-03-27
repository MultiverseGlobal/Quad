'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function acceptConnectionRequest(senderId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Authentication required');

    const { error } = await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .match({ follower_id: senderId, following_id: user.id });

    if (error) throw error;

    revalidatePath('/network');
    revalidatePath('/dashboard');
    revalidatePath('/profile');
}

export async function toggleFollow(targetUserId: string, isFollowing: boolean) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Authentication required');

    if (isFollowing) {
        // Remove Connection
        const { error } = await supabase
            .from('connections')
            .delete()
            .or(`and(follower_id.eq.${user.id},following_id.eq.${targetUserId}),and(follower_id.eq.${targetUserId},following_id.eq.${user.id})`);
            
        if (error) throw error;
    } else {
        // Send Connection Request
        const { error } = await supabase
            .from('connections')
            .insert({ 
                follower_id: user.id, 
                following_id: targetUserId,
                status: 'pending' 
            });
            
        if (error) throw error;
    }

    revalidatePath('/network');
    revalidatePath('/dashboard');
    revalidatePath('/profile');
}
