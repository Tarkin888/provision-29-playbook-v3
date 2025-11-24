import { Calendar, FileText, Users, ClipboardCheck, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeaturesGrid() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      iconColor: 'text-blue-600',
      title: '24-Month Roadmap',
      description: 'Phased implementation plan with milestones, dependencies, and timeline',
      badge: '4 Phases',
      badgeColor: 'bg-blue-100 text-blue-700'
    },
    {
      icon: FileText,
      iconColor: 'text-green-600',
      title: 'Template Library',
      description: '15+ ready-to-use templates including control definitions, testing protocols, and board packs',
      badge: '15+ Templates',
      badgeColor: 'bg-green-100 text-green-700'
    },
    {
      icon: Users,
      iconColor: 'text-purple-600',
      title: 'Role-Based Guides',
      description: 'Tailored guidance for Board, CFO, CRO, Control Owners, Audit, and Programme Managers',
      badge: '6 Roles',
      badgeColor: 'bg-purple-100 text-purple-700'
    },
    {
      icon: ClipboardCheck,
      iconColor: 'text-orange-600',
      title: 'Readiness Assessment',
      description: '15-minute evaluation across 5 domains with scoring and gap analysis',
      badge: '5 Domains',
      badgeColor: 'bg-orange-100 text-orange-700'
    },
    {
      icon: BookOpen,
      iconColor: 'text-indigo-600',
      title: 'Resource Hub',
      description: 'Articles, case studies, videos, and regulatory guidance from industry experts',
      badge: 'Expert Content',
      badgeColor: 'bg-indigo-100 text-indigo-700'
    },
    {
      icon: Target,
      iconColor: 'text-pink-600',
      title: 'Progress Tracker',
      description: 'Monitor implementation progress with visual dashboards and milestone tracking',
      badge: 'Real-time',
      badgeColor: 'bg-pink-100 text-pink-700'
    }
  ];

  return (
    <section className="bg-white py-12 sm:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
          Everything You Need for P29 Compliance
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-center text-gray-600 max-w-[700px] mx-auto mb-8 sm:mb-16">
          A comprehensive toolkit designed for UK Corporate Governance Code compliance
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="relative bg-gray-50 p-6 sm:p-8 rounded-lg border border-gray-200 hover:bg-white hover:shadow-md active:scale-[0.98] sm:hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Badge - Repositioned for mobile */}
                <span className={`absolute top-4 right-4 text-xs px-2 py-1 rounded-full font-medium ${feature.badgeColor}`}>
                  {feature.badge}
                </span>

                {/* Icon */}
                <div className="mb-3 sm:mb-4">
                  <IconComponent 
                    className={feature.iconColor} 
                    size={32}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 pr-16 sm:pr-0">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-none">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            Ready to explore all features?
          </p>
          <button
            onClick={() => navigate('/features')}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium min-h-[48px]"
          >
            View Detailed Features
          </button>
        </div>
      </div>
    </section>
  );
}
