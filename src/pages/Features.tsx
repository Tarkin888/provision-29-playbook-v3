import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SEOHead from '@/components/common/SEOHead';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import { Calendar, FileText, Users, ClipboardCheck, BookOpen, Target, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      name: 'Phased Implementation Guide',
      description: 'Our comprehensive framework breaks down the P29 implementation journey into four manageable phases. Each phase includes detailed milestones, dependencies, and flexible timeline guidance. The framework adapts to your fiscal year-end and current maturity level, providing a personalized implementation schedule that accounts for your organisation\'s unique circumstances.',
      capabilities: [
        'Four-phase approach with clear milestones and deliverables',
        'Timeline calculator based on fiscal year-end and maturity',
        'Dependency mapping between phases and activities',
        'Accelerated track options for different starting points',
        'Visual timeline and calendar views',
        'Progress tracking with completion percentages',
        'Integration with template library for deliverables'
      ],
      route: '/roadmap',
      imagePlaceholder: 'Roadmap timeline visualization showing 4 phases'
    },
    {
      icon: FileText,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      name: 'Template Library',
      description: 'Access 15+ professionally crafted templates covering every aspect of P29 implementation. Each template is based on real FTSE 100 experience and includes detailed instructions, examples, and best practices. Templates are provided in Excel and Word formats, fully editable to match your organization\'s needs and branding.',
      capabilities: [
        'Material control definition templates',
        'Control testing protocols and procedures',
        'Evidence collection frameworks',
        'Risk and control matrices',
        'Board pack templates and presentation materials',
        'Stakeholder communication templates',
        'Gap analysis and remediation trackers'
      ],
      route: '/templates',
      imagePlaceholder: 'Template gallery showing various document types'
    },
    {
      icon: Users,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      name: 'Role-Based Implementation Guides',
      description: 'P29 implementation requires coordinated effort across multiple roles. Our role-based guides provide tailored guidance for each key stakeholder, clarifying responsibilities, deliverables, and time commitments. Whether you\'re a Board member, CFO, CRO, Control Owner, Internal Auditor, or Programme Manager, you\'ll find specific guidance relevant to your role.',
      capabilities: [
        'Board member responsibilities and decision points',
        'CFO financial reporting control requirements',
        'CRO risk assessment and oversight guidance',
        'Control Owner documentation and testing requirements',
        'Internal Audit validation and assurance approach',
        'Programme Manager coordination and tracking tools',
        'Cross-functional collaboration frameworks'
      ],
      route: '/roles',
      imagePlaceholder: 'Role overview diagram showing key stakeholders'
    },
    {
      icon: ClipboardCheck,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      name: 'Readiness Assessment Tool',
      description: 'Our comprehensive readiness assessment evaluates your organization across five critical domains: Governance & Oversight, Control Identification, Documentation & Evidence, Testing & Validation, and Board Readiness. Complete the 15-minute assessment to receive a detailed maturity score, gap analysis, and personalized recommendations for your implementation journey.',
      capabilities: [
        'Five-domain maturity assessment framework',
        'Detailed scoring with radar chart visualization',
        'Gap identification with priority recommendations',
        'Benchmark comparisons against industry peers',
        'Downloadable assessment reports',
        'Progress tracking for follow-up assessments',
        'Integration with roadmap for timeline adjustment'
      ],
      route: '/assessment',
      imagePlaceholder: 'Assessment dashboard with radar chart'
    },
    {
      icon: BookOpen,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      name: 'Resource Hub',
      description: 'Access our curated library of articles, case studies, video tutorials, and regulatory guidance. Stay current with the latest FRC updates, learn from real-world implementation experiences, and access expert insights on complex P29 topics. Our resource hub is continuously updated with new content based on emerging best practices and regulatory developments.',
      capabilities: [
        'Expert articles on P29 implementation topics',
        'Real-world case studies from FTSE companies',
        'Video tutorials and walkthroughs',
        'FRC guidance and regulatory updates',
        'Common pitfalls and how to avoid them',
        'Industry webinar recordings',
        'FAQ database with searchable answers'
      ],
      route: '/resources',
      imagePlaceholder: 'Resource library with content cards'
    },
    {
      icon: Target,
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      name: 'Progress Tracking Dashboard',
      description: 'Monitor your P29 implementation progress with visual dashboards and milestone tracking. The progress tracker integrates with your roadmap, templates, and assessment results to provide a real-time view of your implementation status. Track completed activities, identify upcoming milestones, and ensure you\'re on track for your January 2026 declaration.',
      capabilities: [
        'Real-time implementation progress dashboard',
        'Milestone completion tracking',
        'Phase-level and activity-level progress metrics',
        'Visual progress bars and completion percentages',
        'Upcoming tasks and deadline alerts',
        'Team member activity tracking',
        'Export progress reports for stakeholder updates'
      ],
      route: '/progress',
      imagePlaceholder: 'Progress dashboard with metrics and charts'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Platform Features - P29 Implementation Playbook"
        description="Explore comprehensive features including phased implementation framework, templates, role guides, assessment tools, resources, and progress tracking for P29 compliance."
      />

      <div className="container mx-auto px-4 py-12 max-w-[1200px]">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Features' }
        ]} />

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Platform Features
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for successful Provision 29 implementation, from planning to board declaration
          </p>
        </div>

        {/* Features - Alternating Layout */}
        <div className="space-y-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <section key={feature.name} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                {/* Image Placeholder */}
                <div className="flex-1">
                  <Card className={`${feature.bgColor} border-2 p-8 aspect-video flex items-center justify-center`}>
                    <div className="text-center">
                      <IconComponent className={`${feature.iconColor} mx-auto mb-4`} size={96} strokeWidth={1.5} />
                      <p className="text-sm text-muted-foreground italic">
                        {feature.imagePlaceholder}
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${feature.bgColor} p-3 rounded-lg`}>
                      <IconComponent className={feature.iconColor} size={40} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {feature.name}
                    </h2>
                  </div>
                  
                  <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Key Capabilities:</h3>
                    <ul className="space-y-2">
                      {feature.capabilities.map((capability) => (
                        <li key={capability} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={() => navigate(feature.route)}>
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </section>
            );
          })}
        </div>

        {/* Demo Video Placeholder */}
        <section className="my-20 bg-gray-50 dark:bg-gray-900 -mx-4 px-4 py-16">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              See the Platform in Action
            </h2>
            <Card className="aspect-video flex items-center justify-center bg-muted">
              <div>
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Demo video coming soon</p>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 bg-primary/5 -mx-4 px-4 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access all features and begin your P29 implementation journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/getting-started')}>
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/assessment')}>
              Take Assessment
            </Button>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
