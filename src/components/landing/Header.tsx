import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Code, User, Menu, ChevronDown } from "lucide-react";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  userType?: "company" | "developer";
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Header = ({
  isLoggedIn = false,
  userName = "",
  userType = "developer",
  onLoginClick = () => console.log("Login clicked"),
  onSignupClick = () => console.log("Signup clicked"),
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-md">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">DevEval AI</span>
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto">
                <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/solutions/companies" className="w-full">
                  For Companies
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/solutions/developers" className="w-full">
                  For Developers
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{userName}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={`/${userType}/dashboard`} className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/${userType}/profile`} className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/logout" className="w-full">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={onLoginClick}>
                Login
              </Button>
              <Button onClick={onSignupClick}>Sign Up</Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Menu</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
