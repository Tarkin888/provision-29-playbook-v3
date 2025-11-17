import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import ScoreGauge from '@/components/assessment/ScoreGauge';
import RadarChart from '@/components/assessment/RadarChart';
import DomainScoreCard from '@/components/assessment/DomainScoreCard';
import ActionCard from '@/components/assessment/ActionCard';
import assessmentData from '@/data/assessment.json';
import { Download, RefreshCw, Share2, BookOpen, Map } from 'lucide-react';
import jsPDF from 'jspdf';
import VendorRecommendation from '@/components/vendor/VendorRecommendation';
import VendorContact from '@/components/vendor/VendorContact';
import VendorCTA from '@/components/vendor/VendorCTA';
import VendorFooter from '@/components/vendor/VendorFooter';

const AssessmentResults = () => {
  const navigate = useNavigate();
  const { answers, getTotalScore, getDomainScore, isComplete, resetAssessment } = useAssessment();

  useEffect(() => {
    if (!isComplete()) {
      navigate('/assessment');
    }
  }, [isComplete, navigate]);

  const totalScore = getTotalScore();
  const maxTotalScore = 120;

  // Calculate domain scores
  const domainScores = assessmentData.domains.map((domain) => {
    const questionIds = domain.questions.map((q) => q.id);
    const score = getDomainScore(domain.id, questionIds);
    
    // Get question details for breakdown
    const questionDetails = domain.questions.map((q) => {
      const selectedPoints = answers[q.id] || 0;
      const selectedOption = q.options.find((opt) => opt.points === selectedPoints);
      
      return {
        id: q.id,
        question: q.question,
        selectedAnswer: selectedOption?.text || 'Not answered',
        points: selectedPoints,
        maxPoints: 4,
      };
    });

    return {
      ...domain,
      score,
      maxScore: 24,
      questionDetails,
    };
  });

  // Generate priority actions based on scores
  const generateActions = () => {
    const actions: Array<{
      title: string;
      description: string;
      domain: string;
      priority: 'Critical' | 'Important' | 'Optimize';
      effort: string;
    }> = [];

    domainScores.forEach((domain) => {
      const priority = domain.score < 10 ? 'Critical' : domain.score < 18 ? 'Important' : 'Optimize';

      // Governance actions
      if (domain.id === 'governance' && domain.score < 18) {
        if (domain.score < 10) {
          actions.push({
            title: 'Deliver Comprehensive Board Training on P29',
            description: 'Ensure all board members understand Provision 29 requirements, material controls, and their oversight responsibilities.',
            domain: domain.name,
            priority,
            effort: '4-6 weeks',
          });
        }
        actions.push({
          title: 'Develop Board Reporting Pack for Material Controls',
          description: 'Create standardized reporting templates for regular board updates on material control effectiveness.',
          domain: domain.name,
          priority,
          effort: '6-8 weeks',
        });
      }

      // Risk Management actions
      if (domain.id === 'risk' && domain.score < 18) {
        if (domain.score < 10) {
          actions.push({
            title: 'Define and Document Principal Risks',
            description: 'Conduct comprehensive risk assessment workshops to identify and document all principal risks with board approval.',
            domain: domain.name,
            priority,
            effort: '8-10 weeks',
          });
        }
        actions.push({
          title: 'Establish Risk-Control Linkage Framework',
          description: 'Create a comprehensive mapping between principal risks and material controls to demonstrate coverage.',
          domain: domain.name,
          priority,
          effort: '6-8 weeks',
        });
      }

      // Control Environment actions
      if (domain.id === 'control' && domain.score < 18) {
        if (domain.score < 10) {
          actions.push({
            title: 'Complete Material Control Inventory (MCI)',
            description: 'Identify and document all material controls across the organization using a structured methodology.',
            domain: domain.name,
            priority,
            effort: '10-12 weeks',
          });
        }
        actions.push({
          title: 'Assign Control Ownership Across Organisation',
          description: 'Designate clear control owners with defined accountabilities for each material control.',
          domain: domain.name,
          priority,
          effort: '4-6 weeks',
        });
      }

      // Assurance actions
      if (domain.id === 'assurance' && domain.score < 18) {
        if (domain.score < 10) {
          actions.push({
            title: 'Implement Three Lines of Defence Model',
            description: 'Establish clear roles and responsibilities across business ownership, risk/compliance, and internal audit.',
            domain: domain.name,
            priority,
            effort: '8-12 weeks',
          });
        }
        actions.push({
          title: 'Develop Control Testing Methodology',
          description: 'Create standardized approach for testing design and operating effectiveness of material controls.',
          domain: domain.name,
          priority,
          effort: '6-8 weeks',
        });
      }

      // Technology actions
      if (domain.id === 'technology' && domain.score < 18) {
        if (domain.score < 10) {
          actions.push({
            title: 'Evaluate GRC System Requirements',
            description: 'Assess organizational needs and evaluate GRC platforms to support material control management.',
            domain: domain.name,
            priority,
            effort: '8-10 weeks',
          });
        }
        actions.push({
          title: 'Build Board Dashboard for Material Controls',
          description: 'Develop executive dashboard providing real-time visibility into control effectiveness and issues.',
          domain: domain.name,
          priority,
          effort: '6-8 weeks',
        });
      }
    });

    return actions.slice(0, 12);
  };

  const priorityActions = generateActions();

  // Get domain recommendations
  const getDomainRecommendations = (domainId: string): string[] => {
    const recommendations: { [key: string]: string[] } = {
      governance: [
        'Schedule quarterly board training sessions on P29 and material controls',
        'Establish a dedicated board committee for control oversight',
        'Develop clear delegation of authority matrix for material control decisions',
        'Engage external auditors early to align on scope and expectations',
      ],
      risk: [
        'Conduct comprehensive risk assessment workshops with senior leadership',
        'Develop quantified risk appetite statements for each principal risk',
        'Create risk-control matrix linking all principal risks to material controls',
        'Implement regular emerging risk scanning process',
      ],
      control: [
        'Complete material control inventory using structured methodology',
        'Document all material controls with clear ownership and procedures',
        'Review and update policy framework to support control environment',
        'Assess organizational control culture through surveys and interviews',
      ],
      assurance: [
        'Implement Three Lines of Defence model with clear accountabilities',
        'Develop risk-based internal audit plan covering all material controls',
        'Establish robust control testing methodology with documentation standards',
        'Create issue tracking and remediation process with executive oversight',
      ],
      technology: [
        'Evaluate and implement GRC platform for control management',
        'Automate control monitoring where possible to reduce manual effort',
        'Establish data quality standards and validation processes',
        'Develop executive dashboards for real-time control visibility',
      ],
    };

    return recommendations[domainId] || [];
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;

    // Cover page
    doc.setFontSize(24);
    doc.text('Provision 29 Readiness Assessment', margin, 40);
    doc.setFontSize(16);
    doc.text('Assessment Report', margin, 55);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 70);
    doc.text(`Overall Score: ${totalScore} / ${maxTotalScore} (${Math.round((totalScore / maxTotalScore) * 100)}%)`, margin, 80);

    // Executive Summary
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Executive Summary', margin, 30);
    doc.setFontSize(11);
    const status = totalScore < 40 ? 'Not Ready' : totalScore < 80 ? 'Partially Ready' : 'Ready';
    doc.text(`Status: ${status}`, margin, 45);
    
    let yPos = 60;
    doc.setFontSize(14);
    doc.text('Domain Breakdown:', margin, yPos);
    yPos += 10;
    doc.setFontSize(11);
    
    domainScores.forEach((domain) => {
      doc.text(`${domain.name}: ${domain.score}/${domain.maxScore} points`, margin, yPos);
      yPos += 8;
    });

    // Priority Actions
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Priority Actions', margin, 30);
    yPos = 45;
    doc.setFontSize(11);

    priorityActions.forEach((action, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 30;
      }
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${action.title}`, margin, yPos);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      const lines = doc.splitTextToSize(action.description, pageWidth - 2 * margin);
      doc.text(lines, margin + 5, yPos);
      yPos += lines.length * 5 + 10;
    });

    doc.save('P29-Assessment-Results.pdf');
  };

  const handleRetake = () => {
    resetAssessment();
    navigate('/assessment');
  };

  const radarData = domainScores.map((d) => ({
    name: d.name,
    score: d.score,
    maxScore: d.maxScore,
    color: d.color,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 md:mb-4">Your Assessment Results</h1>
          <p className="text-base sm:text-xl text-muted-foreground mb-8 md:mb-12">
            Here's how your organisation scores across the five P29 readiness domains
          </p>
          
          <ScoreGauge score={totalScore} maxScore={maxTotalScore} />
        </div>

        {/* Radar Chart */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-6 md:mb-8">Domain Breakdown</h2>
          <RadarChart domains={radarData} />
        </div>

        {/* Domain Score Cards */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8">Detailed Domain Analysis</h2>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {domainScores.map((domain) => (
              <DomainScoreCard
                key={domain.id}
                icon={domain.icon}
                name={domain.name}
                score={domain.score}
                maxScore={domain.maxScore}
                color={domain.color}
                questions={domain.questionDetails}
                recommendations={getDomainRecommendations(domain.id)}
              >
                <VendorRecommendation domainId={domain.id} />
              </DomainScoreCard>
            ))}
          </div>
        </div>

        {/* Priority Actions */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 md:mb-4">Priority Actions</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 md:mb-8">
            Based on your assessment, here are the recommended actions to improve your P29 readiness
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {priorityActions.map((action, index) => (
              <ActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Vendor Contact */}
        <div className="mb-12 md:mb-16">
          <VendorContact />
        </div>

        {/* Next Steps */}
        <div className="bg-primary/5 rounded-lg p-6 md:p-8 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 md:mb-6 text-center">Next Steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Button onClick={generatePDF} className="h-auto py-4 md:py-6 flex flex-col items-center space-y-2 min-h-[80px]">
              <Download className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-sm md:text-base">Download Report</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/roadmap')}
              className="h-auto py-4 md:py-6 flex flex-col items-center space-y-2 min-h-[80px]"
            >
              <Map className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-sm md:text-base">View Roadmap</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/templates')}
              className="h-auto py-4 md:py-6 flex flex-col items-center space-y-2 min-h-[80px]"
            >
              <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-sm md:text-base">Explore Templates</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleRetake}
              className="h-auto py-4 md:py-6 flex flex-col items-center space-y-2 min-h-[80px]"
            >
              <RefreshCw className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-sm md:text-base">Retake Assessment</span>
            </Button>
          </div>
          <div className="mt-4 md:mt-6 flex justify-center">
            <VendorCTA size="lg" className="w-full sm:w-auto" />
          </div>
        </div>

        {/* Share Results */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-sm sm:text-base text-muted-foreground mb-4">Share your results with your team</p>
          <Button variant="outline" className="min-h-[48px] w-full sm:w-auto">
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
        </div>

        {/* Footer Attribution */}
        <VendorFooter />
      </div>
    </div>
  );
};

export default AssessmentResults;
