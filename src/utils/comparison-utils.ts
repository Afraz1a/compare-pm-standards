import standardsData from "@/data/standards-data.json";

export interface ComparisonResult {
  topic: string;
  topicId: string;
  standards: {
    [key: string]: {
      title: string;
      content: string;
      keyPoints: string[];
      practices: string[];
    };
  };
  analysis: {
    similarities: string[];
    differences: string[];
    uniquePoints: {
      standard: string;
      points: string[];
    }[];
  };
}

export const getTopicsList = (): { id: string; name: string }[] => {
  const pmbok = standardsData.pmbok;
  return Object.entries(pmbok.sections).map(([id, section]) => ({
    id,
    name: section.title,
  }));
};

export const compareTopicAcrossStandards = (
  topicId: string,
  selectedStandards: string[]
): ComparisonResult | null => {
  const standards: any = standardsData;
  const standardsToCompare = selectedStandards.length > 0 
    ? selectedStandards 
    : ["pmbok", "prince2", "iso"];

  // Check if topic exists in all selected standards
  const topicExists = standardsToCompare.every(
    (std) => standards[std]?.sections[topicId]
  );

  if (!topicExists) return null;

  const result: ComparisonResult = {
    topic: standards.pmbok.sections[topicId].title,
    topicId,
    standards: {},
    analysis: {
      similarities: [],
      differences: [],
      uniquePoints: [],
    },
  };

  // Collect data from each standard
  standardsToCompare.forEach((stdId) => {
    const section = standards[stdId].sections[topicId];
    result.standards[stdId] = {
      title: section.title,
      content: section.content,
      keyPoints: section.keyPoints,
      practices: section.practices,
    };
  });

  // Analyze similarities and differences
  result.analysis = analyzeComparison(result.standards, standardsToCompare);

  return result;
};

const analyzeComparison = (
  standards: ComparisonResult["standards"],
  standardIds: string[]
): ComparisonResult["analysis"] => {
  const analysis: ComparisonResult["analysis"] = {
    similarities: [],
    differences: [],
    uniquePoints: [],
  };

  // Extract all key points and practices
  const allKeyPoints = standardIds.map((id) => ({
    standard: id,
    points: [
      ...standards[id].keyPoints,
      ...standards[id].practices,
    ],
  }));

  // Find similarities (common themes across standards)
  const commonThemes = findCommonThemes(allKeyPoints);
  analysis.similarities = commonThemes;

  // Find differences (contrasting approaches)
  const differences = findDifferences(standards, standardIds);
  analysis.differences = differences;

  // Find unique points (present in only one standard)
  standardIds.forEach((stdId) => {
    const unique = findUniquePoints(stdId, standards, standardIds);
    if (unique.length > 0) {
      analysis.uniquePoints.push({
        standard: stdId,
        points: unique,
      });
    }
  });

  return analysis;
};

const findCommonThemes = (
  allKeyPoints: { standard: string; points: string[] }[]
): string[] => {
  const themes: string[] = [];
  const keywords = [
    "stakeholder",
    "risk",
    "quality",
    "planning",
    "control",
    "monitoring",
    "continuous",
    "engagement",
    "assessment",
    "management",
  ];

  keywords.forEach((keyword) => {
    const appearsInAll = allKeyPoints.every((std) =>
      std.points.some((point) =>
        point.toLowerCase().includes(keyword)
      )
    );

    if (appearsInAll) {
      themes.push(
        `All standards emphasize ${keyword} as a critical aspect`
      );
    }
  });

  return themes.slice(0, 5); // Return top 5 similarities
};

