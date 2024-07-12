import { ContentLayout } from "@/components/layout/content-layout"
import { columns } from "@/components/leads/columns"
import { DataTable } from "@/components/leads/data-table"
import { leadsDataSchema, leadSchema } from "@/types/interface"

async function getLeads() {
  const res = await fetch("http://localhost:3000/leadsdata/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const result = leadsDataSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid data format");
  }
  return result.data.leadsData;
}

export default async function Leads() {
  const leads = await getLeads();
  return (
    <ContentLayout title="Leads">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
            <p className="text-foreground">
              Here&apos;s all the leads available.
            </p>
          </div>
        </div>
        <DataTable data={leads} columns={columns} isActionButton={true} />
      </div>
    </ContentLayout>
  );
}