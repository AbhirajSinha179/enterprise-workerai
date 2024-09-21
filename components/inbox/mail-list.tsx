import { formatDistanceToNow } from "date-fns"
import { ComponentProps } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMail } from "@/contexts/MailContext"
import { cn } from "@/lib/utils"
import { MailListProps, Thread } from "@/types/interface"

export function MailList({ items }: MailListProps) {
  const { config, setConfig } = useMail()

  return (
    <ScrollArea className="h-[75vh]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((thread: Thread) => {
          const { threadId, emails, lead, replies } = thread

          // Safely handle null or undefined values
          const latestEmail = emails?.[emails.length - 1] ?? null;
          const latestReply = replies?.[replies.length - 1] ?? null;
          const latestDate = latestEmail?.sendAt || latestReply?.date;

          return (
            <button
              key={threadId}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-muted",
                config.selected === thread.threadId && "bg-muted"
              )}
              onClick={() =>
                setConfig((prevConfig) => ({
                  ...prevConfig,
                  selected: threadId,
                }))
              }
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="text-md font-semibold">
                      {lead?.firstName} {lead?.lastName}
                    </div>
                    {!emails?.[0]?.opened && <span className="flex size-2 rounded-full bg-blue-600" />}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      config.selected === threadId ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {latestEmail && latestDate &&
                      formatDistanceToNow(new Date(latestDate), {
                        addSuffix: true,
                      })}
                  </div>
                </div>
                <div className="text-xs font-medium">
                  {emails?.[0]?.subject ?? "No Subject"}
                </div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {emails?.[0]?.body ? emails[0].body.substring(0, 300) : "No Body"}
              </div>
              {/* {thread.thread[0]?.labels.length ? (
              <div className="flex items-center gap-2">
                {thread.thread[0].labels.map((label: string) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
            </button>
          )
        })}
      </div>
    </ScrollArea>
  )
}

// function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>["variant"] {
//   if (["work"].includes(label.toLowerCase())) {
//     return "default";
//   }

//   if (["personal"].includes(label.toLowerCase())) {
//     return "outline";
//   }

//   return "secondary";
// }
