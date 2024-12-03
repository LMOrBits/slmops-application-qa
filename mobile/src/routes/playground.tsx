import { createFileRoute, redirect } from "@tanstack/react-router";

import Dashboard from "@/app/chats/dashboard/page";

export const Route = createFileRoute("/playground")({
  loader: () => ({
    crumb: "Playground",
  }),
  component: DashboardComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function DashboardComponent() {
  return <Dashboard />;
}
