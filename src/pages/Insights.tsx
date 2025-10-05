import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Insights = () => {
  const similarities = [
    "All three standards emphasize stakeholder engagement as critical to project success",
    "Risk management is recognized as a continuous process requiring proactive attention",
    "Quality assurance is integrated throughout the project lifecycle",
    "Change control mechanisms are essential for managing scope and requirements",
    "Communication planning is vital for team coordination and stakeholder alignment"
  ];

  const differences = [
    {
      aspect: "Approach Philosophy",
      details: "PMBOK 7 is principles-based, PRINCE2 is process-based, ISO is framework-based"
    },
    {
      aspect: "Governance Structure",
      details: "PRINCE2 has formal boards and stage gates, while PMBOK 7 offers flexible governance"
    },
    {
      aspect: "Terminology",
      details: "Each standard uses different terms for similar concepts (e.g., domains vs. themes vs. processes)"
    },
    {
      aspect: "Prescriptiveness",
      details: "PRINCE2 is more prescriptive with specific roles, while PMBOK 7 and ISO are more adaptable"
    }
  ];

  const uniquePoints = [
    {
      standard: "PMBOK 7",
      icon: "pmbok",
      points: [
        "Introduces 12 project management principles",
        "Focuses on eight performance domains rather than process groups",
        "Emphasizes tailoring and value delivery",
        "Model-agnostic approach (works with agile, predictive, or hybrid)"
      ]
    },
    {
      standard: "PRINCE2",
      icon: "prince2",
      points: [
        "Defines 7 principles, 7 themes, and 7 processes",
        "Explicit project board structure with defined roles",
        "Stage-based approach with mandatory gates",
        "Strong emphasis on business justification throughout"
      ]
    },
    {
      standard: "ISO 21500/21502",
      icon: "iso",
      points: [
        "International consensus standard applicable globally",
        "Extends to portfolio management (21502)",
        "Focuses on harmonizing with other standards",
        "Emphasizes governance and organizational context"
      ]
    }
  ];

  const overlapData = [
    { category: "Risk Management", overlap: 85 },
    { category: "Stakeholder Engagement", overlap: 90 },
    { category: "Quality Assurance", overlap: 75 },
    { category: "Governance", overlap: 50 },
    { category: "Change Management", overlap: 70 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Insights Dashboard</h1>
        <p className="text-muted-foreground">
          Visual analysis of similarities, differences, and unique aspects across the three standards
        </p>
      </div>

      {/* Overview Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Common Practices</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">5</div>
            <p className="text-xs text-muted-foreground">Core similarities identified</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Key Differences</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">4</div>
            <p className="text-xs text-muted-foreground">Major distinctions noted</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unique Features</CardTitle>
            <Sparkles className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">12</div>
            <p className="text-xs text-muted-foreground">Standard-specific highlights</p>
          </CardContent>
        </Card>
      </div>

      {/* Similarities Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <CardTitle>Common Practices Across All Standards</CardTitle>
          </div>
          <CardDescription>
            These core principles are consistently emphasized by PMBOK 7, PRINCE2, and ISO 21500
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {similarities.map((item, index) => (
              <li key={index} className="flex items-start gap-3 rounded-lg bg-success/5 p-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Topic Overlap Visualization */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Topic Coverage Overlap</CardTitle>
          <CardDescription>
            Percentage of alignment across standards for key project management areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overlapData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.category}</span>
                  <span className="text-muted-foreground">{item.overlap}% overlap</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.overlap}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Differences Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <CardTitle>Key Differences</CardTitle>
          </div>
          <CardDescription>
            Important distinctions in approach and terminology between the standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {differences.map((item, index) => (
              <div key={index} className="rounded-lg border border-warning/20 bg-warning/5 p-4">
                <h4 className="mb-2 font-semibold text-foreground">{item.aspect}</h4>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unique Points Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-info" />
            <CardTitle>Unique Features by Standard</CardTitle>
          </div>
          <CardDescription>
            Distinctive characteristics that set each standard apart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {uniquePoints.map((standard, index) => (
              <div key={index} className="space-y-3">
                <Badge className={`bg-${standard.icon} text-${standard.icon}-foreground`}>
                  {standard.standard}
                </Badge>
                <ul className="space-y-2">
                  {standard.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2 text-sm">
                      <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-info" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-8 text-center">
          <h3 className="text-xl font-semibold text-foreground">
            Want to dive deeper into specific topics?
          </h3>
          <p className="max-w-xl text-muted-foreground">
            Explore detailed comparisons or generate tailored recommendations for your project
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/compare">
              <Button className="gap-2">
                Compare Topics
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/generator">
              <Button variant="secondary" className="gap-2">
                Generate Process
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
