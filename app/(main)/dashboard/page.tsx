import { Eye, MailOpen, Send, Target, Star } from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DataGraph, SalesDataItem, StatDashboard, dashboardDataSchema,
} from "@/types/interface"
import CalendarForm from "@/components/dashboard/CalendarForm";

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
    case "Star":
      return Star;
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

const defaultStatsDashboard: StatDashboard[] = [
  { title: "Unique Leads", value: "0", icon: Star },
  { title: "Total Sent", value: "0", icon: Send },
  { title: "Open Rate", value: "0", icon: MailOpen },
  { title: "Response Rate", value: "0", icon: Eye },
  { title: "Monthly Target", value: "0", icon: Target },
];

export default async function DashboardHome() {
  let statsDashboard: StatDashboard[] = defaultStatsDashboard;
  let dataGraph: DataGraph[] = [];
  let recentSalesData: SalesDataItem[] = [];

  try {
    const dashboardData = await fetchDashboardData();
    if (dashboardData.statsDashboard && dashboardData.statsDashboard.length > 0) {
      statsDashboard = dashboardData.statsDashboard.map(stat => ({
        ...stat,
        icon: mapIcon(stat.icon)
      }));
    }
    dataGraph = dashboardData.dataGraph;
    recentSalesData = dashboardData.recentSalesData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <ContentLayout title="Dashboard">
      <main className="w-full space-y-4">
        <div className="hidden h-full flex-1 flex-col space-y-4 md:flex">
          <div className="flex  space-y-2 space-x-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Here&apos;s all the analytics available.
              </p>
            </div>
            <div className="flex justify-center">
              <CalendarForm />
            </div>
          </div>
          <div>
            <div className="grid gap-x-4 md:grid-cols-3 lg:grid-cols-5 my-4">
              {statsDashboard.map((stat, index) => (
                <Card key={index} className="overflow-x-auto">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground ">{stat.title}</CardTitle>
                    <stat.icon
                      className="size-4 text-muted-foreground"
                      width={24}
                      height={24}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-foreground">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
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
                  <CardDescription>12 Unread</CardDescription>
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
