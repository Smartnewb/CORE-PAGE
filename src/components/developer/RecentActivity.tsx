import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, Clock, AlertCircle, Trophy } from "lucide-react";

export interface ActivityItem {
  id: string;
  type: "test_completed" | "test_started" | "achievement" | "feedback";
  title: string;
  timestamp: string;
  details?: string;
  score?: number;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({
  activities = [
    {
      id: "1",
      type: "test_completed",
      title: "JavaScript Fundamentals",
      timestamp: "2023-11-25T14:30:00Z",
      score: 92,
    },
    {
      id: "2",
      type: "achievement",
      title: "First Perfect Score",
      timestamp: "2023-11-20T10:15:00Z",
      details: "Achieved 100% on React Component Architecture test",
    },
    {
      id: "3",
      type: "test_started",
      title: "Advanced Algorithms",
      timestamp: "2023-11-26T09:45:00Z",
    },
    {
      id: "4",
      type: "feedback",
      title: "Feedback Received",
      timestamp: "2023-11-23T16:20:00Z",
      details: "Tech Solutions Inc. provided feedback on your JavaScript test",
    },
  ],
}: RecentActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "test_completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "test_started":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "achievement":
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case "feedback":
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "test_completed":
        return (
          <Badge className="bg-green-100 text-green-800">Test Completed</Badge>
        );
      case "test_started":
        return (
          <Badge className="bg-blue-100 text-blue-800">Test Started</Badge>
        );
      case "achievement":
        return (
          <Badge className="bg-amber-100 text-amber-800">Achievement</Badge>
        );
      case "feedback":
        return (
          <Badge className="bg-purple-100 text-purple-800">Feedback</Badge>
        );
      default:
        return <Badge>Activity</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{activity.title}</h4>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                {activity.details && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.details}
                  </p>
                )}
                {activity.score !== undefined && (
                  <p className="text-sm font-medium mt-1">
                    Score: {activity.score}%
                  </p>
                )}
                <div className="mt-2">{getActivityBadge(activity.type)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
