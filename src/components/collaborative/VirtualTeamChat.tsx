import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Send,
  ThumbsUp,
  AlertCircle,
  GitPullRequest,
} from "lucide-react";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: Date;
  type: "message" | "review" | "suggestion" | "pr";
}

interface VirtualTeamChatProps {
  teamMembers?: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  }>;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  onSubmitPR?: () => void;
}

const VirtualTeamChat = ({
  teamMembers = [
    {
      id: "1",
      name: "Min-ji Kim",
      role: "Senior Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MinjiKim",
    },
    {
      id: "2",
      name: "Jae-woo Park",
      role: "Tech Lead",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JaewooPark",
    },
    {
      id: "3",
      name: "Soo-yeon Lee",
      role: "DevOps Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SooyeonLee",
    },
  ],
  initialMessages = [
    {
      id: "1",
      sender: {
        name: "Min-ji Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MinjiKim",
        role: "Senior Developer",
      },
      content:
        "Welcome to the team! We're working on implementing a binary search algorithm. Please check the requirements and let me know if you have any questions.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "message",
    },
    {
      id: "2",
      sender: {
        name: "Jae-woo Park",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JaewooPark",
        role: "Tech Lead",
      },
      content:
        "Remember that we need O(log n) time complexity for this implementation. Make sure to handle edge cases like empty arrays and targets not in the array.",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      type: "message",
    },
    {
      id: "3",
      sender: {
        name: "Soo-yeon Lee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SooyeonLee",
        role: "DevOps Engineer",
      },
      content:
        "Our CI/CD pipeline will automatically run tests on your code when you submit a PR. Make sure all tests pass before requesting a review.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: "message",
    },
  ],
  onSendMessage = () => {},
  onSubmitPR = () => {},
}: VirtualTeamChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        name: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        role: "Developer",
      },
      content: newMessage,
      timestamp: new Date(),
      type: "message",
    };

    setMessages([...messages, message]);
    onSendMessage(newMessage);
    setNewMessage("");

    // Simulate team member response after a short delay
    setTimeout(() => {
      const responses = [
        "That looks good! Have you considered edge cases?",
        "I think we should optimize this part of the algorithm.",
        "Make sure to add comments to explain your approach.",
        "The time complexity looks optimal. Good job!",
        "Could you explain your reasoning behind this implementation?",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      const randomTeamMember =
        teamMembers[Math.floor(Math.random() * teamMembers.length)];

      const responseMessage: Message = {
        id: Date.now().toString(),
        sender: {
          name: randomTeamMember.name,
          avatar: randomTeamMember.avatar,
          role: randomTeamMember.role,
        },
        content: randomResponse,
        timestamp: new Date(),
        type: "message",
      };

      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "review":
        return <ThumbsUp className="h-4 w-4 text-blue-500" />;
      case "suggestion":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "pr":
        return <GitPullRequest className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="text-xs">
              <MessageSquare className="h-4 w-4 mr-2" />
              Team Chat
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Code Reviews
            </TabsTrigger>
            <TabsTrigger value="pr" className="text-xs">
              <GitPullRequest className="h-4 w-4 mr-2" />
              Pull Requests
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <TabsContent
        value="chat"
        className="flex-1 flex flex-col p-0 m-0 overflow-hidden"
      >
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender.name === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex ${message.sender.name === "You" ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
              >
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage
                    src={message.sender.avatar}
                    alt={message.sender.name}
                  />
                  <AvatarFallback>
                    {message.sender.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${message.sender.name === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-medium text-xs">
                      {message.sender.name}
                    </span>
                    <span className="text-xs opacity-70">
                      ({message.sender.role})
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </span>
                    {getMessageIcon(message.type)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="reviews"
        className="flex-1 flex flex-col p-4 m-0 overflow-auto"
      >
        <div className="text-center py-8">
          <GitPullRequest className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Code Reviews Yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Submit your code for review to get feedback from the team.
          </p>
          <Button variant="outline" onClick={() => setActiveTab("pr")}>
            Create Pull Request
          </Button>
        </div>
      </TabsContent>

      <TabsContent
        value="pr"
        className="flex-1 flex flex-col p-4 m-0 overflow-auto"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Create Pull Request</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Submit your code for review by the team. Make sure your
              implementation meets all requirements.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="pr-title"
                className="text-sm font-medium block mb-1"
              >
                Title
              </label>
              <Input id="pr-title" placeholder="Binary Search Implementation" />
            </div>

            <div>
              <label
                htmlFor="pr-description"
                className="text-sm font-medium block mb-1"
              >
                Description
              </label>
              <textarea
                id="pr-description"
                className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background"
                placeholder="Describe your implementation and any decisions you made..."
              ></textarea>
            </div>

            <Button onClick={onSubmitPR} className="w-full">
              <GitPullRequest className="h-4 w-4 mr-2" />
              Submit Pull Request
            </Button>
          </div>
        </div>
      </TabsContent>
    </Card>
  );
};

export default VirtualTeamChat;
