"use-client"
import { formatDistanceToNow } from "date-fns";
import { useMail } from "@/contexts/MailContext";
import { cn } from "@/lib/utils";
import { Thread } from "@/types/interface";
import { MailListProps } from "@/types/interface";


export function MailList({ items, lastEmailRef }: MailListProps) {
  const { config, setConfig } = useMail();

  return (
    <div className="h-[75vh] overflow-y-auto p-4 pt-0">
      {items.map((thread: Thread, index) => {
        const { threadId, emails } = thread;
        const latestEmail = emails?.[emails.length - 1] ?? null;
        const latestDate = latestEmail?.sendAt;

        return (
          <div
            key={threadId}
            ref={index === items.length - 1 ? lastEmailRef : null}
          >
            <button
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
              <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-md">
                  {emails?.[0]?.recipient ?? "No Recipient"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {latestDate &&
                    formatDistanceToNow(new Date(latestDate), {
                      addSuffix: true,
                    })}
                </span>
              </div>
              <span className="text-xs font-medium">
                {emails?.[0]?.subject ?? "No Subject"}
              </span>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {emails?.[0]?.body ? emails[0].body.substring(0, 300) : "No Body"}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
}
