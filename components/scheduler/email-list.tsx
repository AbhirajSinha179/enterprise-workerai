"use client"

import { format } from "date-fns"
import { toast } from "sonner"
import EmailItem from "./email-item"
import { Button } from "../ui/button"

export function EmailList({ emails }: any) {
  const handleApprove = async ({ emailId }: { emailId: string }) => {
    console.log("Approved")
    toast("Scheduled the email", {
      description: format(new Date(), "PPpp") + " " + emailId,
    })
    // POST request
    emails = emails.filter((email: any) => email.recipient !== emailId)
  }

  const handleEdit = async ({ emailId, subject, body }: { emailId: string; subject: string; body: string }) => {
    console.log("Approved")
    toast("Edited the email", {
      description: format(new Date(), "PPpp"),
    })
    // PUT request
  }

  const handleDelete = async ({ emailId }: { emailId: string }) => {
    console.log("Approved")
    toast("Deleted the email", {
      description: format(new Date(), "PPpp"),
    })
    // DELETE request
  }

  const handleApproveAll = async () => {
    console.log("Approve All")
    toast("Pending emails have been scheduled", {
      description: format(new Date(), "PPpp"),
    })
  }

  return (
    <main className="flex w-full flex-col items-center">
      <div className="mt-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pending Emails</h1>
        <Button onClick={handleApproveAll}>Approve All</Button>
      </div>
      <ul className="my-4 w-full space-y-4">
        {emails.map((item: any) => (
          <EmailItem
            handleApprove={handleApprove}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={item.id}
            item={item}
          ></EmailItem>
        ))}
      </ul>
    </main>
  )
}
