import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: string;
  question: string;
  selectedAnswer: string;
  points: number;
  maxPoints: number;
}

interface DomainScoreCardProps {
  icon: string;
  name: string;
  score: number;
  maxScore: number;
  color: string;
  questions: Question[];
  recommendations: string[];
  children?: React.ReactNode;
}

const DomainScoreCard = ({ icon, name, score, maxScore, color, questions, recommendations, children }: DomainScoreCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const percentage = (score / maxScore) * 100;

  const getStatus = () => {
    if (score < 10) return { label: 'Critical', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
    if (score < 18) return { label: 'Needs Work', bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' };
    return { label: 'Strong', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
  };

  const status = getStatus();

  const getQuestionIcon = (points: number, maxPoints: number) => {
    if (points === maxPoints) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (points === 0) return <XCircle className="h-5 w-5 text-red-500" />;
    return <AlertCircle className="h-5 w-5 text-amber-500" />;
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{icon}</div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-2xl font-semibold text-foreground">{score}</span>
                <span className="text-muted-foreground">out of {maxScore} points</span>
              </div>
            </div>
          </div>
          <div className={`${status.bg} ${status.text} px-3 py-1 rounded-full text-sm font-semibold border ${status.border}`}>
            {status.label}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{Math.round(percentage)}% complete</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="w-full justify-between"
        >
          View Details
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {expanded && (
          <div className="space-y-6 pt-4 border-t">
            {/* Question breakdown */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Question Breakdown</h4>
              {questions.map((q) => (
                <div key={q.id} className="flex items-start space-x-3 text-sm">
                  {getQuestionIcon(q.points, q.maxPoints)}
                  <div className="flex-1">
                    <p className="text-foreground">{q.question}</p>
                    <p className="text-muted-foreground mt-1">
                      <span className="font-medium">{q.selectedAnswer}</span>
                      <span className="ml-2">({q.points}/{q.maxPoints} points)</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Recommendations</h4>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vendor-specific content */}
            {children}
          </div>
        )}
      </div>
    </Card>
  );
};

export default DomainScoreCard;
