import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { z } from "zod"
import { promises as fs } from "fs"
import path from "path"
import { ContentLayout } from "@/components/layout/content-layout"
import { columns } from "@/components/leads/columns"
import { DataTable } from "@/components/leads/data-table"
import { UserNav } from "@/components/leads/user-nav"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { taskSchema } from "@/data/schema"


async function getTasks() {
  const data = await fs.readFile(
    // path.join(process.cwd(), "app/(app)/examples/tasks/data/tasks.json")
    path.join(process.cwd(), "/data/tasks.json")
  )

  // use fetch to get data with pagination
  // use response, check Nextjs docs for fetching and validating data
  // also understand what server actions, dynamic fetching is like

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function Leads() {
  const tasks = await getTasks()
  return (
    <ContentLayout title="Leads">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Leads</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
            <p className="text-muted-foreground">
              Here&apos;s all the leads available.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </ContentLayout>
  )
}
