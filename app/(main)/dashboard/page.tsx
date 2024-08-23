"use client"
import React, { useState, useEffect } from "react"
import { Eye, MailOpen, Send, Target, Star } from "lucide-react"
import { Overview } from "@/components/dashboard/overview"
// import { RecentSales } from "@/components/dashboard/recent-sales"; string
import { ContentLayout } from "@/components/layout/content-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  dashboardDataSchema,
  DataGraph,
  SalesDataItem,
  StatDashboard,
  getThreadApiResponseSchema,
} from "@/types/interface"
import CalendarForm from "@/components/dashboard/CalendarForm"
import moment from "moment"
import { getOpenRate, getResponseRate } from "@/lib/utils"
import { toast } from "sonner"
import Loading from "./loading"
import { useAuth } from "@clerk/nextjs"
import RecentSales from "@/components/dashboard/recent-sales"

const defaultDashboardData = {
  total_clicks: 0,
  total_opens: 0,
  data: [
    {
      date: "2024-01-01T00:00:00Z",
      opens: 0,
      total_emails: 0,
      total_unique_emails: 0,
    },
  ],
}

async function fetchDashboardDataUsingRange(type: string, id: string, startDate: string, endDate: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/${type}/${id}/range?start=${startDate}&end=${endDate}`
    const res = await fetch(url)
    console.log(`Response status for analytics by range: ${res.status}`)
    if (!res.ok && res.status !== 404) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`)
    }

    if (res.status === 404) {
      console.log("FETCH FUNCTION ANALYTICS BY RANGE ")
      toast("Page not found 404")
      return defaultDashboardData
    }

    const data = await res.json()
    const result = dashboardDataSchema.safeParse(data)

    if (!result.success) {
      console.error(result.error)
      throw new Error("Invalid data format")
    }

    console.log("RESULT FROM API CALL ", result)
    return result.data
  } catch (error: any) {
    console.error("Error fetching data:", error.message)
    throw error
  }
}

