import { CheckCircledIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { ScheduledEmail } from "@/types/interface";

export function ScheduledEmailList({ emails }: { emails: ScheduledEmail[] }) {
  const renderStatusIcons = (status: string) => {
    return (
      <div className="flex items-center space-x-1 my-1">
        {Array.from({ length: parseInt(status) }).map((_, index) => (
          <CheckCircledIcon key={index} width={20} height={20} />
        ))}
      </div>
    );
  };

  return (
    <main className="flex w-full flex-col items-center">
      <div className="mt-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Scheduled Emails</h1>
      </div>
      <ul className="my-4 w-full space-y-4">
        {emails.map((item) => (
          <div
            key={item.email.id}
            className={cn("flex w-full flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all bg-card")}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex justify-between">
                <div className="text-2xl font-semibold flex">{item.email.recipient}</div>
                <div className="flex">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          {item.email.emailSent && renderStatusIcons('1')}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.email.emailSent ? "Email sent" : "Email not sent"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="flex items-center h-6 mx-2">
                    <Separator orientation="vertical" />
                  </div>
                  <div className={cn("ml-auto")}>
                    {item.email.sendAt ? format(new Date(item.email.sendAt), "PP") : "Not Scheduled"}
                  </div>

                </div>
              </div>
              <div className="text-md font-medium">{item.email.subject}</div>
            </div>
            <div className="text-xs text-foreground whitespace-pre-wrap">{item.email.body}</div>
          </div>
        ))}
      </ul>
    </main>
  );
}
