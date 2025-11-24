import { useState, useEffect, useMemo } from 'react';
import { AlertCircle, AlertTriangle, X } from 'lucide-react';

interface TimelineAlertProps {
  deadline?: string;
  showDismiss?: boolean;
  sticky?: boolean;
}

export default function TimelineAlert({ 
  deadline = "2026-01-01", 
  showDismiss = true,
  sticky = false 
}: TimelineAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const isDismissed = localStorage.getItem('p29_alert_dismissed');
    if (isDismissed === 'true') {
      setDismissed(true);
    }
  }, []);

  // Calculate months remaining
  const monthsRemaining = useMemo(() => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffMonths = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)));
    return diffMonths;
  }, [deadline]);

  // Determine urgency state
  const urgencyState = useMemo(() => {
    if (monthsRemaining < 6) return 'critical';
    if (monthsRemaining < 12) return 'urgent';
    return 'normal';
  }, [monthsRemaining]);

  // Get styling based on urgency state
  const getStyles = () => {
    switch (urgencyState) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          text: 'text-red-900',
          iconColor: 'text-red-600',
          icon: AlertTriangle,
          pulse: 'animate-pulse'
        };
      case 'urgent':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-300',
          text: 'text-orange-900',
          iconColor: 'text-orange-600',
          icon: AlertTriangle,
          pulse: ''
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-900',
          iconColor: 'text-blue-600',
          icon: AlertCircle,
          pulse: ''
        };
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('p29_alert_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  const styles = getStyles();
  const IconComponent = styles.icon;

  return (
    <div 
      className={`w-full ${sticky ? 'sticky top-0 z-50 shadow-md bg-background' : ''}`}
    >
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 my-2 sm:my-4">
        <div 
          className={`
            ${styles.bg} ${styles.border} ${styles.pulse}
            border-2 rounded-lg p-3 sm:p-4 md:p-6
            transition-all duration-200 relative
          `}
        >
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            {/* Icon + Text */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 pr-8 sm:pr-0">
              <IconComponent 
                className={`${styles.iconColor} flex-shrink-0`} 
                size={20}
              />
              <p className={`${styles.text} text-xs sm:text-sm md:text-base font-medium`}>
                ⚡ Provision 29 Effective Date: January 1, 2026 | <strong className="text-sm sm:text-base">{monthsRemaining}</strong> months remaining
              </p>
            </div>
          </div>

          {/* Dismiss button - Top right on mobile */}
          {showDismiss && (
            <button
              onClick={handleDismiss}
              className={`
                ${styles.iconColor} 
                hover:opacity-70 
                transition-opacity 
                absolute top-2 right-2 sm:relative sm:top-0 sm:right-0
                p-1 min-h-[44px] min-w-[44px] flex items-center justify-center
              `}
              aria-label="Dismiss alert"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
