"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  AtSign,
  Building2,
  Eye,
  EyeOff,
  Lock,
  User,
  Loader2,
} from "lucide-react";
import { loginUser, registerUser, UserRole } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthProvider";

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: "company" | "developer";
}

const LoginModal = ({
  isOpen = true,
  onClose = () => {},
  defaultTab = "company",
}: LoginModalProps) => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"company" | "developer">(
    defaultTab,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyConfirmPassword, setCompanyConfirmPassword] = useState("");

  const [developerEmail, setDeveloperEmail] = useState("");
  const [developerPassword, setDeveloperPassword] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [developerConfirmPassword, setDeveloperConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleSignUpMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  const handleCompanyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await loginUser(companyEmail, companyPassword, "company");
      setUser(user);
      onClose();
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeveloperLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await loginUser(
        developerEmail,
        developerPassword,
        "developer",
      );
      setUser(user);
      onClose();
      router.push("/developer-dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanySignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (companyPassword !== companyConfirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const user = await registerUser(
        companyName,
        companyEmail,
        companyPassword,
        "company",
      );
      setUser(user);
      onClose();
      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeveloperSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (developerPassword !== developerConfirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const user = await registerUser(
        developerName,
        developerEmail,
        developerPassword,
        "developer",
      );
      setUser(user);
      onClose();
      router.push("/developer-dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white">
        <Tabs
          defaultValue={defaultTab}
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "company" | "developer")
          }
          className="w-full"
        >
          <div className="flex border-b">
            <TabsList className="h-14 w-full rounded-none bg-transparent border-b grid grid-cols-2">
              <TabsTrigger
                value="company"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none h-14"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Company
              </TabsTrigger>
              <TabsTrigger
                value="developer"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none h-14"
              >
                <User className="h-4 w-4 mr-2" />
                Developer
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="company" className="p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {isSignUp ? "Create Company Account" : "Company Login"}
              </DialogTitle>
            </DialogHeader>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}

            <form
              className="space-y-4"
              onSubmit={isSignUp ? handleCompanySignup : handleCompanyLogin}
            >
              {isSignUp && (
                <div className="space-y-2">
                  <label htmlFor="company-name" className="text-sm font-medium">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company-name"
                      placeholder="Your company name"
                      className="pl-10"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="company-email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company-email"
                    type="email"
                    placeholder="company@example.com"
                    className="pl-10"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="company-password"
                  className="text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={companyPassword}
                    onChange={(e) => setCompanyPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <label
                    htmlFor="company-confirm-password"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company-confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={companyConfirmPassword}
                      onChange={(e) =>
                        setCompanyConfirmPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              )}

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignUp ? "Creating Account..." : "Logging in..."}
                  </>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleSignUpMode}
                    className="text-primary hover:underline font-medium"
                  >
                    Login
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleSignUpMode}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="developer" className="p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {isSignUp ? "Create Developer Account" : "Developer Login"}
              </DialogTitle>
            </DialogHeader>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}

            <form
              className="space-y-4"
              onSubmit={isSignUp ? handleDeveloperSignup : handleDeveloperLogin}
            >
              {isSignUp && (
                <div className="space-y-2">
                  <label
                    htmlFor="developer-name"
                    className="text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="developer-name"
                      placeholder="Your full name"
                      className="pl-10"
                      value={developerName}
                      onChange={(e) => setDeveloperName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="developer-email"
                  className="text-sm font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="developer-email"
                    type="email"
                    placeholder="developer@example.com"
                    className="pl-10"
                    value={developerEmail}
                    onChange={(e) => setDeveloperEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="developer-password"
                  className="text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="developer-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={developerPassword}
                    onChange={(e) => setDeveloperPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <label
                    htmlFor="developer-confirm-password"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="developer-confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={developerConfirmPassword}
                      onChange={(e) =>
                        setDeveloperConfirmPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              )}

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignUp ? "Creating Account..." : "Logging in..."}
                  </>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleSignUpMode}
                    className="text-primary hover:underline font-medium"
                  >
                    Login
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleSignUpMode}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="bg-muted p-4 flex justify-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
