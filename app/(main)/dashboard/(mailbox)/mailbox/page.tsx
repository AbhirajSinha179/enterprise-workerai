"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ContentLayout } from "@/components/layout/content-layout"
import { DataTable } from "@/components/leads/data-table"
import { columns } from "@/components/mailbox/columns"
import { Button } from "@/components/ui/button"
import mailsData from "../data/mailsData"

function getMails() {
  return mailsData

}

export default function MailboxPage() {
  const [mails, setMails] = useState(getMails())
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const domain = searchParams.get('domain')
  const warmupCapacity = searchParams.get('warmupCapacity')

  useEffect(() => {
    if (id && name && email && domain && warmupCapacity) {
      const newMail = {
        id,
        name,
        email,
        domain,
        warmupCapacity,
      }
      console.log("New Mail Data: ", newMail)

      setMails(prevMails => [...prevMails, newMail])
    }
  }, [id, name, email, domain, warmupCapacity])

  return (
    <ContentLayout title="Mailbox">
      <div className="">
        <Link href="/dashboard/mailbox/form">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Mailbox</h1>
            <Button size="sm">
              <div className="font-semibold text-sm">
                Connect a Mail Box
              </div>
            </Button>
          </div>
        </Link>
      </div>

      <DataTable data={mails} columns={columns} isActionButton={false} />
    </ContentLayout>
  )
}
