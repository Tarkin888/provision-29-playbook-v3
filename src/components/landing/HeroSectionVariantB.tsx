import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { trackPageView, trackCTAClick } from '@/utils/analytics';
import { recordConversion } from '@/utils/abTesting';

export default function HeroSectionVariantB() {
  const navigate = useNavigate();
  
  useEffect(() => {
    trackPageView('landing_hero_variant_b');
  }, []);
  
  const today = new Date();
  const deadline = new Date('2026-01-01');
  const monthsRemaining = Math.max(
    0,
    Math.floor((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30))
  );

  const features = [
    '24-Month Roadmap',
    '15+ Templates',
    'Role-Based Guidance'
  ];

  const handleCTAClick = (ctaName: string, route: string) => {
    trackCTAClick(ctaName, 'hero_variant_b');
    recordConversion('hero_cta', 'B', 'cta_click');
    navigate(route);
  };

  return (
    <section className="relative min-h-[100vh] sm:min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 px-4 py-12 sm:py-16 safe-area-inset">
      <div className="w-full max-w-[1200px] text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
          UK Corporate Governance Code Provision 29 Implementation Playbook
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-[800px] mx-auto mt-4 sm:mt-6">
          Complete 24-month roadmap, templates, and expert guidance for January 2026 compliance
        </p>

        {/* Feature Bullets */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-200 flex-shrink-0" />
              <span className="text-base sm:text-lg text-blue-200">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons - VARIANT B TEXT */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => handleCTAClick('Begin Your Journey', '/getting-started')}
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-colors font-semibold min-h-[48px]"
          >
            Begin Your Journey
          </button>
          <button
            onClick={() => handleCTAClick('Check Readiness', '/assessment')}
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors font-semibold min-h-[48px]"
          >
            Check Readiness
          </button>
        </div>

        {/* Urgency Indicator */}
        <div className="inline-flex items-center gap-2 mt-8 sm:mt-12 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm w-full sm:w-auto max-w-md sm:max-w-none">
          <span className="text-xs sm:text-sm text-yellow-300 font-medium text-center flex-1">
            ⚡ January 2026 deadline: <strong className="text-sm sm:text-base">{monthsRemaining}</strong> months remaining
          </span>
        </div>
      </div>
    </section>
  );
}
