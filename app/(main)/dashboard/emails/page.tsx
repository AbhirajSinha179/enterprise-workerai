"use client";
import { CalendarIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { getTargetIdByUser } from "@/components/dashboard/recent-sales";
import { ScheduledEmail, scheduledEmailResponseSchema } from "@/types/interface";
import Loading from "./loading";

async function fetchScheduledEmails(targetId: string, limit = 10, offset = 0): Promise<ScheduledEmail[]> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/scheduled/${targetId}?limit=${limit}&offset=${offset}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    const data = await res.json();
    const result = scheduledEmailResponseSchema.safeParse(data);

    if (!result.success) throw new Error("Invalid data format");
    return result.data.scheduledEmails;
  } catch (error: any) {
    throw new Error(`Error fetching scheduled emails: ${error.message}`);
  }
}

export default function Emails() {
  const { userId } = useAuth();
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const hasMore = useRef(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreEmails = async () => {
    if (!userId || !hasMore.current) return;
    try {
      const targetId = await getTargetIdByUser(userId);
      if (!targetId) return;

      const fetchedEmails = await fetchScheduledEmails(targetId, 10, offset);
      if (fetchedEmails.length === 0) hasMore.current = false;

      setScheduledEmails((prev) => [...prev, ...fetchedEmails]);
      setOffset((prevOffset) => prevOffset + fetchedEmails.length);
    } catch (error) {
      toast.error("Error fetching scheduled emails.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreEmails();
  }, [userId]);

  const lastEmailRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        const firstEntry = entries[0];
        if (firstEntry && firstEntry.isIntersecting && hasMore.current) {
          setLoading(true);
          loadMoreEmails();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, userId]
  );


  if (loading && scheduledEmails.length === 0) {
    return <Loading />;
  }

  return (
    <ContentLayout title="Scheduler">
      <div className="space-y-4">
        {scheduledEmails.length === 0 ? (
          <>
            <div className="mt-6 flex w-full items-center justify-between">
              <h1 className="text-2xl font-bold">Scheduled Emails</h1>
            </div>
            <EmptyState
              headerMessage="No emails scheduled at the moment!"
              icon={<CalendarIcon size={80} />}
            />
          </>
        ) : (
          <ScheduledEmailList emails={scheduledEmails} lastEmailRef={lastEmailRef} />
        )}
      </div>
    </ContentLayout>
  );
}
