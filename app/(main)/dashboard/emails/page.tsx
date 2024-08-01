import { CalendarIcon, ClockIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { EmailList } from "@/components/scheduler/email-list";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnscheduledEmailThread, unscheduledEmailResponseSchema, scheduledEmailResponseSchema, ScheduledEmail } from "@/types/interface";


export async function fetchUnscheduledEmails(targetId: string): Promise<UnscheduledEmailThread[]> {
  const url = `${process.env.API_BASE_URL}/emails/target/${targetId}`;

  try {
    const res = await fetch(url);
    console.log(`Response status for get unscheduled email: ${res.status}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    const emails = transformData(data);
    const result = unscheduledEmailResponseSchema.safeParse(emails);

    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid data format");
    }

    return result.data;
  } catch (error: unknown) {
    handleFetchError(error);
    throw error;
  }
}

function transformData(data: any): UnscheduledEmailThread[] {
  return data.map((item: any) => ({
    id: item.Emails.id,
    threadId: item.Threads.id,
    subject: item.Emails.subject,
    body: item.Emails.body,
    sender: item.Emails.recipient,
    createdAt: item.Emails.createdAt,
    updatedAt: item.Threads.createdAt,
    status: item.Threads.status,
  }));
}

function handleFetchError(error: unknown) {
  if (error instanceof Error) {
    console.error("Error fetching data:", error.message);
  } else {
    console.error("Unknown error fetching data:", error);
  }
}

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
    console.log("RESULT FROM SCHEDULED : ", result);
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
  let scheduledEmails: ScheduledEmail[] = [];
  let unscheduledEmails: UnscheduledEmailThread[] = [];

  try {
    unscheduledEmails = await fetchUnscheduledEmails("1c1108a8-9108-42e2-8177-4e655bbc87ed");
    scheduledEmails = await fetchScheduledEmails("1c1108a8-9108-42e2-8177-4e655bbc87ed");
    console.log("Response is from get scheduled email API", scheduledEmails);
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

        <TabsContent value="scheduled" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}