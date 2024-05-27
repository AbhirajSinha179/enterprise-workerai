import { z } from "zod"
import { promises as fs } from "fs"
import path from "path"
import { ContentLayout } from "@/components/layout/content-layout"
import { DataTable } from "@/components/leads/data-table"
import { columns } from "@/components/mailbox/columns"
import { mailsSchema } from "../data/schema"

async function getMails() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/app/(site)/(mailbox)/data/mails.json")
  )
  const mails = JSON.parse(data.toString())

  return z.array(mailsSchema).parse(mails)
}

export default async function MailboxPage() {
  const tasks = await getMails()

  return (
    <ContentLayout title="Mailbox">
      <DataTable data={tasks} columns={columns} isActionButton={false} />
    </ContentLayout>
  );
}