import { Quote, Star, ArrowRight, Zap, CheckCircle, Shield, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SocialProofCTA() {
  const navigate = useNavigate();

  const trustIndicators = [
    {
      icon: CheckCircle,
      text: 'FTSE 350 Ready'
    },
    {
      icon: Shield,
      text: 'FRC Aligned'
    },
    {
      icon: RefreshCw,
      text: 'Updated Nov 2025'
    }
  ];

  return (
    <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 py-20 px-4 text-white">
      <div className="max-w-[1000px] mx-auto text-center">
        {/* Testimonial Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-12 rounded-2xl shadow-2xl mb-12">
          {/* Quote Icon */}
          <Quote className="text-blue-300 mx-auto mb-4" size={48} />

          {/* Quote Text */}
          <p className="text-xl md:text-2xl italic text-white mb-8 leading-relaxed">
            "This playbook transformed our P29 implementation. What seemed overwhelming became manageable with clear phases, practical templates, and actionable guidance. An invaluable resource for any governance team."
          </p>

          {/* Attribution */}
          <div className="space-y-2">
            <p className="text-sm md:text-base text-blue-200 font-semibold">
              Sarah Mitchell
            </p>
            <p className="text-sm md:text-base text-blue-200">
              Chief Risk Officer
            </p>
            <p className="text-sm md:text-base text-blue-200">
              FTSE 250 Financial Services Company
            </p>

            {/* Star Rating */}
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main CTA Section */}
        <div>
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your P29 Implementation?
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-blue-100 mb-12">
            Join governance teams across the UK preparing for January 2026
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/getting-started')}
              className="w-full sm:w-auto bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              Get Started Now
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Schedule a Demo
            </button>
          </div>

          {/* Quick Start Prompt */}
          <div className="inline-flex items-center gap-2 bg-white/5 px-6 py-4 rounded-full mb-12">
            <Zap className="text-yellow-400 flex-shrink-0" size={20} />
            <p className="text-sm text-blue-100">
              Quick Start: Take the 15-minute readiness assessment to get your customised implementation plan
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {trustIndicators.map((indicator) => {
              const IconComponent = indicator.icon;
              return (
                <div 
                  key={indicator.text}
                  className="flex flex-col items-center gap-2"
                >
                  <IconComponent className="text-blue-300" size={24} />
                  <p className="text-sm text-blue-200">
                    {indicator.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
