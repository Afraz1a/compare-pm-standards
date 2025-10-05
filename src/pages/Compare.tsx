import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Circle, Filter } from "lucide-react";

type ComparisonTopic = {
  name: string;
  pmbok: {
    approach: string;
    emphasis: string;
  };
  prince2: {
    approach: string;
    emphasis: string;
  };
  iso: {
    approach: string;
    emphasis: string;
  };
  similarity: "high" | "medium" | "low";
};

const comparisonTopics: ComparisonTopic[] = [
  {
    name: "Risk Management",
    pmbok: {
      approach: "Integrated into Uncertainty Performance Domain",
      emphasis: "Proactive identification and response strategies"
    },
    prince2: {
      approach: "Dedicated Risk Theme with formal procedures",
      emphasis: "Risk registers and regular review cycles"
    },
    iso: {
      approach: "Systematic risk management process",
      emphasis: "Risk-based decision making throughout project"
    },
    similarity: "high"
  },
  {
    name: "Stakeholder Engagement",
    pmbok: {
      approach: "Dedicated Stakeholder Performance Domain",
      emphasis: "Continuous engagement and value creation"
    },
    prince2: {
      approach: "Integrated within Organization Theme",
      emphasis: "Defined roles and communication strategies"
    },
    iso: {
      approach: "Stakeholder Management process group",
      emphasis: "Identification, analysis, and engagement planning"
    },
    similarity: "high"
  },
  {
    name: "Quality Assurance",
    pmbok: {
      approach: "Part of Project Work Performance Domain",
      emphasis: "Quality embedded in all activities"
    },
    prince2: {
      approach: "Dedicated Quality Theme",
      emphasis: "Quality planning, control, and assurance"
    },
    iso: {
      approach: "Quality Management process",
      emphasis: "Quality planning, assurance, and control"
    },
    similarity: "medium"
  },
  {
    name: "Change Control",
    pmbok: {
      approach: "Addressed in Project Work Domain",
      emphasis: "Adaptive and flexible approach"
    },
    prince2: {
      approach: "Dedicated Change Theme",
      emphasis: "Formal change control procedures"
    },
    iso: {
      approach: "Integrated change management",
      emphasis: "Controlled and documented changes"
    },
    similarity: "medium"
  },
  {
    name: "Project Governance",
    pmbok: {
      approach: "Principles-based oversight",
      emphasis: "Value-driven decision making"
    },
    prince2: {
      approach: "Central to methodology with defined boards",
      emphasis: "Stage gates and formal approvals"
    },
    iso: {
      approach: "Governance framework guidance",
      emphasis: "Alignment with organizational governance"
    },
    similarity: "low"
  }
];

const Compare = () => {
  const [filterMode, setFilterMode] = useState<"all" | "similarities" | "differences">("all");

  const filteredTopics = comparisonTopics.filter(topic => {
    if (filterMode === "all") return true;
    if (filterMode === "similarities") return topic.similarity === "high";
    if (filterMode === "differences") return topic.similarity === "low";
    return true;
  });

  const getSimilarityIcon = (similarity: string) => {
    switch (similarity) {
      case "high":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "medium":
        return <Circle className="h-5 w-5 text-warning" />;
      case "low":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getSimilarityLabel = (similarity: string) => {
    switch (similarity) {
      case "high":
        return "High Similarity";
      case "medium":
        return "Moderate Similarity";
      case "low":
        return "Different Approaches";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Compare Topics</h1>
        <p className="text-muted-foreground">
          See how PMBOK 7, PRINCE2, and ISO 21500 address key project management topics
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={filterMode === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterMode("all")}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Show All
        </Button>
        <Button
          variant={filterMode === "similarities" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterMode("similarities")}
          className="gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          Show Similarities Only
        </Button>
        <Button
          variant={filterMode === "differences" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterMode("differences")}
          className="gap-2"
        >
          <XCircle className="h-4 w-4" />
          Show Differences Only
        </Button>
      </div>

      {/* Comparison Cards */}
      <div className="space-y-6">
        {filteredTopics.map((topic, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{topic.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {getSimilarityIcon(topic.similarity)}
                  <span className="text-sm text-muted-foreground">
                    {getSimilarityLabel(topic.similarity)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {/* PMBOK */}
                <div className="rounded-lg border border-pmbok/20 bg-pmbok-light p-4">
                  <Badge className="mb-3 bg-pmbok text-pmbok-foreground">
                    PMBOK 7
                  </Badge>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Approach
                      </p>
                      <p className="text-sm text-foreground">{topic.pmbok.approach}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Emphasis
                      </p>
                      <p className="text-sm text-foreground">{topic.pmbok.emphasis}</p>
                    </div>
                  </div>
                </div>

                {/* PRINCE2 */}
                <div className="rounded-lg border border-prince2/20 bg-prince2-light p-4">
                  <Badge className="mb-3 bg-prince2 text-prince2-foreground">
                    PRINCE2
                  </Badge>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Approach
                      </p>
                      <p className="text-sm text-foreground">{topic.prince2.approach}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Emphasis
                      </p>
                      <p className="text-sm text-foreground">{topic.prince2.emphasis}</p>
                    </div>
                  </div>
                </div>

                {/* ISO */}
                <div className="rounded-lg border border-iso/20 bg-iso-light p-4">
                  <Badge className="mb-3 bg-iso text-iso-foreground">
                    ISO 21500
                  </Badge>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Approach
                      </p>
                      <p className="text-sm text-foreground">{topic.iso.approach}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Emphasis
                      </p>
                      <p className="text-sm text-foreground">{topic.iso.emphasis}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Compare;
