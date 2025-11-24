import SEOHead from '@/components/common/SEOHead';
import HeroSection from '@/components/landing/HeroSection';
import HeroSectionVariantB from '@/components/landing/HeroSectionVariantB';
import HeroSectionVariantC from '@/components/landing/HeroSectionVariantC';
import JourneySelector from '@/components/landing/JourneySelector';
import JourneySelectorVariantB from '@/components/landing/JourneySelectorVariantB';
import JourneySelectorVariantC from '@/components/landing/JourneySelectorVariantC';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import TimelineAlert from '@/components/landing/TimelineAlert';
import SocialProofCTA from '@/components/landing/SocialProofCTA';
import CookieConsent from '@/components/analytics/CookieConsent';
import { useEffect, useMemo } from 'react';
import { trackScrollDepth } from '@/utils/analytics';
import { 
  getVariant, 
  recordImpression, 
  hasOptedOutOfTracking,
  type ExperimentName 
} from '@/utils/abTesting';

export default function Home() {
  // A/B Test Variant Assignment
  const heroVariant = useMemo(() => {
    if (hasOptedOutOfTracking()) return 'A';
    return getVariant('hero_cta');
  }, []);

  const journeyVariant = useMemo(() => {
    if (hasOptedOutOfTracking()) return 'A';
    return getVariant('journey_layout');
  }, []);

  const socialProofVariant = useMemo(() => {
    if (hasOptedOutOfTracking()) return 'A';
    return getVariant('social_proof_placement');
  }, []);

  // Record impressions on mount
  useEffect(() => {
    if (!hasOptedOutOfTracking()) {
      recordImpression('hero_cta', heroVariant);
      recordImpression('journey_layout', journeyVariant);
      recordImpression('social_proof_placement', socialProofVariant);
    }
  }, [heroVariant, journeyVariant, socialProofVariant]);

  // Render hero variant
  const renderHeroSection = () => {
    switch (heroVariant) {
      case 'B':
        return <HeroSectionVariantB />;
      case 'C':
        return <HeroSectionVariantC />;
      default:
        return <HeroSection />;
    }
  };

  // Render journey selector variant
  const renderJourneySelector = () => {
    switch (journeyVariant) {
      case 'B':
        return <JourneySelectorVariantB />;
      case 'C':
        return <JourneySelectorVariantC />;
      default:
        return <JourneySelector />;
    }
  };

  // Track scroll depth
  useEffect(() => {
    const scrollDepthTracked = {
      25: false,
      50: false,
      75: false,
      100: false,
    };

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

      // Track 25% depth
      if (scrollPercent >= 25 && !scrollDepthTracked[25]) {
        scrollDepthTracked[25] = true;
        trackScrollDepth(25);
      }

      // Track 50% depth
      if (scrollPercent >= 50 && !scrollDepthTracked[50]) {
        scrollDepthTracked[50] = true;
        trackScrollDepth(50);
      }

      // Track 75% depth
      if (scrollPercent >= 75 && !scrollDepthTracked[75]) {
        scrollDepthTracked[75] = true;
        trackScrollDepth(75);
      }

      // Track 100% depth
      if (scrollPercent >= 99 && !scrollDepthTracked[100]) {
        scrollDepthTracked[100] = true;
        trackScrollDepth(100);
      }
    };

    // Debounce scroll events (fire max once per second)
    let scrollTimeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 1000);
    };

    window.addEventListener('scroll', debouncedScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  return (
    <>
      <SEOHead
        title="P29 Implementation Playbook | UK Corporate Governance"
        description="Complete 24-month roadmap for Provision 29 compliance. Templates, guidance, and tools for January 2026 deadline."
        canonical={window.location.origin}
      />

      <main>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
        >
          Skip to main content
        </a>

        {/* Sticky deadline alert */}
        <TimelineAlert 
          sticky={true}
          showDismiss={true}
          deadline="2026-01-01"
        />

        {/* Main content sections */}
        <div id="main-content">
          {/* Hero - A/B Test Variants */}
          {renderHeroSection()}

          {/* Social Proof - Variant B: After Hero */}
          {socialProofVariant === 'B' && <SocialProofCTA />}

          {/* Journey Selector - A/B Test Variants */}
          {renderJourneySelector()}

          {/* Features Grid */}
          <FeaturesGrid />

          {/* Social Proof - Variant A: At Bottom (Control) */}
          {socialProofVariant === 'A' && <SocialProofCTA />}

          {/* Note: Variant C (Floating Widget) not yet implemented */}
        </div>

        {/* Cookie Consent Banner */}
        <CookieConsent />
      </main>
    </>
  );
}
