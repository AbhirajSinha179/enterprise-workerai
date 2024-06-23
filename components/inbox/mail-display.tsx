import { MoreVertical, Reply } from "lucide-react";
import { Mail } from "@/components/inbox/data";
import MailTimelineItem from "@/components/inbox/thread-item";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Timeline } from "../ui/timeline";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface MailDisplayProps {
  threadData: ThreadList | null;
}

interface ThreadList {
  threadid: string;
  thread: Mail[];
}

export function MailDisplay({ threadData }: MailDisplayProps) {
  const [replyContent, setReplyContent] = useState<string>("");
  const thread = threadData?.thread;

  const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(event.target.value);
  };

  const handleReplySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyContent.trim()) return;
    console.log("Reply content:", replyContent);
    setReplyContent("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!threadData}>
                <Reply className="size-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!threadData}>
              <MoreVertical className="size-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {thread ? (
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex m-4 h-[60vh]">
            <ScrollArea>
              <Timeline>
                {thread.map((message: Mail, index: number) => (
                  <MailTimelineItem
                    key={message.id}
                    mail={message}
                    showLine={true}
                    isLast={index === thread.length - 1}
                  />
                ))}
              </Timeline>
            </ScrollArea>
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form onSubmit={handleReplySubmit}>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder="Reply..."
                  value={replyContent}
                  onChange={handleReplyChange}
                />
                <div className="flex items-center">
                  <Button type="submit" size="sm" className="ml-auto">
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">No message selected</div>
      )}
    </div>
  );
}
