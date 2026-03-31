import { Sparkles, Star, Zap } from 'lucide-react';

interface EdgeBadgeProps {
  score: number;
}

export const EdgeBadge = ({ score }: EdgeBadgeProps) => {
  let tier = 'Initiate';
  let tierClass = 'tier-initiate';
  let Icon = Star;

  if (score >= 500) {
    tier = 'Legend';
    tierClass = 'tier-legend';
    Icon = Sparkles;
  } else if (score >= 100) {
    tier = 'Pioneer';
    tierClass = 'tier-pioneer';
    Icon = Zap;
  }

  return (
    <div className={`edge-badge ${tierClass}`} title={`Scholar Edge: ${score} - ${tier}`}>
      <Icon size={14} className="edge-icon" fill="currentColor" />
      <span className="edge-score">{score} Edge</span>
      
      <style jsx>{`
        .edge-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          cursor: default;
        }

        .tier-initiate {
          background: var(--surface);
          color: var(--muted);
          border: 1px solid var(--border);
        }

        .tier-pioneer {
          background: rgba(34, 197, 94, 0.1);
          color: var(--secondary);
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .tier-legend {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.2);
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.15);
        }
        
        .edge-icon {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
