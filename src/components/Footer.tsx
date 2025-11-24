import { NavLink } from '@/components/NavLink';
import { Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const sections = [
    {
      title: 'Getting Started',
      links: [
        { to: '/getting-started', label: 'Overview' },
        { to: '/assessment', label: 'Readiness Assessment' },
        { to: '/features', label: 'Platform Features' },
      ]
    },
    {
      title: 'Implementation',
      links: [
        { to: '/roadmap', label: 'Implementation Roadmap' },
        { to: '/templates', label: 'Template Library' },
        { to: '/roles', label: 'Role Guides' },
        { to: '/finalisation', label: 'Finalisation Guide' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { to: '/resources', label: 'Resource Hub' },
        { to: '/faq', label: 'FAQ' },
        { to: '/glossary', label: 'Glossary' },
        { to: '/progress', label: 'Progress Tracker' },
      ]
    },
    {
      title: 'About',
      links: [
        { to: '/contact', label: 'Contact Us' },
        { to: '/features', label: 'Features' },
      ]
    }
  ];

  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-12 max-w-[1200px]">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 Zia Rezvi | Provision 29 Consulting. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@p29playbook.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">hello@p29playbook.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
