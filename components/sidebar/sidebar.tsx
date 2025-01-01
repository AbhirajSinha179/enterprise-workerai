"use client";

import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "@/components/sidebar/menu";
import { SidebarToggle } from "@/components/sidebar/sidebar-toggle";
import { cn } from "@/lib/utils";
import { WorkerAILogo } from "../global/logo";
import { useSidebarContext } from "../layout/layout-context";
import { useTargetContext } from "@/contexts/TargetIdContext";

export function Sidebar() {
  const { collapsed, setCollapsed } = useSidebarContext();
  const { targetList, setTargetId, targetId } = useTargetContext();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full shadow-lg transition-[width] duration-300 ease-in-out dark:bg-slate-950 dark:shadow-slate-800 lg:translate-x-0",
        collapsed ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={!collapsed} setIsOpen={setCollapsed} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link
              href="/dashboard"
              className={cn(
                "mb-1 flex items-center gap-2 self-center transition-transform duration-300 ease-in-out",
                collapsed ? "translate-x-1" : "translate-x-0"
              )}
            >
              <WorkerAILogo className="mr-1 size-8" />
              <h1
                className={cn(
                  "whitespace-nowrap text-xl font-bold transition-[transform,opacity,display] duration-300 ease-in-out",
                  collapsed ? "hidden -translate-x-96 opacity-0" : "translate-x-0 opacity-100"
                )}
              >
                WorkerAI
              </h1>
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 mx-4  overflow-y-auto">
            <DropdownMenuLabel>Select Campaign</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {targetList.map((target) => (
              <Button
                key={target.id}
                variant={targetId === target.id ? "secondary" : "ghost"}
                className="w-full text-left px-4 py-2  flex justify-between"
                onClick={() => setTargetId(target.id)}
              >
                <div>
                  <span className="font-medium">{target.name || "Unnamed"}</span>
                  <span className="block text-xs">{target.id.substring(0, 6)}...</span>
                </div>
              </Button>
            ))}
          </DropdownMenuContent>

        </DropdownMenu>
        <Menu isOpen={!collapsed} />
      </div>
    </aside>
  );
}
