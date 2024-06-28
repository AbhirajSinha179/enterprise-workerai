import { Eye, MailOpen, Send, Target } from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DataGraph, SalesDataItem, StatDashboard, dashboardDataSchema,
} from "@/types/interface"

async function fetchDashboardData() {
  const res = await fetch("http://localhost:3000/dashboarddata");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const result = dashboardDataSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid data format");
  }
  return result.data;
}
function mapIcon(icon: string) {
  switch (icon) {
    case "Send":
      return Send;
    case "MailOpen":
      return MailOpen;
    case "Eye":
      return Eye;
    case "Target":
      return Target;
    default:
      return Send;
  }
}

export default async function DashboardHome() {
  let statsDashboard: StatDashboard[] = [];
  let dataGraph: DataGraph[] = [];
  let recentSalesData: SalesDataItem[] = [];

  try {
    const dashboardData = await fetchDashboardData();
    statsDashboard = dashboardData.statsDashboard.map(stat => ({
      ...stat,
      icon: mapIcon(stat.icon)
    }));
    dataGraph = dashboardData.dataGraph;
    recentSalesData = dashboardData.recentSalesData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <ContentLayout title="Dashboard">
      <main className="w-full space-y-4 pt-2">
        <div className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
          {statsDashboard.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="size-4 text-muted-foreground" width={24} height={24} />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={dataGraph} />
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Response</CardTitle>
              <CardDescription>12 Unread</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales data={recentSalesData} />
            </CardContent>
          </Card>
        </div>
      </main>
    </ContentLayout>
  );
}