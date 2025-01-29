"use client"
import { useAuth } from "@clerk/nextjs"
import { Eye, MailOpen, Reply, Send, Star } from "lucide-react"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import CalendarForm from "@/components/dashboard/CalendarForm"
import { Overview } from "@/components/dashboard/overview"
// import { RecentSales } from "@/components/dashboard/recent-sales"; string
import RecentSales from "@/components/dashboard/recent-sales"
import { ContentLayout } from "@/components/layout/content-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useDateRange } from "@/contexts/DateRangeContext"
import { getOpenRate, getResponseRate } from "@/lib/utils"
import {
    dashboardDataSchema,
    DataGraph,
    recentResponseSchema,
    // SalesDataItem,
    // StatDashboard,
} from "@/types/interface"

// import Loading from "./loading"
// import Loading from "../(site)/loading"
import Loading from "../dashboard/loading"
// import { useTargetContext } from "@/contexts/TargetIdContext"


const defaultDashboardData = {
    total_replies: 0,
    total_emails: 0,
    total_clicks: 0,
    total_opens: 0,
    total_unique_emails: 0,
    data: [
        {
            date: "2024-01-01T00:00:00Z",
            opens: 0,
            total_emails: 0,
            total_unique_emails: 0,
        },
    ],
}

async function fetchDashboardDataUsingRange(type: string, id: any, startDate: string, endDate: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/${type}/${id}/range?start=${startDate}&end=${endDate}`
        const res = await fetch(url, { next: { revalidate: 60 } })
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

async function fetchRecentReply(userId: string) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/reply/user/${userId}`;
        const res = await fetch(url);
        console.log(`Response status for get thread API call response: ${res.status}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status code: ${res.status}`);
        }

        const data = await res.json();
        const result = recentResponseSchema.safeParse(data);

        if (!result.success) {
            console.error(result.error);
            throw new Error("Invalid data format");
        }

        return result.data || [];
    } catch (error: any) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}



const DashboardHome: React.FC = () => {
    const { userId } = useAuth();
    const { startDate, endDate, setStartDate, setEndDate } = useDateRange();
    const [statsDashboard, setStatsDashboard] = useState(defaultDashboardData)
    const [dataGraph, setDataGraph] = useState<DataGraph[]>([])
    const [responseStatus, setResponseStatus] = useState<number | null>(null)
    const [openRate, setOpenRate] = useState<number>(0)
    const [totalOpen, setTotalOpen] = useState<number>(0)
    const [responseRate, setResponseRate] = useState<number>(0)
    const [totalUniqueEmails, setTotalUniqueEmails] = useState<number>(0)
    const [totalSentEmails, setTotalSentEmails] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const targetId = "7cb54876-bbb6-4161-8935-9524fe3d891e";
    const [isFetchingTargetId, setIsFetchingTargetId] = useState(true);
    const [recentReplies, setRecentReplies] = useState<any[]>([])
    const [isNavigating, setIsNavigating] = useState(false);
    // console.log("RECENT REPLIES : ", recentReplies)



    useEffect(() => {
        if (!targetId) {
            setIsFetchingTargetId(true);
            return;
        }
        setIsFetchingTargetId(false);

        async function fetchData() {
            if (!userId) {
                console.log("USER ID NOT FOUND ")
                toast.error("Error finding user")
                return
            }
            setIsLoading(true)
            try {
                // console.log("START DATE : ", startDate)
                // console.log("END DATE : ", endDate)
                // console.log("TARGET ID : ", targetId)
                const dashboardData = await fetchDashboardDataUsingRange("userId", userId, startDate, endDate)
                const recentReplies = await fetchRecentReply(userId)
                setRecentReplies(recentReplies)

                const { total_replies, total_emails, total_opens, total_clicks, total_unique_emails, data } = dashboardData

                const totalUniqueEmails = total_unique_emails ? total_unique_emails : 0
                const openRate: any = getOpenRate({ total_opens, total_emails })
                const responseRate: any = getResponseRate({ total_replies: total_replies, totalUniqueEmails })

                setTotalUniqueEmails(totalUniqueEmails)
                setTotalSentEmails(data.reduce((sum, item) => sum + (item.total_emails ?? 0), 0))
                setOpenRate(openRate)
                setResponseRate(responseRate)
                setTotalOpen(total_opens)
                setResponseStatus(200)
                setDataGraph(
                    data.map((item) => ({
                        ...item,
                        total_emails: item.total_emails ?? 0,
                        date: moment(item.date).format('MMM Do YY'),
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
    }, [startDate, endDate, targetId, userId])

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
            title: "Total Open",
            stat: totalOpen,
            icon: Eye,
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
            icon: Reply,
            className: "text-muted-foreground",
        },
    ]
    const isLoadingDashboard = isLoading || isFetchingTargetId;

    return isNavigating ? (
        <Loading />
    ) : (
        <ContentLayout title="Overview">
            <div className="container px-4 py-10 sm:px-8">
                <main className="w-full space-y-4">
                    <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
                        <div className="flex justify-between space-x-10 space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Overall Analytics</h2>
                                <p className="text-muted-foreground">Here&apos;s all the campaigns analytics available.</p>
                            </div>
                            {/* <Link href="/dashboard" onClick={() => setIsNavigating(true)}>
                            <Button variant={"secondary"}>
                                Back to Dashboard
                            </Button>
                        </Link> */}
                            <CalendarForm />

                        </div>
                        <div>
                            <div className="my-4 flex gap-x-4">
                                {isLoadingDashboard
                                    ? Array.from({ length: cardConfigs.length }).map((_, idx) => (
                                        <Card className="w-full overflow-x-auto" key={idx}>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <Skeleton className="h-6 w-20" />
                                                <Skeleton className="size-6" />
                                            </CardHeader>
                                            <CardContent>
                                                <Skeleton className="h-12 w-32" />
                                            </CardContent>
                                        </Card>
                                    ))
                                    : cardConfigs.map((config) => (
                                        <Card className="w-full overflow-x-auto" key={config.title}>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                                    {config.title}
                                                </CardTitle>
                                                <config.icon
                                                    className={`size-4 text-${config.className}`}
                                                    width={24}
                                                    height={24}
                                                />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-4xl font-bold text-foreground">
                                                    {config.stat}
                                                </div>
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
                                        <Overview data={dataGraph} isLoading={isLoading} />
                                    </CardContent>
                                </Card>

                                <Card className="overflow-y-auto">
                                    <CardHeader>
                                        <CardTitle className="text-foreground">Recent Response</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {isLoading ? (
                                            <div className="space-y-4">
                                                {Array.from({ length: 5 }).map((_, idx) => (
                                                    <div key={idx} className="flex items-center space-x-4">
                                                        <Skeleton className="size-10 rounded-full" />
                                                        <div className="flex-1 space-y-2">
                                                            <Skeleton className="h-4 w-1/2" />
                                                            <Skeleton className="h-3 w-1/3" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : recentReplies.length > 0 ? (
                                            <RecentSales data={recentReplies} />
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No recent responses found.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ContentLayout>
    );

}

export default DashboardHome
