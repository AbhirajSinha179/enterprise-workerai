import { CheckCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { ScheduledEmail } from "@/types/interface";
import { reject } from "lodash";

function stripHtmlTags(input: string): string {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.body.textContent || "";
}

export function ScheduledEmailList({
  emails,
  lastEmailRef,
}: {
  emails: ScheduledEmail[];
  lastEmailRef?: (node: HTMLDivElement) => void;
}) {
  const renderStatusIcons = (status: string) => {
    return (
      <div className="flex items-center space-x-1 my-1">
        {Array.from({ length: parseInt(status) }).map((_, index) => (
          <CheckCircledIcon key={index} width={20} height={20} className="text-green-500" />
        ))}
      </div>
    );
  };

  return (
    <main className="flex w-full flex-col items-center">
      <div className="mt-6 flex w-full items-center justify-between px-4">
        <h1 className="text-2xl font-bold">Scheduled Emails</h1>
      </div>
      <ul className="my-6 w-full space-y-4 px-4">
        {emails.map((item, index) => {
          // Sanitize the email body to remove HTML tags
          let sanitizedBody: string | string[];
          if (typeof item.email.body === "string") {
            sanitizedBody = stripHtmlTags(item.email.body); // Handle single string
          } else if (Array.isArray(item.email.body)) {
            const filteredBody = reject(item.email.body, (content: string) => content.includes("<a>")); // Filter out unwanted content
            sanitizedBody = filteredBody.map((content: string) => stripHtmlTags(content)); // Remove HTML tags
          } else {
            sanitizedBody = ""; // Fallback for unexpected types
          }

          return (
            <div
              key={item.email.id}
              ref={index === emails.length - 1 ? lastEmailRef : null}
              className="flex w-full flex-col items-start gap-3 rounded-lg border bg-card p-5 text-left shadow-sm transition-all"
            >
              <div className="flex w-full flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <div className="text-lg font-semibold">To: {item.email.recipient}</div>
                  <div className="flex ">
                    <Separator orientation="vertical" className="h-6" />
                    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-pointer text-sm text-foreground mx-3">Details</span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" sideOffset={4} align="end" className="mx-2">
                          <div className="text-left space-y-1">
                            <div>
                              <span className="font-medium">To:</span> {item.email.recipient}
                            </div>
                            <div>
                              <span className="font-medium">From:</span> {item.senderEmail}
                            </div>
                            <div>
                              <span className="font-medium">Date:</span>{" "}
                              {item.email.sendAt ? format(new Date(item.email.sendAt), "PP") : "Not Scheduled"}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span>{" "}
                              {item.email.sendAt ? format(new Date(item.email.sendAt), "p") : "Not Scheduled"}
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="">Subject:</span>
                    <span className="text-md font-medium">{item.email.subject}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm whitespace-pre-wrap">
                {Array.isArray(sanitizedBody)
                  ? sanitizedBody.join("\n") // Join array elements with line breaks if the body is an array
                  : sanitizedBody}
              </div>
            </div>
          );
        })}
      </ul>
    </main>
  );
}
