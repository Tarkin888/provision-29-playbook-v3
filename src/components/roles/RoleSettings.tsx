import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useFiscalYear } from "@/contexts/FiscalYearContext";
import { useMaturity } from "@/contexts/MaturityContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings, Calendar, TrendingUp } from "lucide-react";

const RoleSettings = () => {
  const { fiscalYearEnd, setFiscalYearEnd, getComplianceYearLabel } = useFiscalYear();
  const { getMaturityLevel } = useMaturity();
  
  const maturityLevel = getMaturityLevel();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Your Company Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Fiscal Year-End Selector */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <Label className="text-base font-semibold">Fiscal Year-End</Label>
            </div>
            <RadioGroup value={fiscalYearEnd} onValueChange={setFiscalYearEnd}>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="december" id="dec" />
                  <Label htmlFor="dec" className="cursor-pointer">December</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="march" id="mar" />
                  <Label htmlFor="mar" className="cursor-pointer">March</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="june" id="jun" />
                  <Label htmlFor="jun" className="cursor-pointer">June</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="september" id="sep" />
                  <Label htmlFor="sep" className="cursor-pointer">September</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Compliance Period Display */}
          <Alert>
            <AlertDescription>
              <strong>Your Compliance Period:</strong> {getComplianceYearLabel()}
            </AlertDescription>
          </Alert>

          {/* Maturity Level Display */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <Label className="text-base font-semibold">Implementation Maturity</Label>
            </div>
            <Alert>
              <AlertDescription>
                Current maturity level: <strong>Level {maturityLevel}</strong>
                <br />
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a href="/assessment">Retake assessment to update →</a>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Contextual Guidance */}
      <Alert>
        <AlertDescription>
          <strong>Note:</strong> All timeline guidance, task lists, and milestone dates throughout this role guide 
          have been automatically adjusted for your {fiscalYearEnd.charAt(0).toUpperCase() + fiscalYearEnd.slice(1)} fiscal year-end and Level {maturityLevel} maturity.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default RoleSettings;
