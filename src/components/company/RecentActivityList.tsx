"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  FileCode,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type:
    | "test_created"
    | "candidate_completed"
    | "candidate_started"
    | "test_updated"
    | "settings_changed";
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

const RecentActivityList = () => {
  // Mock activity data
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "candidate_completed",
      title: "Candidate Completed Test",
      description:
        "Kim Min-ji completed JavaScript Fundamentals test with a score of 92%",
      timestamp: "2 hours ago",
      user: {
        name: "Kim Min-ji",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kim",
      },
    },
    {
      id: "2",
      type: "test_created",
      title: "New Test Created",
      description: "System Design Interview test was created",
      timestamp: "Yesterday",
      user: {
        name: "Admin User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      },
    },
    {
      id: "3",
      type: "candidate_started",
      title: "Candidate Started Test",
      description: "Lee Soo-jin started Advanced Algorithms test",
      timestamp: "2 days ago",
      user: {
        name: "Lee Soo-jin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lee",
      },
    },
    {
      id: "4",
      type: "test_updated",
      title: "Test Updated",
      description: "React Component Architecture test was updated",
      timestamp: "3 days ago",
      user: {
        name: "Admin User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      },
    },
    {
      id: "5",
      type: "settings_changed",
      title: "Settings Changed",
      description: "Company profile information was updated",
      timestamp: "1 week ago",
      user: {
        name: "Admin User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      },
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "test_created":
      case "test_updated":
        return <FileCode className="h-5 w-5 text-blue-500" />;
      case "candidate_completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "candidate_started":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "settings_changed":
        return <Settings className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "test_created":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Test Created
          </Badge>
        );
      case "test_updated":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Test Updated
          </Badge>
        );
      case "candidate_completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "candidate_started":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            Started
          </Badge>
        );
      case "settings_changed":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Settings
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">{activity.title}</div>
              {getActivityBadge(activity.type)}
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {activity.user && (
                <div className="flex items-center gap-1">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>
                      {activity.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{activity.user.name}</span>
                </div>
              )}
              <span>•</span>
              <span>{activity.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivityList;
