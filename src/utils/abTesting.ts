/**
 * A/B Testing Infrastructure
 * 
 * Manages experiment variants, assignment, and conversion tracking
 * for landing page optimization.
 */

export type ExperimentName = 'hero_cta' | 'journey_layout' | 'social_proof_placement';
export type VariantId = 'A' | 'B' | 'C';

export interface ExperimentConfig {
  name: ExperimentName;
  variants: VariantId[];
  description: string;
  goal: string;
}

export interface VariantAssignment {
  experimentName: ExperimentName;
  variantId: VariantId;
  assignedAt: string;
}

export interface ConversionEvent {
  experimentName: ExperimentName;
  variantId: VariantId;
  timestamp: string;
  goalType: string;
}

export interface ExperimentResults {
  experimentName: ExperimentName;
  variants: {
    [key in VariantId]?: {
      impressions: number;
      conversions: number;
      conversionRate: number;
    };
  };
  winner?: VariantId;
  hasStatisticalSignificance: boolean;
}

// Experiment configurations
export const EXPERIMENTS: Record<ExperimentName, ExperimentConfig> = {
  hero_cta: {
    name: 'hero_cta',
    variants: ['A', 'B', 'C'],
    description: 'Testing different CTA button text on hero section',
    goal: 'CTA click rate'
  },
  journey_layout: {
    name: 'journey_layout',
    variants: ['A', 'B', 'C'],
    description: 'Testing different journey selector layouts',
    goal: 'Journey card click rate'
  },
  social_proof_placement: {
    name: 'social_proof_placement',
    variants: ['A', 'B', 'C'],
    description: 'Testing social proof section placement',
    goal: 'Overall conversion rate'
  }
};

// CTA text variants for experiments
export const CTA_VARIANTS = {
  A: {
    primary: 'Start Implementation',
    secondary: 'Take Assessment'
  },
  B: {
    primary: 'Begin Your Journey',
    secondary: 'Check Readiness'
  },
  C: {
    primary: 'Get Started Free',
    secondary: 'Assess Risk'
  }
};

const AB_STORAGE_KEY = 'p29_ab_tests';
const MIN_SAMPLE_SIZE = 1000;
const CONFIDENCE_LEVEL = 0.95;

/**
 * Get stored A/B test data from localStorage
 */
