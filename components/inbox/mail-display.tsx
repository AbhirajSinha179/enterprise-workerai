
import { MoreVertical, Reply } from "lucide-react";
import { Mail } from "@/components/inbox/data";
import MailTimelineItem from "@/components/inbox/thread-item";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { Timeline } from "../ui/timeline";
import { MailDisplayProps } from "@/types/interface";

export function MailDisplay({ threadData }: MailDisplayProps) {
  const thread = threadData?.thread;

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
          <div className="flex m-4 h-[80vh]">
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
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">No message selected</div>
      )}
    </div>
  );
}
