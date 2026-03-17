import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'subtle' | 'outline';
    size?: 'small' | 'normal' | 'large';
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'normal',
    className,
    children,
    ...props
}: ButtonProps) {
    const combinedClasses = twMerge(
        clsx(
            styles.button,
            styles[variant],
            size === 'large' && styles.large,
            size === 'small' && styles.small,
            className
        )
    );

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
