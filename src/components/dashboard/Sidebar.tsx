"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  FileCode,
  Users,
  Settings,
  LogOut,
  PlusCircle,
  BarChart,
} from "lucide-react";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  companyName?: string;
}

const Sidebar = ({
  userName = "User Name",
  userEmail = "user@example.com",
  companyName = "Company Name",
}: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/company",
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
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/company/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-[280px] h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=company" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">{companyName}</h3>
            <p className="text-xs text-muted-foreground">Company Account</p>
          </div>
        </div>

        <Button className="w-full mb-6" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Test
        </Button>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                isActive(item.href)
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-border">
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {userEmail}
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
