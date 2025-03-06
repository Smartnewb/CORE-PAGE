"use client";

import React from "react";
import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Award,
  Zap,
  Target,
  Code,
  CheckCircle2,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earnedAt?: string;
  isEarned: boolean;
  progress?: number;
  category: "skill" | "completion" | "performance";
  level?: "bronze" | "silver" | "gold";
}

export default function AchievementsPage() {
  // Mock data for achievements
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Perfect Score",
      description: "Achieve a 100% score on any test",
      icon: <Trophy className="h-8 w-8" />,
      earnedAt: "2023-10-15",
      isEarned: true,
      category: "performance",
      level: "gold",
    },
    {
      id: "2",
      title: "JavaScript Master",
      description:
        "Complete 5 JavaScript tests with an average score of 90% or higher",
      icon: <Code className="h-8 w-8" />,
      earnedAt: "2023-11-02",
      isEarned: true,
      category: "skill",
      level: "silver",
    },
    {
      id: "3",
      title: "Fast Learner",
      description: "Complete 3 tests in your first week",
      icon: <Zap className="h-8 w-8" />,
      earnedAt: "2023-10-10",
      isEarned: true,
      category: "completion",
      level: "bronze",
    },
    {
      id: "4",
      title: "Algorithm Expert",
      description: "Solve 10 algorithm challenges with optimal time complexity",
      icon: <Target className="h-8 w-8" />,
      isEarned: false,
      progress: 70,
      category: "skill",
    },
    {
      id: "5",
      title: "Code Quality Champion",
      description:
        "Maintain a code quality score of 95% or higher across 5 tests",
      icon: <Award className="h-8 w-8" />,
      isEarned: false,
      progress: 60,
      category: "performance",
    },
    {
      id: "6",
      title: "Consistent Performer",
      description: "Complete 10 tests without failing any",
      icon: <CheckCircle2 className="h-8 w-8" />,
      isEarned: false,
      progress: 30,
      category: "completion",
    },
  ];

  const earnedAchievements = achievements.filter((a) => a.isEarned);
  const inProgressAchievements = achievements.filter((a) => !a.isEarned);

  const getLevelColor = (level?: string) => {
    switch (level) {
      case "bronze":
        return "text-amber-600";
      case "silver":
        return "text-slate-400";
      case "gold":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "skill":
        return <Badge className="bg-blue-100 text-blue-800">Skill</Badge>;
      case "completion":
        return (
          <Badge className="bg-green-100 text-green-800">Completion</Badge>
        );
      case "performance":
        return (
          <Badge className="bg-purple-100 text-purple-800">Performance</Badge>
        );
      default:
        return <Badge>Other</Badge>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <DeveloperSidebar
        userName="Kim Ji-woo"
        userEmail="jiwoo.kim@example.com"
      />
      <div className="flex-1 overflow-auto bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Achievements</h1>
            <p className="text-muted-foreground mt-1">
              Track your progress and earn badges as you complete tests and
              improve your skills
            </p>
          </div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Earned Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  <span className="text-2xl font-bold">
                    {earnedAchievements.length}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    / {achievements.length}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Skill Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-2xl font-bold">Intermediate</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Next Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-500" />
                  <span className="text-lg font-medium truncate">
                    {inProgressAchievements[0]?.title}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Earned Achievements */}
          <h2 className="text-xl font-semibold mb-4">Earned Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {earnedAchievements.length > 0 ? (
              earnedAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="hover:shadow-md transition-shadow duration-300"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-full bg-muted ${getLevelColor(achievement.level)}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>{getCategoryBadge(achievement.category)}</div>
                          <div className="text-xs text-muted-foreground">
                            Earned on {formatDate(achievement.earnedAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  No achievements earned yet. Complete tests to earn your first
                  achievement!
                </p>
              </div>
            )}
          </div>

          {/* In Progress Achievements */}
          <h2 className="text-xl font-semibold mb-4">In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className="hover:shadow-md transition-shadow duration-300 opacity-80"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-muted text-muted-foreground">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      {achievement.progress !== undefined && (
                        <div className="mb-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">
                              Progress
                            </span>
                            <span className="text-xs font-medium">
                              {achievement.progress}%
                            </span>
                          </div>
                          <Progress
                            value={achievement.progress}
                            className="h-1"
                          />
                        </div>
                      )}
                      <div>{getCategoryBadge(achievement.category)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
