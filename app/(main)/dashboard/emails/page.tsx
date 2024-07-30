import { CalendarIcon, ClockIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { EmailList } from "@/components/scheduler/email-list";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnscheduledEmailThread, unscheduledEmailResponseSchema } from "@/types/interface";


export async function fetchUnscheduledEmails(targetId: string) {
  try {
    // const url = `${process.env.API_BASE_URL}/emails/target/{targetId}`;
    const url = "http://localhost:3000/unschedularemails";
    const res = await fetch(url);
    // console.log("Response is from get Unscheduled email API  : ", res)
    // console.log("ENDPOINT IS ", url);
    console.log(`Response status for get unscheduled email:  ${res.status}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    const result = unscheduledEmailResponseSchema.safeParse(data);

    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid data format");
    }

    return result.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export default async function Emails() {
  let unscheduledEmails: UnscheduledEmailThread[] = [];
  try {
    unscheduledEmails = await fetchUnscheduledEmails("7feaa854-1f76-423d-a209-fce0d2781dfc");
    console.log("Response is from get Unscheduled email API", unscheduledEmails)
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <ContentLayout title="Scheduler">
      <Tabs defaultValue="pending" className="mt-4 space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {unscheduledEmails.length === 0 ? (
            <div>
              <div className="mt-6 flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold">Pending Emails</h1>
              </div>
              <EmptyState
                headerMessage="No pending Emails"
                containerMessage="Go to Scheduled to check currently scheduled emails"
                icon={<ClockIcon size={80} />}
              />
            </div>
          ) : (
            <EmailList emails={unscheduledEmails} />
          )}
        </TabsContent>

        {/* <TabsContent value="scheduled" className="space-y-4">
          {scheduledEmails.length === 0 ? (
            <div>
              <div className="mt-6 flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold">Scheduled Emails</h1>
              </div>
              <EmptyState
                headerMessage="No emails scheduled at the moment!"
                icon={<CalendarIcon size={80} />}
              />
            </div>
          ) : (
            <ScheduledEmailList emails={scheduledEmails} />
          )}
        </TabsContent> */}
      </Tabs>
    </ContentLayout>
  );
}