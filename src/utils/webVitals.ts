/**
 * Web Vitals Performance Monitoring
 * 
 * Tracks Core Web Vitals metrics and sends them to analytics
 * for performance monitoring and optimization.
 */

export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

/**
 * Thresholds for rating Web Vitals (from web.dev)
 */
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },          // Cumulative Layout Shift
  FID: { good: 100, poor: 300 },          // First Input Delay (ms)
  FCP: { good: 1800, poor: 3000 },        // First Contentful Paint (ms)
  LCP: { good: 2500, poor: 4000 },        // Largest Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 },        // Time to First Byte (ms)
  INP: { good: 200, poor: 500 },          // Interaction to Next Paint (ms)
};

/**
 * Get rating for a metric based on its value
 */
function getRating(
  metricName: WebVitalsMetric['name'],
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Send Web Vitals to analytics
 */
function sendToAnalytics(metric: WebVitalsMetric): void {
  try {
    // Store in localStorage for analytics dashboard
    const analyticsData = JSON.parse(localStorage.getItem('p29_analytics') || '{}');
    
    if (!analyticsData.webVitals) {
      analyticsData.webVitals = [];
    }

    analyticsData.webVitals.push({
      ...metric,
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
    });

    // Keep only last 50 measurements
    if (analyticsData.webVitals.length > 50) {
      analyticsData.webVitals = analyticsData.webVitals.slice(-50);
    }

    localStorage.setItem('p29_analytics', JSON.stringify(analyticsData));

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(
        `${emoji} ${metric.name}: ${metric.value.toFixed(0)}${metric.name === 'CLS' ? '' : 'ms'} (${metric.rating})`
      );
    }
  } catch (error) {
    console.error('Error sending Web Vitals to analytics:', error);
  }
}

/**
 * Initialize Web Vitals tracking using the web-vitals library
 * Note: This uses the native browser APIs when available
 */
export function initWebVitals(): void {
  // Check if user has opted out
  try {
    const analyticsData = JSON.parse(localStorage.getItem('p29_analytics') || '{}');
    if (analyticsData.hasOptedOut) {
      console.log('[Web Vitals] User has opted out of tracking');
      return;
    }
  } catch (error) {
    console.error('Error checking opt-out status:', error);
  }

  // LCP - Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        const metric: WebVitalsMetric = {
          name: 'LCP',
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: getRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
          delta: lastEntry.renderTime || lastEntry.loadTime,
          id: `lcp-${Date.now()}`,
          navigationType: 'navigate',
        };
        
        sendToAnalytics(metric);
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (error) {
      console.error('Error observing LCP:', error);
    }

    // FID - First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const metric: WebVitalsMetric = {
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            rating: getRating('FID', entry.processingStart - entry.startTime),
            delta: entry.processingStart - entry.startTime,
            id: `fid-${Date.now()}`,
            navigationType: 'navigate',
          };
          
          sendToAnalytics(metric);
        });
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (error) {
      console.error('Error observing FID:', error);
    }

    // CLS - Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }

        const metric: WebVitalsMetric = {
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
          delta: clsValue,
          id: `cls-${Date.now()}`,
          navigationType: 'navigate',
        };

        sendToAnalytics(metric);
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.error('Error observing CLS:', error);
    }

    // FCP - First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const metric: WebVitalsMetric = {
            name: 'FCP',
            value: entry.startTime,
            rating: getRating('FCP', entry.startTime),
            delta: entry.startTime,
            id: `fcp-${Date.now()}`,
            navigationType: 'navigate',
          };
          
          sendToAnalytics(metric);
        });
      });
      
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (error) {
      console.error('Error observing FCP:', error);
    }
  }

  // TTFB - Time to First Byte
  if ('performance' in window && 'getEntriesByType' in performance) {
    try {
      const navigationEntries = performance.getEntriesByType('navigation') as any[];
      if (navigationEntries.length > 0) {
        const ttfb = navigationEntries[0].responseStart;
        
        const metric: WebVitalsMetric = {
          name: 'TTFB',
          value: ttfb,
          rating: getRating('TTFB', ttfb),
          delta: ttfb,
          id: `ttfb-${Date.now()}`,
          navigationType: 'navigate',
        };
        
        sendToAnalytics(metric);
      }
    } catch (error) {
      console.error('Error measuring TTFB:', error);
    }
  }
}

/**
 * Get Web Vitals summary for analytics dashboard
 */
export function getWebVitalsSummary(): {
  metrics: WebVitalsMetric[];
  summary: {
    [key in WebVitalsMetric['name']]?: {
      avg: number;
      min: number;
      max: number;
      latest: number;
      rating: 'good' | 'needs-improvement' | 'poor';
    };
  };
} {
  try {
    const analyticsData = JSON.parse(localStorage.getItem('p29_analytics') || '{}');
    const metrics: WebVitalsMetric[] = analyticsData.webVitals || [];

    const summary: any = {};

    // Calculate summary for each metric type
    (['CLS', 'FID', 'FCP', 'LCP', 'TTFB'] as const).forEach((metricName) => {
      const metricValues = metrics
        .filter((m) => m.name === metricName)
        .map((m) => m.value);

      if (metricValues.length > 0) {
        const avg = metricValues.reduce((a, b) => a + b, 0) / metricValues.length;
        const latest = metricValues[metricValues.length - 1];
        
        summary[metricName] = {
          avg,
          min: Math.min(...metricValues),
          max: Math.max(...metricValues),
          latest,
          rating: getRating(metricName, latest),
        };
      }
    });

    return { metrics, summary };
  } catch (error) {
    console.error('Error getting Web Vitals summary:', error);
    return { metrics: [], summary: {} };
  }
}

/**
 * Check if page meets performance budget
 */
export function checkPerformanceBudget(): {
  passed: boolean;
  violations: string[];
} {
  const { summary } = getWebVitalsSummary();
  const violations: string[] = [];

  if (summary.LCP && summary.LCP.latest > 2500) {
    violations.push(`LCP: ${summary.LCP.latest.toFixed(0)}ms (target: <2500ms)`);
  }

  if (summary.FID && summary.FID.latest > 100) {
    violations.push(`FID: ${summary.FID.latest.toFixed(0)}ms (target: <100ms)`);
  }

  if (summary.CLS && summary.CLS.latest > 0.1) {
    violations.push(`CLS: ${summary.CLS.latest.toFixed(3)} (target: <0.1)`);
  }

  if (summary.FCP && summary.FCP.latest > 1800) {
    violations.push(`FCP: ${summary.FCP.latest.toFixed(0)}ms (target: <1800ms)`);
  }

  if (summary.TTFB && summary.TTFB.latest > 800) {
    violations.push(`TTFB: ${summary.TTFB.latest.toFixed(0)}ms (target: <800ms)`);
  }

  return {
    passed: violations.length === 0,
    violations,
  };
}
