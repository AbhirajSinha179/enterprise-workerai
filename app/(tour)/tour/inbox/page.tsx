import { toast } from "sonner"
import LoadingSign from "@/components/global/loading"
import { Inbox } from "@/components/inbox/mail"
import { ContentLayout } from "@/components/layout/content-layout"
import { Thread, threadsSchema } from "@/types/interface"
import { auth } from "@clerk/nextjs/server"

const getData = async (targetId: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API_URL}/emails/thread/target/${targetId}`, {
      method: "GET",
      cache: "no-cache",
    })
    const data = await res.json()
    const result = threadsSchema.parse(data)
    return result
  } catch (error) {
    console.log(JSON.stringify(error))
    return []
  }
}

const getTargetId = async (userId: string) => {
  const url = `${process.env.BASE_API_URL}/user/target/${userId}`
  const res = await fetch(url)
  const data: any = await res.json()
  if (!data.targets || data.targets.length === 0) {
    return null
  }

  const targetId = data.targets[0].id
  return targetId
}

export default async function InboxPage() {
  const { userId } = auth()
  try {
    const targetId = await getTargetId(userId!) 
    const threadData = await getData(targetId)
    if (!threadData) {
      return (
        <ContentLayout title="Inbox">
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="flex items-center justify-center font-bold">
              Unable to fetch data. Please try again later.
            </div>
          </div>
        </ContentLayout>
      )
    }

    return (
      <ContentLayout title="Inbox">
        {/* <Inbox threads={threadData} /> */}
        {threadData ? <Inbox threads={threadData} /> : <LoadingSign />}
      </ContentLayout>
    )
  } catch (error) {
    toast("Error", {
      description: "Failed to fetch data",
    })
    return null
  }
}
