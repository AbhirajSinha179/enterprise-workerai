import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export function ScheduledEmailList({ emails }: any) {
  const renderStatusIcons = (status: number) => {
    return (
      <div className="flex items-center space-x-1  my-1">
        {Array.from({ length: status }).map((_, index) => (
          <CheckCircledIcon key={index} width={20} height={20} />
        ))}
      </div>
    )
  }

  return (
    <main className="flex w-full flex-col items-center">
      <div className="mt-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Scheduled Emails</h1>
      </div>
      <ul className="my-4 w-full space-y-4">
        {emails.map((item: any) => (
          <div
            key={item.id}
            className={cn("flex w-full flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all")}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="text-2xl font-semibold">{item.recipient}</div>
                <div className={cn("ml-auto")}>
                  {format(new Date(item.date), "PP")}
                </div>
              </div>
              <div className="text-md font-medium">{item.subject}</div>
            </div>
            <div className="text-xs text-muted-foreground">{item.body}</div>
            <div>
              {item.status && renderStatusIcons(item.status)}
            </div>
          </div>
        ))}
      </ul>
    </main>
  )
}
