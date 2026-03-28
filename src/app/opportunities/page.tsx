import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './opportunities.module.css';
import { Avatar } from '@/components/ui/Avatar';
import { createClient } from '@/lib/supabase/server';
import { Search, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default async function OpportunitiesPage({ searchParams }: { searchParams: Promise<{ query?: string, type?: string }> }) {
    const params = await searchParams;
    const query = params.query || '';
    const typeFilter = params.type || 'All';

    const supabase = await createClient();
    
    let baseQuery = supabase
        .from('opportunities')
        .select('*');

    if (query) {
        baseQuery = baseQuery.or(`title.ilike.%${query}%,company.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (typeFilter && typeFilter !== 'All') {
        baseQuery = baseQuery.eq('type', typeFilter);
    }

    const { data: jobs } = await baseQuery.order('created_at', { ascending: false });

    const categories = ['All', 'Internship', 'Job', 'Gig', 'Event'];

    return (
        <>
            <Navbar />
            <div className={styles.opportunities}>
                <div className="container">
                    <header className={styles.header}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            <div>
                                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Opportunity Board</h1>
                                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                                    Find the perfect launchpad for your career while you study.
                                </p>
                            </div>
                            <Link href="/opportunities/new" style={{ textDecoration: 'none' }}>
                                <Button>
                                    <Briefcase size={18} />
                                    Post an Opening
                                </Button>
                            </Link>
                        </div>
                        
                        <div className={styles.filterArea}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                <form action="/opportunities" className={styles.searchBox}>
                                    <Search size={16} className={styles.searchIcon} />
                                    <input 
                                        name="query" 
                                        type="text" 
                                        defaultValue={query} 
                                        className={styles.searchInput} 
                                        placeholder="Search by role, company, or skill..." 
                                    />
                                    {typeFilter !== 'All' && <input type="hidden" name="type" value={typeFilter} />}
                                </form>

                                <div className={styles.tabs}>
                                    {categories.map(cat => (
                                        <Link 
                                            key={cat} 
                                            href={`/opportunities?type=${cat}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                                            className={`${styles.tab} ${typeFilter === cat ? styles.activeTab : ''}`}
                                        >
                                            {cat}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className={styles.jobGrid}>
                        {jobs && jobs.length > 0 ? (
                            jobs.map((job, i) => (
                                <div 
                                    key={i} 
                                    className={styles.jobCard}
                                >
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <Avatar name={job.company} size="medium" />
                                    </div>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <div className={styles.companyName}>{job.company}</div>
                                    
                                    <div className={styles.tags}>
                                        <div className={`${styles.tag} ${styles[job.type?.toLowerCase() || 'gig']}`}>
                                            {job.type || 'Gig'}
                                        </div>
                                        <div className={styles.tag}><MapPin size={12} /> {job.location || 'Remote'}</div>
                                        <div className={styles.tag}><DollarSign size={12} /> {job.salary || 'Competitive'}</div>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--surface-border)' }}>
                                        <Link href={`/opportunities/${job.id}`} style={{ textDecoration: 'none' }}>
                                            <Button variant="outline" style={{ width: '100%' }}>View Brief</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <Briefcase size={32} />
                                <p style={{ fontWeight: 600, marginTop: '1rem' }}>No opportunities found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
