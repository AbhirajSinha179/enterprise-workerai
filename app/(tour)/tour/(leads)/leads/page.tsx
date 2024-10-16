import { ContentLayout } from "@/components/layout/content-layout";
import { columns } from "@/components/leads/columns";
import { DataTable } from "@/components/leads/data-table";
import { dummyLeads } from "@/lib/dummy"; // Assuming dummyLeads is imported from this path

export default function Leads() {
  // Use the dummyLeads data instead of fetching from an API
  const leads = dummyLeads;
  console.log("LEADS : ", leads);

  return (
    <ContentLayout title="Leads">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
            <p className="text-foreground">Here&apos;s all the leads available.</p>
          </div>
        </div>
        {/* Render the DataTable with leads */}
        <DataTable data={leads} columns={columns} isActionButton={true} />
      </div>
    </ContentLayout>
  );
}
