import { format } from "date-fns";
import { Mail } from "@/components/inbox/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TimelineContent, TimelineDot, TimelineHeading, TimelineItem, TimelineLine } from "@/components/ui/timeline";

interface MailTimelineItemProps {
    mail: Mail;
    showLine: boolean; // Add the showLine prop
}

const MailTimelineItem: React.FC<MailTimelineItemProps> = ({ mail, showLine }) => (
    <TimelineItem status="done">
        <TimelineHeading>
            <div className="flex justify-between items-start p-4">
                <div className="flex items-start gap-4 text-sm">
                    <div className="grid gap-1">
                        <div className="font-semibold">{mail.name}</div>
                        <div className="line-clamp-1 text-xs">{mail.subject}</div>
                        <div className="line-clamp-1 text-xs">
                            <span className="font-medium">Reply-To:</span> {mail.email}
                        </div>
                    </div>
                </div>
                <div className="flex">
                    {mail.date && (
                        <div className="ml-auto text-xs text-muted-foreground">
                            {format(new Date(mail.date), "PPpp")}
                        </div>
                    )}
                </div>
            </div>
        </TimelineHeading>
        <TimelineDot
            status="custom"
            customIcon={
                <Avatar>
                    <AvatarImage alt={mail.name} />
                    <AvatarFallback>
                        {mail.name
                            .split(" ")
                            .map((chunk) => chunk[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
            }
        />
        {showLine && <TimelineLine />} {/* Conditionally render TimelineLine */}
        <TimelineContent>
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">{mail.text}</div>
        </TimelineContent>
    </TimelineItem>
);

export default MailTimelineItem;
