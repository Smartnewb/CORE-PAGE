import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

export interface SkillData {
  name: string;
  score: number;
  color: string;
}

interface SkillSummaryProps {
  skills: SkillData[];
  title?: string;
}

const SkillSummary = ({
  skills = [
    { name: "JavaScript", score: 85, color: "hsl(var(--chart-1))" },
    { name: "React", score: 78, color: "hsl(var(--chart-2))" },
    { name: "Node.js", score: 65, color: "hsl(var(--chart-3))" },
    { name: "Problem Solving", score: 72, color: "hsl(var(--chart-4))" },
    { name: "Code Quality", score: 80, color: "hsl(var(--chart-5))" },
  ],
  title = "Your Skills",
}: SkillSummaryProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm font-medium">{skill.score}%</span>
            </div>
            <Progress
              value={skill.score}
              className="h-2"
              indicatorClassName={getProgressColor(skill.score)}
              style={
                {
                  "--progress-color": skill.color,
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Helper function to determine progress color based on score
function getProgressColor(score: number): string {
  if (score >= 80) return "bg-[var(--progress-color)]";
  if (score >= 60) return "bg-[var(--progress-color)]";
  return "bg-[var(--progress-color)]";
}

export default SkillSummary;
