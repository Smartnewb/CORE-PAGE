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
  BarChart2,
  BookOpen,
  Settings,
  LogOut,
  Trophy,
} from "lucide-react";

interface DeveloperSidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const DeveloperSidebar = ({
  userName = "Kim Ji-woo",
  userEmail = "jiwoo.kim@example.com",
  userAvatar = "",
}: DeveloperSidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/developer-dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "My Tests",
      href: "/developer-dashboard/tests",
      icon: <FileCode className="h-5 w-5" />,
    },
    {
      name: "Results",
      href: "/developer-dashboard/results",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: "Learning Path",
      href: "/developer-dashboard/learning",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Achievements",
      href: "/developer-dashboard/achievements",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/developer-dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-full w-[280px] flex-col bg-background border-r border-border">
      {/* Logo and Name */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
        <div className="bg-primary/10 p-2 rounded-md">
          <FileCode className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">DevEval AI</h2>
          <p className="text-xs text-muted-foreground">Developer Portal</p>
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
      </div>

      {/* User Profile */}
      <div className="mt-auto border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            {userAvatar ? (
              <AvatarImage src={userAvatar} alt={userName} />
            ) : (
              <AvatarFallback>
                {userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {userEmail}
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

export default DeveloperSidebar;
