import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

interface Reply {
  id: string;
  body: string;
  sender: string;
  createdAt: string;
}

export async function getTargetIdByUser(userId: string): Promise<string | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/target/${userId}`;
    const res = await fetch(url);
    console.log("RESPONSE FORM GET TARGET API CALL : ", res.status)

    if (!res.ok) {
      if (res.status === 404) {
        toast.error("No targets found for this user.");
        return null;
      } else {
        throw new Error(`Failed to fetch targets. Status code: ${res.status}`);
      }
    }

    const data: any = await res.json();
    if (!data.targets || data.targets.length === 0) {
      toast.error("No targets found for this user.");
      return null;
    }

    const targetId = data.targets[0].id;
    return targetId;
  } catch (error: any) {
    console.error("Error fetching target ID:", error.message);
    toast.error("Error fetching target ID.");
    return null;
  }
}

export async function fetchRecentReply(targetId: string): Promise<Reply[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/emails/thread/target/${targetId}/`;
    const res = await fetch(url);
    console.log("RESPONSE FROM FETCH RECENT REPLIES CALL : ", res.status)

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status code: ${res.status}`);
    }

    const data: any = await res.json();
    return data.replies.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

const RecentSales: React.FC = () => {
  const { userId } = useAuth();
  const [recentReplies, setRecentReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        toast.error("Error finding user ID");
        setIsLoading(false);
        return;
      }

      try {
        const targetId = await getTargetIdByUser(userId);
        if (!targetId) {
          setIsLoading(false);
          return;
        }

        const replies = await fetchRecentReply(targetId);
        setRecentReplies(replies);
      } catch (error) {
        toast.error("Error fetching recent replies.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  if (isLoading) {
    return <div className="mx-10 font-medium text-center min-h-[150px]">Loading...</div>;
  }

  if (!recentReplies || recentReplies.length === 0) {
    return <div className="mx-10 font-medium text-center min-h-[150px]">Sorry no data found</div>;
  }

  return (
    <div className="space-y-8">
      {recentReplies.map((reply) => (
        <div key={reply.id} className="flex items-center">
          <Avatar className="size-9">
            <AvatarFallback>{reply.sender[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">{reply.sender}</p>
            <p className="text-sm text-foreground">{reply.body}</p>
            <p className="text-sm text-muted-foreground">{new Date(reply.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;
