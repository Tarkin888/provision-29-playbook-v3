import { useVendor } from '@/contexts/VendorContext';

const VendorLogo = () => {
  const { isVendorMode, vendor } = useVendor();

  if (!isVendorMode || !vendor) return null;

  return (
    <div className="flex items-center space-x-3">
      <img 
        src={vendor.logo} 
        alt={`${vendor.name} logo`}
        className="h-8 w-auto"
        onError={(e) => {
          // Fallback if logo doesn't exist
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="text-muted-foreground">×</span>
    </div>
  );
};

export default VendorLogo;
