"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingSign from "@/components/global/loading";
import { Inbox } from "@/components/inbox/mail";
import { ContentLayout } from "@/components/layout/content-layout";
import { Thread, threadsSchema } from "@/types/interface";

const getData = async (): Promise<Thread[]> => {
  try {
    const res = await fetch("http://localhost:3000/threads");
    const data = await res.json();
    const result = threadsSchema.safeParse(data);
    return result.success ? result.data : [];
  } catch (error) {
    toast.error("Unable to fetch data. Please try again later.");
    return [];
  }
};

export default function InboxPage() {
  const [threadData, setThreadData] = useState<Thread[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData().then(data => {
      setThreadData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ContentLayout title="Inbox">
        <LoadingSign></LoadingSign>
      </ContentLayout>
    );
  }

  if (!threadData) {
    return (
      <ContentLayout title="Inbox">
        <div className="flex justify-center items-center flex-1 h-full">
          <div className="font-bold justify-center items-center flex">
            Unable to fetch data. Please try again later.
          </div>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Inbox">
      <Inbox threads={threadData} />
    </ContentLayout>
  );
}