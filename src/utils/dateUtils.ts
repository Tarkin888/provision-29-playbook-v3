/**
 * Date utilities for P29 roadmap calculations
 * Baseline: Week 1 = January 6, 2025 (first Monday of 2025)
 */

export const BASELINE_START_DATE = new Date('2025-01-06'); // Week 1 starts

/**
 * Calculate current week number relative to baseline
 */
export function getCurrentWeek(): number {
  const now = new Date();
  const diffTime = now.getTime() - BASELINE_START_DATE.getTime();
  const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, diffWeeks + 1); // Week 1 is the baseline
}

/**
 * Calculate current quarter and year
 */
export function getCurrentQuarter(): { quarter: number; year: number } {
  const now = new Date();
  const quarter = Math.ceil((now.getMonth() + 1) / 3);
  return { quarter, year: now.getFullYear() };
}

/**
 * Calculate weeks behind schedule
 */
export function getWeeksBehind(): number {
  const currentWeek = getCurrentWeek();
  const expectedWeek = 1; // Should have started in Week 1
  return Math.max(0, currentWeek - expectedWeek);
}

/**
 * Calculate months behind (approximate)
 */
export function getMonthsBehind(): number {
  return Math.floor(getWeeksBehind() / 4);
}

/**
 * Get risk level based on current week
 */
export function getRiskLevel(): 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' {
  const currentWeek = getCurrentWeek();
  if (currentWeek >= 48) return 'CRITICAL'; // Dec 2025 or later
  if (currentWeek >= 40) return 'HIGH'; // Oct-Nov 2025
  if (currentWeek >= 26) return 'MEDIUM'; // Q3 2025
  return 'LOW'; // Q1-Q2 2025
}

/**
 * Get weeks until compliance period (Jan 1, 2026)
 */
export function getWeeksUntilCompliance(): number {
  const now = new Date();
  const complianceStart = new Date('2026-01-01');
  const diffTime = complianceStart.getTime() - now.getTime();
  const diffWeeks = Math.ceil(diffTime / (7 * 24 * 60 * 60 * 1000));
  return Math.max(0, diffWeeks);
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

/**
 * Get phase status based on current week
 */
export function getPhaseStatus(phaseStartWeek: number, phaseEndWeek: number, currentWeek: number): 'overdue' | 'current' | 'upcoming' {
  if (currentWeek > phaseEndWeek) return 'overdue';
  if (currentWeek >= phaseStartWeek && currentWeek <= phaseEndWeek) return 'current';
  return 'upcoming';
}
