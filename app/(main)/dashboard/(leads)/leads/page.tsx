import Link from "next/link"
import { z } from "zod"
import { promises as fs } from "fs"
import path from "path"
import { leadsSchema } from "@/app/(main)/dashboard/(leads)/data/schema"
import { ContentLayout } from "@/components/layout/content-layout"
import { columns } from "@/components/leads/columns"
import { DataTable } from "@/components/leads/data-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


async function getLeads() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/(main)/dashboard/(leads)/data/leads.json")
  )
  const leads = JSON.parse(data.toString())

  return z.array(leadsSchema).parse(leads)
}

export default async function Leads() {
  const tasks = await getLeads()
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
          </div>
        </div>
        <DataTable data={tasks} columns={columns} isActionButton={true} />
      </div>
    </ContentLayout>
  )
}
