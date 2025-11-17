import { useState } from 'react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { Menu, X, FileCheck } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import VendorLogo from './vendor/VendorLogo';
import VendorTagline from './vendor/VendorTagline';
import SearchBar from './search/SearchBar';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/roadmap', label: 'Roadmap' },
    { to: '/templates', label: 'Templates' },
    { to: '/roles', label: 'Roles' },
    { to: '/resources', label: 'Resources' },
    { to: '/faq', label: 'FAQ' },
    { to: '/glossary', label: 'Glossary' },
  ];

  return (
    <>
      <VendorTagline />
      <header className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] bg-background border-b shadow-sm">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <VendorLogo />
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P29</span>
            </div>
            <span className="text-xl font-bold text-foreground">Playbook</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
                activeClassName="text-primary bg-accent"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop: Search & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <SearchBar />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <NavLink to="/assessment" className="flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                Readiness Assessment
              </NavLink>
            </Button>
          </div>

          {/* Mobile: Search & Menu */}
          <div className="flex md:hidden items-center gap-2">
            <SearchBar mobile />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-accent rounded-md transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};
