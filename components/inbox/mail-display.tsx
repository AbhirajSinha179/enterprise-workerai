import { ChevronDown, MoreVertical, ReplyAll, Reply as ReplyIcon, X } from "lucide-react"
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
import { Badge } from "../ui/badge"

export function MailDisplay({ threadData }: MailDisplayProps) {
  const [replyContent, setReplyContent] = useState("")
  const [replyType, setReplyType] = useState("default")
  // const [ccEmails, setCcEmails] = useState("")
  const [threadContent, setThreadContent] = useState<CombinedMail[]>([])
  const [sendingReply, setSendingReply] = useState(false)
  const [recipientEmails, setRecipientEmails] = useState<string[]>([threadData?.lead?.email || ""])
  const [selectedOptions, setSelectedOptions] = useState(recipientEmails)
  const [loading, setLoading] = useState(false)
  const [invalidEmails, setInvalidEmails] = useState<string[]>([]);
  const [toEmail, setToEmail] = useState<string>(threadData?.lead?.email || ""); // Single recipient
  const [ccEmails, setCcEmails] = useState<string>(""); // Input value for CC
  const [ccEmailList, setCcEmailList] = useState<string[]>([]); // List of CC emails





  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleRemoveCc = (email: string) => {
    setCcEmailList((prev) => prev.filter((e) => e !== email));
  };



  const handleInputChange = (event: any) => {
    const value = event.target.value;
    if (value.includes(",")) {
      const newValues = value.split(",").map((v: any) => v.trim());

      const validEmails = newValues.filter(isValidEmail);
      const invalidEmails = newValues.filter((email: any) => !isValidEmail(email));

      if (invalidEmails.length > 0) {
        toast.error(`Invalid email(s) entered: ${invalidEmails.join(", ")}`);
      }

      setSelectedOptions((prev) => [...prev, ...validEmails]);
      setCcEmails("");
    } else {
      setCcEmails(value);
    }
  };
  const handleCcInputChange = (event: any) => {
    setCcEmails(event.target.value);
  };

  const addCcEmails = () => {
    const newEmails = ccEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email && !ccEmailList.includes(email)); // Prevent duplicates

    const validEmails = newEmails.filter(isValidEmail);
    const invalidEmails = newEmails.filter((email) => !isValidEmail(email));

    if (invalidEmails.length > 0) {
      toast.error(`Invalid email(s) entered: ${invalidEmails.join(", ")}`);
    }

    if (validEmails.length > 0) {
      setCcEmailList((prev) => [...prev, ...validEmails]); // Add only valid emails to CC list
      setCcEmails(""); // Clear input
    }
  };





  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addOptionsFromInput();
    }
  };

  const addOptionsFromInput = async () => {
    const newValues = ccEmails
      .split(",")
      .map((v) => v.trim());

    const validEmails = newValues.filter(isValidEmail);
    const invalidEmails = newValues.filter((email) => !isValidEmail(email));

    if (invalidEmails.length > 0) {
      toast.error(`Invalid email(s) entered: ${invalidEmails.join(", ")}`);
    }

    if (validEmails.length > 0) {
      setSelectedOptions((prev) => [...prev, ...validEmails]);
      setCcEmails("");
    }
  };




  const handleRemove = (value: any) => {
    setSelectedOptions((prev) => prev.filter((option) => option !== value));
  };

  // Create a reference for the Textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(event.target.value)
  }

  const handleReplySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyContent.trim() || sendingReply) return;
    setSendingReply(true);

    try {
      const result = await submitReplyContent(replyContent, threadData?.threadId!, ccEmailList);
      setThreadContent((t) => [...t, { type: "REPLY", data: result.email[0]! }]);
      toast.success("Message sent successfully!");
      setReplyContent("");
    } catch (error) {
      console.error("Error submitting the reply:", error);
      toast.error("Failed to send the message.");
    } finally {
      setSendingReply(false);
    }
  };



  // Function to focus the Textarea when the Reply button is clicked
  const handleFocusTextarea = () => {
    textareaRef.current?.focus();
  }

  useEffect(() => {
    if (threadData?.lead?.email) {
      setRecipientEmails([threadData.lead.email]);
    }
  }, [threadData]);

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
          <div className="p-4 ">
            <form onSubmit={handleReplySubmit} className="w-full">
              <div className=" flex min-h-[80px] w-full flex-col rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex w-full flex-wrap items-center  py-1 ">
                  <div className="flex flex-col w-full">
                    {/* To Section (Full Width, No Border) */}
                    <div className="mb-2 w-full">
                      <span className="text-base font-bold text-foreground">To:</span>
                      <div className="flex items-center p-2 w-full">
                        <Badge variant="secondary">
                          <div className="flex items-center gap-1">
                            <p className="truncate max-w-full">{recipientEmails}</p>
                          </div>
                        </Badge>
                      </div>
                    </div>

                    {/* CC Section (Full Width, No Border) */}
                    <div className="mb-2 w-full">
                      <span className="text-base font-bold text-foreground">CC:</span>
                      <div className="flex flex-wrap items-center gap-2 p-2 w-full">
                        {/* Display CC Email Badges */}
                        {ccEmailList.map((email) => (
                          <Badge key={email} variant="secondary">
                            <div className="flex items-center gap-1">
                              <p className="truncate max-w-full">{email}</p>
                              <X className="size-4 cursor-pointer" onClick={() => handleRemoveCc(email)} />
                            </div>
                          </Badge>
                        ))}

                        {/* Input Field for Adding CC Emails */}
                        {/* Input Field for Adding CC Emails */}
                        <Input
                          type="text"
                          placeholder="Add CC Emails (comma-separated)"
                          value={ccEmails}
                          onChange={handleCcInputChange}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === ",") {
                              e.preventDefault();
                              addCcEmails();
                            }
                          }}
                          className="w-full border-2 bg-transparent focus:ring-0 mt-2"
                        />

                      </div>
                    </div>

                  </div>
                  {/* To Section (Fixed Recipient) */}


                  {/* <div className="flex flex-col w-full my-2">
                    <div className="flex flex-col w-full  border-2 rounded-md">
                      <Input
                        type="text"
                        placeholder="CC Emails (comma-separated)"
                        value={ccEmails}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className={`w-fit w-full flex-1 border-none bg-transparent ${invalidEmails.length > 0 ? "border-red-500" : ""
                          }`}
                      />
                      {invalidEmails.length > 0 && (
                        <p className="text-red-500 text-sm mt-1">
                          Invalid email(s): {invalidEmails.join(", ")}
                        </p>
                      )}
                    </div>

                  </div> */}

                </div>
                <div className="flex border-2 my-2 rounded-md mx-2">
                  <Textarea
                    ref={textareaRef}
                    className="w-fit w-full flex-1 border-none bg-transparent focus:ring-0"
                    placeholder="Reply..."
                    value={replyContent}
                    onChange={handleReplyChange}
                  />

                </div>

                <Button type="submit" size="sm" className="my-2" disabled={sendingReply || loading}>
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
