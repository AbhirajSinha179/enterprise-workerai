import { toast } from "sonner"
import LoadingSign from "@/components/global/loading"
import { Inbox } from "@/components/inbox/mail"
import { ContentLayout } from "@/components/layout/content-layout"
import { Thread, threadsSchema } from "@/types/interface"

const getData = async (targetId: string) => {
  try {
    const res = await fetch(`https://api.workerai.co/emails/thread/target/${targetId}`, {
      method: "GET",
    })
    const data = await res.json()
    // const result = threadsSchema.safeParse(data);
    // console.log(data);
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function InboxPage() {
  try {
    const targetId = process.env.TARGET_ID
    if (!targetId) {
      toast("Error", {
        description: "Failed to fetch data",
      })
      return
    }
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
