"use client"
import { useAuth } from "@clerk/nextjs"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
// import LoadingSign from "@/components/global/loading"
import { Inbox } from "@/components/inbox/mail"
import { ContentLayout } from "@/components/layout/content-layout"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { repliesSchema, threadsSchema } from "@/types/interface"
import { useTargetContext } from "@/contexts/TargetIdContext";


const getData = async (targetId: string, limit = 50, offset = 0) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/thread/target/${targetId}?limit=${limit}&offset=${offset}`
    const res = await fetch(url, {
      method: "GET",
      cache: "no-cache",
    })
    const data = await res.json()
    const result = threadsSchema.parse(data)
    return result
  } catch (error) {
    console.log(JSON.stringify(error))
    return []
  }
}

const getRepliesData = async (targetId: string, limit: number = 50, offset: number = 0) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/reply/target/${targetId}?limit=${limit}&offset=${offset}`
    const res = await fetch(url, {
      method: "GET",
      cache: "no-cache",
    })
    const data = await res.json()
    console.log(data)
    const result = repliesSchema.parse(data)
    return result
  } catch (error) {
    console.log(JSON.stringify(error))
    return []
  }
}

export default function InboxPage() {
  const { userId } = useAuth()
  const [emails, setEmails] = useState<any[]>([])
  const [replies, setReplies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingReplies, setLoadingReplies] = useState(false)
  const [offset, setOffset] = useState(0)
  const [offsetReplies, setOffsetReplies] = useState(0)
  const hasMore = useRef(true)
  const hasMoreReplies = useRef(true)
  const { targetId } = useTargetContext();



  const loadMoreEmails = useCallback(async () => {
    if (!userId || !hasMore.current || loading) return;
    setLoading(true);
    try {
      if (!targetId) return;
      const fetchedEmails = await getData(targetId, 50, offset);
      if (fetchedEmails.length === 0) hasMore.current = false;
      setEmails((prev) => {
        const existingThreadIds = new Set(prev.map((thread) => thread.threadId));
        const newThreads = fetchedEmails.filter(
          (thread) => !existingThreadIds.has(thread.threadId)
        );
        return [...prev, ...newThreads];
      });
      setOffset((prevOffset) => prevOffset + fetchedEmails.length);
    } catch (error) {
      toast.error("Error fetching emails.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId, offset, loading, targetId]);

  const loadMoreReplies = useCallback(async () => {
    if (!userId || !hasMoreReplies.current || loading) return
    setLoadingReplies(true)
    try {
      if (!targetId) return
      const fetchedReplies = await getRepliesData(targetId, 10, offsetReplies)
      if (fetchedReplies.length === 0) hasMoreReplies.current = false
      setReplies((prev) => {
        const existingThreadIds = new Set(prev.map((thread) => thread.threadId))
        const newThreads = fetchedReplies.filter((thread) => !existingThreadIds.has(thread.threadId))
        return [...prev, ...newThreads]
      })
      setOffsetReplies((prevOffset) => prevOffset + fetchedReplies.length)
    } catch (error) {
      toast.error("Error fetching scheduled emails.")
      console.error(error)
    } finally {
      setLoadingReplies(false)
    }
  }, [userId, offsetReplies, loading, targetId])

  const emailRef = useInfiniteScroll({ loadMoreEmails, loading, hasMore, emailList: emails })
  const replyEmailRef = useInfiniteScroll({ loadMoreReplies, loading, hasMoreReplies, emailList: replies })

  useEffect(() => {
    loadMoreEmails();
  }, [targetId, userId]);


  useEffect(() => {
    loadMoreReplies()
  }, [targetId, userId])

  return (
    <ContentLayout title="Inbox">
      <Inbox threads={emails} replies={replies} lastEmailRef={emailRef} replyEmailRef={replyEmailRef} loading={loading} loadingReplies={loadingReplies} />
      {/* 
      {emails.length > 0 ? (
        <Inbox threads={emails} replies={replies} lastEmailRef={emailRef} replyEmailRef={replyEmailRef} loading={loading} />
      ) : loading ? (
        <LoadingSign />
      )
        // ) 
        : (
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="flex items-center justify-center font-bold">
              Unable to fetch data. Please try again later.
            </div>
          </div>
        )} */}
    </ContentLayout>
  )
}
