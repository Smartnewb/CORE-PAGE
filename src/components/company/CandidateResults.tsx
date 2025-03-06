import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  testTitle: string;
  score: number;
  submittedAt: string;
  status: "Completed" | "In Progress" | "Failed";
  suitability: "Suitable" | "Pending" | "Not Suitable";
}

const CandidateResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [suitabilityFilter, setSuitabilityFilter] = useState<string | null>(
    null,
  );

  // Mock candidate data
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Kim Min-ji",
      email: "minji.kim@example.com",
      testTitle: "JavaScript Fundamentals",
      score: 92,
      submittedAt: "2023-11-25 14:30",
      status: "Completed",
      suitability: "Suitable",
    },
    {
      id: "2",
      name: "Park Ji-hoon",
      email: "jihoon.park@example.com",
      testTitle: "React Component Architecture",
      score: 78,
      submittedAt: "2023-11-24 10:15",
      status: "Completed",
      suitability: "Suitable",
    },
    {
      id: "3",
      name: "Lee Soo-jin",
      email: "soojin.lee@example.com",
      testTitle: "Advanced Algorithms",
      score: 0,
      submittedAt: "2023-11-26 09:45",
      status: "In Progress",
      suitability: "Pending",
    },
    {
      id: "4",
      name: "Choi Tae-woo",
      email: "taewoo.choi@example.com",
      testTitle: "JavaScript Fundamentals",
      score: 65,
      submittedAt: "2023-11-23 16:20",
      status: "Failed",
      suitability: "Not Suitable",
    },
    {
      id: "5",
      name: "Kang Hye-jin",
      email: "hyejin.kang@example.com",
      testTitle: "Database Design",
      score: 88,
      submittedAt: "2023-12-01 11:30",
      status: "Completed",
      suitability: "Suitable",
    },
    {
      id: "6",
      name: "Yoon Jae-hyun",
      email: "jaehyun.yoon@example.com",
      testTitle: "API Development with Node.js",
      score: 72,
      submittedAt: "2023-12-02 13:45",
      status: "Completed",
      suitability: "Pending",
    },
  ];

  // Filter candidates based on search query and filters
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.testTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !statusFilter || candidate.status === statusFilter;
    const matchesSuitability =
      !suitabilityFilter || candidate.suitability === suitabilityFilter;

    return matchesSearch && matchesStatus && matchesSuitability;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case "Suitable":
        return <ThumbsUp className="h-4 w-4 text-green-500" />;
      case "Not Suitable":
        return <ThumbsDown className="h-4 w-4 text-red-500" />;
      case "Pending":
        return <HelpCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "Suitable":
        return "bg-green-100 text-green-800";
      case "Not Suitable":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Candidate Results</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Evaluations</CardTitle>
          <CardDescription>
            Review test results and candidate performance
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilter || "Filter by status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("In Progress")}
                >
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Failed")}>
                  Failed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {suitabilityFilter || "Filter by suitability"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSuitabilityFilter(null)}>
                  All Suitability
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSuitabilityFilter("Suitable")}
                >
                  Suitable
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSuitabilityFilter("Pending")}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSuitabilityFilter("Not Suitable")}
                >
                  Not Suitable
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Suitability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {candidate.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.testTitle}</TableCell>
                    <TableCell className="text-center">
                      {candidate.status === "In Progress"
                        ? "-"
                        : `${candidate.score}%`}
                    </TableCell>
                    <TableCell>{candidate.submittedAt}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 justify-center ${getStatusColor(candidate.status)}`}
                      >
                        {getStatusIcon(candidate.status)}
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={`flex items-center gap-1 justify-center ${getSuitabilityColor(candidate.suitability)}`}
                      >
                        {getSuitabilityIcon(candidate.suitability)}
                        {candidate.suitability}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <FileText className="h-4 w-4 mr-2" /> View Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="h-4 w-4 mr-2" /> Contact Candidate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredCandidates.length} of {candidates.length}{" "}
            candidates
          </div>
          <Button variant="outline" size="sm">
            View All Candidates
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CandidateResults;
