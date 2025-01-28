import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface RecentSalesProps {
  data: {
    id: string;
    body: string;
    date: string;
    from: string;
  }[];
}

const RecentSales: React.FC<RecentSalesProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {data.map((reply) => (
        <div key={reply.id} className="flex items-center">
          {/* Avatar with Fallback */}
          <Avatar className="size-9">
            <AvatarFallback>{reply.from[0]}</AvatarFallback>
          </Avatar>

          {/* Reply Content */}
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">{reply.from}</p>
            <p className="text-sm text-foreground">{reply.body}</p>
            <p className="text-sm text-muted-foreground">{new Date(reply.date).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;
