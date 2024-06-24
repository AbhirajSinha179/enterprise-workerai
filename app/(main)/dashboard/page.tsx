

import React from "react";
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Eye, MailOpen, Send, Star, Target, LucideIcon } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import CalendarForm to avoid server-side rendering issues
const CalendarForm = dynamic(() => import('@/components/dashboard/CalendarForm'), { ssr: false });

interface Stat {
  title: string;
  value: string;
  icon: LucideIcon;
}

const stats: Stat[] = [
  {
    title: "Unique Leads",
    value: "122",
    icon: Star,
  },
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

const DashboardHome = () => {
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
              {stats.map((stat, index) => (
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
                  <Overview />
                </CardContent>
              </Card>
              <Card className="overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Response</CardTitle>
                  <CardDescription>12 Unread</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>

            </div>

          </div>

        </div>

      </main>
    </ContentLayout>
  );
};

export default DashboardHome;
