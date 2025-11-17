import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  domain: string;
  priority: 'Critical' | 'Important' | 'Optimize';
  effort: string;
  resources?: string[];
}

const ActionCard = ({ title, description, domain, priority, effort, resources }: ActionCardProps) => {
  const [planned, setPlanned] = useState(false);

  const getPriorityStyle = () => {
    switch (priority) {
      case 'Critical':
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
      case 'Important':
        return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' };
      case 'Optimize':
        return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    }
  };

  const priorityStyle = getPriorityStyle();

  return (
    <Card className={`p-4 md:p-6 ${planned ? 'border-primary bg-primary/5' : ''}`}>
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={`${priorityStyle.bg} ${priorityStyle.text} border ${priorityStyle.border} text-xs sm:text-sm`}>
                {priority}
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">{domain}</Badge>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">{title}</h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>

        <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock className="h-4 w-4" />
            <span>Est. {effort}</span>
          </div>
        </div>

        {resources && resources.length > 0 && (
          <div className="pt-2 border-t">
            <Button variant="link" className="p-0 h-auto text-primary text-sm">
              View Recommended Resources
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Checkbox
            id={`planned-${title}`}
            checked={planned}
            onCheckedChange={(checked) => setPlanned(checked as boolean)}
            className="min-h-[24px] min-w-[24px]"
          />
          <label
            htmlFor={`planned-${title}`}
            className="text-xs sm:text-sm font-medium cursor-pointer text-foreground min-h-[44px] flex items-center"
          >
            Mark as planned
          </label>
        </div>
      </div>
    </Card>
  );
};

export default ActionCard;
