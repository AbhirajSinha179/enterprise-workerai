import { ContentLayout } from "@/components/layout/content-layout"
import { columns } from "@/components/leads/columns"
import { DataTable } from "@/components/leads/data-table"

import { auth } from "@clerk/nextjs/server"
import { z } from "zod"
import { leadsSchema } from "../data/schema"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"

const getTargetId = async (userId: string) => {
  const url = `${process.env.BASE_API_URL}/user/target/${userId}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${await auth().getToken()}` },
  })
  const data: any = await res.json()
  if (!data.targets || data.targets.length === 0) {
    return null
  }

  const targetId = data.targets[0].id
  return targetId
}

async function getLeads() {
  const { userId } = auth()
  const targetId = await getTargetId(userId!)
  if (!targetId) {
    return []
  }
  const leads = await fetch(`${process.env.BASE_API_URL}/leads?targetId=${targetId}`, {
    headers: { Authorization: `Bearer ${await auth().getToken()}` },
  })
  const leadsData = await leads.json()
  const ld = z.array(leadsSchema).parse(leadsData)
  return ld
}

export default async function Leads() {
  const leads = await getLeads()
  return (
    <ContentLayout title="Leads">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
            <p className="text-foreground">Here&apos;s all the leads available.</p>
          </div>
          {/* <div className="flex items-center space-x-2">
          </div> */}
        </div>
        <DataTable data={leads} columns={columns} isActionButton={true} />
      </div>
    </ContentLayout>
  )
}
