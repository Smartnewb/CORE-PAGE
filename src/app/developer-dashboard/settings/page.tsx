"use client";

import React, { useState } from "react";
import DeveloperSidebar from "@/components/developer/DeveloperSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Lock, Bell, Globe, Shield, Save } from "lucide-react";

export default function SettingsPage() {
  const [profileForm, setProfileForm] = useState({
    name: "Kim Ji-woo",
    email: "jiwoo.kim@example.com",
    bio: "Full-stack developer with 2 years of experience. Passionate about React, Node.js, and building user-friendly applications.",
    location: "Seoul, South Korea",
    github: "github.com/jiwokim",
    linkedin: "linkedin.com/in/jiwokim",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    testReminders: true,
    resultNotifications: true,
    marketingEmails: false,
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    console.log("Saving profile:", profileForm);
    // Show success message
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the backend
    console.log("Saving notification settings:", notificationSettings);
    // Show success message
  };

  return (
    <>
      <DeveloperSidebar
        userName="Kim Ji-woo"
        userEmail="jiwoo.kim@example.com"
      />
      <div className="flex-1 overflow-auto bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <form onSubmit={handleSaveProfile}>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile information and how it appears to
                      companies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kim"
                            alt="Kim Ji-woo"
                          />
                          <AvatarFallback>KJ</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          Change Avatar
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="name"
                                name="name"
                                placeholder="Your full name"
                                className="pl-10"
                                value={profileForm.name}
                                onChange={handleProfileChange}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Your email address"
                                className="pl-10"
                                value={profileForm.email}
                                onChange={handleProfileChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Tell companies a bit about yourself"
                            rows={4}
                            value={profileForm.bio}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            name="location"
                            placeholder="Your location"
                            className="pl-10"
                            value={profileForm.location}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">
                        Social Profiles
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            name="github"
                            placeholder="Your GitHub profile"
                            value={profileForm.github}
                            onChange={handleProfileChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            placeholder="Your LinkedIn profile"
                            value={profileForm.linkedin}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit" className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <form onSubmit={handleSaveNotifications}>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "emailNotifications",
                              checked,
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="test-reminders">Test Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive reminders about upcoming tests
                          </p>
                        </div>
                        <Switch
                          id="test-reminders"
                          checked={notificationSettings.testReminders}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("testReminders", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="result-notifications">
                            Result Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications when test results are
                            available
                          </p>
                        </div>
                        <Switch
                          id="result-notifications"
                          checked={notificationSettings.resultNotifications}
                          onCheckedChange={(checked) =>
                            handleNotificationChange(
                              "resultNotifications",
                              checked,
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-emails">
                            Marketing Emails
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive marketing emails and newsletters
                          </p>
                        </div>
                        <Switch
                          id="marketing-emails"
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("marketingEmails", checked)
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit" className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Preferences
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="current-password"
                            type="password"
                            placeholder="Enter your current password"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="new-password"
                            type="password"
                            placeholder="Enter your new password"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your new password"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    <Button className="mt-2">Update Password</Button>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-4">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          Two-factor authentication is disabled
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium mb-4">Sessions</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Seoul, South Korea • Chrome on Windows
                          </p>
                        </div>
                        <Badge>Active Now</Badge>
                      </div>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Sign Out of All Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
