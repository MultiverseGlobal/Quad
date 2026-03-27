'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Toast, ToastType } from '../ui/Toast';
import { createClient } from '@/lib/supabase/client';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);
    const supabase = createClient();

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Real-time connection request listener
    useEffect(() => {
        const setupListener = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const channel = supabase
                .channel('realtime:connections')
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'connections',
                        filter: `following_id=eq.${user.id}`
                    },
                    async (payload) => {
                        // Fetch the sender's name
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('full_name')
                            .eq('id', payload.new.follower_id)
                            .single();

                        showToast(
                            `${profile?.full_name || 'A student'} wants to connect with you!`, 
                            'connection'
                        );
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        };

        setupListener();
    }, [supabase, showToast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{ position: 'fixed', bottom: 0, right: 0, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 2000 }}>
                {toasts.map(toast => (
                    <Toast 
                        key={toast.id} 
                        message={toast.message} 
                        type={toast.type} 
                        onClose={() => removeToast(toast.id)} 
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
