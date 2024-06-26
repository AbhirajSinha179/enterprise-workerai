import { Eye, MailOpen, Send, Target } from "lucide-react";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatDashboard {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DataGraph {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
interface SalesDataItem {
  name: string;
  email: string;
}


const dataGraph: DataGraph[] = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const statsDashboard: StatDashboard[] = [
  { title: "Total Sent", value: "2350", icon: Send },
  { title: "Open Rate", value: "62%", icon: MailOpen },
  { title: "Response Rate", value: "5%", icon: Eye },
  { title: "Monthly Target", value: "1249/1500", icon: Target },
];

const recentSalesData: SalesDataItem[] = [
  { name: "Olivia Martin", email: "olivia.martin@email.com" },
  { name: "Jackson Lee", email: "jackson.lee@email.com" },
];



export default function DashboardHome() {
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
