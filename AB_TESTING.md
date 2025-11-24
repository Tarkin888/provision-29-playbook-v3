# A/B Testing Infrastructure

## Overview

The landing page implements A/B testing to optimize conversion rates through systematic experimentation with different variants of key components.

## Active Experiments

### Experiment 1: Hero CTA Text (`hero_cta`)
Tests different call-to-action button text on the hero section.

**Variants:**
- **A (Control):** "Start Implementation" + "Take Assessment"
- **B:** "Begin Your Journey" + "Check Readiness"
- **C:** "Get Started Free" + "Assess Risk"

**Goal:** Maximize CTA click rate

### Experiment 2: Journey Selector Layout (`journey_layout`)
Tests different layout approaches for the journey selector.

**Variants:**
- **A (Control):** 3 equal cards in a row
- **B:** 1 large featured card + 2 smaller cards
- **C:** Vertical stepper design

**Goal:** Increase journey card click rate

### Experiment 3: Social Proof Placement (`social_proof_placement`)
Tests different placements for the social proof section.

**Variants:**
- **A (Control):** At bottom of page (current design)
- **B:** After hero, before journey selector
- **C:** Floating testimonial widget (not yet implemented)

**Goal:** Improve overall conversion rate

## How It Works

### Variant Assignment
1. When a user visits the landing page, they are randomly assigned to a variant for each experiment
2. The assignment is stored in `localStorage` under key `p29_ab_tests`
3. Users always see the same variant on subsequent visits (consistent experience)

### Impression Tracking
- Each time a variant is rendered, an impression is recorded
- Impressions are counted per variant

### Conversion Tracking
- When a user completes the goal action (e.g., CTA click), a conversion is recorded
- Conversions are associated with the specific variant the user saw

### Statistical Significance
- Minimum sample size: **1,000 impressions per variant**
- Confidence level: **95%**
- Winner determined by highest conversion rate once significance is reached

## Implementation Details

### Files
- `src/utils/abTesting.ts` - Core A/B testing logic
- `src/components/landing/HeroSectionVariantB.tsx` - Hero variant B
- `src/components/landing/HeroSectionVariantC.tsx` - Hero variant C
- `src/components/landing/JourneySelectorVariantB.tsx` - Journey variant B
- `src/components/landing/JourneySelectorVariantC.tsx` - Journey variant C
- `src/pages/Home.tsx` - A/B test orchestration

### Key Functions

```typescript
// Get assigned variant for a user
const variant = getVariant('hero_cta'); // Returns 'A', 'B', or 'C'

// Record impression
recordImpression('hero_cta', 'B');

// Record conversion
recordConversion('hero_cta', 'B', 'cta_click');

// Get experiment results
const results = getExperimentResults('hero_cta');

// Get all experiment results
const allResults = getAllExperimentResults();

// Log summary to console
logExperimentSummary();
```

## Privacy

- Respects user opt-out preferences from analytics tracking
- No personally identifiable information (PII) collected
- All data stored locally in browser's `localStorage`
- Users who opt out see the control variant (A) by default

## Viewing Results

### In Console
Run in browser console:
```javascript
// View all experiment results
window.localStorage.getItem('p29_ab_tests')

// Or use the helper function (if available in global scope)
logExperimentSummary()
```

### Analytics Dashboard
Visit `/analytics-dashboard` to view:
- Current variant assignments
- Impression counts
- Conversion counts
- Conversion rates
- Statistical significance status
- Winning variant (if determined)

## Making Decisions

### When to Act
Wait until **all** variants reach minimum sample size (1,000 impressions each) before making decisions.

### Analyzing Results
1. Check for statistical significance
2. Compare conversion rates across variants
3. Identify winning variant (highest conversion rate)
4. Consider secondary metrics (scroll depth, time on page)

### Implementing Winner
Once a clear winner is determined:
1. Make the winning variant the new control (variant A)
2. Update component imports in `Home.tsx`
3. Remove or archive losing variant components
4. Reset experiment data with `resetExperiment()`
5. Start new experiment with different variations

## Testing Locally

To test different variants locally:

```javascript
// In browser console, clear existing assignments
localStorage.removeItem('p29_ab_tests')

// Refresh page to get new random assignment
location.reload()
```

## Cleanup

To remove A/B testing infrastructure after winner is determined:

1. Replace variant imports with winning component in `Home.tsx`
2. Remove A/B testing logic from `Home.tsx`
3. Delete variant component files
4. (Optional) Remove `src/utils/abTesting.ts` if no future experiments planned
5. Update this documentation

## Notes

- Experiments run continuously until manually stopped
- Data persists across browser sessions
- Each experiment is independent
- Users can be in different variants for different experiments
- Mobile and desktop users are in the same experiments (no device-specific variants)
