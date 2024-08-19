"use client";
import { CalendarIcon, ClockIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { EmailList } from "@/components/scheduler/email-list";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scheduledEmailResponseSchema, ScheduledEmail } from "@/types/interface";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getTargetIdByUser } from "@/components/dashboard/recent-sales";

export async function fetchScheduledEmails(targetId: string): Promise<ScheduledEmail[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/scheduled/${targetId}`;
    const res = await fetch(url);
    console.log(`Response status for get scheduled email: ${res.status}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    const result = scheduledEmailResponseSchema.safeParse(data);
    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid data format");
    }

    return result.data.scheduledEmails;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export default function Emails() {
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);
  const [targetId, setTargetId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        console.log("USER ID NOT FOUND")
        toast.error("Error finding user ID");
        setIsLoading(false);
        return;
      }

      try {
        const targetId = await getTargetIdByUser(userId);
        // const targetId = "1c1108a8-9108-42e2-8177-4e655bbc87ed";
        console.log("TARGET ID : ", targetId)
        setTargetId(targetId);
        if (!targetId) {
          setIsLoading(false);
          return;
        }

        const scheduledEmails = await fetchScheduledEmails(targetId);
        setScheduledEmails(scheduledEmails);
      } catch (error) {
        toast.error("Error fetching scheduled emails.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <ContentLayout title="Scheduler">
      <Tabs defaultValue="pending" className="mt-4 space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {/* <EmailList targetId={targetId || "1c1108a8-9108-42e2-8177-4e655bbc87ed"} /> */}
          <EmailList targetId={targetId || ""} />
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}