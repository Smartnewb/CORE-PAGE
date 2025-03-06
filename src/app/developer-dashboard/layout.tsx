import React from "react";

export default function DeveloperDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {children}
    </div>
  );
}
