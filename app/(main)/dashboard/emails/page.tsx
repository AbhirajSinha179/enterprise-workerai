import { CalendarIcon, ClockIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { EmailList } from "@/components/scheduler/email-list";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchedularEmail, schedularEmailSchema } from "@/types/interface";

async function getData(): Promise<SchedularEmail[]> {
  const res = await fetch("http://localhost:3000/schedular");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const result = schedularEmailSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid data format");
  }
  return result.data;
}

export default async function Emails() {
  let emails: SchedularEmail[] = [];
  try {
    emails = await getData();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  const pendingEmails = emails.filter(email => !email.scheduled);
  const scheduledEmails = emails.filter(email => email.scheduled);

  return (
    <ContentLayout title="Scheduler">
      <Tabs defaultValue="pending" className="mt-4 space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingEmails.length === 0 ? (
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
            <EmailList emails={pendingEmails} />
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
