"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  FileCode,
  Users,
  FileBarChart,
  Settings,
  LogOut,
  Plus,
  Building2,
} from "lucide-react";

interface CompanySidebarProps {
  companyName?: string;
  companyEmail?: string;
  companyLogo?: string;
}

const CompanySidebar = ({
  companyName = "Tech Solutions Inc.",
  companyEmail = "admin@techsolutions.com",
  companyLogo = "",
}: CompanySidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/company/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Tests",
      href: "/company/tests",
      icon: <FileCode className="h-5 w-5" />,
    },
    {
      name: "Candidates",
      href: "/company/candidates",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Reports",
      href: "/company/reports",
      icon: <FileBarChart className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/company/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-full w-[280px] flex-col bg-background border-r border-border">
      {/* Company Logo and Name */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
        <div className="bg-primary/10 p-2 rounded-md">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">{companyName}</h2>
          <p className="text-xs text-muted-foreground">Company Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
                  pathname === item.href && "bg-accent text-foreground",
                )}
              >
                {item.icon}
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Create New Test Button */}
        <div className="mt-6">
          <Button className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Create New Test
          </Button>
        </div>
      </div>

      {/* Company Profile */}
      <div className="mt-auto border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            {companyLogo ? (
              <AvatarImage src={companyLogo} alt={companyName} />
            ) : (
              <AvatarFallback>
                {companyName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium truncate">{companyName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {companyEmail}
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <LogOut className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default CompanySidebar;
