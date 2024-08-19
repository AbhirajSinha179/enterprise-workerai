import { CalendarIcon, ClockIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { EmailList } from "@/components/scheduler/email-list";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnscheduledEmailThread, unscheduledEmailResponseSchema, scheduledEmailResponseSchema, ScheduledEmail } from "@/types/interface";
// import { currentUser } from '@clerk/nextjs/server';
// import { useUser } from '@clerk/clerk-react';
// import { useAuth } from '@clerk/nextjs';
export async function fetchScheduledEmails(targetId: string): Promise<ScheduledEmail[]> {
  try {
    const url = `${process.env.API_BASE_URL}/emails/scheduled/${targetId}`;
    const res = await fetch(url);
    console.log(`Response status for get scheduled email: ${res.status}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    const result = scheduledEmailResponseSchema.safeParse(data);
    // console.log("RESULT FROM SCHEDULED : ", result);
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

export default async function Emails() {
  const scheduledEmails = await fetchScheduledEmails("1c1108a8-9108-42e2-8177-4e655bbc87ed");
  // const { userId, isLoaded, isSignedIn } = useAuth()
  // console.log("USER ID FOUND OF THE USER : ", userId)
  // console.log("Response is from get scheduled email API", scheduledEmails);
  return (
    <ContentLayout title="Scheduler">
      <Tabs defaultValue="pending" className="mt-4 space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <EmailList targetId="1c1108a8-9108-42e2-8177-4e655bbc87ed" />
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