import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'premium' | 'subtle' | 'flat';
    padding?: 'none' | 'small' | 'normal' | 'large';
    children: React.ReactNode;
}

export function Card({
    variant = 'premium',
    padding = 'normal',
    className,
    children,
    ...props
}: CardProps) {
    const combinedClasses = twMerge(
        clsx(
            styles.card,
            styles[variant],
            styles[`padding-${padding}`],
            className
        )
    );

    return (
        <div className={combinedClasses} {...props}>
            {children}
        </div>
    );
}
