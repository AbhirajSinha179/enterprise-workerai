import { format } from "date-fns"
import { Mail } from "@/components/inbox/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TimelineContent, TimelineDot, TimelineHeading, TimelineItem, TimelineLine } from "@/components/ui/timeline"
import { Email, Reply } from "@/types/interface"

interface MailTimelineItemProps {
  mail: Email | Reply
  showLine: boolean
  isLast: boolean
  showSubject: boolean
}

const MailTimelineItem: React.FC<MailTimelineItemProps> = ({ mail, showLine, isLast, showSubject }) => {
  const { subject, body } = mail
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
              <div className="font-semibold text-foreground">{recipient}</div>
              {showSubject && <div className="line-clamp-1 text-xs text-foreground">{subject}</div>}
              <div className="line-clamp-1 text-xs text-foreground">
                <span className="font-medium">Reply-To:</span> {recipient}
              </div>
            </div>
          </div>
          <div className="flex">
            {date && <div className="ml-auto text-xs text-foreground">{format(new Date(date), "PPpp")}</div>}
          </div>
        </div>
      </TimelineHeading>
      <TimelineDot
        status="custom"
        customIcon={
          <Avatar>
            <AvatarImage alt={recipient} />
            <AvatarFallback>
              {recipient
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
