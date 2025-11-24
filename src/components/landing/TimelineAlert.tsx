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
      className={`w-full ${sticky ? 'sticky top-0 z-50 shadow-md' : ''}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 my-4">
        <div 
          className={`
            ${styles.bg} ${styles.border} ${styles.pulse}
            border-2 rounded-lg p-4 md:p-6
            flex items-center justify-between gap-4
            transition-all duration-200
          `}
        >
          {/* Left side: Icon + Text */}
          <div className="flex items-center gap-3 flex-1">
            <IconComponent 
              className={styles.iconColor} 
              size={24}
            />
            <p className={`${styles.text} text-sm md:text-base font-medium`}>
              ⚡ Provision 29 Effective Date: January 1, 2026 | <strong>{monthsRemaining} months remaining</strong>
            </p>
          </div>

          {/* Right side: Dismiss button */}
          {showDismiss && (
            <button
              onClick={handleDismiss}
              className={`
                ${styles.iconColor} 
                hover:opacity-70 
                transition-opacity 
                flex-shrink-0
                p-1
              `}
              aria-label="Dismiss alert"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
