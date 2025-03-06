"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";

interface SkillCategory {
  name: string;
  score: number;
  color: string;
}

interface SkillRadarChartProps {
  skills?: SkillCategory[];
  size?: number;
  rotation?: number;
  title?: string;
}

const defaultSkills: SkillCategory[] = [
  { name: "Code Quality", score: 85, color: "#4338ca" },
  { name: "Problem Solving", score: 78, color: "#0ea5e9" },
  { name: "Algorithm Efficiency", score: 65, color: "#10b981" },
  { name: "Code Structure", score: 72, color: "#f59e0b" },
  { name: "Documentation", score: 60, color: "#ef4444" },
  { name: "Testing", score: 55, color: "#8b5cf6" },
];

const SkillRadarChart = ({
  skills = defaultSkills,
  size = 500,
  rotation = 0,
  title = "Developer Skill Assessment",
}: SkillRadarChartProps) => {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  const sides = skills.length;
  const angleStep = (Math.PI * 2) / sides;

  // Calculate coordinates for each skill point
  const calculatePoint = (index: number, value: number) => {
    const angle = angleStep * index + (Math.PI / 180) * rotation;
    const pointRadius = (radius * value) / 100;
    return {
      x: centerX + pointRadius * Math.cos(angle),
      y: centerY + pointRadius * Math.sin(angle),
    };
  };

  // Generate radar web (background grid)
  const generateGrid = () => {
    const gridLines = [];
    const levels = 5; // Number of concentric circles

    // Generate concentric circles
    for (let level = 1; level <= levels; level++) {
      const pathData = [];
      const levelRadius = (radius * level) / levels;

      for (let i = 0; i <= sides; i++) {
        const angle = angleStep * i + (Math.PI / 180) * rotation;
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);

        if (i === 0) {
          pathData.push(`M ${x} ${y}`);
        } else {
          pathData.push(`L ${x} ${y}`);
        }
      }

      gridLines.push(
        <path
          key={`circle-${level}`}
          d={pathData.join(" ")}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
          opacity="0.5"
        />,
      );
    }

    // Generate radial lines
    for (let i = 0; i < sides; i++) {
      const angle = angleStep * i + (Math.PI / 180) * rotation;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      gridLines.push(
        <line
          key={`line-${i}`}
          x1={centerX}
          y1={centerY}
          x2={x}
          y2={y}
          stroke="#e2e8f0"
          strokeWidth="1"
          opacity="0.5"
        />,
      );

      // Add labels
      const labelRadius = radius * 1.1;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);

      gridLines.push(
        <text
          key={`label-${i}`}
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="500"
          fill="#64748b"
        >
          {skills[i].name}
        </text>,
      );
    }

    return gridLines;
  };

  // Generate the skill data polygon
  const generateSkillPolygon = () => {
    const pathData = [];
    const pointsData = [];

    for (let i = 0; i < sides; i++) {
      const point = calculatePoint(i, skills[i].score);
      if (i === 0) {
        pathData.push(`M ${point.x} ${point.y}`);
      } else {
        pathData.push(`L ${point.x} ${point.y}`);
      }

      // Add points at each vertex
      pointsData.push(
        <circle
          key={`point-${i}`}
          cx={point.x}
          cy={point.y}
          r="6"
          fill={skills[i].color}
          stroke="white"
          strokeWidth="2"
        />,
      );
    }

    pathData.push("Z"); // Close the path

    return (
      <>
        <path
          d={pathData.join(" ")}
          fill="url(#skillGradient)"
          fillOpacity="0.3"
          stroke="#6366f1"
          strokeWidth="2"
        />
        {pointsData}
      </>
    );
  };

  // Generate 3D effect elements
  const generate3DEffect = () => {
    if (viewMode !== "3d") return null;

    const pathData = [];
    const sideElements = [];

    // Calculate points for the top face
    const topPoints = [];
    for (let i = 0; i < sides; i++) {
      const point = calculatePoint(i, skills[i].score);
      topPoints.push(point);
      if (i === 0) {
        pathData.push(`M ${point.x} ${point.y}`);
      } else {
        pathData.push(`L ${point.x} ${point.y}`);
      }
    }
    pathData.push("Z");

    // Calculate points for the bottom face (at 70% height)
    const bottomPoints = [];
    const heightOffset = 20; // 3D height effect
    for (let i = 0; i < sides; i++) {
      const point = calculatePoint(i, skills[i].score);
      bottomPoints.push({
        x: point.x,
        y: point.y + heightOffset,
      });
    }

    // Create side faces
    for (let i = 0; i < sides; i++) {
      const nextI = (i + 1) % sides;
      const sidePathData = [
        `M ${topPoints[i].x} ${topPoints[i].y}`,
        `L ${topPoints[nextI].x} ${topPoints[nextI].y}`,
        `L ${bottomPoints[nextI].x} ${bottomPoints[nextI].y}`,
        `L ${bottomPoints[i].x} ${bottomPoints[i].y}`,
        "Z",
      ];

      sideElements.push(
        <path
          key={`side-${i}`}
          d={sidePathData.join(" ")}
          fill={skills[i].color}
          fillOpacity="0.2"
          stroke={skills[i].color}
          strokeWidth="1"
        />,
      );
    }

    return sideElements;
  };

  // Generate skill score indicators
  const generateScoreIndicators = () => {
    return skills.map((skill, index) => {
      const point = calculatePoint(index, skill.score);
      return (
        <g key={`score-${index}`}>
          <circle cx={point.x} cy={point.y} r="16" fill="white" opacity="0.8" />
          <text
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="bold"
            fill="#334155"
          >
            {skill.score}
          </text>
        </g>
      );
    });
  };

  return (
    <Card className="w-full max-w-[600px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
        <div className="flex justify-center mt-2">
          <Tabs
            defaultValue="3d"
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "2d" | "3d")}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="2d">2D View</TabsTrigger>
              <TabsTrigger value="3d">3D View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center p-4">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient
                id="skillGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {generateGrid()}
            {viewMode === "3d" && generate3DEffect()}
            {generateSkillPolygon()}
            {generateScoreIndicators()}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillRadarChart;
