"use client";

import { useRouter } from "next/navigation";

// Mock user types
export type UserRole = "developer" | "company";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Mock authentication functions
export const loginUser = async (
  email: string,
  password: string,
  role: UserRole,
): Promise<User> => {
  // This would normally be an API call to your authentication endpoint
  // For demo purposes, we're just returning a mock user
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful login
      if (email && password) {
        const user: User = {
          id: "user-123",
          name: role === "developer" ? "Kim Ji-woo" : "Tech Solutions Inc.",
          email: email,
          role: role,
          avatar: "",
        };
        // Store user in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(user));
        resolve(user);
      } else {
        throw new Error("Invalid credentials");
      }
    }, 1000); // Simulate network delay
  });
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole,
): Promise<User> => {
  // This would normally be an API call to your registration endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful registration
      if (name && email && password) {
        const user: User = {
          id: "user-" + Math.floor(Math.random() * 1000),
          name: name,
          email: email,
          role: role,
          avatar: "",
        };
        // Store user in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(user));
        resolve(user);
      } else {
        throw new Error("Invalid registration data");
      }
    }, 1000); // Simulate network delay
  });
};

export const logoutUser = (): void => {
  localStorage.removeItem("user");
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const userJson = localStorage.getItem("user");
  if (!userJson) return null;

  try {
    return JSON.parse(userJson) as User;
  } catch (e) {
    return null;
  }
};

// Custom hook for authentication redirects
export const useAuthRedirect = () => {
  const router = useRouter();

  const redirectBasedOnRole = (user: User | null) => {
    if (!user) return;

    if (user.role === "developer") {
      router.push("/developer-dashboard");
    } else if (user.role === "company") {
      router.push("/dashboard");
    }
  };

  return { redirectBasedOnRole };
};
