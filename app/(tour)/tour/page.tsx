"use client"
import React, { useState } from "react"
import { Eye, MailOpen, Send, Star } from "lucide-react"
import { Overview } from "@/components/dashboard/overview"
import { ContentLayout } from "@/components/layout/content-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataGraph } from "@/types/interface"
import CalendarForm from "@/components/dashboard/CalendarForm"
import { getOpenRate, getResponseRate } from "@/lib/utils"
import { toast } from "sonner"
import RecentSales from "@/components/dashboard/recent-sales"
import { dummyDashboardData } from "@/lib/dummy"
import moment from "moment"

const DashboardHome: React.FC = () => {
  const [startDate, setStartDate] = useState<string>(moment().subtract(1, "months").toISOString())
  const [endDate, setEndDate] = useState<string>(moment().toISOString())

  // Using dummy data directly
  const { total_opens, total_clicks, data } = dummyDashboardData

  // Calculating open rate and response rate
  const totalUniqueEmails = data.reduce((sum, item) => sum + item.total_unique_emails, 0)
  const openRate = getOpenRate({ total_opens, totalUniqueEmails })
  const responseRate = getResponseRate({ total_responses: total_clicks, totalUniqueEmails })

  const cardConfigs = [
    {
      title: "Unique Leads",
      stat: totalUniqueEmails,
      icon: Star,
    },
    {
      title: "Total Sent",
      stat: data.reduce((sum, item) => sum + item.total_emails, 0),
      icon: Send,
    },
    {
      title: "Open Rate",
      stat: openRate,
      icon: MailOpen,
    },
    {
      title: "Response Rate",
      stat: responseRate,
      icon: Eye,
    },
  ]

  return (
    <ContentLayout title="Dashboard">
      <main className="w-full space-y-4">
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
                <Card className="w-full overflow-x-auto" key={config.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{config.title}</CardTitle>
                    <config.icon width={24} height={24} />
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
                  <Overview data={data as DataGraph[]} />
                </CardContent>
              </Card>

              <Card className="overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales isDemo={true} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </ContentLayout>
  )
}

export default DashboardHome
