import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Terminal as TerminalIcon,
  Play,
  X,
  Maximize2,
  Minimize2,
  Copy,
} from "lucide-react";

interface TerminalProps {
  output?: string[];
  isRunning?: boolean;
  onRun?: () => void;
  onClear?: () => void;
}

const Terminal = ({
  output = [
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
  ],
  isRunning = false,
  onRun = () => console.log("Run code"),
  onClear = () => console.log("Clear terminal"),
}: TerminalProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("output");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output.join("\n"));
  };

  return (
    <div
      className={`bg-[#1e1e1e] text-white rounded-md overflow-hidden flex flex-col ${isExpanded ? "fixed inset-0 z-50" : "h-full"}`}
    >
      <div className="flex items-center justify-between bg-[#252526] px-4 py-2 border-b border-[#3c3c3c]">
        <div className="flex items-center space-x-2">
          <TerminalIcon size={16} />
          <span className="text-sm font-medium">Terminal</span>
        </div>

        <div className="flex items-center space-x-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-2">
            <TabsList className="bg-[#2d2d2d]">
              <TabsTrigger value="output" className="text-xs">
                Output
              </TabsTrigger>
              <TabsTrigger value="problems" className="text-xs">
                Problems
              </TabsTrigger>
              <TabsTrigger value="debug" className="text-xs">
                Debug Console
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="ghost"
            size="icon"
            onClick={onRun}
            disabled={isRunning}
            className="h-7 w-7"
          >
            <Play
              size={14}
              className={isRunning ? "text-green-400 animate-pulse" : ""}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="h-7 w-7"
          >
            <X size={14} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="h-7 w-7"
          >
            <Copy size={14} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpand}
            className="h-7 w-7"
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </Button>
        </div>
      </div>

      <TabsContent value="output" className="flex-1 p-0 m-0">
        <ScrollArea className="h-full">
          <div className="p-3 font-mono text-sm">
            {output.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center mt-2">
                <span className="inline-block h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2"></span>
                <span>Running code...</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="problems" className="flex-1 p-0 m-0">
        <ScrollArea className="h-full">
          <div className="p-3 font-mono text-sm">
            <div className="text-yellow-400">
              ⚠ Warning: Unused variable 'result' at line 42
            </div>
            <div className="text-red-400">
              ✖ Error: Missing semicolon at line 27
            </div>
            <div className="text-yellow-400">
              ⚠ Warning: Function 'calculateTotal' is defined but never used
            </div>
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="debug" className="flex-1 p-0 m-0">
        <ScrollArea className="h-full">
          <div className="p-3 font-mono text-sm">
            <div>Debugger attached.</div>
            <div>Breakpoint hit at line 15: function processData(input)</div>
            <div className="text-blue-400">{">"} Local variables:</div>
            <div className="pl-4">input: Array(3) [ 10, 20, 30 ]</div>
            <div className="pl-4">result: undefined</div>
          </div>
        </ScrollArea>
      </TabsContent>
    </div>
  );
};

export default Terminal;
