import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { MessageSquare, ThumbsUp, ThumbsDown, Send, Save } from "lucide-react";

interface FeedbackSectionProps {
  candidateName?: string;
  candidateId?: string;
  feedbackItems?: FeedbackItem[];
  companyReviewers?: Reviewer[];
}

interface FeedbackItem {
  id: string;
  content: string;
  type: "positive" | "negative" | "neutral";
  author: Reviewer;
  createdAt: string;
}

interface Reviewer {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

const FeedbackSection = ({
  candidateName = "John Doe",
  candidateId = "CAND-12345",
  feedbackItems = [
    {
      id: "1",
      content:
        "Excellent problem-solving approach. The candidate demonstrated strong analytical skills in breaking down the algorithm problem.",
      type: "positive",
      author: {
        id: "rev1",
        name: "Sarah Kim",
        role: "Senior Developer",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      createdAt: "2023-10-15T14:30:00Z",
    },
    {
      id: "2",
      content:
        "Code organization could be improved. The candidate's solution works but lacks proper modularization and reusability.",
      type: "negative",
      author: {
        id: "rev2",
        name: "Michael Chen",
        role: "Tech Lead",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      createdAt: "2023-10-16T09:45:00Z",
    },
    {
      id: "3",
      content:
        "Good understanding of the requirements. Implementation is clean but could be optimized for better performance.",
      type: "neutral",
      author: {
        id: "rev3",
        name: "Alex Johnson",
        role: "Engineering Manager",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      createdAt: "2023-10-17T11:20:00Z",
    },
  ],
  companyReviewers = [
    {
      id: "rev1",
      name: "Sarah Kim",
      role: "Senior Developer",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "rev2",
      name: "Michael Chen",
      role: "Tech Lead",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      id: "rev3",
      name: "Alex Johnson",
      role: "Engineering Manager",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      id: "rev4",
      name: "Jessica Lee",
      role: "CTO",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    },
  ],
}: FeedbackSectionProps) => {
  return (
    <section className="w-full bg-background p-6 rounded-lg border border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Feedback & Notes</h2>
        <p className="text-muted-foreground">
          Add your feedback and notes about candidate {candidateName} (
          {candidateId})
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="negative">Needs Improvement</TabsTrigger>
          <TabsTrigger value="add">Add Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {feedbackItems.map((item) => (
            <FeedbackCard key={item.id} item={item} />
          ))}
        </TabsContent>

        <TabsContent value="positive" className="space-y-4">
          {feedbackItems
            .filter((item) => item.type === "positive")
            .map((item) => (
              <FeedbackCard key={item.id} item={item} />
            ))}
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          {feedbackItems
            .filter((item) => item.type === "negative")
            .map((item) => (
              <FeedbackCard key={item.id} item={item} />
            ))}
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Feedback</CardTitle>
              <CardDescription>
                Share your observations about the candidate's performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Feedback Type</p>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span>Positive</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span>Needs Improvement</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span>Neutral</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Textarea
                  placeholder="Enter your feedback here..."
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=current-user"
                    alt="Your avatar"
                  />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Posting as:</p>
                  <p className="text-xs text-muted-foreground">
                    Current User (You)
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

interface FeedbackCardProps {
  item: FeedbackItem;
}

const FeedbackCard = ({ item }: FeedbackCardProps) => {
  const typeStyles = {
    positive: "border-l-4 border-l-green-500",
    negative: "border-l-4 border-l-red-500",
    neutral: "border-l-4 border-l-blue-500",
  };

  const typeIcons = {
    positive: <ThumbsUp className="h-4 w-4 text-green-500" />,
    negative: <ThumbsDown className="h-4 w-4 text-red-500" />,
    neutral: <MessageSquare className="h-4 w-4 text-blue-500" />,
  };

  return (
    <Card className={`${typeStyles[item.type]}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={item.author.avatarUrl} alt={item.author.name} />
              <AvatarFallback>
                {item.author.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{item.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.author.role}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {typeIcons[item.type]}
            <span className="text-sm font-medium">
              {item.type === "positive"
                ? "Positive"
                : item.type === "negative"
                  ? "Needs Improvement"
                  : "Neutral"}
            </span>
          </div>
        </div>
        <p className="text-sm">{item.content}</p>
        <div className="mt-4 text-xs text-muted-foreground">
          {new Date(item.createdAt).toLocaleDateString()} at{" "}
          {new Date(item.createdAt).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
