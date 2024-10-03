"use client";
import { CalendarIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { scheduledEmailResponseSchema } from "@/types/interface";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getTargetIdByUser } from "@/components/dashboard/recent-sales";
import { ScheduledEmail } from "@/types/interface";
import Loading from "./loading";


async function fetchScheduledEmails(targetId: string): Promise<ScheduledEmail[]> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/scheduled/${targetId}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    const result = scheduledEmailResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error("Invalid data format");
    }

    return result.data.scheduledEmails;
  } catch (error: any) {
    throw new Error(`Error fetching scheduled emails: ${error.message}`);
  }
}



export default function Emails() {
  const { userId } = useAuth();
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        toast.error("Error finding user ID");
        setLoading(false);
        return;
      }

      try {
        // const targetId = await getTargetIdByUser(userId);
        const targetId = "a09130b9-5453-403b-a02f-8e936bce145b";

        if (!targetId) {
          setLoading(false);
          return;
        }

        const fetchedEmails = await fetchScheduledEmails(targetId);
        setScheduledEmails(fetchedEmails);
      } catch (error) {
        toast.error("Error fetching scheduled emails.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <Loading></Loading>
    );
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
          <ScheduledEmailList emails={scheduledEmails} />
        )}
      </div>
    </ContentLayout>
  );
}
