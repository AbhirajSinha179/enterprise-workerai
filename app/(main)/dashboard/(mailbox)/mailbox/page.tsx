"use client"
// import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { ContentLayout } from "@/components/layout/content-layout"
import { DataTable } from "@/components/leads/data-table"
import { columns } from "@/components/mailbox/columns"
import { Button } from "@/components/ui/button"
import { useTargetContext } from "@/contexts/TargetIdContext";


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

const getMails = async (userId: string) => {
  const res = await fetch(`${process.env.BASE_API_URL}/user/email-address/${userId}`, {
    next: { revalidate: 30 },
  })
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
  if (targetId) {

    const mails = await getMails(targetId)
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
      <DataTable data={mails} columns={columns} isActionButton={false} />
    </ContentLayout>
  )
}
