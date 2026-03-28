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
    <div className={styles.onboardingWrapper}>
      <header className={styles.header}>
        <div className={styles.stepper}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1</div>
          <div className={`${styles.line} ${step >= 2 ? styles.activeLine : ''}`}></div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2</div>
          <div className={`${styles.line} ${step >= 3 ? styles.activeLine : ''}`}></div>
          <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>3</div>
        </div>
        <h1 className={styles.headerTitle}>
          {step === 1 ? "Customize Your Pulse" : step === 2 ? "Academic Journey" : "Verified Networks"}
        </h1>
        <p className={styles.headerSub}>
          {step === 1 ? "Initialize your professional research and social feed." : 
           step === 2 ? "Define your path through the university ecosystem." : 
           "Connect with high-impact departmental communities."}
        </p>
      </header>

      <div className={`${styles.card} page-transition`}>
        <div className={styles.stepContent}>
          {error && (
            <div className={styles.errorBanner}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          
          {step === 1 && (
            <>
              <div className={styles.iconCircle}><Sparkles size={32} fill="currentColor" /></div>
              <h3 className={styles.stepTitle}>Research Interests</h3>
              <p className={styles.stepDesc}>Pulse picks: Choose 3 topics to fuel your engine.</p>
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
              <h3 className={styles.stepTitle}>Graduation Class</h3>
              <p className={styles.stepDesc}>This helps us unlock exclusive career briefs for you.</p>
              <div className={styles.yearGrid}>
                {['2024', '2025', '2026', '2027', '2028', 'Later'].map(y => (
                  <button 
                    key={y}
                    onClick={() => setYear(y)}
                    className={`${styles.yearBtn} ${year === y ? styles.activeYear : ''}`}
                  >
                    Class of {y}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className={styles.iconCircle}><Rocket size={32} fill="currentColor" /></div>
              <h3 className={styles.stepTitle}>Final Briefings</h3>
              <p className={styles.stepDesc}>Join the verified squads in your department.</p>
              <div className={styles.squadList}>
                <div className={styles.squadItem}>
                  <div>
                    <h4 className={styles.squadName}>Academic Hub</h4>
                    <p className={styles.squadMeta}>Verified Scholars Group</p>
                  </div>
                  <Button variant="ghost" size="small" className={styles.joinedBtn}>Joined</Button>
                </div>
                <div className={styles.squadItem}>
                  <div>
                    <h4 className={styles.squadName}>Innovation Guild</h4>
                    <p className={styles.squadMeta}>Student Marketplace</p>
                  </div>
                  <Button size="small">Join Now</Button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={styles.footer}>
          <Button 
            onClick={handleNext} 
            className={styles.nextBtn}
            size="large"
            disabled={(step === 1 && selectedInterests.length < 3) || isPending}
          >
            {isPending ? "Syncing Workspace..." : step === 3 ? "Launch My Pulse" : "Lock It In"}
          </Button>
        </div>
      </div>
      
      <p className={styles.skipLink}>
        Step {step} of 3
      </p>
    </div>
    );
}
