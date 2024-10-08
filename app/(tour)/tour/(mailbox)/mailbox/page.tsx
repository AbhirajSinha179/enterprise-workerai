import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { ContentLayout } from "@/components/layout/content-layout"
import { DataTable } from "@/components/leads/data-table"
import { columns } from "@/components/mailbox/columns"
import { Button } from "@/components/ui/button"
import { dummyMailbox } from "@/lib/dummy"


export default async function MailboxPage() {
  const mails = dummyMailbox
  // console.log("MAILS INFO :", mails)
  if (!mails) {
    return (
      <ContentLayout title="Mailbox">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex items-center justify-center font-bold">
            Unable to fetch data. Please try again later.
          </div>
        </div>
      </ContentLayout>
    )
  }
  return (
    <ContentLayout title="Mailbox">
      <div className="my-8 flex justify-between">
        <h1 className="text-2xl font-bold">Mailbox</h1>
        <Link href="/dashboard/mailbox/form">
          <Button size="sm">
            <div className="text-sm font-semibold">Connect a Mail Box</div>
          </Button>
        </Link>
      </div>
      {/* @ts-ignore */}
      <DataTable data={mails} columns={columns} isActionButton={false} />
    </ContentLayout>
  )
}
