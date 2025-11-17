import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickLink {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'outline' | 'secondary';
}

interface QuickLinksProps {
  title?: string;
  links: QuickLink[];
  className?: string;
}

const QuickLinks = ({ title = 'Quick Actions', links, className = '' }: QuickLinksProps) => {
  const navigate = useNavigate();

  if (links.length === 0) return null;

  const handleClick = (link: QuickLink) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.href) {
      if (link.href.startsWith('http')) {
        window.open(link.href, '_blank', 'noopener,noreferrer');
      } else {
        navigate(link.href);
      }
    }
  };

  return (
    <Card className={`p-4 md:p-6 ${className}`}>
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">{title}</h3>
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
        {links.map((link, index) => (
          <Button
            key={index}
            variant={link.variant || 'outline'}
            onClick={() => handleClick(link)}
            className="justify-start sm:justify-center min-h-[44px]"
          >
            {link.icon}
            <span className="ml-2">{link.label}</span>
            {link.href?.startsWith('http') ? (
              <ExternalLink className="ml-2 h-4 w-4" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickLinks;
