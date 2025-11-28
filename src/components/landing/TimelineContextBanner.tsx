import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TimelineContextBannerProps {
  variant?: 'warning' | 'info';
  showAcceleratedLink?: boolean;
}

const TimelineContextBanner = ({ 
  variant = 'warning',
  showAcceleratedLink = true 
}: TimelineContextBannerProps) => {
  // Calculate weeks until FY2026 starts (1 January 2026)
  const today = new Date();
  const fy2026Start = new Date('2026-01-01');
  const weeksRemaining = Math.max(0, Math.ceil((fy2026Start.getTime() - today.getTime()) / (7 * 24 * 60 * 60 * 1000)));
  
  // Determine which message to show based on current date
  const isPreFY2026 = today < fy2026Start;
  const isLate2025 = today >= new Date('2025-10-01') && isPreFY2026;
  const isFY2026 = today >= fy2026Start && today < new Date('2027-01-01');
  
  // Don't show banner if viewing well before deadline (before Oct 2025)
  if (today < new Date('2025-10-01')) {
    return null;
  }

  const bgColor = variant === 'warning' 
    ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' 
    : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
  
  const iconColor = variant === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400';
  const textColor = variant === 'warning' ? 'text-amber-800 dark:text-amber-200' : 'text-blue-800 dark:text-blue-200';

  return (
    <div className={`${bgColor} border rounded-lg p-4 mb-6`}>
      <div className="flex items-start gap-3">
        <div className={`${iconColor} mt-0.5`}>
          {variant === 'warning' ? <AlertTriangle size={20} /> : <Clock size={20} />}
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${textColor} mb-1`}>
            {isLate2025 && `${weeksRemaining} weeks until FY2026 begins`}
            {isFY2026 && 'FY2026 Evidence Collection Period'}
          </h4>
          <p className={`text-sm ${textColor} opacity-90`}>
            {isLate2025 && (
              <>
                Organisations not yet in Phase 3 (Assurance Preparation) face compressed timelines. 
                The four-phase framework remains valid — focus on establishing defensible foundations 
                and demonstrating good faith progress.
              </>
            )}
            {isFY2026 && (
              <>
                FY2026 is the evidence collection year. Boards must declare effectiveness in their 
                2027 Annual Reports. Focus on control execution, evidence gathering, and issue remediation.
              </>
            )}
          </p>
          {showAcceleratedLink && isLate2025 && (
            <Link 
              to="/roadmap?view=accelerated" 
              className={`inline-flex items-center gap-1 mt-2 text-sm font-medium ${iconColor} hover:underline`}
            >
              View Accelerated Implementation Guidance
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineContextBanner;
