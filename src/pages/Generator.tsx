import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings, Download, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Generator = () => {
  const [projectType, setProjectType] = useState("");
  const [duration, setDuration] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [showResult, setShowResult] = useState(false);

  const generateRecommendation = () => {
    if (!projectType || !duration || !riskLevel) {
      toast.error("Please fill in all fields");
      return;
    }

    // Generate tailored recommendation based on inputs
    let rec = "Based on your project profile:\n\n";

    // Project type recommendations
    if (projectType === "software") {
      rec += "🔹 **PMBOK 7 Adaptive Approach**: Given the software development context, leverage PMBOK's flexibility with iterative delivery cycles and continuous stakeholder feedback.\n\n";
    } else if (projectType === "construction") {
      rec += "🔹 **PRINCE2 Process Control**: For construction projects, PRINCE2's stage-based governance and formal control points align well with milestone-driven delivery.\n\n";
    } else if (projectType === "research") {
      rec += "🔹 **ISO 21500 Framework**: Research projects benefit from ISO's flexible framework that accommodates evolving objectives and discoveries.\n\n";
    } else {
      rec += "🔹 **Hybrid Approach**: Consider combining principles from multiple standards for optimal results.\n\n";
    }

    // Duration recommendations
    if (duration === "short") {
      rec += "⏱️ **Duration Management**: With a short timeline, prioritize PMBOK's Planning Performance Domain to ensure efficient resource allocation and PRINCE2's stage control for quick decision-making.\n\n";
    } else if (duration === "medium") {
      rec += "⏱️ **Duration Management**: For medium-duration projects, implement ISO's systematic approach with regular checkpoints and PMBOK's measurement domain for progress tracking.\n\n";
    } else {
      rec += "⏱️ **Duration Management**: Long-term projects require PRINCE2's formal governance structure and PMBOK's uncertainty management to adapt over time.\n\n";
    }

    // Risk level recommendations
    if (riskLevel === "low") {
      rec += "⚠️ **Risk Strategy**: With low risk, use streamlined processes from ISO 21500 while maintaining basic PMBOK principles for stakeholder engagement.\n\n";
    } else if (riskLevel === "medium") {
      rec += "⚠️ **Risk Strategy**: Moderate risk calls for PMBOK's Uncertainty Performance Domain combined with PRINCE2's Risk Theme for balanced risk management.\n\n";
    } else {
      rec += "⚠️ **Risk Strategy**: High-risk projects need PRINCE2's formal risk registers, PMBOK's proactive risk strategies, and ISO's systematic risk assessment.\n\n";
    }

    // Summary recommendations
    rec += "📋 **Recommended Process Elements**:\n";
    rec += "• Follow PMBOK's 12 principles for foundational guidance\n";
    rec += "• Adopt PRINCE2's defined roles and responsibilities structure\n";
    rec += "• Align with ISO 21502's governance framework\n";
    rec += "• Implement regular stakeholder reviews from all three standards\n";
    rec += "• Use PRINCE2's stage gates for major decision points\n\n";

    rec += "💡 **Key Success Factors**:\n";
    rec += "• Maintain clear communication channels\n";
    rec += "• Document decisions and changes systematically\n";
    rec += "• Regularly assess progress against objectives\n";
    rec += "• Adapt processes based on project needs\n";

    setRecommendation(rec);
    setShowResult(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recommendation);
    toast.success("Recommendation copied to clipboard");
  };

  const downloadRecommendation = () => {
    const blob = new Blob([recommendation], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pm-process-recommendation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Recommendation downloaded");
  };

  const reset = () => {
    setProjectType("");
    setDuration("");
    setRiskLevel("");
    setRecommendation("");
    setShowResult(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Tailored Process Generator</h1>
        <p className="text-muted-foreground">
          Get customized project management recommendations based on your project characteristics
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Project Configuration</CardTitle>
            </div>
            <CardDescription>
              Provide details about your project to receive tailored recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger id="project-type">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Software Development</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="research">Research & Development</SelectItem>
                  <SelectItem value="marketing">Marketing Campaign</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Project Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (0-6 months)</SelectItem>
                  <SelectItem value="medium">Medium (6-18 months)</SelectItem>
                  <SelectItem value="long">Long (18+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-level">Risk Level</Label>
              <Select value={riskLevel} onValueChange={setRiskLevel}>
                <SelectTrigger id="risk-level">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateRecommendation} className="flex-1">
                Generate Recommendation
              </Button>
              {showResult && (
                <Button onClick={reset} variant="outline">
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Output Display */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <CardTitle>Your Tailored Recommendation</CardTitle>
              </div>
              {showResult && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadRecommendation}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <CardDescription>
              {showResult
                ? "Based on your project profile, here's our recommendation"
                : "Fill in the form to generate your recommendation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showResult ? (
              <div className="space-y-4">
                {/* Display selected criteria */}
                <div className="flex flex-wrap gap-2 rounded-lg bg-muted p-3">
                  <Badge variant="secondary">
                    Type: {projectType.charAt(0).toUpperCase() + projectType.slice(1)}
                  </Badge>
                  <Badge variant="secondary">
                    Duration: {duration.charAt(0).toUpperCase() + duration.slice(1)}
                  </Badge>
                  <Badge variant="secondary">
                    Risk: {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
                  </Badge>
                </div>

                {/* Recommendation text */}
                <div className="max-h-[500px] overflow-y-auto rounded-lg bg-card p-4 text-sm leading-relaxed">
                  <pre className="whitespace-pre-wrap font-sans text-foreground">
                    {recommendation}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center text-muted-foreground">
                  <Settings className="mx-auto mb-4 h-12 w-12 opacity-20" />
                  <p>Configure your project details to see recommendations</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Generator;