function getABTestData(): {
  assignments: VariantAssignment[];
  impressions: Record<string, number>;
  conversions: ConversionEvent[];
} {
  try {
    const data = localStorage.getItem(AB_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading A/B test data:', error);
  }

  return {
    assignments: [],
    impressions: {},
    conversions: []
  };
}

/**
 * Save A/B test data to localStorage
 */
function saveABTestData(data: {
  assignments: VariantAssignment[];
  impressions: Record<string, number>;
  conversions: ConversionEvent[];
}): void {
  try {
    localStorage.setItem(AB_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving A/B test data:', error);
  }
}

/**
 * Get assigned variant for an experiment
 * If not assigned, randomly assign with equal distribution
 */
export function getVariant(experimentName: ExperimentName): VariantId {
  const data = getABTestData();
  
  // Check for existing assignment
  const existing = data.assignments.find(a => a.experimentName === experimentName);
  if (existing) {
    return existing.variantId;
  }

  // Randomly assign new variant
  const experiment = EXPERIMENTS[experimentName];
  const randomIndex = Math.floor(Math.random() * experiment.variants.length);
  const variantId = experiment.variants[randomIndex];

  // Store assignment
  const assignment: VariantAssignment = {
    experimentName,
    variantId,
    assignedAt: new Date().toISOString()
  };

  data.assignments.push(assignment);
  saveABTestData(data);

  return variantId;
}

/**
 * Record impression for a variant
 */
export function recordImpression(experimentName: ExperimentName, variantId: VariantId): void {
  const data = getABTestData();
  const key = `${experimentName}_${variantId}`;
  
  data.impressions[key] = (data.impressions[key] || 0) + 1;
  saveABTestData(data);
}

/**
 * Record conversion for a variant
 */
export function recordConversion(
  experimentName: ExperimentName,
  variantId: VariantId,
  goalType: string = 'default'
): void {
  const data = getABTestData();

  const conversion: ConversionEvent = {
    experimentName,
    variantId,
    timestamp: new Date().toISOString(),
    goalType
  };

  data.conversions.push(conversion);
  saveABTestData(data);

  console.log(`[A/B Test] Conversion recorded: ${experimentName} - Variant ${variantId}`);
}

/**
 * Calculate experiment results
 */
export function getExperimentResults(experimentName: ExperimentName): ExperimentResults {
  const data = getABTestData();
  const experiment = EXPERIMENTS[experimentName];
  
  const results: ExperimentResults = {
    experimentName,
    variants: {},
    hasStatisticalSignificance: false
  };

  // Calculate metrics for each variant
  experiment.variants.forEach(variantId => {
    const key = `${experimentName}_${variantId}`;
    const impressions = data.impressions[key] || 0;
    const conversions = data.conversions.filter(
      c => c.experimentName === experimentName && c.variantId === variantId
    ).length;

    results.variants[variantId] = {
      impressions,
      conversions,
      conversionRate: impressions > 0 ? (conversions / impressions) * 100 : 0
    };
  });

  // Check for statistical significance
  const allVariantsReady = experiment.variants.every(variantId => {
    const variant = results.variants[variantId];
    return variant && variant.impressions >= MIN_SAMPLE_SIZE;
  });

  if (allVariantsReady) {
    results.hasStatisticalSignificance = true;
    
    // Find winner (highest conversion rate)
    let maxRate = 0;
    experiment.variants.forEach(variantId => {
      const variant = results.variants[variantId];
      if (variant && variant.conversionRate > maxRate) {
        maxRate = variant.conversionRate;
        results.winner = variantId;
      }
    });
  }

  return results;
}

/**
 * Get all experiment results
 */
export function getAllExperimentResults(): ExperimentResults[] {
  return Object.keys(EXPERIMENTS).map(name => 
    getExperimentResults(name as ExperimentName)
  );
}

/**
 * Reset experiment data (for testing or starting new experiments)
 */
export function resetExperiment(experimentName: ExperimentName): void {
  const data = getABTestData();
  
  // Remove assignments
  data.assignments = data.assignments.filter(a => a.experimentName !== experimentName);
  
  // Remove impressions
  const experiment = EXPERIMENTS[experimentName];
  experiment.variants.forEach(variantId => {
    const key = `${experimentName}_${variantId}`;
    delete data.impressions[key];
  });
  
  // Remove conversions
  data.conversions = data.conversions.filter(c => c.experimentName !== experimentName);
  
  saveABTestData(data);
  console.log(`[A/B Test] Reset experiment: ${experimentName}`);
}

/**
 * Check if user has opted out of tracking
 */
export function hasOptedOutOfTracking(): boolean {
  try {
    const analyticsData = localStorage.getItem('p29_analytics');
    if (analyticsData) {
      const data = JSON.parse(analyticsData);
      return data.hasOptedOut === true;
    }
  } catch (error) {
    console.error('Error checking opt-out status:', error);
  }
  return false;
}

/**
 * Log experiment summary to console
 */
export function logExperimentSummary(): void {
  const results = getAllExperimentResults();
  
  console.group('🧪 A/B Testing Summary');
  results.forEach(result => {
    console.group(`Experiment: ${result.experimentName}`);
    console.log(`Statistical Significance: ${result.hasStatisticalSignificance ? '✅ Yes' : '❌ No'}`);
    if (result.winner) {
      console.log(`🏆 Winner: Variant ${result.winner}`);
    }
    
    Object.entries(result.variants).forEach(([variantId, metrics]) => {
      if (metrics) {
        console.log(
          `Variant ${variantId}: ${metrics.impressions} impressions, ` +
          `${metrics.conversions} conversions (${metrics.conversionRate.toFixed(2)}%)`
        );
      }
    });
    console.groupEnd();
  });
  console.groupEnd();
}
