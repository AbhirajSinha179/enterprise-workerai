import { format } from "date-fns"
import { Mail } from "@/components/inbox/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TimelineContent, TimelineDot, TimelineHeading, TimelineItem, TimelineLine } from "@/components/ui/timeline"
import { Email, Reply } from "@/types/interface"
import { useUser } from '@clerk/nextjs'
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface MailTimelineItemProps {
  mail: Email | Reply
  from: string
  showLine: boolean
  isLast: boolean
  showSubject: boolean
  name: string
}

const MailTimelineItem: React.FC<MailTimelineItemProps> = ({ mail, showLine, isLast, showSubject, from, name }) => {
  const { subject, body } = mail
  const { user } = useUser()

  let recipient = ""
  let date: string | null = ""
  if ("recipient" in mail && "sendAt" in mail) {
    recipient = mail.recipient
    date = mail.sendAt
  } else {
    recipient = mail.from
    date = mail.date
  }

  return (
    <TimelineItem status="done" className="px-4">
      <TimelineHeading>
        <div className="flex items-start justify-between p-4 ">
          <div className="flex items-start gap-4 text-sm">
            <div className="grid gap-1">
              <div className="font-bold text-foreground text-xl">
                <span className="font-bold">To:</span> {recipient}
              </div>
              {showSubject && <div className="text-xl text-foreground">{subject}</div>}
            </div>
          </div>

          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex mx-2">
                  <h1 className="text-foreground text-sm">Details</h1>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4} align="end" className="mx-2">

                <div className="gap-y-1">
                  <div>
                    <span className="font-medium">To:</span> {recipient}
                  </div>
                  <div>
                    <span className="font-medium">From:</span> {from}
                  </div>
                  <div>
                    {date && <div className="font-medium"> Date : {format(new Date(date), "PPpp")}</div>}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TimelineHeading>
      <TimelineDot
        status="custom"
        customIcon={
          <Avatar>
            <AvatarImage alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((chunk) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        }
      />
      {showLine && !isLast && <TimelineLine />}
      <TimelineContent>
        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">{body}</div>
      </TimelineContent>
    </TimelineItem>
  )
}

export default MailTimelineItem
