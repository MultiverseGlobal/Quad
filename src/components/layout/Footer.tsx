import Link from 'next/link';
import { GraduationCap, Github, Twitter, Linkedin, Mail, Sparkles } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <GraduationCap size={24} />
              <span>Quad</span>
            </div>
            <p className={styles.tagline}>
              The first professional network built specifically for the Veritas University ecosystem. 
              Connecting scholars, opportunities, and campus life.
            </p>
            <div className={styles.socials}>
              <Link href="#"><Twitter size={20} /></Link>
              <Link href="#"><Linkedin size={20} /></Link>
              <Link href="#"><Github size={20} /></Link>
            </div>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>Platform</h4>
              <Link href="/community">Community Feed</Link>
              <Link href="/network">Student Directory</Link>
              <Link href="/opportunities">Opportunity Board</Link>
              <Link href="/loops">Loops Marketplace</Link>
            </div>
            
            <div className={styles.column}>
              <h4>Institutional</h4>
              <Link href="#">University Portal</Link>
              <Link href="#">Department Directory</Link>
              <Link href="#">Academic Calendar</Link>
              <Link href="#">Campus Map</Link>
            </div>
            
            <div className={styles.column}>
              <h4>Support</h4>
              <Link href="#">Help Center</Link>
              <Link href="#">Safety & Security</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Contact Admin</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Quad for Veritas University. All rights reserved.
          </div>
          <div className={styles.badges}>
            <div className={styles.badge}>
                <Sparkles size={14} />
                Institutional Verification Active
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
