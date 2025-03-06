"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  Play,
  Save,
  Settings,
  FileCode,
  FolderTree,
  Terminal as TerminalIcon,
} from "lucide-react";

interface CodeEditorProps {
  code?: string;
  language?: string;
  theme?: "light" | "dark";
  onCodeChange?: (code: string) => void;
  onRun?: () => void;
  onSave?: () => void;
  files?: Array<{
    name: string;
    path: string;
    language: string;
    content: string;
  }>;
  activeFile?: string;
  onFileSelect?: (path: string) => void;
}

const CodeEditor = ({
  code = "// Write your code here\n\nfunction solution() {\n  // Your solution goes here\n  return 'Hello, World!';\n}\n\nconsole.log(solution());",
  language = "javascript",
  theme = "dark",
  onCodeChange = () => {},
  onRun = () => {},
  onSave = () => {},
  files = [
    {
      name: "index.js",
      path: "/index.js",
      language: "javascript",
      content:
        "// Main file\n\nfunction solution() {\n  return 'Hello, World!';\n}\n\nconsole.log(solution());",
    },
    {
      name: "utils.js",
      path: "/utils.js",
      language: "javascript",
      content:
        "// Utility functions\n\nexport function formatOutput(result) {\n  return `Result: ${result}`;\n}",
    },
    {
      name: "data.json",
      path: "/data.json",
      language: "json",
      content: '{\n  "name": "Test Data",\n  "values": [1, 2, 3, 4, 5]\n}',
    },
  ],
  activeFile = "/index.js",
  onFileSelect = () => {},
}: CodeEditorProps) => {
  const [currentTab, setCurrentTab] = useState<string>("editor");
  const [showFileTree, setShowFileTree] = useState<boolean>(true);

  // Get the active file content
  const activeFileContent =
    files.find((file) => file.path === activeFile)?.content || code;

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] text-white overflow-hidden rounded-md border border-gray-800">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => setShowFileTree(!showFileTree)}
          >
            <FolderTree size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <FileCode size={16} />
          </Button>
          <div className="text-sm font-medium text-gray-300">
            {files.find((file) => file.path === activeFile)?.name || "untitled"}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={onRun}
                >
                  <Play size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={onSave}
                >
                  <Save size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Settings size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editor Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        {showFileTree && (
          <div className="w-64 bg-[#252526] border-r border-gray-800 overflow-y-auto">
            <div className="p-2 text-sm font-medium text-gray-400">
              EXPLORER
            </div>
            <div className="px-2">
              {files.map((file) => (
                <div
                  key={file.path}
                  className={cn(
                    "flex items-center px-2 py-1 text-sm rounded cursor-pointer",
                    activeFile === file.path
                      ? "bg-[#37373d] text-white"
                      : "text-gray-400 hover:bg-[#2a2d2e]",
                  )}
                  onClick={() => onFileSelect(file.path)}
                >
                  <FileCode size={14} className="mr-2" />
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            className="flex-1 flex flex-col"
          >
            <TabsList className="bg-[#252526] border-b border-gray-800 rounded-none w-full justify-start px-2">
              <TabsTrigger
                value="editor"
                className="data-[state=active]:bg-[#1e1e1e]"
              >
                Editor
              </TabsTrigger>
              <TabsTrigger
                value="terminal"
                className="data-[state=active]:bg-[#1e1e1e]"
              >
                Terminal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="flex-1 p-0 m-0">
              <div className="relative h-full w-full overflow-auto">
                {/* Line Numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-gray-800 text-right pr-2 text-gray-500 select-none">
                  {activeFileContent.split("\n").map((_, i) => (
                    <div key={i} className="leading-6 text-xs">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code Area */}
                <div className="pl-12 pr-4">
                  <pre className="text-sm font-mono leading-6 whitespace-pre">
                    <code>{activeFileContent}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="terminal" className="flex-1 p-0 m-0">
              <div className="h-full bg-[#1e1e1e] p-4 font-mono text-sm overflow-auto">
                <div className="flex items-center text-gray-400 mb-2">
                  <TerminalIcon size={14} className="mr-2" />
                  <span>Terminal</span>
                </div>
                <div className="text-green-500">
                  $ node{" "}
                  {files.find((file) => file.path === activeFile)?.name ||
                    "index.js"}
                </div>
                <div className="mt-2">Hello, World!</div>
                <div className="text-gray-400 mt-1">
                  Process exited with code 0
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#007acc] text-white text-xs">
        <div className="flex items-center space-x-4">
          <div>{language}</div>
          <div>UTF-8</div>
        </div>
        <div className="flex items-center space-x-4">
          <div>Ln 1, Col 1</div>
          <div>{theme === "dark" ? "Dark" : "Light"} Mode</div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
