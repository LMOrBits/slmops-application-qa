import "./index.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth";

import { RouterProvider } from "@tanstack/react-router";

import { router } from "./router";
import { useAuth } from "./providers/auth";
import { NextUIProvider } from "@nextui-org/system";
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NextUIProvider>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
};

export default App;
