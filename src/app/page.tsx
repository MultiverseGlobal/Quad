import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import styles from "./page.module.css";
import {
  Users,
  ShoppingBag,
  Sparkles,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  TrendingUp,
  Globe,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="animate-fade-in">
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>Campus Infrastructure for Veritas Scholars</span>
          </div>
          <h1 className={`${styles.title} animate-slide-up stagger-1`}>
            The <span className={styles.highlight}>Professional Pulse</span> <br /> of Campus Life
          </h1>
          <p className={`${styles.subtitle} animate-slide-up stagger-2`}>
            Quad is the definitive institutional network for Veritas University. 
            Connect with peers, discover exclusive opportunities, and build your scholarly legacy.
          </p>
          <div className={`${styles.ctaGroup} animate-slide-up stagger-3`}>
            <Link href="/auth/signup">
              <Button size="large">
                Create Scholar Account
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" size="large">Explore Pulse Feed</Button>
            </Link>
          </div>
        </section>

        {/* Bento Grid Features - Redefined for Infrastructure Feel */}
        <section className={styles.features}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>Built for the Modern Scholar</h2>
                <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
                  A unified platform designed to accelerate your academic and professional journey within the Veritas ecosystem.
                </p>
            </div>
            
            <div className={styles.featureGrid}>
              <div className={`${styles.featureCard} ${styles['grid-main']} animate-slide-up stagger-1`}>
                <div className={styles.iconWrapper}><Globe size={24} /></div>
                <h3 className={styles.featureTitle}>The Scholars' Network</h3>
                <p className={styles.featureDesc}>
                  Our institutional directory connects you with thousands of verified peers across all departments. 
                  Collaborate, mentor, and be mentored by the best minds on campus.
                </p>
                <div className={styles.decorContainer}>
                    <Users size={180} strokeWidth={0.5} />
                </div>
              </div>

              <div className={`${styles.featureCard} ${styles['grid-side']} animate-slide-up stagger-2`}>
                <div className={styles.iconWrapper}><Briefcase size={24} /></div>
                <h3 className={styles.featureTitle}>Career Launchpad</h3>
                <p className={styles.featureDesc}>
                  Access high-impact internships and campus gigs tailored specifically to your department.
                </p>
                <div className={styles.decorContainer}>
                    <TrendingUp size={140} strokeWidth={0.5} />
                </div>
              </div>

              <div className={`${styles.featureCard} ${styles['grid-half']} animate-slide-up stagger-3`}>
                <div className={styles.iconWrapper}><Zap size={24} /></div>
                <h3 className={styles.featureTitle}>Pulse Engine</h3>
                <p className={styles.featureDesc}>
                  Real-time departmental discussions and campus news. Stay in the loop with what matters in your academic circle.
                </p>
              </div>

              <div className={`${styles.featureCard} ${styles['grid-half']} animate-slide-up stagger-1`}>
                <div className={styles.iconWrapper}><ShoppingBag size={24} /></div>
                <h3 className={styles.featureTitle}>Loops Marketplace</h3>
                <p className={styles.featureDesc}>
                  The first student-first marketplace. Transaction-ready infrastructure for campus commerce and vendor services.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
