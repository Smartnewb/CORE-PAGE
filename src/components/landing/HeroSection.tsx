import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, FileCode, BarChart3, Brain } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  companyCtaText?: string;
  developerCtaText?: string;
  heroImage?: string;
  onCompanyClick?: () => void;
  onDeveloperClick?: () => void;
}

const HeroSection = ({
  title = "AI-Powered Developer Evaluation Platform",
  subtitle = "Streamline your technical hiring process with our advanced AI evaluation system. Assess coding skills, analyze performance, and make data-driven hiring decisions.",
  companyCtaText = "For Companies",
  developerCtaText = "For Developers",
  heroImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
  onCompanyClick = () => (window.location.href = "/company"),
  onDeveloperClick = () => (window.location.href = "/ide"),
}: HeroSectionProps) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">
                Next-Gen Evaluation System
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                size="lg"
                className="gap-2 group"
                onClick={onCompanyClick}
              >
                {companyCtaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={onDeveloperClick}
              >
                {developerCtaText}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <Code className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">VS Code-like IDE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <Brain className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Skill Visualization</span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden rounded-lg">
            <Image
              src={heroImage}
              alt="AI Developer Evaluation Platform"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                <div className="text-sm font-medium">
                  Live Coding Assessment
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Our platform provides real-time evaluation of coding skills with
                detailed feedback and analysis.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
