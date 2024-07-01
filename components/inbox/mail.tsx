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
import { MailProps, ThreadList } from "@/types/interface"

const MAX_INBOX_HEIGHT = 680

export function Inbox({
  threads,
  defaultLayout = [265, 440, 655],
}: MailProps) {
  const { config } = useMail()

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
                <TabsTrigger
                  value="all"
                >
                  All mail
                </TabsTrigger>
                {/* <TabsTrigger
                  value="unread"
                >
                  Unread
                </TabsTrigger> */}
                <TabsTrigger
                  value="reply"
                >
                  Reply
                </TabsTrigger>
                <TabsTrigger
                  value="followup"
                >
                  Follow Ups
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="p-4 backdrop-blur supports-[backdrop-filter]:bg-background/0">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-4 size-4 text-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
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
            threadData={threads.find((item: ThreadList) => item.threadid === config.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
