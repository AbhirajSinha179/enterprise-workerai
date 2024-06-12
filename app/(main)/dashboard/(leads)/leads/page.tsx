import Link from "next/link"
import EmptyState from "@/components/global/empty-state"
import { ContentLayout } from "@/components/layout/content-layout"
import { columns } from "@/components/leads/columns"
import { DataTable } from "@/components/leads/data-table"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import leadsData from "../data/leads"
async function getLeads() {
  return leadsData
}

export default async function Leads() {
  const leads = await getLeads()
  return (
    <ContentLayout title="Leads">
      {leads.length === 0 ? (
        <EmptyState
          message="No leads available."
        />
      ) : (
        <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
              <p className="text-muted-foreground">
                Here&apos;s all the leads available.
              </p>
            </div>
            {/* <div className="flex items-center space-x-2">
          </div> */}
          </div>
          <DataTable data={leads} columns={columns} isActionButton={true} />

        </div>
      )}
    </ContentLayout>
  )
}
