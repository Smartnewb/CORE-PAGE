import React from "react";
import ReportHeader from "@/components/reports/ReportHeader";
import SkillRadarChart from "@/components/reports/SkillRadarChart";
import CodeAnalysis from "@/components/reports/CodeAnalysis";
import FeedbackSection from "@/components/reports/FeedbackSection";

interface ReportPageProps {
  params: {
    id: string;
  };
}

export default function ReportPage({ params }: ReportPageProps) {
  // In a real implementation, you would fetch the report data based on the ID
  const reportId = params.id;

  // Mock data for the report
  const candidateData = {
    name: "Kim Min-ji",
    email: "minji.kim@example.com",
    testTitle: "Full Stack Developer Assessment",
    testDate: "2023-11-25",
    score: 85,
    status: "passed",
  };

  // Mock skills data for the radar chart
  const skillsData = [
    { name: "Code Quality", score: 85, color: "#4338ca" },
    { name: "Problem Solving", score: 78, color: "#0ea5e9" },
    { name: "Algorithm Efficiency", score: 65, color: "#10b981" },
    { name: "Code Structure", score: 72, color: "#f59e0b" },
    { name: "Documentation", score: 60, color: "#ef4444" },
    { name: "Testing", score: 55, color: "#8b5cf6" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Report Header */}
      <ReportHeader
        candidateName={candidateData.name}
        candidateEmail={candidateData.email}
        testTitle={candidateData.testTitle}
        testDate={candidateData.testDate}
        score={candidateData.score}
        status={candidateData.status as "passed" | "failed" | "pending"}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Skill Radar Chart */}
          <div className="lg:col-span-1">
            <SkillRadarChart skills={skillsData} />
          </div>

          {/* Code Analysis */}
          <div className="lg:col-span-2">
            <CodeAnalysis
              candidateName={candidateData.name}
              testTitle={candidateData.testTitle}
              codeQualityScore={skillsData[0].score}
              performanceScore={skillsData[2].score}
              problemSolvingScore={skillsData[1].score}
            />
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-8">
          <FeedbackSection
            candidateName={candidateData.name}
            candidateId={reportId}
          />
        </div>
      </div>
    </div>
  );
}
