import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from '../opportunities.module.css';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';
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
            <div className={styles.opportunities}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <Link href="/opportunities" className={styles.backLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: 600 }}>
                        <ArrowLeft size={16} />
                        Back to Opportunities
                    </Link>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
                        <main>
                            <div className={styles.jobCard} style={{ padding: '2.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <Avatar name={job.company} size="large" />
                                    <div className={`${styles.tag} ${styles[job.type?.toLowerCase() || 'gig']}`}>
                                        {job.type || 'Gig'}
                                    </div>
                                </div>

                                <h1 className={styles.jobTitle} style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                    {job.title}
                                </h1>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {job.company}
                                    </span>
                                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--surface-border)' }}></span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--muted)', fontSize: '0.85rem' }}>
                                        <MapPin size={14} />
                                        {job.location || 'Remote / Campus'}
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '1.25rem', background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)', marginBottom: '2.5rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Compensation</div>
                                        <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>{job.salary || 'Competitive'}</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Posted</div>
                                        <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>{new Date(job.created_at).toLocaleDateString()}</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Type</div>
                                        <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>{job.type || 'Flexible'}</div>
                                    </div>
                                </div>

                                <div className={styles.description}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
                                        Role Description
                                    </h3>
                                    <div style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--foreground)' }}>
                                        {job.description || "No detailed description provided."}
                                    </div>
                                </div>
                            </div>
                        </main>

                        <aside style={{ position: 'sticky', top: '5rem' }}>
                            <div className={styles.jobCard}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
                                    Ready to Apply?
                                </h3>
                                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                    Your professional profile will be shared with the recruiter.
                                </p>
                                <Button style={{ width: '100%' }}>
                                    Apply Now
                                    <ChevronRight size={16} />
                                </Button>
                                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--surface-border)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: 700, fontSize: '0.8rem' }}>
                                        <CheckCircle size={14} />
                                        12 Students Applied
                                    </div>
                                </div>
                            </div>

                            <div className={styles.jobCard} style={{ marginTop: '1rem' }}>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                    About the Poster
                                </h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Avatar name={job.company} size="medium" />
                                    <div>
                                        <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>Institutional HR</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Veritas University</div>
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
