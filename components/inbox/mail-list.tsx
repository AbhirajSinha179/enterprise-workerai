import { formatDistanceToNow } from "date-fns"
import { ComponentProps } from "react"

// import { Mail } from "@/components/inbox/data"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
import { useMail } from "@/contexts/MailContext"
import { cn } from "@/lib/utils"
import { Card } from "../ui/card"

interface MailListProps {
  items: any
}

export function MailList({ items }: MailListProps) {
  const { config, setConfig } = useMail()

  return (
    <ScrollArea className="h-[75vh]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((thread: any) => (
          <Card>
            <button
              key={thread.threadid}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                config.selected === thread.threadid && "bg-muted"
              )}
              onClick={() =>
                setConfig((prevConfig) => ({
                  ...prevConfig,
                  selected: thread.threadid,
                }))
              }
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="text-md font-semibold">{thread.thread[0].name}</div>
                    {!thread.thread[0].read && <span className="flex size-2 rounded-full bg-blue-600" />}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      config.selected === thread.id ? "text-foreground" : "text-foreground"
                    )}
                  >
                    {formatDistanceToNow(new Date(thread.thread[0].date), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium">{thread.thread[0].subject}</div>
              </div>
              <div className="line-clamp-2 text-xs text-foreground">{thread.thread[0].text.substring(0, 300)}</div>
              {thread.thread[0].labels.length ? (
                <div className="flex items-center gap-2">
                  {thread.thread[0].labels.map((label: string) => (
                    <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                      {label}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </button>

          </Card>

        ))}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default"
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline"
  }

  return "secondary"
}
