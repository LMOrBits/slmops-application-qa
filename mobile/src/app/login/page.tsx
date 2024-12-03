import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/providers/auth";

export function LoginPage() {
  const { login, user } = useAuth();
  if (user) {
    return null;
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm login={login} />
    </div>
  );
}

export default LoginPage;
