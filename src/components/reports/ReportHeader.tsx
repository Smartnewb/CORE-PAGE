import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DownloadIcon, FileTextIcon, ShareIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../../lib/utils";

interface ReportHeaderProps {
  candidateName?: string;
  candidateEmail?: string;
  testTitle?: string;
  testDate?: string;
  score?: number;
  status?: "passed" | "failed" | "pending";
  onExportPDF?: () => void;
  onShare?: () => void;
}

const ReportHeader = ({
  candidateName = "Kim Min-ji",
  candidateEmail = "minji.kim@example.com",
  testTitle = "Full Stack Developer Assessment",
  testDate = "2023-05-15",
  score = 85,
  status = "passed",
  onExportPDF = () => console.log("Export PDF clicked"),
  onShare = () => console.log("Share clicked"),
}: ReportHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 p-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{testTitle}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {candidateName}
                </span>
              </div>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="text-sm text-gray-500">{candidateEmail}</span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="text-sm text-gray-500">
                Completed on {testDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex flex-col items-end mr-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{score}%</span>
                <Badge
                  className={cn("capitalize", getStatusColor(status))}
                  variant="outline"
                >
                  {status}
                </Badge>
              </div>
              <span className="text-xs text-gray-500">Overall Score</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onExportPDF}
              className="flex items-center gap-1"
            >
              <DownloadIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ShareIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onShare()}>
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShare()}>
                  Email Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Badge variant="secondary" className="flex items-center gap-1">
            <FileTextIcon className="h-3 w-3" />
            <span>JavaScript</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <FileTextIcon className="h-3 w-3" />
            <span>React</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <FileTextIcon className="h-3 w-3" />
            <span>Node.js</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <FileTextIcon className="h-3 w-3" />
            <span>Problem Solving</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
