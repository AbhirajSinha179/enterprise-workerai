"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/layout/content-layout";
import { DataTable } from "@/components/leads/data-table";
import { columns } from "@/components/mailbox/columns";
import { Button } from "@/components/ui/button";
import { mailboxSchema } from "@/types/interface";
import { z } from "zod";
import Loading from "./loading";
import { useTargetContext } from "@/contexts/TargetIdContext";

async function getMailBoxes(targetId: string): Promise<{ data: any[]; error: string | null }> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/email-address/${targetId}?t=t`;
    console.log("Fetching from URL:", url);
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = `Failed to fetch emails: ${response.statusText}`;
      console.error(errorMessage);
      return { data: [], error: errorMessage };
    }

    const data = await response.json();
    const validation = z.array(mailboxSchema).safeParse(data);

    if (!validation.success) {
      const validationError = "Data validation failed: " + JSON.stringify(validation.error.errors);
      console.error(validationError);
      return { data: [], error: validationError };
    }

    return { data: validation.data, error: null };
  } catch (error: any) {
    const fetchError = `Error fetching mailboxes: ${error.message}`;
    console.error(fetchError);
    return { data: [], error: fetchError };
  }
}

export default function MailboxPage() {
  const { targetId } = useTargetContext();
  const [mailboxes, setMailboxes] = useState<any[]>([]);
  const [isFetchingTargetId, setIsFetchingTargetId] = useState(true);
  const [isFetchingMailboxes, setIsFetchingMailboxes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!targetId) {
      setIsFetchingTargetId(true);
      return;
    }

    setIsFetchingTargetId(false);

    const fetchMailboxes = async () => {
      setIsFetchingMailboxes(true);
      const { data, error } = await getMailBoxes(targetId);
      if (error) {
        setError(error);
      } else {
        setMailboxes(data);
      }
      setIsFetchingMailboxes(false);
    };

    fetchMailboxes();
  }, [targetId]);

  // if (isFetchingTargetId || isFetchingMailboxes) {
  //   return <Loading />;
  // }

  if (error) {
    return (
      <ContentLayout title="Mailbox">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className=" font-bold">
            An unexpected error occurred.
          </div>
        </div>
      </ContentLayout>
    );
  }

  // if (isDataFetched && mailsDisplay.length === 0) {
  //   return (
  //     <ContentLayout title="Mailbox">
  //       <div className="flex min-h-[70vh] items-center justify-center">
  //         <div className="font-bold">No mailbox data available.</div>
  //       </div>
  //     </ContentLayout>
  //   );
  // }

  return (
    <ContentLayout title="Mailbox">
      <div className="my-8 flex justify-between">
        <h1 className="text-2xl font-bold">Mailbox</h1>
        <Link href="/dashboard/mailbox/form">
          <Button size="sm">
            <div className="text-sm font-semibold">Connect a Mail Box</div>
          </Button>
        </Link>
      </div>
      <DataTable data={mailboxes} columns={columns} isActionButton={false} isLoading={isFetchingMailboxes} />
    </ContentLayout>
  );
}
