'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Rocket, Sparkles, GraduationCap, Users } from 'lucide-react';
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

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev => 
            prev.includes(interest) 
            ? prev.filter(i => i !== interest) 
            : [...prev, interest]
        );
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else {
            // Final step: Submit
            const formData = new FormData();
            formData.append('interests', JSON.stringify(selectedInterests));
            formData.append('gradYear', year);
            completeOnboarding(formData);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <header className={styles.header}>
                <div className={styles.stepper}>
                    <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1</div>
                    <div className={`${styles.line} ${step >= 2 ? styles.activeLine : ''}`}></div>
                    <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2</div>
                    <div className={`${styles.line} ${step >= 3 ? styles.activeLine : ''}`}></div>
                    <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3</div>
                </div>
                <h1>{step === 1 ? "Your Interests" : step === 2 ? "Academic Path" : "Get Connected"}</h1>
                <p>
                    {step === 1 ? "Select topics you'd like to see in your feed." : 
                     step === 2 ? "Help us tailor opportunities to your journey." : 
                     "Final step to join the community."}
                </p>
            </header>

            <div className={styles.card}>
                <div className={styles.stepContent}>
                    {step === 1 && (
                        <>
                            <div className={styles.iconCircle}><Sparkles size={32} /></div>
                            <h3>What Sparks Your Interest?</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Choose at least 3 topics.</p>
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
                            <div className={styles.iconCircle}><GraduationCap size={32} /></div>
                            <h3>Expected Graduation?</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>We'll show you relevant internships and roles.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', maxWidth: '400px' }}>
                                {['2024', '2025', '2026', '2027', '2028', 'Later'].map(y => (
                                    <button 
                                        key={y}
                                        onClick={() => setYear(y)}
                                        style={{ 
                                            padding: '1rem', 
                                            borderRadius: 'var(--radius-md)', 
                                            border: '1px solid var(--surface-border)',
                                            background: year === y ? 'var(--primary-glow)' : 'var(--background)',
                                            borderColor: year === y ? 'var(--primary)' : 'var(--surface-border)',
                                            color: year === y ? 'var(--primary)' : 'var(--foreground)',
                                            fontWeight: 700,
                                            cursor: 'pointer'
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
                            <div className={styles.iconCircle}><Users size={32} /></div>
                            <h3>Join Shared Communities</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>We've found 4 active groups in your department.</p>
                            <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ padding: '1.25rem', background: 'var(--background)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 700 }}>Departmental Hub</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>242 Fellow Scholars</p>
                                    </div>
                                    <Button variant="ghost" size="small" style={{ border: '1px solid var(--surface-border)' }}>Joined</Button>
                                </div>
                                <div style={{ padding: '1.25rem', background: 'var(--background)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 700 }}>Innovation & Tech</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>1.2k Students</p>
                                    </div>
                                    <Button size="small">Join Group</Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className={styles.footer}>
                    <Button 
                        onClick={handleNext} 
                        className={styles.nextBtn}
                        disabled={step === 1 && selectedInterests.length < 3}
                    >
                        {step === 3 ? "Complete Onboarding" : "Continue"}
                        {step === 3 ? <Rocket size={18} style={{ marginLeft: '0.5rem' }} /> : <Rocket size={18} style={{ marginLeft: '0.5rem' }} />}
                    </Button>
                </div>
            </div>
            
            <p className={styles.skipLink}>
                Step {step} of 3
            </p>
        </div>
    );
}
