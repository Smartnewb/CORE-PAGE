import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Check,
  AlertCircle,
  Code,
  Cpu,
  Lightbulb,
  FileCode,
  Clock,
} from "lucide-react";

interface CodeIssue {
  line: number;
  code: string;
  description: string;
  severity: "error" | "warning" | "info";
  suggestion: string;
}

interface CodeAnalysisProps {
  candidateName?: string;
  testTitle?: string;
  codeQualityScore?: number;
  performanceScore?: number;
  problemSolvingScore?: number;
  codeSnippets?: {
    original: string;
    improved: string;
  }[];
  issues?: CodeIssue[];
  strengths?: string[];
  improvements?: string[];
}

const CodeAnalysis = ({
  candidateName = "John Doe",
  testTitle = "Algorithm Implementation Test",
  codeQualityScore = 85,
  performanceScore = 78,
  problemSolvingScore = 92,
  codeSnippets = [
    {
      original:
        "function calculateSum(arr) {\n  let sum = 0;\n  for(let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum;\n}",
      improved:
        "function calculateSum(arr) {\n  return arr.reduce((sum, num) => sum + num, 0);\n}",
    },
    {
      original:
        "function findDuplicates(arr) {\n  const duplicates = [];\n  for(let i = 0; i < arr.length; i++) {\n    for(let j = i + 1; j < arr.length; j++) {\n      if(arr[i] === arr[j] && !duplicates.includes(arr[i])) {\n        duplicates.push(arr[i]);\n      }\n    }\n  }\n  return duplicates;\n}",
      improved:
        "function findDuplicates(arr) {\n  const seen = new Set();\n  const duplicates = new Set();\n  \n  for(const item of arr) {\n    if(seen.has(item)) {\n      duplicates.add(item);\n    } else {\n      seen.add(item);\n    }\n  }\n  \n  return [...duplicates];\n}",
    },
  ],
  issues = [
    {
      line: 24,
      code: "for(let i = 0; i < arr.length; i++)",
      description: "Inefficient array iteration",
      severity: "warning",
      suggestion:
        "Consider using array methods like forEach, map, or reduce for better readability and performance.",
    },
    {
      line: 42,
      code: "if(arr[i] === arr[j] && !duplicates.includes(arr[i]))",
      description: "Nested loops with includes check",
      severity: "error",
      suggestion:
        "Using Set data structure would improve time complexity from O(n²) to O(n).",
    },
    {
      line: 67,
      code: "console.log(result);",
      description: "Debug code left in production",
      severity: "info",
      suggestion: "Remove console.log statements before submitting final code.",
    },
  ],
  strengths = [
    "Good understanding of core programming concepts",
    "Clean and consistent code formatting",
    "Appropriate variable naming conventions",
    "Effective problem decomposition",
  ],
  improvements = [
    "Could improve time complexity in some algorithms",
    "Consider using more modern JavaScript features",
    "Add more comprehensive error handling",
    "Include comments for complex logic sections",
  ],
}: CodeAnalysisProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "destructive";
      case "warning":
        return "secondary";
      case "info":
        return "default";
      default:
        return "default";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="bg-background w-full p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Code Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" /> Code Quality
            </CardTitle>
            <CardDescription>
              Structure, readability, and best practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2 mb-1">
              <span className={getScoreColor(codeQualityScore)}>
                {codeQualityScore}/100
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" /> Performance
            </CardTitle>
            <CardDescription>
              Efficiency, optimization, and complexity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2 mb-1">
              <span className={getScoreColor(performanceScore)}>
                {performanceScore}/100
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" /> Problem Solving
            </CardTitle>
            <CardDescription>
              Approach, logic, and solution quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2 mb-1">
              <span className={getScoreColor(problemSolvingScore)}>
                {problemSolvingScore}/100
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="issues" className="w-full mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="code-comparison">Code Comparison</TabsTrigger>
          <TabsTrigger value="strengths">Strengths & Improvements</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Code Issues
              </CardTitle>
              <CardDescription>
                Identified issues and suggested improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={getSeverityColor(issue.severity)}>
                          {issue.severity.charAt(0).toUpperCase() +
                            issue.severity.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Line {issue.line}
                        </span>
                      </div>
                    </div>
                    <p className="font-medium mb-1">{issue.description}</p>
                    <pre className="bg-muted p-2 rounded text-sm overflow-x-auto mb-2">
                      <code>{issue.code}</code>
                    </pre>
                    <div className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
                      <p>{issue.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code-comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" /> Code Comparison
              </CardTitle>
              <CardDescription>
                Original code vs. improved implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {codeSnippets.map((snippet, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="font-medium">Example {index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Original Code</h4>
                        </div>
                        <pre className="bg-muted p-3 rounded text-sm overflow-x-auto h-[200px] overflow-y-auto">
                          <code>{snippet.original}</code>
                        </pre>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Improved Code</h4>
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Check className="h-3 w-3" /> Recommended
                          </Badge>
                        </div>
                        <pre className="bg-muted p-3 rounded text-sm overflow-x-auto h-[200px] overflow-y-auto">
                          <code>{snippet.improved}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strengths" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" /> Strengths
                </CardTitle>
                <CardDescription>
                  Areas where the candidate performed well
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" /> Areas for
                  Improvement
                </CardTitle>
                <CardDescription>
                  Suggestions to enhance coding skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-1" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="outline" className="mr-2">
          Download Analysis
        </Button>
        <Button>Share Feedback</Button>
      </div>
    </div>
  );
};

export default CodeAnalysis;
