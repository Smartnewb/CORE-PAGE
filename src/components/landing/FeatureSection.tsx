import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Code,
  Cpu,
  FileCode,
  LayoutDashboard,
  LineChart,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  features?: {
    title: string;
    description: string;
    icon: React.ReactNode;
    color?: string;
  }[];
}

const FeatureSection = ({
  features = [
    {
      title: "Company Dashboard",
      description:
        "Comprehensive analytics and test management for hiring teams",
      icon: <LayoutDashboard className="h-10 w-10" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "VS Code Style IDE",
      description: "Familiar coding environment with real-time execution",
      icon: <Code className="h-10 w-10" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "AI Code Evaluation",
      description:
        "Automated assessment of code quality, performance, and problem-solving",
      icon: <Cpu className="h-10 w-10" />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Visual Analytics",
      description: "3D radar charts and comprehensive skill visualization",
      icon: <LineChart className="h-10 w-10" />,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Customizable Tests",
      description: "Create tailored coding challenges for any skill level",
      icon: <FileCode className="h-10 w-10" />,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      title: "AI-Powered Feedback",
      description:
        "Detailed insights and improvement suggestions for candidates",
      icon: <Lightbulb className="h-10 w-10" />,
      color: "bg-rose-100 text-rose-700",
    },
  ],
}: FeatureSectionProps) => {
  return (
    <section className="w-full py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Everything you need to evaluate developers
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our platform combines powerful tools for both companies and
            developers to streamline the technical assessment process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <div
                  className={cn(
                    "w-16 h-16 rounded-lg flex items-center justify-center mb-4",
                    feature.color,
                  )}
                >
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mt-2">
                  Learn more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="mr-4">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
