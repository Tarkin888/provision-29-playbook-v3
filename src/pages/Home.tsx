import SEOHead from '@/components/common/SEOHead';
import HeroSection from '@/components/landing/HeroSection';
import JourneySelector from '@/components/landing/JourneySelector';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import TimelineAlert from '@/components/landing/TimelineAlert';
import SocialProofCTA from '@/components/landing/SocialProofCTA';

export default function Home() {
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
          {/* Hero - Full width */}
          <HeroSection />

          {/* Journey Selector */}
          <JourneySelector />

          {/* Features Grid */}
          <FeaturesGrid />

          {/* Final CTA with Social Proof */}
          <SocialProofCTA />
        </div>
      </main>
    </>
  );
}
