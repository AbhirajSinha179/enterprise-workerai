import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Function to strip HTML tags and properly format body text
function stripHtmlTags(input: string): string {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.body.textContent?.replace(/\\n/g, " ").replace(/\s+/g, " ").trim() || "";
}

interface RecentSalesProps {
  data: {
    id: string;
    body: string;
    date: string;
    from: string;
  }[];
}

const RecentSales: React.FC<RecentSalesProps> = ({ data }) => {
  console.log("Data for recent sales component : ", data);

  return (
    <div className="space-y-4">
      {data.map((reply) => (
        <div key={reply.id} className="flex items-center justify-between p-2 border-b ">
          {/* Avatar */}
          <Avatar className="size-8">
            <AvatarFallback>{reply.from[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>

          {/* Reply Content in One Line */}
          <div className="flex-1 mx-4 overflow-hidden">
            <p className="text-sm font-medium text-foreground truncate">{reply.from}</p>
            <p className="text-sm text-muted-foreground truncate">{stripHtmlTags(reply.body)}</p>
          </div>

          {/* Date */}
          <p className="text-sm text-muted-foreground whitespace-nowrap ml-4">
            {new Date(reply.date).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;