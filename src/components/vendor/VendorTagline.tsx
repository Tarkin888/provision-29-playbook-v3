import { useVendor } from '@/contexts/VendorContext';

const VendorTagline = () => {
  const { isVendorMode, vendor } = useVendor();

  if (!isVendorMode || !vendor) return null;

  return (
    <div className="text-center py-2 bg-muted/30">
      <p className="text-sm text-muted-foreground italic">{vendor.tagline}</p>
    </div>
  );
};

export default VendorTagline;
