import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from './opportunities.module.css';
import { createClient } from '@/lib/supabase/server';
import { Search, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default async function OpportunitiesPage({ searchParams }: { searchParams: { query?: string, type?: string } }) {
    const supabase = await createClient();
    
    const query = searchParams.query || '';
    const typeFilter = searchParams.type || 'All';

    let baseQuery = supabase
        .from('opportunities')
        .select('*');

    if (query) {
        baseQuery = baseQuery.or(`title.ilike.%${query}%,company.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (typeFilter !== 'All') {
        baseQuery = baseQuery.eq('type', typeFilter);
    }

    const { data: jobs, error } = await baseQuery.order('created_at', { ascending: false });

    const categories = ['All', 'Internship', 'Job', 'Gig', 'Event'];

    return (
        <>
            <Navbar />
            <div className={styles.opportunities}>
                <div className="container">
                    <header className={styles.header}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2rem' }}>
                            <div>
                                <h1 className="animate-slide-up">Opportunity Board</h1>
                                <p className="animate-slide-up stagger-1">Find the perfect launchpad for your career while you study.</p>
                            </div>
                            <Link href="/opportunities/new">
                                <Button>Post Opportunity</Button>
                            </Link>
                        </div>
                        
                        <div className={`${styles.filterArea} animate-slide-up stagger-2`}>
                            <form className={styles.searchBox}>
                                <input name="query" type="text" defaultValue={query} className={styles.searchInput} placeholder="Search positions..." />
                                <Button type="submit">
                                    <Search size={20} />
                                </Button>
                            </form>

                            <div className={styles.tabs}>
                                {categories.map(cat => (
                                    <Link 
                                        key={cat} 
                                        href={`/opportunities?type=${cat}${query ? `&query=${query}` : ''}`}
                                        className={`${styles.tab} ${typeFilter === cat ? styles.activeTab : ''}`}
                                    >
                                        {cat}
                                    </Link>
                                ))}
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
                                    <div className={styles.companyLogo}>{job.company?.[0] || 'O'}</div>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <div className={styles.companyName}>{job.company}</div>
                                    
                                    <div className={styles.tags}>
                                        <div className={`${styles.tag} ${styles[job.type?.toLowerCase() || 'gig']}`}>
                                            {job.type || 'Gig'}
                                        </div>
                                        <div className={styles.tag}><MapPin size={14} /> Campus</div>
                                        <div className={styles.tag}><DollarSign size={14} /> Competitive</div>
                                    </div>

                                    <div style={{ marginTop: 'auto' }}>
                                        <Button variant="outline" style={{ width: '100%' }}>View Details & Apply</Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.jobCard} style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                                <Briefcase size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.2 }} />
                                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>No opportunities posted yet</h3>
                                <p style={{ color: 'var(--muted)' }}>Check back later for new internships and campus gigs.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
