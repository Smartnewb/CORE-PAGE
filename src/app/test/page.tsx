"use client";

import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EditorHeader from "@/components/ide/EditorHeader";
import CodeEditor from "@/components/ide/CodeEditor";
import TestInstructions from "@/components/ide/TestInstructions";
import Terminal from "@/components/ide/Terminal";
import VirtualTeamChat from "@/components/collaborative/VirtualTeamChat";
import CodeReviewPanel from "@/components/collaborative/CodeReviewPanel";
import TestCaseRunner from "@/components/collaborative/TestCaseRunner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, MessageSquare, Play, TestTube } from "lucide-react";

export default function TestPage() {
  const [activeFile, setActiveFile] = useState("/index.js");
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [terminalOutput, setTerminalOutput] = useState([
    "> npm run test",
    "Running tests...",
    "Test 1: Passed",
    "Test 2: Failed - Expected output: 42, Received: 41",
    "Test 3: Passed",
    "Test 4: Passed",
    "2 tests passing, 1 test failing",
    "",
    "> node solution.js",
    "Hello, world!",
    "Processing input...",
    "Result: 41",
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState("instructions");

  const handleRunCode = () => {
    setIsRunning(true);
    setTerminalOutput([...terminalOutput, "> Running code..."]);

    // Simulate code execution delay
    setTimeout(() => {
      setTerminalOutput([
        ...terminalOutput,
        "> Running code...",
        "Hello, world!",
        "Result: 42",
        "Process completed successfully.",
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const handleSaveCode = () => {
    // Simulate saving code
    console.log("Saving code...");
  };

  const handleSubmitCode = () => {
    // Simulate submitting code
    console.log("Submitting code...");
  };

  const handleClearTerminal = () => {
    setTerminalOutput([]);
  };

  const handleFileSelect = (path: string) => {
    setActiveFile(path);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <EditorHeader
        testName="Algorithm Challenge: Binary Search Implementation"
        timeRemaining={timeRemaining}
        onRun={handleRunCode}
        onSave={handleSaveCode}
        onSubmit={handleSubmitCode}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left panel - Code Editor */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                activeFile={activeFile}
                onFileSelect={handleFileSelect}
                onRun={handleRunCode}
                onSave={handleSaveCode}
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right panel - Instructions, Terminal, Team Chat */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            {/* Top section - Instructions or Team Chat */}
            <ResizablePanel defaultSize={60} minSize={20}>
              <div className="h-full border-l border-border overflow-hidden">
                <Tabs
                  value={activeRightTab}
                  onValueChange={setActiveRightTab}
                  className="h-full flex flex-col"
                >
                  <div className="border-b px-4">
                    <TabsList className="h-10">
                      <TabsTrigger
                        value="instructions"
                        className="flex items-center gap-1"
                      >
                        <FileCode className="h-4 w-4" />
                        Instructions
                      </TabsTrigger>
                      <TabsTrigger
                        value="team-chat"
                        className="flex items-center gap-1"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Team Chat
                      </TabsTrigger>
                      <TabsTrigger
                        value="test-cases"
                        className="flex items-center gap-1"
                      >
                        <TestTube className="h-4 w-4" />
                        Test Cases
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent
                    value="instructions"
                    className="flex-1 p-0 m-0 overflow-hidden"
                  >
                    <TestInstructions />
                  </TabsContent>

                  <TabsContent
                    value="team-chat"
                    className="flex-1 p-0 m-0 overflow-hidden"
                  >
                    <VirtualTeamChat />
                  </TabsContent>

                  <TabsContent
                    value="test-cases"
                    className="flex-1 p-0 m-0 overflow-hidden"
                  >
                    <TestCaseRunner />
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Bottom section - Terminal or Code Review */}
            <ResizablePanel defaultSize={40} minSize={20}>
              <div className="h-full border-t border-l border-border overflow-hidden">
                <Tabs defaultValue="terminal" className="h-full flex flex-col">
                  <div className="px-4">
                    <TabsList className="h-10">
                      <TabsTrigger
                        value="terminal"
                        className="flex items-center gap-1"
                      >
                        <Play className="h-4 w-4" />
                        Terminal
                      </TabsTrigger>
                      <TabsTrigger
                        value="code-review"
                        className="flex items-center gap-1"
                      >
                        <FileCode className="h-4 w-4" />
                        Code Review
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent
                    value="terminal"
                    className="flex-1 p-0 m-0 overflow-hidden border-t border-border bg-background"
                  >
                    <Terminal
                      output={terminalOutput}
                      isRunning={isRunning}
                      onRun={handleRunCode}
                      onClear={handleClearTerminal}
                    />
                  </TabsContent>

                  <TabsContent
                    value="code-review"
                    className="flex-1 p-0 m-0 overflow-hidden border-t border-border bg-background"
                  >
                    <CodeReviewPanel />
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
