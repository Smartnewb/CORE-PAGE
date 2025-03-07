import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Code,
  FileCode,
  GitPullRequest,
} from "lucide-react";

interface CodeIssue {
  line: number;
  code: string;
  message: string;
  severity: "error" | "warning" | "info";
  rule?: string;
}

interface CodeReviewPanelProps {
  issues?: CodeIssue[];
  onFixIssue?: (issue: CodeIssue) => void;
  onIgnoreIssue?: (issue: CodeIssue) => void;
}

const CodeReviewPanel = ({
  issues = [
    {
      line: 12,
      code: "const mid = (left + right) / 2;",
      message:
        "Potential integer overflow. Use left + (right - left) / 2 instead.",
      severity: "warning",
      rule: "algorithm-safety",
    },
    {
      line: 18,
      code: "if (arr[mid] == target)",
      message: "Use strict equality (===) instead of loose equality (==).",
      severity: "error",
      rule: "eslint/eqeqeq",
    },
    {
      line: 24,
      code: "return -1",
      message: "Missing semicolon.",
      severity: "info",
      rule: "eslint/semi",
    },
  ],
  onFixIssue = () => {},
  onIgnoreIssue = () => {},
}: CodeReviewPanelProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Code className="h-4 w-4 text-blue-500" />;
      default:
        return <Code className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="px-4 py-3 border-b flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <FileCode className="h-5 w-5" />
          Code Review
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-red-500" />
            <span>
              {issues.filter((i) => i.severity === "error").length} Errors
            </span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-yellow-500" />
            <span>
              {issues.filter((i) => i.severity === "warning").length} Warnings
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0">
        {issues.length > 0 ? (
          <div className="divide-y">
            {issues.map((issue, index) => (
              <div key={index} className="p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(issue.severity)}
                    <span className="font-medium">
                      {issue.severity.charAt(0).toUpperCase() +
                        issue.severity.slice(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Line {issue.line}
                    </span>
                  </div>
                  {issue.rule && (
                    <Badge variant="outline" className="text-xs">
                      {issue.rule}
                    </Badge>
                  )}
                </div>
                <pre className="bg-muted p-2 rounded text-sm overflow-x-auto mb-2">
                  <code>{issue.code}</code>
                </pre>
                <p className="text-sm mb-3">{issue.message}</p>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => onFixIssue(issue)}
                  >
                    <CheckCircle className="h-3 w-3" />
                    Fix Issue
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-1"
                    onClick={() => onIgnoreIssue(issue)}
                  >
                    Ignore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Issues Found</h3>
            <p className="text-sm text-muted-foreground">
              Your code looks good! No linting or code quality issues detected.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeReviewPanel;
