"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/layout/content-layout";
import { DataTable } from "@/components/leads/data-table";
import { columns } from "@/components/mailbox/columns";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { mailboxSchema } from "@/types/interface";
import { z } from "zod";
import Loading from "./loading";
import { useTargetContext } from "@/contexts/TargetIdContext";

const getMails = async (id: string, type: "u" | "t") => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/email-address/${id}?t=${type}`;
    console.log("Fetching from URL:", url);
    const res = await fetch(url);

    if (!res.ok) {
      console.error("Failed to fetch emails:", res.statusText);
      return null;
    }

    const data = await res.json();
    const validationResult = z.array(mailboxSchema).safeParse(data);

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return null;
    }

    return validationResult.data;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return null;
  }
};

export default function MailboxPage() {
  const { userId } = useAuth();
  const [mailsDisplay, setMailsDisplay] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const { targetId }: any = useTargetContext();

  useEffect(() => {
    if (!targetId) {
      setError("No user ID available.");
      setLoading(false);
      return;
    }

    const fetchMails = async () => {
      setLoading(true);
      try {
        const fetchedMails = await getMails(targetId, "t");
        if (fetchedMails) {
          setMailsDisplay(fetchedMails);
          setError(null);
        } else {
          setMailsDisplay([]);
          setError("No mailboxes found.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
        setIsDataFetched(true); // Ensure this is set after fetching
      }
    };

    fetchMails();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  if (error && isDataFetched) {
    return (
      <ContentLayout title="Mailbox">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex items-center justify-center font-bold">
            Unable to fetch data. Please try again later.
          </div>
        </div>

      </ContentLayout>
    );
  }

  if (isDataFetched && mailsDisplay.length === 0) {
    return (
      <ContentLayout title="Mailbox">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="font-bold">No mailbox data available.</div>
        </div>
      </ContentLayout>
    );
  }

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
      <DataTable data={mailsDisplay} columns={columns} isActionButton={false} />
    </ContentLayout>
  );
}
