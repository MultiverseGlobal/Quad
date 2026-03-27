'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function sendMessage(receiverId: string, content: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Authentication required');
    if (!content.trim()) return;

    const { error } = await supabase
        .from('messages')
        .insert({
            sender_id: user.id,
            receiver_id: receiverId,
            content: content.trim()
        });

    if (error) throw error;

    revalidatePath(`/messages/${receiverId}`);
    revalidatePath('/messages');
}

export async function markAsRead(messageIds: string[]) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .in('id', messageIds);

    if (error) throw error;
}
