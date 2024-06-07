import { Eye, MailOpen, Send, Target } from "lucide-react";
import Link from "next/link"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { ContentLayout } from "@/components/layout/content-layout"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"


const stats = [
  {
    title: "Total Sent",
    value: "2350",
    icon: Send,
  },
  {
    title: "Open Rate",
    value: "62%",
    icon: MailOpen,
  },
  {
    title: "Response Rate",
    value: "5%",
    icon: Eye,
  },
  {
    title: "Monthly Target",
    value: "1249/1500",
    icon: Target,
  },
];

export default function DashboardHome() {
  return (
    <>
      <ContentLayout title="Dashboard">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <main className="w-full space-y-4 pt-2">
          <div className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon
                    className="size-4 text-muted-foreground"
                    width={24}
                    height={24}
                  />
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
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Response</CardTitle>
                <CardDescription>12 Unread</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </main>


      </ContentLayout>
    </>
  )
}
