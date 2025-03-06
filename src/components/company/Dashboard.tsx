"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanySidebar from "./Sidebar";
import DashboardOverview from "./DashboardOverview";
import TestManagement from "./TestManagement";
import CandidateResults from "./CandidateResults";
import CompanyProfile from "./CompanyProfile";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock company data
  const companyData = {
    name: "Tech Solutions Inc.",
    logo: "",
    industry: "Software Development",
    employeeCount: 120,
    email: "admin@techsolutions.com",
    techStack: ["React", "Node.js", "Python", "AWS", "MongoDB"],
    githubConnected: false,
    jiraConnected: false,
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <CompanySidebar
        companyName={companyData.name}
        companyEmail={companyData.email}
      />
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Company Dashboard</h1>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
              <TabsTrigger value="profile">Company Profile</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="tests" className="mt-0">
            <TestManagement />
          </TabsContent>

          <TabsContent value="candidates" className="mt-0">
            <CandidateResults />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <CompanyProfile companyData={companyData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;
