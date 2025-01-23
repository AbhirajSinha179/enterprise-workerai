import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline";
import { Email, Reply } from "@/types/interface";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { reject } from "lodash";

interface MailTimelineItemProps {
  mail: Email | Reply;
  from: string;
  showLine: boolean;
  isLast: boolean;
  showSubject: boolean;
}

// Function to strip HTML tags
function stripHtmlTags(input: string): string {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.body.textContent?.replace(/(?:\r\n|\r|\n)/g, "\n") || "";
}

function formatDateRaw(dateString: string): string {
  if (!dateString) return "Invalid Date";
  let normalizedDate = dateString.trim();
  if (!normalizedDate.includes("T")) {
    normalizedDate = normalizedDate.replace(" ", "T");
  }
  if (normalizedDate.endsWith("+")) {
    normalizedDate = normalizedDate.slice(0, -1) + "+00:00";
  }

  if (!normalizedDate.endsWith("Z") && !/[\+\-]\d{2}:\d{2}$/.test(normalizedDate)) {
    normalizedDate += "+00:00";
  }

  try {
    const date = new Date(normalizedDate);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid Date");
    }
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid Date";
  }
}

const MailTimelineItem: React.FC<MailTimelineItemProps> = ({
  mail,
  showLine,
  isLast,
  showSubject,
  from,
}) => {
  const { body }: any = mail;

  let sanitizedBody: string | string[];
  if (Array.isArray(body)) {
    const filteredBody = reject(body, (item: string) => item.includes("<a>")); // Remove unwanted tags
    sanitizedBody = filteredBody.map((item: any) => stripHtmlTags(item).replace(/\\n/g, "\n"));
  } else if (typeof body === "string") {
    sanitizedBody = stripHtmlTags(body).replace(/\\n/g, "\n"); // Sanitize directly if it's a string
  } else {
    sanitizedBody = body; // Fallback for unexpected types
  }

  let subject: string | null = mail.subject || null;
  let recipient: string = "";
  let sender: string = "";
  let date: string | null = null;
  let showName: string | null = "";

  if ("recipient" in mail && "sendAt" in mail) {
    recipient = mail.recipient;
    date = mail.sendAt;
    sender = from;
  } else if ("from" in mail) {
    // Reply
    sender = mail.from as string;
    recipient = from;
    date = mail.date || null;
  }

  const formattedDate = date ? formatDateRaw(date) : "Invalid Date";
  showName = "from" in mail ? sender : recipient;
  // console.log("SANITIZED BODY : ", sanitizedBody);

  return (
    <TimelineItem status="done" className="px-4">
      <TimelineHeading>
        <div className="flex items-start justify-between p-4">
          <div className="flex items-start gap-4 text-sm">
            <div className="grid gap-1">
              <div className="text-xl font-bold text-foreground">
                <span className="font-bold">
                  {"from" in mail ? "From : " : "To : "}
                </span>
                {showName}
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
                    <span className="font-bold">To : </span>
                    {recipient}
                  </div>
                  <div>
                    <span className="font-bold">From : </span>
                    {sender}
                  </div>
                  <div>
                    <div className="font-medium">Date: {formattedDate}</div>
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
            <AvatarImage alt={showName || ""} />
            <AvatarFallback>
              {showName && showName[0]
                ? showName.includes("@") || showName.includes("+")
                  ? showName[0].toUpperCase()
                  : showName
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
