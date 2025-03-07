import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Play, Plus, Trash2 } from "lucide-react";

interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status?: "passed" | "failed" | "not-run";
}

interface TestCaseRunnerProps {
  testCases?: TestCase[];
  onRunTest?: (testId: string) => void;
  onRunAllTests?: () => void;
  onAddTestCase?: (
    testCase: Omit<TestCase, "id" | "status" | "actualOutput">,
  ) => void;
  onDeleteTestCase?: (testId: string) => void;
}

const TestCaseRunner = ({
  testCases = [
    {
      id: "1",
      name: "Basic Test",
      input: "binarySearch([1, 2, 3, 4, 5], 3)",
      expectedOutput: "2",
      status: "passed" as const,
      actualOutput: "2",
    },
    {
      id: "2",
      name: "Element Not Found",
      input: "binarySearch([1, 2, 3, 4, 5], 6)",
      expectedOutput: "-1",
      status: "passed" as const,
      actualOutput: "-1",
    },
    {
      id: "3",
      name: "Empty Array",
      input: "binarySearch([], 1)",
      expectedOutput: "-1",
      status: "not-run" as const,
    },
    {
      id: "4",
      name: "Large Array",
      input: "binarySearch(Array.from({length: 1000}, (_, i) => i), 500)",
      expectedOutput: "500",
      status: "failed" as const,
      actualOutput: "499",
    },
  ],
  onRunTest = () => {},
  onRunAllTests = () => {},
  onAddTestCase = () => {},
  onDeleteTestCase = () => {},
}: TestCaseRunnerProps) => {
  const [activeTab, setActiveTab] = useState("test-cases");
  const [newTestCase, setNewTestCase] = useState({
    name: "",
    input: "",
    expectedOutput: "",
  });

  const handleAddTestCase = () => {
    if (!newTestCase.name || !newTestCase.input || !newTestCase.expectedOutput)
      return;

    onAddTestCase({
      name: newTestCase.name,
      input: newTestCase.input,
      expectedOutput: newTestCase.expectedOutput,
    });

    setNewTestCase({
      name: "",
      input: "",
      expectedOutput: "",
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "passed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Play className="h-5 w-5 text-gray-400" />;
    }
  };

  const passedTests = testCases.filter(
    (test) => test.status === "passed",
  ).length;
  const failedTests = testCases.filter(
    (test) => test.status === "failed",
  ).length;
  const notRunTests = testCases.filter(
    (test) => test.status === "not-run" || !test.status,
  ).length;

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Test Cases</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>{passedTests} Passed</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <XCircle className="h-3 w-3 text-red-500" />
              <span>{failedTests} Failed</span>
            </Badge>
            <Button size="sm" onClick={onRunAllTests}>
              <Play className="h-4 w-4 mr-1" />
              Run All
            </Button>
          </div>
        </div>
      </CardHeader>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="px-4 border-b">
          <TabsList className="w-full justify-start h-10">
            <TabsTrigger value="test-cases" className="text-xs">
              Test Cases ({testCases.length})
            </TabsTrigger>
            <TabsTrigger value="add-test" className="text-xs">
              Add Test Case
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="test-cases"
          className="flex-1 overflow-y-auto p-0 m-0"
        >
          <div className="divide-y">
            {testCases.map((test) => (
              <div key={test.id} className="p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(test.status)}
                    <h3 className="font-medium">{test.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => onDeleteTestCase(test.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onRunTest(test.id)}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Run
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs font-medium mb-1">Input:</p>
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                      <code>{test.input}</code>
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1">Expected Output:</p>
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                      <code>{test.expectedOutput}</code>
                    </pre>
                  </div>
                </div>

                {test.status === "failed" && test.actualOutput && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-1 text-red-500">
                      Actual Output:
                    </p>
                    <pre className="bg-red-50 border border-red-200 p-2 rounded text-xs overflow-x-auto">
                      <code>{test.actualOutput}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="add-test"
          className="flex-1 overflow-y-auto p-4 m-0"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">
                Test Name
              </label>
              <input
                type="text"
                className="w-full p-2 rounded-md border border-input bg-background"
                placeholder="e.g., Edge Case Test"
                value={newTestCase.name}
                onChange={(e) =>
                  setNewTestCase({ ...newTestCase, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Input</label>
              <textarea
                className="w-full min-h-[80px] p-2 rounded-md border border-input bg-background font-mono text-sm"
                placeholder="e.g., binarySearch([1, 2, 3], 2)"
                value={newTestCase.input}
                onChange={(e) =>
                  setNewTestCase({ ...newTestCase, input: e.target.value })
                }
              ></textarea>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">
                Expected Output
              </label>
              <textarea
                className="w-full min-h-[80px] p-2 rounded-md border border-input bg-background font-mono text-sm"
                placeholder="e.g., 1"
                value={newTestCase.expectedOutput}
                onChange={(e) =>
                  setNewTestCase({
                    ...newTestCase,
                    expectedOutput: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <Button onClick={handleAddTestCase} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Test Case
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TestCaseRunner;
