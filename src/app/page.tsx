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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className={`${styles.hero} animate-slide-up`}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>Exclusive to Veritas University Abuja</span>
          </div>
          <h1 className={styles.title}>
            Your Campus.<br />Your World.
          </h1>
          <p className={styles.subtitle}>
            The exclusive community for Nigerian students. Connect with your department,
            explore opportunities, and link your Loops shop to your academic profile.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/auth/signup">
              <Button size="large">
                Join the Quad
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="secondary" size="large">Explore Community</Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features} id="features">
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 900, color: 'var(--primary)' }}>
              Built for the modern student
            </h2>

            <div className={styles.featureGrid}>
              <div className="animate-slide-up stagger-1">
                <FeatureCard
                  icon={<Users size={24} />}
                  title="Departmental Feeds"
                  description="Connect with peers in your department. Share notes, discuss projects, and stay updated on departmental news."
                />
              </div>
              <div className="animate-slide-up stagger-2">
                <FeatureCard
                  icon={<ShoppingBag size={24} />}
                  title="Loops Integration"
                  description="Are you a campus vendor? Link your Loops shop directly to your Quad profile and reach more students."
                />
              </div>
              <div className="animate-slide-up stagger-3">
                <FeatureCard
                  icon={<Briefcase size={24} />}
                  title="Opportunities Board"
                  description="Find internships, campus gigs, and entry-level jobs curated specifically for your field of study."
                />
              </div>
              <div className="animate-slide-up stagger-1">
                <FeatureCard
                  icon={<ShieldCheck size={24} />}
                  title="Verified Profiles"
                  description="An exclusive network for verified Nigerian students. Every member is authenticated via their matriculation number."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  );
}
