import React, { useState, useEffect } from "react";
import { Eye, MailOpen, Send, Target, Star } from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardDataSchema, DataGraph, SalesDataItem, StatDashboard, apiResponseSchema } from "@/types/interface";
import CalendarForm from "@/components/dashboard/CalendarForm";
import { currentUser } from '@clerk/nextjs/server';
import moment from 'moment';



export async function fetchDashboardDataUsingRange(type: string, id: string, startDate: string, endDate: string) {
  try {
    // const url = `${process.env.API_BASE_URL}/analytics/${type}/${id}/range?start=${startDate}&end=${endDate}`;
    const url = "http://localhost:3000/dashboarddata";
    const res = await fetch(url);
    // console.log("Response is from analytics API  : ", res)
    // console.log("ENDPOINT IS ", url);
    console.log(`Response status for analytics by range: ${res.status}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    const result = dashboardDataSchema.safeParse(data);

    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid data format");
    }

    return result.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export async function fetchRecentReply(id: string) {
  try {
    // const url = `${process.env.API_BASE_URL}/emails/thread//${id}/`
    const url = "http://localhost:3000/getthreads";
    const res = await fetch(url);
    console.log(`Response status for getthreads: ${res.status}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data = await res.json();
    const result = apiResponseSchema.safeParse(data);

    if (!result.success) {
      console.error(result.error);
      throw new Error("Invalid data format");
    }

    // Return the 10 most recent replies sorted by date
    return result.data.replies
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}


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

export default async function DashboardHome() {
  let statsDashboard = defaultDashboardData;
  let dataGraph: DataGraph[] = [];
  let recentSalesData: any = [];
  let responseStatus: number | null = null;
  let openRate: number = 0;
  let responseRate: number = 0;
  let totalUniqueEmails: number = 0;
  let totalSentEmails: number = 0;

  const user = await currentUser();
  console.log("USER ID IS : ", user?.id);
  const primaryEmail = user?.emailAddresses?.[0]?.emailAddress || "Email not found";
  const userId = user?.id || "Id not found";
  console.log("Primary Email Address:", primaryEmail);
  const defaultStartDate = "2023-01-01T00%3A00%3A00.000Z";
  const defaultEndDate = "2023-01-31T23%3A59%3A59.000Z";
  recentSalesData = await fetchRecentReply(userId)

  try {
    const dashboardData = await fetchDashboardDataUsingRange("userId", userId, defaultStartDate, defaultEndDate);
    openRate = dashboardData.total_opens;
    responseRate = dashboardData.total_clicks;

    totalUniqueEmails = dashboardData.data.reduce((sum, item) => sum + item.total_unique_emails, 0);
    totalSentEmails = dashboardData.data.reduce((sum, item) => sum + item.total_emails, 0);

    responseStatus = 200;
    dataGraph = dashboardData.data.map((item) => ({
      name: moment(item.date).format("YYYY-MM-DD"), //x 
      uv: item.opens,
      pv: item.total_emails, //y
      amt: item.total_unique_emails,
    }));
  } catch (error: any) {
    if (error.message.includes("Status code: 404")) {
      statsDashboard = defaultDashboardData;
      responseStatus = 404;
    } else {
      responseStatus = error.message.includes("Status code:") ? parseInt(error.message.split("Status code:")[1]) : null;
      console.error("Error fetching data:", error.message);
    }
  }

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
              <CalendarForm userId={userId} />
            </div>
          </div>
          <div>
            {responseStatus && (
              <div className={`alert ${responseStatus === 200 ? 'alert-success' : 'alert-error'}`}>
                {responseStatus === 200 ? 'Data fetched successfully!' : `Failed to fetch data. Status code: ${responseStatus}`}
              </div>
            )}
            <div className="grid gap-x-4 md:grid-cols-3 lg:grid-cols-5 my-4">
              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground ">Unique Leads</CardTitle>
                  <Star
                    className="size-4 text-muted-foreground"
                    width={24}
                    height={24}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{totalUniqueEmails}</div>
                </CardContent>
              </Card>

              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground ">Total Sent</CardTitle>
                  <Send
                    className="size-4 text-muted-foreground"
                    width={24}
                    height={24}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{totalSentEmails}</div>
                </CardContent>
              </Card>

              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground ">Open Rate</CardTitle>
                  <MailOpen className="size-4 text-muted-foreground" width={24} height={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{openRate}</div>
                </CardContent>
              </Card>

              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground ">Response Rate</CardTitle>
                  <Eye className="size-4 text-muted-foreground" width={24} height={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground">{responseRate}</div>
                </CardContent>
              </Card>

              <Card className="overflow-x-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground ">Monthly Target</CardTitle>
                  <Target
                    className="size-4 text-muted-foreground"
                    width={24}
                    height={24}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground"> 0</div>
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