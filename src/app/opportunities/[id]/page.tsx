import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from '../opportunities.module.css';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { 
    Briefcase, 
    MapPin, 
    Clock, 
    DollarSign, 
    ArrowLeft,
    CheckCircle,
    Building2,
    Calendar,
    ChevronRight
} from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data: job } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .single();

    if (!job) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <div className={styles.opportunities} style={{ paddingTop: '8rem' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <Link href="/opportunities" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '2.5rem', fontWeight: 600, transition: 'color 0.2s' }} className={styles.backLink}>
                        <ArrowLeft size={18} />
                        Back to Opportunities
                    </Link>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.5rem', alignItems: 'start' }}>
                        <main className="animate-slide-up">
                            <div className={styles.jobCard} style={{ padding: '3.5rem', marginBottom: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                    <div className={styles.companyLogo} style={{ width: '5rem', height: '5rem', fontSize: '2rem', margin: 0 }}>
                                        {job.company?.[0] || 'O'}
                                    </div>
                                    <div className={`${styles.tag} ${styles[job.type?.toLowerCase() || 'gig']}`} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                        {job.type || 'Gig'}
                                    </div>
                                </div>

                                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'var(--font-display)', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                                    {job.title}
                                </h1>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {job.company}
                                    </span>
                                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--surface-border)' }}></span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontWeight: 500 }}>
                                        <MapPin size={16} />
                                        {job.location || 'Remote / Campus'}
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', padding: '2rem', background: 'var(--surface-muted)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--surface-border)', marginBottom: '3rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Compensation</div>
                                        <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                            <DollarSign size={18} />
                                            {job.salary || 'Competitive'}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Posted Date</div>
                                        <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                            <Calendar size={18} />
                                            {new Date(job.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Role Type</div>
                                        <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                            <Clock size={18} />
                                            {job.type || 'Flexible'}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.description}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
                                        Role Description
                                    </h3>
                                    <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--foreground)', fontWeight: 450 }}>
                                        {job.description || "No detailed description provided. Please reach out to the poster for more information about this role."}
                                    </div>
                                </div>
                            </div>
                        </main>

                        <aside className="animate-slide-up stagger-1" style={{ position: 'sticky', top: '8rem' }}>
                            <div className={styles.jobCard} style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
                                    Ready to Apply?
                                </h3>
                                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                                    Your professional Quad profile will be shared with the recruiter.
                                </p>
                                <Button size="large" style={{ width: '100%', padding: '1.25rem' }}>
                                    Apply with Profile
                                    <ChevronRight size={18} />
                                </Button>
                                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--surface-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--secondary)', fontWeight: 700, fontSize: '0.85rem' }}>
                                        <CheckCircle size={16} />
                                        12 Students Applied
                                    </div>
                                </div>
                            </div>

                            <div className={styles.jobCard} style={{ padding: '2rem', marginTop: '1.5rem' }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                                    About the Poster
                                </h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Avatar name={job.company} size="medium" verified={false} />
                                    <div>
                                        <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>Institutional HR</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Veritas University</div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
