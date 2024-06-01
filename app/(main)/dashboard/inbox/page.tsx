import Link from "next/link"
import { mails } from "@/components/inbox/data"
import { Inbox } from "@/components/inbox/mail"
import { ContentLayout } from "@/components/layout/content-layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function InboxPage() {
  return (
    <>
      <ContentLayout title="Inbox">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Inbox</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Inbox mails={mails} />
      </ContentLayout>
    </>
  )
}
