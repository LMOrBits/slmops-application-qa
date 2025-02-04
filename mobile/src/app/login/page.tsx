import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/providers/auth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Navigate to a specific route that exists in your router configuration
      navigate({ to: "/playground/chat" });
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm login={login} />
    </div>
  );
}

export default LoginPage;
