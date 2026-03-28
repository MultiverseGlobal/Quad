import Link from 'next/link';
import { GraduationCap, Github, Twitter, Linkedin, Mail, Zap, Sparkles } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Sparkles size={32} fill="currentColor" style={{ color: 'var(--secondary)' }} />
              <span>Quad</span>
            </div>
            <p className={styles.tagline}>
              The high-energy engine for Veritas Scholars. 
              Join the squad. Build your pulse. Conquer campus together.
            </p>
            <div className={styles.socials}>
              <Link href="#" aria-label="Twitter"><Twitter size={20} /></Link>
              <Link href="#" aria-label="Linkedin"><Linkedin size={20} /></Link>
              <Link href="#" aria-label="Github"><Github size={20} /></Link>
              <Link href="#" aria-label="Mail"><Mail size={20} /></Link>
            </div>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>The Squad</h4>
              <Link href="/community">The Word</Link>
              <Link href="/network">Peer Network</Link>
              <Link href="/profile">Your Page</Link>
              <Link href="/messages">Pings</Link>
            </div>
            
            <div className={styles.column}>
              <h4>The Gig</h4>
              <Link href="/opportunities">Plays</Link>
              <Link href="/loops">Marketplace</Link>
              <Link href="#">Verified Skills</Link>
              <Link href="#">Analytics</Link>
            </div>
            
            <div className={styles.column}>
              <h4>University</h4>
              <Link href="#">VUA Portal</Link>
              <Link href="#">Department</Link>
              <Link href="#">Safety Net</Link>
              <Link href="#">Support</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Quad for Veritas Scholars. Built with energy.
          </div>
          <div className={styles.badges}>
            <div className={styles.vibrantBadge}>
              <Zap size={14} fill="currentColor" />
              <span>Scholar Verified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
