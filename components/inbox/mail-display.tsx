// import addDays from "date-fns/addDays"
// import addHours from "date-fns/addHours"
// import format from "date-fns/format"
import { format } from "date-fns"
import { MoreVertical, Reply } from "lucide-react"

import { Mail } from "@/components/inbox/data"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
// import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
// import MailItem from "./thread-item"
// import { ScrollArea } from "../ui/scroll-area"
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "../ui/timeline"

interface MailDisplayProps {
  mail: Mail | null
}

// TODO: Need to change to threads, in order to display full email conversations

export function MailDisplay({ mail }: MailDisplayProps) {
  // const today = new Date()

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
        <div className="flex m-4">
          <Timeline>
            <TimelineItem status="done">
              <TimelineHeading>
                Plan!

              </TimelineHeading>
              <TimelineDot status="done" />
              <TimelineLine done />
              <TimelineContent>
                Before diving into coding, it is crucial to plan your software project
                thoroughly. This involves defining the project scope, setting clear
                objectives, and identifying the target audience. Additionally,
                creating a timeline and allocating resources appropriately will
                contribute to a successful development process.
              </TimelineContent>
            </TimelineItem>
            <TimelineItem status="done">
              <TimelineHeading side="right" >
                Design
              </TimelineHeading>
              <TimelineDot status="done" />
              <TimelineLine done />
              <TimelineContent>
                Designing your software involves creating a blueprint that outlines
                the structure, user interface, and functionality of your application.
                Consider user experience (UX) principles, wireframing, and prototyping
                to ensure an intuitive and visually appealing design.
              </TimelineContent>
            </TimelineItem>
          </Timeline>



        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">No message selected</div>
      )}
    </div>
  )
}
