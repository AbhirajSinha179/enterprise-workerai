import { Eye, MailOpen, MessageSquare, Send, Target } from "lucide-react"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { ContentLayout } from "@/components/layout/content-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <ContentLayout title="Analytics">
      <main className="w-full space-y-4 pt-2">
        <div className="grid gap-x-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
              <Send
                className="size-4 text-muted-foreground"
                width={24}
                height={24}
              />

            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">2350</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <MailOpen
                className="size-4 text-muted-foreground"
                width={24}
                height={24} />
            </CardHeader>

            <CardContent>
              <div className="text-4xl font-bold">62%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              {/* <MessageSquare
                className="size-4 text-muted-foreground"
                width={24}
                height={24}
              /> */}
              <Eye
                className="size-4 text-muted-foreground"
                width={24}
                height={24}
              />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">5%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly target</CardTitle>
              <Target
                className="size-4 text-muted-foreground"
                width={24}
                height={24}
              />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1249/1500</div>
            </CardContent>
          </Card>
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
  )
}
