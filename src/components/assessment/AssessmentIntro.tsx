import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock } from 'lucide-react';
import assessmentData from '@/data/assessment.json';
import VendorIntro from '@/components/vendor/VendorIntro';

const AssessmentIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Provision 29 Readiness Assessment
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Evaluate your organisation's preparedness for P29 compliance in 15 minutes
        </p>
        
        {/* What You'll Get */}
        <div className="bg-accent/50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="font-semibold mb-4 text-lg">What you'll get:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">Readiness score across 5 key domains</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">Detailed recommendations for each domain</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">Prioritised action plan</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">Downloadable PDF report</span>
            </div>
          </div>
        </div>

        {/* Vendor Introduction */}
        <div className="mb-8 max-w-2xl mx-auto">
          <VendorIntro />
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>~15 minutes</span>
          </div>
          <span>•</span>
          <span>30 questions</span>
          <span>•</span>
          <span>5 domains</span>
        </div>

        <Button size="lg" onClick={() => navigate('/assessment/questions')}>
          Begin Assessment
        </Button>
      </div>

      {/* Domain Overview */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Assessment Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessmentData.domains.map((domain) => (
            <Card key={domain.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{domain.icon}</span>
                  <CardTitle className="text-lg">{domain.name}</CardTitle>
                </div>
                <CardDescription>{domain.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="inline-flex items-center gap-2 bg-accent px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">{domain.questions.length} questions</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;
