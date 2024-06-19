// import Link from "next/link"
// import { threads } from "@/components/inbox/data"
import { Inbox } from "@/components/inbox/mail"
import { ContentLayout } from "@/components/layout/content-layout"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"

type Email = {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];
};

type Thread = {
  threadid: string;
  thread: Email[];
};



async function getData() {
  const res = await fetch('http://localhost:3000/threads')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json();
  return data as Thread[]
}

export default async function InboxPage() {
  const threadData: Thread[] = await getData();
  // console.log("resposne sssss: ", data)
  // console.log("threadssss: ", threads)

  return (
    <>
      <ContentLayout title="Inbox">
        <Inbox threads={threadData} />
      </ContentLayout>
    </>
  )
}
