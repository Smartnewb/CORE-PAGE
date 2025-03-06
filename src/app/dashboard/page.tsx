import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TestsOverview from "@/components/dashboard/TestsOverview";

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar
        userName="Kim Min-ji"
        userEmail="minjikim@example.com"
        companyName="Tech Solutions Inc."
      />
      <div className="flex-1 overflow-auto">
        <TestsOverview
          stats={{
            totalTests: 8,
            activeTests: 5,
            totalCandidates: 42,
            averageScore: 74,
          }}
          tests={[
            {
              id: "1",
              title: "JavaScript Fundamentals",
              difficulty: "Easy",
              submissions: 24,
              passRate: 78,
              createdAt: "2023-10-15",
            },
            {
              id: "2",
              title: "React Component Architecture",
              difficulty: "Medium",
              submissions: 18,
              passRate: 62,
              createdAt: "2023-11-02",
            },
            {
              id: "3",
              title: "Advanced Algorithms",
              difficulty: "Hard",
              submissions: 12,
              passRate: 45,
              createdAt: "2023-11-20",
            },
          ]}
          candidates={[
            {
              id: "1",
              name: "Kim Min-ji",
              email: "minji.kim@example.com",
              testTitle: "JavaScript Fundamentals",
              score: 92,
              submittedAt: "2023-11-25 14:30",
              status: "Completed",
            },
            {
              id: "2",
              name: "Park Ji-hoon",
              email: "jihoon.park@example.com",
              testTitle: "React Component Architecture",
              score: 78,
              submittedAt: "2023-11-24 10:15",
              status: "Completed",
            },
            {
              id: "3",
              name: "Lee Soo-jin",
              email: "soojin.lee@example.com",
              testTitle: "Advanced Algorithms",
              score: 0,
              submittedAt: "2023-11-26 09:45",
              status: "In Progress",
            },
            {
              id: "4",
              name: "Choi Tae-woo",
              email: "taewoo.choi@example.com",
              testTitle: "JavaScript Fundamentals",
              score: 65,
              submittedAt: "2023-11-23 16:20",
              status: "Failed",
            },
          ]}
        />
      </div>
    </div>
  );
}
