import { formatDistanceToNow } from "date-fns";
import { useMail } from "@/contexts/MailContext";
import { cn } from "@/lib/utils";
import { Thread } from "@/types/interface";
import { MailListProps } from "@/types/interface";
import { ScrollArea } from "../ui/scroll-area";
import { SkeletonLoaderInbox } from "./skeleton-loader";

export function MailList({ items, lastEmailRef, loading }: MailListProps) {
  const { config, setConfig } = useMail();

  const normalizeDate = (dateString: string): string => {
    let normalized = dateString.trim().replace(" ", "T");

    if (!normalized.endsWith("Z") && !/[\+\-]\d{2}:\d{2}$/.test(normalized)) {
      normalized += "+00:00";
    }

    normalized = normalized.replace(/\+\+/, "+");

    return normalized;
  };

  return (
    <ScrollArea className="h-[75vh] p-4 pt-0">
      {loading && items.length === 0 ? (
        <SkeletonLoaderInbox count={20} />
      ) : (
        items.map((thread: Thread, index) => {
          const { threadId, emails } = thread;
          const latestEmail = emails?.[0] ?? null;
          const latestDate = latestEmail?.sendAt;

          // console.log("LATEST DATE : ", latestDate);

          let formattedDate = "";
          if (latestDate) {
            try {
              const normalizedDate = normalizeDate(latestDate);
              // console.log("NORMALIZED DATE : ", normalizedDate);

              const parsedDate = new Date(normalizedDate);
              // console.log("PARSED DATE : ", parsedDate);

              if (!isNaN(parsedDate.getTime())) {
                formattedDate = formatDistanceToNow(parsedDate, {
                  addSuffix: true,
                });
              } else {
                console.error("Invalid parsed date:", normalizedDate);
                formattedDate = "Invalid Date";
              }
            } catch (error) {
              console.error("Error parsing date:", error);
              formattedDate = "Invalid Date";
            }
          }

          return (
            <div
              key={threadId}
              ref={index === items.length - 1 ? lastEmailRef : null}
            >
              <button
                className={cn(
                  "flex flex-col w-full items-start gap-2 rounded-lg border p-3 my-2 text-left text-sm transition-all hover:bg-muted",
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
                    {formattedDate}
                  </span>
                </div>
                <span className="text-xs font-medium">
                  {emails?.[0]?.subject ?? "No Subject"}
                </span>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {emails?.[0]?.body
                    ? emails[0].body.substring(0, 300)
                    : "No Body"}
                </p>
              </button>
            </div>
          );
        })
      )}
      {loading && items.length > 0 && (
        <div className="mt-4">
          <SkeletonLoaderInbox count={3} />
        </div>
      )}
    </ScrollArea>
  );
}
