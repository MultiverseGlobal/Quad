import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import styles from "./page.module.css";
import {
  Users,
  ShoppingBag,
  Sparkles,
  Briefcase,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

import {
  Users,
  Sparkles,
  Briefcase,
  ArrowRight,
  GraduationCap,
  TrendingUp
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="animate-fade-in">
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>The Professional Network for Veritas Scholars</span>
          </div>
          <h1 className={`${styles.title} animate-slide-up stagger-1`}>
            The <span className={styles.highlight}>LinkedIn</span> of <br /> Campus Life
          </h1>
          <p className={`${styles.subtitle} animate-slide-up stagger-2`}>
            The only place where your academic achievements meet professional opportunities. 
            Connect with peers, find gigs, and showcase your Veritas journey.
          </p>
          <div className={`${styles.ctaGroup} animate-slide-up stagger-3`}>
            <Link href="/auth/signup">
              <Button size="large">
                Join the Quad
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" size="large">Explore Feed</Button>
            </Link>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className={styles.features}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>Empowering Your Journey</h2>
            <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem', fontSize: '1.1rem' }}>
              Everything you need to thrive in your department and beyond.
            </p>
            
            <div className={styles.featureGrid}>
              <div className={`${styles.featureCard} ${styles['grid-main']} animate-slide-up stagger-1`}>
                <div className={styles.iconWrapper}><Users size={28} /></div>
                <h3 className={styles.featureTitle}>Scholars' Network</h3>
                <p className={styles.featureDesc}>
                  Connect with students across all departments. Build your professional circle before you graduate. 
                  Share insights and collaborate on campus-wide initiatives.
                </p>
                <div className={styles.decorContainer}>
                    <Users size={160} strokeWidth={0.5} />
                </div>
              </div>

              <div className={`${styles.featureCard} ${styles['grid-side']} animate-slide-up stagger-2`}>
                <div className={styles.iconWrapper}><Briefcase size={28} /></div>
                <h3 className={styles.featureTitle}>Gigs & Jobs</h3>
                <p className={styles.featureDesc}>
                  Exclusive opportunities tailored to Veritas students. Find your next internship or side gig.
                </p>
                <div className={styles.decorContainer}>
                    <TrendingUp size={120} strokeWidth={0.5} />
                </div>
              </div>

              <div className={`${styles.featureCard} ${styles['grid-half']} animate-slide-up stagger-3`}>
                <div className={styles.iconWrapper}><GraduationCap size={28} /></div>
                <h3 className={styles.featureTitle}>Academic Pulse</h3>
                <p className={styles.featureDesc}>
                  Stay updated with your department's heartbeat. Share resources, collaborate on projects, and lead the conversation.
                </p>
              </div>

              <div className={`${styles.featureCard} ${styles['grid-half']} animate-slide-up stagger-1`}>
                <div className={styles.iconWrapper}><Sparkles size={28} /></div>
                <h3 className={styles.featureTitle}>Loops Marketplace</h3>
                <p className={styles.featureDesc}>
                  The first campus-first marketplace. Buy and sell with trusted peers in a secure, student-only environment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
