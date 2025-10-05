import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ExternalLink } from "lucide-react";

const standards = [
  {
    id: "pmbok",
    name: "PMBOK 7",
    fullName: "Project Management Body of Knowledge (7th Edition)",
    color: "pmbok",
    description: "PMBOK 7 represents a shift from process-based to principles-based project management. It focuses on delivering value through eight project performance domains and twelve principles.",
    keyPoints: [
      "Principles-based approach",
      "Eight performance domains",
      "Twelve guiding principles",
      "Focus on value delivery",
      "Adaptable to any delivery approach"
    ],
    topics: [
      "Stakeholder Performance Domain",
      "Team Performance Domain",
      "Development Approach & Life Cycle",
      "Planning Performance Domain",
      "Project Work Performance Domain",
      "Delivery Performance Domain",
      "Measurement Performance Domain",
      "Uncertainty Performance Domain"
    ]
  },
  {
    id: "prince2",
    name: "PRINCE2",
    fullName: "Projects IN Controlled Environments",
    color: "prince2",
    description: "PRINCE2 is a process-based method that provides a structured approach to project management. It emphasizes dividing projects into manageable stages with defined roles and responsibilities.",
    keyPoints: [
      "Process-based methodology",
      "Seven principles, themes, and processes",
      "Defined roles and responsibilities",
      "Stage-based control",
      "Emphasis on business justification"
    ],
    topics: [
      "Business Case",
      "Organization Theme",
      "Quality Management",
      "Plans and Planning",
      "Risk Management",
      "Change Control",
      "Progress Monitoring"
    ]
  },
  {
    id: "iso",
    name: "ISO 21500/21502",
    fullName: "ISO Standards for Project & Portfolio Management",
    color: "iso",
    description: "ISO 21500 provides international guidance on project management, while ISO 21502 extends this to project portfolio management. These standards offer a universal framework applicable across industries.",
    keyPoints: [
      "International standard framework",
      "Applicable to any organization",
      "Portfolio and project alignment",
      "Governance emphasis",
      "Complements other methodologies"
    ],
    topics: [
      "Integration Management",
      "Stakeholder Management",
      "Scope Management",
      "Resource Management",
      "Time Management",
      "Cost Management",
      "Risk Management",
      "Quality Management"
    ]
  }
];

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStandards = standards.filter(standard =>
    standard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    standard.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    standard.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    standard.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Standards Library</h1>
        <p className="text-muted-foreground">
          Explore the three major project management standards and their key concepts
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search standards, topics, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Standards Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStandards.map((standard) => (
          <Card key={standard.id} className="flex flex-col transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <Badge 
                  className={`bg-${standard.color} text-${standard.color}-foreground`}
                >
                  {standard.name}
                </Badge>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl">{standard.fullName}</CardTitle>
              <CardDescription>{standard.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Key Points:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {standard.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">Main Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {standard.topics.slice(0, 4).map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {standard.topics.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{standard.topics.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                View Full Standard
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStandards.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No standards found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Library;
