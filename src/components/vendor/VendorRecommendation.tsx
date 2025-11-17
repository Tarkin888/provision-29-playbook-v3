import { useVendor } from '@/contexts/VendorContext';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface VendorRecommendationProps {
  domainId: string;
}

const VendorRecommendation = ({ domainId }: VendorRecommendationProps) => {
  const { isVendorMode, vendor } = useVendor();

  if (!isVendorMode || !vendor) return null;

  const recommendation = vendor.recommendations[domainId as keyof typeof vendor.recommendations];

  if (!recommendation) return null;

  return (
    <Card className="p-4 bg-primary/5 border-primary/30 mt-4">
      <div className="flex items-start space-x-3">
        <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-primary mb-1">
            {vendor.name} Solution
          </p>
          <p className="text-sm text-muted-foreground">
            {recommendation}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VendorRecommendation;
