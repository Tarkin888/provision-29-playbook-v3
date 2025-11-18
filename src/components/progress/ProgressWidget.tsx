import { useProgress } from '@/contexts/ProgressContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgressWidget = () => {
  const { progress, getOverallProgress, getStreak } = useProgress();
  const navigate = useNavigate();
  const overallProgress = getOverallProgress();
  const streak = getStreak();
  const hasAssessment = progress.assessments.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Completion</span>
            <span className="text-sm text-muted-foreground">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Templates</p>
            <p className="text-lg font-bold">{progress.downloads.length}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Articles Read</p>
            <p className="text-lg font-bold">{progress.articlesRead.length}</p>
          </div>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <span className="text-xl">🔥</span>
            <div>
              <p className="text-sm font-medium">{streak}-day streak</p>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </div>
        )}

        {/* CTA */}
        {!hasAssessment && (
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm font-medium mb-1">Start your P29 journey</p>
            <p className="text-xs text-muted-foreground mb-3">
              Complete the readiness assessment
            </p>
            <Button size="sm" onClick={() => navigate('/assessment')} className="w-full">
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/progress')}
        >
          View Full Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProgressWidget;
