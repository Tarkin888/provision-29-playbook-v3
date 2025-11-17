import { useVendor } from '@/contexts/VendorContext';

const VendorFooter = () => {
  const { isVendorMode, vendor } = useVendor();

  return (
    <div className="text-center text-sm text-muted-foreground">
      {isVendorMode && vendor ? (
        <p>
          This assessment powered by <span className="font-semibold text-foreground">{vendor.name}</span> in partnership with{' '}
          <a href="https://ziarezvi.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            Zia Rezvi
          </a>
        </p>
      ) : (
        <p>
          © 2025 P29 Playbook by{' '}
          <a href="https://ziarezvi.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            Zia Rezvi
          </a>
        </p>
      )}
    </div>
  );
};

export default VendorFooter;
