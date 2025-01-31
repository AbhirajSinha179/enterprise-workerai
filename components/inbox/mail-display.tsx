import { MoreVertical, Reply as ReplyIcon } from "lucide-react"
import { use, useEffect, useState } from "react"
import { toast } from "sonner"
import MailTimelineItem from "@/components/inbox/thread-item"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { submitReplyContent } from "@/lib/actions"
import { Email, MailDisplayProps, Thread, Reply, CombinedMail } from "@/types/interface"
import { ScrollArea } from "../ui/scroll-area"
import { Textarea } from "../ui/textarea"
import { Timeline } from "../ui/timeline"

export function MailDisplay({ threadData }: MailDisplayProps) {
  const [replyContent, setReplyContent] = useState<string>("")
  const [threadContent, setThreadContent] = useState<CombinedMail[]>([])
  const [sendingReply, setSendingReply] = useState(false)
  // const thread: CombinedMail[] = threadData?.emails.map((e) => ({ type: "EMAIL", data: e })) || []
  // if (threadData?.replies) {
  //   threadData.replies.forEach((r: Reply) => {
  //     thread.push({ type: "REPLY", data: r })
  //   })
  // }

  // thread.sort((a, b) => {
  //   const dateA = (a.type == "EMAIL" ? (a.data as Email).sendAt : (a.data as Reply).date) || ""
  //   const dateB = (b.type == "EMAIL" ? (b.data as Email).sendAt : (b.data as Reply).date) || ""
  //   return new Date(dateA).getTime() - new Date(dateB).getTime()
  // })

  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(event.target.value)
  }

  const handleReplySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!replyContent.trim() || !!sendingReply) return
    setSendingReply(true)

    try {
      const result = await submitReplyContent(replyContent, threadData?.threadId!)
      setThreadContent((t) => {
        return [...t, { type: "REPLY", data: result.email[0]! }]
      })
      toast.success("Message sent successfully!")
      setReplyContent("")
    } catch (error) {
      console.error("Error submitting the reply:", error)
      toast.error("Failed to send the message.")
    } finally {
      setSendingReply(false)
    }
  }

  useEffect(() => {
    const thread: CombinedMail[] = threadData?.emails.map((e) => ({ type: "EMAIL", data: e })) || [];
    if (threadData?.replies) {
      threadData.replies.forEach((r: Reply) => {
        thread.push({ type: "REPLY", data: r });
      });
    }

    thread.sort((a, b) => {
      const sanitizeDate = (date: string | null) => {
        if (!date) return "";
        const sanitized = date.split("+")[0]?.trim();
        return sanitized;
      };

      const dateA = sanitizeDate(a.type === "EMAIL" ? (a.data as Email).sendAt : (a.data as Reply).date) || "";
      const dateB = sanitizeDate(b.type === "EMAIL" ? (b.data as Email).sendAt : (b.data as Reply).date) || "";

      console.log("Sanitized DATE A:", dateA);
      console.log("Sanitized DATE B:", dateB);

      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    setThreadContent(thread);
  }, [threadData]);



  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!threadData}>
                <ReplyIcon className="size-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6 bg-card" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!threadData}>
              <MoreVertical className="size-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-muted">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator className="bg-card" />
      {threadContent && threadContent.length > 0 ? (
        <div className="flex flex-1 flex-col justify-between">
          <div className="mx-4">
            <ScrollArea className="h-[60vh]">
              <Timeline>
                {threadContent.map((message: CombinedMail, index: number) => (
                  <MailTimelineItem
                    key={message.data.id}
                    mail={message.data}
                    showLine={true}
                    isLast={index === threadContent.length - 1}
                    showSubject={index === 0}
                    from={threadData?.senderEmail || "Unknown"}
                  />
                ))}
              </Timeline>
            </ScrollArea>
          </div>
          <Separator className="bg-card" />
          <div className="p-4">
            <form onSubmit={handleReplySubmit}>
              <div className="mx-2 grid gap-4">
                <Textarea
                  className="bg-card p-4"
                  placeholder="Reply..."
                  value={replyContent}
                  onChange={handleReplyChange}
                />
                <div className="flex items-center">
                  <Button type="submit" size="sm" className="ml-auto" disabled={!!sendingReply}>
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-foreground">No message selected</div>
      )}
    </div>
  )
}
