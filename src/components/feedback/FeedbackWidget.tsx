import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageSquare, Send, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

const feedbackSchema = z.object({
  type: z.enum(['general', 'bug', 'feature', 'content']),
  message: z.string()
    .trim()
    .min(10, 'Feedback must be at least 10 characters')
    .max(1000, 'Feedback must be under 1000 characters')
});

const FeedbackWidget = () => {
  const [open, setOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string>('general');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      // Validate input
      const validatedData = feedbackSchema.parse({
        type: feedbackType,
        message: feedback
      });
      // Store feedback in localStorage (in production, send to backend)
      const storedFeedback = JSON.parse(localStorage.getItem('p29-feedback') || '[]');
      const newFeedback = {
        id: Date.now(),
        type: validatedData.type,
        message: validatedData.message,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        userAgent: navigator.userAgent,
      };
      
      storedFeedback.push(newFeedback);
      localStorage.setItem('p29-feedback', JSON.stringify(storedFeedback));

      // In production, send to backend API
      // await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newFeedback)
      // });

      toast.success('Thank you for your feedback!', {
        description: 'Your feedback helps us improve the platform.',
      });

      // Reset form
      setFeedback('');
      setFeedbackType('general');
      setOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Invalid feedback', {
          description: error.errors[0].message,
        });
      } else {
        if (import.meta.env.DEV) {
          console.error('Error submitting feedback:', error);
        }
        toast.error('Failed to submit feedback', {
          description: 'Please try again later.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          aria-label="Give feedback"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve the P29 Playbook. Your feedback is valuable to us.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>What type of feedback is this?</Label>
            <RadioGroup value={feedbackType} onValueChange={setFeedbackType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general" className="font-normal cursor-pointer">
                  General feedback
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug" className="font-normal cursor-pointer">
                  Bug report
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feature" id="feature" />
                <Label htmlFor="feature" className="font-normal cursor-pointer">
                  Feature request
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="content" id="content" />
                <Label htmlFor="content" className="font-normal cursor-pointer">
                  Content suggestion
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Your feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Page: {window.location.pathname}
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <ThumbsUp className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-medium">Your feedback matters</p>
              <p className="text-muted-foreground">
                We read every piece of feedback and use it to improve the platform.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackWidget;
