'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { sendMessage, markAsRead } from './actions';
import styles from './messages.module.css';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
}

interface ChatWindowProps {
    receiverId: string;
    initialMessages: Message[];
    currentUserId: string;
}

export default function ChatWindow({ receiverId, initialMessages, currentUserId }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    useEffect(() => {
        // Mark initial unread messages as read
        const unreadIds = initialMessages
            .filter(m => (m as any).is_read === false && m.sender_id === receiverId)
            .map(m => m.id);
        
        if (unreadIds.length > 0) {
            markAsRead(unreadIds);
        }
    }, [initialMessages, receiverId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Real-time subscription
    useEffect(() => {
        const channel = supabase
            .channel(`chat:${receiverId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                (payload) => {
                    const newMessage = payload.new as Message;
                    
                    if (
                        (newMessage.sender_id === currentUserId && newMessage.receiver_id === receiverId) ||
                        (newMessage.sender_id === receiverId && newMessage.receiver_id === currentUserId)
                    ) {
                        setMessages(prev => {
                            // Prevent duplicates if local state already has it (though usually inserted ids are new)
                            if (prev.find(m => m.id === newMessage.id)) return prev;
                            return [...prev, newMessage];
                        });
                        
                        if (newMessage.sender_id === receiverId) {
                            markAsRead([newMessage.id]);
                        }
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, receiverId, currentUserId]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const content = input;
        setInput('');
        await sendMessage(receiverId, content);
    };

    return (
        <div className={styles.chatArea}>
            <div className={styles.messageList} ref={scrollRef}>
                {messages.map(msg => (
                    <div 
                        key={msg.id} 
                        className={`${styles.messageBubble} ${msg.sender_id === currentUserId ? styles.sent : styles.received}`}
                    >
                        {msg.content}
                        <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.25rem', textAlign: 'right' }}>
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.messageInput}>
                <form onSubmit={handleSend} className={styles.inputWrapper}>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..." 
                    />
                    <Button type="submit" size="small" variant="primary" style={{ padding: '0.5rem 1rem' }}>
                        <Send size={18} />
                    </Button>
                </form>
            </div>
        </div>
    );
}
