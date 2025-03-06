import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileCode, BarChart3, Brain, Users, ArrowRight } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Features
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides comprehensive tools for evaluating developer
              skills with AI-powered analysis
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardHeader className="pb-2">
              <FileCode className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>VS Code-like IDE</CardTitle>
              <CardDescription>
                Familiar coding environment with syntax highlighting and
                debugging tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our web-based IDE provides a seamless coding experience with
                real-time execution and testing capabilities.
              </p>
              <Button
                variant="link"
                className="p-0 mt-4 h-auto"
                onClick={() => (window.location.href = "/developer")}
              >
                Try the IDE <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Brain className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>AI Code Analysis</CardTitle>
              <CardDescription>
                Advanced algorithms to evaluate code quality and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes code structure, efficiency, and problem-solving
                approaches to provide comprehensive feedback.
              </p>
              <Button
                variant="link"
                className="p-0 mt-4 h-auto"
                onClick={() => (window.location.href = "/company")}
              >
                Learn more <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BarChart3 className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Skill Visualization</CardTitle>
              <CardDescription>
                Interactive charts and reports to visualize candidate skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate detailed reports with radar charts and performance
                metrics to make data-driven hiring decisions.
              </p>
              <Button
                variant="link"
                className="p-0 mt-4 h-auto"
                onClick={() => (window.location.href = "/company")}
              >
                View sample reports <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            className="gap-2"
            onClick={() => (window.location.href = "/company")}
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