const findDifferences = (
  standards: ComparisonResult["standards"],
  standardIds: string[]
): string[] => {
  const differences: string[] = [];

  // Check for formal vs informal approaches
  const hasFormal = Object.entries(standards).some(([_, data]) =>
    data.content.toLowerCase().includes("formal")
  );
  const hasAdaptive = Object.entries(standards).some(([_, data]) =>
    data.content.toLowerCase().includes("adaptive") ||
    data.content.toLowerCase().includes("flexible")
  );

  if (hasFormal && hasAdaptive) {
    differences.push(
      "Some standards emphasize formal procedures while others promote adaptive approaches"
    );
  }

  // Check for documentation emphasis
  const highDocumentation = Object.entries(standards).filter(([_, data]) =>
    data.content.toLowerCase().includes("document") ||
    data.content.toLowerCase().includes("register")
  );

  if (highDocumentation.length < standardIds.length) {
    differences.push(
      "Documentation requirements vary significantly across standards"
    );
  }

  // Check for governance structure differences
  const hasBoard = Object.entries(standards).some(([_, data]) =>
    data.content.toLowerCase().includes("board")
  );
  const hasPrinciples = Object.entries(standards).some(([_, data]) =>
    data.content.toLowerCase().includes("principles")
  );

  if (hasBoard && hasPrinciples) {
    differences.push(
      "Governance approaches differ - some use formal boards while others rely on principles"
    );
  }

  return differences;
};

const findUniquePoints = (
  standardId: string,
  standards: ComparisonResult["standards"],
  allStandardIds: string[]
): string[] => {
  const unique: string[] = [];
  const thisStandard = standards[standardId];
  const otherStandards = allStandardIds
    .filter((id) => id !== standardId)
    .map((id) => standards[id]);

  // Check for unique keywords in content
  const uniqueKeywords: { [key: string]: string } = {
    pmbok: "performance domain",
    prince2: "theme",
    iso: "international standard",
  };

  if (
    thisStandard.content
      .toLowerCase()
      .includes(uniqueKeywords[standardId]) &&
    !otherStandards.some((std) =>
      std.content.toLowerCase().includes(uniqueKeywords[standardId])
    )
  ) {
    unique.push(
      `Uses ${uniqueKeywords[standardId]} as organizational framework`
    );
  }

  // Check for unique key points
  thisStandard.keyPoints.forEach((point) => {
    const pointLower = point.toLowerCase();
    const isUnique = !otherStandards.some((std) =>
      std.keyPoints.some((p) => {
        const words = pointLower.split(" ").filter((w) => w.length > 4);
        return words.some((word) => p.toLowerCase().includes(word));
      })
    );

    if (isUnique) {
      unique.push(point);
    }
  });

  return unique.slice(0, 3); // Return top 3 unique points
};

export const searchStandards = (
  query: string
): {
  standardId: string;
  standardName: string;
  sectionId: string;
  sectionTitle: string;
  excerpt: string;
  relevance: number;
}[] => {
  const results: any[] = [];
  const queryLower = query.toLowerCase();
  const standards: any = standardsData;

  Object.entries(standards).forEach(([stdId, stdData]: [string, any]) => {
    Object.entries(stdData.sections).forEach(
      ([sectionId, section]: [string, any]) => {
        let relevance = 0;
        const content = section.content.toLowerCase();
        const title = section.title.toLowerCase();

        // Check title match
        if (title.includes(queryLower)) {
          relevance += 10;
        }

        // Check content match
        const contentMatches = (
          content.match(new RegExp(queryLower, "g")) || []
        ).length;
        relevance += contentMatches * 2;

        // Check key points match
        section.keyPoints.forEach((point: string) => {
          if (point.toLowerCase().includes(queryLower)) {
            relevance += 5;
          }
        });

        if (relevance > 0) {
          // Find excerpt around match
          const matchIndex = content.indexOf(queryLower);
          const excerptStart = Math.max(0, matchIndex - 100);
          const excerptEnd = Math.min(
            content.length,
            matchIndex + 200
          );
          let excerpt = section.content.substring(
            excerptStart,
            excerptEnd
          );
          if (excerptStart > 0) excerpt = "..." + excerpt;
          if (excerptEnd < content.length) excerpt = excerpt + "...";

          results.push({
            standardId: stdId,
            standardName: stdData.name,
            sectionId,
            sectionTitle: section.title,
            excerpt,
            relevance,
          });
        }
      }
    );
  });

  return results.sort((a, b) => b.relevance - a.relevance);
};

export const highlightText = (
  text: string,
  type: "similarity" | "difference" | "unique"
): string => {
  const colorClass =
    type === "similarity"
      ? "bg-success/20 text-success-foreground"
      : type === "difference"
      ? "bg-destructive/20 text-destructive-foreground"
      : "bg-warning/20 text-warning-foreground";

  return `<span class="${colorClass} px-1 rounded">${text}</span>`;
};
