// app/(main)/dashboard/inbox/page.tsx
import { Inbox } from "@/components/inbox/mail";
import { ContentLayout } from "@/components/layout/content-layout";
import { getData } from "@/lib/data-fetching";

export default async function InboxPage() {
  const threadData = await getData();

  return (
    <ContentLayout title="Inbox">
      <Inbox threads={threadData} />
    </ContentLayout>
  );
}
