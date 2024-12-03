import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, Link, useNavigate } from "@tanstack/react-router";
import { FilePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@nextui-org/button";
// const options = [
//   linkOptions({
//     to: "/playground",
//     label: "interface",
//     activeOptions: { exact: true },
//   }),
//   linkOptions({
//     to: "/playground/chat",
//     label: "chat",
//   }),
//   linkOptions({
//     to: "/playground/settings",
//     label: "settings",
//   }),
// ];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <AppSidebar className="h-[100dvh] bg-transparent" />
      <SidebarInset className="h-[100dvh]">
        <header className="fixed z-[25] bg-background  top-0 flex h-[46px] w-full shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {/* <Link to="/playground/chat"> */}
          <Button
            startContent={<FilePlus className="size-4" />}
            radius="lg"
            color="primary"
            variant="light"
            className="text-foreground w-full min-w-1"
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  id: undefined,
                }),
                replace: true,
              })
            }
          />
          {/* </Link> */}
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
