import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';
import { ArrowRight, Calendar, FileText, Users, BookOpen } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Implementation Roadmap',
      description: '4-phase timeline with milestones and deliverables',
      link: '/roadmap',
    },
    {
      icon: FileText,
      title: 'Template Library',
      description: 'Ready-to-use templates for every phase',
      link: '/templates',
    },
    {
      icon: Users,
      title: 'Role-Based Guidance',
      description: 'Tailored advice for every stakeholder',
      link: '/roles',
    },
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'FAQs, glossary, and expert resources',
      link: '/resources',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            P29 Implementation Playbook
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Your complete guide to Provision 29 compliance. Navigate the UK Corporate Governance Code 2024 with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90"
            >
              <NavLink to="/roadmap" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </NavLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <NavLink to="/assessment">
                Take Assessment
              </NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for P29 Compliance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From initial scoping to board declaration, we've got you covered at every step.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <NavLink
              key={feature.title}
              to={feature.link}
              className="group p-6 border rounded-lg hover:border-primary hover:shadow-lg transition-all bg-card"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </NavLink>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your P29 Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            First compliance is required for financial years beginning on or after 1 January 2026. Start your implementation today.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <NavLink to="/assessment" className="flex items-center gap-2">
              Assess Your Readiness
              <ArrowRight className="w-5 h-5" />
            </NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
