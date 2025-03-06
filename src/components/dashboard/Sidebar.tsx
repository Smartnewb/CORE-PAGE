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
} from "lucide-react";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  companyName?: string;
}

const Sidebar = ({
  userName = "Kim Min-ji",
  userEmail = "minjikim@example.com",
  userAvatar = "",
  companyName = "Tech Solutions Inc.",
}: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Tests",
      href: "/dashboard/tests",
      icon: <FileCode className="h-5 w-5" />,
    },
    {
      name: "Candidates",
      href: "/dashboard/candidates",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: <FileBarChart className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-full w-[280px] flex-col bg-background border-r border-border">
      {/* Company Logo and Name */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
        <div className="bg-primary/10 p-2 rounded-md">
          <FileCode className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">{companyName}</h2>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
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

export default Sidebar;
