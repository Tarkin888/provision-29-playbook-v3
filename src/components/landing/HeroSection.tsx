import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  
  // Calculate months remaining until January 2026
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

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950 px-4 py-16">
      <div className="w-full max-w-[1200px] text-center">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          UK Corporate Governance Code Provision 29 Implementation Playbook
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-blue-100 max-w-[800px] mx-auto mt-6">
          Complete 24-month roadmap, templates, and expert guidance for January 2026 compliance
        </p>

        {/* Feature Bullets */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-200" />
              <span className="text-lg text-blue-200">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button
            onClick={() => navigate('/getting-started')}
            className="w-full sm:w-auto text-lg px-8 py-4 rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-colors font-semibold"
          >
            Start Implementation
          </button>
          <button
            onClick={() => navigate('/assessment')}
            className="w-full sm:w-auto text-lg px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors font-semibold"
          >
            Take Assessment
          </button>
        </div>

        {/* Urgency Indicator */}
        <div className="inline-flex items-center gap-2 mt-12 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
          <span className="text-sm text-yellow-300 font-medium">
            ⚡ January 2026 deadline: {monthsRemaining} months remaining
          </span>
        </div>
      </div>
    </section>
  );
}
