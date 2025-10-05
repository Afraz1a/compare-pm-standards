import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ChevronRight, Bookmark } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";
import standardsData from "@/data/standards-data.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Library = () => {
  const { standardId, sectionId } = useParams();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, searchResults, performSearch } = useSearch();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [selectedStandard, setSelectedStandard] = useState(standardId || "pmbok");
  const [selectedSection, setSelectedSection] = useState<string | null>(sectionId || null);

  useEffect(() => {
    if (standardId && sectionId) {
      setSelectedStandard(standardId);
      setSelectedSection(sectionId);
      // Scroll to section
      setTimeout(() => {
        const element = document.getElementById(`section-${sectionId}`);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [standardId, sectionId]);

  const standards: any = standardsData;
  const currentStandard = standards[selectedStandard];

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleSectionClick = (stdId: string, secId: string) => {
    setSelectedSection(secId);
    navigate(`/library/${stdId}/${secId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Standards Library</h1>
        <p className="text-muted-foreground">
          Explore comprehensive project management standards with full content and deep linking
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search across all standards... (e.g., 'risk management', 'stakeholder')"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              performSearch(e.target.value);
            }}
            className="pl-10"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Search Results ({searchResults.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {searchResults.slice(0, 10).map((result, index) => (
                  <div
                    key={index}
                    className="cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted"
                    onClick={() => handleSectionClick(result.standardId, result.sectionId)}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <Badge className={`bg-${result.standardId}`}>
                        {result.standardName}
                      </Badge>
                      <ChevronRight className="h-4 w-4" />
                      <span className="font-medium text-sm">{result.sectionTitle}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{result.excerpt}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Standards Tabs */}
      <Tabs value={selectedStandard} onValueChange={setSelectedStandard}>
        <TabsList className="mb-6">
          <TabsTrigger value="pmbok">PMBOK 7</TabsTrigger>
          <TabsTrigger value="prince2">PRINCE2</TabsTrigger>
          <TabsTrigger value="iso">ISO 21500</TabsTrigger>
        </TabsList>

        {Object.entries(standards).map(([stdId, stdData]: [string, any]) => (
          <TabsContent key={stdId} value={stdId}>
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Sidebar - Table of Contents */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="text-lg">Contents</CardTitle>
                    <CardDescription>{stdData.fullName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {Object.entries(stdData.sections).map(([secId, section]: [string, any]) => (
                        <button
                          key={secId}
                          onClick={() => handleSectionClick(stdId, secId)}
                          className={`flex w-full items-center justify-between rounded-lg p-2 text-left text-sm transition-colors hover:bg-muted ${
                            selectedSection === secId ? "bg-muted font-medium" : ""
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            {section.title}
                          </span>
                          {bookmarks.includes(`${stdId}-${secId}`) && (
                            <Bookmark className="h-4 w-4 fill-primary text-primary" />
                          )}
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="space-y-6 lg:col-span-2">
                {Object.entries(stdData.sections).map(([secId, section]: [string, any]) => (
                  <Card key={secId} id={`section-${secId}`} className="scroll-mt-20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className={`mb-2 bg-${stdId}`}>{stdData.name}</Badge>
                          <CardTitle className="text-xl">{section.title}</CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(`${stdId}-${secId}`)}
                        >
                          <Bookmark
                            className={`h-5 w-5 ${
                              bookmarks.includes(`${stdId}-${secId}`)
                                ? "fill-primary text-primary"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm leading-relaxed text-foreground">{section.content}</p>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-foreground">Key Points:</h4>
                        <ul className="space-y-2">
                          {section.keyPoints.map((point: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-foreground">
                          Key Practices:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {section.practices.map((practice: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {practice}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Link to={`/compare?topic=${secId}`}>
                          <Button variant="outline" size="sm">
                            Compare with Other Standards
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Library;