async function fetchRecentReply(targetId: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/thread/target/${targetId}/`
    console.log(url)
    const res = await fetch(url)
    console.log(`Response status for get thread API call response: ${res.status}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`)
    }

    const data = await res.json()
    const result = getThreadApiResponseSchema.safeParse(data)

    if (!result.success) {
      console.error(result.error)
      throw new Error("Invalid data format")
    }

    return result.data.replies.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()).slice(0, 10)
  } catch (error: any) {
    console.error("Error fetching data:", error.message)
    throw error
  }
}

// export async function getTargetIdByUser(userId: string): Promise<string | null> {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/target/${userId}`;
//     const res = await fetch(url);

//     if (!res.ok) {
//       if (res.status === 404) {
//         toast.error("No targets found for this user.");
//         return null;
//       } else {
//         throw new Error(`Failed to fetch targets. Status code: ${res.status}`);
//       }
//     }

//     const data: any = await res.json();
//     if (!data.targets || data.targets.length === 0) {
//       toast.error("No targets found for this user.");
//       return null;
//     }

//     const targetId = data.targets[0].id; // Assuming you want the first target ID
//     return targetId;
//   } catch (error: any) {
//     console.error("Error fetching target ID:", error.message);
//     toast.error("Error fetching target ID.");
//     return null;
//   }
// }

const DashboardHome: React.FC = () => {
  const { userId } = useAuth()
  // const TARGET_ID: string = "1c1108a8-9108-42e2-8177-4e655bbc87ed"

  // const [startDate, setStartDate] = useState<string>("2024-01-08T00%3A00%3A00.000Z");
  // const [endDate, setEndDate] = useState<string>("2024-07-26T23%3A59%3A59.000Z");
  const [startDate, setStartDate] = useState<string>(moment().toISOString())
  const [endDate, setEndDate] = useState<string>(moment().subtract(1, "months").toISOString())

  const [statsDashboard, setStatsDashboard] = useState(defaultDashboardData)
  const [dataGraph, setDataGraph] = useState<DataGraph[]>([])
  // const [recentSalesData, setRecentSalesData] = useState<any[]>([]);
  const [responseStatus, setResponseStatus] = useState<number | null>(null)
  const [openRate, setOpenRate] = useState<number>(0)
  const [responseRate, setResponseRate] = useState<number>(0)
  const [totalUniqueEmails, setTotalUniqueEmails] = useState<number>(0)
  const [totalSentEmails, setTotalSentEmails] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        console.log("USER ID NOT FOUND ")
        toast.error("Error finding user ID")
        return
      }
      setIsLoading(true)
      try {
        console.log("START DATE : ", startDate)
        console.log("END DATE : ", endDate)
        const dashboardData = await fetchDashboardDataUsingRange("userId", userId, startDate, endDate)
        // dummy userId
        // const dashboardData = await fetchDashboardDataUsingRange("userId", "user_2jQ7lufOqU1WFrEsi2wG3B7zF70", startDate, endDate);
        // console.log("TAGGG", dashboardData);
        // const targetId: any = await getTargetIdByUser(userId);
        // const targetId: any = "1c1108a8-9108-42e2-8177-4e655bbc87ed"
        // const recentReplies = await fetchRecentReply(targetId);

        // Destructuring dashboardData
        const { total_opens, total_clicks, data } = dashboardData

        // Calculating open rate and response rate
        const totalUniqueEmails = data.reduce((sum, item) => sum + item.total_unique_emails, 0)
        const openRate: any = getOpenRate({ total_opens, totalUniqueEmails })
        const responseRate: any = getResponseRate({ total_responses: total_clicks, totalUniqueEmails })

        // Updating state
        setTotalUniqueEmails(totalUniqueEmails)
        setTotalSentEmails(data.reduce((sum, item) => sum + item.total_emails, 0))
        setOpenRate(openRate)
        setResponseRate(responseRate)
        setResponseStatus(200)
        setDataGraph(
          data.map((item) => ({
            name: moment(item.date).format("YYYY-MM-DD"),
            uv: item.opens,
            pv: item.total_emails,
            amt: item.total_unique_emails,
          }))
        )
        setIsLoading(false)
      } catch (error: any) {
        if (error.message.includes("Status code: 404")) {
          setStatsDashboard(defaultDashboardData)
          setResponseStatus(404)
          toast.error("Data not found (404)")
        } else {
          setResponseStatus(
            error.message.includes("Status code:") ? parseInt(error.message.split("Status code:")[1]) : null
          )
          toast.error("Error fetching data")
          console.error("Error fetching data:", error.message)
        }
        setIsLoading(false)
      }
    }

    fetchData()
  }, [startDate, endDate])

  const cardConfigs = [
    {
      title: "Unique Leads",
      stat: totalUniqueEmails,
      icon: Star,
      className: "text-muted-foreground",
    },
    {
      title: "Total Sent",
      stat: totalSentEmails,
      icon: Send,
      className: "text-muted-foreground",
    },
    {
      title: "Open Rate",
      stat: openRate,
      icon: MailOpen,
      className: "text-muted-foreground",
    },
    {
      title: "Response Rate",
      stat: responseRate,
      icon: Eye,
      className: "text-muted-foreground",
    },
    // {
    //   title: "Monthly Target",
    //   stat: "2500",
    //   icon: Target,
    //   className: "text-muted-foreground",
    // },
  ]

  return (
    <ContentLayout title="Dashboard">
      <main className="w-full space-y-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
            <div className="flex justify-between space-x-10 space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Here&apos;s all the analytics available.</p>
              </div>
              <CalendarForm setStartDate={setStartDate} setEndDate={setEndDate} />
            </div>
            <div>
              <div className="my-4 flex gap-x-4">
                {cardConfigs.map((config) => (
                  <Card className="overflow-x-auto w-full" key={config.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{config.title}</CardTitle>
                      <config.icon className={`size-4 text-${config.className}`} width={24} height={24} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-foreground">{config.stat}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="w-full space-y-5">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-foreground">Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={dataGraph} />
                  </CardContent>
                </Card>

                <Card className="overflow-y-auto">
                  <CardHeader>
                    <CardTitle className="text-foreground">Recent Response</CardTitle>
                    <CardDescription>Unread</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <RecentSales />
                      <RecentSales/> */}
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
    </ContentLayout>
  )
}

export default DashboardHome
