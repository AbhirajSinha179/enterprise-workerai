import { format } from "date-fns"
import { Mail } from "@/components/inbox/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TimelineContent, TimelineDot, TimelineHeading, TimelineItem, TimelineLine } from "@/components/ui/timeline"
import { Email, Reply } from "@/types/interface"
import { useUser } from "@clerk/nextjs"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface MailTimelineItemProps {
  mail: Email | Reply
  from: string
  showLine: boolean
  isLast: boolean
  showSubject: boolean
}

const MailTimelineItem: React.FC<MailTimelineItemProps> = ({ mail, showLine, isLast, showSubject, from }) => {
  const { body } = mail
  let subject = ""
  if ("subject" in mail) {
    subject = mail.subject
  }


  // let recipient = ""
  let recipient: string = ""
  let date: string | null = ""
  if ("recipient" in mail && "sendAt" in mail) {
    recipient = mail.recipient
    date = mail.sendAt
  } else {
    recipient = mail.from
    date = mail.date
  }
  console.log("RECIPENT : ", recipient)

  return (
    <TimelineItem status="done" className="px-4">
      <TimelineHeading>
        <div className="flex items-start justify-between p-4 ">
          <div className="flex items-start gap-4 text-sm">
            <div className="grid gap-1">
              <div className="text-xl font-bold text-foreground">
                <span className="font-bold">To:</span> {recipient}
              </div>
              {showSubject && <div className="text-xl text-foreground">{subject}</div>}
            </div>
          </div>

          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mx-2 flex">
                  <h1 className="text-sm text-foreground">Details</h1>
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
                  <div>{date && <div className="font-medium"> Date : {format(new Date(date), "PPpp")}</div>}</div>
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
            <AvatarImage alt={recipient || ""} />
            <AvatarFallback>
              {recipient && recipient[0]
                ? (recipient.includes("@") || recipient.includes("+"))
                  ? recipient[0].toUpperCase() // Use only the first character if special characters are present
                  : recipient
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")
                    .toUpperCase()
                : "?"} {/* Fallback character if recipient is undefined or empty */}
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
