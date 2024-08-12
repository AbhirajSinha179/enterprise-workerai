import { CalendarIcon, ClockIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { EmailList } from "@/components/scheduler/email-list";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnscheduledEmailThread, unscheduledEmailResponseSchema, scheduledEmailResponseSchema, ScheduledEmail } from "@/types/interface";


export async function fetchUnscheduledEmails(targetId: string): Promise<UnscheduledEmailThread[]> {
  const url = `${process.env.API_BASE_URL}/emails/unscheduled/${targetId}`;
  // console.log("URL IS : ", url);

  try {
    const res = await fetch(url);
    console.log(`Response status for get unscheduled email: ${res.status}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    // console.log("DATA : ", data);
    const emails = transformData(data);
    // console.log("TRANSFORMED DATA : ", emails);
    const result = unscheduledEmailResponseSchema.safeParse(emails);
    // console.log("PARSE RESULT : ", result);

    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid data format");
    }

    // console.log("THIS IS THE RESPONSE FROM SCHEDULER : ", result.data);
    return result.data;
  } catch (error: unknown) {
    handleFetchError(error);
    throw error;
  }
}


function transformData(data: any): UnscheduledEmailThread[] {
  return data.map((item: any) => ({
    id: item.email.id,
    threadId: item.email.threadId,
    subject: item.email.subject,
    body: item.email.body,
    sender: item.email.recipient,
    createdAt: item.email.createdAt,
    updatedAt: item.email.updatedAt ?? null, // or other appropriate field if there's no `updatedAt`
    status: item.lead.EmailAddStatus, // Assuming this is a status field
    opened: item.email.opened,
    clicked: item.email.clicked,
    replied: item.email.replied,
    bounced: item.email.bounced,
    leadInfo: {
      id: item.lead.id,
      email: item.lead.email,
      firstName: item.lead.firstName,
      lastName: item.lead.lastName,
      seniority: item.lead.seniority,
    },
    senderId: item.senderId
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
  const unscheduledEmails = await fetchUnscheduledEmails("1c1108a8-9108-42e2-8177-4e655bbc87ed");
  const scheduledEmails = await fetchScheduledEmails("1c1108a8-9108-42e2-8177-4e655bbc87ed");
  console.log("Response is from get scheduled email API", scheduledEmails);

  if (!unscheduledEmails || !scheduledEmails) {
    return null;
  }

  return (
    <ContentLayout title="Scheduler">
      <Tabs defaultValue="pending" className="mt-4 space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {(!unscheduledEmails || unscheduledEmails.length === 0) ? (
            <>
              <div className="mt-6 flex w-full items-center justify-between">
                <h1 className="text-2xl font-bold">Pending Emails</h1>
              </div>
              <EmptyState
                headerMessage="No pending Emails"
                containerMessage="Go to Scheduled to check currently scheduled emails"
                icon={<ClockIcon size={80} />}
              />
            </>
          ) : (
            <EmailList emails={unscheduledEmails} />
          )}
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