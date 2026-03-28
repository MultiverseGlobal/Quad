'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { Rocket, Sparkles, GraduationCap, Users, AlertCircle } from 'lucide-react';
import styles from './onboarding.module.css';
import { completeOnboarding } from './actions';

const INTERESTS = [
    'Software Dev', 'Digital Art', 'Financial Markets', 'Entrepreneurship', 
    'Legal Tech', 'Data Science', 'Campus Politics', 'Sports', 
    'Photography', 'Writing', 'Music', 'Fashion'
];

export default function OnboardingFlow() {
    const [step, setStep] = useState(1);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [year, setYear] = useState('2024');
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev => 
            prev.includes(interest) 
            ? prev.filter(i => i !== interest) 
            : [...prev, interest]
        );
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
            setError(null);
        } else {
            // Final step: Submit
            setError(null);
            startTransition(async () => {
                const formData = new FormData();
                formData.append('interests', JSON.stringify(selectedInterests));
                formData.append('gradYear', year);
                const result = await completeOnboarding(formData);
                if (result?.error) {
                    setError(result.error);
                }
            });
        }
    };

    return (
        <div className="container" style={{ maxWidth: '640px' }}>
            <header className={styles.header}>
                <div className={styles.stepper}>
                    <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1</div>
                    <div className={`${styles.line} ${step >= 2 ? styles.activeLine : ''}`}></div>
                    <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2</div>
                    <div className={`${styles.line} ${step >= 3 ? styles.activeLine : ''}`}></div>
                    <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3</div>
                </div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                    {step === 1 ? "Scholar Interests" : step === 2 ? "Academic Path" : "Institutional Hubs"}
                </h1>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>
                    {step === 1 ? "Customize your research and social feed." : 
                     step === 2 ? "Define your journey through the university." : 
                     "Join verified departmental communities."}
                </p>
            </header>

            <div className={styles.card}>
                <div className={styles.stepContent}>
                    {error && (
                        <div style={{ padding: '0.75rem', background: '#ff000008', color: 'var(--error)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 700, border: '1px solid #ff000015' }}>
                            <AlertCircle size={14} />
                            {error}
                        </div>
                    )}
                    {step === 1 && (
                        <>
                            <div className={styles.iconCircle}><Sparkles size={24} /></div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Areas of Research</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '1.5rem' }}>Choose 3 topics to initialize your feed.</p>
                            <div className={styles.interestGrid}>
                                {INTERESTS.map((item) => (
                                    <button 
                                        key={item} 
                                        onClick={() => toggleInterest(item)}
                                        className={`${styles.interestChip} ${selectedInterests.includes(item) ? styles.selectedChip : ''}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className={styles.iconCircle}><GraduationCap size={24} /></div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Graduation Timeline</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '1.5rem' }}>This helps refine your career opportunities.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%' }}>
                                {['2024', '2025', '2026', '2027', '2028', 'Later'].map(y => (
                                    <button 
                                        key={y}
                                        onClick={() => setYear(y)}
                                        style={{ 
                                            padding: '0.75rem', 
                                            borderRadius: 'var(--radius-sm)', 
                                            border: '1px solid var(--surface-border)',
                                            background: year === y ? 'var(--surface-muted)' : '#fff',
                                            borderColor: year === y ? 'var(--primary)' : 'var(--surface-border)',
                                            color: year === y ? 'var(--primary)' : 'var(--muted)',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Class of {y}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className={styles.iconCircle}><Users size={24} /></div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>Institutional Network</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600, marginBottom: '1.5rem' }}>Join communities within your department.</p>
                            <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <div style={{ padding: '1rem', background: 'var(--surface-muted)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--primary)' }}>Academic Hub</h4>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>Verified Peers</p>
                                    </div>
                                    <Button variant="ghost" size="small">Joined</Button>
                                </div>
                                <div style={{ padding: '1rem', background: '#fff', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--primary)' }}>Innovation Guild</h4>
                                        <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>Public Group</p>
                                    </div>
                                    <Button size="small">Join</Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.footer}>
                    <Button 
                        onClick={handleNext} 
                        style={{ width: '100%' }}
                        disabled={(step === 1 && selectedInterests.length < 3) || isPending}
                    >
                        {isPending ? "Configuring workspace..." : step === 3 ? "Complete Registration" : "Continue Access"}
                    </Button>
                </div>
            </div>
            
            <p className={styles.skipLink}>
                Portal Step {step} of 3
            </p>
        </div>
    );
}
