"use client"
import React, { useState, useEffect } from "react";
import { Eye, MailOpen, Send, Target, Star } from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardDataSchema, DataGraph, SalesDataItem, StatDashboard, getThreadApiResponseSchema } from "@/types/interface";
import CalendarForm from "@/components/dashboard/CalendarForm";
// import { currentUser } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import moment from 'moment';

const defaultDashboardData = {
  total_clicks: 0,
  total_opens: 0,
  data: [
    {
      date: "2024-01-01T00:00:00Z",
      opens: 0,
      total_emails: 0,
      total_unique_emails: 0
    }
  ]
};

export async function fetchDashboardDataUsingRange(type: string, id: string, startDate: string, endDate: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/analytics/${type}/${id}/range?start=${startDate}&end=${endDate}`;
    const res = await fetch(url);
    console.log(`Response status for analytics by range: ${res.status}`);
    if (!res.ok && res.status !== 404) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    if (res.status === 404) {
      console.log("FETCH FUNCTION ANALYTICS BY RANGE ")
      return defaultDashboardData;
    }

    const data = await res.json();
    const result = dashboardDataSchema.safeParse(data);

    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid data format");
    }

    console.log("RESULT FROM API CALL ", result)
    return result.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export async function fetchRecentReply(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/thread/${id}/`;
    console.log(url);
    const res = await fetch(url);
    console.log(`Response status for get thread API call response: ${res.status}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    const result = getThreadApiResponseSchema.safeParse(data);

    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid data format");
    }

    return result.data.replies
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

const DashboardHome: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("2023-01-01T00%3A00%3A00.000Z");
  const [endDate, setEndDate] = useState<string>("2023-01-31T23%3A59%3A59.000Z");
  const [statsDashboard, setStatsDashboard] = useState(defaultDashboardData);
  const [dataGraph, setDataGraph] = useState<DataGraph[]>([]);
  const [recentSalesData, setRecentSalesData] = useState<any[]>([]);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [openRate, setOpenRate] = useState<number>(0);
  const [responseRate, setResponseRate] = useState<number>(0);
  const [totalUniqueEmails, setTotalUniqueEmails] = useState<number>(0);
  const [totalSentEmails, setTotalSentEmails] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {

        const dashboardData = await fetchDashboardDataUsingRange("userId", "user-123", startDate, endDate);
        const recentReplies = await fetchRecentReply("00a0e5f2-ec40-4731-8b76-ebf447bf7f3d");

        setRecentSalesData(recentReplies);
        setOpenRate(dashboardData.total_opens);
        setResponseRate(dashboardData.total_clicks);
        setTotalUniqueEmails(dashboardData.data.reduce((sum, item) => sum + item.total_unique_emails, 0));
        setTotalSentEmails(dashboardData.data.reduce((sum, item) => sum + item.total_emails, 0));
        setResponseStatus(200);
        setDataGraph(dashboardData.data.map((item) => ({
          name: moment(item.date).format("YYYY-MM-DD"),
          uv: item.opens,
          pv: item.total_emails,
          amt: item.total_unique_emails,
        })));
      } catch (error: any) {
        if (error.message.includes("Status code: 404")) {
          setStatsDashboard(defaultDashboardData);
          setResponseStatus(404);
        } else {
          setResponseStatus(error.message.includes("Status code:") ? parseInt(error.message.split("Status code:")[1]) : null);
          console.error("Error fetching data:", error.message);
        }
      }
    }

    fetchData();
  }, [startDate, endDate]);

  return (
    <ContentLayout title="Dashboard">
      <main className="w-full space-y-4">
        <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
          <div className="flex space-y-2 space-x-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Here&apos;s all the analytics available.
              </p>
            </div>
            <div className="flex justify-center">
              <CalendarForm setStartDate={setStartDate} setEndDate={setEndDate} />
            </div>
          </div>
          <div>
            {responseStatus !== null && (
              <div className={`alert ${responseStatus === 200 ? 'alert-success' : 'alert-error'}`}>
                {responseStatus === 200 ? 'Data fetched successfully!' : `Failed to fetch data. Status code: ${responseStatus}`}
              </div>
            )}
            <div className="grid gap-x-4 md:grid-cols-3 lg:grid-cols-5 my-4">
              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Unique Leads</CardTitle>
                  <Star className="size-4 text-muted-foreground" width={24} height={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{totalUniqueEmails}</div>
                </CardContent>
              </Card>

              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent</CardTitle>
                  <Send className="size-4 text-muted-foreground" width={24} height={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{totalSentEmails}</div>
                </CardContent>
              </Card>

              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Open Rate</CardTitle>
                  <MailOpen className="size-4 text-muted-foreground" width={24} height={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{openRate}</div>
                </CardContent>
              </Card>

              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Response Rate</CardTitle>
                  <Eye className="size-4 text-muted-foreground" width={24} height={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{responseRate}</div>
                </CardContent>
              </Card>

              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Target</CardTitle>
                  <Target className="size-4 text-muted-foreground" width={24} height={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">0</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-1">
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
                  <RecentSales data={recentSalesData} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </ContentLayout>
  );
}

export default DashboardHome;
