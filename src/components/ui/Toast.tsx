'use client';

import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import { X, CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export type ToastType = 'success' | 'error' | 'info' | 'connection';

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
    message, 
    type = 'info', 
    duration = 5000, 
    onClose 
}) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(onClose, 300); // Match CSS animation duration
    };

    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        info: <Info size={20} />,
        connection: <Sparkles size={20} />
    };

    return (
        <div className={clsx(styles.toast, styles[type], isExiting && styles.exit)}>
            <div className={styles.icon}>{icons[type]}</div>
            <p className={styles.message}>{message}</p>
            <button className={styles.closeBtn} onClick={handleClose}>
                <X size={16} />
            </button>
        </div>
    );
};
