import { useVendor } from '@/contexts/VendorContext';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

const VendorIntro = () => {
  const { isVendorMode, vendor } = useVendor();

  if (!isVendorMode || !vendor) return null;

  return (
    <Card className="p-6 bg-primary/5 border-primary/20">
      <div className="flex items-start space-x-3">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-foreground leading-relaxed">
            {vendor.intro}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VendorIntro;
