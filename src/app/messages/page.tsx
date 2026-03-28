import { Navbar } from '@/components/layout/Navbar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './messages.module.css';
import { Avatar } from '@/components/ui/Avatar';
import Link from 'next/link';
import { MessageSquare, Sparkles } from 'lucide-react';

export default async function MessagesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect('/auth/login');

    // Fetch accepted connections to show as possible threads
    const { data: connections } = await supabase
        .from('connections')
        .select(`
            id,
            follower_id,
            following_id,
            status,
            profiles!connections_follower_id_fkey(id, full_name, department, avatar_url),
            receiver:profiles!connections_following_id_fkey(id, full_name, department, avatar_url)
        `)
        .or(`follower_id.eq.${user.id},following_id.eq.${user.id}`)
        .eq('status', 'accepted');

    // Fetch unread message counts for each thread
    const { data: unreadCounts } = await supabase
        .from('messages')
        .select('sender_id')
        .eq('receiver_id', user.id)
        .eq('is_read', false);

    const threads = connections?.map(c => {
        const otherUserTarget = c.follower_id === user.id ? c.receiver : c.profiles;
        const otherUser = Array.isArray(otherUserTarget) ? otherUserTarget[0] : otherUserTarget;
        
        const unreadCount = unreadCounts?.filter(m => m.sender_id === otherUser.id).length || 0;
        return {
            id: otherUser.id,
            name: otherUser.full_name,
            dept: otherUser.department,
            avatar: otherUser.avatar_url,
            unreadCount
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h2>Direct Briefs</h2>
                  <Sparkles size={18} className="text-secondary" />
                </div>
              </div>
              <div className={styles.threadList}>
                {threads.map(thread => (
                  <Link key={thread.id} href={`/messages/${thread.id}`} className={styles.threadItem}>
                    <div style={{ position: 'relative' }}>
                      <Avatar name={thread.name} size="medium" />
                      {thread.unreadCount > 0 && <div className={styles.unreadBadge}>{thread.unreadCount}</div>}
                    </div>
                    <div className={styles.threadInfo}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className={styles.threadName}>{thread.name}</div>
                        {thread.unreadCount > 0 && <Sparkles size={14} className="text-secondary" />}
                      </div>
                      <div className={styles.lastMessage}>{thread.dept}</div>
                    </div>
                  </Link>
                ))}
                {threads.length === 0 && (
                  <div className={styles.emptyChat}>
                    <p>Connect with fellow scholars to start a conversation.</p>
                  </div>
                )}
              </div>
            </aside>
            
            <main className={styles.chatArea}>
              <div className={styles.emptyChat}>
                <div style={{ padding: '2.5rem', background: 'var(--secondary-glow)', borderRadius: 'var(--radius-xl)', color: 'var(--secondary)' }}>
                  <MessageSquare size={48} strokeWidth={1.5} />
                </div>
                <h3>Your Conversations</h3>
                <p>Select a thread to start collaborating with your squad.</p>
              </div>
            </main>
          </div>
        </div>
      </div>
        </>
    );
}
