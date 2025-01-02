"use client"
// import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { ContentLayout } from "@/components/layout/content-layout"
import { DataTable } from "@/components/leads/data-table"
import { columns } from "@/components/mailbox/columns"
import { Button } from "@/components/ui/button"
import { useTargetContext } from "@/contexts/TargetIdContext";
import { useEffect, useState } from "react"


// {
//   id: 'b2305391-8bae-408c-8d7f-57f115a50c91',
//   email: 'rajxryn@gmail.com',
//   firstName: '',
//   lastName: null,
//   position: null,
//   userId: 'user-123',
//   warmupCapacity: 13,
//   dailyCapacity: 25
// }

const getMails = async (id: string, type:"u"|"t") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/email-address/${id}?t=${type}`)
  if (!res.ok) {
    return null
  }
  const data = await res.json()
  // const result = mailboxSchema.safeParse(data);
  return data
}

export default async function MailboxPage() {
  const { targetId } = useTargetContext();
  // console.log("TARGET ID FORM THE CONTEXT : ", targetId)

  // const { userId } = auth()
  // if (!userId) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   }
  // }
  const [mailsDisplay,setMailsDisplay]= useState<any[]>([])

  useEffect(() => {
    if (!targetId) {
      console.warn("No target ID available.");
      return;
    }
    const fetchMails = async () => {
      const fetchedMails = await getMails(targetId, "t");
      setMailsDisplay(fetchedMails)
    };
    fetchMails();
  }, [targetId])
  
  
  if (targetId) {
    if (!mailsDisplay) {
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
  }
  else
    console.log("TARGET ID NOT FOUND ")

  // console.log("MAILS INFO :", mails)


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
      <DataTable data={mailsDisplay} columns={columns} isActionButton={false} />
    </ContentLayout>
  )
}
