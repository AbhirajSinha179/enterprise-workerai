"use client"
import { toast } from "sonner";
import LoadingSign from "@/components/global/loading";
import { Inbox } from "@/components/inbox/mail";
import { ContentLayout } from "@/components/layout/content-layout";
import { threadsSchema } from "@/types/interface";
import { useCallback, useEffect, useRef, useState } from "react";
import { getTargetIdByUser } from "@/components/dashboard/recent-sales";
import { useAuth } from "@clerk/nextjs";

const getData = async (targetId: string, limit = 10, offset = 0) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/thread/target/${targetId}?limit=${limit}&offset=${offset}`;
    const res = await fetch(
      url,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await res.json();
    const result = threadsSchema.parse(data);
    return result;
  } catch (error) {
    console.log(JSON.stringify(error));
    return [];
  }
};

export default function InboxPage() {
  const { userId } = useAuth();
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const hasMore = useRef(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreEmails = useCallback(async () => {
    if (!userId || !hasMore.current || loading) return;
    setLoading(true);
    try {
      const targetId = await getTargetIdByUser(userId);
      if (!targetId) return;
      const fetchedEmails = await getData(targetId, 10, offset);
      if (fetchedEmails.length === 0) hasMore.current = false;
      setEmails((prev) => [...prev, ...fetchedEmails]);
      setOffset((prevOffset) => prevOffset + fetchedEmails.length);
    } catch (error) {
      toast.error("Error fetching scheduled emails.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId, offset, loading]);

  const lastEmailRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore.current) {
          loadMoreEmails();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadMoreEmails, loading]
  );

  useEffect(() => {
    loadMoreEmails();
  }, [userId]);

  return (
    <ContentLayout title="Inbox">
      {emails.length > 0 ? (
        <Inbox threads={emails} lastEmailRef={lastEmailRef} />
      ) : loading ? (
        <LoadingSign />
      ) : (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex items-center justify-center font-bold">
            Unable to fetch data. Please try again later.
          </div>
        </div>
      )}
    </ContentLayout>
  );
}
