import Link from 'next/link';
import { Button } from './Button';
import { Calendar, Building, DollarSign, ExternalLink, GraduationCap, MapPin } from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: {
    id: string;
    title: string;
    provider: string;
    amount: string;
    deadline: string;
    university: string;
    department_eligibility: string[];
    link: string;
    description: string;
  };
}

export const ScholarshipCard = ({ scholarship }: ScholarshipCardProps) => {
  const deadlineDate = new Date(scholarship.deadline);
  const now = new Date();
  const diffTime = Math.abs(deadlineDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isUrgent = deadlineDate > now && diffDays <= 7;
  const isExpired = deadlineDate < now;

  return (
    <article className="scholarship-card">
      <div className="card-header">
        <div className="provider-info">
          <div className="provider-icon">
            <Building size={20} />
          </div>
          <div>
            <h3 className="scholarship-title">{scholarship.title}</h3>
            <p className="scholarship-provider">{scholarship.provider}</p>
          </div>
        </div>
        <div className="university-badge">
          <GraduationCap size={14} />
          {scholarship.university}
        </div>
      </div>

      <div className="card-body">
        <p className="description">{scholarship.description}</p>
        
        <div className="meta-grid">
          <div className="meta-item amount">
            <DollarSign size={16} />
            <span>{scholarship.amount || 'Variable'}</span>
          </div>
          <div className={`meta-item deadline ${isUrgent ? 'urgent' : ''} ${isExpired ? 'expired' : ''}`}>
            <Calendar size={16} />
            <span>
              {isExpired ? 'Expired' : `${deadlineDate.toLocaleDateString()} ${isUrgent ? `(${diffDays} days left)` : ''}`}
            </span>
          </div>
          <div className="meta-item depts">
            <MapPin size={16} />
            <span>
              {scholarship.department_eligibility && scholarship.department_eligibility.includes('All') 
                ? 'All Departments' 
                : `${scholarship.department_eligibility?.length || 0} Departments Eligible`}
            </span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        {scholarship.link ? (
          <a href={scholarship.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
            <Button variant="outline" style={{ width: '100%' }}>
              View Details <ExternalLink size={14} style={{ marginLeft: '0.5rem' }} />
            </Button>
          </a>
        ) : (
          <Button variant="primary" style={{ width: '100%' }} disabled>Details Unavailable</Button>
        )}
      </div>

      <style jsx>{`
        .scholarship-card {
          background: white;
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid var(--border);
          transition: all var(--transition-normal);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .scholarship-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
          border-color: var(--secondary);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .provider-info {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .provider-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }

        .scholarship-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary);
          margin: 0 0 0.25rem 0;
          line-height: 1.3;
        }

        .scholarship-provider {
          font-size: 0.9rem;
          color: var(--muted);
          font-weight: 500;
          margin: 0;
        }

        .university-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          background: var(--surface);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }

        .card-body {
          flex: 1;
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text);
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .meta-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--muted);
        }

        .meta-item.amount {
          color: var(--primary);
          font-weight: 700;
        }

        .meta-item.urgent {
          color: #ef4444;
          font-weight: 700;
        }
        
        .meta-item.urgent svg {
          color: #ef4444;
        }

        .meta-item.expired {
          color: var(--muted);
          opacity: 0.6;
        }

        .card-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
      `}</style>
    </article>
  );
};
