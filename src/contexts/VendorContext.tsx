import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import vendorConfigData from '@/data/vendorConfig.json';

const ALLOWED_VENDORS = ['readinow', 'protecht', 'nooga', 'impero'] as const;
const HSL_PATTERN = /^\d{1,3}\s+\d{1,3}%\s+\d{1,3}%$/;

interface VendorData {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  tagline: string;
  intro: string;
  recommendations: {
    governance: string;
    risk: string;
    control: string;
    assurance: string;
    technology: string;
  };
  ctaButton: {
    text: string;
    url: string;
  };
  contactPerson: {
    name: string;
    title: string;
    email: string;
    photo: string;
  };
}

interface VendorConfig {
  isVendorMode: boolean;
  vendor: VendorData | null;
  primaryColor: string;
  secondaryColor: string;
}

const VendorContext = createContext<VendorConfig>({
  isVendorMode: false,
  vendor: null,
  primaryColor: '221 83% 53%',
  secondaryColor: '168 76% 42%',
});

export const useVendor = () => {
  const context = useContext(VendorContext);
  return context;
};

interface VendorProviderProps {
  children: ReactNode;
}

export const VendorProvider = ({ children }: VendorProviderProps) => {
  const [vendorConfig, setVendorConfig] = useState<VendorConfig>({
    isVendorMode: false,
    vendor: null,
    primaryColor: '221 83% 53%',
    secondaryColor: '168 76% 42%',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vendorId = params.get('vendor');

    // Validate vendor ID against allowlist
    if (vendorId && ALLOWED_VENDORS.includes(vendorId as any)) {
      const vendorData = vendorConfigData.vendors[vendorId as keyof typeof vendorConfigData.vendors] as VendorData;
      
      // Validate HSL color format before injection
      if (HSL_PATTERN.test(vendorData.primaryColor) && HSL_PATTERN.test(vendorData.secondaryColor)) {
        // Inject CSS variables for dynamic theming
        document.documentElement.style.setProperty('--vendor-primary', vendorData.primaryColor);
        document.documentElement.style.setProperty('--vendor-secondary', vendorData.secondaryColor);

        setVendorConfig({
          isVendorMode: true,
          vendor: vendorData,
          primaryColor: vendorData.primaryColor,
          secondaryColor: vendorData.secondaryColor,
        });
      } else {
        if (import.meta.env.DEV) {
          console.warn('Invalid vendor color format:', vendorId);
        }
      }
    } else {
      // Reset to default colors
      document.documentElement.style.setProperty('--vendor-primary', '221 83% 53%');
      document.documentElement.style.setProperty('--vendor-secondary', '168 76% 42%');
    }
  }, []);

  return (
    <VendorContext.Provider value={vendorConfig}>
      {children}
    </VendorContext.Provider>
  );
};
