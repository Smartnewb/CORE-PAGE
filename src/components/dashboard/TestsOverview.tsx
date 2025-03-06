import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface TestData {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  submissions: number;
  passRate: number;
  createdAt: string;
}

interface CandidateData {
  id: string;
  name: string;
  email: string;
  testTitle: string;
  score: number;
  submittedAt: string;
  status: "Completed" | "In Progress" | "Failed";
}

interface TestsOverviewProps {
  tests?: TestData[];
  candidates?: CandidateData[];
  stats?: {
    totalTests: number;
    activeTests: number;
    totalCandidates: number;
    averageScore: number;
  };
}

const TestsOverview = ({
  tests = [
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
  ],
  candidates = [
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
  ],
  stats = {
    totalTests: 8,
    activeTests: 5,
    totalCandidates: 42,
    averageScore: 74,
  },
}: TestsOverviewProps) => {
  return (
    <div className="bg-background p-6 w-full h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Create New Test
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTests}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeTests} currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Candidates
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCandidates}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              +2% from previous tests
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              -3% from previous tests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your test activity over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-16 w-16 mx-auto mb-2" />
                  <p>Activity chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Test Distribution</CardTitle>
                <CardDescription>Breakdown by difficulty level</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="h-16 w-16 mx-auto mb-2" />
                  <p>Distribution chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tests Tab */}
        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Tests</CardTitle>
              <CardDescription>Manage your coding tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
                  <div>Title</div>
                  <div>Difficulty</div>
                  <div className="text-center">Submissions</div>
                  <div className="text-center">Pass Rate</div>
                  <div>Created</div>
                  <div className="text-right">Actions</div>
                </div>
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="grid grid-cols-6 p-3 text-sm border-t"
                  >
                    <div className="font-medium">{test.title}</div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          test.difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : test.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {test.difficulty}
                      </span>
                    </div>
                    <div className="text-center">{test.submissions}</div>
                    <div className="text-center">{test.passRate}%</div>
                    <div>{test.createdAt}</div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All Tests
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Candidates Tab */}
        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>
                Latest candidate test submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted p-3 text-sm font-medium">
                  <div>Name</div>
                  <div>Test</div>
                  <div className="text-center">Score</div>
                  <div>Submitted</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">Time Spent</div>
                  <div className="text-right">Actions</div>
                </div>
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="grid grid-cols-7 p-3 text-sm border-t"
                  >
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {candidate.email}
                      </div>
                    </div>
                    <div className="self-center">{candidate.testTitle}</div>
                    <div className="text-center self-center">
                      {candidate.status === "In Progress"
                        ? "-"
                        : `${candidate.score}%`}
                    </div>
                    <div className="self-center">{candidate.submittedAt}</div>
                    <div className="text-center self-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          candidate.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : candidate.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {candidate.status === "Completed" && (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        )}
                        {candidate.status === "In Progress" && (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {candidate.status === "Failed" && (
                          <AlertCircle className="mr-1 h-3 w-3" />
                        )}
                        {candidate.status}
                      </span>
                    </div>
                    <div className="text-center self-center">
                      {candidate.status === "In Progress"
                        ? "Active now"
                        : "45 min"}
                    </div>
                    <div className="text-right self-center">
                      <Button variant="ghost" size="sm">
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All Candidates
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestsOverview;
