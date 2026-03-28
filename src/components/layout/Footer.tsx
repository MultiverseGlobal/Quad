import Link from 'next/link';
import { GraduationCap, Github, Twitter, Linkedin, Mail, Zap } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <GraduationCap size={28} className="text-secondary" />
              <span>Quad</span>
            </div>
            <p className={styles.tagline}>
              The high-energy engine for Veritas Scholars. 
              Join the squad. Build your pulse. Conquer campus.
            </p>
            <div className={styles.socials}>
              <Link href="#"><Twitter size={20} /></Link>
              <Link href="#"><Linkedin size={20} /></Link>
              <Link href="#"><Github size={20} /></Link>
              <Link href="#"><Mail size={20} /></Link>
            </div>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>The Squad</h4>
              <Link href="/community">Campus Pulse</Link>
              <Link href="/network">Peer Network</Link>
              <Link href="/profile">Your Profile</Link>
              <Link href="/messages">Briefs</Link>
            </div>
            
            <div className={styles.column}>
              <h4>The Gig</h4>
              <Link href="/opportunities">Opp Board</Link>
              <Link href="/loops">Marketplace</Link>
              <Link href="#">Verified Skills</Link>
              <Link href="#">Gig Analytics</Link>
            </div>
            
            <div className={styles.column}>
              <h4>Campus</h4>
              <Link href="#">VUA Portal</Link>
              <Link href="#">Dept Life</Link>
              <Link href="#">Safety Box</Link>
              <Link href="#">Admin Chat</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Quad for Veritas University. Built for Scholars.
          </div>
          <div className={styles.badges}>
            <div className={styles.vibrantBadge}>
                <Zap size={14} fill="currentColor" />
                <span>Verification Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
