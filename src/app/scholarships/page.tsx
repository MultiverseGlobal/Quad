import { Navbar } from '@/components/layout/Navbar';
import { ScholarshipCard } from '@/components/ui/ScholarshipCard';
import styles from './scholarships.module.css';
import { createClient } from '@/lib/supabase/server';
import { Search, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default async function ScholarshipsPage({ searchParams }: { searchParams: Promise<{ query?: string, type?: string }> }) {
    const params = await searchParams;
    const query = params.query || '';
    const typeFilter = params.type || 'All Opportunities';

    const supabase = await createClient();
    
    let baseQuery = supabase
        .from('scholarships')
        .select('*');

    if (query) {
        baseQuery = baseQuery.or(`title.ilike.%${query}%,provider.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (typeFilter && typeFilter !== 'All Opportunities') {
        if (typeFilter === 'Study Abroad') {
            baseQuery = baseQuery.eq('scope', 'International');
        } else if (typeFilter === 'Local Nigerian') {
            baseQuery = baseQuery.eq('scope', 'National');
        } else if (typeFilter === 'Veritas Specific') {
            baseQuery = baseQuery.eq('scope', 'Internal');
        }
    }

    const { data: scholarships } = await baseQuery.order('deadline', { ascending: true }); // sort by upcoming

    const categories = ['All Opportunities', 'Study Abroad', 'Local Nigerian', 'Veritas Specific'];

    return (
        <>
            <Navbar />
            <div className={styles.scholarships}>
                <div className="container">
                    <header className={styles.header}>
                        <div className={styles.headerTop}>
                            <div className={styles.headerInfo}>
                                <h1 className={styles.headerTitle}>Scholarship Explorer</h1>
                                <p className={styles.headerSub}>Discover funding opportunities tailored for Veritas and beyond.</p>
                            </div>
                        </div>
                        
                        <div className={styles.filterArea}>
                            <form action="/scholarships" className={styles.searchBox}>
                                <Search size={18} className={styles.searchIcon} />
                                <input 
                                    name="query" 
                                    type="text" 
                                    defaultValue={query} 
                                    className={styles.searchInput} 
                                    placeholder="Search by title, provider, or keywords..." 
                                />
                                {typeFilter !== 'All Opportunities' && <input type="hidden" name="type" value={typeFilter} />}
                            </form>

                            <div className={styles.tabs}>
                                {categories.map(cat => (
                                    <Link 
                                        key={cat} 
                                        href={`/scholarships?type=${encodeURIComponent(cat)}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                                        className={`${styles.tab} ${typeFilter === cat ? styles.activeTab : ''}`}
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </header>

                    <div className={styles.grid}>
                        {scholarships && scholarships.length > 0 ? (
                            scholarships.map((scholarship) => (
                                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <GraduationCap size={48} strokeWidth={1} />
                                <p>No scholarships found matching your criteria.</p>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
