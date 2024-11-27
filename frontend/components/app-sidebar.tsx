"use client";

import * as React from "react";
import {
  TowerControl,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
  Plus,
} from "lucide-react";
import useFetchChats from "@/hooks/use-fetch-chat";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";
import axios from "axios";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { chats, loading, error, invalidate } = useFetchChats();
  const addChat = async () => {
    const response = await axios.post("/api/chats");
    invalidate();
    console.log(response);
  };
  const data = {
    navMain: [
      {
        title: "Chats History",
        url: "#",
        items: chats,
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TowerControl className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SLMOPS</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {loading ? (
              <SidebarMenuItem>
                <Skeleton className="h-10 w-full rounded-lg" />
              </SidebarMenuItem>
            ) : (
              <>
                <div className="flex items-center gap-2 my-[10px]  px-2 size-8 w-full">
                  <Button
                    variant="shadow"
                    radius="lg"
                    color="default"
                    className="text-foreground  w-full min-h-3 h-6"
                    startContent={<Plus size={16} />}
                    onClick={addChat}
                  >
                    {" "}
                    New{" "}
                  </Button>
                </div>
                {data.navMain.map((item, index) => (
                  <Collapsible
                    key={item.title}
                    defaultOpen={index === 1}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.title}{" "}
                          <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {item.items?.length ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={item.isActive}
                                >
                                  <a href={item.url}>
                                    {item.title.slice(0, 15) +
                                      (item.title.length > 15 ? "..." : "")}
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
