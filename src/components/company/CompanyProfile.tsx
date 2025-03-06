import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Users,
  Mail,
  Globe,
  MapPin,
  Phone,
  Github,
  Trello,
  Plus,
  X,
  Save,
  Upload,
} from "lucide-react";

interface CompanyProfileProps {
  companyData: {
    name: string;
    logo?: string;
    industry: string;
    employeeCount: number;
    email: string;
    techStack: string[];
    githubConnected: boolean;
    jiraConnected: boolean;
    website?: string;
    location?: string;
    phone?: string;
    description?: string;
  };
}

const CompanyProfile = ({ companyData }: CompanyProfileProps) => {
  const [editMode, setEditMode] = useState(false);
  const [company, setCompany] = useState(companyData);
  const [newTech, setNewTech] = useState("");

  const handleAddTech = () => {
    if (newTech.trim() && !company.techStack.includes(newTech.trim())) {
      setCompany({
        ...company,
        techStack: [...company.techStack, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setCompany({
      ...company,
      techStack: company.techStack.filter((t) => t !== tech),
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    console.log("Saving company profile:", company);
    setEditMode(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Company Profile</h2>
        {!editMode ? (
          <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Company Basic Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Your company's basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                {company.logo ? (
                  <AvatarImage src={company.logo} alt={company.name} />
                ) : (
                  <AvatarFallback className="text-2xl">
                    {company.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              {editMode && (
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="h-4 w-4 mr-2" /> Upload Logo
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>Company Name</span>
                </div>
                {editMode ? (
                  <Input
                    name="name"
                    value={company.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="font-medium">{company.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Email</span>
                </div>
                {editMode ? (
                  <Input
                    name="email"
                    value={company.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{company.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Industry</span>
                </div>
                {editMode ? (
                  <Input
                    name="industry"
                    value={company.industry}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{company.industry}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Employee Count</span>
                </div>
                {editMode ? (
                  <Input
                    name="employeeCount"
                    type="number"
                    value={company.employeeCount}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{company.employeeCount}</p>
                )}
              </div>

              {editMode && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Globe className="h-4 w-4 mr-2" />
                      <span>Website</span>
                    </div>
                    <Input
                      name="website"
                      value={company.website || ""}
                      onChange={handleInputChange}
                      placeholder="https://"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Location</span>
                    </div>
                    <Input
                      name="location"
                      value={company.location || ""}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Phone</span>
                    </div>
                    <Input
                      name="phone"
                      value={company.phone || ""}
                      onChange={handleInputChange}
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </>
              )}

              {!editMode && (
                <>
                  {company.website && (
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Globe className="h-4 w-4 mr-2" />
                        <span>Website</span>
                      </div>
                      <p>{company.website}</p>
                    </div>
                  )}

                  {company.location && (
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>Location</span>
                      </div>
                      <p>{company.location}</p>
                    </div>
                  )}

                  {company.phone && (
                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>Phone</span>
                      </div>
                      <p>{company.phone}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Company Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            <CardDescription>
              Additional information about your company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Company Description</Label>
                {editMode ? (
                  <Textarea
                    id="description"
                    name="description"
                    value={company.description || ""}
                    onChange={handleInputChange}
                    placeholder="Describe your company..."
                    className="mt-2"
                    rows={5}
                  />
                ) : (
                  <p className="mt-2 text-muted-foreground">
                    {company.description || "No company description provided."}
                  </p>
                )}
              </div>

              <Separator />

              <div>
                <Label>Tech Stack</Label>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {company.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                        {editMode && (
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() => handleRemoveTech(tech)}
                          />
                        )}
                      </Badge>
                    ))}
                  </div>
                  {editMode && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add technology..."
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTech();
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleAddTech}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <Label>Integrations</Label>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      <span>GitHub</span>
                    </div>
                    <Button
                      variant={company.githubConnected ? "outline" : "default"}
                      size="sm"
                    >
                      {company.githubConnected ? "Connected" : "Connect"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trello className="h-5 w-5" />
                      <span>Jira</span>
                    </div>
                    <Button
                      variant={company.jiraConnected ? "outline" : "default"}
                      size="sm"
                    >
                      {company.jiraConnected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyProfile;
