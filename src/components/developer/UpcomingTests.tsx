import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Clock, Calendar, ArrowRight } from "lucide-react";

export interface UpcomingTest {
  id: string;
  title: string;
  company: string;
  deadline: string;
  duration: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
}

interface UpcomingTestsProps {
  tests: UpcomingTest[];
  onStartTest?: (testId: string) => void;
}

const UpcomingTests = ({
  tests = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      company: "Tech Solutions Inc.",
      deadline: "2023-12-15",
      duration: 60,
      difficulty: "Easy",
    },
    {
      id: "2",
      title: "React Component Architecture",
      company: "Web Innovations Co.",
      deadline: "2023-12-20",
      duration: 90,
      difficulty: "Medium",
    },
    {
      id: "3",
      title: "Advanced Algorithms",
      company: "Data Systems Ltd.",
      deadline: "2023-12-25",
      duration: 120,
      difficulty: "Hard",
    },
  ],
  onStartTest = () => {},
}: UpcomingTestsProps) => {
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

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    const deadline = new Date(dateString);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Tests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No upcoming tests at the moment.
            </p>
          ) : (
            tests.map((test) => (
              <div
                key={test.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div>
                  <h4 className="font-medium">{test.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {test.company}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge
                      className={getDifficultyColor(test.difficulty)}
                      variant="outline"
                    >
                      {test.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{test.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Due: {formatDeadline(test.deadline)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-sm font-medium">
                    {getDaysRemaining(test.deadline)} days left
                  </span>
                  <Button
                    size="sm"
                    onClick={() => onStartTest(test.id)}
                    className="gap-1"
                  >
                    Start
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTests;
