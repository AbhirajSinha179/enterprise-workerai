// import Link from "next/link"
import { threads } from "@/components/inbox/data"
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

export default function InboxPage() {
  return (
    <>
      <ContentLayout title="Inbox">
        <Inbox threads={threads} />
      </ContentLayout>
    </>
  )
}
