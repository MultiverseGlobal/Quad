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
            <div className={styles.headerTop}>
              <div className={styles.headerInfo}>
                <h1 className={styles.headerTitle}>Launchpad</h1>
                <p className={styles.headerSub}>Find exclusive campus gigs and high-impact internships.</p>
              </div>
              <Link href="/opportunities/new">
                <Button variant="primary" size="large">
                  <Briefcase size={20} fill="currentColor" />
                  Post an Opening
                </Button>
              </Link>
            </div>
            
            <div className={styles.filterArea}>
              <form action="/opportunities" className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
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
          </header>

          <div className={styles.jobGrid}>
            {jobs && jobs.length > 0 ? (
              jobs.map((job, i) => (
                <article key={job.id} className={styles.jobCard}>
                  <div className={styles.cardHeader}>
                    <Avatar name={job.company} size="large" />
                  </div>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.companyName}>{job.company}</div>
                  
                  <div className={styles.tags}>
                    <div className={`${styles.tag} ${styles[job.type?.toLowerCase() || 'gig']}`}>
                      {job.type || 'Gig'}
                    </div>
                    <div className={styles.tag}><MapPin size={14} /> {job.location || 'Remote'}</div>
                    <div className={styles.tag}><DollarSign size={14} /> {job.salary || 'Varies'}</div>
                  </div>

                  <div className={styles.cardFooter}>
                    <Link href={`/opportunities/${job.id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="outline" size="small" style={{ width: '100%' }}>View Brief</Button>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className={styles.emptyState}>
                <Briefcase size={48} strokeWidth={1} />
                <p>No opportunities found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
        </>
    );
}
