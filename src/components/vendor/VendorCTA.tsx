import { useVendor } from '@/contexts/VendorContext';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface VendorCTAProps {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const VendorCTA = ({ variant = 'default', size = 'default', className = '' }: VendorCTAProps) => {
  const { isVendorMode, vendor } = useVendor();

  if (!isVendorMode || !vendor) {
    // Default CTA when no vendor
    return (
      <Button variant={variant} size={size} className={className} asChild>
        <a href="mailto:zia@ziarezvi.com">
          Book a Consultation
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a href={vendor.ctaButton.url} target="_blank" rel="noopener noreferrer">
        {vendor.ctaButton.text}
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
};

export default VendorCTA;
