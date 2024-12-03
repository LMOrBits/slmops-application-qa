import { createFileRoute, useRouter } from "@tanstack/react-router";
import LoginPage from "@/app/login/page";
import { useAuth } from "@/providers/auth";

export const Route = createFileRoute("/login")({
  component: () => <LoginPageWrapper />,
  validateSearch: (search) => {
    return {
      redirect: search.redirect,
    };
  },
});

function LoginPageWrapper() {
  const { user } = useAuth();
  const { redirect } = Route.useSearch();
  const router = useRouter();
  if (user) {
    router.history.push(redirect as string);
  }
  return <LoginPage />;
}
