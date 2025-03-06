"use client";

import React from "react";
import EditorHeader from "@/components/ide/EditorHeader";
import CodeEditor from "@/components/ide/CodeEditor";
import TestInstructions from "@/components/ide/TestInstructions";
import Terminal from "@/components/ide/Terminal";
import { useState } from "react";

export default function IDEPage() {
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
    <div className="flex flex-col h-screen bg-background">
      <EditorHeader
        testName="Algorithm Challenge: Binary Search Implementation"
        timeRemaining={timeRemaining}
        onRun={handleRunCode}
        onSave={handleSaveCode}
        onSubmit={handleSubmitCode}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Main content area with code editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              activeFile={activeFile}
              onFileSelect={handleFileSelect}
              onRun={handleRunCode}
              onSave={handleSaveCode}
            />
          </div>
        </div>

        {/* Right sidebar with instructions and terminal */}
        <div className="w-[512px] flex flex-col border-l border-border overflow-hidden">
          <div className="h-[400px] overflow-hidden">
            <TestInstructions />
          </div>
          <div className="flex-1 border-t border-border overflow-hidden">
            <Terminal
              output={terminalOutput}
              isRunning={isRunning}
              onRun={handleRunCode}
              onClear={handleClearTerminal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
