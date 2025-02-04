import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { CHAT_API_URL } from "@/config/chatBackend";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

interface User {
  id: string;
  // Add other user properties as needed
}

interface Response {
  message: string;
  cookie: string;
  user_id: string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    document.cookie.includes("session_id") ? { id: "1" } : null
  );
  const [isLoading, setIsLoading] = useState(true);

  const login = async (password: string) => {
    setIsLoading(true);
    try {
      const {
        data: { cookie },
      } = await axios.get<Response>(`${CHAT_API_URL}/cookie`, {
        withCredentials: true,
      });

      if (cookie) {
        setUser({ id: "1" });
      } else {
        throw new Error("Login failed - no user ID returned");
      }
      console.log(password);
      // });

      // if (!response.ok) {
      //   throw new Error('Login failed');
      // }
      const userData = { id: "1" }; // Replace with actual user data
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Add your logout logic here
      // Example: Clear tokens, API calls, etc.
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default { AuthProvider, useAuth };
