"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const TestScoreChart = () => {
  // Mock data for score distribution
  const data = [
    { range: "0-20", count: 2, fill: "hsl(var(--chart-1))" },
    { range: "21-40", count: 5, fill: "hsl(var(--chart-2))" },
    { range: "41-60", count: 12, fill: "hsl(var(--chart-3))" },
    { range: "61-80", count: 28, fill: "hsl(var(--chart-4))" },
    { range: "81-100", count: 21, fill: "hsl(var(--chart-5))" },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          cursor={{ fill: "hsl(var(--muted))" }}
        />
        <Legend />
        <Bar
          dataKey="count"
          name="Number of Candidates"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
