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
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  Pencil,
  Trash2,
  Share2,
  Eye,
} from "lucide-react";

interface Test {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: string;
  submissions: number;
  passRate: number;
  createdAt: string;
  status: "Active" | "Draft" | "Completed" | "Archived";
}

const TestManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Mock test data
  const tests: Test[] = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      difficulty: "Easy",
      type: "Frontend",
      submissions: 24,
      passRate: 78,
      createdAt: "2023-10-15",
      status: "Active",
    },
    {
      id: "2",
      title: "React Component Architecture",
      difficulty: "Medium",
      type: "Frontend",
      submissions: 18,
      passRate: 62,
      createdAt: "2023-11-02",
      status: "Active",
    },
    {
      id: "3",
      title: "Advanced Algorithms",
      difficulty: "Hard",
      type: "Algorithm",
      submissions: 12,
      passRate: 45,
      createdAt: "2023-11-20",
      status: "Active",
    },
    {
      id: "4",
      title: "Database Design",
      difficulty: "Medium",
      type: "Backend",
      submissions: 15,
      passRate: 70,
      createdAt: "2023-12-05",
      status: "Active",
    },
    {
      id: "5",
      title: "API Development with Node.js",
      difficulty: "Medium",
      type: "Backend",
      submissions: 20,
      passRate: 65,
      createdAt: "2024-01-10",
      status: "Active",
    },
    {
      id: "6",
      title: "System Design Interview",
      difficulty: "Hard",
      type: "System Design",
      submissions: 8,
      passRate: 50,
      createdAt: "2024-02-15",
      status: "Draft",
    },
  ];

  // Filter tests based on search query and selected filter
  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = !selectedFilter || test.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Get unique test types for filter
  const testTypes = Array.from(new Set(tests.map((test) => test.type)));

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Archived":
        return "bg-purple-100 text-purple-800";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Test Management</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Test
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Tests</CardTitle>
          <CardDescription>
            Manage your coding tests and assessments
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedFilter || "Filter by type"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedFilter(null)}>
                  All Types
                </DropdownMenuItem>
                {testTypes.map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setSelectedFilter(type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="text-center">Submissions</TableHead>
                  <TableHead className="text-center">Pass Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>{test.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(test.difficulty)}
                      >
                        {test.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {test.submissions}
                    </TableCell>
                    <TableCell className="text-center">
                      {test.passRate}%
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(test.status)}
                      >
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{test.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="h-4 w-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Copy className="h-4 w-4 mr-2" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
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
            Showing {filteredTests.length} of {tests.length} tests
          </div>
          <Button variant="outline" size="sm">
            View All Tests
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestManagement;
