import { Navbar } from '@/components/layout/Navbar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from '../messages.module.css';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';
import ChatWindow from '../ChatWindow';
import { Sparkles, ChevronLeft } from 'lucide-react';

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: receiverId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect('/auth/login');

    // Fetch receiver profile
    const { data: receiverProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', receiverId)
        .single();

    if (!receiverProfile) redirect('/messages');

    // Fetch initial messages
    const { data: initialMessages } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

    // Fetch threads for sidebar
    const { data: connections } = await supabase
        .from('connections')
        .select(`
            follower_id,
            profiles!connections_follower_id_fkey(id, full_name, department, avatar_url),
            receiver:profiles!connections_following_id_fkey(id, full_name, department, avatar_url)
        `)
        .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`)
        .eq('status', 'accepted');

    const threads = connections?.map(c => {
        const otherUserTarget = c.follower_id === user.id ? c.receiver : c.profiles;
        const otherUser = Array.isArray(otherUserTarget) ? otherUserTarget[0] : otherUserTarget;
        
        return {
            id: otherUser.id,
            name: otherUser.full_name,
            dept: otherUser.department
        };
    }) || [];

    return (
        <>
            <Navbar />
            <div className={styles.messages}>
                <div className="container">
                    <div className={styles.messengerBox}>
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarHeader}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <h2>Direct Briefs</h2>
                                    <Sparkles size={16} className="text-secondary" />
                                </div>
                            </div>
                            <div className={styles.threadList}>
                                {threads.map(thread => (
                                    <Link key={thread.id} href={`/messages/${thread.id}`} className={`${styles.threadItem} ${thread.id === receiverId ? styles.activeThread : ''}`}>
                                        <Avatar name={thread.name} size="medium" />
                                        <div className={styles.threadInfo}>
                                            <div className={styles.threadName}>{thread.name}</div>
                                            <div className={styles.lastMessage}>{thread.dept}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </aside>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <div className={styles.chatHeader}>
                                <Link href="/messages" style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>
                                    <ChevronLeft size={24} />
                                </Link>
                                <Avatar name={receiverProfile.full_name} size="medium" />
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <h3 style={{ fontWeight: 800, color: 'var(--primary)', margin: 0 }}>{receiverProfile.full_name}</h3>
                                        <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></div>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>{receiverProfile.department}</p>
                                </div>
                            </div>
                            
                            <ChatWindow 
                                receiverId={receiverId} 
                                initialMessages={initialMessages || []} 
                                currentUserId={user.id} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
