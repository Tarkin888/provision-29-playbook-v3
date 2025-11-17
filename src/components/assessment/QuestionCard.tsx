import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuestionOption {
  text: string;
  points: number;
}

interface QuestionCardProps {
  question: string;
  options: QuestionOption[];
  selectedValue: string | undefined;
  onSelect: (value: string, points: number) => void;
  domainName: string;
  domainColor: string;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  options,
  selectedValue,
  onSelect,
  domainName,
  domainColor,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) => {
  return (
    <Card className="p-4 sm:p-6 md:p-8">
      <div className="mb-4 md:mb-6">
        <Badge 
          variant="secondary" 
          className="mb-3 md:mb-4 text-xs sm:text-sm"
          style={{ backgroundColor: `${domainColor}20`, color: domainColor }}
        >
          {domainName}
        </Badge>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{question}</h3>
      </div>

      <RadioGroup value={selectedValue} onValueChange={(value) => {
        const selectedOption = options.find((_, index) => index.toString() === value);
        if (selectedOption) {
          onSelect(value, selectedOption.points);
        }
      }}>
        <div className="space-y-2 md:space-y-3">
          {options.map((option, index) => (
            <Label
              key={index}
              htmlFor={`option-${index}`}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 min-h-[60px]",
                selectedValue === index.toString()
                  ? "border-primary bg-primary/5"
                  : "border-border"
              )}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                className="mt-0.5 flex-shrink-0"
              />
              <span className="text-sm sm:text-base flex-1 leading-relaxed">{option.text}</span>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </Card>
  );
};

export default QuestionCard;
