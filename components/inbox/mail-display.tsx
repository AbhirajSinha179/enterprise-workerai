import { ChevronDown, MoreVertical, ReplyAll, Reply as ReplyIcon } from "lucide-react"
import { use, useEffect, useRef, useState } from "react"
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
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Input } from "../ui/input"

export function MailDisplay({ threadData }: MailDisplayProps) {
  const [replyContent, setReplyContent] = useState("")
  const [replyType, setReplyType] = useState("default")
  const [ccEmails, setCcEmails] = useState("")
  const [threadContent, setThreadContent] = useState<CombinedMail[]>([])
  const [sendingReply, setSendingReply] = useState(false)
  const [recipientEmails, setRecipientEmails] = useState<string[]>([threadData?.lead?.email || ""])
  const [selectedOptions, setSelectedOptions] = useState(recipientEmails)
  const [loading, setLoading] = useState(false)


 const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.includes(",")) {
      const newValues = value.split(",").map(v => v.trim()).filter(v => v && !selectedOptions.includes(v));
      setSelectedOptions((prev) => [...prev, ...newValues]);
      setCcEmails("");
    } else {
      setCcEmails(value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addOptionsFromInput();
    }
  };

  const addOptionsFromInput = async () => {
    const newValues = ccEmails.split(",").map(v => v.trim()).filter(v => v && !selectedOptions.includes(v));
    if (newValues.length > 0) {
      setSelectedOptions((prev) => [...prev, ...newValues]);
      setCcEmails("");
    }
    if (selectedOptions.length === 0 && newValues.length === 0) {
      return;
    }
    try {
      setLoading(true);
      await submitData([...selectedOptions, ...newValues]);
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (value) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== value));
  };

  // Create a reference for the Textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Function to focus the Textarea when the Reply button is clicked
  const handleFocusTextarea = () => {
    textareaRef.current?.focus();
  }

  useEffect(() => {
    const thread: CombinedMail[] = threadData?.emails.map((e) => ({ type: "EMAIL", data: e })) || [];
    if (threadData?.replies) {
      threadData.replies.forEach((r: Reply) => {
        thread.push({ type: "REPLY", data: r });
      });
    }
    
    // make one util function for this
    thread.sort((a, b) => {
      const sanitizeDate = (date: string | null) => {
        if (!date) return "";
        const sanitized = date.split("+")[0]?.trim();
        return sanitized;
      };

      const dateA = sanitizeDate(a.type === "EMAIL" ? (a.data as Email).sendAt : (a.data as Reply).date) || "";
      const dateB = sanitizeDate(b.type === "EMAIL" ? (b.data as Email).sendAt : (b.data as Reply).date) || "";

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
              <Button variant="ghost" size="icon" disabled={!threadData} onClick={handleFocusTextarea}>
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
            <form onSubmit={handleReplySubmit} className="w-full">
              <div className="flex min-h-[80px] w-full flex-col rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex w-full flex-wrap items-center gap-x-2 py-1">
                  <div className="flex-1">
                    <span className="text-sm text-foreground">To:</span>
                    <div className="flex gap-2">
                      {selectedOptions.map((option) => (
                        <button key={option} type="button" onClick={() => handleRemove(option)}>
                          <Badge variant="secondary">
                            <div className="flex items-center justify-around gap-1">
                              <p>{option}</p>
                              <X className="size-4" />
                            </div>
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Input
                    type="text"
                    placeholder="CC Emails (comma-separated)"
                    value={ccEmails}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-fit w-full flex-1 border-none bg-transparent"
                  />
                </div>
                <Textarea
                  ref={textareaRef}
                  className="w-full border-none bg-transparent p-2"
                  placeholder="Reply..."
                  value={replyContent}
                  onChange={handleReplyChange}
                />
                <Button type="submit" size="sm" className="mt-2" disabled={sendingReply || loading}>
                  Send
                </Button>
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
