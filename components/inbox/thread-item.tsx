import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TimelineContent, TimelineDot, TimelineHeading, TimelineItem, TimelineLine } from "@/components/ui/timeline"
import { Email, Reply } from "@/types/interface"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { reject } from "lodash";

interface MailTimelineItemProps {
  mail: Email | Reply
  from: string
  showLine: boolean
  isLast: boolean
  showSubject: boolean
}


// Function to strip HTML tags
function stripHtmlTags(input: string): string {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.body.textContent || "";
}

const MailTimelineItem: React.FC<MailTimelineItemProps> = ({ mail, showLine, isLast, showSubject, from }) => {
  const { body }: any = mail;

  // Check if body is an array
  let sanitizedBody: any;
  if (Array.isArray(body)) {
    const filteredBody = reject(body, (item: string) => item.includes("<a>")); // Remove items with unwanted tags
    sanitizedBody = filteredBody.map((item: string) => stripHtmlTags(item)); // Sanitize remaining items
  } else if (typeof body === "string") {
    sanitizedBody = stripHtmlTags(body); // Sanitize directly if it's a string
  } else {
    sanitizedBody = body; // Fallback for unexpected types
  }

  console.log("BODY : ", body);
  console.log("SANITIZED BODY : ", sanitizedBody);

  let subject: string | null = "";
  if ("subject" in mail) {
    subject = mail.subject as string;
  }

  let recipient: string = "";
  let date: string | null = "";
  if ("recipient" in mail && "sendAt" in mail) {
    recipient = mail.recipient;
    date = mail.sendAt;
  } else if ("fromEmail" in mail) {
    recipient = mail.fromEmail as string;
    date = mail.date;
  } else {
    recipient = mail.from;
    date = mail.date;
  }

  return (
    <TimelineItem status="done" className="px-4">
      <TimelineHeading>
        <div className="flex items-start justify-between p-4">
          <div className="flex items-start gap-4 text-sm">
            <div className="grid gap-1">
              <div className="text-xl font-bold text-foreground">
                <span className="font-bold">
                  {"fromEmail" in mail ? "From : " : "To : "}
                </span>
                {recipient}
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
                  ? recipient[0].toUpperCase()
                  : recipient
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")
                    .toUpperCase()
                : "?"}
            </AvatarFallback>
          </Avatar>
        }
      />

      {showLine && !isLast && <TimelineLine />}
      <TimelineContent>
        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
          {Array.isArray(sanitizedBody) ? sanitizedBody.join("\n") : sanitizedBody}
        </div>
      </TimelineContent>
    </TimelineItem>
  );
};

export default MailTimelineItem;
