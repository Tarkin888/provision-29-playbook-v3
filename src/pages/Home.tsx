import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NavLink } from '@/components/NavLink';
import SEOHead from '@/components/common/SEOHead';
import ProgressWidget from '@/components/progress/ProgressWidget';
import { 
  ArrowRight, 
  ClipboardCheck, 
  Map, 
  FileText, 
  Users, 
  BookOpen, 
  HelpCircle, 
  BookMarked,
  Linkedin,
  Mail
} from 'lucide-react';

const Home = () => {
  const navigationTiles = [
    {
      icon: '🗺️',
      title: 'Implementation Roadmap',
      description: '24-month journey from scoping to declaration',
      link: '/roadmap',
      color: 'phase1',
    },
    {
      icon: '📄',
      title: 'Template Library',
      description: '15 ready-to-use templates and tools',
      link: '/templates',
      color: 'phase2',
    },
    {
      icon: '👥',
      title: 'Role Guides',
      description: 'Tailored guidance for boards, CFOs, risk, audit',
      link: '/roles',
      color: 'phase3',
    },
    {
      icon: '📚',
      title: 'Resources Hub',
      description: 'Articles, case studies, and best practices',
      link: '/resources',
      color: 'phase4',
    },
    {
      icon: '❓',
      title: 'FAQ',
      description: 'Answers to common P29 questions',
      link: '/faq',
      color: 'muted',
    },
    {
      icon: '📖',
      title: 'Glossary',
      description: 'Key terms and definitions',
      link: '/glossary',
      color: 'muted',
    },
  ];

  const stats = [
    { value: '16 months', label: 'Implementation duration' },
    { value: '200+ controls', label: 'Material controls defined' },
    { value: 'FTSE 100', label: 'Market segment' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'phase1':
        return 'border-l-phase1';
      case 'phase2':
        return 'border-l-phase2';
      case 'phase3':
        return 'border-l-phase3';
      case 'phase4':
        return 'border-l-phase4';
      default:
        return 'border-l-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="P29 Implementation Playbook"
        description="Expert guidance for FTSE-listed companies implementing UK Corporate Governance Code Provision 29. 24-month roadmap, templates, and resources."
        canonical={window.location.origin}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-blue-50/50 to-background">
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground leading-tight">
              Your Partner for Provision 29 Compliance
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              Expert guidance for FTSE-listed companies implementing UK Corporate Governance Code Provision 29, based on hands-on FTSE 100 experience
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover-scale min-h-[48px]"
              >
                <NavLink to="/assessment" className="flex items-center justify-center gap-2">
                  <ClipboardCheck className="w-5 h-5" />
                  <span className="text-base">Start Readiness Assessment</span>
                </NavLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 hover:bg-accent transition-all min-h-[48px]"
              >
                <NavLink to="/roadmap" className="flex items-center justify-center gap-2">
                  <Map className="w-5 h-5" />
                  <span className="text-base">View Implementation Roadmap</span>
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is P29 Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <Card className="max-w-4xl mx-auto p-6 md:p-8 border-l-4 border-l-primary shadow-lg animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="text-3xl sm:text-4xl">📋</div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-foreground">
                What is Provision 29?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Provision 29 of the UK Corporate Governance Code requires FTSE 350 boards to declare annually that they have established procedures to identify and manage material controls. The first declarations are due in 2026 Annual Reports.
              </p>
              <NavLink 
                to="/faq" 
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline story-link min-h-[44px]"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </Card>
      </section>

      {/* Quick Navigation Tiles */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Navigate Your P29 Implementation
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Access expert guidance, templates, and resources at every stage of your journey
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Progress Widget - Span 2 columns on larger screens */}
            <div className="sm:col-span-2 lg:col-span-1">
              <ProgressWidget />
            </div>

            {/* First 2 navigation tiles */}
            {navigationTiles.slice(0, 2).map((tile, index) => (
              <NavLink
                key={tile.title}
                to={tile.link}
                className={`group relative p-6 bg-card border rounded-lg border-l-4 ${getColorClasses(tile.color)} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in min-h-[180px]`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="text-3xl sm:text-4xl mb-3 md:mb-4">{tile.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {tile.description}
                  </p>
                  <div className="flex justify-end">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </NavLink>
            ))}
          </div>

          {/* Remaining navigation tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {navigationTiles.slice(2).map((tile, index) => (
              <NavLink
                key={tile.title}
                to={tile.link}
                className={`group relative p-6 bg-card border rounded-lg border-l-4 ${getColorClasses(tile.color)} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in min-h-[180px]`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="text-3xl sm:text-4xl mb-3 md:mb-4">{tile.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {tile.description}
                  </p>
                  <div className="flex justify-end">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-muted">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-12">
              Built on Real FTSE 100 Experience
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="p-6 bg-background rounded-lg shadow-sm animate-scale-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground italic">
              Based on Sainsbury's Material Controls Programme (2023-2024)
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
              © 2025 Zia Rezvi | Provision 29 Consulting
            </div>
            
            <div className="flex items-center gap-4 md:gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@p29playbook.com"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">hello@p29playbook.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
