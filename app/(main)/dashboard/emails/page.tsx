import Link from "next/link"
import { ContentLayout } from "@/components/layout/content-layout"
import { EmailList } from "@/components/scheduler/email-list"
import { ScheduledEmailList } from "@/components/scheduler/scheduled-emails"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { truncate } from "lodash"
// import { Button } from "@/components/ui/button"

async function getEmails() {
  // const res = await fetch("https://...", { cache: "no-store" });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  const res = {
    json: async () => [
      { id: 1, subject: "Hello", body: "Hello, world!", date: "2024-01-01", scheduled: false },
      { id: 2, subject: "Hi", body: "Hi, world!", date: "2024-01-02", scheduled: true },
      { id: 3, subject: "Hey", body: "Hey, world!", date: "2024-01-03", scheduled: false },
      { id: 4, subject: "Hola", body: "Hola, world!", date: "2024-01-04", scheduled: true}
    ],
  }

  return res.json()
}

export default async function Emails() {
  const emails = await getEmails()
  

  return (
    <ContentLayout title="Scheduler">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Emails</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="pending" className="mt-4 space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        {!emails && <div>No emails yet bitch</div>}
        <TabsContent value="pending" className="space-y-4">
          <EmailList emails={emails.filter(email => email.scheduled===false)} />
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <ScheduledEmailList emails={emails.filter(email=> email.scheduled===true)} /> 
        </TabsContent>
      </Tabs>
    </ContentLayout>
  )
}
