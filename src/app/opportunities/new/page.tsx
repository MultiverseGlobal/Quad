import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import styles from '../opportunities.module.css';
import { createOpportunity } from '../actions';
import { Briefcase, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewOpportunityPage({ searchParams }: { searchParams: { error?: string } }) {
    return (
        <>
            <Navbar />
            <div className={`${styles.opportunities} animate-fade-in`}>
                <div className="container" style={{ maxWidth: '640px' }}>
                    <Link href="/opportunities" className={`${styles.backLink} animate-slide-up`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '2.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                        <ArrowLeft size={20} />
                        Return to Opportunity Board
                    </Link>

                    <div className={`${styles.jobCard} animate-slide-up stagger-1`} style={{ textAlign: 'left', padding: '3.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
                            <div style={{ padding: '1.25rem', background: 'var(--primary-glow)', borderRadius: 'var(--radius-xl)', color: 'var(--primary)', boxShadow: '0 8px 20px -4px var(--primary-glow)' }}>
                                <Briefcase size={32} />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--primary)', letterSpacing: '-0.02em' }}>Post Opportunity</h1>
                                <p style={{ color: 'var(--muted)', fontSize: '1rem', fontWeight: 500 }}>Empower the Quad community with jobs & gigs.</p>
                            </div>
                        </div>

                        {searchParams.error && (
                            <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', fontSize: '0.95rem', fontWeight: 600, border: '1px solid #fecaca' }}>
                                {searchParams.error}
                            </div>
                        )}

                        <form action={createOpportunity} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Professional Position Title</label>
                                <input name="title" type="text" placeholder="e.g. Senior Frontend Intern" className={styles.searchInput} required />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Hiring Company / Organization</label>
                                <input name="company" type="text" placeholder="e.g. Quad Technologies" className={styles.searchInput} required />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Opportunity Category</label>
                                <div style={{ position: 'relative' }}>
                                    <select name="type" className={styles.searchInput} required style={{ appearance: 'none' }}>
                                        <option value="Internship">High-Impact Internship</option>
                                        <option value="Job">Full-time Professional Job</option>
                                        <option value="Gig">Project-based Gig</option>
                                        <option value="Event">Campus Recruitment Event</option>
                                    </select>
                                    <div style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }}>
                                        <Briefcase size={18} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Detailed Requirements</label>
                                <textarea name="description" placeholder="Share the core objectives and requirements..." className={styles.searchInput} style={{ minHeight: '160px', resize: 'vertical', borderRadius: 'var(--radius-xl)' }} required />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', marginLeft: '0.25rem' }}>Application URL (Optional)</label>
                                <input name="link" type="url" placeholder="https://careers.quad.com/..." className={styles.searchInput} />
                            </div>

                            <Button type="submit" size="large" style={{ marginTop: '1.5rem', width: '100%' }}>
                                Publish to Opportunity Board
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
