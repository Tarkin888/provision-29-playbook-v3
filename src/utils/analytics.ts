// Analytics utility for tracking user interactions on the landing page
// Respects user privacy and Do Not Track settings

interface AnalyticsData {
  userId: string;
  journeySelected: 'starting' | 'progress' | 'ready' | null;
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
  ctaClicks: Array<{ cta: string; location: string; timestamp: string }>;
  featuresViewed: string[];
  maxScrollDepth: number;
  alertDismissals: number;
}

const ANALYTICS_KEY = 'p29_analytics';

// Check if user has Do Not Track enabled
const isTrackingAllowed = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Respect Do Not Track setting
  const dnt = navigator.doNotTrack || (window as any).doNotTrack || (navigator as any).msDoNotTrack;
  if (dnt === '1' || dnt === 'yes') {
    return false;
  }
  
  // Check for opt-out in localStorage
  const optOut = localStorage.getItem('p29_analytics_opt_out');
  if (optOut === 'true') {
    return false;
  }
  
  return true;
};

// Generate a unique user ID (non-PII)
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or initialize analytics data
const getAnalyticsData = (): AnalyticsData => {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Update visit count and last visit
      data.visitCount = (data.visitCount || 0) + 1;
      data.lastVisit = new Date().toISOString();
      return data;
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error reading analytics data:', error);
    }
  }
  
  // Initialize new analytics data
  return {
    userId: generateUserId(),
    journeySelected: null,
    visitCount: 1,
    firstVisit: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
    ctaClicks: [],
    featuresViewed: [],
    maxScrollDepth: 0,
    alertDismissals: 0,
  };
};

// Save analytics data to localStorage
const saveAnalyticsData = (data: AnalyticsData): void => {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error saving analytics data:', error);
    }
  }
};

// Log analytics event to console (in production, send to backend)
const logEvent = (eventName: string, properties?: Record<string, any>): void => {
  if (!isTrackingAllowed()) return;
  
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName}`, {
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }
};

// Track page view
export const trackPageView = (pageName: string, properties?: Record<string, any>): void => {
  if (!isTrackingAllowed()) return;
  
  const data = getAnalyticsData();
  saveAnalyticsData(data);
  
  logEvent('page_view', {
    page: pageName,
    userId: data.userId,
    visitCount: data.visitCount,
    ...properties,
  });
};

// Track journey selection
export const trackJourneySelection = (journeyType: 'starting' | 'progress' | 'ready'): void => {
  if (!isTrackingAllowed()) return;
  
  const data = getAnalyticsData();
  data.journeySelected = journeyType;
  saveAnalyticsData(data);
  
  logEvent('journey_selected', {
    journeyType,
    userId: data.userId,
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string): void => {
  if (!isTrackingAllowed()) return;
  
  const data = getAnalyticsData();
  data.ctaClicks.push({
    cta: ctaName,
    location,
    timestamp: new Date().toISOString(),
  });
  saveAnalyticsData(data);
  
  logEvent('cta_click', {
    ctaName,
    location,
    userId: data.userId,
    totalClicks: data.ctaClicks.length,
  });
};

// Track feature interest
export const trackFeatureInterest = (featureName: string): void => {
  if (!isTrackingAllowed()) return;
  
  const data = getAnalyticsData();
  if (!data.featuresViewed.includes(featureName)) {
    data.featuresViewed.push(featureName);
    saveAnalyticsData(data);
  }
  
  logEvent('feature_viewed', {
    featureName,
    userId: data.userId,
    totalFeaturesViewed: data.featuresViewed.length,
  });
};

// Track alert dismissal
export const trackAlertDismissal = (): void => {
  if (!isTrackingAllowed()) return;
  
  const data = getAnalyticsData();
  data.alertDismissals += 1;
  saveAnalyticsData(data);
  
  logEvent('alert_dismissed', {
    userId: data.userId,
    totalDismissals: data.alertDismissals,
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100): void => {
  if (!isTrackingAllowed()) return;
  
  const data = getAnalyticsData();
  
  // Only track if this is a new max depth
  if (depth > data.maxScrollDepth) {
    data.maxScrollDepth = depth;
    saveAnalyticsData(data);
    
    logEvent('scroll_depth', {
      depth,
      userId: data.userId,
    });
  }
};

// Get analytics summary for dashboard
export const getAnalyticsSummary = (): AnalyticsData | null => {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error reading analytics summary:', error);
    }
  }
  return null;
};

// Clear analytics data (for testing or user opt-out)
export const clearAnalyticsData = (): void => {
  try {
    localStorage.removeItem(ANALYTICS_KEY);
    if (import.meta.env.DEV) {
      console.log('[Analytics] Data cleared');
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error clearing analytics data:', error);
    }
  }
};

// Opt out of analytics
export const optOutOfAnalytics = (): void => {
  localStorage.setItem('p29_analytics_opt_out', 'true');
  clearAnalyticsData();
  if (import.meta.env.DEV) {
    console.log('[Analytics] User opted out of tracking');
  }
};

// Opt in to analytics
export const optInToAnalytics = (): void => {
  localStorage.removeItem('p29_analytics_opt_out');
  if (import.meta.env.DEV) {
    console.log('[Analytics] User opted in to tracking');
  }
};

// Check if user has opted out
export const hasOptedOut = (): boolean => {
  return localStorage.getItem('p29_analytics_opt_out') === 'true';
};

// Display analytics summary in console (dev only)
export const logAnalyticsSummary = (): void => {
  if (!import.meta.env.DEV) return;
  
  const summary = getAnalyticsSummary();
  if (!summary) {
    console.log('[Analytics] No data available');
    return;
  }
  
  console.log('=== P29 Landing Page Analytics Summary ===');
  console.log(`User ID: ${summary.userId}`);
  console.log(`Total Visits: ${summary.visitCount}`);
  console.log(`First Visit: ${summary.firstVisit}`);
  console.log(`Last Visit: ${summary.lastVisit}`);
  console.log(`Journey Selected: ${summary.journeySelected || 'None'}`);
  console.log(`CTA Clicks: ${summary.ctaClicks.length}`);
  console.log(`Features Viewed: ${summary.featuresViewed.length}`);
  console.log(`Max Scroll Depth: ${summary.maxScrollDepth}%`);
  console.log(`Alert Dismissals: ${summary.alertDismissals}`);
  
  if (summary.ctaClicks.length > 0) {
    console.log('\nCTA Click Details:');
    summary.ctaClicks.forEach((click, i) => {
      console.log(`  ${i + 1}. ${click.cta} (${click.location}) at ${click.timestamp}`);
    });
  }
  
  if (summary.featuresViewed.length > 0) {
    console.log('\nFeatures Viewed:');
    summary.featuresViewed.forEach((feature, i) => {
      console.log(`  ${i + 1}. ${feature}`);
    });
  }
  
  // Calculate conversion rate (if there were any CTA clicks)
  if (summary.visitCount > 0) {
    const conversionRate = (summary.ctaClicks.length / summary.visitCount * 100).toFixed(1);
    console.log(`\nConversion Rate: ${conversionRate}% (${summary.ctaClicks.length} clicks / ${summary.visitCount} visits)`);
  }
  
  console.log('==========================================');
};
