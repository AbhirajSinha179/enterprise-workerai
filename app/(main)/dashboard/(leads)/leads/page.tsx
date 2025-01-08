"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import { columns } from "@/components/leads/columns";
import { DataTable } from "@/components/leads/data-table";

import { useEffect, useState } from "react";
import { leadsSchema } from "../data/schema";
import { useTargetContext } from "@/contexts/TargetIdContext";
import { Skeleton } from "@/components/ui/skeleton";

async function getLeads(targetId: string): Promise<any[]> {
  try {
    if (!targetId) {
      console.warn("No target ID found for user");
      return [];
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/leads?targetId=${targetId}`);
    if (!response.ok) {
      console.error(`Failed to fetch leads: ${response.status} ${response.statusText}`);
      return [];
    }

    const leadsData = await response.json();
    const ld = leadsSchema.safeParse(leadsData);

    if (!ld.success) {
      console.error("Data validation failed", ld.error);
      return [];
    }

    return ld.data.data;
  } catch (error) {
    console.error("An error occurred while fetching leads:", error);
    return [];
  }
}

export default function Leads() {
  const { targetId } = useTargetContext(); // Assume targetId is part of context
  const [leads, setLeads] = useState<any[]>([]); // State to store leads
  const [isFetchingTargetId, setIsFetchingTargetId] = useState<boolean>(true); // State for targetId fetching
  const [isFetchingLeads, setIsFetchingLeads] = useState<boolean>(false); // State for leads fetching

  useEffect(() => {
    if (!targetId) {
      setIsFetchingTargetId(true);
      return;
    }

    setIsFetchingTargetId(false);

    const fetchLeads = async () => {
      setIsFetchingLeads(true);
      const fetchedLeads = await getLeads(targetId);
      setLeads(fetchedLeads);
      setIsFetchingLeads(false);
    };

    fetchLeads();
  }, [targetId]); // Runs whenever targetId changes

  if (isFetchingTargetId || isFetchingLeads) {
    return (
      <ContentLayout title="Leads">
        <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
              <p className="text-foreground">Here&apos;s all the leads available.</p>
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(20)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-md" />
            ))}
          </div>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Leads">
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
            <p className="text-foreground">Here&apos;s all the leads available.</p>
          </div>
        </div>
        <DataTable data={leads} columns={columns} isActionButton={true} />
      </div>
    </ContentLayout>
  );
}
