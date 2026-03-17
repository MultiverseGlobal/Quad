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
            <div className={styles.opportunities}>
                <div className="container" style={{ maxWidth: '600px' }}>
                    <Link href="/opportunities" className={styles.backLink} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', textDecoration: 'none', marginBottom: '2rem' }}>
                        <ArrowLeft size={18} />
                        Back to Board
                    </Link>

                    <div className={styles.postCard} style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', borderRadius: 'var(--radius-md)', color: 'var(--primary)' }}>
                                <Briefcase size={24} />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Post Opportunity</h1>
                                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Share internships, gigs, or jobs with the Quad.</p>
                            </div>
                        </div>

                        {searchParams.error && (
                            <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                {searchParams.error}
                            </div>
                        )}

                        <form action={createOpportunity} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Position Title</label>
                                <input name="title" type="text" placeholder="e.g. Frontend Intern" className={styles.searchInput} required />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Company / Organization</label>
                                <input name="company" type="text" placeholder="e.g. Quad Tech" className={styles.searchInput} required />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Type</label>
                                <select name="type" className={styles.searchInput} required>
                                    <option value="Internship">Internship</option>
                                    <option value="Job">Full-time Job</option>
                                    <option value="Gig">Gig / Freelance</option>
                                    <option value="Event">Campus Event</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Description</label>
                                <textarea name="description" placeholder="What is this role about?" className={styles.searchInput} style={{ minHeight: '120px', resize: 'vertical' }} required />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 700, fontSize: '0.9rem' }}>Application Link (Optional)</label>
                                <input name="link" type="url" placeholder="https://..." className={styles.searchInput} />
                            </div>

                            <Button type="submit" size="large" style={{ marginTop: '1rem' }}>
                                Launch Opportunity
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
