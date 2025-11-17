import { useVendor } from '@/contexts/VendorContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, User } from 'lucide-react';

const VendorContact = () => {
  const { isVendorMode, vendor } = useVendor();

  if (!isVendorMode || !vendor) return null;

  const { contactPerson } = vendor;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">
        Get Personalised Support
      </h3>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {contactPerson.photo ? (
            <img
              src={contactPerson.photo}
              alt={contactPerson.name}
              className="h-16 w-16 rounded-full object-cover"
              onError={(e) => {
                // Fallback to icon if image doesn't load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center ${contactPerson.photo ? 'hidden' : ''}`}>
            <User className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{contactPerson.name}</p>
          <p className="text-sm text-muted-foreground mb-2">{contactPerson.title}</p>
          <p className="text-sm text-muted-foreground mb-4">
            Contact {contactPerson.name.split(' ')[0]} for a personalised demo and consultation on how {vendor.name} can accelerate your P29 compliance journey.
          </p>
          <Button asChild variant="outline" size="sm">
            <a href={`mailto:${contactPerson.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              {contactPerson.email}
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VendorContact;
