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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                            <div>
                                <h1 className="animate-slide-up">Opportunity Board</h1>
                                <p className="animate-slide-up stagger-1" style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
                                    Find the perfect launchpad for your career while you study.
                                </p>
                            </div>
                            <Link href="/opportunities/new">
                                <Button size="large">
                                    <Briefcase size={20} />
                                    Post an Opening
                                </Button>
                            </Link>
                        </div>
                        
                        <div className={`${styles.filterArea} animate-slide-up stagger-2`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                                <form action="/opportunities" className={styles.searchBox}>
                                    <div className={styles.searchIconWrapper}>
                                        <Search size={20} />
                                    </div>
                                    <input 
                                        name="query" 
                                        type="text" 
                                        defaultValue={query} 
                                        className={styles.searchInput} 
                                        placeholder="Search jobs, companies, or skills..." 
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
                                    className={`${styles.jobCard} animate-slide-up`}
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <Avatar name={job.company} size="medium" />
                                    </div>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <div className={styles.companyName}>{job.company}</div>
                                    
                                    <div className={styles.tags}>
                                        <div className={`${styles.tag} ${styles[job.type?.toLowerCase() || 'gig']}`}>
                                            {job.type || 'Gig'}
                                        </div>
                                        <div className={styles.tag}><MapPin size={14} /> {job.location || 'Remote'}</div>
                                        <div className={styles.tag}><DollarSign size={14} /> {job.salary || 'Competitive'}</div>
                                        <div className={styles.tag}><Clock size={14} /> {new Date(job.created_at).toLocaleDateString()}</div>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--surface-border)' }}>
                                        <Link href={`/opportunities/${job.id}`}>
                                            <Button variant="outline" style={{ width: '100%' }}>View & Apply Now</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.jobCard} style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 2rem' }}>
                                <div style={{ display: 'inline-flex', padding: '2rem', background: 'var(--surface-muted)', borderRadius: 'var(--radius-xl)', color: 'var(--muted)', marginBottom: '2rem' }}>
                                    <Briefcase size={64} />
                                </div>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.75rem', fontWeight: 800 }}>
                                    {query || typeFilter !== 'All' ? 'No opportunities match your search' : 'The board is waiting for you'}
                                </h3>
                                <p style={{ color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', fontSize: '1.2rem' }}>
                                    {query || typeFilter !== 'All' 
                                        ? 'Try widening your search or picking a different category to see more results.' 
                                        : 'Be the first to share an opportunity with your fellow students.'}
                                </p>
                                {(query || typeFilter !== 'All') && (
                                    <Link href="/opportunities" style={{ marginTop: '2.5rem', display: 'inline-block' }}>
                                        <Button variant="outline">Reset All Filters</Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
