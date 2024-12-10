// app/components/inbox/index.tsx
"use client"

import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { InboxIcon, MailOpenIcon, Search } from "lucide-react"
// import * as React from "react"
import { notFound } from "next/navigation"
import React, { useEffect } from "react";
import EmptyState from "@/components/global/empty-state" // Ensure this import is correct
import { MailDisplay } from "@/components/inbox/mail-display"
import { MailList } from "@/components/inbox/mail-list"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useMail } from "@/contexts/MailContext"
import { cn } from "@/lib/utils"
// import { MailProps, ThreadList } from "@/types/interface"
import { Thread, ThreadList } from "@/types/interface"
import { MailProps } from "@/types/interface";
import { Button } from "../ui/button"


const MAX_INBOX_HEIGHT = 680

export function Inbox({ threads, defaultLayout = [265, 440, 655], lastEmailRef, replyEmailRef, replies, loading }: MailProps) {
  const { config, setConfig } = useMail()
  const [selectedView, setSelectedView] = React.useState("last24Hours")
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredThreads = threads.filter((thread) =>
    thread.senderEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.emails.some((email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.recipient.toLowerCase().includes(searchQuery.toLowerCase())
      // (email.body && email.body.toLowerCase().includes(searchQuery.toLowerCase()))
    ) ||
    (thread.lead &&
      (thread.lead.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.lead.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.lead.email.toLowerCase().includes(searchQuery.toLowerCase())))
  );
  const filteredReplies = replies?.filter((reply) =>
    reply.senderEmail?.toLowerCase().includes(searchQuery.toLowerCase()) || // Check if senderEmail exists
    reply.emails?.some((email) =>
      email.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || // Check if subject exists
      email.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) // Check if recipient exists
    ) ||
    (reply.lead &&
      (reply.lead.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || // Check if firstName exists
        reply.lead.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) || // Check if lastName exists
        reply.lead.email?.toLowerCase().includes(searchQuery.toLowerCase()))) // Check if email exists
  );


  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      selected: null,
    }));
  }, [selectedView, setConfig]);

  if (!threads) return notFound()

  let displayThread = threads.find((item: Thread) => item.threadId === config.selected) || null;
  if (!displayThread && replies) {
    displayThread = replies.find((item: Thread) => item.threadId === config.selected) || null;
  }

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
          <Tabs defaultValue="all"
            onValueChange={(value) => setSelectedView(value)}
          >

            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">

                <TabsTrigger value="all">All mail</TabsTrigger>
                <TabsTrigger value="reply">Reply</TabsTrigger>
                <TabsTrigger value="followup">Follow Ups</TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="p-4 backdrop-blur supports-[backdrop-filter]:bg-background/0 flex justify-between flex-row">
              <form className="grow">
                <div className="relative">
                  <Search className="absolute left-2 top-3 size-4 text-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
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
              {filteredThreads.length === 0 ? (
                <EmptyState headerMessage="No Emails Yet" containerMessage="" icon={<InboxIcon size={60} />} />
              ) : (
                <MailList items={filteredThreads} lastEmailRef={lastEmailRef} loading={loading} />
              )}
            </TabsContent>
            <TabsContent value="reply" className="m-0">
              {filteredReplies?.length === 0 ? (
                <EmptyState headerMessage="No Emails Yet" containerMessage="" icon={<InboxIcon size={60} />} />
              ) : (
                <MailList
                  items={filteredReplies || []}
                  lastEmailRef={replyEmailRef}
                  loading={loading || false}
                />

              )}
            </TabsContent>
            <TabsContent value="followup" className="m-0">
              {threads.length === 0 ? (
                <EmptyState headerMessage="No Emails Yet" containerMessage="" icon={<InboxIcon size={60} />} />
              ) : (
                <MailList
                  items={filteredThreads.filter((t) => t.emails && t.emails instanceof Array && t.emails?.length > 1)}
                  lastEmailRef={lastEmailRef}
                  loading={loading}
                />
              )}
            </TabsContent>

          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <MailDisplay threadData={displayThread} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
