"use client";

import React, { useState } from "react";
import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import TestCard, { TestData } from "@/components/developer/TestCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TestsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data for tests
  const allTests: TestData[] = [
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
    {
      id: "4",
      title: "Advanced Algorithms",
      company: "Data Systems Ltd.",
      difficulty: "Hard",
      duration: 120,
      deadline: "2023-12-25",
      status: "Not Started",
      skills: ["Algorithms", "Time Complexity", "Problem Solving"],
    },
    {
      id: "5",
      title: "Node.js Backend Development",
      company: "Tech Solutions Inc.",
      difficulty: "Medium",
      duration: 90,
      deadline: "2023-12-30",
      status: "Not Started",
      skills: ["Node.js", "Express", "API Design"],
    },
    {
      id: "6",
      title: "Frontend Performance Optimization",
      company: "Web Innovations Co.",
      difficulty: "Medium",
      duration: 75,
      deadline: "2023-11-05",
      status: "Expired",
      skills: ["JavaScript", "React", "Performance"],
    },
  ];

  // Filter tests based on search query and status filter
  const filteredTests = allTests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" &&
        (test.status === "In Progress" || test.status === "Not Started")) ||
      (filterStatus === "completed" && test.status === "Completed") ||
      (filterStatus === "expired" && test.status === "Expired");

    return matchesSearch && matchesStatus;
  });

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
            <h1 className="text-2xl font-bold">My Tests</h1>
            <Button onClick={() => router.push("/ide")}>Practice Coding</Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests by title, company, or skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs
              defaultValue="all"
              value={filterStatus}
              onValueChange={setFilterStatus}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  onStartTest={handleStartTest}
                  onContinueTest={handleContinueTest}
                  onViewResults={handleViewResults}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No tests found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
