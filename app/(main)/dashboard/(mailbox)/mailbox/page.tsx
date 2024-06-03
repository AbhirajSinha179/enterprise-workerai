import Link from "next/link"
import { ContentLayout } from "@/components/layout/content-layout"
import { DataTable } from "@/components/leads/data-table"
import { columns } from "@/components/mailbox/columns"
import { Button } from "@/components/ui/button"
import mailsData from "../data/mailsData"

async function getMails() {
  return mailsData
}

export default async function MailboxPage() {
  const tasks = await getMails()

  return (
    <ContentLayout title="Mailbox">

      <div className="">
        <Link href="/dashboard/mailbox/form">
          <div className="flex  justify-between">
            <h1 className="text-2xl font-bold ">Mailbox</h1>
            <Button size="sm">
              <div className=" font-semibold text-sm">
                Connect a Mail Box
              </div>
            </Button>
          </div>
        </Link>
      </div>

      <DataTable data={tasks} columns={columns} isActionButton={false} />
    </ContentLayout>
  );
}