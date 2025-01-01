"use client";

import Link from "next/link";
import React from "react";
import {
  Button,
} from "@/components/ui/button";
import { Menu } from "@/components/sidebar/menu";
import { SidebarToggle } from "@/components/sidebar/sidebar-toggle";
import { cn } from "@/lib/utils";
import { WorkerAILogo } from "../global/logo";
import { useSidebarContext } from "../layout/layout-context";
import { useTargetContext } from "@/contexts/TargetIdContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

export function Sidebar() {
  const { collapsed, setCollapsed } = useSidebarContext();
  const { targetList, setTargetId, targetId } = useTargetContext();
  const [open, setOpen] = React.useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full shadow-lg transition-[width] duration-300 ease-in-out dark:bg-slate-950 dark:shadow-slate-800 lg:translate-x-0",
        collapsed ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={!collapsed} setIsOpen={setCollapsed} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md">
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
        <div className="my-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[250px] justify-between "
              >
                <div className="overflow-hidden">
                  {targetId
                    ? targetList.find((target) => target.id === targetId)?.name || "Unnamed"
                    : "Select Campaign"}
                </div>

                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 my-2">
              <Command>
                <CommandInput placeholder="Search Campaign..." />
                <CommandList>
                  <CommandEmpty>No campaigns found.</CommandEmpty>
                  <CommandGroup>
                    {targetList.map((target) => (
                      <CommandItem
                        key={target.id}
                        onSelect={() => {
                          setTargetId(target.id);
                          setOpen(false);
                        }}
                      >
                        <div>
                          <span className="font-medium">{target.name || "Unnamed"}</span>
                          <span className="block text-xs">{target.id.substring(0, 6)}...</span>
                        </div>
                        <Check
                          className={cn(
                            "ml-auto",
                            targetId === target.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Menu isOpen={!collapsed} />
      </div>
    </aside>
  );
}
