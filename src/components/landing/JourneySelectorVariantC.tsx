import { Rocket, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackJourneySelection } from '@/utils/analytics';
import { recordConversion } from '@/utils/abTesting';

export default function JourneySelectorVariantC() {
  const navigate = useNavigate();

  const handleJourneyClick = (route: string, journeyType: 'starting' | 'progress' | 'ready') => {
    trackJourneySelection(journeyType);
    recordConversion('journey_layout', 'C', 'journey_selected');
    navigate(route);
  };

  const steps = [
    {
      step: 1,
      icon: Rocket,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      title: 'Just Starting',
      description: 'New to Provision 29? Begin with our comprehensive overview and readiness assessment.',
      buttonText: 'Begin Journey',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
      route: '/getting-started',
      journeyType: 'starting' as const
    },
    {
      step: 2,
      icon: TrendingUp,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      title: 'In Progress',
      description: 'Already started? Access your roadmap, templates, and track your implementation progress.',
      buttonText: 'Continue Implementation',
      buttonStyle: 'bg-green-600 hover:bg-green-700 text-white',
      route: '/roadmap',
      journeyType: 'progress' as const
    },
    {
      step: 3,
      icon: CheckCircle,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      title: 'Almost Ready',
      description: 'Final preparations for your board declaration? Access dry run guides and board pack templates.',
      buttonText: 'Finalise Declaration',
      buttonStyle: 'bg-purple-600 hover:bg-purple-700 text-white',
      route: '/finalisation',
      journeyType: 'ready' as const
    }
  ];

  return (
    <section className="bg-gray-50 py-12 sm:py-16 px-4">
      <div className="max-w-[800px] mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Where Are You in Your P29 Journey?
        </h2>

        {/* Vertical Stepper */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gray-300 hidden sm:block" />

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isLast = index === steps.length - 1;
              
              return (
                <div
                  key={step.title}
                  onClick={() => handleJourneyClick(step.route, step.journeyType)}
                  className="relative cursor-pointer group"
                >
                  <div className={`
                    bg-white rounded-xl p-6 border-2 ${step.borderColor}
                    hover:shadow-lg transition-all duration-300
                    active:scale-[0.98] sm:hover:-translate-y-0.5
                  `}>
                    <div className="flex items-start gap-4">
                      {/* Step Number Circle */}
                      <div className={`
                        flex-shrink-0 w-16 h-16 rounded-full ${step.bgColor} ${step.borderColor} border-2
                        flex items-center justify-center relative z-10
                      `}>
                        <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="text-sm text-gray-500 font-medium">Step {step.step}</span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                              {step.title}
                            </h3>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1" />
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                          {step.description}
                        </p>

                        <button
                          className={`
                            w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-base
                            transition-colors duration-200 min-h-[48px]
                            ${step.buttonStyle}
                          `}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJourneyClick(step.route, step.journeyType);
                          }}
                        >
                          {step.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector for mobile */}
                  {!isLast && (
                    <div className="flex justify-center py-2 sm:hidden">
                      <ArrowRight className="w-5 h-5 text-gray-300 rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
