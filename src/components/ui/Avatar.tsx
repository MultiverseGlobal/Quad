import React from 'react';
import styles from './Avatar.module.css';
import { Sparkles, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

interface AvatarProps {
  name?: string;
  department?: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  verified?: boolean;
  status?: 'online' | 'academic' | 'none';
  src?: string | null;
  className?: string;
  style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  name = 'User', 
  department, 
  size = 'medium', 
  verified = true,
  status = 'none',
  src,
  className,
  style 
}) => {
  const initial = name[0]?.toUpperCase() || 'U';
  
  return (
    <div 
      className={clsx(styles.wrapper, styles[size], className)} 
      style={style}
      title={`${name}${department ? ` - ${department}` : ''}`}
    >
      <div className={styles.avatar}>
        {src ? (
          <img src={src} alt={name} className={styles.image} />
        ) : (
          initial
        )}
        {status === 'academic' && (
          <div className={styles.academicBadge}>
            <Sparkles size={8} />
          </div>
        )}
      </div>
      
      {verified && size !== 'small' && (
        <div className={styles.verifiedBadge}>
          <ShieldCheck size={size === 'xl' ? 16 : 12} />
        </div>
      )}
      
      {status === 'online' && (
        <div className={styles.onlineIndicator} />
      )}
    </div>
  );
};
