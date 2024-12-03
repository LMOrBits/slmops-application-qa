"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import useFetchChats from "@/hooks/use-fetch-chat";
import { useNavigate, useSearch } from "@tanstack/react-router";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";
import { AnimatePresence, motion } from "framer-motion";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const { id } = useSearch({ from: "/playground/chat" });
  const { chats, loading } = useFetchChats(id ?? "");
  const data = {
    navMain: [
      {
        title: "Chats History",
        url: "#",
        isActive: true,
        items: chats.map((chat) => ({
          title: chat.title,
          id: chat.id,
          isActive: id ? chat.id === id : false,
        })),
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            {loading ? (
              // <SidebarMenuItem>
              <Skeleton className="h-10 w-full rounded-lg" />
            ) : (
              // </SidebarMenuItem>
              <>
                {data.navMain.map((item, index) => (
                  <AnimatePresence>
                    <Collapsible
                      key={item.title}
                      defaultOpen={index === 1}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full px-8">
                            {item.title}

                            <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                            <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {item.items?.length ? (
                          <CollapsibleContent>
                            <SidebarMenuSub className="flex flex-col gap-1 mt-2">
                              {item.items.map((item) => (
                                <motion.div
                                  initial={{ y: -10, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -10, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Button
                                    className={`w-full h-[40px] text-foreground ${item.isActive ? "scale-105" : ""}`}
                                    variant={item.isActive ? "shadow" : "flat"}
                                    color={
                                      item.isActive ? "primary" : "default"
                                    }
                                    size="md"
                                    onClick={() => {
                                      navigate({
                                        search: (prev) => ({
                                          ...prev,
                                          id: item.id,
                                        }),
                                      });
                                    }}
                                  >
                                    {item.title.slice(0, 15) +
                                      (item.title.length > 15 ? "..." : "")}
                                  </Button>
                                </motion.div>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        ) : null}
                      </SidebarMenuItem>
                    </Collapsible>
                  </AnimatePresence>
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
