import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, FileCode, CheckCircle, AlertCircle } from "lucide-react";

export interface TestData {
  id: string;
  title: string;
  company: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number; // in minutes
  deadline: string;
  status: "Not Started" | "In Progress" | "Completed" | "Expired";
  score?: number;
  skills: string[];
}

interface TestCardProps {
  test: TestData;
  onStartTest?: (testId: string) => void;
  onContinueTest?: (testId: string) => void;
  onViewResults?: (testId: string) => void;
}

const TestCard = ({
  test,
  onStartTest = () => {},
  onContinueTest = () => {},
  onViewResults = () => {},
}: TestCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Expired":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileCode className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionButton = () => {
    switch (test.status) {
      case "Not Started":
        return (
          <Button onClick={() => onStartTest(test.id)} className="w-full">
            Start Test
          </Button>
        );
      case "In Progress":
        return (
          <Button onClick={() => onContinueTest(test.id)} className="w-full">
            Continue Test
          </Button>
        );
      case "Completed":
        return (
          <Button
            onClick={() => onViewResults(test.id)}
            variant="outline"
            className="w-full"
          >
            View Results
          </Button>
        );
      case "Expired":
        return (
          <Button disabled className="w-full" variant="outline">
            Expired
          </Button>
        );
      default:
        return null;
    }
  };

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{test.title}</CardTitle>
          <Badge className={cn(getDifficultyColor(test.difficulty))}>
            {test.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{test.company}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{test.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                Due: {formatDeadline(test.deadline)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getStatusIcon(test.status)}
            <span
              className={cn(
                "text-sm font-medium",
                test.status === "Completed" && "text-green-600",
                test.status === "In Progress" && "text-blue-600",
                test.status === "Expired" && "text-red-600",
              )}
            >
              {test.status}
            </span>
            {test.status === "Completed" && test.score !== undefined && (
              <span className="ml-auto text-sm font-semibold">
                Score: {test.score}%
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {test.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>{getActionButton()}</CardFooter>
    </Card>
  );
};

export default TestCard;

// Helper function for className conditionals
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
