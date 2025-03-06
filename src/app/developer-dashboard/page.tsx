"use client";

import React from "react";
import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import TestCard, { TestData } from "@/components/developer/TestCard";
import SkillSummary, { SkillData } from "@/components/developer/SkillSummary";
import RecentActivity, {
  ActivityItem,
} from "@/components/developer/RecentActivity";
import UpcomingTests, {
  UpcomingTest,
} from "@/components/developer/UpcomingTests";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DeveloperDashboardPage() {
  const router = useRouter();

  // Mock data for the dashboard
  const activeTests: TestData[] = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      company: "Tech Solutions Inc.",
      difficulty: "Easy",
      duration: 60,
      deadline: "2023-12-15",
      status: "In Progress",
      skills: ["JavaScript", "ES6", "Algorithms"],
    },
    {
      id: "2",
      title: "React Component Architecture",
      company: "Web Innovations Co.",
      difficulty: "Medium",
      duration: 90,
      deadline: "2023-12-20",
      status: "Not Started",
      skills: ["React", "Component Design", "State Management"],
    },
  ];

  const completedTests: TestData[] = [
    {
      id: "3",
      title: "Basic Data Structures",
      company: "Data Systems Ltd.",
      difficulty: "Easy",
      duration: 45,
      deadline: "2023-11-10",
      status: "Completed",
      score: 92,
      skills: ["Arrays", "Objects", "Linked Lists"],
    },
  ];

  const skills: SkillData[] = [
    { name: "JavaScript", score: 85, color: "hsl(var(--chart-1))" },
    { name: "React", score: 78, color: "hsl(var(--chart-2))" },
    { name: "Problem Solving", score: 72, color: "hsl(var(--chart-3))" },
    { name: "Code Quality", score: 80, color: "hsl(var(--chart-4))" },
    { name: "Data Structures", score: 65, color: "hsl(var(--chart-5))" },
  ];

  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "test_completed",
      title: "Basic Data Structures",
      timestamp: "2023-11-25T14:30:00Z",
      score: 92,
    },
    {
      id: "2",
      type: "achievement",
      title: "Fast Learner",
      timestamp: "2023-11-20T10:15:00Z",
      details: "Completed 3 tests in your first week",
    },
    {
      id: "3",
      type: "test_started",
      title: "JavaScript Fundamentals",
      timestamp: "2023-11-26T09:45:00Z",
    },
    {
      id: "4",
      type: "feedback",
      title: "Feedback Received",
      timestamp: "2023-11-23T16:20:00Z",
      details:
        "Data Systems Ltd. provided feedback on your Data Structures test",
    },
  ];

  const upcomingTests: UpcomingTest[] = [
    {
      id: "4",
      title: "Advanced Algorithms",
      company: "Data Systems Ltd.",
      deadline: "2023-12-25",
      duration: 120,
      difficulty: "Hard",
    },
    {
      id: "5",
      title: "Node.js Backend Development",
      company: "Tech Solutions Inc.",
      deadline: "2023-12-30",
      duration: 90,
      difficulty: "Medium",
    },
  ];

  const handleStartTest = (testId: string) => {
    router.push(`/ide?test=${testId}`);
  };

  const handleContinueTest = (testId: string) => {
    router.push(`/ide?test=${testId}`);
  };

  const handleViewResults = (testId: string) => {
    router.push(`/reports/${testId}`);
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
            <h1 className="text-2xl font-bold">Developer Dashboard</h1>
            <Button onClick={() => router.push("/ide")}>Practice Coding</Button>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Tests Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Active Tests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTests.map((test) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      onStartTest={handleStartTest}
                      onContinueTest={handleContinueTest}
                      onViewResults={handleViewResults}
                    />
                  ))}
                </div>
              </div>

              {/* Upcoming Tests */}
              <UpcomingTests
                tests={upcomingTests}
                onStartTest={handleStartTest}
              />

              {/* Completed Tests */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Completed Tests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedTests.map((test) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      onViewResults={handleViewResults}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Skill Summary */}
              <SkillSummary skills={skills} />

              {/* Recent Activity */}
              <RecentActivity activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
