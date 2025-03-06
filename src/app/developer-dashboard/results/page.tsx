"use client";

import React, { useState } from "react";
import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, BarChart2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface TestResult {
  id: string;
  title: string;
  company: string;
  completedAt: string;
  score: number;
  skills: {
    name: string;
    score: number;
  }[];
  hasFeedback: boolean;
}

export default function ResultsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for test results
  const allResults: TestResult[] = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      company: "Tech Solutions Inc.",
      completedAt: "2023-11-15",
      score: 92,
      skills: [
        { name: "JavaScript", score: 95 },
        { name: "Problem Solving", score: 88 },
        { name: "Code Quality", score: 90 },
      ],
      hasFeedback: true,
    },
    {
      id: "2",
      title: "React Component Architecture",
      company: "Web Innovations Co.",
      completedAt: "2023-10-28",
      score: 78,
      skills: [
        { name: "React", score: 82 },
        { name: "Component Design", score: 75 },
        { name: "State Management", score: 70 },
      ],
      hasFeedback: true,
    },
    {
      id: "3",
      title: "Basic Data Structures",
      company: "Data Systems Ltd.",
      completedAt: "2023-10-10",
      score: 85,
      skills: [
        { name: "Arrays", score: 90 },
        { name: "Objects", score: 85 },
        { name: "Linked Lists", score: 80 },
      ],
      hasFeedback: false,
    },
  ];

  // Filter results based on search query
  const filteredResults = allResults.filter((result) => {
    return (
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.skills.some((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <>
      <DeveloperSidebar
        userName="Kim Ji-woo"
        userEmail="jiwoo.kim@example.com"
      />
      <div className="flex-1 overflow-auto bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Results</h1>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search results by test title, company, or skills..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <Card
                  key={result.id}
                  className="hover:shadow-md transition-shadow duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {result.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {result.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${getScoreColor(result.score)}`}
                        >
                          {result.score}%
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(result.completedAt)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">
                        Skills Assessment
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <span>{skill.name}</span>
                            <span className={getScoreColor(skill.score)}>
                              {skill.score}%
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => router.push(`/reports/${result.id}`)}
                      >
                        <BarChart2 className="h-4 w-4" />
                        View Detailed Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No results found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
