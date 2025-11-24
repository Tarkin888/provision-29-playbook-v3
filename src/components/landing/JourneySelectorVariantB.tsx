import { Rocket, TrendingUp, CheckCircle, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackJourneySelection } from '@/utils/analytics';
import { recordConversion } from '@/utils/abTesting';

export default function JourneySelectorVariantB() {
  const navigate = useNavigate();

  const handleJourneyClick = (route: string, journeyType: 'starting' | 'progress' | 'ready') => {
    trackJourneySelection(journeyType);
    recordConversion('journey_layout', 'B', 'journey_selected');
    navigate(route);
  };

  const featuredCard = {
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
  };

  const secondaryCards = [
    {
      icon: TrendingUp,
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400',
      title: 'In Progress',
      description: 'Already started? Access your roadmap, templates, and track your implementation progress.',
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

        {/* Layout: Featured Card + 2 Smaller Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Large Featured Card */}
          <div
            onClick={() => handleJourneyClick(featuredCard.route, 'starting')}
            className={`
              lg:row-span-2 bg-white rounded-xl p-8 sm:p-10 border-2 ${featuredCard.borderColor} ${featuredCard.hoverBorder}
              cursor-pointer transition-all duration-300 ease-in-out
              hover:shadow-xl active:scale-[0.98] sm:hover:-translate-y-1
              flex flex-col
            `}
          >
            {/* Icon - Larger for featured card */}
            <div className="mb-6">
              <featuredCard.icon className={`w-16 h-16 ${featuredCard.iconColor}`} />
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold mb-4 text-gray-900">
              {featuredCard.title}
            </h3>

            {/* Description */}
            <p className="text-base text-gray-600 mb-6">
              {featuredCard.description}
            </p>

            {/* Bullet Points */}
            <div className="flex flex-col space-y-3 mb-8 flex-grow">
              {featuredCard.bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-700 flex-shrink-0" />
                  <span className="text-base text-gray-700">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className={`
                w-full py-4 rounded-lg font-semibold text-lg
                transition-colors duration-200 min-h-[48px]
                ${featuredCard.buttonStyle}
              `}
              onClick={(e) => {
                e.stopPropagation();
                handleJourneyClick(featuredCard.route, 'starting');
              }}
            >
              {featuredCard.buttonText}
            </button>
          </div>

          {/* Two Smaller Cards Stacked */}
          <div className="flex flex-col gap-4 sm:gap-8">
            {secondaryCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.title}
                  onClick={() => handleJourneyClick(card.route, card.title === 'In Progress' ? 'progress' : 'ready')}
                  className={`
                    bg-white rounded-xl p-6 border-2 ${card.borderColor} ${card.hoverBorder}
                    cursor-pointer transition-all duration-300 ease-in-out
                    hover:shadow-lg active:scale-[0.98] sm:hover:-translate-y-1
                    flex flex-col
                  `}
                >
                  {/* Icon */}
                  <div className="mb-3">
                    <IconComponent className={`w-10 h-10 ${card.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    {card.description}
                  </p>

                  {/* Button */}
                  <button
                    className={`
                      w-full py-3 rounded-lg font-semibold text-base
                      transition-colors duration-200 min-h-[48px]
                      ${card.buttonStyle}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJourneyClick(card.route, card.title === 'In Progress' ? 'progress' : 'ready');
                    }}
                  >
                    {card.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
