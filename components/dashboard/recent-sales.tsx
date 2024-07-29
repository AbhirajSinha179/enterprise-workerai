import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Reply {
  id: string;
  body: string;
  sender: string;
  createdAt: string;
}

interface RecentSalesProp {
  data: Reply[];
}

export function RecentSales({ data }: RecentSalesProp) {
  if (!data || data.length === 0) {
    return <div className="mx-10 font-medium text-center min-h-[150px]">Sorry no data found</div>;
  }
  return (
    <div className="space-y-8">
      {data.map((reply) => (
        <div key={reply.id} className="flex items-center">
          <Avatar className="size-9">
            <AvatarFallback>{reply.sender[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">{reply.sender}</p>
            {/* <p className="text-sm text-foreground">{reply.body}</p>
            <p className="text-sm text-muted-foreground">{new Date(reply.createdAt).toLocaleString()}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
}
