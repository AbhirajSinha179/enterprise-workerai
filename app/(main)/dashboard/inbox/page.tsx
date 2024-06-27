import { Inbox } from "@/components/inbox/mail";
import { ContentLayout } from "@/components/layout/content-layout";
import { threadsSchema } from "@/types/interface"

async function getData() {
  const res = await fetch("http://localhost:3000/threads")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  const result = threadsSchema.safeParse(data)
  if (!result.success) {
    console.error(result.error)
    throw new Error("Invalid data format")
  }
  return result.data
}

export { getData }

export default async function InboxPage() {
  const threadData = await getData();

  return (
    <ContentLayout title="Inbox">
      <Inbox threads={threadData} />
    </ContentLayout>
  );
}
