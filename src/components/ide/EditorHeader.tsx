import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Clock, Code, Play, Save, Settings, Upload } from "lucide-react";

interface EditorHeaderProps {
  testName?: string;
  timeRemaining?: number; // in seconds
  onRun?: () => void;
  onSave?: () => void;
  onSubmit?: () => void;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const EditorHeader = ({
  testName = "Coding Challenge",
  timeRemaining = 3600, // Default: 1 hour
  onRun = () => console.log("Run code"),
  onSave = () => console.log("Save code"),
  onSubmit = () => console.log("Submit code"),
}: EditorHeaderProps) => {
  return (
    <header className="flex items-center justify-between h-[60px] px-4 bg-background border-b border-border">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Code className="h-5 w-5 mr-2 text-primary" />
          <h1 className="font-medium text-lg">{testName}</h1>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-muted px-3 py-1.5 rounded-md mr-2">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium">
            {formatTime(timeRemaining)}
          </span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onSave}>
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onRun}>
                <Play className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Run code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <span>Editor settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Theme</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Font size</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={onSubmit} className="ml-2">
          <Upload className="h-4 w-4 mr-2" />
          Submit
        </Button>
      </div>
    </header>
  );
};

export default EditorHeader;
