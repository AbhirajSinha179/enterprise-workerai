import { CalendarIcon, ClockIcon } from "lucide-react";
// import Link from "next/link";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { EmailList } from "@/components/scheduler/email-list";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getEmails() {
  // const res = await fetch("https://...", { cache: "no-store" });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  const res = {
    json: async () => [
      { id: 2, subject: "Hi", body: "Hi, world!", date: "2024-01-02", scheduled: true, recipient: "rohit@workerai.co", status: "1" },
      { id: 4, subject: "Hola", body: "Hola, world!", date: "2024-01-04", scheduled: true, recipient: "raj@workerai.co", status: "2" },
      { id: 3, subject: "Hey", body: "Hey, world!", date: "2024-01-03", scheduled: false, recipient: "ayan@workerai.co", status: "3" },
      { id: 1, subject: "Hello", body: "Hello, world!", date: "2024-01-01", scheduled: false, recipient: "anshuman@workerai.co", status: "1" },
      { id: 5, subject: "Namaste", body: "Namaste, world!", date: "2024-01-05", scheduled: false, recipient: "abhiraj@workerai.co", status: "2" },
      { id: 6, subject: "Jonpur", body: "DabDab", date: "2024-01-06", scheduled: false, recipient: "ArvindBhaiya@workerai.co", status: "3" }
    ],
  }

  return res.json();
}

export default async function Emails() {
  const emails = await getEmails();
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
                headerMessage="No pending Emails "
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