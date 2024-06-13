import { MoreVertical, Reply } from "lucide-react";
import { Mail } from "@/components/inbox/data";
import MailTimelineItem from "@/components/inbox/thread-item";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Timeline } from "../ui/timeline";
import { ScrollArea } from "../ui/scroll-area";

interface MailDisplayProps {
  mail: Mail | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
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
            <Button variant="ghost" size="icon" disabled={!mail}>
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
      {mail ? (
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex m-4 h-[80vh]">
            {/* when full thread data available can map through it  */}
            <ScrollArea>
              <Timeline>
                <MailTimelineItem mail={mail} showLine={true} />
                <MailTimelineItem mail={mail} showLine={true} />
                <MailTimelineItem mail={mail} showLine={false} />
              </Timeline>
            </ScrollArea>
          </div>
          {/* <div className="px-4 py-2">
            <form>
              <div className="grid gap-2">
                <Textarea className="p-4" placeholder={`Reply to ${mail.name}...`} />
                <div className="flex items-center">
                  <Button onClick={(e) => e.preventDefault()} size="sm" className="ml-auto">
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div> */}
        </div>


      ) : (
        <div className="p-8 text-center text-muted-foreground">No message selected</div>
      )}
    </div>
  );
}
