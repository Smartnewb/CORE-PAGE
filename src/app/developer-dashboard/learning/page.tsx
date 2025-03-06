"use client";

import React from "react";
import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  Clock,
  ExternalLink,
  Star,
  Award,
  ArrowRight,
} from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  progress: number;
  estimatedHours: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  isRecommended: boolean;
  modules: {
    id: string;
    title: string;
    isCompleted: boolean;
  }[];
}

export default function LearningPage() {
  // Mock data for learning paths
  const learningPaths: LearningPath[] = [
    {
      id: "1",
      title: "JavaScript Fundamentals Mastery",
      description:
        "Strengthen your JavaScript skills with this comprehensive path covering ES6+ features, async programming, and more.",
      progress: 65,
      estimatedHours: 12,
      difficulty: "Intermediate",
      skills: ["JavaScript", "ES6+", "Async/Await", "Promises"],
      isRecommended: true,
      modules: [
        { id: "1-1", title: "Modern JavaScript Syntax", isCompleted: true },
        {
          id: "1-2",
          title: "Working with Arrays and Objects",
          isCompleted: true,
        },
        { id: "1-3", title: "Asynchronous Programming", isCompleted: false },
        {
          id: "1-4",
          title: "Error Handling and Debugging",
          isCompleted: false,
        },
      ],
    },
    {
      id: "2",
      title: "React Component Architecture",
      description:
        "Learn best practices for building scalable React applications with proper component design and state management.",
      progress: 30,
      estimatedHours: 15,
      difficulty: "Intermediate",
      skills: ["React", "Component Design", "State Management", "Hooks"],
      isRecommended: true,
      modules: [
        { id: "2-1", title: "Component Composition", isCompleted: true },
        { id: "2-2", title: "State Management Patterns", isCompleted: false },
        { id: "2-3", title: "Performance Optimization", isCompleted: false },
        { id: "2-4", title: "Testing React Components", isCompleted: false },
      ],
    },
    {
      id: "3",
      title: "Data Structures and Algorithms",
      description:
        "Improve your problem-solving skills with essential data structures and algorithms concepts.",
      progress: 10,
      estimatedHours: 20,
      difficulty: "Advanced",
      skills: [
        "Algorithms",
        "Data Structures",
        "Problem Solving",
        "Time Complexity",
      ],
      isRecommended: false,
      modules: [
        { id: "3-1", title: "Arrays and Linked Lists", isCompleted: true },
        { id: "3-2", title: "Stacks and Queues", isCompleted: false },
        { id: "3-3", title: "Trees and Graphs", isCompleted: false },
        {
          id: "3-4",
          title: "Sorting and Searching Algorithms",
          isCompleted: false,
        },
      ],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-600";
    if (progress >= 25) return "bg-blue-600";
    return "bg-amber-600";
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
            <h1 className="text-2xl font-bold">Learning Path</h1>
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse All Courses
            </Button>
          </div>

          {/* AI Recommendation Banner */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">
                    AI-Recommended Learning Paths
                  </h2>
                  <p className="text-muted-foreground">
                    Based on your test results, we've identified areas for
                    improvement and recommended personalized learning paths to
                    help you grow your skills.
                  </p>
                </div>
                <Button className="mt-4 md:mt-0">View Recommendations</Button>
              </div>
            </CardContent>
          </Card>

          {/* Learning Paths */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card
                key={path.id}
                className={`hover:shadow-md transition-shadow duration-300 ${path.isRecommended ? "border-blue-200" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {path.title}
                        {path.isRecommended && (
                          <Badge className="bg-blue-100 text-blue-800">
                            Recommended
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">
                        {path.progress}%
                      </span>
                    </div>
                    <Progress
                      value={path.progress}
                      className="h-2"
                      indicatorClassName={getProgressColor(path.progress)}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {path.estimatedHours} hours
                    </div>
                    <div>
                      {path.modules.filter((m) => m.isCompleted).length} of{" "}
                      {path.modules.length} modules completed
                    </div>
                  </div>

                  <div className="space-y-2">
                    {path.modules.map((module) => (
                      <div key={module.id} className="flex items-center gap-2">
                        {module.isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-muted-foreground flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${module.isCompleted ? "line-through text-muted-foreground" : ""}`}
                        >
                          {module.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {path.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="gap-1">
                    Continue Learning
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
