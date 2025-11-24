import { Rocket, TrendingUp, CheckCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function JourneySelector() {
  const navigate = useNavigate();

  const journeyCards = [
    {
      icon: Rocket,
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
      title: 'Just Starting',
      description: 'New to Provision 29? Begin with our comprehensive overview and readiness assessment.',
      bullets: [
        'What is P29?',
        '15-minute assessment',
        'Quick start guide'
      ],
      buttonText: 'Begin Journey',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
      route: '/getting-started'
    },
    {
      icon: TrendingUp,
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400',
      title: 'In Progress',
      description: 'Already started? Access your roadmap, templates, and track your implementation progress.',
      bullets: [
        '24-month roadmap',
        'Template library',
        'Progress tracking'
      ],
      buttonText: 'Continue Implementation',
      buttonStyle: 'bg-green-600 hover:bg-green-700 text-white',
      route: '/roadmap'
    },
    {
      icon: CheckCircle,
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-400',
      title: 'Almost Ready',
      description: 'Final preparations for your board declaration? Access dry run guides and board pack templates.',
      bullets: [
        'Dry run checklist',
        'Board pack template',
        'Final review guide'
      ],
      buttonText: 'Finalise Declaration',
      buttonStyle: 'bg-purple-600 hover:bg-purple-700 text-white',
      route: '/finalisation'
    }
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Where Are You in Your P29 Journey?
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {journeyCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                onClick={() => navigate(card.route)}
                className={`
                  h-full bg-white rounded-xl p-6 sm:p-8 border-2 ${card.borderColor} ${card.hoverBorder}
                  cursor-pointer transition-all duration-300 ease-in-out
                  hover:shadow-lg active:scale-[0.98] sm:hover:-translate-y-1
                  flex flex-col
                `}
              >
                {/* Icon */}
                <div className="mb-3 sm:mb-4">
                  <IconComponent className={`w-10 h-10 sm:w-12 sm:h-12 ${card.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                  {card.description}
                </p>

                {/* Bullet Points - Hidden on small mobile, visible on larger screens */}
                <div className="hidden sm:flex flex-col space-y-2 mb-4 sm:mb-6 flex-grow">
                  {card.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-gray-700 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  className={`
                    w-full py-3 sm:py-3 rounded-lg font-semibold text-base
                    transition-colors duration-200 min-h-[48px]
                    ${card.buttonStyle}
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(card.route);
                  }}
                >
                  {card.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
