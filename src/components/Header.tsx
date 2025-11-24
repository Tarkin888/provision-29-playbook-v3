import { useState } from 'react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import VendorLogo from './vendor/VendorLogo';
import VendorTagline from './vendor/VendorTagline';
import SearchBar from './search/SearchBar';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/getting-started', label: 'Getting Started' },
    { to: '/roadmap', label: 'Roadmap' },
  ];

  const resourcesLinks = [
    { to: '/templates', label: 'Templates' },
    { to: '/resources', label: 'Resource Hub' },
    { to: '/roles', label: 'Role Guides' },
  ];

  const toolsLinks = [
    { to: '/assessment', label: 'Readiness Assessment' },
    { to: '/progress', label: 'Progress Tracker' },
    { to: '/faq', label: 'FAQ' },
    { to: '/glossary', label: 'Glossary' },
  ];

  const allMobileLinks = [
    ...navLinks,
    { to: '/features', label: 'Features' },
    ...resourcesLinks,
    ...toolsLinks,
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
          <nav className="hidden lg:flex items-center gap-1">
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

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-accent">
                Resources
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border shadow-lg z-50">
                {resourcesLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.to}
                    onClick={() => navigate(link.to)}
                    className="cursor-pointer hover:bg-accent"
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-accent">
                Tools
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border shadow-lg z-50">
                {toolsLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.to}
                    onClick={() => navigate(link.to)}
                    className="cursor-pointer hover:bg-accent"
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Features Link */}
            <NavLink
              to="/features"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
              activeClassName="text-primary bg-accent"
            >
              Features
            </NavLink>
          </nav>

          {/* Desktop: Search & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <SearchBar />
            <Button 
              onClick={() => navigate('/assessment')}
              className="bg-primary hover:bg-primary/90"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Now
            </Button>
          </div>

          {/* Mobile: Search & Menu */}
          <div className="flex lg:hidden items-center gap-2">
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
        navLinks={allMobileLinks}
      />
    </>
  );
};
