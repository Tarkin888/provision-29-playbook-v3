import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { FileCheck } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ to: string; label: string }>;
}

export const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Menu */}
      <div
        className={`fixed top-[var(--nav-height)] right-0 bottom-0 w-full max-w-sm bg-background border-l shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
              activeClassName="text-primary bg-accent"
            >
              {link.label}
            </NavLink>
          ))}

          <div className="mt-4 pt-4 border-t">
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <NavLink to="/assessment" onClick={onClose} className="flex items-center justify-center gap-2">
                <FileCheck className="w-4 h-4" />
                Readiness Assessment
              </NavLink>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};
