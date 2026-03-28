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
          <div className={styles.categoryBadge}>
            <Sparkles size={14} className="text-secondary" />
            <span>The Campus Pulse for Veritas Scholars</span>
          </div>
          <h1 className={`${styles.title} animate-slide-up`}>
            Connect. Create. <br /> <span className={styles.highlight}>Conquer.</span>
          </h1>
          <p className={`${styles.subtitle} animate-slide-up stagger-1`}>
            Quad is the high-energy heart of campus life. Discover exclusive department gigs, 
            connect with your squad, and build a legacy that actually matters.
          </p>
          <div className={`${styles.ctaGroup} animate-slide-up stagger-2`}>
            <Link href="/auth/signup">
              <Button size="large" className={styles.mainCta}>
                Join the Squad
                <Zap size={18} fill="currentColor" />
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" size="large">See What's Trending</Button>
            </Link>
          </div>
        </section>

        {/* Bento Grid Features - Vibrant & Student-Centric */}
        <section className={styles.features}>
          <div className="container">
            <header className={styles.sectionHeader}>
                <h2 className={styles.featureGridTitle}>Built for Your Best Years</h2>
                <p className={styles.featureGridSub}>
                  Everything you need to navigate campus life like a pro. Verified, vibrant, and built for you.
                </p>
            </header>
            
            <div className={styles.featureGrid}>
              <article className={`${styles.featureCard} ${styles['grid-main']} animate-slide-up`}>
                <div className={styles.iconBox}><Users size={24} /></div>
                <h3 className={styles.cardTitle}>Find Your Squad</h3>
                <p className={styles.cardDesc}>
                  The most powerful student directory. Find peers in your department, mentors in your field, 
                  and friends for the weekend. Verified students only.
                </p>
                <div className={styles.decorVisual}>
                    <Users size={200} strokeWidth={0.5} className={styles.decorIcon} />
                </div>
              </article>

              <article className={`${styles.featureCard} ${styles['grid-side']} animate-slide-up stagger-1`}>
                <div className={styles.iconBox}><TrendingUp size={24} /></div>
                <h3 className={styles.cardTitle}>Launch Your Career</h3>
                <p className={styles.cardDesc}>
                  Exclusive campus gigs and high-impact internships. Get paid to be brilliant.
                </p>
                <div className={styles.decorVisual}>
                    <Briefcase size={160} strokeWidth={0.5} className={styles.decorIcon} />
                </div>
              </article>

              <article className={`${styles.featureCard} ${styles['grid-half']} animate-slide-up stagger-2`}>
                <div className={styles.iconBox}><Zap size={24} /></div>
                <h3 className={styles.cardTitle}>Pulse Feed</h3>
                <p className={styles.cardDesc}>
                  Real-time departmental discussions. Know what's happening before it's official.
                </p>
              </article>

              <article className={`${styles.featureCard} ${styles['grid-half']} animate-slide-up stagger-3`}>
                <div className={styles.iconBox}><ShoppingBag size={24} /></div>
                <h3 className={styles.cardTitle}>Student Market</h3>
                <p className={styles.cardDesc}>
                  Buy, sell, and trade within the campus community. Safe, simple, and student-first.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
