// app/components/inbox/index.tsx
"use client"

import { InboxIcon, MailOpenIcon, Search } from "lucide-react"
import * as React from "react"
import EmptyState from "@/components/global/empty-state" // Ensure this import is correct
import { MailDisplay } from "@/components/inbox/mail-display"
import { MailList } from "@/components/inbox/mail-list"
import { Input } from "@/components/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useMail } from "@/contexts/MailContext"
import { cn } from "@/lib/utils"
// import { MailProps, ThreadList } from "@/types/interface"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { MailProps, Thread, ThreadList } from "@/types/interface"
import { notFound } from "next/navigation"

const MAX_INBOX_HEIGHT = 680

export function Inbox({
  threads,
  defaultLayout = [265, 440, 655],
}: MailProps) {
  const { config } = useMail()
  const [selectedView, setSelectedView] = React.useState("last24Hours")
  if (!threads) return notFound()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
        className={cn("h-full items-stretch", `max-h-[${MAX_INBOX_HEIGHT}px]`)}
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger value="all">
                  All mail
                </TabsTrigger>
                {/* <TabsTrigger value="unread">
                  Unread
                </TabsTrigger> */}
                <TabsTrigger value="reply">
                  Reply
                </TabsTrigger>
                <TabsTrigger value="followup">
                  Follow Ups
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="p-4 backdrop-blur supports-[backdrop-filter]:bg-background/0 flex justify-between flex-row">
              <form className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-2 top-3 size-4 text-foreground" />
                  <Input placeholder="Search" className="pl-8 w-full" />
                </div>
              </form>
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mx-2 hidden lg:flex"
                    >
                      <MixerHorizontalIcon className="mr-2 size-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[150px] bg-muted">
                    {/* <DropdownMenuLabel>Toggle columns</DropdownMenuLabel> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={selectedView === "last24Hours"}
                      onCheckedChange={() => setSelectedView("last24Hours")}
                    >
                      Last 24 Hours
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedView === "week"}
                      onCheckedChange={() => setSelectedView("week")}
                    >
                      Week
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedView === "month"}
                      onCheckedChange={() => setSelectedView("month")}
                    >
                      Month
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              {threads.length === 0 ? (
                <EmptyState
                  headerMessage="No Emails Yet"
                  containerMessage=""
                  icon={<InboxIcon size={60} />}
                />
              ) : (
                <MailList items={threads} />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <MailDisplay
            threadData={threads.find((item: Thread) => item.threadId === config.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
