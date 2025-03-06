import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Code,
  Terminal as TerminalIcon,
} from "lucide-react";

interface TestInstructionsProps {
  title?: string;
  description?: string;
  timeLimit?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  requirements?: string[];
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  hints?: string[];
}

const TestInstructions = ({
  title = "Algorithm Challenge: Binary Search Implementation",
  description = "Implement a binary search algorithm that efficiently finds a target value within a sorted array. Your solution should have O(log n) time complexity.",
  timeLimit = 60,
  difficulty = "Medium",
  requirements = [
    "Function should return the index of the target if found, or -1 if not found",
    "Implement the algorithm iteratively (not recursively)",
    "Handle edge cases like empty arrays and targets not in the array",
    "Optimize for time and space complexity",
  ],
  examples = [
    {
      input: "binarySearch([1, 2, 3, 4, 5], 3)",
      output: "2",
      explanation: "The value 3 is found at index 2 in the array",
    },
    {
      input: "binarySearch([1, 2, 3, 4, 5], 6)",
      output: "-1",
      explanation: "The value 6 is not in the array, so return -1",
    },
  ],
  hints = [
    "Remember that binary search requires the array to be sorted",
    "Think about how to calculate the middle index correctly",
    "Consider what happens when the target is less than or greater than the middle element",
  ],
}: TestInstructionsProps) => {
  return (
    <Card className="h-full bg-white dark:bg-gray-900 overflow-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge
            variant={
              difficulty === "Easy"
                ? "secondary"
                : difficulty === "Hard"
                  ? "destructive"
                  : "default"
            }
            className="ml-2"
          >
            {difficulty}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Clock className="mr-1 h-4 w-4" />
          <span>{timeLimit} minutes</span>
        </div>
        <CardDescription className="mt-4">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="requirements" className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="requirements">
              <FileText className="h-4 w-4 mr-2" />
              Requirements
            </TabsTrigger>
            <TabsTrigger value="examples">
              <Code className="h-4 w-4 mr-2" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="hints">
              <AlertCircle className="h-4 w-4 mr-2" />
              Hints
            </TabsTrigger>
            <TabsTrigger value="output">
              <TerminalIcon className="h-4 w-4 mr-2" />
              Expected Output
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requirements" className="space-y-4 mt-4">
            <ul className="space-y-2">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4 mt-4">
            {examples.map((example, index) => (
              <div key={index} className="p-4 border rounded-md bg-muted/50">
                <div className="font-mono">
                  <div className="text-sm font-semibold mb-1">Input:</div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded mb-2">
                    {example.input}
                  </div>
                  <div className="text-sm font-semibold mb-1">Output:</div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded mb-2">
                    {example.output}
                  </div>
                  {example.explanation && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="hints" className="space-y-4 mt-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
              <h4 className="font-semibold mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                Stuck? Here are some hints:
              </h4>
              <ul className="space-y-2 pl-7 list-disc">
                {hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="output" className="mt-4">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md font-mono">
              <pre className="whitespace-pre-wrap">
                {`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Note: This is just one possible solution. Your implementation may
              differ as long as it meets the requirements.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          View Full Problem
        </Button>
        <Button>Start Coding</Button>
      </CardFooter>
    </Card>
  );
};

export default TestInstructions;
