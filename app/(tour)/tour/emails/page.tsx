"use client";
import { CalendarIcon } from "lucide-react";
import EmptyState from "@/components/global/empty-state";
import { ContentLayout } from "@/components/layout/content-layout";
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails";
import { ScheduledEmail } from "@/types/interface";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { dummyScheduledEmails } from "@/lib/dummy";

// Define the dummyScheduledEmails constant
// const dummyScheduledEmails: ScheduledEmail[] = [
//   {
//     email: {
//       id: "0f307337-e130-4c11-8dfe-d562cc159aee",
//       subject: "Subject: Elevate CSAT by 20%, worth a chat?",
//       recipient: "shubam.gupta@pocketfm.com",
//       createdAt: "2024-10-08 08:02:11.397",
//       sendAt: "2024-10-15 06:07:01+00",
//       body: null,
//       isFollowUp: true,
//       approved: true,
//       draftId: null,
//       messageId: null,
//       emailSent: false,
//       threadId: "2c0c55cf-02c1-49ae-86d7-713634d8ec07",
//       opened: false,
//       clicked: false,
//       replied: false,
//       bounced: null,
//     },
//     lead: {
//       id: "b9e5ad74-27b4-42aa-a5da-867eb738d990",
//       email: "shubam.gupta@pocketfm.com",
//       imgUrl: "https://media.licdn.com/dms/image/v2/D5603AQFE5RX-SjROfg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1705325526381?e=2147483647&v=beta&t=kTYl6tJVP748H3BsnX2i3MRv2yt98uY2LHqdG9I8XG8",
//       firstName: "Shubam",
//       lastName: "Gupta",
//       seniority: null,
//       country: "India",
//       linkedin: "http://www.linkedin.com/in/shubamgupta24",
//       city: "Bengaluru",
//       state: "Karnataka",
//       EmailAddStatus: "UNVERIFIED",
//       timezone: "Asia/Kolkata",
//       companyId: "dc28f7c2-ae15-4ecc-9a59-b28ad5b3375e",
//       blackListed: null,
//       enriched: "COMPLETE",
//       enrichedAt: "2024-09-30 13:19:31.904",
//     },
//     senderId: "27ce005f-0c13-4d46-9bfd-50e93888c133",
//   },
//   // ... Add the other dummy emails here
// ];

export default function Emails() {
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating the loading and setting the dummy emails
    setTimeout(() => {
      setScheduledEmails(dummyScheduledEmails);
      setLoading(false);
    }, 1000); // Simulate API loading with a delay
  }, []);

  if (loading) {
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
          <ScheduledEmailList emails={scheduledEmails} />
        )}
      </div>
    </ContentLayout>
  );
}
